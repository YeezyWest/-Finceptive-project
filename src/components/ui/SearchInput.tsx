import type { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function SearchInput({
  className = "",
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="search"
        className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
