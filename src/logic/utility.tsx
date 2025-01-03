import { DiceData } from "../models/DiceData";

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

  // Parse the red, green, and blue values
  const r = parseInt(sanitizedHex.substring(0, 2), 16);
  const g = parseInt(sanitizedHex.substring(2, 4), 16);
  const b = parseInt(sanitizedHex.substring(4, 6), 16);

  // Return the RGBA string
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

  console.log("Converting Dice Data to Json");
  console.log(newDiceArray);
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
  console.log("converting json to DiceData");
  console.log(newDiceDataArray);
  return newDiceDataArray;
}
