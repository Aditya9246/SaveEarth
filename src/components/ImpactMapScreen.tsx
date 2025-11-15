import { motion } from "motion/react";
import { MapPin, TrendingUp } from "lucide-react";

const globalLocations = [
  { id: 1, x: 20, y: 35, city: "San Francisco", actions: 1234 },
  { id: 2, x: 30, y: 50, city: "New York", actions: 2341 },
  { id: 3, x: 50, y: 30, city: "London", actions: 1876 },
  { id: 4, x: 55, y: 45, city: "Barcelona", actions: 987 },
  { id: 5, x: 70, y: 25, city: "Berlin", actions: 1543 },
  { id: 6, x: 75, y: 60, city: "Mumbai", actions: 3210 },
  { id: 7, x: 85, y: 40, city: "Tokyo", actions: 2987 },
  { id: 8, x: 90, y: 70, city: "Sydney", actions: 1654 },
  { id: 9, x: 45, y: 70, city: "Cape Town", actions: 876 },
  { id: 10, x: 15, y: 60, city: "Rio de Janeiro", actions: 1432 },
];

export function ImpactMapScreen() {
  const totalActions = 82391;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-center"
      >
        <h2 className="text-white mb-2">Global Impact</h2>
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-white text-sm">Live Tracking</span>
        </div>
      </motion.div>

      {/* Total Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="px-6 mb-8 text-center"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
          <div className="text-sm text-white/70 mb-2">Global Plastic Actions</div>
          <motion.div
            key={totalActions}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-white mb-2"
          >
            {totalActions.toLocaleString()}
          </motion.div>
          <div className="text-xs text-green-400">+127 in the last hour</div>
        </div>
      </motion.div>

      {/* Map Container */}
      <div className="px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative aspect-[4/3] bg-blue-950/50 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Simplified World Map Shape */}
          <svg
            viewBox="0 0 800 600"
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simplified continents */}
            <path
              d="M 100,200 Q 150,180 200,200 L 250,180 L 280,220 L 240,250 L 180,240 Z"
              fill="currentColor"
              className="text-white/30"
            />
            <path
              d="M 300,150 Q 400,140 500,160 L 550,200 L 520,250 L 450,240 L 380,200 Z"
              fill="currentColor"
              className="text-white/30"
            />
            <path
              d="M 600,180 Q 650,170 700,190 L 720,240 L 680,260 L 620,250 Z"
              fill="currentColor"
              className="text-white/30"
            />
            <path
              d="M 150,300 L 200,320 L 180,380 L 120,360 Z"
              fill="currentColor"
              className="text-white/30"
            />
            <path
              d="M 350,350 Q 400,340 450,360 L 480,420 L 420,440 L 360,410 Z"
              fill="currentColor"
              className="text-white/30"
            />
            <path
              d="M 680,400 Q 720,390 750,410 L 740,450 L 700,460 L 670,440 Z"
              fill="currentColor"
              className="text-white/30"
            />
          </svg>

          {/* Location Pins with Pulse */}
          {globalLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              className="absolute group cursor-pointer"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Pulse rings */}
              <motion.div
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
                className="absolute inset-0 rounded-full bg-green-400"
                style={{ width: "24px", height: "24px", marginLeft: "-4px", marginTop: "-4px" }}
              />
              
              {/* Pin */}
              <div className="relative z-10">
                <MapPin className="w-6 h-6 text-green-400 drop-shadow-lg" fill="currentColor" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white rounded-lg p-2 shadow-xl whitespace-nowrap">
                  <div className="text-gray-800 text-sm">{location.city}</div>
                  <div className="text-green-600 text-xs">{location.actions} actions</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
        >
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-sm">Active Communities</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-400" />
              <span className="text-white text-sm">{globalLocations.length} Cities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
