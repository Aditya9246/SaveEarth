import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Upload, X, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UploadProofScreenProps {
  challenge: any;
  onSubmit: () => void;
  onBack: () => void;
}

export function UploadProofScreen({ challenge, onSubmit, onBack }: UploadProofScreenProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = () => {
    // Simulate image upload - use a placeholder image
    setUploadedImage(
      "https://images.unsplash.com/photo-1672886941662-e40d4c2428a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZXJvJTIwd2FzdGUlMjBsdW5jaCUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc2MzIzMjc2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    );
  };

  const handleClearImage = () => {
    setUploadedImage(null);
  };

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
              onClick={handleImageUpload}
              className="flex-1 border-4 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all p-8"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-green-400 to-blue-400 w-20 h-20 rounded-full flex items-center justify-center mb-4"
              >
                <Upload className="w-10 h-10 text-white" />
              </motion.div>
              <p className="text-gray-700 mb-1">Tap to upload photo</p>
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
            onClick={onSubmit}
            disabled={!uploadedImage}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full py-6 disabled:opacity-50"
          >
            Submit Proof
          </Button>
          <p className="text-center text-sm text-gray-500 mt-2">
            +{challenge?.points} points on verification
          </p>
        </motion.div>
      </div>
    </div>
  );
}
