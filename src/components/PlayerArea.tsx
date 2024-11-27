import { getColorByEnum } from "../logic/colorLogic";
import { Player } from "../models/Player";
import { PlayerColor } from "../models/PlayerColor";
import useGameState from "../state/gameState";
import DiceSlot from "./dice/DiceSlot";

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
      <div
        style={{ backgroundColor: playerColor.secondary }}
        className="flex border-4 border-onSurface p-2 shadow-md rounded-lg"
      >
        {player?.diceGrid.map((_, i) => (
          <button
            onClick={() => {
              if (player === homePlayerState && player.isActivePlayer) {
                addUsableDieToPlayerColumnAction(currentActivePlayer!, i);
              }
            }}
            className="flex flex-col bg-surface m-1 pb-2 rounded-lg"
          >
            {player === awayPlayerState
              ? player?.diceGrid[i]
                  .slice()
                  .reverse()
                  .map((dice) => (
                    <DiceSlot
                      diceData={dice ?? null}
                      playerColor={playerColor}
                    />
                  ))
              : player?.diceGrid[i].map((dice) => (
                  <DiceSlot diceData={dice ?? null} playerColor={playerColor} />
                ))}
          </button>
        ))}
      </div>
      {player === homePlayerState ? (
        <h1 style={{ color: playerColor.onPrimary }}>
          {player?.playerName.toUpperCase()}
        </h1>
      ) : null}
    </div>
  );
}
