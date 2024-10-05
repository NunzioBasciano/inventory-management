"use client";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsSidebarCollapsed } from "@/state";
import { SidebarLink } from "./SidebarLink";

const Sidebar = () => {
  //onsente di inviare azioni per modificare lo stato globale gestito da Redux.
  const dispatch = useAppDispatch();

  //In questo caso, stai accedendo allo stato isSidebarCollapsed, che è una proprietà dello slice global nello stato Redux.
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  const menuLink = [
    {
      href: "/dashboard",
      icon: Layout,
      label: "Dashboard",
      isCollapsed: isSidebarCollapsed,
    },
    {
      href: "/inventory",
      icon: Archive,
      label: "Inventory",
      isCollapsed: isSidebarCollapsed,
    },
    {
      href: "/products",
      icon: Clipboard,
      label: "Products",
      isCollapsed: isSidebarCollapsed,
    },
    {
      href: "/users",
      icon: User,
      label: "Users",
      isCollapsed: isSidebarCollapsed,
    },
    {
      href: "/settings",
      icon: SlidersHorizontal,
      label: "Settings",
      isCollapsed: isSidebarCollapsed,
    },
    {
      href: "/expenses",
      icon: CircleDollarSign,
      label: "Expenses",
      isCollapsed: isSidebarCollapsed,
    },
  ];

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>logo</div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          NunzioStock
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 " />
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        {menuLink.map((el, index) => {
          return (
            <SidebarLink
              key={index}
              href={el.href}
              icon={el.icon}
              label={el.label}
              isCollapsed={el.isCollapsed}
            />
          );
        })}
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">© 2024 NunzioStock</p>
      </div>
    </div>
  );
};

export default Sidebar;
