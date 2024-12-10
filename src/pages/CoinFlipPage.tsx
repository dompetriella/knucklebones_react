import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import useGameState from "../state/gameState";
import { Player } from "../models/Player";
import { MenuButton } from "../components/utility/MenuButton";
import { getColorByEnum } from "../logic/colorLogic";

function CoinFlipPage() {
  const navigator = useNavigate();
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const beginFirstTurnAction = useGameState((state) => state.beginFirstTurn);

  const startingPlayer: Player = homePlayerState!.isActivePlayer
    ? homePlayerState!
    : awayPlayerState!;

  return (
    <>
      <div className="bg-surface flex flex-col size-full justify-evenly items-center">
        <div className="flex flex-col justify-center items-center">
          <img
            src={startingPlayer.character?.characterImagePath}
            alt={startingPlayer.character?.characterImageAlt}
            height={250}
            width={250}
          />
          <h1 className="text-[3em]">
            {startingPlayer?.character?.characterName + " "}
            Rolls First!
          </h1>
        </div>

        <MenuButton
          text={"Continue"}
          onPressed={() => {
            beginFirstTurnAction();
            navigator({ pathname: AppRoutes.Game });
          }}
        />
      </div>
    </>
  );
}

export default CoinFlipPage;
