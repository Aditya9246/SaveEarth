import { useState } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { PassportScreen } from "./components/PassportScreen";
import { ChallengesScreen } from "./components/ChallengesScreen";
import { UploadProofScreen } from "./components/UploadProofScreen";
import { CelebrationScreen } from "./components/CelebrationScreen";
import { CommunityFeedScreen } from "./components/CommunityFeedScreen";
import { TeamScreen } from "./components/TeamScreen";
import { ResourceHubScreen } from "./components/ResourceHubScreen";
import { RewardsScreen } from "./components/RewardsScreen";
import { BottomNav } from "./components/BottomNav";
import type { Challenge } from "./data";
import { rewards } from "./data";
import type { FeedPost } from "./components/CommunityFeedScreen";

export type Screen =
  | "onboarding"
  | "passport"
  | "challenges"
  | "upload-proof"
  | "celebration"
  | "feed"
  | "team"
  | "impact-map"
  | "resources"
  | "rewards";

const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: "seed-1",
    userName: "Alex Rivers",
    userAvatar:
      "https://images.unsplash.com/photo-1672462478040-a5920e2c23d8?w=100&h=100&fit=crop",
    challengeIcon: "🥗",
    challengeName: "Zero-Waste Lunch Challenge",
    proofImage:
      "https://images.unsplash.com/photo-1672886941662-e40d4c2428a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZXJvJTIwd2FzdGUlMjBsdW5jaCUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc2MzIzMjc2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 42,
    comments: 8,
    timeAgo: "2h ago",
  },
  {
    id: "seed-2",
    userName: "Maya Chen",
    userAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    challengeIcon: "💧",
    challengeName: "Reusable Bottle Challenge",
    proofImage:
      "https://images.unsplash.com/photo-1605274280925-9dd1baacb97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXVzYWJsZSUyMHdhdGVyJTIwYm90dGxlJTIwZWNvfGVufDF8fHx8MTc2MzE0NjQwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 31,
    comments: 5,
    timeAgo: "4h ago",
  },
  {
    id: "seed-3",
    userName: "Jordan Lee",
    userAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    challengeIcon: "🏖️",
    challengeName: "Beach Cleanup Challenge",
    proofImage:
      "https://images.unsplash.com/photo-1610093666020-baec20684087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGNsZWFudXAlMjBvY2VhbnxlbnwxfHx8fDE3NjMyMTg2MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 89,
    comments: 15,
    timeAgo: "6h ago",
  },
  {
    id: "seed-4",
    userName: "Sam Taylor",
    userAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    challengeIcon: "🛍️",
    challengeName: "Reusable Bags Challenge",
    proofImage:
      "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&fit=crop",
    likes: 25,
    comments: 3,
    timeAgo: "8h ago",
  },
];

// simple helper to pick an icon from challenge category
function getChallengeIcon(challenge: Challenge): string {
  switch (challenge.id) {
    case "reusable_bottle":
      return "💧";
    case "no_straw":
      return "🥤";
    case "tote_bag":
      return "🛍️";
    case "solo_cleanup":
    case "community_cleanup":
      return "🏖️";
    default:
      if (challenge.category === "Food") return "🥗";
      if (challenge.category === "Home") return "🏡";
      if (challenge.category === "Community") return "🌍";
      return "🌱";
  }
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [completedStamps, setCompletedStamps] = useState<string[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);
  const [earnedPoints, setEarnedPoints] = useState<number>(0);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(INITIAL_FEED_POSTS);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen("passport");
  };

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentScreen("upload-proof");
  };

  // 🔥 now receives imageUrl from UploadProofScreen when validation is accepted
  const handleProofSubmitted = (imageUrl: string) => {
    if (selectedChallenge) {
      // mark stamp complete (by ID)
      setCompletedStamps((prev) => [...prev, selectedChallenge.id]);
      // add challenge points
      setEarnedPoints((prev) => prev + (selectedChallenge.points || 0));

      // add a new post to the community feed
      const newPost: FeedPost = {
        id: `user-${Date.now()}`,
        userName: "Pratul Saini",
        userAvatar:
          "https://media.licdn.com/dms/image/v2/D5603AQFjHMOYPJmJHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723360379238?e=1764806400&v=beta&t=Fnx3EGy5ELH784-cMe3w5HH04iASrH9XdvVikSqUZ4I",
        challengeIcon: getChallengeIcon(selectedChallenge),
        challengeName: selectedChallenge.title,
        proofImage: imageUrl,
        likes: 0,
        comments: 0,
        timeAgo: "Just now",
      };

      setFeedPosts((prev) => [newPost, ...prev]);
    }
    setCurrentScreen("celebration");
  };

  const handleCelebrationDone = () => {
    setCurrentScreen("passport");
  };

  const handleRedeemReward = (rewardId: string, rewardPoints: number) => {
    setRedeemedRewards((prev) => [...prev, rewardId]);
  };

  const spentPoints = redeemedRewards.reduce((sum, rewardId) => {
    const reward = rewards.find((r) => r.id === rewardId);
    return sum + (reward?.points || 0);
  }, 0);

  const totalPoints = earnedPoints - spentPoints;

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
      case "passport":
        return (
          <PassportScreen
            completedStamps={completedStamps}
            onFindChallenge={() => setCurrentScreen("challenges")}
          />
        );
      case "challenges":
        return (
          <ChallengesScreen
            onSelectChallenge={handleSelectChallenge}
            completedStamps={completedStamps}
            onOpenRewards={() => setCurrentScreen("rewards")}
            totalPoints={totalPoints}
          />
        );
      case "upload-proof":
        return (
          <UploadProofScreen
            challenge={selectedChallenge}
            onSubmit={handleProofSubmitted}
            onBack={() => setCurrentScreen("challenges")}
          />
        );
      case "celebration":
        return (
          <CelebrationScreen
            challenge={selectedChallenge}
            onViewPassport={handleCelebrationDone}
          />
        );
      case "feed":
        return <CommunityFeedScreen posts={feedPosts} />;
      case "team":
        return <TeamScreen userPoints={totalPoints} />;
      case "resources":
        return <ResourceHubScreen />;
      case "rewards":
        return (
          <RewardsScreen
            onBack={() => setCurrentScreen("challenges")}
            totalPoints={totalPoints}
            redeemedRewards={redeemedRewards}
            onRedeemReward={handleRedeemReward}
          />
        );
      default:
        return null;
    }
  };

  const showBottomNav =
    hasCompletedOnboarding &&
    currentScreen !== "onboarding" &&
    currentScreen !== "celebration" &&
    currentScreen !== "rewards";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[812px] bg-white rounded-3xl shadow-2xl overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-y-auto">{renderScreen()}</div>
        {showBottomNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}
      </div>
    </div>
  );
}
