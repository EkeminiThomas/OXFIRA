// components/layout/SidebarContainer.tsx  ← logic only
"use client";

import {
  LayoutDashboard, Users, BarChart2,
  FileText, Calendar, Bell, Settings, LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";


import Sidebar from "../layouts/Sidebar";
import { usePermission } from "@/app/hooks/usePermission";

const NAV_ITEMS = [
  { label: "Dashboard",     href: "/dashboard",     icon: LayoutDashboard },
  { label: "Users",         href: "/users",          icon: Users           },
   { label: "Calendar",      href: "/calendar",       icon: Calendar        },
  { label: "Analytics",     href: "/analytics",      icon: BarChart2       },
  { label: "Reports",       href: "/reports",        icon: FileText        },
 
  { label: "Notifications", href: "/notifications",  icon: Bell            },
];

const BOTTOM_ITEMS = [
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarContainer() {
  const router   = useRouter();
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