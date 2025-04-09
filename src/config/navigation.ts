import {
  LayoutDashboard,
  Users,
  FileText,
  ArrowLeftRight,
  PiggyBank,
  Wallet,
  CreditCard,
  BarChart2,
  ShieldCheck,
  Settings,
} from "lucide-react";

export interface NavItem {
  icon: typeof LayoutDashboard;
  label: string;
  to: string;
  id: string;
}

export const mainNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    to: "/overview",
    id: "overview",
  },
  {
    icon: Users,
    label: "Users",
    to: "/users",
    id: "users",
  },
  {
    icon: FileText,
    label: "Posts",
    to: "/dashboard",
    id: "posts",
  },
  {
    icon: ArrowLeftRight,
    label: "Transfers",
    to: "/transfers",
    id: "transfers",
  },
  {
    icon: PiggyBank,
    label: "Deposits",
    to: "/deposits",
    id: "deposits",
  },
  {
    icon: Wallet,
    label: "Savings",
    to: "/savings",
    id: "savings",
  },
  {
    icon: CreditCard,
    label: "Bill Payment",
    to: "/bills",
    id: "bills",
  },
  {
    icon: BarChart2,
    label: "Reports",
    to: "/reports",
    id: "reports",
  },
  {
    icon: ShieldCheck,
    label: "Compliance",
    to: "/compliance",
    id: "compliance",
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/settings",
    id: "settings",
  },
];
