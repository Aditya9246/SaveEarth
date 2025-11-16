import { useState } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { PassportScreen } from "./components/PassportScreen";
import { ChallengesScreen } from "./components/ChallengesScreen";
import { UploadProofScreen } from "./components/UploadProofScreen";
import { CelebrationScreen } from "./components/CelebrationScreen";
import { CommunityFeedScreen } from "./components/CommunityFeedScreen";
import { TeamScreen } from "./components/TeamScreen";
import { ImpactMapScreen } from "./components/ImpactMapScreen";
import { ResourceHubScreen } from "./components/ResourceHubScreen";
import { RewardsScreen } from "./components/RewardsScreen";
import { BottomNav } from "./components/BottomNav";

export type Screen = 
  | "onboarding"
  | "passport"
  | "challenges"
  | "upload-proof"
  | "celebration"
  | "feed"
  | "leaderboard"
  | "impact-map"
  | "resources"
  | "rewards";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [completedStamps, setCompletedStamps] = useState<string[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen("passport");
  };

  const handleSelectChallenge = (challenge: any) => {
    setSelectedChallenge(challenge);
    setCurrentScreen("upload-proof");
  };

  const handleProofSubmitted = () => {
    if (selectedChallenge) {
      setCompletedStamps([...completedStamps, selectedChallenge.id]);
    }
    setCurrentScreen("celebration");
  };

  const handleCelebrationDone = () => {
    setCurrentScreen("passport");
  };

  // Calculate total points from completed challenges
  const challenges = [
    { id: "straw", points: 20 },
    { id: "bottle", points: 15 },
    { id: "bag", points: 20 },
    { id: "lunch", points: 40 },
    { id: "coffee", points: 35 },
    { id: "plastic-free", points: 50 },
    { id: "cleanup", points: 100 },
    { id: "recycle", points: 80 },
    { id: "compost", points: 90 },
  ];
  
  const earnedPoints = completedStamps.reduce((sum, stampId) => {
    const challenge = challenges.find(c => c.id === stampId);
    return sum + (challenge?.points || 0);
  }, 0);

  const handleRedeemReward = (rewardId: string, rewardPoints: number) => {
    setRedeemedRewards([...redeemedRewards, rewardId]);
  };

  // Calculate available points (earned minus redeemed)
  const rewards = [
    { id: "discount-5", points: 100 },
    { id: "discount-10", points: 250 },
    { id: "coffee-voucher", points: 150 },
    { id: "tree-planted", points: 200 },
    { id: "discount-20", points: 500 },
    { id: "cleanup-kit", points: 300 },
    { id: "water-bottle", points: 400 },
    { id: "tote-bag", points: 180 },
  ];

  const spentPoints = redeemedRewards.reduce((sum, rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
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
        return <CommunityFeedScreen />;
      case "leaderboard":
        return <TeamScreen userPoints={totalPoints} />;
      case "impact-map":
        return <ImpactMapScreen />;
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
        return <PassportScreen completedStamps={completedStamps} onFindChallenge={() => setCurrentScreen("challenges")} />;
    }
  };

  const showBottomNav = hasCompletedOnboarding && 
    currentScreen !== "onboarding" && 
    currentScreen !== "celebration" &&
    currentScreen !== "rewards";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[812px] bg-white rounded-3xl shadow-2xl overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {renderScreen()}
        </div>
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