import { useRive } from "@rive-app/react-canvas";
import { Player } from "../../../models/Player";
import useGameState from "../../../state/gameState";
import { useEffect } from "react";

export function MobilePlayerIcon({
  player,
  isXFlipped,
}: {
  player: Player;
  isXFlipped: boolean;
}) {
  const { rive, RiveComponent } = useRive({
    src: player.character?.characterImagePath,
    stateMachines: ["state_machine"],
    autoplay: true,
  });

  const animationTriggerState = useGameState(
    (state) => state.homePlayer?.character?.animationTrigger
  );

  useEffect(() => {
    const input = rive
      ?.stateMachineInputs("state_machine")
      ?.find((input) => input.name === `${animationTriggerState}_trigger`);
    input?.fire();
  }, [animationTriggerState]);

  return (
    <>
      <div>
        <RiveComponent
          aria-label={player.character!.characterImageAlt}
          style={{
            width: 80,
            height: 80,
            transform: isXFlipped ? "scaleX(-1)" : "",
          }}
        />
      </div>
    </>
  );
}
