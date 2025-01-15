import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { AppColors } from "../AppColors";
import useGameState from "../state/gameState";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { PageHeader } from "../components/utility/PageHeader";
import packageJson from "../../package.json";
import { Settings, SettingsApplicationsOutlined } from "@mui/icons-material";

function StartPage() {
  const navigator = useNavigate();
  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center bg-surface relative">
        <PageHeader headerText="KnuckleBones" heightPercentage={33} />
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
