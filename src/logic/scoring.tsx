import { DiceData } from "../models/DiceData";
import { Player } from "../models/Player";

export function calculatePlayerScore(player: Player): number {
  let sum: number = 0;

  player.diceGrid.forEach((column: (DiceData | null)[]) => {
    let frequencyMap: Map<number, number> = new Map<number, number>();

    column.forEach((diceData: DiceData | null) => {
      if (diceData != null) {
        if (frequencyMap.has(diceData.numberValue)) {
          const currentFrequency = frequencyMap.get(diceData.numberValue);
          frequencyMap.set(diceData.numberValue, currentFrequency! + 1);
        }
        else {
          frequencyMap.set(diceData.numberValue, 1);
        }  
      }
      
    });

    if (frequencyMap.size > 0) {
      console.log(frequencyMap)
      frequencyMap.forEach((value, key) => {
        sum += ((key * value) * value)
      });
    }
  });
  return sum;
}
