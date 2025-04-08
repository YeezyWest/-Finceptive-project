import React from "react";

interface LogoProps {
  variant?: "default" | "white";
}

export default function Logo({ variant = "default" }: LogoProps) {
  const textColor = variant === "white" ? "text-white" : "text-purple-600";

  return (
    <div className={`flex items-center ${textColor} font-bold text-xl`}>
      <span>spatch</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-1"
      >
        <path
          d="M7 17L17 7M17 7H8M17 7V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
