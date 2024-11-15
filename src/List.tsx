import React, { useState } from "react";
import { useDebounce } from "react-use";
import { Input } from "antd";
import axios from "axios";
import ListContainer from "./ListContainer";
import './List.css';

const List = () => {
  const [text, setText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const size = 20;
  const [list, setList] = useState<Record<string, any>[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)

  const getList = async () => {
    if (text === '') return
    const res = await axios.get("http://127.0.0.1:4000/list", {
      params: {
        search: text,
        page: page,
        size,
      },
    });
    setList([...list, ...res.data.list]);
    setTotal(res.data.total);
    setTotalPage(res.data.totalPage);
    setLoading(false)
  };

  const loadNextPage = () => {
    if (loading) return
    setLoading(true);
    setPage(page + 1)
  }

  useDebounce(
    () => {
      getList();
    },
    200,
    [text, page]
  );

  return (
    <div className="SearchListContainer">
      <Input
        placeholder="Please input search text"
        onChange={(e) => {
          setText(e.target.value);
          setList([]);
          setTotal(0);
          setTotalPage(0);
          setPage(1);
        }}
        allowClear
        style={{ width: "100%" }}
        value={text}
      />
      <ListContainer list={list} total={total} totalPage={totalPage} page={page} loadMore={loadNextPage} />
    </div>

  );
};

export default List;
