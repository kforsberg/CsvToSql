import { EDataTypes } from "@/models/enums";
import { ICsvColumn } from "@/models/interfaces";

const fs = window.require('fs')

export class SqlService {
    public exportFile(columns: Array<ICsvColumn>, rawData: Array<object>, filePath: string, tableName: string) {
        try {
            fs.rmSync(filePath)
        } catch { };
        fs.appendFileSync(filePath, this.buildCreateLine(columns, tableName));
        const batchedData = this.batchData(rawData);
        batchedData.forEach(data => fs.appendFileSync(filePath, this.batchInsertStatement(data, columns, tableName)));
    }

    private buildCreateLine(columns: Array<ICsvColumn>, tableName: string) {
        const columnNames = columns.map(c => {
            let fieldDef = `[${c.columnName}] ${c.dataType}`;
            return c.dataType === EDataTypes.NVARCHAR || c.dataType === EDataTypes.VARCHAR
                ? `${fieldDef}(${c.columnLength})`
                : fieldDef
        });
        
        return `CREATE TABLE ${tableName} (${columnNames});\n\n`;
    }

    private batchData(data: Array<object>) {
        let batchedArrays: Array<Array<object>> = [];
        const maxIterations = Math.ceil(data.length / 100);
        for (let i = 0; i < maxIterations; i++) {
            batchedArrays.push(data.slice(i*100, (i*100) + 100));
        }
        return batchedArrays;
    }

    private batchInsertStatement(data: Array<object>, columns: Array<ICsvColumn>, tableName: string) {
        let statement = this.buildInsertLine(columns, tableName);
        data.forEach((row, index) => {
            statement += index < data.length - 1 ? `${this.buildDataLine(row, columns)},\n` : `${this.buildDataLine(row, columns)};\n`
        });
        return statement;
    }

    private buildInsertLine(columns: Array<ICsvColumn>, tableName: string) {
        const columnNames = columns.map(c => `[${c.columnName}]`).join(', ');
        return `INSERT INTO ${tableName} (${columnNames}) VALUES\n`;
    }

    private buildDataLine(row: object, columns: Array<ICsvColumn>) {
        const entries = Object.entries(row).map((([key, value], index) => this.buildColumnValue(value, <EDataTypes>columns[index].dataType!)));
        const joinedEntries = entries.join(', ');
        return `(${joinedEntries})`;
    }

    private buildColumnValue(val: object, dataType: EDataTypes) {
        let valStr = `${val}`.replace('\'', '\'\'');
        if (this.isNullOrEmpty(valStr)) {
            return 'NULL'
        }
        switch (dataType) {
            case EDataTypes.INT:
            case EDataTypes.BIT:
                return `${valStr}`;
            case EDataTypes.NVARCHAR:
                return `N'${valStr}'`
            default:
                return `'${valStr}'`;
        }
    }

    private isNullOrEmpty(val: string) {
        return val === '' || val === null;
    }

}