import { useNavigate } from "react-router-dom";
import { waitRandomDelay } from "../../logic/utility";
import Character from "../../models/Character";
import { Player } from "../../models/Player";
import useGameState from "../../state/gameState";
import { AppRoutes } from "../../router/AppRoutes";
import { PlayerTypeEnum } from "../../models/PlayerTypeEnum";
import { characterDataList } from "../../global/characterData";

export function CharacterSelect({
  character,
  player,
}: {
  character: Character;
  player: Player;
}) {
  const setPlayerCharacterAction = useGameState(
    (state) => state.setPlayerCharacter
  );

  const gameTypeState = useGameState((state) => state.playerType);
  const awayPlayerState = useGameState((state) => state.awayPlayer);

  const navigator = useNavigate();
  const isSelected = player.character === character;

  return (
    <button
      onClick={async () => {
        setPlayerCharacterAction(character, player.id);
        if (gameTypeState !== PlayerTypeEnum.Human) {
          setPlayerCharacterAction(characterDataList[3], awayPlayerState?.id!);
        } else {
          //TODO: This will need to be worked out for online
        }
      }}
      style={{
        background: isSelected ? character.color.primary : "var(--surface)",
      }}
      className="p-6 m-2 border-onSurface border-4 shadow-xl rounded-xl flex flex-col bg-surface"
    >
      <img
        src={`/${character.characterImagePath}`}
        alt={character.characterImageAlt}
        width={100}
        height={100}
      />
      <h1 className="pt-4 text-xl">{character.characterName}</h1>
    </button>
  );
}
