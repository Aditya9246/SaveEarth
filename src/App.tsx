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
import { Challenge, challenges, rewards } from "./data";

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );
  const [completedStamps, setCompletedStamps] = useState<string[]>([]);
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const handleCompleteOnboarding = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen("passport");
  };

  const handleSelectChallenge = (challenge: Challenge) => {
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
  const earnedPoints = completedStamps.reduce((sum, stampId) => {
    const challenge = challenges.find((c) => c.id === stampId);
    return sum + (challenge?.points || 0);
  }, 0);

  const handleRedeemReward = (rewardId: string, rewardPoints: number) => {
    setRedeemedRewards([...redeemedRewards, rewardId]);
  };

  // Calculate available points (earned minus redeemed)
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
        return <CommunityFeedScreen />;
      case "team":
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