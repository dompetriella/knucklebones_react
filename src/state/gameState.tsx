import { create } from "zustand";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { generateRandomInt, waitRandomDelay } from "../logic/utility";
import { calculatePlayerScore } from "../logic/scoring";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { runCpuTurn } from "../logic/cpuLogic";

const emptyDiceArray: (DiceData | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

interface GameState {
  // Player
  homePlayer: Player | null;
  awayPlayer: Player | null;
  playerType: PlayerTypeEnum;

  setPlayerType: (playerType: PlayerTypeEnum) => void;
  swapActivePlayer: () => void;
  updateGameScore: () => void;
  endPlayerTurn: () => void;

  // Game Flow
  gameHasEnded: boolean;
  startGame: () => void;
  endGame: () => void;

  // Dice
  usableDie: DiceData | null;
  addUsableDieToPlayerColumn: (player: Player, columnIndex: number) => void;
  removeMatchingDiceFromOtherPlayer: (
    playerOfOrigin: Player,
    diceValue: number,
    columnIndex: number
  ) => void;
  rollNewUsableDie: () => void;
}

const useGameState = create<GameState>((set, get) => ({
  homePlayer: new Player({
    id: 0,
    playerName: "",
    isActivePlayer: true,
    color: PlayerColorEnum.Red,
  }),
  awayPlayer: new Player({
    id: 1,
    playerName: "",
    isActivePlayer: false,
    color: PlayerColorEnum.Orange,
  }),

  usableDie: null,

  playerType: PlayerTypeEnum.Easy,
  gameHasEnded: false,

  updateGameScore() {
    const homePlayerState = get().homePlayer;
    const awayPlayerState = get().awayPlayer;

    set({
      homePlayer: homePlayerState?.copyWith({
        score: calculatePlayerScore(homePlayerState),
      }),
      awayPlayer: awayPlayerState?.copyWith({
        score: calculatePlayerScore(awayPlayerState),
      }),
    });
  },

  setPlayerType(playerType: PlayerTypeEnum) {
    set({ playerType: playerType });
  },

  async swapActivePlayer() {
    const homePlayerState = get().homePlayer;
    const awayPlayerState = get().awayPlayer;

    const cpuActive = get().playerType !== PlayerTypeEnum.Human;

    set({
      homePlayer: homePlayerState?.copyWith({
        isActivePlayer: !homePlayerState?.isActivePlayer,
      }),
      awayPlayer: awayPlayerState?.copyWith({
        isActivePlayer: !awayPlayerState?.isActivePlayer,
      }),
    });

    if (cpuActive) {
      const cpuPlayerState = get().awayPlayer;
      const cpuDifficultyState = get().playerType;
      const addDiceToColumnStateAction = (player: Player, column: number) => {
        get().addUsableDieToPlayerColumn(player, column);
      };
      await runCpuTurn({
        cpuPlayerState: cpuPlayerState!,
        cpuDifficultyState: cpuDifficultyState,
        addDiceToColumn: addDiceToColumnStateAction,
      });
    }
  },

  endPlayerTurn() {
    console.log(`Ending player turn\n\n ///////////`);
    set({ usableDie: null });
    get().rollNewUsableDie();
    console.log("swapping player");
    get().swapActivePlayer();
  },

  startGame() {
    const coinFlip = generateRandomInt({ max: 1 });
    const cpuActive =
      get().playerType !== PlayerTypeEnum.Human && coinFlip === 1;

    set({
      gameHasEnded: false,
      homePlayer: get().homePlayer?.copyWith({
        score: 0,
        isActivePlayer: coinFlip === 0 ? true : false,
        diceGrid: emptyDiceArray,
        // temporary until player can pick
        playerName: "Player",
      }),
      awayPlayer: get().awayPlayer?.copyWith({
        score: 0,
        isActivePlayer: coinFlip === 1 ? true : false,
        diceGrid: emptyDiceArray,
        // temporary until player can pick
        playerName: "CPU",
      }),
    });

    get().rollNewUsableDie();

    // CPU was chosen to go first

    if (cpuActive) {
      const cpuPlayerState = get().awayPlayer;
      const cpuDifficultyState = get().playerType;
      const addDiceToColumnStateAction = (player: Player, column: number) => {
        get().addUsableDieToPlayerColumn(player, column);
      };
      runCpuTurn({
        cpuPlayerState: cpuPlayerState!,
        cpuDifficultyState: cpuDifficultyState,
        addDiceToColumn: addDiceToColumnStateAction,
      });
    }
  },

  endGame() {
    set({
      gameHasEnded: true,
      usableDie: null,
      homePlayer: get().homePlayer?.copyWith({
        isActivePlayer: false,
        diceGrid: emptyDiceArray,
      }),
      awayPlayer: get().awayPlayer?.copyWith({
        isActivePlayer: false,
        diceGrid: emptyDiceArray,
      }),
    });
  },

  async addUsableDieToPlayerColumn(player: Player, columnIndex: number) {
    const selectedPlayer: Player = player;
    const usableDie = get().usableDie;

    let mutablePlayerDiceGrid: (DiceData | null)[][] = selectedPlayer.diceGrid;
    let mutablePlayerDiceColumn: (DiceData | null)[] =
      selectedPlayer.diceGrid[columnIndex];

    let diceWasAdded = false;

    console.log(`attempted to add a dice at column index ${columnIndex}`);
    for (let index = 0; index < mutablePlayerDiceColumn.length; index++) {
      if (mutablePlayerDiceColumn[index] === null) {
        mutablePlayerDiceColumn[index] = usableDie;
        console.log(`Added dice at index ${index}`);
        diceWasAdded = true;
        break;
      }
    }

    if (diceWasAdded) {
      mutablePlayerDiceGrid[columnIndex] = mutablePlayerDiceColumn;
      const updatedPlayer: Player = selectedPlayer.copyWith({
        diceGrid: mutablePlayerDiceGrid,
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

      // check to see if this die ended the game
      let playerEndedGame = true;

      player.diceGrid.forEach((column) => {
        column.forEach((die) => {
          if (die === null) {
            playerEndedGame = false;
          }
        });
      });

      if (playerEndedGame) {
        await waitRandomDelay(1000, 1000);
        get().endGame();
        return;
      }
      // after die is added

      console.log("started removing");
      get().removeMatchingDiceFromOtherPlayer(
        updatedPlayer,
        usableDie!.numberValue,
        columnIndex
      );
      console.log("started updating");
      get().updateGameScore();
      console.log("starting to end player turn");
      get().endPlayerTurn();
    } else {
      console.log("no dice added.  SAD");
    }
  },

  removeMatchingDiceFromOtherPlayer(
    playerOfOrigin: Player,
    diceValue: number,
    columnIndex: number
  ) {
    let otherPlayer: Player | null;
    if (playerOfOrigin.id == get().homePlayer!.id) {
      otherPlayer = get().awayPlayer;
    } else {
      otherPlayer = get().homePlayer;
    }

    if (otherPlayer == null) {
      return;
    }

    let mutableOtherPlayerDiceGrid: (DiceData | null)[][] =
      otherPlayer!.diceGrid;
    let mutableUpdatedOtherPlayerDiceGridColumn: (DiceData | null)[] =
      mutableOtherPlayerDiceGrid[columnIndex].map((diceData) => {
        if (diceData?.numberValue == diceValue) {
          return null;
        } else {
          return diceData;
        }
      });

    const moveDiceDown = () => {
      let moved = false;

      for (
        let i = 0;
        i < mutableUpdatedOtherPlayerDiceGridColumn.length - 1;
        i++
      ) {
        if (
          mutableUpdatedOtherPlayerDiceGridColumn[i] === null &&
          mutableUpdatedOtherPlayerDiceGridColumn[i + 1] !== null
        ) {
          // Move the dice up
          mutableUpdatedOtherPlayerDiceGridColumn[i] =
            mutableUpdatedOtherPlayerDiceGridColumn[i + 1];
          mutableUpdatedOtherPlayerDiceGridColumn[i + 1] = null;

          // Set flag to indicate movement happened
          moved = true;
        }
      }

      // If any dice were moved, call the function recursively
      if (moved) {
        moveDiceDown();
      }
    };

    moveDiceDown();

    mutableOtherPlayerDiceGrid[columnIndex] =
      mutableUpdatedOtherPlayerDiceGridColumn;

    const updatedPlayer = otherPlayer.copyWith({
      diceGrid: mutableOtherPlayerDiceGrid,
    });
    if (otherPlayer.id == get().homePlayer!.id) {
      set({ homePlayer: updatedPlayer });
    } else {
      set({ awayPlayer: updatedPlayer });
    }
  },

  rollNewUsableDie() {
    const newDieValue = generateRandomInt({ min: 1, max: 6 });
    set({ usableDie: new DiceData({ id: 0, numberValue: newDieValue }) });
  },
}));

export default useGameState;
