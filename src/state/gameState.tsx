import { create } from "zustand";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";

interface GameState {
  homePlayer: Player | null;
  awayPlayer: Player | null;
  addDiceToPlayerColumn: (
    player: Player,
    diceToAdd: DiceData,
    columnIndex: number
  ) => void;
}

const useGameState = create<GameState>((set, get) => ({
  homePlayer: new Player({
    id: 0,
    score: 50,
    isActivePlayer: true,
    color: PlayerColorEnum.Red,
    diceGrid: [
      [new DiceData({ id: 0, numberValue: 5 }), null, null],
      [new DiceData({ id: 0, numberValue: 5 }), null, null],
      [new DiceData({ id: 0, numberValue: 5 }), null, null],
    ],
  }),
  awayPlayer: new Player({
    id: 1,
    score: 25,
    isActivePlayer: false,
    color: PlayerColorEnum.Orange,
  }),

  addDiceToPlayerColumn(
    player: Player,
    diceToAdd: DiceData,
    columnIndex: number
  ) {
    const selectedPlayer: Player = player;
    let mutablePlayerDiceGrid: (DiceData | null)[][] = selectedPlayer.diceGrid;
    console.log(selectedPlayer);
    let mutablePlayerDiceColumn: (DiceData | null)[] =
      selectedPlayer.diceGrid[columnIndex];

    console.log(mutablePlayerDiceColumn);
    console.log(mutablePlayerDiceColumn);

    for (let index = 0; index < mutablePlayerDiceColumn.length; index++) {
      if (mutablePlayerDiceColumn[index] === null) {
        mutablePlayerDiceColumn[index] = diceToAdd;
        console.log(`Added dice at index ${index}`);
        break;
      }
    }

    mutablePlayerDiceGrid[columnIndex] = mutablePlayerDiceColumn;
    const updatedPlayer: Player = selectedPlayer.copyWith({
      diceGrid: mutablePlayerDiceGrid,
    });
    if (player === get().homePlayer) {
      set({ homePlayer: updatedPlayer });
    } else {
      set({ awayPlayer: updatedPlayer });
    }
  },
}));

export default useGameState;
