import { getColorByEnum } from "../../logic/colorLogic";
import { alterHexColorOpacity } from "../../logic/utility";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import useGameState from "../../state/gameState";
import DiceSlot from "../dice/DiceSlot";
import { PlayerDiceBlock } from "./PlayerDiceBlock";

export function PlayerArea({
  player,
  isHomePlayer,
}: {
  player: Player | null;
  isHomePlayer: boolean;
}) {
  const playerColor: PlayerColor = getColorByEnum(player?.color ?? null);

  return (
    <div
      style={{
        backgroundColor: playerColor.primary,
      }}
      className="flex flex-col justify-evenly items-center size-full"
    >
      {/* These can be added in once I add characters */}

      {/* {player === homePlayerState ? (
        <h1
          style={{ color: playerColor.onPrimary }}
          className="w-full text-2xl font-bold"
        >{`${homePlayerState?.playerName.toUpperCase()} - ${
          homePlayerState?.score
        }`}</h1>
      ) : null} */}

      <PlayerDiceBlock player={player!} isHomePlayer={isHomePlayer} />
      {/* {player === awayPlayerState ? (
        <h1
          style={{ color: playerColor.onPrimary }}
          className="w-full text-2xl font-bold"
        >{`${awayPlayerState?.playerName.toUpperCase()} - ${
          awayPlayerState?.score
        }`}</h1>
      ) : null} */}
    </div>
  );
}
