import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, Gift, Lock, Check } from "lucide-react";
import { rewards as allRewards } from "../data";

interface RewardsScreenProps {
  onBack: () => void;
  totalPoints: number;
  redeemedRewards: string[];
  onRedeemReward: (rewardId: string, rewardPoints: number) => void;
}

export function RewardsScreen({
  onBack,
  totalPoints,
  redeemedRewards,
  onRedeemReward,
}: RewardsScreenProps) {
  const rewards = allRewards.map((reward) => ({
    ...reward,
    color: "from-green-400 to-emerald-400", // Default color
  }));
  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 pb-8 rounded-b-3xl"
      >
        <button
          onClick={onBack}
          className="mb-4 text-white/90 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/40">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-1">Your Points</h2>
            <div className="text-white text-3xl">{totalPoints}</div>
          </div>
        </div>
      </motion.div>

      {/* Rewards List */}
      <div className="p-6 pb-24">
        <h3 className="text-gray-800 mb-4">Available Rewards</h3>
        <div className="space-y-3">
          {rewards.map((reward, index) => {
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canRedeem = totalPoints >= reward.points && !isRedeemed;

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl p-4 border-2 ${
                  isRedeemed
                    ? "border-green-300 bg-green-50"
                    : canRedeem
                    ? "border-gray-100"
                    : "border-gray-100 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                      isRedeemed
                        ? "from-green-400 to-emerald-500"
                        : reward.color
                    } flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {isRedeemed ? (
                      <Check className="w-8 h-8 text-white" />
                    ) : canRedeem ? (
                      "🎁"
                    ) : (
                      <Lock className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-gray-800">{reward.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {reward.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            isRedeemed
                              ? "bg-green-100 text-green-700 border-green-300"
                              : canRedeem
                              ? "bg-purple-100 text-purple-700 border-purple-300"
                              : "bg-gray-100 text-gray-500 border-gray-300"
                          }
                        >
                          {reward.points} pts
                        </Badge>
                      </div>
                      <Button
                        disabled={!canRedeem}
                        size="sm"
                        className={`rounded-full ${
                          isRedeemed ? "bg-green-600 hover:bg-green-700" : ""
                        }`}
                        onClick={() =>
                          !isRedeemed &&
                          onRedeemReward(reward.id, reward.points)
                        }
                      >
                        {isRedeemed
                          ? "Redeemed"
                          : canRedeem
                          ? "Redeem"
                          : "Locked"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}