"use client";

import { CheckCircle, AlertCircle, X } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-500"
      : type === "error"
      ? "bg-red-50 border-red-500"
      : "bg-blue-50 border-blue-500";

  const textColor =
    type === "success"
      ? "text-green-800"
      : type === "error"
      ? "text-red-800"
      : "text-blue-800";

  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed right-4 top-4 z-50 flex w-full max-w-sm items-center rounded-lg border-l-4 p-4 shadow-md transition-all duration-300 ${bgColor} ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="mr-3 flex-shrink-0">
        <Icon className={`h-5 w-5 ${textColor}`} />
      </div>
      <div className={`mr-2 flex-1 text-sm font-medium ${textColor}`}>
        {message}
      </div>
      <button
        type="button"
        className={`-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 hover:bg-gray-100 focus:ring-2 ${textColor}`}
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
