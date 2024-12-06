import useGameState from "../state/gameState";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { getColorByEnum } from "../logic/colorLogic";
import { useEffect } from "react";
import { Scoreboard } from "../components/statusBar/Scoreboard";

function GamePage() {
  const navigator = useNavigate();

  const usableDieState = useGameState((state) => state.usableDie);

  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const gameHasEndedState = useGameState((state) => state.gameHasEnded);

  const activePlayerColor = getColorByEnum(homePlayerState?.color!);

  const gameHasEnded = useGameState((state) => state.gameHasEnded);

  useEffect(() => {
    if (gameHasEnded) {
      navigator(AppRoutes.PlayerWon);
    }
  }, [gameHasEnded]);

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
