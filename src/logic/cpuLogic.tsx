import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { generateRandomInt, waitRandomDelay } from "./utility";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";

export async function runCpuTurn({
  cpuPlayerState,
  humanPlayerState,
  cpuDifficultyState,
  usableDiceState,
  addDiceToColumn,
}: {
  cpuPlayerState: Player;
  humanPlayerState: Player;
  cpuDifficultyState: PlayerTypeEnum;
  usableDiceState: DiceData;
  addDiceToColumn: (player: Player, column: number) => void;
}) {
  if (cpuPlayerState.isActivePlayer) {

    // cpu thinking
    await waitRandomDelay(2000, 3000);
    const availableColumns = getCpuAvailableColumns(cpuPlayerState);

    const randomColumn =
      availableColumns[generateRandomInt({ max: availableColumns.length - 1 })];

    const maxProportionChance: number = 10;
    const randomChance = generateRandomInt({ max: maxProportionChance });

    switch (cpuDifficultyState) {
      case PlayerTypeEnum.Easy:
        addDiceToColumn(cpuPlayerState, randomColumn);
        break;

      case PlayerTypeEnum.Medium:
        if (randomChance < maxProportionChance / 2) {
          return addDiceToColumn(cpuPlayerState, randomColumn);
        }

        const doubleDiceColumn = getDoubleDiceColumnIndexes(
          cpuPlayerState,
          usableDiceState
        );

        if (doubleDiceColumn.length > 0) {
          const availableDoubleDiceColumns = availableColumns.filter((index) =>
            doubleDiceColumn.includes(index)
          );
          if (availableDoubleDiceColumns.length > 0) {
            return addDiceToColumn(
              cpuPlayerState,
              availableDoubleDiceColumns[
                generateRandomInt({ max: doubleDiceColumn.length - 1 })
              ]
            );
          }
        }

        return addDiceToColumn(cpuPlayerState, randomColumn);

      case PlayerTypeEnum.Hard:
        if (randomChance < maxProportionChance / maxProportionChance) {
          return addDiceToColumn(cpuPlayerState, randomColumn);
        }

        const doubleDiceColumnHard = getDoubleDiceColumnIndexes(
          cpuPlayerState,
          usableDiceState
        );
        const negatableColumnIndexes = getHumanPlayerNegatableColumnIndexes(
          humanPlayerState,
          usableDiceState
        );

        const availableDoubleDiceColumns = availableColumns.filter((index) =>
          doubleDiceColumnHard.includes(index)
        );
        const availableNegatableColumns = availableColumns.filter((index) =>
          negatableColumnIndexes.includes(index)
        );

        if (
          availableDoubleDiceColumns.length > 0 &&
          availableNegatableColumns.length > 0
        ) {
          if (humanPlayerState.score > cpuPlayerState.score) {
            return addDiceToColumn(
              cpuPlayerState,
              availableNegatableColumns[
                generateRandomInt({ max: availableNegatableColumns.length - 1 })
              ]
            );
          } else {
            return addDiceToColumn(
              cpuPlayerState,
              availableDoubleDiceColumns[
                generateRandomInt({
                  max: availableDoubleDiceColumns.length - 1,
                })
              ]
            );
          }
        }

        if (availableDoubleDiceColumns.length > 0) {
          return addDiceToColumn(
            cpuPlayerState,
            availableDoubleDiceColumns[
              generateRandomInt({ max: availableDoubleDiceColumns.length - 1 })
            ]
          );
        }

        if (availableNegatableColumns.length > 0) {
          return addDiceToColumn(
            cpuPlayerState,
            availableNegatableColumns[
              generateRandomInt({ max: availableNegatableColumns.length - 1 })
            ]
          );
        }

        return addDiceToColumn(cpuPlayerState, randomColumn);

      default:
        break;
    }
  }
}
function getHumanPlayerNegatableColumnIndexes(
  humanPlayerState: Player,
  usableDiceState: DiceData
): number[] {
  let existingDieColumns: number[] = [];
  for (let i = 0; i < humanPlayerState.diceGrid.length; i++) {
    for (const die of humanPlayerState.diceGrid[i]) {
      if (die?.numberValue === usableDiceState.numberValue) {
        existingDieColumns.push(i);
      }
    }
  }
  return existingDieColumns;
}

function getDoubleDiceColumnIndexes(
  cpuPlayerState: Player,
  usableDiceState: DiceData
): number[] {
  let doubleDiceColumn = [];
  for (let i = 0; i < cpuPlayerState.diceGrid.length; i++) {
    for (const die of cpuPlayerState.diceGrid[i]) {
      if (die?.numberValue === usableDiceState.numberValue) {
        doubleDiceColumn.push(i);
      }
    }
  }
  return doubleDiceColumn;
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
