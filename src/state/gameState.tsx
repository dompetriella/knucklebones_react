import { create } from "zustand";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import { generateRandomInt, waitRandomDelay } from "../logic/utility";
import { calculatePlayerScore } from "../logic/scoring";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { runCpuTurn } from "../logic/cpuLogic";
import { v4 as uuidv4 } from "uuid";
import Character from "../models/Character";
import { MultiplayerRoom } from "../models/MultiplayerRoom";
import {
  getDiceDataForState,
  rollMultiplayerDice,
  setPlayerActivity,
  updatePlayerFromState,
} from "../logic/multiplayer";

const emptyDiceArray: (DiceData | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const homePlayerId = uuidv4();
const awayPlayerId = uuidv4();

interface GameState {
  // Player
  homePlayer: Player | null;
  awayPlayer: Player | null;
  playerType: PlayerTypeEnum;

  setPlayerType: (playerType: PlayerTypeEnum) => void;
  setPlayerCharacter: (character: Character | null, playerId: string) => void;
  swapActivePlayer: () => void;
  updateGameScore: () => void;
  endPlayerTurn: () => void;

  // Game Flow
  gameHasEnded: boolean;
  startGame: () => void;
  beginFirstTurn: () => void;
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
  directlySetUsableDie: (dieValue: number | null) => void;

  //Multiplayer
  multiplayerRoom: MultiplayerRoom | null;
  setMultiplayerRoom: (room: MultiplayerRoom) => void;
  setPlayerFromDatabaseData: (updatedPlayer: Player) => void;
}

const useGameState = create<GameState>((set, get) => ({
  homePlayer: new Player({
    id: homePlayerId,
    playerName: "",
    isActivePlayer: true,
    color: PlayerColorEnum.Red,
  }),
  awayPlayer: new Player({
    id: awayPlayerId,
    playerName: "",
    isActivePlayer: false,
    color: PlayerColorEnum.Orange,
  }),

  usableDie: null,

  playerType: PlayerTypeEnum.Easy,
  gameHasEnded: false,

  multiplayerRoom: null,

  async startGame() {
    const coinFlip = generateRandomInt({ max: 1 });

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
  },

  async beginFirstTurn() {
    await get().rollNewUsableDie();
    const cpuPlayerState = get().awayPlayer;
    const isCpuGame = get().playerType !== PlayerTypeEnum.Human;
    // CPU was chosen to go first

    if (cpuPlayerState?.isActivePlayer && isCpuGame) {
      const cpuPlayerState = get().awayPlayer;
      const cpuDifficultyState = get().playerType;
      const usableDie = get().usableDie;
      const addDiceToColumnStateAction = (player: Player, column: number) => {
        get().addUsableDieToPlayerColumn(player, column);
      };
      runCpuTurn({
        cpuPlayerState: cpuPlayerState!,
        humanPlayerState: get().homePlayer!,
        cpuDifficultyState: cpuDifficultyState,
        usableDiceState: usableDie!,
        addDiceToColumn: addDiceToColumnStateAction,
      });
    }
  },

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

    if (get().playerType === PlayerTypeEnum.Human) {
      let updatedHomePlayer;
      let updatedAwayPlayer;
      if (homePlayerState?.isActivePlayer) {
        updatedHomePlayer = await setPlayerActivity(false, homePlayerState.id);
        updatedAwayPlayer = await setPlayerActivity(true, awayPlayerState?.id!);
      } else {
        updatedHomePlayer = await setPlayerActivity(
          false,
          homePlayerState?.id!
        );
        updatedAwayPlayer = await setPlayerActivity(true, awayPlayerState?.id!);
      }

      set({
        homePlayer: homePlayerState?.copyWith({
          isActivePlayer: updatedHomePlayer?.isActivePlayer,
        }),
        awayPlayer: awayPlayerState?.copyWith({
          isActivePlayer: updatedAwayPlayer?.isActivePlayer,
        }),
      });
    } else {
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
          humanPlayerState: homePlayerState!,
          cpuDifficultyState: cpuDifficultyState,
          usableDiceState: get().usableDie!,
          addDiceToColumn: addDiceToColumnStateAction,
        });
      }
    }
  },

  setPlayerCharacter(character: Character | null, playerId: string) {
    const homePlayer: Player | null = get().homePlayer;
    const awayPlayer: Player | null = get().awayPlayer;

    const selectedPlayer = homePlayer?.id == playerId ? homePlayer : awayPlayer;

    if (selectedPlayer === null) {
      return;
    }

    const updatedPlayer = selectedPlayer.copyWith({ character: character });

    if (updatedPlayer.id === homePlayer?.id) {
      set({ homePlayer: updatedPlayer });
    } else {
      set({ awayPlayer: updatedPlayer });
    }
  },

  async endPlayerTurn() {
    const playerType = get().playerType;

    console.log(`Ending player turn\n\n ///////////`);
    if (playerType === PlayerTypeEnum.Human) {
      console.log("swapping player");
      await get().swapActivePlayer();
      set({ usableDie: null });
      await waitRandomDelay(1000, 1000);
      console.log("ready to roll again");
      await get().rollNewUsableDie();
    }
    set({ usableDie: null });
    await waitRandomDelay(1000, 1000);
    await get().rollNewUsableDie();
    get().swapActivePlayer();
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
        mutablePlayerDiceColumn[index] = usableDie?.copyWith({ id: uuidv4() })!;
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

      const playerType = get().playerType;
      // if we're in multiplayer mode, update the player
      if (playerType === PlayerTypeEnum.Human) {
        await updatePlayerFromState(updatedPlayer);
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
        get().updateGameScore();
        await waitRandomDelay(1000, 1000);
        get().endGame();
        return;
      }
      // after die is added

      console.log("started removing");
      await get().removeMatchingDiceFromOtherPlayer(
        updatedPlayer,
        usableDie!.numberValue,
        columnIndex
      );

      if (playerType === PlayerTypeEnum.Human) {
        await updatePlayerFromState(updatedPlayer);
      }

      console.log("started updating");
      get().updateGameScore();
      console.log("starting to end player turn");
      await get().endPlayerTurn();
    } else {
      console.log("no dice added.  SAD");
    }
  },

  async removeMatchingDiceFromOtherPlayer(
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

    const moveDiceDown = async () => {
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
    const playerType = get().playerType;
    // if we're in multiplayer mode, update the player
    if (playerType === PlayerTypeEnum.Human) {
      await updatePlayerFromState(updatedPlayer);
    }
  },

  directlySetUsableDie(dieValue) {
    console.log(`directly setting die in state to: ${dieValue}`);
    if (dieValue === null) {
      set({ usableDie: null });
      return;
    }
    set({
      usableDie: new DiceData({
        id: crypto.randomUUID(),
        numberValue: dieValue!,
      }),
    });
  },

  async rollNewUsableDie() {
    const playerType = get().playerType;

    const newDieValue = generateRandomInt({ min: 1, max: 6 });
    let stateDie: DiceData | null;

    if (playerType === PlayerTypeEnum.Human) {
      const homePlayerState = get().homePlayer;
      const multiplayerRoomState = get().multiplayerRoom;
      if (homePlayerState?.isActivePlayer) {
        console.log(
          `Rolling for network, player ${homePlayerState.character?.characterName}: ${homePlayerState.id}`
        );
        await rollMultiplayerDice({
          dieNumber: newDieValue,
          roomId: multiplayerRoomState?.id!,
        });
      }
    } else {
      const newDieId = uuidv4();
      stateDie = new DiceData({ id: newDieId, numberValue: newDieValue });
      set({
        usableDie: stateDie,
      });
    }
  },

  async setMultiplayerRoom(room: MultiplayerRoom) {
    set({ multiplayerRoom: room });
  },

  setPlayerFromDatabaseData(updatedPlayer: Player) {
    const homePlayer = get().homePlayer;
    const awayPlayer = get().awayPlayer;

    if (updatedPlayer.id === homePlayer?.id) {
      set({ homePlayer: updatedPlayer });
    } else {
      set({ awayPlayer: updatedPlayer });
    }
  },
}));

export default useGameState;
