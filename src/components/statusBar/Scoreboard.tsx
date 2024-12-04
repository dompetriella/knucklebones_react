import { getColorByEnum } from "../../logic/colorLogic";
import { DiceData } from "../../models/DiceData";
import { Player } from "../../models/Player";
import useGameState from "../../state/gameState";
import DiceSlot from "../dice/DiceSlot";

export function Scoreboard({
  homePlayerState,
  awayPlayerState,
  usableDieState,
}: {
  homePlayerState: Player;
  awayPlayerState: Player;
  usableDieState: DiceData | null;
}) {
  return (
    <div className="flex w-full items-center justify-evenly bg-surface">
      <div className="flex-col items-center justify-center">
        <h1 className="text-center">
          {homePlayerState?.playerName.toUpperCase()}
        </h1>
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
          player={homePlayerState}
        />

        <DiceSlot
          diceData={awayPlayerState?.isActivePlayer ? usableDieState : null}
          player={awayPlayerState}
        />
      </div>

      <div className="flex-col items-center justify-center">
        <h1 className="text-center">
          {awayPlayerState?.playerName.toUpperCase()}
        </h1>
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
