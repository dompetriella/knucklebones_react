import { animate, motion, useAnimation, useMotionValue } from "framer-motion";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import { useEffect, useState } from "react";

export function PlayerScore({ player }: { player: Player }) {
  const playerColor: PlayerColor = player.character?.color!;

  const controls = useAnimation();
  const [score, setScore] = useState(player.score); // Local state for smooth number animation
  const motionScale = useMotionValue(1); // Scale motion value

  useEffect(() => {
    // Animate the score using the Framer Motion animate utility
    const controls = animate(score, player.score, {
      ease: "easeInOut",
      onUpdate: (latest) => setScore(Math.round(latest)), // Update the state to render the interpolated score
    });

    // Animate the scaling effect
    animate(motionScale, [1, 2, 1], {
      duration: 0.5,
      ease: "easeOut",
    });

    return controls.stop; // Cleanup animation on unmount or re-render
  }, [player.score]); // Re-run effect when score changes

  return (
    <div
      style={{ color: playerColor.onPrimary }}
      className="flex text-2xl font-bold"
    >
      <h1
        style={{ color: playerColor.onPrimary }}
        className="w-full"
      >{`${player.character?.characterName.toUpperCase()}`}</h1>
      <div>{" - "}</div>
      <motion.h1
        style={{ color: playerColor.onPrimary, scale: motionScale }}
        className=" w-24"
      >
        {player.score}
      </motion.h1>
    </div>
  );
}
