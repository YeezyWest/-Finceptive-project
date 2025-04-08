import React from "react";

export default function TableSkeleton() {
  return (
    <div>
      <tr className="border-b animate-pulse">
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </td>
        <td className="py-3 px-4">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </td>
        <td className="py-3 px-4">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </td>
      </tr>
    </div>
  );
}
