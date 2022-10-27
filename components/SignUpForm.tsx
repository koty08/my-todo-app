import { Form, Input, Button, Alert } from "antd";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ADD_USER } from "../reducers/user";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const onSubmit = useCallback(
    (values: any) => {
      dispatch({
        type: ADD_USER,
        data: {
          id: values.id,
          password: values.password,
          nickname: values.nickname ?? "닉네임",
        },
      });
      //   router.push({
      //     pathname: "/",
      //   });
    },
    [dispatch, router]
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
      <Form.Item label="닉네임" name="nickname">
        <Input maxLength={30} placeholder="닉네임" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 16 }}>
        <Button
          type="primary"
          style={{ float: "right" }}
          //   loading={isLoading && !isLoginError}
          htmlType="submit"
        >
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
