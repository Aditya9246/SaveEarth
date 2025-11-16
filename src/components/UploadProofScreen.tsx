import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { X, ArrowLeft, Camera, Loader } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ValidationResultScreen } from "./ValidationResultScreen";
import { useCamera } from "../hooks/useCamera";
import type { Challenge } from "../data";
import { ValidationResult } from "../types";

interface UploadProofScreenProps {
  challenge: Challenge | null;
  onSubmit: (imageUrl: string) => void; // 👈 changed
  onBack: () => void;
}

const MIN_CONFIDENCE = 0.6;

export function UploadProofScreen({
  challenge,
  onSubmit,
  onBack,
}: UploadProofScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    videoRef,
    canvasRef,
    isCameraOpen,
    startCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();

  const handleCaptureAndSet = () => {
    const photoDataUrl = capturePhoto();
    if (photoDataUrl) {
      setUploadedImage(photoDataUrl);
      stopCamera();
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
  };

  const handleValidationSubmit = async () => {
    if (!uploadedImage) return;
    if (!challenge) {
      console.error("No challenge provided to UploadProofScreen");
      return;
    }

    setIsLoading(true);

    const queries =
      Array.isArray(challenge.queries) && challenge.queries.length > 0
        ? challenge.queries
        : [challenge.title.toLowerCase()];

    try {
      const blob = await fetch(uploadedImage).then((res) => res.blob());

      const formData = new FormData();
      formData.append("image", blob, "photo.png");
      formData.append("queries", JSON.stringify(queries));
      formData.append("challengeId", challenge.id);
      formData.append("challengeTitle", challenge.title);

      const response = await fetch("http://localhost:3001/validate-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", response.status, errorText);
        throw new Error(`Backend error ${response.status}`);
      }

      const result = await response.json();
      console.log("Validation Result (raw):", result);

      const detections = Array.isArray(result)
        ? result
        : Array.isArray(result.detections)
        ? result.detections
        : [];

      const hasDetection = detections.length > 0;

      const topScore =
        hasDetection && typeof detections[0].score === "number"
          ? detections[0].score
          : 0;

      const passesThreshold = hasDetection && topScore >= MIN_CONFIDENCE;

      setValidationResult({
        isValid: passesThreshold,
        confidence: topScore,
        message: passesThreshold
          ? "Your photo clearly shows your sustainable action!"
          : "We couldn't confidently verify the challenge requirements in this photo.",
        details: passesThreshold
          ? "Great job! Your photo meets all the challenge criteria."
          : topScore > 0
          ? "We detected something related, but the confidence was too low. Try taking a clearer photo where the item or action is front and center."
          : "We couldn’t find the required items or action in your photo. Make sure your photo clearly shows the reusable items or sustainable action.",
        challengeName: challenge.title,
        raw: result,
      });

      setShowValidation(true);
    } catch (error) {
      console.error("Error during validation:", error);
      setValidationResult({
        isValid: false,
        message: "Submission Error",
        details:
          "We couldn't connect to the server or something went wrong. Please try again.",
        challengeName: challenge?.title,
      });
      setShowValidation(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidationBack = () => {
    setShowValidation(false);
    setValidationResult(null);
    setUploadedImage(null);
  };

  const handleValidationRetry = () => {
    setShowValidation(false);
    setValidationResult(null);
    setUploadedImage(null);
    startCamera();
  };

  const handleValidationAccept = () => {
    if (uploadedImage) {
      onSubmit(uploadedImage); // 👈 send the proof image up to App
    }
  };

  // --- RENDER ---

  if (isCameraOpen) {
    return (
      <div className="h-full flex flex-col bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex justify-center items-center gap-4 p-4">
          <Button
            onClick={handleCaptureAndSet}
            size="lg"
            className="rounded-full w-20 h-20 p-0 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
          >
            <Camera className="w-8 h-8" />
          </Button>
          <Button
            onClick={stopCamera}
            className="rounded-full bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  if (showValidation && validationResult) {
    return (
      <ValidationResultScreen
        result={validationResult}
        onBack={handleValidationBack}
        onRetry={handleValidationRetry}
        onAccept={validationResult.isValid ? handleValidationAccept : undefined}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500 to-blue-500 p-6 rounded-b-3xl"
      >
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 mb-4 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h2 className="text-white mb-2">{challenge?.title}</h2>
        <p className="text-white/90 text-sm">{challenge?.description}</p>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex flex-col"
        >
          <h3 className="text-gray-800 mb-4">Upload Photo Proof</h3>

          {!uploadedImage ? (
            <div
              onClick={startCamera}
              className="flex-1 border-4 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all p-8"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-green-400 to-blue-400 w-20 h-20 rounded-full flex items-center justify-center mb-4"
              >
                <Camera className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-gray-700 mb-1">Tap to take photo</p>
              <p className="text-sm text-gray-500 text-center">
                Show us your progress on this challenge
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 relative rounded-3xl overflow-hidden"
            >
              <ImageWithFallback
                src={uploadedImage}
                alt="Uploaded proof"
                className="w-full h-full object-cover"
              />
              <Button
                onClick={handleClearImage}
                variant="destructive"
                size="sm"
                className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Button
            onClick={handleValidationSubmit}
            disabled={!uploadedImage || isLoading || !challenge}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full py-6 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              "Submit Proof"
            )}
          </Button>
          <p className="text-center text-sm text-gray-500 mt-2">
            {challenge ? `+${challenge.points} points on verification` : ""}
          </p>
        </motion.div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
