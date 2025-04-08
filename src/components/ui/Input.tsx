import type { InputHTMLAttributes } from "react";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
