import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Trophy, Users, Share2, Crown } from "lucide-react";

interface TeamScreenProps {
  userPoints: number;
}

interface TeamMember {
  id: number | string;
  name: string;
  avatar: string;
  points?: number; // will get filled in for current user
  rank: number;
  isCurrentUser: boolean;
}

// Base team members (points for everyone except current user are defaults)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Pratul Saini",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQFjHMOYPJmJHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723360379238?e=1764806400&v=beta&t=Fnx3EGy5ELH784-cMe3w5HH04iASrH9XdvVikSqUZ4I",
    rank: 1,
    isCurrentUser: true,
  },
  {
    id: 2,
    name: "Nipun Saini",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQFKmdq9RHbF7Q/profile-displayphoto-scale_400_400/B56ZmYnL7sJwAg-/0/1759202034050?e=1764806400&v=beta&t=6HoavbtvsZLUzYZAKptBE2910t2cRfqjEaCgBli6J14",
    points: 320,
    rank: 2,
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Jinay Doshi",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQGkwRY5Xy-xng/profile-displayphoto-crop_800_800/B56ZpsOQROHIAI-/0/1762752269070?e=1764806400&v=beta&t=TinxdbI_ng4EVG8wXxOpEk4d7yLIcL-Fu0BIBLMmS_8",
    points: 285,
    rank: 3,
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "Aditya Gajula",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQExK6Lxk3Bwrg/profile-displayphoto-scale_400_400/B56ZqMOZtHJoAk-/0/1763289178377?e=1764806400&v=beta&t=iqyoxp_I5seR04SjDiI4Exv_5IjTRaLj6EdYcCmmYl4",
    points: 240,
    rank: 4,
    isCurrentUser: false,
  },
];

export function TeamScreen({ userPoints }: TeamScreenProps) {
  // Update current user's points with the actual userPoints
  const updatedMembers = teamMembers.map((member) =>
    member.isCurrentUser ? { ...member, points: userPoints } : member
  );

  // Sort members by points to update rankings (highest → lowest)
  const sortedMembers = [...updatedMembers].sort(
    (a, b) => (b.points ?? 0) - (a.points ?? 0)
  );

  const membersWithUpdatedRank = sortedMembers.map((member, index) => ({
    ...member,
    points: member.points ?? 0,
    rank: index + 1,
  }));

  const topContributor = membersWithUpdatedRank[0];
  const totalPoints = membersWithUpdatedRank.reduce(
    (sum, member) => sum + member.points,
    0
  );

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 pb-6 rounded-2xl border-2 border-blue-400"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white mb-1">Coastal Avengers</h2>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Users className="w-4 h-4" />
                <span>{membersWithUpdatedRank.length} Members</span>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <Trophy className="w-8 h-8 text-yellow-300" />
            </div>
          </div>

          {/* Team Avatars */}
          <div className="flex items-center justify-center mb-4">
            {membersWithUpdatedRank.slice(0, 4).map((member, index) => (
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
            {membersWithUpdatedRank.length > 4 && (
              <div className="-ml-2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border-4 border-white flex items-center justify-center text-white">
                +{membersWithUpdatedRank.length - 4}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="px-6 pb-6">
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
              <div className="text-gray-800">{topContributor?.name}</div>
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
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              This Week
            </Badge>
          </div>

          <div className="space-y-3 mb-6">
            {membersWithUpdatedRank.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300"
                    : member.isCurrentUser
                    ? "bg-green-50 border-2 border-green-200"
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
                  <div className="text-gray-800">
                    {member.name}
                    {member.isCurrentUser && (
                      <span className="text-green-600 text-sm ml-2">
                        (You)
                      </span>
                    )}
                  </div>
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
