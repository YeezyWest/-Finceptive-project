"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import NavItem from "./ui/NavItem";
import { mainNavItems } from "../config/navigation";
import React from "react";

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

  return (
    <>
      {/* Mobile menu button */}
      {isOpen ? (
        // Close button inside the sidebar when open
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 left-[14.2rem] z-50 p-2 bg-white text-[#7000F6] "
        >
          <X size={20} />
        </button>
      ) : (
        // Menu button fixed to the viewport when closed
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#F7F0FF] text-[#7000F6] rounded-md shadow-sm"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out w-64
          fixed md:relative inset-y-0 left-0 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* White header section with logo */}
        <div className="bg-white p-[23.5px] md:p-[17.8px] border-b border-gray-200">
          <img src="/assets/logo.svg" alt="Spatch" className="h-6 " />
        </div>

        {/* Purple content section */}
        <div className="bg-[#7000F6] text-white flex-1 flex flex-col">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 text-[16px] rounded-md flex items-center justify-center bg-purple-700 text-white font-medium">
              TU
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Test User</span>
              <span className="text-xs text-[#E4E4E7]">test@user.com</span>
            </div>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activePage === item.id}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
