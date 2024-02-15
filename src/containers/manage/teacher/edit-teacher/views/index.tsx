"use client";

import {
  Button,
  DatePicker,
  DatePickerProps,
  Input,
  Popconfirm,
  Select,
  SelectProps,
  Table,
  message,
} from "antd";
import axios from "axios";
import { map } from "lodash";
import { useState } from "react";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
  teachers: any;
  user: any;
};

export const EditTeacher: React.FC<Props> = ({ teachers, user }) => {
  const [dataSource, setDataSource] = useState(teachers);
  const userOptions: SelectProps["options"] = map(user, (user) => ({
    label: user?.email,
    value: user?.id,
  }));

  const [editableRowId, setEditableRowId] = useState<string | null>(null);
  const [editableName, setEditableName] = useState<string | null>(null);
  const [editableUser, setEditableUser] = useState<string | null>(null);
  const [editableDob, setEditableDob] = useState<string | null>(null);
  const [editableGender, setEditableGender] = useState<string | null>(null);
  const [editablePhone, setEditablePhone] = useState<string | null>(null);
  const [editableDepartment, setEditableDepartment] = useState<string | null>(
    null
  );
  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setEditableDob(dateString);
  };
  const handleUserChange = (value: string) => {
    setEditableUser(value[0]);
  };
  const handleGenderChange = (value: string) => {
    setEditableGender(value);
  };

  const handleSearch = (selectedKeys: string[], confirm: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string | string[]) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) => {
      const dataIndexArray = Array.isArray(dataIndex) ? dataIndex : [dataIndex];
      const targetValue = dataIndexArray.reduce(
        (obj, key) => (obj ? obj[key] : null),
        record
      );
      return targetValue.toString().toLowerCase().includes(value.toLowerCase());
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <Input
              type="text"
              value={editableName !== null ? editableName : text}
              onChange={(e) => setEditableName(e.target.value)}
            />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      ...getColumnSearchProps(["user", "email"]),
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <Select
              value={editableUser !== null ? editableUser : text}
              mode="tags"
              maxCount={1}
              style={{ width: "100%" }}
              placeholder="Choose an email"
              onChange={handleUserChange}
              options={userOptions}
            />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      ...getColumnSearchProps("dob"),
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <DatePicker
              value={text ? dayjs(text) : null}
              onChange={onDateChange}
            />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <Select
              value={editableGender !== null ? editableGender : text}
              placeholder="Select a gender"
              onChange={handleGenderChange}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
            />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <Input
              type="text"
              value={editablePhone !== null ? editablePhone : text}
              onChange={(e) => setEditablePhone(e.target.value)}
            />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      ...getColumnSearchProps("department"),
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <Input
              type="text"
              value={editableDepartment !== null ? editableDepartment : text}
              onChange={(e) => setEditableDepartment(e.target.value)}
            />
          ) : (
            text
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: { id: any }) => (
        <span className="flex gap-3">
          {editableRowId === record.id ? (
            <>
              <Button
                type="primary"
                onClick={() => handleSave(record.id)}
                htmlType="submit"
              >
                Save
              </Button>
              <Button onClick={() => handleCancelEdit(record.id)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => handleEdit(record.id)}>
              Edit
            </Button>
          )}
          <Popconfirm
            title="Are you sure you want to delete this teacher?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    const studentToEdit = teachers.find(
      (item: { id: string }) => item.id === id
    );
    if (studentToEdit) {
      setEditableRowId(id);
      setEditableName(studentToEdit.name);
      setEditableUser(studentToEdit.user.id);
      setEditableDob(studentToEdit.dob);
      setEditableGender(studentToEdit.gender);
      setEditablePhone(studentToEdit.phone);
      setEditableDepartment(studentToEdit.department);
    }
  };

  const handleSave = async (id: any) => {
    try {
      const response = await axios.put("/api/teacher", {
        id: id,
        editableName: editableName,
        editableUser: editableUser,
        editableDob: editableDob,
        editableGender: editableGender,
        editablePhone: editablePhone,
        editableDepartment: editableDepartment,
      });

      if (response.data.status === 200) {
        setDataSource((prevData: any[]) =>
          prevData.map((item) =>
            item.id === id
              ? {
                  ...item,
                  name: editableName,
                  user: { email: editableUser },
                  dob: editableDob,
                  gender: editableGender,
                  phone: editablePhone,
                  department: editableDepartment,
                }
              : item
          )
        );
        message.success("Teacher updated successfully!");
      } else if (response.data.status === 401) {
        message.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
    }

    setEditableRowId(null);
    setEditableName(null);
    setEditableUser(null);
    setEditableDob(null);
    setEditableGender(null);
    setEditablePhone(null);
    setEditableDepartment(null);
  };

  const handleCancelEdit = (id: string) => {
    setEditableRowId(null);
    setEditableName(null);
    setEditableUser(null);
    setEditableDob(null);
    setEditableGender(null);
    setEditablePhone(null);
    setEditableDepartment(null);
  };

  const handleDelete = async (record: any) => {
    const { id, userId } = record;
    try {
      const response = await axios.delete("/api/teacher", {
        data: { id, userId },
      });
      if (response.data.success) {
        setDataSource((prevData: any[]) =>
          prevData.filter((item) => item.id !== id)
        );
        message.success("User deleted successfully!");
      } else {
        message.error("Error deleting teacher:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };
  return (
    <div>
      <div className="bg-[#FCFAFA] w-full h-[95px] flex items-center">
        <div className="container">
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Edit Teacher</h1>
        </div>
      </div>
      <div className="container flex justify-center mt-10">
        <div className="min-w-[35%] shadow-md p-4">
          <h2 className="mb-3">Edit Teacher</h2>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};
