import { Filter } from "lucide-react";
import React, { useState } from "react";

interface FilterButtonProps {
  filterFields: {
    title: boolean;
    body: boolean;
  };
  onFilterChange: (newFilters: { title: boolean; body: boolean }) => void;
}

export default function FilterButton({
  filterFields,
  onFilterChange,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (field: keyof typeof filterFields) => {
    const newFilters = {
      ...filterFields,
      [field]: !filterFields[field],
    };

    // Prevent both filters from being disabled
    if (!newFilters.title && !newFilters.body) return;
    onFilterChange(newFilters);
  };

  return (
    <div className="relative">
      <button
        className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Filter size={16} />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="p-2 space-y-2">
            <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={filterFields.title}
                onChange={() => handleCheckboxChange("title")}
                className="form-checkbox h-4 w-4 text-purple-600"
              />
              <span>Title</span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={filterFields.body}
                onChange={() => handleCheckboxChange("body")}
                className="form-checkbox h-4 w-4 text-purple-600"
              />
              <span>Body</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
