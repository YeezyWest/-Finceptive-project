import { Filter } from "lucide-react";
import React from "react";

export default function FilterButton() {
  return (
    <button className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
      <Filter size={16} />
      <span>Filters</span>
    </button>
  );
}
