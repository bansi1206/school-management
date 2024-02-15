"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button } from "antd";
import { usePathname } from "next/navigation";
import {
  CalendarOutlined,
  CaretLeftOutlined,
  HomeOutlined,
  PoweroffOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { map } from "lodash";

type Props = {};

const menuItems = [
  {
    id: 1,
    label: "Manage",
    icon: <HomeOutlined />,
    link: "/",
    activeUrl: "/manage",
  },
  {
    id: 2,
    label: "Teachers",
    icon: <UserOutlined />,
    link: "/teacher",
    activeUrl: "/teacher",
  },
  {
    id: 3,
    label: "Students/ classes",
    icon: <SolutionOutlined />,
    link: "/student",
    activeUrl: "/student",
  },
  {
    id: 4,
    label: "Online Classes",
    icon: <CalendarOutlined />,
    link: "/onlineClasses",
    activeUrl: "/onlineClasses",
  },
];

export const Sidebar: React.FC<Props> = () => {
  const { data: user } = useSession();

  const [toggleCollapse, setToggleCollabse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const wrapperClasses = classNames("h-screen relative bg-primary", {
    ["w-[241px]"]: !toggleCollapse,
    ["w-20"]: toggleCollapse,
  });
  const collapseIconClasses = classNames(
    "text-[#fff] absolute top-0 right-0 hover:opacity-80 text-[28px] ",
    {
      "rotate-180": toggleCollapse,
    }
  );
  const pathname = usePathname();
  const activeMenu = useMemo(
    () =>
      menuItems.find(
        (menu) =>
          pathname === menu.link || pathname?.includes(menu.activeUrl || "")
      ),
    [pathname]
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex gap-2 p-3 items-center text-[#FFF] text-sm font-semibold cursor-pointer hover:bg-[#509CDB] rounded-[4px] w-full no-underline",
      {
        "justify-center": toggleCollapse,
        ["bg-[#509CDB]"]: activeMenu?.id === menu?.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollabse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="container flex flex-col items-center">
        <div className="border-b-2 border-[#BDBDBD] p-8 w-full flex justify-center">
          {user ? (
            <div>
              <div className="cursor-pointer flex flex-col items-center gap-3">
                <Avatar src={user?.user?.image} size={67} />
                {isCollapsible && (
                  <CaretLeftOutlined
                    className={collapseIconClasses}
                    onClick={handleSidebarToggle}
                  />
                )}
                <div className="text-sm text-[#fff] font-semibold">
                  {user?.user?.name}
                </div>
                {toggleCollapse ? (
                  <PoweroffOutlined
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="text-[14px] text-[#fff] cursor-pointer hover:opacity-80"
                  />
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    className="rounded-[5px]"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <Button
              type="primary"
              size="large"
              className="rounded-[5px]"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Sign In
            </Button>
          )}
        </div>
        <div className="max-w-[192px] mt-[27px] flex flex-col gap-5">
          {map(menuItems, (menu) => (
            <Link
              href={menu?.link}
              key={menu?.id}
              className={getNavItemClasses(menu)}
            >
              <div>{menu?.icon}</div>
              <div className={classNames({ hidden: toggleCollapse })}>
                {menu?.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
