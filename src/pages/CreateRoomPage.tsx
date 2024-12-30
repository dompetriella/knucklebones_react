import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import { BackButton } from "../components/utility/BackButton";
import { AppColors } from "../AppColors";
import { createRoom } from "../logic/multiplayer";
import { useState } from "react";
import useGameState from "../state/gameState";
import { PageHeader } from "../components/utility/PageHeader";

function CreateRoomPage() {
  const navigator = useNavigate();
  const multiplayerRoomStateAction = useGameState(
    (state) => state.setMultiplayerRoom
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="flex size-full flex-col justify-start items-center relative bg-surface">
        <PageHeader
          headerText={"Multiplayer"}
          heightPercentage={33}
          returnRoute={AppRoutes.Start}
        />
        <div className="flex size-full flex-col justify-center items-center">
          <MenuButton
            text={"Join Game"}
            width={250}
            bgColor={AppColors.Secondary}
            textColor={AppColors.OnSecondary}
            onPressed={() => navigator(AppRoutes.JoiningRoom)}
          />
          <MenuButton
            text={isLoading ? "Loading ..." : "Create Game"}
            width={250}
            onPressed={() => {
              navigator(AppRoutes.ChooseCharacter);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CreateRoomPage;
