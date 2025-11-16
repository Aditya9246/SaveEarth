import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Leaf, Mail, Lock } from "lucide-react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      onComplete();
    } catch (err: any) {
      console.error("Login failed:", err.message);
      alert(err.message);
    }
  };

  const handleSignup = async () => {
    console.log("Signup clicked with:", email, password);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup success:", userCredential.user);
      alert("Account created!");
      onComplete();
    } catch (err: any) {
      console.error("Signup failed:", err.message);
      alert(err.message);
    }
  };


  return (
    <div className="h-full flex flex-col justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <ImageWithFallback
            src="https://img.freepik.com/free-vector/save-planet-concept_23-2148512147.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Save the Planet"
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-green-700">SeaScore</h1>
          </div>
          <p className="text-gray-600">
            Your journey to a plastic-free life
          </p>
        </motion.div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-12 h-14 rounded-2xl border-2"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-12 h-14 rounded-2xl border-2"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-full h-14"
        >
          Sign In
        </Button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center space-y-3"
      >
        <button className="text-green-600 text-sm hover:underline">
          Forgot password?
        </button>
        <div className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-green-600 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSignup();
            }}
          >
            Sign up
          </button>

        </div>
      </motion.div>
    </div>
  );
}