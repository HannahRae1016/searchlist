import React from "react";
import { Divider, List, Skeleton } from "antd";
import ListInfo from "./ListInfo";
import "./index.css";

type Props = {
  list: Record<string, string>[];
  total: number;
  page: number;
  loadMore: Function;
};

const ColumnList: React.FC<Props> = ({ list = [], total = 0, page }) => {
  return (
    <div className="ColumnListContainer">
      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <ListInfo data={item} />
          </List.Item>
        )}
      />
      {page === total && <Divider plain>No more data</Divider>}
    </div>
  );
};

export default ColumnList;
