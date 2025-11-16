import { motion } from "motion/react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Camera,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ValidationResultScreenProps {
  result: any;
  onBack: () => void;
  onRetry?: () => void;
  onAccept?: () => void;
}

export function ValidationResultScreen({
  result,
  onBack,
  onRetry,
  onAccept,
}: ValidationResultScreenProps) {
  const isSuccess = Boolean(result?.isValid);
  const confidence =
    typeof result?.confidence === "number" ? result.confidence : 0;

  const message =
    result?.message ||
    (isSuccess
      ? "Your photo has been validated successfully!"
      : "We couldn't verify this photo. Please try again.");

  const details = result?.details as string | undefined;
  const imageUrl = result?.imageUrl as string | undefined;
  const challengeName = result?.challengeName as string | undefined;
  const challengeIcon = result?.challengeIcon as string | undefined;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="p-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-gray-700 hover:bg-gray-200 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {/* Result Status Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`rounded-3xl p-6 mb-6 text-center ${
            isSuccess
              ? "bg-gradient-to-br from-green-500 to-emerald-500"
              : "bg-gradient-to-br from-orange-500 to-red-500"
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
          >
            {isSuccess ? (
              <CheckCircle className="w-12 h-12 text-white" />
            ) : (
              <AlertCircle className="w-12 h-12 text-white" />
            )}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white mb-2 text-xl font-semibold"
          >
            {isSuccess ? "Great Work!" : "Not Quite Right"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 text-sm"
          >
            {message}
          </motion.p>

          {/* Confidence Score */}
          {confidence > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm">Confidence Score</span>
              </div>
              <div className="text-white text-2xl font-semibold">
                {Math.round(confidence * 100)}%
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Challenge Info */}
        {(challengeName || challengeIcon) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-4 mb-6 border-2 border-gray-100"
          >
            <div className="flex items-center gap-3">
              {challengeIcon && <div className="text-3xl">{challengeIcon}</div>}
              <div className="flex-1">
                <div className="text-sm text-gray-600">Challenge</div>
                <div className="text-gray-800 font-medium">
                  {challengeName || "Unknown Challenge"}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submitted Image */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-gray-600" />
              <h3 className="text-gray-800 text-sm font-medium">
                Your Submission
              </h3>
            </div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
              <ImageWithFallback
                src={imageUrl}
                alt="Submitted proof"
                className="w-full aspect-square object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Details Section */}
        {details && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-blue-50 rounded-2xl p-4 mb-6 border-2 border-blue-100"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-blue-900 mb-1 font-medium">
                  Details
                </div>
                <p className="text-sm text-blue-700">{details}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tips for Failure */}
        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6 border-2 border-purple-100"
          >
            <h3 className="text-gray-800 mb-3 text-sm font-semibold">
              Tips for Better Photos
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">•</span>
                <span>Make sure the subject is clearly visible and in focus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">•</span>
                <span>Use good lighting — natural light works best</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">•</span>
                <span>Include the full item related to the challenge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 flex-shrink-0">•</span>
                <span>Avoid blurry or dark photos</span>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          {isSuccess ? (
            <>
              {onAccept && (
                <Button
                  onClick={onAccept}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-full py-6"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Accept & Continue
                </Button>
              )}
              {onRetry && (
                <Button
                  onClick={onRetry}
                  variant="outline"
                  className="w-full rounded-full py-6 border-2"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Take Another Photo
                </Button>
              )}
            </>
          ) : (
            <>
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full py-6"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Try Again
                </Button>
              )}
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full rounded-full py-6 border-2"
              >
                Go Back to Challenges
              </Button>
            </>
          )}
        </motion.div>

        {/* Raw JSON (always visible, like your simple version) */}
        <motion.details
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 bg-gray-100 rounded-xl p-4"
        >
          <summary className="text-sm text-gray-700 cursor-pointer mb-2 font-medium">
            Raw Validation Result
          </summary>
          <pre className="text-xs text-gray-700 overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </motion.details>
      </div>
    </div>
  );
}
