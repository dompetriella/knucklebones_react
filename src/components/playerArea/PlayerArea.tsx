import { getColorByEnum } from "../../logic/colorLogic";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import useGameState from "../../state/gameState";
import DiceSlot from "../dice/DiceSlot";
import { PlayerDiceBlock } from "./PlayerDiceBlock";

export function PlayerArea({ player }: { player: Player | null }) {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const addUsableDieToPlayerColumnAction = useGameState(
    (state) => state.addUsableDieToPlayerColumn
  );

  const playerColor: PlayerColor = getColorByEnum(player?.color ?? null);

  const currentActivePlayer = useGameState((state) =>
    state.homePlayer?.isActivePlayer ? homePlayerState : awayPlayerState
  );

  return (
    <div
      style={{ backgroundColor: playerColor.primary }}
      className="flex flex-col justify-center items-center size-full"
    >
      {player === awayPlayerState ? (
        <h1 style={{ color: playerColor.onPrimary }}>
          {player?.playerName.toUpperCase()}
        </h1>
      ) : null}
      <PlayerDiceBlock player={player!}/>
      {player === homePlayerState ? (
        <h1 style={{ color: playerColor.onPrimary }}>
          {player?.playerName.toUpperCase()}
        </h1>
      ) : null}
    </div>
  );
}
