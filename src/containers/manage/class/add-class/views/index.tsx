"use client";

import { Button, Form, Select, SelectProps, message } from "antd";
import { useCallback, useState } from "react";
import axios from "axios";

type Props = {};

export const AddClass: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [classes, setClasses] = useState<string[]>([]);
  const options: SelectProps["options"] = [];
  const onFinish = useCallback(async () => {
    try {
      const body = {
        title: classes.map((title) => title.trim()),
      };

      await axios.post("/api/class", body);

      message.success("Classes created successfully!");

      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);

      message.error("Something Wrong!");
    }
  }, [classes, form]);

  const handleChange = (value: string[]) => {
    setClasses(value);
  };
  return (
    <div>
      <div className="bg-[#FCFAFA] w-full h-[95px] flex items-center">
        <div className="container">
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Add Class</h1>
        </div>
      </div>
      <div className="container flex justify-center mt-10">
        <div className="min-w-[35%] shadow-md p-4">
          <h2 className="mb-3">Add Class Form</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Class Name" name="name" required>
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Enter classes name"
                onChange={handleChange}
                options={options}
              />
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
