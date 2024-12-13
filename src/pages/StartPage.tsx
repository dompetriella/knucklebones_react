import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { AppColors } from "../AppColors";
import useGameState from "../state/gameState";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";

function StartPage() {
  const navigator = useNavigate();
  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface">
        <div className="bg-secondary h-1/3 w-full flex justify-center border-b-4 border-onSurface items-center">
          <h1 className="text-3xl">{"KnuckleBones"}</h1>
        </div>
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"How To Play"}
            width={250}
            bgColor={AppColors.Secondary}
            textColor={AppColors.OnSecondary}
            onPressed={() => navigator(AppRoutes.HowToPlay)}
          />
          <MenuButton
            text={"Player VS CPU"}
            width={250}
            onPressed={() => {
              navigator(AppRoutes.ChooseCharacter);
              setPlayerTypeAction(PlayerTypeEnum.Easy);
            }}
          />
          <MenuButton
            width={250}
            text={"Player VS Player"}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Human);
              navigator(AppRoutes.CreateRoom);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default StartPage;
