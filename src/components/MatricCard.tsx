import React from "react";

interface MetricCardProps {
  title: string;
  value: number;
  subtext?: string;
  viewDetailsLink: string;
}

export default function MetricCard({
  title,
  value,
  subtext,
  viewDetailsLink,
}: MetricCardProps) {
  return (
    <div className="bg-[#F9F9F9] p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-[12px] mb-2 text-[#223E3B]">{title}</h3>
      <div className="flex items-end gap-2 ">
        <span className="text-3xl font-medium">{value.toLocaleString()}</span>
        {subtext && (
          <span className="text-xs font-normal text-gray-500 mb-1">
            {subtext}
          </span>
        )}
      </div>
      <a
        href={viewDetailsLink}
        className="text-xs text-[#7000F6] hover:underline"
      >
        View details
      </a>
    </div>
  );
}
