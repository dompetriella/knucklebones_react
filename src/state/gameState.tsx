import { create } from "zustand";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { generateRandomInt } from "../logic/utility";
import { calculatePlayerScore } from "../logic/scoring";

interface GameState {
  homePlayer: Player | null;
  awayPlayer: Player | null;
  swapActivePlayer: () => void;

  //
  usableDie: DiceData | null;
  addUsableDieToPlayerColumn: (player: Player, columnIndex: number) => void;
  rollNewUsableDie: () => void;
}

const useGameState = create<GameState>((set, get) => ({
  homePlayer: new Player({
    id: 0,
    isActivePlayer: true,
    color: PlayerColorEnum.Red,
  }),
  awayPlayer: new Player({
    id: 1,
    isActivePlayer: false,
    color: PlayerColorEnum.Orange,
  }),
  swapActivePlayer() {
    const homePlayerState = get().homePlayer;
    const awayPlayerState = get().awayPlayer;
    set({
      homePlayer: homePlayerState?.copyWith({
        isActivePlayer: !homePlayerState?.isActivePlayer,
      }),
      awayPlayer: awayPlayerState?.copyWith({
        isActivePlayer: !awayPlayerState?.isActivePlayer,
      }),
    });
  },

  usableDie: null,

  // methods
  addUsableDieToPlayerColumn(player: Player, columnIndex: number) {
    const selectedPlayer: Player = player;
    let mutablePlayerDiceGrid: (DiceData | null)[][] = selectedPlayer.diceGrid;
    console.log(selectedPlayer);
    let mutablePlayerDiceColumn: (DiceData | null)[] =
      selectedPlayer.diceGrid[columnIndex];

    console.log(mutablePlayerDiceColumn);
    console.log(mutablePlayerDiceColumn);

    let diceWasAdded = false;

    for (let index = 0; index < mutablePlayerDiceColumn.length; index++) {
      if (mutablePlayerDiceColumn[index] === null) {
        mutablePlayerDiceColumn[index] = get().usableDie;
        console.log(`Added dice at index ${index}`);
        diceWasAdded = true;
        break;
      }
    }

    if (diceWasAdded) {
      mutablePlayerDiceGrid[columnIndex] = mutablePlayerDiceColumn;
      const updatedPlayerScore = calculatePlayerScore(player);
      const updatedPlayer: Player = selectedPlayer.copyWith({
        diceGrid: mutablePlayerDiceGrid,
        score: updatedPlayerScore
      });
      if (player === get().homePlayer) {
        set({
          homePlayer: updatedPlayer,
        });
      } else {
        set({
          awayPlayer: updatedPlayer,
        });
      }

      // start next turn
      // this should probably be its own function

      set({ usableDie: null });
      get().swapActivePlayer();
      get().rollNewUsableDie();
    }
  },

  rollNewUsableDie() {
    const newDieValue = generateRandomInt({ min: 1, max: 6 });
    set({ usableDie: new DiceData({ id: 0, numberValue: newDieValue }) });
  },
}));

export default useGameState;
