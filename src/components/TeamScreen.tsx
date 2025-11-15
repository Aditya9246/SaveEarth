import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Trophy, Users, Share2, Crown } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Green",
    avatar: "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?w=100&h=100&fit=crop",
    points: 350,
    rank: 1,
  },
  {
    id: 2,
    name: "Alex Rivers",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    points: 320,
    rank: 2,
  },
  {
    id: 3,
    name: "Maya Chen",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    points: 285,
    rank: 3,
  },
  {
    id: 4,
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    points: 240,
    rank: 4,
  },
  {
    id: 5,
    name: "Sam Taylor",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    points: 195,
    rank: 5,
  },
];

export function TeamScreen() {
  const topContributor = teamMembers[0];
  const totalPoints = teamMembers.reduce((sum, member) => sum + member.points, 0);

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 pb-8 rounded-b-3xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white mb-1">Coastal Avengers</h2>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Users className="w-4 h-4" />
              <span>{teamMembers.length} Members</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
        </div>

        {/* Team Avatars */}
        <div className="flex items-center justify-center mb-4">
          {teamMembers.slice(0, 4).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="-ml-2 first:ml-0"
            >
              <ImageWithFallback
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </motion.div>
          ))}
          {teamMembers.length > 4 && (
            <div className="-ml-2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border-4 border-white flex items-center justify-center text-white">
              +{teamMembers.length - 4}
            </div>
          )}
        </div>
      </motion.div>

      <div className="p-6">
        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6"
        >
          <h3 className="text-gray-800 mb-4">Team Impact</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="text-green-600 mb-1">500</div>
              <div className="text-sm text-gray-600">Bottles Saved</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-blue-600 mb-1">{totalPoints}</div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
          </div>
          <div className="mt-4 bg-white rounded-xl p-4 flex items-center gap-3">
            <Crown className="w-5 h-5 text-yellow-500" />
            <div>
              <div className="text-sm text-gray-600">Top Contributor</div>
              <div className="text-gray-800">{topContributor.name}</div>
            </div>
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Leaderboard</h3>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              This Week
            </Badge>
          </div>

          <div className="space-y-3 mb-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300"
                    : "bg-white border-2 border-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0
                      ? "bg-yellow-400 text-yellow-900"
                      : index === 1
                      ? "bg-gray-300 text-gray-700"
                      : index === 2
                      ? "bg-orange-300 text-orange-900"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {index === 0 ? (
                    <Crown className="w-4 h-4" />
                  ) : (
                    <span>{member.rank}</span>
                  )}
                </div>
                <ImageWithFallback
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-gray-800">{member.name}</div>
                </div>
                <div className="text-green-600">{member.points} pts</div>
              </motion.div>
            ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full py-6">
            <Share2 className="w-4 h-4 mr-2" />
            Invite Friends
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
