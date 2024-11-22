import { getColorByEnum } from "../logic/colorLogic";
import { DiceData } from "../models/DiceData";
import { Player } from "../models/Player";
import { PlayerColor } from "../models/PlayerColor";
import useGameState from "../state/gameState";
import DiceSlot from "./dice/DiceSlot";

export function PlayerArea({ player }: { player: Player | null }) {
  const homePlayer = useGameState((state) => state.homePlayer);
  const addDiceToPlayerColumnAction = useGameState(
    (state) => state.addDiceToPlayerColumn
  );

  const playerColor: PlayerColor = getColorByEnum(player?.color ?? null);

  return (
    <div
      style={{ backgroundColor: playerColor.primary }}
      className="flex justify-center items-center size-full"
    >
      <div
        style={{ backgroundColor: playerColor.secondary }}
        className="flex border-4 border-onSurface p-2 shadow-md rounded-lg"
      >
        {player?.diceGrid.map((_, i) => (
          <button
            onClick={() => {
              console.log("here");
              addDiceToPlayerColumnAction(
                homePlayer!,
                new DiceData({ id: 5, numberValue: 1 }),
                i
              );
            }}
            className="flex flex-col bg-surface m-1 pb-2 rounded-lg"
          >
            {player?.diceGrid[i]
              .slice()
              .reverse()
              .map((dice) => (
                <DiceSlot diceData={dice ?? null} playerColor={playerColor} />
              ))}
          </button>
        ))}
      </div>
    </div>
  );
}
