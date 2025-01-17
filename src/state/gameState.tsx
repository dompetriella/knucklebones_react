import { create } from "zustand";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import {
  checkForGameOver,
  generateRandomInt,
  waitRandomDelay,
} from "../logic/utility";
import { calculatePlayerScore } from "../logic/scoring";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { runCpuTurn } from "../logic/cpuLogic";
import { v4 as uuidv4 } from "uuid";
import Character from "../models/Character";
import { MultiplayerRoom } from "../models/MultiplayerRoom";
import {
  rollMultiplayerDice,
  swapNetworkPlayers,
  updatePlayerFromState,
} from "../logic/multiplayer";
import { emptyDiceArray } from "../global/utility";
import useSystemState from "./systemState";
import { AudioFileKeys } from "../global/soundKeys";

const homePlayerId = uuidv4();
const awayPlayerId = uuidv4();

export const defaultGameState = {
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
  hostPlayerId: "",
};

interface GameState {
  // Player
  homePlayer: Player | null;
  awayPlayer: Player | null;
  playerType: PlayerTypeEnum;

  resetGameToDefault: () => Promise<void>;
  setPlayerType: (playerType: PlayerTypeEnum) => void;
  setPlayerCharacter: (character: Character | null, playerId: string) => void;
  swapActivePlayer: () => Promise<void>;
  updateGameScore: () => Promise<void>;
  endPlayerTurn: () => Promise<void>;

  // Game Flow
  gameHasEnded: boolean;
  startGame: () => void;
  beginFirstTurn: () => Promise<void>;
  endGame: () => Promise<void>;
  resetGameOver: () => Promise<void>;

  // Dice
  usableDie: DiceData | null;
  addUsableDieToPlayerColumn: (player: Player, columnIndex: number) => void;
  removeMatchingDiceFromOtherPlayer: (
    playerOfOrigin: Player,
    diceValue: number,
    columnIndex: number
  ) => void;
  rollNewUsableDie: () => Promise<void>;
  directlySetUsableDie: (die: DiceData | null) => Promise<void>;

  //Multiplayer
  multiplayerRoom: MultiplayerRoom | null;
  hostPlayerId: string;
  setHostPlayerId: (id: string) => Promise<void>;
  setMultiplayerRoom: (room: MultiplayerRoom) => Promise<void>;
  setPlayerFromDatabaseData: (updatedPlayer: Player) => Promise<void>;
}

