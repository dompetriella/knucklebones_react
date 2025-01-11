import { useEffect, useState } from "react";
import { Player } from "../../../models/Player";
import { PlayerColor } from "../../../models/PlayerColor";
import { animate, motion, useMotionValue } from "framer-motion";

export function DesktopPlayerScore({
  imageSize,
  playerColor,
  player,
}: {
  imageSize: number;
  playerColor: PlayerColor;
  player: Player;
}) {
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
      style={{ width: imageSize }}
      className="flex justify-center items-center"
    >
        <div className="flex flex-col">
        <h1
        style={{ color: playerColor.onPrimary }}
        className="text-4xl"
      >
        {player.character?.characterName}
      </h1>
      <motion.h1
        style={{ color: playerColor.onPrimary, fontSize: 72, scale: motionScale }}
      
      >
        {player.score}
      </motion.h1>        </div>

    </div>
  );
}
