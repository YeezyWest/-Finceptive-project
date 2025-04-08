"use client";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  ArrowLeftRight,
  PiggyBank,
  Wallet,
  CreditCard,
  BarChart2,
  ShieldCheck,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
}

function NavItem({ icon, label, to, isActive }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
        isActive
          ? "bg-purple-700 text-white"
          : "text-white/80 hover:bg-purple-700/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface SidebarProps {
  activePage?: string;
}

export default function Sidebar({ activePage = "overview" }: SidebarProps) {
 const [isOpen, setIsOpen] = useState(() => {
   if (typeof window !== "undefined") {
     return window.innerWidth > 768;
   }
   return false;
 });

 useEffect(() => {
   const handleResize = () => {
     if (window.innerWidth > 768) {
       setIsOpen(true);
     } else {
       setIsOpen(false);
     }
   };

   window.addEventListener("resize", handleResize);
   return () => window.removeEventListener("resize", handleResize);
 }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Overview",
      to: "/overview",
      id: "overview",
    },
    { icon: <Users size={20} />, label: "Users", to: "/users", id: "users" },
    {
      icon: <FileText size={20} />,
      label: "Posts",
      to: "/dashboard",
      id: "posts",
    },
    {
      icon: <ArrowLeftRight size={20} />,
      label: "Transfers",
      to: "/transfers",
      id: "transfers",
    },
    {
      icon: <PiggyBank size={20} />,
      label: "Deposits",
      to: "/deposits",
      id: "deposits",
    },
    {
      icon: <Wallet size={20} />,
      label: "Savings",
      to: "/savings",
      id: "savings",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Bill Payment",
      to: "/bills",
      id: "bills",
    },
    {
      icon: <BarChart2 size={20} />,
      label: "Reports",
      to: "/reports",
      id: "reports",
    },
    {
      icon: <ShieldCheck size={20} />,
      label: "Compliance",
      to: "/compliance",
      id: "compliance",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      to: "/settings",
      id: "settings",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-[#7000F6] text-white w-64 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out
          fixed md:relative inset-y-0 left-0 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-4">
          <img
            src="/assets/logo.svg"
            alt="Mobile app preview"
            className="w-30 30"
          />
        </div>

        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 text-[16px]  rounded-md flex items-center justify-center bg-purple-700 text-white font-medium">
            TU
          </div>
          <div className="flex flex-col ">
            <span className="text-sm font-medium">Test User</span>
            <span className="text-xs text-[#E4E4E7]">test@user.com</span>
          </div>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              to={item.to}
              isActive={activePage === item.id}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
