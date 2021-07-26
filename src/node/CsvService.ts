import { ICsvColumn } from "@/models/interfaces";

const fs = window.require('fs');
const neatCsv = window.require('neat-csv');

export class CsvService {
    public async loadCsvFile(filePath: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err: any, csv: any) => {
                if (err) {
                    return reject(err);
                }
                try {
                    return resolve(neatCsv(csv));
                } catch (error) {
                    return reject(error);
                }
            });
        });
    }

    public buildColumns(data: Array<object>, firstRowHeader: boolean) {
        const columns: Array<ICsvColumn> = [];

        const row = data[0];
        let id = 1;
        for (const key of Object.keys(row)) {
            columns.push({ id: id++, columnName: firstRowHeader ? key.replace(' ', '') : null, dataType: null });
        }

        return columns;
    }
}