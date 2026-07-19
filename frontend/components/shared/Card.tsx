import { Platform, Post } from "@/types";
import { Clock, MoreVertical, LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { FaInstagram, FaFacebook, FaXTwitter } from "react-icons/fa6";


interface PostCardProps {
  post: Post;
  onPublish: (postId: string) => void;
  actionLabel?: string;
}

const PLATFORM_ICONS: Record<Platform, IconType> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  x: FaXTwitter,
};

export default function PostCard({ post, onPublish, actionLabel = "Publish Now" }: PostCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* media */}
      <div className="relative h-40 w-full">
        <img
          src={post.imageUrl}
          alt=""
          className="h-full w-full object-cover rounded-t-2xl"
        />
        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-sm">
          {post.platforms.map((platform) => {
            const Icon = PLATFORM_ICONS[platform];
            return <Icon key={platform} size={14} className="text-gray-700" />;
          })}
          {post.extraPlatformCount > 0 && (
            <span className="text-xs font-medium text-gray-500">
              +{post.extraPlatformCount}
            </span>
          )}
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="w-fit rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
            {post.status}
          </span>
          <MoreVertical size={16} className="text-gray-400" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Clock size={12} />
          {post.scheduledLabel}
        </div>

        <p className="text-sm text-gray-600">{post.description}</p>

        <button
          onClick={() => onPublish(post.id)}
          className="mt-2 w-full rounded-lg bg-text-hue py-2.5 text-sm font-medium cursor-pointer text-white"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}