import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import * as React from 'react';
import { useHistory } from 'react-router';
import { Header } from './header/Header';
import { ColumnEditor } from './column-editor/ColumnEditor';
import 'antd/dist/antd.css'
import { Steps } from 'antd';
import * as Styles from './ColumnBuilderPage.styles';
import { ICsvColumn } from '@/models/interfaces';
import { updateColumn } from '@/app/redux/slices/csvDataSlice';
import { FileEditor } from './file-editor/FileEditor'

export const ColumnBuilderPage = () => {
    const fileName = useAppSelector(s => s.columns.fileName);
    const columns = useAppSelector(s => s.columns.columns);
    const history = useHistory();
    const [currentStep, setCurrentStep] = React.useState(0);
    const ref = React.useRef();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (fileName === null) {
            history.push('/');
        }

    }, []);

    const getStepStatus = (index: number) => {
        if (currentStep > index) {
            return 'finish';
        }

        return currentStep === index ? 'process' : 'wait';
    }

    const onNext = (column: ICsvColumn) => {
        dispatch(updateColumn(column));
        setCurrentStep(currentStep + 1);

    }

    const onPrevious = () => {
        setCurrentStep(currentStep - 1);
    }

    const onGoBack = () => {
        setCurrentStep(columns.length - 1);
    }

    return (
        <>
            <Header fileName={fileName || 'No File'} />
            <div style={Styles.page}>
                <div style={Styles.stepperContainer}>
                    <Steps current={currentStep + 1} direction="vertical" size="small">
                        {columns.map((column, i) => (
                            <Steps.Step
                                key={i}
                                title={column.columnName ?? 'Untitled Column'}
                                status={getStepStatus(i)} />
                        ))}
                        <Steps.Step title="Review & Export" status={columns.length > 0 && currentStep >= columns.length ? 'process' : 'wait'} />
                    </Steps>
                </div>
                <div style={Styles.editorContainer}>
                    {
                        columns.length > 0 && currentStep < columns.length &&
                        <ColumnEditor
                            column={columns[currentStep]}
                            onNext={onNext}
                            onPrevious={onPrevious}
                            nextDisabled={currentStep + 1 === columns.length}
                            previousDisabled={currentStep === 0}
                        />
                    }
                    {
                        columns.length > 0 && currentStep >= columns.length &&
                        <FileEditor onGoBack={onGoBack} />
                    }
                </div>
            </div>
        </>
    )
}