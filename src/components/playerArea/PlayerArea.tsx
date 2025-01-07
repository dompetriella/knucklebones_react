import { motion } from "framer-motion";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import useGameState from "../../state/gameState";
import { PlayerDiceBlock } from "./PlayerDiceBlock";
import { PlayerScore } from "./PlayerScore";

export function PlayerArea({
  player,
  isHomePlayer,
}: {
  player: Player | null;
  isHomePlayer: boolean;
}) {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);

  const playerColor: PlayerColor = player?.character?.color!;

  return (
    <div
      style={{
        backgroundColor: playerColor.primary,
      }}
      className="flex flex-col justify-evenly items-center size-full"
    >
      {player === homePlayerState ? (
        <PlayerScore player={homePlayerState!} />
      ) : null}

      <PlayerDiceBlock player={player!} isHomePlayer={isHomePlayer} />

      {player === awayPlayerState ? (
        <PlayerScore player={awayPlayerState!} />
      ) : null}
    </div>
  );
}
