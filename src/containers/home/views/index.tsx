"use client";

import {
  BankOutlined,
  CalendarOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { ClassModal, UserModal } from "../components";
import classNames from "classnames";

type Props = {};

export const Home: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isOnlineClassOpen, setIsOnlineClassOpen] = useState(false);
  const heading3 = classNames("text-2xl font-medium text-[#4F4F4F]");
  const paragraph = classNames(
    "text-base font-normal text-[#4F4F4F] max-w-[514px] max-sm:line-clamp-2"
  );
  const icon = classNames(
    "p-[6px] rounded-[8px] bg-[#EFF3FA] flex justify-center items-center w-[36px] h-[36px] text-[#13296A] "
  );
  const groupContent = classNames("flex flex-col gap-5");
  const groupIcon = classNames("flex gap-5");
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Manage Class
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            setIsUserOpen(true);
          }}
        >
          Manage User
        </div>
      ),
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
        <div className="flex items-center justify-between py-5 max-[768px]:flex-col max-[768px]:text-center max-[768px]:gap-3">
          <h2 className="text-4xl font-semibold text-[#4F4F4F] max-[375px]:hidden">
            Welcome to your dashboard, Udemy School
          </h2>
          <Dropdown menu={{ items }}>
            <div className="cursor-pointer flex gap-1 p-2 bg-[#509CDB] rounded text-[#fff]">
              <SettingOutlined />
              Manage
            </div>
          </Dropdown>
          <ClassModal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
          <UserModal
            open={isUserOpen}
            onClose={() => {
              setIsUserOpen(false);
            }}
          />
        </div>
        <div className="flex flex-col gap-[51px] mt-16 items-center max-sm:overflow-x-auto max-sm:flex-row ">
          <div className={groupIcon}>
            <UserAddOutlined className={icon} />
            <div className={groupContent}>
              <h3 className={heading3}>Manage users</h3>
              <p className={paragraph}>
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they’ll appear on
                your site!
              </p>
            </div>
          </div>
          <div className={groupIcon}>
            <BankOutlined className={icon} />
            <div className={groupContent}>
              <h3 className={heading3}>Manage classes</h3>
              <p className={paragraph}>
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they’ll appear on
                your site!
              </p>
            </div>
          </div>
          <div className={groupIcon}>
            <CalendarOutlined className={icon} />
            <div className={groupContent}>
              <h3 className={heading3}>Manage online classes</h3>
              <p className={paragraph}>
                Create rich course content and coaching products for your
                students. When you give them a pricing plan, they’ll appear on
                your site!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
