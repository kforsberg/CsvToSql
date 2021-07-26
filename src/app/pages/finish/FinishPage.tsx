import { useAppDispatch } from '@/app/redux/hooks';
import { reset } from '@/app/redux/slices/csvDataSlice';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import * as React from 'react';
import { useHistory } from 'react-router';
import * as Styles from './FinishPage.styles';

export const FinishPage = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const onStartOverClick = () => {
        dispatch(reset());
        history.push('/');
    }

    return (
        <div style={Styles.mainStyle}>
            <div style={Styles.mainArea}>
                <div style={Styles.textRow}>
                    <Text style={Styles.text}>Complete</Text>
                </div>
                <div style={Styles.iconRow}>
                    <CheckCircleOutlined style={Styles.icon} />
                </div>
                <div style={Styles.buttonRow}>
                    <Button type="default" onClick={onStartOverClick}>Start Over</Button>
                </div>
            </div>
        </div>
    )
}