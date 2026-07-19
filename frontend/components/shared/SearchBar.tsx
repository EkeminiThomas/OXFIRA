"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-72">
      <Search size={16} className="text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
      />
    </div>
  );
}