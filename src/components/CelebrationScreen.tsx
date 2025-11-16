import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { Challenge } from "../data";

interface CelebrationScreenProps {
  challenge: Challenge | null;
  onViewPassport: () => void;
}

export function CelebrationScreen({
  challenge,
  onViewPassport,
}: CelebrationScreenProps) {
  const confettiColors = [
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div className="h-full relative overflow-hidden bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 flex items-center justify-center p-8">
      {/* Confetti Animation */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 400 - 200,
            y: -50,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: 900,
            rotate: Math.random() * 720 - 360,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="relative z-10 text-center"
      >
        {/* Stamp */}
        <motion.div
          initial={{ y: -100, rotate: -180 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{
            type: "spring",
            duration: 0.8,
            delay: 0.2,
          }}
          className="mb-6"
        >
          <div className="relative mx-auto w-40 h-40 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <div className="text-7xl">{challenge?.title}</div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-900" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-white mb-2">STAMP ADDED!</h1>
          <p className="text-white/90 mb-6">{challenge?.title}</p>
        </motion.div>

        {/* Points Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="inline-block bg-white rounded-full px-6 py-3 mb-8"
        >
          <div className="text-green-600">
            +{challenge?.points} Impact Points
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onViewPassport}
            className="bg-white text-green-600 hover:bg-gray-100 rounded-full px-8 py-6"
          >
            View My Score
          </Button>
        </motion.div>
      </motion.div>

      {/* Sparkles around the screen */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute"
          style={{
            left: `${20 + (i % 4) * 20}%`,
            top: `${20 + Math.floor(i / 4) * 60}%`,
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </motion.div>
      ))}
    </div>
  );
}