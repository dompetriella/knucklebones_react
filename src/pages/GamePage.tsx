import useGameState from "../state/gameState";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { StatusBar } from "../components/statusBar/StatusBar";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

function GamePage() {
  const navigator = useNavigate();
  
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const gameHasEndedState = useGameState((state) => state.gameHasEnded);

  return (
    <div className="relative flex size-full flex-col justify-evenly items-center bg-surface">
      <button onClick={() => navigator(AppRoutes.Start)}  className="absolute top-4 left-4"><div>
        <CloseIcon  className="text-onSurface filter hover:brightness-125" />
        </div></button>
      {gameHasEndedState ? null : <PlayerArea player={awayPlayerState} />}
      <StatusBar />
      {gameHasEndedState ? null : <PlayerArea player={homePlayerState} />}
    </div>
  );
}

export default GamePage;
