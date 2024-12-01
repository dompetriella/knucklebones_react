import { getColorByEnum } from "../../logic/colorLogic";
import useGameState from "../../state/gameState";
import DiceSlot from "../dice/DiceSlot";

export function Scoreboard() {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const usableDieState = useGameState((state) => state.usableDie);

  return (
    <div className="flex w-full items-center justify-evenly bg-surface">
      <div className="flex-col">
        <h1>{homePlayerState?.playerName.toUpperCase()}</h1>
        <div
          style={{
            backgroundColor: getColorByEnum(homePlayerState?.color!).primary,
          }}
          className="w-16 h-2"
        ></div>
        <div className="flex"></div>
        <div className="flex justify-center">
          <h1 className="text-2xl">{homePlayerState?.score}</h1>
        </div>
      </div>

      <div className="flex py-4">
          <DiceSlot
            diceData={homePlayerState?.isActivePlayer ? usableDieState : null}
            playerColor={getColorByEnum(homePlayerState?.color ?? null)}
          />

          <DiceSlot
            diceData={awayPlayerState?.isActivePlayer ? usableDieState : null}
            playerColor={getColorByEnum(awayPlayerState?.color ?? null)}
          />
      </div>

      <div className="flex-col">
        <h1>{awayPlayerState?.playerName.toUpperCase()}</h1>
        <div
          style={{
            backgroundColor: getColorByEnum(awayPlayerState?.color!).primary,
          }}
          className="w-16 h-2"
        ></div>
        <div className="flex"></div>
        <div className="flex justify-center">
          <h1 className="text-2xl">{awayPlayerState?.score}</h1>
        </div>
      </div>
    </div>
  );
}
