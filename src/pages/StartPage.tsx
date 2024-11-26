import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import useGameState from "../state/gameState";
import { MenuButton } from "../components/utility/MenuButton";

function StartPage() {
  const navigator = useNavigate();
  const startGameStateAction = useGameState((state) => state.startGame);

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface">
        <div className="bg-secondary h-1/3 w-full flex justify-center items-center">
          <h1 className="text-3xl">KnuckleBones</h1>
        </div>
        <div className="flex size-full flex-col justify-center items-center">
          {/* <MenuButton text={"How To Play"} onPressed={() => null} /> */}
          <MenuButton
            text={"Play VS CPU"}
            onPressed={() => navigator(AppRoutes.CpuDifficulty)}
          />
        </div>
      </div>
    </>
  );
}

export default StartPage;
