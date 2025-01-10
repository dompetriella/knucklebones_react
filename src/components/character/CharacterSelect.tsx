import Character from "../../models/Character";
import { Player } from "../../models/Player";
import useGameState from "../../state/gameState";
import { PlayerTypeEnum } from "../../models/PlayerTypeEnum";
import { characterDataList } from "../../global/characterData";
import { AppColors } from "../../AppColors";
import { motion } from "framer-motion";
import useScreenWidth from "../../hooks/useScreenWidth";

export function CharacterSelect({
  character,
  player,
  isAlreadySelected,
}: {
  character: Character;
  player: Player;
  isAlreadySelected: boolean;
}) {
  const screenSizeState = useScreenWidth();

  const gameTypeState = useGameState((state) => state.playerType);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const playerTypeState = useGameState((state) => state.playerType);

  const isMultiplayer = playerTypeState === PlayerTypeEnum.Human;

  const setPlayerCharacterAction = useGameState(
    (state) => state.setPlayerCharacter
  );

  const showSnackbarAction = useGameState((state) => state.showSnackbar);

  const isSelected = player.character === character;

  const backgroundGradient = isSelected
    ? character.color.primary
    : AppColors.Surface;

  const sizeFactor: number = 0.18;
  const textSizeFactor: number = 0.0025;
  const textSize = 16 * (screenSizeState * textSizeFactor);

  return (
    <motion.button
      animate={{
        background: `linear-gradient(${backgroundGradient}, ${AppColors.Surface})`,
      }}
      onClick={async () => {
        if (isAlreadySelected && isMultiplayer) {
          showSnackbarAction(
            `${character.characterName} is already selected by other player!  Choose another character`
          );
        } else {
          setPlayerCharacterAction(character, player.id);
          if (gameTypeState !== PlayerTypeEnum.Human) {
            const remainingCharacters: Character[] = characterDataList.filter(
              (c) => c !== character
            );
            setPlayerCharacterAction(
              remainingCharacters[
                Math.floor(Math.random() * remainingCharacters.length)
              ],
              awayPlayerState?.id!
            );
          }
        }
      }}
      style={{
        minHeight: 128,
        minWidth: 128,
        maxHeight: 240,
        maxWidth: 240,
        background: `linear-gradient(${backgroundGradient}, ${AppColors.Surface})`,
        height: screenSizeState * sizeFactor,
        width: screenSizeState * sizeFactor,
        opacity: isAlreadySelected ? 0.5 : 1,
      }}
      className=" m-2 border-onSurface border-4 shadow-xl rounded-xl flex flex-col justify-center items-center bg-surface"
    >
      <img
        style={{ minHeight: 64, minWidth: 64, maxHeight: 160, maxWidth: 160 }}
        src={`/${character.characterImagePath}`}
        alt={character.characterImageAlt}
        width={screenSizeState * sizeFactor}
        height={screenSizeState * sizeFactor}
      />
      <h1
        style={{ fontSize: textSize > 40 ? 40 : textSize }}
        className="text-center"
      >
        {character.characterName}
      </h1>
    </motion.button>
  );
}
