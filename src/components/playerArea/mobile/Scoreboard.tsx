import { useRive } from "@rive-app/react-canvas";
import { DiceData } from "../../../models/DiceData";
import { Player } from "../../../models/Player";
import DiceSlot from "../../dice/DiceSlot";
import { MobilePlayerIcon } from "./MobilePlayerIcon";

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
      <MobilePlayerIcon player={homePlayerState} isXFlipped={true} />
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
        <MobilePlayerIcon player={awayPlayerState} isXFlipped={false} />
      </div>
    </div>
  );
}
