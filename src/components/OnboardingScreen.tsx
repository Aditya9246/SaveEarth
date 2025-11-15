import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Leaf } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const quizQuestions = [
  {
    question: "How many plastic water bottles do you use per week?",
    options: ["0 (I use reusable)", "1-3", "4-7", "8+"],
  },
  {
    question: "Do you bring reusable bags when shopping?",
    options: ["Always", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "How often do you refuse plastic straws?",
    options: ["Always", "Sometimes", "Rarely", "Never"],
  },
  {
    question: "Do you buy products with minimal packaging?",
    options: ["Always", "Sometimes", "Rarely", "Never"],
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [stage, setStage] = useState<"welcome" | "quiz" | "result">("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStartQuiz = () => {
    setStage("quiz");
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("result");
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1639653279211-09958a51fb00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHBsYW5ldCUyMGlsbHVzdHJhdGlvbiUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc2MzIzMjc2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Earth"
                className="w-64 h-64 object-cover rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
                <h1 className="text-green-700">EcoPassport</h1>
              </div>
              <p className="text-gray-600 mb-2">
                Your journey to a plastic-free life starts here
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleStartQuiz}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full px-8 py-6"
              >
                Start Your Journey
              </Button>
            </motion.div>
          </motion.div>
        )}

        {stage === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6"
          >
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <motion.h2
                key={currentQuestion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-800 mb-8"
              >
                {quizQuestions[currentQuestion].question}
              </motion.h2>

              <div className="space-y-3">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={option}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => handleAnswer(option)}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 rounded-2xl border-2 hover:border-green-500 hover:bg-green-50 transition-all"
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {stage === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-32 h-32 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center mb-6"
            >
              <Leaf className="w-16 h-16 text-white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-gray-600 mb-2">Your Baseline Level:</p>
              <h2 className="text-green-700 mb-6">Eco-Tourist</h2>
              <p className="text-gray-600 mb-8">
                You're taking your first steps toward sustainability. Let's build your passport!
              </p>
              <Button
                onClick={onComplete}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full px-8 py-6"
              >
                View My Passport
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
