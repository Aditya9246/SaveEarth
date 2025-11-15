import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Droplet, ShoppingBag, Calendar, Award, Lock } from "lucide-react";

interface PassportScreenProps {
  completedStamps: string[];
  onFindChallenge: () => void;
}

const stamps = [
  { id: "straw", label: "No Straws", icon: "🥤", color: "from-orange-400 to-red-400" },
  { id: "bottle", label: "Reusable Bottle", icon: "💧", color: "from-blue-400 to-cyan-400" },
  { id: "bag", label: "Reusable Bags", icon: "🛍️", color: "from-green-400 to-emerald-400" },
  { id: "lunch", label: "Zero-Waste Lunch", icon: "🥗", color: "from-yellow-400 to-orange-400" },
  { id: "coffee", label: "Bring Your Cup", icon: "☕", color: "from-amber-400 to-orange-400" },
  { id: "plastic-free", label: "Plastic-Free Week", icon: "🌱", color: "from-green-400 to-teal-400" },
  { id: "cleanup", label: "Beach Cleanup", icon: "🏖️", color: "from-blue-400 to-indigo-400" },
  { id: "recycle", label: "Recycle Champion", icon: "♻️", color: "from-green-500 to-blue-500" },
  { id: "compost", label: "Composting", icon: "🌿", color: "from-lime-400 to-green-400" },
];

export function PassportScreen({ completedStamps, onFindChallenge }: PassportScreenProps) {
  const stats = {
    bottlesAvoided: completedStamps.length * 15,
    bagsSaved: completedStamps.length * 8,
    daysOnJourney: 7,
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500 to-blue-500 p-6 pb-8 rounded-b-3xl"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHNtaWxlfGVufDF8fHx8MTc2MzIyNTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-4 border-white"
            />
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
              <Award className="w-4 h-4 text-yellow-900" />
            </div>
          </div>
          <div>
            <h2 className="text-white">Sarah Green</h2>
            <Badge className="bg-white/20 text-white border-white/40">
              Eco-Tourist
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Passport Grid */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800">Digital Passport</h3>
            <span className="text-sm text-gray-500">
              {completedStamps.length} / {stamps.length}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {stamps.map((stamp, index) => {
              const isCompleted = completedStamps.includes(stamp.id);
              return (
                <motion.div
                  key={stamp.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center ${
                    isCompleted
                      ? `bg-gradient-to-br ${stamp.color} shadow-lg`
                      : "bg-gray-100 border-2 border-dashed border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <div className="text-4xl mb-1">{stamp.icon}</div>
                      <span className="text-xs text-white text-center">
                        {stamp.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-6 h-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400 text-center">
                        Locked
                      </span>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-gray-100 p-6 mb-6"
        >
          <h3 className="text-gray-800 mb-4">Your Impact</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-blue-600 mb-1">{stats.bottlesAvoided}</div>
              <div className="text-xs text-gray-600">Bottles Avoided</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-green-600 mb-1">{stats.bagsSaved}</div>
              <div className="text-xs text-gray-600">Bags Saved</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-orange-600 mb-1">{stats.daysOnJourney}</div>
              <div className="text-xs text-gray-600">Days Journey</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onFindChallenge}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full py-6"
          >
            Find New Challenge
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
