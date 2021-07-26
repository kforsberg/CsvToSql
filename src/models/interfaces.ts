export interface ICsvColumn {
    id: number;
    columnName: string | null;
    dataType: string | null;
    columnLength?: number | null;
}
