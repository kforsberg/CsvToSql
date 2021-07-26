import * as React from 'react'
import * as Styles from './FileEditor.styles'
import { Form, Input, Table, Button } from 'antd'
import { useAppSelector } from '@/app/redux/hooks'
const electron = window.require('electron');
const remote = electron.remote
const { dialog } = remote
import { SqlService } from '@/node/SqlService';
import { useHistory } from 'react-router';
const os = window.require('os');
import { Scrollbars } from 'react-custom-scrollbars';

interface IProps {
    onGoBack: () => void;
}

export const FileEditor = (props: IProps) => {
    const columns = useAppSelector(s => s.columns.columns);
    const rawData = useAppSelector(s => s.columns.rawData);
    const [exporting, setExporting] = React.useState(false);
    const [tableName, setTableName] = React.useState<string | null>(null);
    const [fileName, setFileName] = React.useState<string | null>(null);
    const history = useHistory();
    const columnDef = [
        { title: 'Column Name', dataIndex: 'columnName', key: 'columnName' },
        { title: 'Data Type', dataIndex: 'dataType', key: 'dataType' },
        { title: 'Column Length', dataIndex: 'columnLength', key: 'columnLength' }
    ]

    const onExport = async () => {
        try {
            setExporting(true);
            const options: Electron.OpenDialogOptions = {
                title: 'Select a location to save',
                properties: ['openDirectory']
            }
            const results = await dialog.showOpenDialog(options);
            const val = results.filePaths[0];
            const isWindows = os.platform() === 'win32';
            let fullPath: string;
            if (isWindows) {
                fullPath = `${val}\\${fileName}`
            } else {
                fullPath = `${val}/${fileName}`
            }
            new SqlService().exportFile(columns, rawData, fullPath, tableName!);
        } catch (error) {
            
        }
        history.push('/finish');
    }

    const isNullOrEmpty = (val: string | null) => {
        return val === null || val.trim() === '';
    }

    const exportDisabled = () => {
        return isNullOrEmpty(fileName) || isNullOrEmpty(tableName);
    }

    return (
        <div style={Styles.container}>
            <div style={Styles.editor}>
                <Scrollbars>
                    <Form layout="vertical" style={Styles.form}>
                        <div>
                            <Form.Item label="Table Name" required>
                                <Input defaultValue={tableName || undefined} onChange={e => setTableName(e.target.value)}/>
                            </Form.Item>
                            <Form.Item label="SQL File Name" required>
                                <Input defaultValue={fileName || undefined} onChange={e => setFileName(e.target.value)} />
                            </Form.Item>
                        </div>
                        <div>
                            <Table dataSource={columns} columns={columnDef} pagination={false} />
                        </div>
                    </Form>
                </Scrollbars>
                <div style={Styles.buttonRow}>
                    <Button onClick={props.onGoBack}>Go Back</Button>
                    <Button disabled={exportDisabled() || exporting} onClick={onExport} type='primary'>{exporting ? 'Exporting...' : 'Export'}</Button>
                </div>
            </div>
        </div>
    )
}