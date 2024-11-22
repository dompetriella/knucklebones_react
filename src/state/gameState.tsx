import { create } from "zustand";
import { Player } from "../models/Player";
import { DiceData } from "../models/DiceData";

interface GameState {
  homePlayer: Player | null;
  awayPlayer: Player | null;
}

const useGameState = create<GameState>()((get, set) => ({
  homePlayer: new Player(0, 50, [
    [new DiceData(0, 4), null, null],
    [new DiceData(0, 3), null, null],
    [new DiceData(0, 2), null, null],
  ]),
  awayPlayer: new Player(0, 25),
}));

export default useGameState;
