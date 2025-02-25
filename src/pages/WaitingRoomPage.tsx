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
import { generateRandomInt } from "../logic/utility";
import { CopyAll } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import LoadingDie from "../components/animation/LoadingDie";
import useSystemState from "../state/systemState";
import { IdleRiveCharacter } from "../components/animation/IdleRiveCharacter";

function WaitingRoomPage() {
  const appNavigator = useNavigate();

  const showSnackbarAction = useSystemState((state) => state.showSnackbar);

  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);
  const hostPlayerIdState = useGameState((state) => state.hostPlayerId);
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const setPlayerFromDatabaseData = useGameState(
    (state) => state.setPlayerFromDatabaseData
  );

  const roomId = multiplayerRoomState?.id;

  const [isConnected, setisConnected] = useState(false);

  useEffect(() => {
    let pollingInterval: ReturnType<typeof setInterval>;

    const pollDatabaseForOtherPlayer = async () => {

      try {
        const { data, error } = await supabase
          .from("knucklebones_players")
          .select("*")
          .eq("room_id", roomId);

        if (error) {
          console.error("Error fetching players:", error);
          return;
        }

        if (data && data.length > 1) {
  

          clearInterval(pollingInterval); // Stop polling as we found the players

          const players = data.map((dbPlayer) =>
            convertDatabasePlayerToPlayer(dbPlayer)
          );

          players.forEach((player) => setPlayerFromDatabaseData(player));

          if (players[0].id === homePlayerState?.id) {
            const coinTossWinner =
              players[generateRandomInt({ max: players.length - 1 })];

            const winningPlayer = await setPlayerActivity(
              true,
              coinTossWinner.id
            );
            if (winningPlayer != null) {
              setPlayerFromDatabaseData(winningPlayer);
            }
          }
          setisConnected(() => true);
          setTimeout(() => {
            appNavigator(AppRoutes.CoinFlip);
          }, 4000);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    // Start polling when the component mounts
    pollingInterval = setInterval(pollDatabaseForOtherPlayer, 1000);

    // Cleanup on component unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <motion.div
      layout
      className="flex items-center justify-center flex-col h-svh bg-surface pb-16 relative"
    >
      <PageHeader
        headerText={!isConnected ? "Connecting ..." : "Connected!"}
        returnRoute={AppRoutes.Start}
      />
      <AnimatePresence>
        {!isConnected && homePlayerState?.id === hostPlayerIdState ? (
          <motion.button
            initial={{ scale: 1 }}
            exit={{ scale: 0 }}
            layout
            onClick={() => {
              const joinUrl = `https://play-knucklebones.web.app/joiningRoom/${multiplayerRoomState?.roomCode}`;
              navigator.clipboard.writeText(joinUrl).then(() => {
                console.log(`Wrote ${joinUrl} to clipboard`);
              });
              showSnackbarAction(
                `Share link for game copied to clipboard. \n\n ${joinUrl}`,
                "success"
              );
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
          </motion.button>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col justify-evenly items-center h-full">
        <div className="flex flex-col">
          {awayPlayerState?.character === null ? (
            <div className="h-32 w-32 bg-surface rounded-lg"></div>
          ) : (
            <IdleRiveCharacter
              path={awayPlayerState?.character?.characterImagePath!}
              width={128}
              height={128}
            />
          )}

          <h2 className="text-2xl font-bold">
            {awayPlayerState?.character?.characterName ?? "Waiting..."}
          </h2>
        </div>
        <LoadingDie isConnected={isConnected} />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">
            {homePlayerState?.character?.characterName}
          </h2>
          <IdleRiveCharacter
            path={homePlayerState?.character?.characterImagePath!}
            width={128}
            height={128}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default WaitingRoomPage;
