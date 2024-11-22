import { Player } from "../../models/Player";
import DiceSlot from "./DiceSlot";

export function DiceGridBody({ player }: { player: Player | null }) {
  return (
    <div className="flex border-4 border-onSurface p-2 bg-secondary rounded-lg">
      <div className="flex flex-col bg-surface m-1 pb-2 rounded-lg">
        {player?.diceGrid[0]
          .slice()
          .reverse()
          .map((dice) => (
            <DiceSlot diceData={dice ?? null} />
          ))}
      </div>
      <div className="flex flex-col bg-surface m-1 pb-2 rounded-lg">
        {player?.diceGrid[1]
          .slice()
          .reverse()
          .map((dice) => (
            <DiceSlot diceData={dice ?? null} />
          ))}
      </div>
      <div className="flex flex-col bg-surface m-1 pb-2 rounded-lg">
        {player?.diceGrid[2]
          .slice()
          .reverse()
          .map((dice) => (
            <DiceSlot diceData={dice ?? null} />
          ))}
      </div>
    </div>
  );
}
