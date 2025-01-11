import { color } from "framer-motion";
import useScreenWidth from "../../hooks/useScreenWidth";
import { DiceData } from "../../models/DiceData";
import { Player } from "../../models/Player";
import { PlayerColor } from "../../models/PlayerColor";
import DiceSlot from "../dice/DiceSlot";
import { DesktopAvatarArea } from "./desktop/DesktopAvatarArea";
import { DesktopPlayerScore } from "./desktop/DesktopPlayerScore";
import { PlayerDiceBlock } from "./PlayerDiceBlock";
import { PlayerScore } from "./PlayerScore";

export function PlayerArea({
  player,
  isHomePlayer,
  usableDie,
}: {
  player: Player | null;
  isHomePlayer: boolean;
  usableDie: DiceData | null;
}) {
  const character = player?.character;

  const screenSizeState = useScreenWidth();

  const playerColor: PlayerColor = player?.character?.color!;
  const sizeFactor: number = 0.18;

  const isMobile = screenSizeState <= 480;

  const minImageSize = 64;
  const maxImageSize = 240;

  const imageSize = Math.min(
    Math.max(minImageSize, screenSizeState * sizeFactor),
    maxImageSize
  );

  return (
    <div
      style={{
        backgroundColor: playerColor.primary,
      }}
      className="size-full flex justify-evenly"
    >
      {isHomePlayer && !isMobile ? (
        <DesktopAvatarArea
          player={player!}
          imageSize={imageSize}
          playerColor={playerColor}
          usableDie={usableDie}
          flipX={true}
        />
      ) : (
        <DesktopPlayerScore
          imageSize={imageSize}
          player={player!}
          playerColor={playerColor}
        />
      )}

      <div className="flex flex-col justify-evenly items-center">
        {isHomePlayer && isMobile ? <PlayerScore player={player!} /> : null}

        <PlayerDiceBlock player={player!} isHomePlayer={isHomePlayer} />

        {!isHomePlayer && isMobile ? <PlayerScore player={player!} /> : null}
      </div>

      {!isHomePlayer && !isMobile ? (
        <DesktopAvatarArea
          player={player!}
          imageSize={imageSize}
          playerColor={playerColor}
          usableDie={usableDie}
          
        />
      ) : (
        <DesktopPlayerScore
          imageSize={imageSize}
          player={player!}
          playerColor={playerColor}
         
        />
      )}
    </div>
  );
}
