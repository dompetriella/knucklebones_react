import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

import { CharacterSelect } from "../components/character/CharacterSelect";
import { characterDataList } from "../global/characterData";
import { BackButton } from "../components/utility/BackButton";
import useGameState from "../state/gameState";
import { MenuButton } from "../components/utility/MenuButton";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";

function ChooseCharacterPage() {
  const navigator = useNavigate();

  const homePlayerState = useGameState((state) => state.homePlayer);
  const playTypeState = useGameState((state) => state.playerType);

  return (
    <div className="flex size-full flex-col justify-start items-center relative bg-surface">
      <BackButton route={AppRoutes.Start} />
      <div className="bg-secondary h-1/3 w-full flex justify-center border-b-4 border-onSurface items-center">
        <h1 className="text-3xl">Choose Your Player</h1>
      </div>
      <div className="flex flex-wrap justify-center pt-8">
        {characterDataList.map((character) => {
          return (
            <CharacterSelect character={character} player={homePlayerState!} />
          );
        })}
      </div>
      <MenuButton
        onPressed={() => {
          if (playTypeState != PlayerTypeEnum.Human) {
            navigator(AppRoutes.CpuDifficulty);
          } else {
            navigator(AppRoutes.WaitingRoom);
          }
        }}
        text={"Continue"}
      />
    </div>
  );
}

export default ChooseCharacterPage;
