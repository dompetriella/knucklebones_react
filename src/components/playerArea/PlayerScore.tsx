import { animate, motion, useMotionValue } from "framer-motion";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import { useEffect, useState } from "react";

export function PlayerScore({ player }: { player: Player }) {
  const playerColor: PlayerColor = player.character?.color!;
  const [score, setScore] = useState(player.score); // Local state for smooth number animation
  const motionScale = useMotionValue(1); // Scale motion value

  useEffect(() => {
    const controls = animate(score, player.score, {
      ease: "easeInOut",
      onUpdate: (latest) => setScore(Math.round(latest)),
    });

    // Animate the scaling effect
    animate(motionScale, [1, 2, 1], {
      duration: 0.5,
      ease: "easeOut",
    });

    return controls.stop;
  }, [player.score]);

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
