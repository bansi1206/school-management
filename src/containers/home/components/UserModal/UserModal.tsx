"use client";

import { CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: any;
};

export const UserModal: React.FC<Props> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[10] ">
      <div className="max-w-[640px] w-full bg-white rounded-[4px] p-4">
        <div className="flex items-center justify-between">
          <h1>Manage User</h1>
          <div
            onClick={onClose}
            className="hover:text-[red] cursor-pointer text-[24px]"
          >
            <CloseCircleOutlined />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <Link
            href="/manage/student/add-student"
            className="p-2 bg-primary text-[#fff] cursor-pointer rounded-[3px] hover:opacity-80 no-underline text-center"
          >
            Add Student
          </Link>

          <Link
            href="/manage/student/edit-student"
            className="p-2 bg-primary text-[#fff] cursor-pointer rounded-[3px] hover:opacity-80 no-underline text-center"
          >
            Edit Student
          </Link>
          <Link
            href="/manage/teacher/add-teacher"
            className="p-2 bg-primary text-[#fff] cursor-pointer rounded-[3px] hover:opacity-80 no-underline text-center"
          >
            Add Teacher
          </Link>

          <Link
            href="/manage/teacher/edit-teacher"
            className="p-2 bg-primary text-[#fff] cursor-pointer rounded-[3px] hover:opacity-80 no-underline text-center"
          >
            Edit Teacher
          </Link>
        </div>
      </div>
    </div>
  );
};
