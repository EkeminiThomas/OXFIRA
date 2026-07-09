// components/layout/Sidebar.tsx  ← presentational only
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LucideIcon } from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface Props {
    navItems: NavItem[];
    bottomItems: NavItem[];
    onLogout: () => void;
}

export default function Sidebar({ navItems, bottomItems, onLogout }: Props) {
    const pathname = usePathname();

    return (
        <aside className="flex flex-col justify-between w-16 h-screen p-6  items-center py-4 shadow-lg border-r border-gray-500">

            {/* top nav links */}
            <nav className="flex flex-col items-center gap-1 w-full">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <div key={href} className="relative group">
                            <Link
                                href={href}
                                className={`flex items-center justify-center w-11 h-11 rounded-lg transition-colors
          ${isActive
                                        ? "bg-blue-600/20 text-text-hue"
                                        : "text-gray-400 hover:bg-text-hue hover:text-white"
                                    }`}
                            >
                                <Icon size={20} />
                            </Link>

                            {/* tooltip */}
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="relative bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                    {/* arrow */}
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800" />
                                    {label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </nav>

            {/* bottom — settings + logout */}
            <div className="flex flex-col items-center gap-1 w-full">
                <div className="w-8 h-px bg-gray-700 mb-1" />

                {bottomItems.map(({ label, href, icon: Icon }) => (
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
                    onClick={onLogout}
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