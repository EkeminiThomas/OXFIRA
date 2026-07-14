"use client";
import Image from 'next/image'
import {
  Bell,
  ChevronDown,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import SearchBar from "./shared/SearchBar";

import { TopNavProps } from "@/types/nav";

export default function DashNavbar({ userName, userRole, avatarUrl }: TopNavProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue-600" />
        <span className="font-bold text-lg">OXFiRA</span>
      </div>

      <SearchBar />

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          New post
        </button>
        <button type="button" aria-label="Notifications" className="text-gray-400 hover:text-gray-600">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Image
            src={avatarUrl}
            alt={userName}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">{userName}</span>
            <span className="text-xs text-gray-400">{userRole}</span>
          </div>
        </div>
      </div>
    </header>

  );
}