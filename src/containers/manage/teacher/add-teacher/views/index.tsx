"use client";

import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  SelectProps,
  message,
} from "antd";
import { useCallback, useState } from "react";
import axios from "axios";
import { map } from "lodash";

type Props = {
  user: any;
};

export const AddTeacher: React.FC<Props> = ({ user }) => {
  const [form] = Form.useForm();

  const [users, setUsers] = useState<string>("");
  const [gender, setGender] = useState<String>("");
  const [dob, setDob] = useState<String>("");
  const userOptions: SelectProps["options"] = map(user, (user) => ({
    label: user?.email,
    value: user?.id,
  }));
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
  };
  const handleUserChange = (value: string) => {
    setUsers(value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const onFinish = useCallback(
    async (values: any) => {
      const selectedUserId = { userId: values.userId[0] };

      const requestBody = {
        ...values,
        ...selectedUserId,
        dob: dob,
      };

      try {
        const response = await axios.post("/api/teacher", requestBody);

        form.resetFields();
        if (response.data.status === 200) {
          message.success(response.data.msg);
        } else if (response.data.status === 401) {
          message.error(response.data.msg);
        }
      } catch (error) {
        console.error("Error submitting form:", error);

        message.error("Something Wrong!");
      }
    },
    [dob, form]
  );

  return (
    <div>
      <div className="bg-[#FCFAFA] w-full h-[95px] flex items-center">
        <div className="container">
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Add Teacher</h1>
        </div>
      </div>
      <div className="container flex justify-center mt-10">
        <div className="min-w-[35%] shadow-md p-4">
          <h2 className="mb-3">Add Teacher Form</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" required>
              <Input placeholder="Enter teacher name" />
            </Form.Item>
            <Form.Item label="Email" name="userId" required>
              <Select
                mode="tags"
                maxCount={1}
                style={{ width: "100%" }}
                placeholder="Choose an email"
                onChange={handleUserChange}
                options={userOptions}
              />
            </Form.Item>
            <Form.Item label="Date of Birth" name="dob" required>
              <DatePicker onChange={onChange} />
            </Form.Item>
            <Form.Item label="Gender" name="gender" required>
              <Select
                placeholder="Select a gender"
                onChange={handleGenderChange}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </Form.Item>
            <Form.Item label="Phone" name="phone" required>
              <Input placeholder="Enter teacher phone" />
            </Form.Item>
            <Form.Item label="Department" name="department" required>
              <Input placeholder="Enter teacher department" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
