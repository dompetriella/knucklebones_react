import { DiceData } from "../models/DiceData";
import { Player } from "../models/Player";

export function calculatePlayerScore(player: Player) {
  let sum: number = 0;

  player.diceGrid.forEach((column: (DiceData | null)[]) => {
    let frequencyMap: Record<number, number> = {};

    column.forEach((diceData: DiceData | null) => {
      frequencyMap[diceData?.numberValue] = 
    });
  });
}
