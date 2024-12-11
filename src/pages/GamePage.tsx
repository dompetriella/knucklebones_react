import useGameState from "../state/gameState";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { useEffect } from "react";
import { Scoreboard } from "../components/statusBar/Scoreboard";

function GamePage() {
  const navigator = useNavigate();

  const usableDieState = useGameState((state) => state.usableDie);

  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const gameHasEndedState = useGameState((state) => state.gameHasEnded);

  const gameHasEnded = useGameState((state) => state.gameHasEnded);

  useEffect(() => {
    if (gameHasEnded) {
      navigator(AppRoutes.PlayerWon);
    }
  }, [gameHasEnded]);

  return (
    <div className="relative flex size-full flex-col justify-evenly items-center bg-surface">
      {gameHasEndedState ? null : (
        <PlayerArea player={awayPlayerState} isHomePlayer={false} />
      )}
      <div className="flex w-full flex-col justify-evenly ">
        <Scoreboard
          homePlayerState={homePlayerState!}
          awayPlayerState={awayPlayerState!}
          usableDieState={usableDieState}
        />
      </div>
      {gameHasEndedState ? null : (
        <PlayerArea player={homePlayerState} isHomePlayer={true} />
      )}
    </div>
  );
}

export default GamePage;
