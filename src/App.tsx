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
import { BottomNav } from "./components/BottomNav";

export type Screen = 
  | "onboarding"
  | "quiz"
  | "passport"
  | "challenges"
  | "upload-proof"
  | "celebration"
  | "feed"
  | "team"
  | "impact-map"
  | "resources";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
  const [completedStamps, setCompletedStamps] = useState<string[]>([]);

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

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
      case "quiz":
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
        return <TeamScreen />;
      case "impact-map":
        return <ImpactMapScreen />;
      case "resources":
        return <ResourceHubScreen />;
      default:
        return <PassportScreen completedStamps={completedStamps} onFindChallenge={() => setCurrentScreen("challenges")} />;
    }
  };

  const showBottomNav = hasCompletedOnboarding && 
    currentScreen !== "onboarding" && 
    currentScreen !== "quiz" &&
    currentScreen !== "celebration";

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
