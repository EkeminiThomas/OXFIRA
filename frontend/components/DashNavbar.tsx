"use client";

import {
  Bell,
  ChevronDown,
  Menu,
  Plus,
  Search,
} from "lucide-react";

export default function DashNavbar() {
  return (
    <header className="sticky top-0 z-50 h-20 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile menu button */}
          <button className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
            <Menu size={22} />
          </button>

          <h1 className="text-xl font-bold text-blue-brand md:text-2xl">
            Oxfira
          </h1>
        </div>

        {/* Search */}
        <div className="hidden flex-1 px-8 md:flex">
          <div className="flex w-full max-w-lg items-center rounded-xl bg-gray-100 px-4 py-3">
            <Search
              size={18}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search posts..."
              className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Mobile Search */}
          <button className="rounded-lg p-2 hover:bg-gray-100 md:hidden">
            <Search size={20} />
          </button>

          {/* New Post */}
          <button className="flex items-center rounded-xl bg-blue-brand px-3 py-2 text-white transition hover:opacity-90 md:px-5">

            <Plus size={18} />

            <span className="ml-2 hidden lg:inline">
              New Post
            </span>
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-gray-100">

            <Bell
              size={22}
              className="text-gray-600"
            />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          {/* Profile */}
          <button className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100">

            {/* Avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-brand text-white font-semibold">
              JO
            </div>

            {/* User Info */}
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-semibold text-navy-900">
                Jehosaphat Omage
              </p>
              <p className="text-xs text-gray-500">
                Content Creator
              </p>
            </div>

            {/* Dropdown */}
            <ChevronDown
              size={18}
              className="hidden md:block text-gray-500"
            />
          </button>
        </div>
      </div>
    </header>
  );
}