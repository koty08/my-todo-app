import { Button, Col, Menu, Row } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { LOG_OUT } from "../reducers/user";
import TodoList from "./TodoList";

type Props = {
  children: JSX.Element;
  mode: string;
};

const MyLayout = ({ children, mode }: Props) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

  const logOutClicked = () => {
    dispatch({ type: LOG_OUT });
  };

  const items = [
    {
      label: (
        <Link href="/">
          <a>Home</a>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link href="/profile">
          <a>내 정보</a>
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link href="/signup">
          <a>회원 가입</a>
        </Link>
      ),
      key: "3",
    },
  ];

  if (isLoggedIn) {
    items.push({
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "black",
            border: "0px",
          }}
        >
          <span>{user?.nickname}님, 안녕하세요! </span>
          <Button onClick={logOutClicked}>로그아웃</Button>
        </div>
      ),
      key: "4",
    });
  }

  return (
    <div>
      <Menu mode="horizontal" items={items} style={{ marginBottom: 25 }} />
      <Row>
        <Col span={12}>{children}</Col>
        <Col span={12}>
          {isLoggedIn ? <TodoList mode={mode}></TodoList> : <div></div>}
        </Col>
      </Row>
    </div>
  );
};

export default MyLayout;
