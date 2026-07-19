
"use client";
import { Post } from "@/types";
import { useState, useMemo } from "react";


interface UseTabFilterResult {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredItems: Post[];
}

export function useTabFilter(items: Post[], tabs: string[]): UseTabFilterResult {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const filteredItems = useMemo(
    () => items.filter((item) => item.status === activeTab),
    [items, activeTab]
  );

  return { activeTab, setActiveTab, filteredItems };
}