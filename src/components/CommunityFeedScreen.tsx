import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export interface FeedPost {
  id: string;
  userName: string;
  userAvatar: string;
  challengeIcon: string;
  challengeName: string;
  proofImage: string;
  likes: number;
  comments: number;
  timeAgo: string;
}

interface CommunityFeedScreenProps {
  posts: FeedPost[];
}

export function CommunityFeedScreen({ posts }: CommunityFeedScreenProps) {
  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-2xl border-2 border-green-400"
        >
          <h2 className="text-white mb-1">Community Feed</h2>
          <p className="text-white/90 text-sm">
            See what others are achieving
          </p>
        </motion.div>
      </div>

      {/* Feed Posts */}
      <div className="px-6 pb-6 space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <ImageWithFallback
                src={post.userAvatar}
                alt={post.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="text-gray-800">{post.userName}</div>
                <div className="text-sm text-gray-500">{post.timeAgo}</div>
              </div>
              <div className="text-2xl">{post.challengeIcon}</div>
            </div>

            {/* Post Image */}
            <div className="relative aspect-square">
              <ImageWithFallback
                src={post.proofImage}
                alt={post.challengeName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Actions */}
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <Button variant="ghost" size="sm" className="gap-2 -ml-2">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  <span className="text-gray-700">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">{post.comments}</span>
                </Button>
              </div>

              {/* Caption */}
              <p className="text-gray-700">
                <span>{post.userName}</span>{" "}
                <span className="text-gray-600">
                  completed the {post.challengeName}! 🎉
                </span>
              </p>
            </div>
          </motion.div>
        ))}

        {posts.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-6">
            No posts yet. Complete a challenge to share your first win!
          </p>
        )}
      </div>
    </div>
  );
}
