import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { AppColors } from "../AppColors";
import useGameState from "../state/gameState";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import packageJson from "../../package.json";
import { Settings } from "@mui/icons-material";
import useScreenWidth from "../hooks/useScreenWidth";

function StartPage() {
  const navigator = useNavigate();
  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);
  const screenWidthState = useScreenWidth();

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface relative">
        <div
          style={{ minHeight: `${33}%` }}
          className="flex w-full items-center relative"
        >
          <div className="bg-secondary w-full h-full flex justify-center border-b-4 border-onSurface items-center">
            <img
              style={{ width: screenWidthState * 0.9, maxWidth: 600 }}
              className="p-8"
              src="/images/Title.svg"
            />
          </div>
        </div>
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"How To Play"}
            width={250}
            bgColor={AppColors.Secondary}
            textColor={AppColors.OnSecondary}
            onPressed={() => navigator(AppRoutes.HowToPlay)}
            shouldAnimate={false}
          />
          <MenuButton
            text={"Player VS CPU"}
            width={250}
            onPressed={() => {
              navigator(AppRoutes.ChooseCharacter);
              setPlayerTypeAction(PlayerTypeEnum.Easy);
            }}
            shouldAnimate={false}
          />
          <MenuButton
            width={250}
            text={"Player VS Player"}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Human);
              navigator(AppRoutes.CreateRoom);
            }}
            shouldAnimate={false}
          />
        </div>
        <div className="absolute left-0 bottom-0 p-2 text-onSurface">
          {packageJson.version}
        </div>
        <button
          onClick={() => navigator(AppRoutes.Settings)}
          className="hover:brightness-125 absolute right-0 top-0 m-2 bg-primary rounded-lg "
        >
          <Settings
            className="p-2"
            style={{ width: 48, height: 48, color: AppColors.OnPrimary }}
          />
        </button>
      </div>
    </>
  );
}

export default StartPage;
