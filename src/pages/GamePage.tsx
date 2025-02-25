import useGameState from "../state/gameState";
import { PlayerArea } from "../components/playerArea/PlayerArea";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { useEffect } from "react";
import { Scoreboard } from "../components/playerArea/mobile/Scoreboard";
import { supabase } from "../App";
import {
  convertDatabasePlayerToPlayer,
  getDiceDataForState,
  getPlayerUpdateFromDatabase,
} from "../logic/multiplayer";
import { DatabaseTableNames } from "../global/databaseNames";
import { DiceData } from "../models/DiceData";
import { RealtimeChannel } from "@supabase/supabase-js";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import useScreenWidth from "../hooks/useScreenWidth";
import useSystemState from "../state/systemState";
import { SettingsKeys } from "../global/settingsKeys";
import { AudioFileKeys } from "../global/soundKeys";

function GamePage() {
  const navigator = useNavigate();

  const screenWidthState = useScreenWidth();
  const isMobile: boolean = screenWidthState <= 480;

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
  const playerType = useGameState((state) => state.playerType);

  const gameHasEnded = useGameState((state) => state.gameHasEnded);

  const isMultiplayer = playerType === PlayerTypeEnum.Human;

  const systemState = useSystemState();

  // checking for the first rolled die
  useEffect(() => {
    const getStartingState = async () => {
      const networkDie: DiceData | null = await getDiceDataForState(
        multiplayerRoomState?.id!
      );
      if (networkDie !== usableDieState) {
        directlySetDieValueAction(networkDie);
      }
      if (homePlayerState !== null) {
        const homePlayer = await getPlayerUpdateFromDatabase(homePlayerState!);
        setPlayerFromDatabaseData(homePlayer!);
      }

      if (awayPlayerState !== null) {
        const awayPlayer = await getPlayerUpdateFromDatabase(awayPlayerState!);
        setPlayerFromDatabaseData(awayPlayer!);
      }
    };
    if (isMultiplayer) {
      getStartingState();
    }
  }, []);

  // checking for game over
  useEffect(() => {
    if (gameHasEnded) {
      navigator(AppRoutes.PlayerWon);
    }
  }, [gameHasEnded]);

  // checking for dice rolled updates
  useEffect(() => {
    const subscribeToUsableDiceUpdates = async () => {
      try {

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
                const updatedRow = payload.new;
                if (!updatedRow) {
                  console.error("No updated row found in payload.");
                  return;
                }

                if (updatedRow.usable_dice !== undefined) {
                  directlySetDieValueAction(updatedRow.usable_dice);
                  if (updatedRow.usable_dice !== usableDieState) {
                    setTimeout(() => {
                      systemState.playSoundEffect(
                        AudioFileKeys.DieRollSoundEffect
                      );
                    }, 1000);
                  }
                }
              } catch (payloadError) {
                console.error("Error processing payload:", payloadError);
              }
            }
          )
          .subscribe();

        return () => {
          try {
            supabase.removeChannel(subscription);
          
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

  // getting player updates
  useEffect(() => {
    let subscription: RealtimeChannel | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    const fetchDataIfNoUpdate = async () => {
      const die: DiceData | null = await getDiceDataForState(
        multiplayerRoomState?.id!
      );

      if (die === null || die === undefined) {
        console.log(
          "polled database for die after 10s inactivity.  Null was found"
        );
      } else {
        if (die.id != usableDieState?.id) {
          directlySetDieValueAction(die);
          if (systemState.settings[SettingsKeys.SoundEffects]) {
            setTimeout(() => {
              systemState.playSoundEffect(AudioFileKeys.DieRollSoundEffect);
            }, 1000);
          }
        }
      }
    };

    const resetTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(fetchDataIfNoUpdate, 10000); // 10 seconds
    };

    const subscribeToUpdates = async () => {
      try {
        subscription = await supabase
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

                const updatedPlayer = convertDatabasePlayerToPlayer(updatedRow);
                setPlayerFromDatabaseData(updatedPlayer);

                // Reset timeout on receiving an update
                resetTimeout();
              } catch (error) {
                console.error("Error processing payload:", error);
              }
            }
          )
          .subscribe();

        // Start the timeout when the subscription is successful
        resetTimeout();
      } catch (error) {
        console.error("Error subscribing to channel:", error);
      }
    };

    if (isMultiplayer) {
      subscribeToUpdates();

      return () => {
        if (subscription) {
          supabase.removeChannel(subscription);
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, []);

  // const testingHomePlayer = defaultGameState.homePlayer!.copyWith({
  //   isActivePlayer: true,
  //   character: characterDataList[0],
  // });
  // const testingAwayPlayer = defaultGameState.awayPlayer.copyWith({
  //   isActivePlayer: false,
  //   character: characterDataList[1],
  // });
  // const testingDiceData = new DiceData({ id: "0", numberValue: 4 });

  // return (
  //   <div className="relative flex size-full flex-col justify-evenly bg-surface">
  //     <PlayerArea
  //       player={testingAwayPlayer}
  //       isHomePlayer={false}
  //       usableDie={testingDiceData}
  //     />

  //     {isMobile ? (
  //       <div className="flex w-full flex-col justify-evenly ">
  //         <Scoreboard
  //           homePlayerState={testingHomePlayer}
  //           awayPlayerState={testingAwayPlayer}
  //           usableDieState={testingDiceData}
  //         />
  //       </div>
  //     ) : null}

  //     <PlayerArea
  //       player={testingHomePlayer}
  //       isHomePlayer={true}
  //       usableDie={testingDiceData}
  //     />
  //   </div>
  // );

  return (
    <div className="relative flex size-full flex-col justify-evenly bg-surface">
      <PlayerArea
        player={awayPlayerState}
        isHomePlayer={false}
        usableDie={usableDieState}
      />

      {isMobile ? (
        <div className="flex w-full flex-col justify-evenly ">
          <Scoreboard
            homePlayerState={homePlayerState!}
            awayPlayerState={awayPlayerState!}
            usableDieState={usableDieState}
          />
        </div>
      ) : null}

      <PlayerArea
        player={homePlayerState}
        isHomePlayer={true}
        usableDie={usableDieState}
      />
    </div>
  );
}

export default GamePage;
