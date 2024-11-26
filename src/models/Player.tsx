import { DiceData } from "./DiceData";
import { PlayerColorEnum } from "./PlayerColorEnum";

export class Player {
  id: number;
  playerName: string;
  score: number;
  diceGrid: (DiceData | null)[][];
  isActivePlayer: boolean;
  color: PlayerColorEnum;

  constructor({
    id,
    playerName,
    score = 0,
    diceGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    isActivePlayer = false,
    color = PlayerColorEnum.Red,
  }: {
    id: number;
    playerName: string;
    score?: number;
    diceGrid?: (DiceData | null)[][];
    isActivePlayer?: boolean;
    color?: PlayerColorEnum;
  }) {
    this.id = id;
    this.playerName = playerName;
    this.score = score;
    this.diceGrid = diceGrid;
    this.isActivePlayer = isActivePlayer;
    this.color = color;
  }

  copyWith({
    id,
    playerName,
    score,
    diceGrid,
    isActivePlayer,
    color,
  }: {
    id?: number;
    playerName?: string;
    score?: number;
    diceGrid?: (DiceData | null)[][];
    isActivePlayer?: boolean;
    color?: PlayerColorEnum;
  }): Player {
    return new Player({
      id: id ?? this.id,
      playerName: playerName ?? this.playerName,
      score: score ?? this.score,
      diceGrid: diceGrid
        ? diceGrid.map((row) => row.map((cell) => cell))
        : this.diceGrid.map((row) => row.map((cell) => cell)),
      isActivePlayer: isActivePlayer ?? this.isActivePlayer,
      color: color ?? this.color,
    });
  }
}
