import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import useGameState from "../state/gameState";
import { PageHeader } from "../components/utility/PageHeader";
import { supabase } from "../App";
import { useEffect, useState } from "react";
import {
  convertDatabasePlayerToPlayer,
  setPlayerActivity,
} from "../logic/multiplayer";
import { Player } from "../models/Player";
import { generateRandomInt } from "../logic/utility";
import { CopyAll } from "@mui/icons-material";

function WaitingRoomPage() {
  const appNavigator = useNavigate();

  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const setPlayerFromDatabaseData = useGameState(
    (state) => state.setPlayerFromDatabaseData
  );

  const roomId = multiplayerRoomState?.id;

  const [connectionState, setConnectionState] = useState(true);

  useEffect(() => {
    if (awayPlayerState?.character == null) {
      const subscription = supabase
        .channel("room-changes") // Unique channel name
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "knucklebones_players" },
          async (payload) => {
            const newRow = payload.new;
            if (newRow.room_id === multiplayerRoomState?.id) {
              console.log("New row added for the specified room:", newRow);
            }
            const updatedPlayer: Player = convertDatabasePlayerToPlayer(newRow);
            setPlayerFromDatabaseData(updatedPlayer);

            const players: string[] = [updatedPlayer.id, homePlayerState!.id];

            const coinTossWinner =
              players[generateRandomInt({ max: players.length - 1 })];

            const winningPlayer: Player | null = await setPlayerActivity(
              true,
              coinTossWinner
            );

            if (winningPlayer != null) {
              setPlayerFromDatabaseData(winningPlayer);
              setConnectionState(() => false);

              setTimeout(() => {
                appNavigator(AppRoutes.CoinFlip);
              }, 3000);
            } else {
              console.log("returned player was null, cannot start game");
            }
          }
        )
        .subscribe();

      // Clean up the subscription when the component unmounts
      return () => {
        supabase.removeChannel(subscription);
      };
    } else {
      setTimeout(() => {
        setConnectionState(() => true);
        appNavigator(AppRoutes.CoinFlip);
      }, 5000);
    }
  }, [roomId]);

  return (
    <div className="flex items-center flex-col size-full bg-surface">
      <PageHeader
        headerText={connectionState ? "Connecting ..." : "Connected!"}
        returnRoute={AppRoutes.Start}
      />
      <button
        onClick={() => {
          const joinUrl = `https://play-knucklebones.web.app/joiningRoom/${multiplayerRoomState?.roomCode}`;
          navigator.clipboard.writeText(joinUrl).then(() => {
            console.log(`Wrote ${joinUrl} to clipboard`)
          });
        }}
        className="flex flex-col m-4 p-2 w-56 rounded-xl  justify-center items-center bg-tertiary"
      >
        <h1 className="text-3xl">Room Code</h1>
        <div className="flex justify-evenly items-center my-2 p-2 w-40 rounded-xl bg-surface">
          <h2 className="text-3xl  font-bold">
            {multiplayerRoomState?.roomCode}
          </h2>
          <div className="w-2"></div>
          <CopyAll style={{ width: 32, height: 32 }} />
        </div>
      </button>
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
