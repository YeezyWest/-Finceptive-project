"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export default function DashboardLayout({
  children,
  activePage = "overview",
}: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar activePage={activePage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="flex justify-end items-center border-b p-4">
          <div className="flex items-center gap-4">
            <button className="text-gray-500 md:block hidden hover:text-gray-700">
              <HelpCircle size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="rounded-full  flex items-center justify-center overflow-hidden">
                <img src="/assets/Avatar.svg" alt="TU" className="md:h-7 md:w-7 w-10 h-10 " />
              </div>
              <span className="md:block hidden text-sm font-medium">Tee</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 hidden md:block"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