const useGameState = create<GameState>((set, get) => ({
  ...defaultGameState,

  async resetGameToDefault() {
    set(defaultGameState);
  },

  async resetGameOver() {
    set({ gameHasEnded: false });
  },

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
    set({ gameHasEnded: false });
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

  async updateGameScore() {
    const homePlayerState = get().homePlayer;
    const awayPlayerState = get().awayPlayer;

    const isMultiplayer = get().playerType === PlayerTypeEnum.Human;

    const updatedHomePlayer = homePlayerState?.copyWith({
      score: calculatePlayerScore(homePlayerState),
    });

    const updatedAwayPlayer = awayPlayerState?.copyWith({
      score: calculatePlayerScore(awayPlayerState),
    });

    set({
      homePlayer: updatedHomePlayer,
      awayPlayer: updatedAwayPlayer,
    });

    if (isMultiplayer) {
      await updatePlayerFromState(updatedHomePlayer!);
      await updatePlayerFromState(updatedAwayPlayer!);
    }
  },

  setPlayerType(playerType: PlayerTypeEnum) {
    set({ playerType: playerType });
  },

  async swapActivePlayer() {
    const homePlayerState = get().homePlayer;
    const awayPlayerState = get().awayPlayer;

    const cpuActive = get().playerType !== PlayerTypeEnum.Human;

    if (get().playerType === PlayerTypeEnum.Human) {
      const activePlayer = homePlayerState?.isActivePlayer
        ? homePlayerState
        : awayPlayerState;
      const inactivePlayer = homePlayerState?.isActivePlayer
        ? awayPlayerState
        : homePlayerState;

      await swapNetworkPlayers(inactivePlayer!.id, activePlayer!.id);
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
    set({ usableDie: null });
    await waitRandomDelay(1000, 1000);
    if (playerType === PlayerTypeEnum.Human) {
      await get().swapActivePlayer();
      await get().rollNewUsableDie();
    } else {
      await get().rollNewUsableDie();
      await get().swapActivePlayer();
    }
  },

  async endGame() {
    const endGameHomePlayer = get().homePlayer?.copyWith({
      isActivePlayer: false,
      diceGrid: emptyDiceArray,
    });

    const endGameAwayPlayer = get().awayPlayer?.copyWith({
      isActivePlayer: false,
      diceGrid: emptyDiceArray,
    });

    set({
      gameHasEnded: true,
      usableDie: null,
      homePlayer: endGameHomePlayer,
      awayPlayer: endGameAwayPlayer,
    });
  },

  async addUsableDieToPlayerColumn(player: Player, columnIndex: number) {
    const selectedPlayer: Player = player;
    const usableDie = get().usableDie;
    const playerType = get().playerType;
    const isMultiplayer = playerType === PlayerTypeEnum.Human;

    if (!usableDie) {
      console.error("Usable die is null or undefined.");
      return;
    }

    const updatedDiceGrid = selectedPlayer.diceGrid.map((row, index) =>
      index === columnIndex ? [...row] : row
    );
    const updatedColumn = [...updatedDiceGrid[columnIndex]];

    const emptySpotIndex = updatedColumn.findIndex((die) => die === null);
    if (emptySpotIndex !== -1) {
      const newDie = new DiceData({
        id: crypto.randomUUID(),
        numberValue: usableDie.numberValue,
      });
      updatedColumn[emptySpotIndex] = newDie;
      updatedDiceGrid[columnIndex] = updatedColumn;

      console.log(
        `Added dice at index ${emptySpotIndex} in column ${columnIndex}`
      );

      const updatedPlayer: Player = selectedPlayer.copyWith({
        diceGrid: updatedDiceGrid,
        score: selectedPlayer.score,
      });

      if (player.id === get().homePlayer?.id) {
        set({
          homePlayer: updatedPlayer,
        });
      } else {
        set({
          awayPlayer: updatedPlayer,
        });
      }

      const currentHomePlayerState = get().homePlayer;
      const currentAwayPlayerState = get().awayPlayer;

      const isGameOver = await checkForGameOver(
        currentHomePlayerState!,
        currentAwayPlayerState!
      );

      // Game has ended, update db and end game
      if (isGameOver) {
        await get().updateGameScore();
        const scoredHomePlayerState = get().homePlayer;
        const scoredAwayPlayerState = get().awayPlayer;

        if (isMultiplayer) {
          await updatePlayerFromState(scoredHomePlayerState!);
          await updatePlayerFromState(scoredAwayPlayerState!);
        }

        await waitRandomDelay(1000, 1000);
        get().endGame();
        return;
      }

      // Remove matching dice from the other player
      console.log("Started removing matching dice...");
      await get().removeMatchingDiceFromOtherPlayer(
        updatedPlayer,
        usableDie.numberValue,
        columnIndex
      );

      // Update the game score and end the player's turn
      console.log("Updating game score and ending turn...");
      await get().updateGameScore();
      if (isMultiplayer) {
        const scoredHomePlayerState = get().homePlayer;

        await updatePlayerFromState(scoredHomePlayerState!);
      }
      // End player turn (includes swapping player)
      await get().endPlayerTurn();
    } else {
      console.log(
        "No empty spots available in the column. Unable to add dice."
      );
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

  async directlySetUsableDie(die) {
    console.log(`directly setting die in state to: ${die?.numberValue}`);

    if (die === undefined) {
      return;
    }

    if (die === null) {
      set({ usableDie: null });
      return;
    }
    set({
      usableDie: die,
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
          `Rolling for network, player ${
            homePlayerState!.character?.characterName
          }: ${homePlayerState!.id}`
        );
        await rollMultiplayerDice({
          die: new DiceData({
            id: crypto.randomUUID(),
            numberValue: newDieValue,
          }),
          roomId: multiplayerRoomState?.id!,
        });
      } else {
        console.log("Not active player, waiting for active player to roll");
      }
    } else {
      const newDieId = uuidv4();
      stateDie = new DiceData({ id: newDieId, numberValue: newDieValue });
      set({
        usableDie: stateDie,
      });
    }

    const systemState = useSystemState.getState();
    setTimeout(() => {
      systemState.playSoundEffect(AudioFileKeys.DieRollSoundEffect)
    }, 1000)

  },

  async setMultiplayerRoom(room: MultiplayerRoom) {
    set({ multiplayerRoom: room });
  },

  async setPlayerFromDatabaseData(updatedPlayer: Player) {
    const homePlayer = get().homePlayer;

    const homePlayerIsUpdated = updatedPlayer.id === homePlayer?.id;

    if (homePlayerIsUpdated) {
      set({ homePlayer: updatedPlayer });
    } else {
      set({ awayPlayer: updatedPlayer });
    }

    const gameHasEnded = await checkForGameOver(
      homePlayerIsUpdated ? updatedPlayer : homePlayer!,
      homePlayerIsUpdated ? homePlayer : updatedPlayer
    );

    if (gameHasEnded) {
      await waitRandomDelay(1000, 1000);
      get().endGame();
    }
  },

  async setHostPlayerId(id: string) {
    set({ hostPlayerId: id });
  },
}));

export default useGameState;
