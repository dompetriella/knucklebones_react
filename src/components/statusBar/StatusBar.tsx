import { useNavigate } from "react-router-dom";
import { PlayerTypeEnum } from "../../models/PlayerTypeEnum";
import { MenuButton } from "../utility/MenuButton";
import { Scoreboard } from "./Scoreboard";
import useGameState from "../../state/gameState";
import { AppRoutes } from "../../router/AppRoutes";


export function StatusBar() {

  const navigator = useNavigate();
  const startGameStateAction = useGameState((state) => state.startGame);
  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);
  const gameHasEnded = useGameState((state) => state.gameHasEnded);

  return (
    <div className="flex w-full flex-col justify-evenly ">
      {gameHasEnded ? <h1 className="text-[4em]">Player Wins!</h1> : null}
      <Scoreboard />
      {gameHasEnded ? <div className="flex flex-col items-center">
      <MenuButton
            text={"Play Again"}
            onPressed={() => {
              setPlayerTypeAction(PlayerTypeEnum.Easy);
              startGameStateAction();
              navigator({ pathname: AppRoutes.Game });
            }}
          />
      <MenuButton
            text={"Main Menu"}
            onPressed={() => {

              navigator({ pathname: AppRoutes.Game });
            }}
          />
      </div> : null}
    </div>
    
  );
}
