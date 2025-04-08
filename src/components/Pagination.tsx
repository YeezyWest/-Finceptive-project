"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-500">
        <ChevronLeft size={16} className="inline mr-1" />
        {currentPage}-10 of {totalItems}
        <ChevronRight size={16} className="inline ml-1" />
      </span>
    </div>
  );
}
