import React from 'react';
import { Col, Row, Typography } from 'antd';
import { FileExcelTwoTone } from '@ant-design/icons';
import './index.css';

type Props = {
    data: Record<string, string>
}

const ListInfo: React.FC<Props> = props => {
    const { Paragraph, Text } = Typography;

    const { data: { fileName, modified, date, location, details } } = props;

    return (
        <div className='ListInfoContainer'>
            <Row>
                <Col span={2}>
                    <div className='iconContainer'>
                        <FileExcelTwoTone twoToneColor="#52c41a" />
                    </div>
                </Col>
                <Col span={22}>
                    <Paragraph className='fileName'>{fileName}</Paragraph>
                    <Paragraph className='details'>{details}</Paragraph>
                    <Paragraph className='details'>
                        {modified && <Text>Modified By: <Text className='markColor'>{modified}</Text> - </Text>}Modified: {date} - Location: <Text className='markColor'>{location}</Text>
                    </Paragraph>
                </Col>
            </Row>
        </div>
    )

}

export default ListInfo;