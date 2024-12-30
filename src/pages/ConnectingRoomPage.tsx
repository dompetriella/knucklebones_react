import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import useGameState from "../state/gameState";

function ConnectingRoomPage() {
  const navigator = useNavigate();

  const homePlayerState = useGameState((state) => state.homePlayer);

  return (
    <div className="flex size-full flex-col justify-start items-center relative bg-surface">
      <BackButton route={AppRoutes.Start} />
      <div className="bg-secondary h-1/5 w-full flex justify-center border-b-4 border-onSurface items-center">
        <h1 className="text-3xl">Starting Game ...</h1>
        <div className="flex">
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ConnectingRoomPage;
