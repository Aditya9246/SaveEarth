import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { X, ArrowLeft, Camera, Loader } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ValidationResultScreen } from "./ValidationResultScreen";
import { useCamera } from "../hooks/useCamera";

interface UploadProofScreenProps {
  challenge: any;
  onSubmit: () => void;
  onBack: () => void;
}

export function UploadProofScreen({
  challenge,
  onSubmit,
  onBack,
}: UploadProofScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
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
      setUploadedImage(photoDataUrl); // this is a data URL (or blob URL)
      stopCamera();
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
  };

  const handleValidationSubmit = async () => {
    if (!uploadedImage) return;

    setIsLoading(true);

    const queries = ["plastic bottle", "reusable coffee cup", "ship"];

    try {
      // Turn the data URL / blob URL into a Blob
      const blob = await fetch(uploadedImage).then((res) => res.blob());

      const formData = new FormData();
      formData.append("image", blob, "photo.png"); // field name must match upload.single('image') on backend
      formData.append("queries", JSON.stringify(queries));

      const response = await fetch("http://localhost:3000/validate-image", {
        method: "POST",
        // IMPORTANT: do NOT set Content-Type, browser will set correct multipart boundary
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", response.status, errorText);
        throw new Error(`Backend error ${response.status}`);
      }

      const result = await response.json();
      console.log("Validation Result (raw):", result);

      // Support both:
      //  - raw array from Xenova: [{ score, box, label, ... }]
      //  - wrapped: { detections: [...] }
      const detections = Array.isArray(result)
        ? result
        : Array.isArray(result.detections)
        ? result.detections
        : [];

      const isValid = detections.length > 0;

      const topScore =
        isValid && typeof detections[0].score === "number"
          ? detections[0].score
          : undefined;

      setValidationResult({
        isValid,
        confidence: topScore,
        message: isValid
          ? "Your photo clearly shows your sustainable action!"
          : "We couldn't verify the challenge requirements in this photo.",
        details: isValid
          ? "Great job! Your photo meets all the challenge criteria."
          : "Make sure your photo clearly shows the reusable items or sustainable action.",
        // imageUrl: uploadedImage,
        challengeName: challenge?.title,
        challengeIcon: challenge?.icon,
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
        imageUrl: uploadedImage,
        challengeName: challenge?.title,
        challengeIcon: challenge?.icon,
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
    onSubmit();
  };

  // --- RENDER ---

  // Camera view
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
          {/* Capture button */}
          <Button
            onClick={handleCaptureAndSet}
            size="lg"
            className="rounded-full w-20 h-20 p-0 bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600"
          >
            <Camera className="w-8 h-8" />
          </Button>

          {/* Cancel button */}
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

  // Validation result screen
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

  // Main upload screen
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
            disabled={!uploadedImage || isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full py-6 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin" />
            ) : (
              "Submit Proof"
            )}
          </Button>
          <p className="text-center text-sm text-gray-500 mt-2">
            +{challenge?.points} points on verification
          </p>
        </motion.div>
      </div>

      {/* Extra hidden canvas to keep ref mounted in non-camera mode */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
