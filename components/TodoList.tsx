import { Checkbox, List } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import {
  CHANGE_STATUS,
  delTODO,
  LOAD_TODO_LOADING,
  LOAD_TODO_ME_LOADING,
  TodoData,
} from "../reducers/todo";
import { MODIFYING } from "../reducers/user";

const DisableAnchor = styled.a`
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  text-decoration-line: line-through;
  color: gray;
`;

type Props = {
  mode: string;
};

const TodoList = ({ mode }: Props) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const { mainTodos } = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    if (isLoggedIn) {
      if (mode == "my") {
        // 현재 관리중인 백엔드가 없어서 mainTodo가 덮어씌워짐
        // dispatch({ type: LOAD_TODO_ME_LOADING, data: user.id });
        mainTodos.filter((e) => e.writerId === user.id);
      } else {
        dispatch({ type: LOAD_TODO_LOADING });
      }
    }
  }, [dispatch, isLoggedIn, mainTodos, mode, user.id]);

  const onDeleteSubmit = (id: string, e: any) => {
    dispatch(delTODO(id));
  };

  const onModifySubmit = (id: string, e: any) => {
    dispatch({
      type: MODIFYING,
      data: mainTodos.find((elem: TodoData) => elem.id === id),
    });
  };

  const onCheckBoxChanged = (id: string, e: any) => {
    dispatch({
      type: CHANGE_STATUS,
      data: { id: id, status: e.target.checked },
    });
  };

  const isExpired = (comp: string) => {
    return moment().isAfter(moment(comp));
  };

  return (
    <>
      <Title level={3}>{"완료 되지 않은 TODO"}</Title>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={mainTodos.filter((elem: TodoData) => !elem.isFinished)}
        renderItem={(item: TodoData) => (
          <List.Item
            key={item.id + "list"}
            actions={
              item.writerId === user.id
                ? [
                    <a
                      key={item.id + "a1"}
                      onClick={(e) => {
                        onModifySubmit(item.id, e);
                      }}
                    >
                      수정
                    </a>,
                    <a
                      key={item.id + "a2"}
                      onClick={(e) => onDeleteSubmit(item.id, e)}
                    >
                      삭제
                    </a>,
                  ]
                : [
                    <DisableAnchor key={item.id + "a1"}>수정</DisableAnchor>,
                    <DisableAnchor key={item.id + "a2"}>삭제</DisableAnchor>,
                  ]
            }
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={item.isFinished}
                  onChange={(e) => onCheckBoxChanged(item.id, e)}
                />
              }
              title={
                <p
                  style={
                    isExpired(item.date)
                      ? { textDecorationLine: "underline", color: "red" }
                      : {}
                  }
                >
                  {item.title + " - [" + item.date + "]"}
                </p>
              }
              description={item.content}
            />
            <div>
              <p>{item.writer}</p>
            </div>
          </List.Item>
        )}
      />
      <Title level={3} style={{ marginTop: 30 }}>
        {"완료 되지 않은 TODO"}
      </Title>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={mainTodos.filter((elem: TodoData) => elem.isFinished)}
        renderItem={(item: TodoData) => (
          <List.Item
            key={item.id}
            actions={
              item.writerId === user.id
                ? [
                    <a
                      key={item.id + "a1"}
                      onClick={(e) => {
                        onModifySubmit(item.id, e);
                      }}
                    >
                      수정
                    </a>,
                    <a
                      key={item.id + "a2"}
                      onClick={(e) => onDeleteSubmit(item.id, e)}
                    >
                      삭제
                    </a>,
                  ]
                : [
                    <DisableAnchor key={item.id + "a1"}>수정</DisableAnchor>,
                    <DisableAnchor key={item.id + "a2"}>삭제</DisableAnchor>,
                  ]
            }
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={item.isFinished}
                  onChange={(e) => onCheckBoxChanged(item.id, e)}
                />
              }
              title={
                <p
                  style={{ textDecorationLine: "line-through", color: "gray" }}
                >
                  {item.title + " - [" + item.date + "]"}
                </p>
              }
              description={item.content}
            />
            <div>
              <p>{item.writer}</p>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default TodoList;
