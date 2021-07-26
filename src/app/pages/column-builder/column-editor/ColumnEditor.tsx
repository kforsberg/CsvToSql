import { ICsvColumn } from '@/models/interfaces';
import { Button, Input, Select, Form } from 'antd';
import * as React from 'react';
import * as Styles from './ColumnEditor.styles';
import { EDataTypes } from '@/models/enums'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface IProps {
    column: ICsvColumn;
    onNext: (column: ICsvColumn) => void;
    onPrevious: () => void;
    nextDisabled: boolean;
    previousDisabled: boolean;
}

export const ColumnEditor = (props: IProps) => {

    const [column, setColumn] = React.useState(props.column);
    const validationMessages = {
        required: '${label} is required'
    }

    React.useEffect(() => {
        setColumn(props.column)
    }, [props.column]);

    const onFinish = (values: any) => {
        if (isNextDisabled()) {
            return;
        }
        props.onNext(column);
    }

    const isNextDisabled = () => {
        return column.columnName?.trim() === '' || column.dataType === null || (isLengthRequired() && !column.columnLength);
    }

    const isLengthRequired = () => {
        return column.dataType === EDataTypes.NVARCHAR || column.dataType === EDataTypes.VARCHAR;
    }

    return (
        <div style={Styles.container}>
            <div style={Styles.editor}>
                <Form layout="vertical" validateMessages={validationMessages} style={{ height: '100%' }} onFinish={onFinish}>
                    <div style={Styles.buttonRow}>
                        <Button disabled={props.previousDisabled} onClick={props.onPrevious} type="link" icon={<ArrowLeftOutlined />}>Previous</Button>
                        <Button htmlType="submit" disabled={isNextDisabled()} type="link" icon={<ArrowRightOutlined />}>Next</Button>
                    </div>
                    <div style={Styles.inputArea}>

                        <div style={Styles.inputContainer}>
                            <Form.Item label="Column Name" required rules={[{ required: true }]}>
                                <Input value={column.columnName || ''} name="columnName" onChange={e => setColumn({ ...column, columnName: e.target.value })} />
                            </Form.Item>
                        </div>
                        <div style={Styles.inputContainer}>
                            <Form.Item label="Data Type" required rules={[{ required: true }]}>
                                <Select style={Styles.selectStyle} placeholder="Select a Data Type" value={column.dataType?.valueOf()} defaultValue={column.dataType?.valueOf()} onChange={val => setColumn({...column, dataType: val, columnLength: !isLengthRequired() ? column.columnLength : null})}>
                                    <Select.Option value={EDataTypes.INT}>INT</Select.Option>
                                    <Select.Option value={EDataTypes.VARCHAR}>VARCHAR</Select.Option>
                                    <Select.Option value={EDataTypes.NVARCHAR}>NVARCHAR</Select.Option>
                                    <Select.Option value={EDataTypes.UNIQUEIDENTIFIER}>UNIQUEIDENTIFIER</Select.Option>
                                    <Select.Option value={EDataTypes.BIT}>BIT</Select.Option>
                                    <Select.Option value={EDataTypes.DATETIME}>DATETIME</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={Styles.inputContainer}>
                            <Form.Item label="Field Length" required rules={[{ required: isLengthRequired() }]}>
                                <Input disabled={!isLengthRequired()} type='number' value={column.columnLength || ''} name="columnLength" onChange={e => setColumn({ ...column, columnLength: Number.parseInt(e.target.value) })} />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}