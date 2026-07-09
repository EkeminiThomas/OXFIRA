// components/layout/SidebarContainer.tsx  ← logic only
"use client";

import {
  LayoutDashboard, Users, BarChart2,
  FileText, Calendar, Bell, Settings, LogOut,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";


import Sidebar from "../layouts/Sidebar";
import { usePermission } from "@/app/hooks/usePermission";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Posts", href: "/posts", icon: FileText },
  { label: "Schedule", href: "/schedule", icon: Calendar },
  { label: "Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Engagements", href: "/engagements", icon: MessageCircle },
  { label: "Help", href: "/help", icon: HelpCircle },
];

const BOTTOM_ITEMS = [
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarContainer() {
  const router = useRouter();
  const canSeeUsers = usePermission("users:read");

  const filteredNav = NAV_ITEMS.filter((item) => {
    if (item.href === "/users") return canSeeUsers;
    return true;
  });

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <Sidebar
      navItems={filteredNav}
      bottomItems={BOTTOM_ITEMS}
      onLogout={handleLogout}
    />
  );
}