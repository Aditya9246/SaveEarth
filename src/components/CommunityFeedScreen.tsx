import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const feedPosts = [
  {
    id: 1,
    userName: "Alex Rivers",
    userAvatar: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?w=100&h=100&fit=crop",
    challengeIcon: "🥗",
    challengeName: "Zero-Waste Lunch Challenge",
    proofImage: "https://images.unsplash.com/photo-1672886941662-e40d4c2428a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZXJvJTIwd2FzdGUlMjBsdW5jaCUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc2MzIzMjc2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 42,
    comments: 8,
    timeAgo: "2h ago",
  },
  {
    id: 2,
    userName: "Maya Chen",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    challengeIcon: "💧",
    challengeName: "Reusable Bottle Challenge",
    proofImage: "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwZWNvfGVufDF8fHx8MTc2MzE0NjQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 31,
    comments: 5,
    timeAgo: "4h ago",
  },
  {
    id: 3,
    userName: "Jordan Lee",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    challengeIcon: "🏖️",
    challengeName: "Beach Cleanup Challenge",
    proofImage: "https://images.unsplash.com/photo-1610093666020-baec20684087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNsZWFudXAlMjBvY2VhbnxlbnwxfHx8fDE3NjMyMTg2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 89,
    comments: 15,
    timeAgo: "6h ago",
  },
  {
    id: 4,
    userName: "Sam Taylor",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    challengeIcon: "🛍️",
    challengeName: "Reusable Bags Challenge",
    proofImage: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&fit=crop",
    likes: 25,
    comments: 3,
    timeAgo: "8h ago",
  },
];

export function CommunityFeedScreen() {
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
        {feedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
      </div>
    </div>
  );
}