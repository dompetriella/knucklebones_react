import useGameState from "../state/gameState";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { StatusBar } from "../components/statusBar/StatusBar";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { getColorByEnum } from "../logic/colorLogic";

function GamePage() {
  const navigator = useNavigate();

  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const gameHasEndedState = useGameState((state) => state.gameHasEnded);

  const activePlayer = homePlayerState?.isActivePlayer
    ? homePlayerState
    : awayPlayerState;

  const activePlayerColor = getColorByEnum(homePlayerState?.color!);

  return (
    <div className="relative flex size-full flex-col justify-evenly items-center bg-surface">
      <button
        onClick={() => navigator(AppRoutes.Start)}
        style={{
          backgroundColor: activePlayerColor.secondary,
        }}
        className="absolute p-2 text-xs bottom-4 right-4 rounded-md"
      >
        Surrender
      </button>
      {gameHasEndedState ? null : (
        <PlayerArea player={awayPlayerState} isHomePlayer={false} />
      )}
      <StatusBar />
      {gameHasEndedState ? null : (
        <PlayerArea player={homePlayerState} isHomePlayer={true} />
      )}
    </div>
  );
}

export default GamePage;
