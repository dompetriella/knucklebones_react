import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import useGameState from "../state/gameState";
import { PageHeader } from "../components/utility/PageHeader";
import { supabase } from "../App";
import { useEffect } from "react";
import { convertDatabasePlayerToPlayer } from "../logic/multiplayer";
import { Player } from "../models/Player";

function WaitingRoomPage() {
  const navigator = useNavigate();

  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const setPlayerFromDatabaseData = useGameState(
    (state) => state.setPlayerFromDatabaseData
  );

  const roomId = multiplayerRoomState?.id;

  useEffect(() => {
    if (awayPlayerState?.character == null) {
      const subscription = supabase
        .channel("room-changes") // Unique channel name
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "knucklebones_players" },
          (payload) => {
            const newRow = payload.new;
            if (newRow.room_id === multiplayerRoomState?.id) {
              console.log("New row added for the specified room:", newRow);
            }
            const updatedPlayer: Player = convertDatabasePlayerToPlayer(newRow);
            setPlayerFromDatabaseData(updatedPlayer);

            // setTimeout(() => {
            //   navigator(AppRoutes.CoinFlip); 
            // }, 5000);
          }
        )
        .subscribe();

      // Clean up the subscription when the component unmounts
      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [roomId]);



  return (
    <div className="flex flex-col size-full bg-surface">
      <PageHeader headerText={"Connecting ..."} returnRoute={AppRoutes.Start} />
      <div className="flex flex-col h-48 justify-center items-center">
        <h1 className="text-3xl">Room Code</h1>
        <h2 className="text-3xl font-bold">{multiplayerRoomState?.roomCode}</h2>
      </div>
      <div className="flex flex-col size-full justify-evenly items-center">
        <div className="flex flex-col">
          {awayPlayerState?.character === null ? (
            <div className="h-32 w-32 bg-amber-100 rounded-lg"></div>
          ) : (
            <img
              src={awayPlayerState!.character!.characterImagePath}
              alt={awayPlayerState!.character!.characterImageAlt}
              width={128}
              height={128}
            />
          )}

          <h2 className="text-2xl font-bold">
            {awayPlayerState?.character?.characterName ?? "Waiting..."}
          </h2>
        </div>
        <div className="h-32 w-32 bg-tertiary rounded-full"></div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">
            {homePlayerState?.character?.characterName}
          </h2>
          <img
            src={homePlayerState?.character?.characterImagePath}
            alt={homePlayerState?.character?.characterImageAlt}
            width={128}
            height={128}
          />
        </div>
      </div>
    </div>
  );
}

export default WaitingRoomPage;
