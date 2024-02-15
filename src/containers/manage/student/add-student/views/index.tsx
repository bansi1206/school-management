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
  classes: any;
};

export const AddStudent: React.FC<Props> = ({ user, classes }) => {
  const [form] = Form.useForm();

  const [users, setUsers] = useState<string>("");
  const [userClass, setUserClass] = useState<string>("");
  const [gender, setGender] = useState<String>("");
  const [dob, setDob] = useState<String>("");
  const userOptions: SelectProps["options"] = map(user, (user) => ({
    label: user?.email,
    value: user?.id,
  }));
  const classOptions: SelectProps["options"] = map(classes, (classes) => ({
    label: classes?.title,
    value: classes?.id,
  }));
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
  };
  const handleUserChange = (value: string) => {
    setUsers(value);
  };
  const handleClassChange = (value: string) => {
    setUserClass(value);
  };
  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const onFinish = useCallback(
    async (values: any) => {
      const selectedClassId = { classId: values.classId[0] };
      const selectedUserId = { userId: values.userId[0] };

      const requestBody = {
        ...values,
        ...selectedClassId,
        ...selectedUserId,
        dob: dob,
      };

      try {
        const response = await axios.post("/api/student", requestBody);

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
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Add Student</h1>
        </div>
      </div>
      <div className="container flex justify-center mt-10">
        <div className="min-w-[35%] shadow-md p-4">
          <h2 className="mb-3">Add Student Form</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" required>
              <Input placeholder="Enter student name" />
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
            <Form.Item label="Class" name="classId" required>
              <Select
                mode="tags"
                maxCount={1}
                style={{ width: "100%" }}
                placeholder="Choose a class"
                onChange={handleClassChange}
                options={classOptions}
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
              <Input placeholder="Enter student phone" />
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
