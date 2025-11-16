import { motion } from "motion/react";
import { BookOpen, Target, Users, Globe, BookMarked, TrendingUp } from "lucide-react";
import { Screen } from "../App";

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems = [
  { id: "passport" as Screen, label: "Score", icon: BookOpen },
  { id: "challenges" as Screen, label: "Challenges", icon: Target },
  { id: "feed" as Screen, label: "Feed", icon: Users },
  { id: "leaderboard" as Screen, label: "Leaderboard", icon: TrendingUp },
  { id: "resources" as Screen, label: "Resources", icon: BookMarked },
];

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <div className="bg-white border-t-2 border-gray-100 px-4 py-3 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 relative ${
              isActive ? "text-green-600" : "text-gray-400"
            } transition-colors`}
            whileTap={{ scale: 0.9 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-600 rounded-full"
              />
            )}
            <Icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}