import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Wine,
  Zap,
  Trophy,
  CheckCircle,
  Gift,
  ChevronRight,
} from "lucide-react";

import { Challenge } from "../data";
import { useChallenges } from "../hooks/useChallenges";

interface ChallengesScreenProps {
  onSelectChallenge: (challenge: Challenge) => void;
  completedStamps: string[];
  onOpenRewards: () => void;
  totalPoints: number;
}

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

// helper to sort by points (least → most)
const sortByPoints = (items: Challenge[]) =>
  [...items].sort((a, b) => (a.points || 0) - (b.points || 0));

export function ChallengesScreen({
  onSelectChallenge,
  completedStamps,
  onOpenRewards,
  totalPoints,
}: ChallengesScreenProps) {
  const { challenges, loading, error } = useChallenges();

  // Filter then sort by points ascending
  const bronzeChallenges = sortByPoints(
    challenges.filter(
      (c) => (c.category === "Food" || c.category === "Home") && c.points < 40
    )
  );

  const silverChallenges = sortByPoints(
    challenges.filter(
      (c) => (c.category === "Food" || c.category === "Home") && c.points >= 40
    )
  );

  const goldChallenges = sortByPoints(
    challenges.filter((c) => c.category === "Community")
  );

  const renderChallengeSection = (
    title: string,
    sectionChallenges: Challenge[],
    difficulty: keyof typeof difficultyConfig
  ) => {
    const config = difficultyConfig[difficulty];
    const Icon = config.icon;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${config.color} flex items-center justify-center`}
          >
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
                  isCompleted
                    ? "border-green-300 bg-green-50"
                    : "border-gray-100"
                } transition-all`}
              >
                <div className="flex items-start gap-3">
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
                          {difficulty.charAt(0).toUpperCase() +
                            difficulty.slice(1)}
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
                          variant="default"
                        >
                          {difficulty === "bronze"
                            ? "Accept"
                            : "Start & Upload"}
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

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading challenges…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 pb-4">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onOpenRewards}
          className="w-full bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl flex items-center justify-between hover:shadow-lg transition-shadow border-2 border-purple-400"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border-2 border-white/40">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white/90 text-sm">Your Points</div>
              <div className="text-white text-2xl">{totalPoints}</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      <div className="px-6 pb-6">
        {renderChallengeSection(
          "Bronze Challenges",
          bronzeChallenges,
          "bronze"
        )}
        {renderChallengeSection(
          "Silver Challenges",
          silverChallenges,
          "silver"
        )}
        {renderChallengeSection("Gold Challenges", goldChallenges, "gold")}
      </div>
    </div>
  );
}
