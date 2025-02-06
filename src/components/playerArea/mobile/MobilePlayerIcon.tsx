import { useRive } from "@rive-app/react-canvas";
import { Player } from "../../../models/Player";

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
