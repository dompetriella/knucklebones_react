import { getColorByEnum } from "../../logic/colorLogic";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import useGameState from "../../state/gameState";
import { PlayerDiceBlock } from "./PlayerDiceBlock";

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
        <h1
          style={{ color: playerColor.onPrimary }}
          className="w-full text-2xl font-bold"
        >{`${homePlayerState?.character?.characterName.toUpperCase()} - ${
          homePlayerState?.score
        }`}</h1>
      ) : null}

      <PlayerDiceBlock player={player!} isHomePlayer={isHomePlayer} />
      {player === awayPlayerState ? (
        <h1
          style={{ color: playerColor.onPrimary }}
          className="w-full text-2xl font-bold"
        >{`${awayPlayerState?.character?.characterName.toUpperCase()} - ${
          awayPlayerState?.score
        }`}</h1>
      ) : null}
    </div>
  );
}
