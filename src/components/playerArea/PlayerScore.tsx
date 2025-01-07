import { motion } from "framer-motion";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";

export function PlayerScore({ player }: { player: Player }) {
  const playerColor: PlayerColor = player.character?.color!;

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
      <motion.h1 style={{ color: playerColor.onPrimary }} className=" w-24">
        {player?.score}
      </motion.h1>
    </div>
  );
}
