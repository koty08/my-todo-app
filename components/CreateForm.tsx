import { Button, DatePicker, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortId from "shortid";
import { RootState } from "../reducers";

import { addTODO } from "../reducers/todo";

const CreateForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user } = useSelector((state: RootState) => state.user);

  const onSubmit = useCallback(
    (values: any) => {
      // console.log(values.text, values["date-picker"].format("YYYY-MM-DD"));
      dispatch(
        addTODO({
          id: shortId.generate(),
          title: values.title,
          content: values.content,
          date: values.date_picker
            ? values.date_picker.format("YYYY-MM-DD")
            : "무기한",
          isFinished: false,
          writer: user.nickname,
          writerId: user.id,
        })
      );
      form.resetFields();
    },
    [form, dispatch, user.id, user.nickname]
  );

  return (
    <>
      <Title level={3}>생성하기</Title>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        style={{ margin: "10px 0 20px" }}
        encType="multipart/form-data"
        onFinish={onSubmit}
      >
        <Form.Item
          label="제목"
          name="title"
          rules={[{ required: true, message: "내용을 입력해주세요!" }]}
        >
          <Input maxLength={30} placeholder="내용" />
        </Form.Item>
        <Form.Item
          label="내용"
          name="content"
          rules={[{ required: true, message: "내용을 입력해주세요!" }]}
        >
          <Input.TextArea maxLength={140} placeholder="내용" />
        </Form.Item>
        <Form.Item label="마감 일자" name="date_picker">
          <DatePicker style={{ width: "50%" }} placeholder="-- 날짜 선택 --" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            추가
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateForm;
