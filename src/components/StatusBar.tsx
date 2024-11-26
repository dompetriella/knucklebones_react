import { getColorByEnum } from "../logic/colorLogic";
import { PlayerColorEnum } from "../models/PlayerColorEnum";
import useGameState from "../state/gameState";
import DiceSlot from "./dice/DiceSlot";

export function StatusBar() {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const usableDieState = useGameState((state) => state.usableDie);

  return (
    <div className="flex w-full justify-evenly bg-surface">
      <div className="flex justify-start items-center">
        <div
          style={{
            backgroundColor: getColorByEnum(homePlayerState?.color!).primary,
          }}
          className="w-6 h-6 mr-4"
        ></div>
        <div className="w-6 text-xl">{homePlayerState?.score}</div>
      </div>
      <div className="w-ful px-4 pb-4 pt-2 flex justify-center items-center">
        <DiceSlot
          diceData={usableDieState}
          playerColor={
            homePlayerState?.isActivePlayer
              ? getColorByEnum(homePlayerState.color ?? null)
              : getColorByEnum(awayPlayerState?.color ?? null)
          }
        />
      </div>
      <div className="flex justify-start items-center">
        <div className="w-6 text-xl">{awayPlayerState?.score}</div>
        <div
          style={{
            backgroundColor: getColorByEnum(awayPlayerState?.color!).primary,
          }}
          className="w-6 h-6 ml-4"
        ></div>
      </div>
    </div>
  );
}
