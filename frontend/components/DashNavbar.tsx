"use client";
import Image from 'next/image'
import {
  Bell,
  ChevronDown,
  CirclePlus,
  Menu,
  Plus,
  Search,
} from "lucide-react";
import SearchBar from "./shared/SearchBar";
import Button from './shared/Button';
import { FaPlusCircle } from 'react-icons/fa';

export default function DashNavbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue-600" />
        <span className="font-bold text-lg">OXFiRA</span>
      </div>

      <SearchBar />

      <div className="flex items-center gap-4">
        <Button
          icon={<CirclePlus color="#ffffff" />}
          text="New Post"
          className="flex items-center gap-2 bg-text-hue text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        />
        <div className="flex items-center gap-2">
          <Bell size={20} className='md:flex' />
          <Image
            src='/HeroIcon'
            alt="user icon"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[12px] font-semibold"> Omage Prosper </span>
            <span className="text-[9px] text-gray-400">Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}