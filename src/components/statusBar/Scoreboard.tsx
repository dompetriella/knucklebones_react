import { DiceData } from "../../models/DiceData";
import { Player } from "../../models/Player";
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
      <img
        className="transform scale-x-[-1]"
        src={`${homePlayerState?.character?.characterImagePath}`}
        alt={homePlayerState?.character?.characterImageAlt}
        width={80}
        height={80}
      />

      <div className="flex py-4">
        <DiceSlot
          diceData={homePlayerState?.isActivePlayer ? usableDieState : null}
          player={homePlayerState}
          initialXDistance={-64}
          initialYDistance={64}
          initialRotation={360}
          animationDelay={1}
        />

        <DiceSlot
          diceData={awayPlayerState?.isActivePlayer ? usableDieState : null}
          player={awayPlayerState}
          initialXDistance={64}
          initialYDistance={-64}
          initialRotation={-360}
          animationDelay={1}
        />
      </div>

      <div className="flex-col items-center justify-center">
        <img
          src={`${awayPlayerState?.character?.characterImagePath}`}
          alt={awayPlayerState?.character?.characterImageAlt}
          width={80}
          height={80}
        />
      </div>
    </div>
  );
}
