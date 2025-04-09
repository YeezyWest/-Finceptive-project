"use client";

import { useState } from "react";
import Toast, { type ToastType } from "../components/ui/Toaster";
import React from "react";

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

export default function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    return id;
  };

  const hideToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const ToastContainer = () => (
    <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );

  return {
    showToast,
    hideToast,
    ToastContainer,
  };
}
