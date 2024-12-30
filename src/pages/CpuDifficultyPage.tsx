import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import useGameState from "../state/gameState";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { BackButton } from "../components/utility/BackButton";
import { PageHeader } from "../components/utility/PageHeader";

function CpuDifficultyPage() {
  const navigator = useNavigate();
  const startGameStateAction = useGameState((state) => state.startGame);
  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);
  return (
    <>
      <div className="relative flex size-full flex-col justify-start items-center bg-surface">
        <PageHeader
          headerText={"CPU Difficulty"}
          heightPercentage={33}
          returnRoute={AppRoutes.ChooseCharacter}
        />

        {/* Menu Buttons */}
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"Easy"}
            width={300}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Easy);
              startGameStateAction();
              navigator({ pathname: AppRoutes.CoinFlip });
            }}
          />
          <MenuButton
            text={"Medium"}
            width={300}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Medium);
              startGameStateAction();
              navigator({ pathname: AppRoutes.CoinFlip });
            }}
          />
          <MenuButton
            text={"Hard"}
            width={300}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Hard);
              startGameStateAction();
              navigator({ pathname: AppRoutes.CoinFlip });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CpuDifficultyPage;
