'use client'
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { day: "Mar 23", Facebook: 90, Instagram: 65, X: 25 },
  { day: "Mar 24", Facebook: 55, Instagram: 75, X: 20 },
  { day: "Mar 25", Facebook: 90, Instagram: 65, X: 15 },
  { day: "Mar 26", Facebook: 55, Instagram: 75, X: 25 },
];
export default function Engagements() {
  const [range, setRange] = useState("Mar 23-26");
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Post Engagement</h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-md px-2 py-1"
        >
          {range}
          <ChevronDown size={14} />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={4}>
          <CartesianGrid vertical={false} stroke="#F3F4F6" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
          <Bar dataKey="Facebook" fill="#93C5FD" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Instagram" fill="#2563EB" radius={[4, 4, 0, 0]} />
          <Bar dataKey="X" fill="#111827" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-300" /> Facebook</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600" /> Instagram</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-900" /> X</span>
      </div>
    </div>
  )
}

