import { DiceData } from "./DiceData";

export class Player {
  id: number;
  score: number;
  diceGrid: (DiceData | null)[][];

  constructor(
    id: number,
    score: number,
    diceGrid: (DiceData | null)[][] = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]
  ) {
    this.id = id;
    this.score = score;
    this.diceGrid = diceGrid;
  }

  // copyWith method
  copyWith(
    id?: number,
    score?: number,
    diceGrid?: (DiceData | null)[][]
  ): Player {
    return new Player(
      id ?? this.id,
      score ?? this.score,
      diceGrid
        ? diceGrid.map((row) => row.map((cell) => cell))
        : this.diceGrid.map((row) => row.map((cell) => cell))
    );
  }
}
