import { Link } from "react-router-dom";
import type { NavItem as NavItemType } from "../../config/navigation";
import React from "react";

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
}

export default function NavItem({ item, isActive }: NavItemProps) {
  const { icon: Icon, label, to } = item;

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
        isActive
          ? "bg-purple-700 text-white"
          : "text-white/80 hover:bg-purple-700/50"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}
