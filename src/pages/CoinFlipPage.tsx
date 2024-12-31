import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import useGameState from "../state/gameState";
import { Player } from "../models/Player";
import { MenuButton } from "../components/utility/MenuButton";
import { useEffect, useState } from "react";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { getPlayerUpdateFromDatabase } from "../logic/multiplayer";

function CoinFlipPage() {
  const navigator = useNavigate();
  const gameTypeState = useGameState((state) => state.playerType);
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const setPlayerFromDatabaseData = useGameState(
    (state) => state.setPlayerFromDatabaseData
  );
  const beginFirstTurnAction = useGameState((state) => state.beginFirstTurn);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlayerUpdates = async () => {
      if (gameTypeState === PlayerTypeEnum.Human) {
        setLoading(true); // Start loading

        // Fetch home player update
        if (homePlayerState) {
          const homePlayer = await getPlayerUpdateFromDatabase(homePlayerState);
          setPlayerFromDatabaseData(homePlayer!);
        }

        // Fetch away player update
        if (awayPlayerState) {
          const awayPlayer = await getPlayerUpdateFromDatabase(awayPlayerState);
          setPlayerFromDatabaseData(awayPlayer!);
        }

        setLoading(false); // End loading
      }
    };

    fetchPlayerUpdates();
  }, []);

  const startingPlayer: Player = homePlayerState!.isActivePlayer
    ? homePlayerState!
    : awayPlayerState!;

  if (loading) {
    return (
      <div className="bg-surface flex flex-col size-full justify-center items-center">
        <h1 className="text-[2em]">Loading the Coin Toss</h1>
      </div>
    );
  }

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
          </h1>
          <h1 className="text-[3em]">Rolls First!</h1>
        </div>

        <MenuButton
          text={"Continue"}
          onPressed={async () => {
            navigator({ pathname: AppRoutes.Game });
            setTimeout(
              async () => {
                await beginFirstTurnAction();
              },
              gameTypeState === PlayerTypeEnum.Human ? 1000 : 0
            );
          }}
        />
      </div>
    </>
  );
}

export default CoinFlipPage;
