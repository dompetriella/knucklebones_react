import Character from "../../models/Character";
import { Player } from "../../models/Player";
import useGameState from "../../state/gameState";
import { PlayerTypeEnum } from "../../models/PlayerTypeEnum";
import { characterDataList } from "../../global/characterData";
import { AppColors } from "../../AppColors";
import { motion } from "framer-motion";

export function CharacterSelect({

  character,
  player,
  isSmall = false,
}: {
  character: Character;
  player: Player;
  isSmall?: boolean;
}) {
  const setPlayerCharacterAction = useGameState(
    (state) => state.setPlayerCharacter
  );

  const gameTypeState = useGameState((state) => state.playerType);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const showSnackbarAction = useGameState((state) => state.showSnackbar);

  const isSelected = player.character === character;

  const backgroundGradient = isSelected ? character.color.primary : AppColors.Surface

  return (
    <motion.button

      animate={{ background: `linear-gradient(${backgroundGradient}, ${AppColors.Surface})` }}

      onClick={async () => {
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

          showSnackbarAction('Good choice!');
        } else {
          //TODO: This will need to be worked out for online
        }
      }}
      style={{
        background: `linear-gradient(${backgroundGradient}, ${AppColors.Surface})`,
        height: isSmall ? 128 : 160,
        width: isSmall ? 128 : 160
      }}
      className=" m-2 border-onSurface border-4 shadow-xl rounded-xl flex flex-col justify-center items-center bg-surface"
    >
      <img
        src={`/${character.characterImagePath}`}
        alt={character.characterImageAlt}
        width={isSmall ? 65 : 100}
        height={isSmall ? 65 : 100}
      />
      <h1 className="text-center text-xl">{character.characterName}</h1>
    </motion.button>
  );
}
