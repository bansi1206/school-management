"use client";

import { Button, Input, Popconfirm, Table, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

type Props = {
  classes: any;
};

export const EditClass: React.FC<Props> = ({ classes }) => {
  const [dataSource, setDataSource] = useState(classes);
  const [editableRowId, setEditableRowId] = useState<string | null>(null);
  const [editableTitle, setEditableTitle] = useState<string | null>(null);
  const handleSearch = (selectedKeys: string[], confirm: any) => {
    confirm();
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string) => ({
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
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
      render: (text: string, record: { id: string }) => (
        <span>
          {editableRowId === record.id ? (
            <Input
              type="text"
              value={editableTitle !== null ? editableTitle : text}
              onChange={(e) => setEditableTitle(e.target.value)}
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
            title="Are you sure you want to delete this class?"
            onConfirm={() => handleDelete(record.id)}
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
    const classToEdit = classes.find((item: { id: string }) => item.id === id);
    if (classToEdit) {
      setEditableRowId(id);
      setEditableTitle(classToEdit.title);
    }
  };

  const handleSave = async (id: any) => {
    try {
      const response = await axios.put("/api/class", {
        id: id,
        editableTitle: editableTitle,
      });

      if (response.data.success) {
        setDataSource((prevData: any[]) =>
          prevData.map((item) =>
            item.id === id ? { ...item, title: editableTitle } : item
          )
        );
        message.success("Class updated successfully!");
      } else {
        message.error("Error updating class:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }

    setEditableRowId(null);
    setEditableTitle(null);
  };

  const handleCancelEdit = (id: string) => {
    setEditableRowId(null);
    setEditableTitle(null);
  };

  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete("/api/class", { data: { id } });
      if (response.data.success) {
        setDataSource((prevData: any[]) =>
          prevData.filter((item) => item.id !== id)
        );
        message.success("Class deleted successfully!");
      } else {
        message.error("Error deleting class:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#FCFAFA] w-full h-[95px] flex items-center">
        <div className="container">
          <h1 className="text-[#4F4F4F] font-bold text-5xl">Edit Class</h1>
        </div>
      </div>
      <div className="container flex justify-center mt-10">
        <div className="min-w-[35%] shadow-md p-4">
          <h2 className="mb-3">Edit Class</h2>
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
