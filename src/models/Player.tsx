import { DiceData } from "./DiceData";
import { PlayerColorEnum } from "./PlayerColorEnum";

export class Player {
  id: number;
  score: number;
  diceGrid: (DiceData | null)[][];
  isActivePlayer: boolean;
  color: PlayerColorEnum;

  constructor({
    id,
    score,
    diceGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    isActivePlayer = false,
    color = PlayerColorEnum.Red,
  }: {
    id: number;
    score: number;
    diceGrid?: (DiceData | null)[][];
    isActivePlayer?: boolean;
    color?: PlayerColorEnum;
  }) {
    this.id = id;
    this.score = score;
    this.diceGrid = diceGrid;
    this.isActivePlayer = isActivePlayer;
    this.color = color;
  }

  copyWith({
    id,
    score,
    diceGrid,
    isActivePlayer,
    color,
  }: {
    id?: number;
    score?: number;
    diceGrid?: (DiceData | null)[][];
    isActivePlayer?: boolean;
    color?: PlayerColorEnum;
  }): Player {
    return new Player({
      id: id ?? this.id,
      score: score ?? this.score,
      diceGrid: diceGrid
        ? diceGrid.map((row) => row.map((cell) => cell))
        : this.diceGrid.map((row) => row.map((cell) => cell)),
      isActivePlayer: isActivePlayer ?? this.isActivePlayer,
      color: color ?? this.color,
    });
  }
}
