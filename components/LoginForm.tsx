import styled from "styled-components";
import { Form, Input, Button, Alert } from "antd";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_CLICKED } from "../reducers/user";
import Link from "next/link";
import { RootState } from "../reducers";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoginError } = useSelector((state: RootState) => state.user);

  const onSubmit = useCallback(
    (values: any) => {
      setIsLoading(true);
      dispatch({
        type: LOG_IN_CLICKED,
        data: { id: values.id, password: values.password },
      });
    },
    [dispatch]
  );

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Form.Item
        label="아이디"
        name="id"
        rules={[{ required: true, message: "아이디를 입력해주세요!" }]}
      >
        <Input maxLength={30} placeholder="아이디" />
      </Form.Item>
      <Form.Item
        label="패스워드"
        name="password"
        rules={[{ required: true, message: "패스워드를 입력해주세요!" }]}
      >
        <Input maxLength={30} type="password" placeholder="패스워드" />
      </Form.Item>
      {/* <Form.Item
        label="닉네임"
        name="nickname"
        rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
      >
        <Input maxLength={30} placeholder="닉네임" />
      </Form.Item> */}
      <Form.Item wrapperCol={{ span: 16 }}>
        <Button style={{ float: "right" }}>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Button>
        <Button
          type="primary"
          style={{ float: "right" }}
          loading={isLoading && !isLoginError}
          htmlType="submit"
        >
          로그인
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 2, span: 14 }}>
        {isLoginError && (
          <Alert
            message="아이디 또는 비밀번호가 일치하지 않습니다!"
            type="error"
            showIcon
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
