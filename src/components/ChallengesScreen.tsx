import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Wine, Zap, Trophy, CheckCircle } from "lucide-react";

interface ChallengesScreenProps {
  onSelectChallenge: (challenge: any) => void;
  completedStamps: string[];
}

const challenges = [
  // Bronze
  {
    id: "straw",
    title: "Refuse Plastic Straws for 1 Week",
    difficulty: "bronze",
    points: 20,
    icon: "🥤",
    description: "Say no to plastic straws everywhere you go",
  },
  {
    id: "bottle",
    title: "Use Reusable Water Bottle Daily",
    difficulty: "bronze",
    points: 15,
    icon: "💧",
    description: "Carry your water bottle for 7 days straight",
  },
  {
    id: "bag",
    title: "Bring Reusable Shopping Bags",
    difficulty: "bronze",
    points: 20,
    icon: "🛍️",
    description: "Use reusable bags for all shopping trips",
  },
  // Silver
  {
    id: "lunch",
    title: "Pack Zero-Waste Lunch for a Week",
    difficulty: "silver",
    points: 40,
    icon: "🥗",
    description: "No single-use containers or wrappers",
  },
  {
    id: "coffee",
    title: "Bring Your Own Coffee Cup",
    difficulty: "silver",
    points: 35,
    icon: "☕",
    description: "Use reusable cup for all coffee purchases",
  },
  {
    id: "plastic-free",
    title: "Go Plastic-Free for a Week",
    difficulty: "silver",
    points: 50,
    icon: "🌱",
    description: "Avoid all single-use plastics",
  },
  // Gold
  {
    id: "cleanup",
    title: "Organize a Beach Cleanup",
    difficulty: "gold",
    points: 100,
    icon: "🏖️",
    description: "Lead a cleanup event in your community",
  },
  {
    id: "recycle",
    title: "Master Home Recycling",
    difficulty: "gold",
    points: 80,
    icon: "♻️",
    description: "Properly sort and recycle for a month",
  },
  {
    id: "compost",
    title: "Start Composting at Home",
    difficulty: "gold",
    points: 90,
    icon: "🌿",
    description: "Set up and maintain a compost system",
  },
];

const difficultyConfig = {
  bronze: {
    color: "from-orange-400 to-amber-500",
    badgeClass: "bg-orange-100 text-orange-700 border-orange-300",
    icon: Wine,
  },
  silver: {
    color: "from-gray-300 to-gray-400",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-300",
    icon: Zap,
  },
  gold: {
    color: "from-yellow-400 to-yellow-500",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-300",
    icon: Trophy,
  },
};

export function ChallengesScreen({ onSelectChallenge, completedStamps }: ChallengesScreenProps) {
  const bronzeChallenges = challenges.filter((c) => c.difficulty === "bronze");
  const silverChallenges = challenges.filter((c) => c.difficulty === "silver");
  const goldChallenges = challenges.filter((c) => c.difficulty === "gold");

  const renderChallengeSection = (
    title: string,
    sectionChallenges: typeof challenges,
    difficulty: keyof typeof difficultyConfig
  ) => {
    const config = difficultyConfig[difficulty];
    const Icon = config.icon;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-gray-800">{title}</h3>
        </div>

        <div className="space-y-3">
          {sectionChallenges.map((challenge, index) => {
            const isCompleted = completedStamps.includes(challenge.id);
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl p-4 border-2 ${
                  isCompleted ? "border-green-300 bg-green-50" : "border-gray-100"
                } transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{challenge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-gray-800">{challenge.title}</h4>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={config.badgeClass}>
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </Badge>
                        <span className="text-sm text-green-600">
                          +{challenge.points} pts
                        </span>
                      </div>
                      {!isCompleted && (
                        <Button
                          onClick={() => onSelectChallenge(challenge)}
                          size="sm"
                          className="rounded-full"
                          variant={difficulty === "bronze" ? "default" : "default"}
                        >
                          {difficulty === "bronze" ? "Accept" : "Start & Upload"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500 to-blue-500 p-6 rounded-b-3xl mb-6"
      >
        <h2 className="text-white mb-2">Challenges</h2>
        <p className="text-white/90 text-sm">
          Complete challenges to earn stamps and level up
        </p>
      </motion.div>

      <div className="px-6 pb-6">
        {renderChallengeSection("Bronze Challenges", bronzeChallenges, "bronze")}
        {renderChallengeSection("Silver Challenges", silverChallenges, "silver")}
        {renderChallengeSection("Gold Challenges", goldChallenges, "gold")}
      </div>
    </div>
  );
}
