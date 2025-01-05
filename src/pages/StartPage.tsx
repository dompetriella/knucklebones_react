import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { AppColors } from "../AppColors";
import useGameState from "../state/gameState";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { PageHeader } from "../components/utility/PageHeader";

function StartPage() {
  const navigator = useNavigate();
  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface">
        <PageHeader headerText="KnuckleBones" heightPercentage={33} />
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"How To Play"}
            width={250}
            bgColor={AppColors.Secondary}
            textColor={AppColors.OnSecondary}
            onPressed={() => navigator(AppRoutes.HowToPlay)}
            animationDelay={0.5}
          />
          <MenuButton
            text={"Player VS CPU"}
            width={250}
            onPressed={() => {
              navigator(AppRoutes.ChooseCharacter);
              setPlayerTypeAction(PlayerTypeEnum.Easy);
            }}
            animationDelay={1.0}
          />
          <MenuButton
            width={250}
            text={"Player VS Player"}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Human);
              navigator(AppRoutes.CreateRoom);
            }}
            animationDelay={1.5}
          />
        </div>
      </div>
    </>
  );
}

export default StartPage;
