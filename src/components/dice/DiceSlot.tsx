import { motion } from "framer-motion";
import { DiceData } from "../../models/DiceData";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import DotArray from "./DotArray";

function DiceSlot({
  diceData,
  player,
  columnIndex = null,
  initialYDistance = 0,
  initialXDistance = 0,
  initialScaling = 1,
  initialRotation = 0,
  animationDelay = 0,
}: {
  diceData: DiceData | null;
  player: Player;
  columnIndex?: number | null;
  initialYDistance?: number;
  initialXDistance?: number;
  initialScaling?: number;
  initialRotation?: number;
  animationDelay?: number;
}) {
  const playerColor: PlayerColor = player.character?.color!;

  let matchingDiceCount: number = 0;

  if (columnIndex != null) {
    for (const die of player.diceGrid[columnIndex]) {
      if (die?.numberValue === diceData?.numberValue) {
        matchingDiceCount++;
      }
    }
  }

  const color = () => {
    if (diceData === null) {
      return "transparent";
    }
    if (matchingDiceCount === 2) {
      return playerColor.secondary;
    }
    if (matchingDiceCount === 3) {
      return playerColor.tertiary;
    }
    return playerColor.primary;
  };

  return (
    <>
      <motion.div
        key={diceData?.id ?? null}
        initial={{
          opacity: 0,
          scale: diceData !== null ? initialScaling : 0,
          x: diceData !== null ? initialXDistance : 0,
          y: diceData !== null ? initialYDistance : 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          rotate: diceData !== null ? initialRotation : 0,
          transition: {
            delay: diceData === null ? 0 : animationDelay,
            type: "spring",
            stiffness: 400, // Increase for a snappier motion
            damping: 28,
          },
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      >
        <div
          style={{
            backgroundColor: color(),
          }}
          className={`h-14 w-14  ml-2 mr-2 mt-2 rounded-lg border-onSurface border-4 ${
            diceData != null ? "" : "opacity-5"
          } `}
        >
          <DotArray
            numberValue={diceData?.numberValue}
            playerColor={playerColor}
          />
        </div>
      </motion.div>
    </>
  );
}

export default DiceSlot;
