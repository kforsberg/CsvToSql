import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import * as React from 'react';
import * as Styles from './StartPage.styles';
const electron = window.require('electron');
const remote = electron.remote
const { dialog } = remote

import { CsvService } from '@/node/CsvService';
import { useAppDispatch } from '@/app/redux/hooks';
import { setColumns, setFileName, updateRawData } from '@/app/redux/slices/csvDataSlice';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { useHistory } from 'react-router';

export const StartPage = () => {

    const fileHandler: CsvService = new CsvService();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const [firstRowHeader, setFirstRowHeader] = React.useState(true);

    const onClick = async () => {
        const options: Electron.OpenDialogOptions = {
            title: 'Upload a CSV File',
            filters: [
                { name: 'CSV', extensions: ['csv'] }
            ],
            properties: ['openFile']
        }
        const result = await dialog.showOpenDialog(options);
        const csv = await fileHandler.loadCsvFile(result.filePaths[0]) as Array<object>;
        dispatch(updateRawData(csv));
        const columns = fileHandler.buildColumns(csv, firstRowHeader);
        dispatch(setColumns(columns));
        dispatch(setFileName(result.filePaths[0]));
        history.push('/columnBuilder')
    }
    return (
        <div style={Styles.mainStyle}>
            <div style={Styles.mainArea}>
                <div style={Styles.inputArea}>
                    <Text style={Styles.title}>Upload a CSV File</Text>
                    <Checkbox checked={firstRowHeader} onChange={val => setFirstRowHeader(val.target.checked)}>Use First Row as Column Names?</Checkbox>
                </div>
                <div style={Styles.buttonRow}>
                    <Button onClick={onClick}>Choose File</Button>
                </div>
            </div>
        </div>
    )
}




