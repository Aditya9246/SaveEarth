import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import type { Challenge } from "../data";

export function useChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const challengesRef = ref(db, "challenges");

    const unsubscribe = onValue(
      challengesRef,
      (snapshot) => {
        const value = snapshot.val();

        if (!value) {
          setChallenges([]);
        } else {
          const list: Challenge[] = Object.values(value);
          setChallenges(list);
        }

        setLoading(false);
      },
      (err) => {
        console.error("Error loading challenges:", err);
        setError("Failed to load challenges.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { challenges, loading, error };
}
