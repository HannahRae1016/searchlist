import React from "react";
import { Card, Col, Row, Typography, Divider } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import "./index.css";

type Props = {
  list: Record<string, string>[];
  total: number;
  page: number;
  loadMore: Function;
};

const CardList: React.FC<Props> = ({ list = [], total = 0, page }) => {
  const { Paragraph, Text } = Typography;

  return (
    <div className="CardListContainer">
      <Row gutter={[8, 8]}>
        {list.map((item) => {
          const { fileName, modified, date, location, id } = item || {};
          return (
            <Col span={8} key={id}>
              <Card bordered={false}>
                <div className="SingleContainer">
                  <div className="iconContainer">
                    <FileExcelTwoTone twoToneColor="#52c41a" />
                  </div>
                  <Paragraph className="fileName">{fileName}</Paragraph>
                  {modified && (
                    <Paragraph className="modified">
                      Modified By: <Text className="markColor">{modified}</Text>
                    </Paragraph>
                  )}
                  <Paragraph className="modified modifiedDate">
                    Modified: {date}
                  </Paragraph>
                  <Paragraph className="location markColor">
                    {location}
                  </Paragraph>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      {page === total && <Divider plain>No more data</Divider>}
    </div>
  );
};

export default CardList;
