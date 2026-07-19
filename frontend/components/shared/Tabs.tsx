interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex gap-2 items-center  border-gray-100">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 text-sm font-medium w-full cursor-pointer border border-[#3F3F3F] rounded-md text-black transition-colors ${
              isActive
                ? "bg-text-hue rounded-md text-white px-4 "
                : "border-gray-100 text-black hover:text-text-hue"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}