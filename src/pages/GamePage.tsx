import useGameState from "../state/gameState";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { useEffect } from "react";
import { Scoreboard } from "../components/statusBar/Scoreboard";
import { supabase } from "../App";
import {
  convertDatabasePlayerToPlayer,
  getDiceDataForState,
} from "../logic/multiplayer";
import { DatabaseTableNames } from "../global/databaseNames";
import { DiceData } from "../models/DiceData";
import { RealtimeChannel } from "@supabase/supabase-js";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";

function GamePage() {
  const navigator = useNavigate();

  const usableDieState = useGameState((state) => state.usableDie);
  const directlySetDieValueAction = useGameState(
    (state) => state.directlySetUsableDie
  );
  const setPlayerFromDatabaseData = useGameState(
    (state) => state.setPlayerFromDatabaseData
  );
  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);

  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const gameHasEndedState = useGameState((state) => state.gameHasEnded);
  const playerType = useGameState((state) => state.playerType)

  const gameHasEnded = useGameState((state) => state.gameHasEnded);


  const isMultiplayer = playerType === PlayerTypeEnum.Human;

  useEffect(() => {
    const getCurrentNetworkDie = async () => {
      const networkDie: DiceData | null = await getDiceDataForState(
        multiplayerRoomState?.id!
      );
      if (networkDie !== usableDieState) {
        directlySetDieValueAction(networkDie);
      }
    };
    if (isMultiplayer) {
      getCurrentNetworkDie();
    }

  }, []);

  useEffect(() => {
    if (gameHasEnded) {
      navigator(AppRoutes.PlayerWon);
    }
  }, [gameHasEnded]);

  // Add a subscription for `usable_dice`
  useEffect(() => {
    const subscribeToUsableDiceUpdates = async () => {
      try {
        console.log(
          "Room ID being used for subscription filter:",
          multiplayerRoomState?.id
        );

        const subscription = supabase
          .channel("usable-dice-updates") // Unique channel name
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: DatabaseTableNames.KnucklebonesRooms.TableName,
              filter: `id=eq.${multiplayerRoomState?.id}`,
            },
            async (payload) => {
              try {
                console.log("Payload received:", payload);

                const updatedRow = payload.new;
                if (!updatedRow) {
                  console.error("No updated row found in payload.");
                  return;
                }

                if (updatedRow.usable_dice !== undefined) {
                  directlySetDieValueAction(updatedRow.usable_dice);
                }
              } catch (payloadError) {
                console.error("Error processing payload:", payloadError);
              }
            }
          )
          .subscribe();

        console.log("Subscription to usable-dice-updates created.");

        return () => {
          try {
            supabase.removeChannel(subscription);
            console.log("Subscription removed.");
          } catch (cleanupError) {
            console.error("Error removing subscription:", cleanupError);
          }
        };
      } catch (subscriptionError) {
        console.error("Error setting up subscription:", subscriptionError);
      }
    };

    // Call the async function
    if (isMultiplayer) {
      subscribeToUsableDiceUpdates();
    }

  }, []);

  useEffect(() => {
    const subscribeToUpdates = async () => {
      try {
        const subscription = await supabase
          .channel("away-player-updates") // Unique channel name
          .on(
            "postgres_changes",
            {
              event: "UPDATE",
              schema: "public",
              table: "knucklebones_players",
              filter: `room_id=eq.${multiplayerRoomState?.id}`,
            },
            async (payload) => {
              try {
                const updatedRow = payload.new;
                console.log(
                  "Updated row for the specified player:",
                  updatedRow
                );

                const updatedPlayer = convertDatabasePlayerToPlayer(updatedRow);
                setPlayerFromDatabaseData(updatedPlayer);
              } catch (error) {
                console.error("Error processing payload:", error);
              }
            }
          )
          .subscribe();

        return subscription;
      } catch (error) {
        console.error("Error subscribing to channel:", error);
      }
    };

    let subscription: RealtimeChannel | undefined;

    if (isMultiplayer) {
      subscribeToUpdates().then((sub) => {
        subscription = sub;
      });

      return () => {
        if (subscription) {
          supabase.removeChannel(subscription);
        }
      };
    }


  }, []);

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
