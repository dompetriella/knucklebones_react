import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { generateRandomInt, waitRandomDelay } from "./utility";
import { Player } from "../models/Player";

export async function runCpuTurn({
  cpuPlayerState,
  cpuDifficultyState,
  addDiceToColumn,
}: {
  cpuPlayerState: Player;
  cpuDifficultyState: PlayerTypeEnum;
  addDiceToColumn: (player: Player, column: number) => void;
}) {
  if (cpuPlayerState.isActivePlayer) {
    console.log("cpu is active turn");

    // cpu thinking
    await waitRandomDelay(1000, 3000);
    const availableColumns = getCpuAvailableColumns(cpuPlayerState);

    const randomColumn =
      availableColumns[generateRandomInt({ max: availableColumns.length - 1 })];

    const randomChance = generateRandomInt({ max: 3 });

    switch (cpuDifficultyState) {
      case PlayerTypeEnum.Easy:
        addDiceToColumn(cpuPlayerState, randomColumn);
        break;

      case PlayerTypeEnum.Medium:
        // coin flip 0 / 1
        // if 0, just add to random column
        if (randomChance < 2) {
          addDiceToColumn(cpuPlayerState, randomColumn);
        } else {
        }
        break;

      case PlayerTypeEnum.Hard:
        if (randomChance < 1) {
          addDiceToColumn(cpuPlayerState, randomColumn);
        } else {
        }
        break;

      default:
        console.log("oops");
        break;
    }
  }
}

function getCpuAvailableColumns(cpuPlayerState: Player): number[] {
  const availableColumns = [];
  for (let i = 0; i < cpuPlayerState.diceGrid.length!; i++) {
    let columnIsAvailable = false;
    cpuPlayerState.diceGrid[i].forEach((die) => {
      if (die === null) {
        columnIsAvailable = true;
      }
    });
    if (columnIsAvailable) {
      availableColumns.push(i);
    }
  }
  return availableColumns;
}
