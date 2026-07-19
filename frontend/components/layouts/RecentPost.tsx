import { FaRegHeart, FaRegComment, FaRetweet, FaRegBookmark } from "react-icons/fa";
import { recentPosts } from "@/data/RecentPost";
export default function RecentPost() {
    return (
        <div className="w-full">
            <h1 className="font-bold mb-3">Recent post</h1>
            <div className="flex flex-col gap-3 w-full">
                {recentPosts.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                        <img
                            src={post.image}
                            alt="post thumbnail"
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    <FaRegHeart size={12} /> {post.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaRegComment size={12} /> {post.comments}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaRetweet size={12} /> {post.shares}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaRegBookmark size={12} /> {post.bookmarks}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">{post.caption}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}