import { motion } from "motion/react";
import { ExternalLink, BookOpen, Video, FileText } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Pack a Plastic-Free Lunch",
    description: "Simple ideas to ditch plastic bags and wrappers in your lunchbox.",
    icon: "🥗",
    type: "guide",
    color: "from-green-400 to-emerald-500",
    url: "https://seabinfoundation.org/welcome-to-the-waste-free-lunchbox-challenge/",
  },
  {
    id: 2,
    title: "10 Ways to Reduce Plastic Pollution",
    description: "Everyday actions to cut plastic before it reaches the ocean.",
    icon: "💧",
    type: "article",
    color: "from-blue-400 to-cyan-500",
    url: "https://www.nrdc.org/stories/10-ways-reduce-plastic-pollution",
  },
  {
    id: 3,
    title: "Take the Plastic Use Challenge",
    description: "Do a home plastic audit and track how much you really use.",
    icon: "🏠",
    type: "guide",
    color: "from-orange-400 to-red-500",
    url: "https://ocean.org/action/take-the-plastic-challenge/",
  },
  {
    id: 4,
    title: "7 Solutions to Ocean Plastic",
    description: "Clear breakdown of the biggest fixes for ocean plastic waste.",
    icon: "🌊",
    type: "article",
    color: "from-purple-400 to-pink-500",
    url: "https://www.oceanicsociety.org/resources/7-ways-to-reduce-ocean-plastic-pollution-today/",
  },
  {
    id: 5,
    title: "Eco Lunch Essentials",
    description: "Why reusable containers matter for the ocean + how to choose them.",
    icon: "🧺",
    type: "article",
    color: "from-teal-400 to-green-500",
    url: "https://www.seasmartschool.com/blog/eco-lunch-essentials",
  },
  {
    id: 6,
    title: "Guide to Plastics in the Ocean",
    description: "What ocean plastic is, where it comes from, and how to stop it.",
    icon: "♻️",
    type: "guide",
    color: "from-lime-400 to-green-500",
    url: "https://oceanservice.noaa.gov/hazards/marinedebris/plastics-in-the-ocean.html",
  },
  {
    id: 7,
    title: "Host a Community Cleanup",
    description: "Toolkit for running a beach, river, or neighborhood clean-up.",
    icon: "🏖️",
    type: "guide",
    color: "from-indigo-400 to-blue-500",
    url: "https://www.greenpeace.org/usa/community-plastic-clean-up/",
  },
  {
    id: 8,
    title: "Ocean Plastic: Deeper Dive",
    description: "Data-backed overview of ocean-bound plastics and real solutions.",
    icon: "📊",
    type: "article",
    color: "from-green-500 to-teal-500",
    url: "https://www.ecoenclose.com/resources/ocean-plastic",
  },
];

const typeIcons = {
  guide: BookOpen,
  article: FileText,
  video: Video,
};

export function ResourceHubScreen() {
  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl border-2 border-purple-400"
        >
          <h2 className="text-white mb-1">Resource Hub</h2>
          <p className="text-white/90 text-sm">
            Learn how to cut plastic and protect our oceans
          </p>
        </motion.div>
      </div>

      {/* Resources Grid */}
      <div className="px-6 pb-6 space-y-4">
        {resources.map((resource, index) => {
          const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons];

          return (
            <motion.a
              key={resource.id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
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
            </motion.a>
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
          <h3 className="mb-2">Have an ocean-saving tip?</h3>
          <p className="text-white/90 text-sm mb-4">
            Share a video, article, or guide that helped you cut plastic.
          </p>
          <button className="bg-white text-green-600 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
            Submit Resource
          </button>
        </motion.div>
      </div>
    </div>
  );
}
