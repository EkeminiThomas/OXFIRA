import { scheduledPosts } from "@/app/data/SchedulePost"

export default function SchedulePost (){
    return (
        <div>
           
              <h1 className="font-bold" >Schedule Posts</h1>
            <div className="w-full">
                <h1 className="font-bold mb-3">Schedule post</h1>
                <div className="flex flex-col gap-3 w-full">
                    {scheduledPosts.map((post) => (
                        <div
                            key={post.id}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-12 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{post.title}</span>
                                <span className="text-xs text-gray-400">{post.caption}</span>
                                <span className="text-xs text-gray-400">{post.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}