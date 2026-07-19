// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    BarChart2,
    Calendar,
    Settings,
    HelpCircle,
    MessageCircle,
    LogOut,
    LucideIcon,
    LifeBuoy,
} from "lucide-react";
import { FaSquarePlus } from "react-icons/fa6";
import { IconType } from "react-icons";
import { IoAnalytics } from "react-icons/io5";


type NavIcon = LucideIcon | IconType;

interface NavItem {
    label: string;
    href: string;
    icon: NavIcon;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Posts", href: "/posts", icon: FaSquarePlus },
    { label: "Schedule", href: "/schedule", icon: Calendar },
    {
        label: "Analytics", href: "/analytics", icon: IoAnalytics
    },
    { label: "Engagements", href: "/engagements", icon: MessageCircle },
    { label: "Help", href: "/help", icon: LifeBuoy  },
];

const BOTTOM_ITEMS: NavItem[] = [
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (err) {
            console.error("Logout request failed", err);
        } finally {
            router.push("/login");
        }
    }

    return (
        <aside className="flex flex-col justify-between w-16 h-screen p-6 items-center py-4 shadow-lg border-r border-gray-500">
            <nav className="flex flex-col items-center gap-1 w-full">
                {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <div key={href} className="relative group">
                            <Link
                                href={href}
                                className={`flex items-center justify-center w-11 h-11 rounded-lg transition-colors
                  ${isActive ? "bg-blue-600/20 text-text-hue" : "text-gray-400 hover:bg-text-hue hover:text-white"}`}
                            >
                                <Icon size={20} />
                            </Link>

                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="relative bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                                    {label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </nav>

            <div className="flex flex-col items-center gap-1 w-full">
                <div className="w-8 h-px bg-gray-700 mb-1" />

                {BOTTOM_ITEMS.map(({ label, href, icon: Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        className="group relative flex items-center justify-center w-11 h-11 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <Icon size={20} />
                        <span className="absolute left-full ml-3 px-2 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                            {label}
                        </span>
                    </Link>
                ))}

                <button
                    onClick={handleLogout}
                    className="group relative flex items-center justify-center w-11 h-11 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="absolute left-full ml-3 px-2 py-1 text-xs text-white bg-gray-800 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                        Log out
                    </span>
                </button>
            </div>
        </aside>
    );
}