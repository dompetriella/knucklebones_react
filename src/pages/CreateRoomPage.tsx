import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { BackButton } from "../components/utility/BackButton";
import { AppColors } from "../AppColors";

function CreateRoomPage() {
  const navigator = useNavigate();

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center relative bg-surface">
        <BackButton route={AppRoutes.Start} />
        <div className="bg-secondary h-1/3 w-full flex justify-center border-b-4 border-onSurface items-center">
          <h1 className="text-3xl">Multiplayer</h1>
        </div>
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"Join Game"}
            width={250}
            bgColor={AppColors.Secondary}
            textColor={AppColors.OnSecondary}
            onPressed={() => navigator(AppRoutes.JoiningRoom)}
          />
          <MenuButton
            text={"Create Game"}
            width={250}
            onPressed={async () => {
              
              navigator(AppRoutes.WaitingRoom);
            } }
          />
        </div>
      </div>
    </>
  );
}

export default CreateRoomPage;
