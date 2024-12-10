import Character from "./Character";
import { DiceData } from "./DiceData";
import { PlayerColorEnum } from "./PlayerColorEnum";

export class Player {
  id: string;
  playerName: string;
  score: number;
  diceGrid: (DiceData | null)[][];
  isActivePlayer: boolean;
  color: PlayerColorEnum;
  character: Character | null;

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
    character = null,
  }: {
    id: string;
    playerName: string;
    score?: number;
    diceGrid?: (DiceData | null)[][];
    isActivePlayer?: boolean;
    color?: PlayerColorEnum;
    character?: Character | null;
  }) {
    this.id = id;
    this.playerName = playerName;
    this.score = score;
    this.diceGrid = diceGrid;
    this.isActivePlayer = isActivePlayer;
    this.color = color;
    this.character = character;
  }

  copyWith({
    id,
    playerName,
    score,
    diceGrid,
    isActivePlayer,
    color,
    character,
  }: {
    id?: string;
    playerName?: string;
    score?: number;
    diceGrid?: (DiceData | null)[][];
    isActivePlayer?: boolean;
    color?: PlayerColorEnum;
    character?: Character | null;
  }): Player {
    return new Player({
      id: id ?? this.id,
      playerName: playerName ?? this.playerName,
      score: score ?? this.score,
      diceGrid: diceGrid
        ? diceGrid.map((row) => [...row])
        : this.diceGrid.map((row) => [...row]),
      isActivePlayer: isActivePlayer ?? this.isActivePlayer,
      color: color ?? this.color,
      character: character ?? this.character,
    });
  }
}
