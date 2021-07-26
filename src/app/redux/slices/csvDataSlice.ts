import { ICsvColumn } from '@/models/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CsvDataState {
    rawData: Array<object>,
    columns: Array<ICsvColumn>,
    fileName: string | null
}

const initialState: CsvDataState = {
    rawData: [],
    columns: [],
    fileName: null
}

export const csvDataSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {
        updateRawData: (state, action:PayloadAction<Array<object>>) => {
            state.rawData = action.payload;
        },
        setColumns: (state, action: PayloadAction<Array<ICsvColumn>>) => {
            state.columns = action.payload;
        },
        setFileName: (state, action: PayloadAction<string | null>) => {
            state.fileName = action.payload;
        },
        updateColumn: (state, action: PayloadAction<ICsvColumn>) => {
            state.columns = state.columns.map(c => c.id !== action.payload.id ? c : action.payload)
        },
        reset: (state) => {
            state = initialState
        }
    }
})

export const { updateRawData, setColumns, setFileName, updateColumn, reset } = csvDataSlice.actions;

export default csvDataSlice.reducer;