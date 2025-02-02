import { useRive } from "@rive-app/react-canvas";
import { DiceData } from "../../../models/DiceData";
import { Player } from "../../../models/Player";
import { PlayerColor } from "../../../models/PlayerColor";
import DiceSlot from "../../dice/DiceSlot";
import { AppColors } from "../../../AppColors";
import { image } from "framer-motion/client";

export function DesktopAvatarArea({
  player,
  playerColor,
  usableDie,
  imageSize,
  flipX = false,
}: {
  player: Player;
  playerColor: PlayerColor;
  usableDie: DiceData | null;
  imageSize: number;
  flipX?: boolean;
}) {

  const { rive, RiveComponent } = useRive({
    src: player.character?.characterImagePath,
    stateMachines: ["state_machine"],
    autoplay: true,
  });

  return (
    <div className="flex flex-col justify-center items-start overflow-clip">
      <RiveComponent style={{ zIndex: 2, height: imageSize, width: imageSize, transform: flipX ? "scaleX(-1)" : "" }}
      />
      <div
        style={{
          background: playerColor.secondary,
          width: imageSize,
          zIndex: 1,
          marginTop: -32,
        }}
        className="flex justify-center rounded-xl py-4"
      >
        <DiceSlot
          player={player}
          diceData={player.isActivePlayer ? usableDie : null}
          initialXDistance={(flipX ? -1 : 1) * 64}
          initialYDistance={(flipX ? 1 : -1) * 64}
          initialRotation={360}
          animationDelay={1}
        />
      </div>
    </div>
  );
}
