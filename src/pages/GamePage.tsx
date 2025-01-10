import useGameState, { defaultGameState } from "../state/gameState";
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
import { characterDataList } from "../global/characterData";
import useScreenWidth from "../hooks/useScreenWidth";

function GamePage() {
  const navigator = useNavigate();

  const screenWidthState = useScreenWidth();
  const isMobile: boolean = screenWidthState <= 480;

  // const usableDieState = useGameState((state) => state.usableDie);
  // const directlySetDieValueAction = useGameState(
  //   (state) => state.directlySetUsableDie
  // );
  // const setPlayerFromDatabaseData = useGameState(
  //   (state) => state.setPlayerFromDatabaseData
  // );
  // const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);

  // const homePlayerState = useGameState((state) => state.homePlayer);
  // const awayPlayerState = useGameState((state) => state.awayPlayer);
  // const gameHasEndedState = useGameState((state) => state.gameHasEnded);
  const playerType = useGameState((state) => state.playerType);

  // const gameHasEnded = useGameState((state) => state.gameHasEnded);

  // const isMultiplayer = playerType === PlayerTypeEnum.Human;

  // checking for the first rolled die
  // useEffect(() => {
  //   const getCurrentNetworkDie = async () => {
  //     const networkDie: DiceData | null = await getDiceDataForState(
  //       multiplayerRoomState?.id!
  //     );
  //     if (networkDie !== usableDieState) {
  //       directlySetDieValueAction(networkDie);
  //     }
  //   };
  //   if (isMultiplayer) {
  //     getCurrentNetworkDie();
  //   }
  // }, []);

  // // checking for game over
  // useEffect(() => {
  //   if (gameHasEnded) {
  //     navigator(AppRoutes.PlayerWon);
  //   }
  // }, [gameHasEnded]);

  // // checking for dice rolled updates
  // useEffect(() => {
  //   const subscribeToUsableDiceUpdates = async () => {
  //     try {
  //       console.log(
  //         "Room ID being used for subscription filter:",
  //         multiplayerRoomState?.id
  //       );

  //       const subscription = supabase
  //         .channel("usable-dice-updates") // Unique channel name
  //         .on(
  //           "postgres_changes",
  //           {
  //             event: "UPDATE",
  //             schema: "public",
  //             table: DatabaseTableNames.KnucklebonesRooms.TableName,
  //             filter: `id=eq.${multiplayerRoomState?.id}`,
  //           },
  //           async (payload) => {
  //             try {
  //               console.log("Payload received:", payload);

  //               const updatedRow = payload.new;
  //               if (!updatedRow) {
  //                 console.error("No updated row found in payload.");
  //                 return;
  //               }

  //               if (updatedRow.usable_dice !== undefined) {
  //                 directlySetDieValueAction(updatedRow.usable_dice);
  //               }
  //             } catch (payloadError) {
  //               console.error("Error processing payload:", payloadError);
  //             }
  //           }
  //         )
  //         .subscribe();

  //       console.log("Subscription to usable-dice-updates created.");

  //       return () => {
  //         try {
  //           supabase.removeChannel(subscription);
  //           console.log("Subscription removed.");
  //         } catch (cleanupError) {
  //           console.error("Error removing subscription:", cleanupError);
  //         }
  //       };
  //     } catch (subscriptionError) {
  //       console.error("Error setting up subscription:", subscriptionError);
  //     }
  //   };

  //   // Call the async function
  //   if (isMultiplayer) {
  //     subscribeToUsableDiceUpdates();
  //   }
  // }, []);

  // // getting player updates
  // useEffect(() => {
  //   let subscription: RealtimeChannel | undefined;
  //   let timeoutId: NodeJS.Timeout | undefined;

  //   const fetchDataIfNoUpdate = async () => {
  //     console.log("No update received in 10 seconds, making a network call...");
  //     // Replace with your network call logic
  //     const die: DiceData | null = await getDiceDataForState(
  //       multiplayerRoomState?.id!
  //     );

  //     if (die === null || die === undefined) {
  //       console.log(
  //         "polled database for die after 10s inactivity.  Null was found"
  //       );
  //     } else {
  //       if (die.id != usableDieState?.id) {
  //         console.log("Its been 10s and, dice update not received correctly");
  //         console.log(
  //           `Manually recieved ${die.id}:${die.numberValue}, setting to state`
  //         );
  //         directlySetDieValueAction(die);
  //       } else {
  //         console.log(
  //           "10 seconds of inactivity, but die data is already in state"
  //         );
  //         console.log("They thinking hard");
  //       }
  //     }
  //   };

  //   const resetTimeout = () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = setTimeout(fetchDataIfNoUpdate, 10000); // 10 seconds
  //   };

  //   const subscribeToUpdates = async () => {
  //     try {
  //       subscription = await supabase
  //         .channel("away-player-updates") // Unique channel name
  //         .on(
  //           "postgres_changes",
  //           {
  //             event: "UPDATE",
  //             schema: "public",
  //             table: "knucklebones_players",
  //             filter: `room_id=eq.${multiplayerRoomState?.id}`,
  //           },
  //           async (payload) => {
  //             try {
  //               const updatedRow = payload.new;
  //               console.log(
  //                 "Updated row for the specified player:",
  //                 updatedRow
  //               );

  //               const updatedPlayer = convertDatabasePlayerToPlayer(updatedRow);
  //               setPlayerFromDatabaseData(updatedPlayer);

  //               // Reset timeout on receiving an update
  //               resetTimeout();
  //             } catch (error) {
  //               console.error("Error processing payload:", error);
  //             }
  //           }
  //         )
  //         .subscribe();

  //       // Start the timeout when the subscription is successful
  //       resetTimeout();
  //     } catch (error) {
  //       console.error("Error subscribing to channel:", error);
  //     }
  //   };

  //   if (isMultiplayer) {
  //     subscribeToUpdates();

  //     return () => {
  //       if (subscription) {
  //         supabase.removeChannel(subscription);
  //       }
  //       if (timeoutId) {
  //         clearTimeout(timeoutId);
  //       }
  //     };
  //   }
  // }, []);

  const testingHomePlayer = defaultGameState.homePlayer!.copyWith({
    isActivePlayer: true,
    character: characterDataList[0],
  });
  const testingAwayPlayer = defaultGameState.awayPlayer.copyWith({
    isActivePlayer: false,
    character: characterDataList[1],
  });
  const testingDiceData = new DiceData({ id: "0", numberValue: 4 });

  return (
    <div className="relative flex size-full flex-col justify-evenly bg-surface">
      <PlayerArea
        player={testingAwayPlayer}
        isHomePlayer={false}
        usableDie={testingDiceData}
      />

      {isMobile ? (
        <div className="flex w-full flex-col justify-evenly ">
          <Scoreboard
            homePlayerState={testingHomePlayer}
            awayPlayerState={testingAwayPlayer}
            usableDieState={testingDiceData}
          />
        </div>
      ) : null}

      <PlayerArea
        player={testingHomePlayer}
        isHomePlayer={true}
        usableDie={testingDiceData}
      />
    </div>
  );

  // return (
  //   <div className="relative flex size-full flex-col justify-evenly items-center bg-surface">
  //     {gameHasEndedState ? null : (
  //       <PlayerArea player={awayPlayerState} isHomePlayer={false} />
  //     )}
  //     <div className="flex w-full flex-col justify-evenly ">
  //       <Scoreboard
  //         homePlayerState={homePlayerState!}
  //         awayPlayerState={awayPlayerState!}
  //         usableDieState={usableDieState}
  //       />
  //     </div>
  //     {gameHasEndedState ? null : (
  //       <PlayerArea player={homePlayerState} isHomePlayer={true} />
  //     )}
  //   </div>
  // );
}

export default GamePage;
