"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { HelpCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

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
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activePage={activePage} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-auto transition-margin duration-300 ${
          isMobile ? "ml-" : ""
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center border-b p-4">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/assets/logo.svg" alt="Spatch" className="h-6" />
          </div>

          {/* Right side with question mark and user profile */}
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <HelpCircle size={20} />
            </button>

            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/assets/Avatar.svg"
                  alt="Tee"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <span className="text-sm font-medium">Tee</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500"
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
