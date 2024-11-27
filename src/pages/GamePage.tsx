import useGameState from "../state/gameState";
import { PlayerArea } from "../components/PlayerArea";
import { StatusBar } from "../components/statusBar/StatusBar";

function GamePage() {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const gameHasEndedState = useGameState((state) => state.gameHasEnded);

  return (
    <div className="flex size-full flex-col justify-evenly items-center bg-surface">
      {/* <button onClick={() => navigator({ pathname: AppRoutes.Start })}>
        Return Home
      </button> */}

      {gameHasEndedState ? null : <PlayerArea player={awayPlayerState} />}
      <StatusBar />
      {gameHasEndedState ? null : <PlayerArea player={homePlayerState} />}
    </div>
  );
}

export default GamePage;
