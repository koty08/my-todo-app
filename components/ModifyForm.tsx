import { Button, DatePicker, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import Router from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { EDIT_TODO } from "../reducers/todo";
import { MODIFY_DONE } from "../reducers/user";

const ModifyForm = () => {
  const { modifyData } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!(modifyData && modifyData.id)) {
      Router.push("/");
    }
  }, [modifyData && modifyData.id]);

  useEffect(() => {
    if (modifyData) {
      form.setFieldsValue({
        title: modifyData.title,
        content: modifyData.content,
      });
      if (modifyData.date !== "무기한") {
        form.setFieldValue("date_picker", moment(modifyData.date));
      }
    }
  });

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  if (!modifyData) {
    return null;
  }

  const onCancelClicked = (e: any) => {
    dispatch({ type: MODIFY_DONE });
  };

  const onSubmit = (values: any) => {
    dispatch({
      type: EDIT_TODO,
      data: {
        id: modifyData.id,
        title: values.title,
        content: values.content,
        // date 오류 수정 필요
        date: values.date_picker
          ? values.date_picker.format("YYYY-MM-DD")
          : "무기한",
        isFinished: modifyData.isFinished,
        writer: modifyData.writer,
        writerId: modifyData.writerId,
      },
    });
    form.resetFields();
    dispatch({ type: MODIFY_DONE });
  };

  return (
    <>
      <Title level={3}>수정하기</Title>
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
          <Button
            onClick={onCancelClicked}
            style={{ float: "right", marginLeft: 10 }}
          >
            취소
          </Button>
          <Button type="primary" style={{ float: "right" }} htmlType="submit">
            수정
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ModifyForm;
