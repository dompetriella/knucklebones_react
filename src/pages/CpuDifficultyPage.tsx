import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import useGameState from "../state/gameState";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";

function CpuDifficultyPage() {
  const navigator = useNavigate();
  const startGameStateAction = useGameState((state) => state.startGame);
  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface">
        <div className="bg-secondary h-1/3 w-full flex justify-center items-center">
          <h1 className="text-3xl">CPU Difficulty</h1>
        </div>
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"Easy"}
            onPressed={() => {
              startGameStateAction(PlayerTypeEnum.Easy);
              navigator({ pathname: AppRoutes.Game });
            }}
          />
          <MenuButton
            text={"Medium"}
            onPressed={() => {
              startGameStateAction(PlayerTypeEnum.Medium);
              navigator({ pathname: AppRoutes.Game });
            }}
          />
          <MenuButton
            text={"Hard"}
            onPressed={() => {
              startGameStateAction(PlayerTypeEnum.Hard);
              navigator({ pathname: AppRoutes.Game });
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CpuDifficultyPage;
