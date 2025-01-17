import { DiceData } from "../models/DiceData";
import { Player } from "../models/Player";

export function generateRandomInt({
  min = 0,
  max,
}: {
  min?: number;
  max: number;
}) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function waitRandomDelay(
  minMiliSeconds: number,
  maxMiliSeconds: number
): Promise<void> {
  const delay =
    Math.random() * (maxMiliSeconds - minMiliSeconds) + minMiliSeconds;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function alterHexColorOpacity(hex: string, opacity: number): string {
  // Remove the hash if it exists
  const sanitizedHex = hex.replace("#", "");

  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function convertDiceArrayToJsonArray(
  diceDataArray: (DiceData | null)[][]
): ({ id: string; numberValue: number } | null)[][] {
  if (diceDataArray === null) {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  const newDiceArray = diceDataArray.map((column) => {
    const newColumn: ({
      id: string;
      numberValue: number;
    } | null)[] = column.map((diceData) => {
      if (diceData) {
        return {
          id: diceData.id,
          numberValue: diceData.numberValue,
        };
      }
      return null;
    });
    return newColumn;
  });
  return newDiceArray;
}

export function convertJsonArrayToDiceArray(
  jsonArray: ({ id: string; numberValue: number } | null)[][]
): (DiceData | null)[][] {
  if (jsonArray === null) {
    return [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  const newDiceDataArray = jsonArray.map((column) => {
    const newColumn: (DiceData | null)[] = column.map((diceData) => {
      if (diceData === null) {
        return null;
      }
      return new DiceData({
        id: diceData.id,
        numberValue: diceData.numberValue,
      });
    });
    return newColumn;
  });
  return newDiceDataArray;
}


export async function checkForGameOver(currentHomePlayerState: Player, currentAwayPlayerState: Player): Promise<boolean> {
  let homePlayerNulls = 0;
  currentHomePlayerState?.diceGrid.forEach((column,) => {
    column.forEach((dieSlot,) => {
      if (dieSlot === null) {
        homePlayerNulls++;
      }
    })
  })

  let awayPlayerNulls = 0;
  currentAwayPlayerState?.diceGrid.forEach((column) => {
    column.forEach((dieSlot) => {
      if (dieSlot === null) {
        awayPlayerNulls++;
      }
    })
  })


  if (homePlayerNulls === 0 || awayPlayerNulls === 0) {
    return true;
  }
  return false;
}