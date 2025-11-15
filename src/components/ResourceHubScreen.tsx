import { motion } from "motion/react";
import { ExternalLink, BookOpen, Video, FileText } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Zero-Waste Lunch: 3 Simple Recipes",
    description: "Learn how to prepare delicious plastic-free lunches",
    icon: "🥗",
    type: "guide",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 2,
    title: "Best Reusable Water Bottles",
    description: "Find the perfect sustainable bottle for your lifestyle",
    icon: "💧",
    type: "article",
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 3,
    title: "How to Do a Home Plastic Audit",
    description: "Step-by-step guide to identify plastic in your home",
    icon: "🏠",
    type: "guide",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 4,
    title: "Eco-Friendly Shopping Guide",
    description: "Tips for choosing products with minimal packaging",
    icon: "🛍️",
    type: "article",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 5,
    title: "DIY Natural Cleaning Products",
    description: "Make your own plastic-free cleaning supplies",
    icon: "🧼",
    type: "video",
    color: "from-teal-400 to-green-500",
  },
  {
    id: 6,
    title: "Composting for Beginners",
    description: "Everything you need to start composting at home",
    icon: "🌱",
    type: "guide",
    color: "from-lime-400 to-green-500",
  },
  {
    id: 7,
    title: "Plastic-Free Travel Tips",
    description: "How to reduce waste while traveling",
    icon: "✈️",
    type: "article",
    color: "from-indigo-400 to-blue-500",
  },
  {
    id: 8,
    title: "Understanding Recycling Symbols",
    description: "Decode plastic recycling codes and dispose properly",
    icon: "♻️",
    type: "guide",
    color: "from-green-500 to-teal-500",
  },
];

const typeIcons = {
  guide: BookOpen,
  article: FileText,
  video: Video,
};

export function ResourceHubScreen() {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-b-3xl mb-6 sticky top-0 z-10"
      >
        <h2 className="text-white mb-1">Resource Hub</h2>
        <p className="text-white/90 text-sm">
          Guides and tips for your sustainability journey
        </p>
      </motion.div>

      {/* Resources Grid */}
      <div className="px-6 pb-6 space-y-4">
        {resources.map((resource, index) => {
          const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons];
          
          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start gap-4 p-4">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <div className="text-3xl">{resource.icon}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-gray-800 group-hover:text-green-600 transition-colors">
                      {resource.title}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors flex-shrink-0" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <TypeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 capitalize">
                      {resource.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl p-6 text-center text-white"
        >
          <div className="text-4xl mb-3">💡</div>
          <h3 className="mb-2">Have a tip to share?</h3>
          <p className="text-white/90 text-sm mb-4">
            Help grow our community knowledge base
          </p>
          <button className="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Submit Resource
          </button>
        </motion.div>
      </div>
    </div>
  );
}
