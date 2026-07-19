'use client'
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import Tabs from "@/components/shared/Tabs";
import { mockPosts, TABS } from "@/data/PostCard";
import { useTabFilter } from "@/hooks/useTabFilter";
import { CirclePlus, Plus } from "lucide-react";



export default function Page() {
  const { activeTab, setActiveTab, filteredItems } = useTabFilter(mockPosts, TABS);
  const handlePublish = (postId: string) => {
    console.log("publish", postId);
  }

  return (
    <div>
      <section className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 m-4 sm:m-5">

        <div className="flex flex-col">
          <span className="font-bold text-xl sm:text-2xl">Welcome Thomas!</span>
          <span className="text-sm sm:text-base text-txt-gray">Here’s what is happening with your post today.</span>
        </div>
        <Button
          icon={<CirclePlus color="#ffffff" />}

          text="New Post"
          className="flex items-center justify-center gap-2 bg-text-hue text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
        />
      </section>


      <section>
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredItems.length === 0 ? (
              <p className="text-sm text-gray-400">No posts in this tab.</p>
            ) : (
              filteredItems.map((post) => (
                <Card key={post.id} post={post} onPublish={handlePublish} />
              ))
            )}
          </div>
        </div>

      </section>

    </div>
  )
}