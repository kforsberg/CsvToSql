import { Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import * as React from 'react';
import * as Styles from './Header.styles';

interface IProps {
    fileName: string;
}

export const Header = (props: IProps) => {
    return (
        <div style={Styles.headerContainer}>
            <Text style={Styles.fileName}>{props.fileName}</Text>
        </div>
    );
}