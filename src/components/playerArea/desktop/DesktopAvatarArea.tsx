import useScreenWidth from "../../../hooks/useScreenWidth";
import Character from "../../../models/Character";
import { DiceData } from "../../../models/DiceData";
import { Player } from "../../../models/Player";
import { PlayerColor } from "../../../models/PlayerColor";
import DiceSlot from "../../dice/DiceSlot";

export function DesktopAvatarArea({
  player,
  playerColor,
  usableDie,
  imageSize,
  flipX = false
}: {
  player: Player;
  playerColor: PlayerColor;
  usableDie: DiceData | null;
  imageSize: number
  flipX?: boolean
}) {

  return <div className="flex flex-col justify-center items-center">
    <img
    className={ flipX ? `transform scale-x-[-1]` : ''}
      src={`/${player.character?.characterImagePath}`}
      alt={player.character?.characterImageAlt}
      width={imageSize}
    />
    <div
      style={{ background: playerColor.secondary, width: imageSize }}
      className="flex justify-center rounded-xl py-4"
    >
      <DiceSlot player={player} diceData={usableDie} />
    </div>
  </div>;
}
