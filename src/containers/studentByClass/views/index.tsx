"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, message } from "antd";
import axios from "axios";
import Link from "next/link";

type Props = {
  students: any;
};

export const StudentByClass: React.FC<Props> = ({ students }) => {
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
    },
    {
      title: "Class",
      dataIndex: ["class", "title"],
      key: "class",
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      ...getColumnSearchProps(["user", "email"]),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      ...getColumnSearchProps("dob"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
  ];

  return (
    <div>
      <div className="bg-[#FCFAFA] w-full h-[95px] flex items-center">
        <div className="container">
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Dashboard</h1>
        </div>
      </div>
      <div className="container mt-[53px]">
        <div>
          <h2 className="text-4xl font-semibold text-[#4F4F4F] max-[375px]:hidden">
            Class {students?.classInfo?.title}
          </h2>
          <Table
            dataSource={students.students}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};
