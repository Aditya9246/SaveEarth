import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Droplet, ShoppingBag, Calendar, Award, Lock, ChevronRight } from "lucide-react";
import { useState } from "react";

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
  const [showAllStamps, setShowAllStamps] = useState(false);
  
  const stats = {
    bottlesAvoided: completedStamps.length * 15,
    bagsSaved: completedStamps.length * 8,
    daysOnJourney: 7,
  };

  // Sort stamps: completed first, then incomplete
  const sortedStamps = [...stamps].sort((a, b) => {
    const aCompleted = completedStamps.includes(a.id);
    const bCompleted = completedStamps.includes(b.id);
    
    // If both completed or both incomplete, maintain original order
    if (aCompleted === bCompleted) return 0;
    
    // Completed stamps come first
    return aCompleted ? -1 : 1;
  });

  const displayedStamps = showAllStamps ? sortedStamps : sortedStamps.slice(0, 6);

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-blue-500 p-4 pb-6 rounded-2xl border-2 border-green-400"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src="https://media.licdn.com/dms/image/v2/D5603AQFjHMOYPJmJHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723360379238?e=1764806400&v=beta&t=Fnx3EGy5ELH784-cMe3w5HH04iASrH9XdvVikSqUZ4I"
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover border-4 border-white"
              />
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
                <Award className="w-3 h-3 text-yellow-900" />
              </div>
            </div>
            <div>
              <h2 className="text-white">Pratul Saini</h2>
              <Badge className="bg-white/20 text-white border-white/40 text-xs">
                Ocean Explorer
              </Badge>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 pb-24">
        {/* Stats Section - Moved Above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border-2 border-gray-100 p-4 mb-4"
        >
          <h3 className="text-gray-800 mb-3 text-sm">Your Impact</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1">
                <Droplet className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-blue-600 mb-1 text-sm">{stats.bottlesAvoided}</div>
              <div className="text-xs text-gray-600">Bottles Avoided</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-green-600 mb-1 text-sm">{stats.bagsSaved}</div>
              <div className="text-xs text-gray-600">Bags Saved</div>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-orange-600 mb-1 text-sm">{stats.daysOnJourney}</div>
              <div className="text-xs text-gray-600">Days Journey</div>
            </div>
          </div>
        </motion.div>

        {/* Passport Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800 text-sm">SeaScore Passport</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {displayedStamps.map((stamp, index) => {
              const isCompleted = completedStamps.includes(stamp.id);
              return (
                <motion.div
                  key={stamp.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center ${
                    isCompleted
                      ? `bg-gradient-to-br ${stamp.color} shadow-lg`
                      : "bg-gray-100 border-2 border-dashed border-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <div className="text-3xl mb-1">{stamp.icon}</div>
                      <span className="text-xs text-white text-center leading-tight">
                        {stamp.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-400 text-center">
                        Locked
                      </span>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* See More Button */}
          {!showAllStamps && (
            <button
              onClick={() => setShowAllStamps(true)}
              className="w-full flex items-center justify-center gap-2 py-2 text-green-600 hover:text-green-700 transition-colors mb-3 text-sm"
            >
              <span>See more</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {showAllStamps && (
            <button
              onClick={() => setShowAllStamps(false)}
              className="w-full flex items-center justify-center gap-2 py-2 text-green-600 hover:text-green-700 transition-colors mb-3 text-sm"
            >
              <span>Show less</span>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </button>
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onFindChallenge}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full py-5"
          >
            Find New Challenge
          </Button>
        </motion.div>
      </div>
    </div>
  );
}