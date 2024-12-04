import { AnimatePresence, motion } from "framer-motion";
import { getColorByEnum } from "../../logic/colorLogic";
import { DiceData } from "../../models/DiceData";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import DotArray from "./DotArray";
import { duration } from "@mui/material";

function DiceSlot({
  diceData,
  player,
  columnIndex = null,
  intialYDistance = 0,
  initialScaling = 1,
}: {
  diceData: DiceData | null;
  player: Player;
  columnIndex?: number | null;
  intialYDistance?: number;
  initialScaling?: number;
}) {
  const playerColor: PlayerColor = getColorByEnum(player.color);

  let matchingDiceCount: number = 0;

  if (columnIndex != null) {
    console.log(player.diceGrid[columnIndex]);

    for (const die of player.diceGrid[columnIndex]) {
      if (die?.numberValue === diceData?.numberValue) {
        matchingDiceCount++;
      }
    }

    console.log(matchingDiceCount);
  }

  const color = () => {
    if (diceData === null) {
      return "transparent";
    }
    if (matchingDiceCount > 1) {
      return playerColor.tertiary;
    }
    return playerColor.primary;
  };

  return (
    <>
      <motion.div
        key={diceData?.id ?? null}
        initial={{ opacity: 0, scale: initialScaling, y: intialYDistance }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400, // Increase for a snappier motion
          damping: 28, // Increase to reduce bounce
          duration: 1.0, // Optional, limits the total duration
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
