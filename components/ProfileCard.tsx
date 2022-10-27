import { Button, Card, Input, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CHANGE_NICKNAME, UserData } from "../reducers/user";

const ProfileCard = (props: any) => {
  const dispatch = useDispatch();
  const user: UserData = props.user;
  const [nickname, setNickName] = useState(user.nickname);

  const changeNickNameClicked = (e: any) => {
    dispatch({
      type: CHANGE_NICKNAME,
      data: { id: user.id, nickname: nickname },
    });
  };

  const changeNickName = (e: any) => {
    setNickName(e.target.value);
  };

  const { Text } = Typography;

  return (
    <div className="site-card-border-less-wrapper">
      <Card title="내 프로필" bordered={false} style={{ width: 300 }}>
        <p>
          <Text strong>아이디 : </Text>
          <Text keyboard>{user.id}</Text>
        </p>
        <p>
          <Text strong>비밀번호 : </Text>
          <Input.Password value={user.password} readOnly draggable="false" />
        </p>
        <p>
          <Text strong>닉네임 : </Text>
          <Input.Group compact>
            <Input
              style={{ width: "50%" }}
              defaultValue={user.nickname}
              onChange={changeNickName}
            ></Input>
            <Button type="primary" onClick={changeNickNameClicked}>
              변경
            </Button>
          </Input.Group>
        </p>
      </Card>
    </div>
  );
};

export default ProfileCard;
