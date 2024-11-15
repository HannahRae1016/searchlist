import React, { useState } from "react";
import { BarsOutlined, TableOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroller";
import { Typography, Skeleton } from "antd";
import CardList from "../CardList";
import ColunmList from "../ColumnList";
import "./index.css";

type Props = {
    list: Record<string, any>[];
    total: number;
    page: number;
    loadMore: Function;
    totalPage: number;
};

const ListContainer: React.FC<Props> = ({ list = [], total = 0, totalPage, page, loadMore = () => { } }) => {
    const { Text } = Typography;
    const [listType, setListType] = useState("list");

    const renderList = () => {
        const propsToPass = {
            list,
            total: totalPage,
            page,
            loadMore
        };
        return listType === "card" ? (
            <CardList {...propsToPass} />
        ) : (
            <ColunmList {...propsToPass} />
        );
    };

    const handleLoadMore = () => {
        loadMore();
    };

    return list.length > 0 ? (
        <div className="listContainer">
            <div className="toggleBar">
                <BarsOutlined
                    style={{ color: listType === "list" ? "#69b1ff" : "" }}
                    onClick={() => setListType("list")}
                />
                <TableOutlined
                    style={{ color: listType === "card" ? "#69b1ff" : "" }}
                    onClick={() => setListType("card")}
                />
                <Text>About {total} results</Text>
            </div>
            <InfiniteScroll
                loadMore={handleLoadMore}
                hasMore={page < totalPage}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            >
                {renderList()}
            </InfiniteScroll>
        </div>
    ) : null;
};

export default ListContainer;
