import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";

import { CharacterSelect } from "../components/character/CharacterSelect";
import { characterDataList } from "../global/characterData";
import { BackButton } from "../components/utility/BackButton";
import useGameState from "../state/gameState";
import { MenuButton } from "../components/utility/MenuButton";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import { PageHeader } from "../components/utility/PageHeader";
import { useState } from "react";
import { addPlayerToGame, createRoom } from "../logic/multiplayer";
import { Player } from "../models/Player";

function ChooseCharacterPage() {
  const navigator = useNavigate();

  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);

  const setMultiplayerRoomStateAction = useGameState(
    (state) => state.setMultiplayerRoom
  );

  const [isLoading, setIsLoading] = useState(false);

  const homePlayerState = useGameState((state) => state.homePlayer);
  const playTypeState = useGameState((state) => state.playerType);

  return (
    <div className="flex size-full flex-col justify-between items-center bg-surface">
      <PageHeader
        headerText="Choose Your Player"
        returnRoute={AppRoutes.Start}
      />
      <div className="h-full flex flex-col justify-center items-center">
        <div className="flex flex-wrap items-center justify-center pt-8">
          {characterDataList.map((character) => {
            return (
              <CharacterSelect
                character={character}
                player={homePlayerState!}
              />
            );
          })}
        </div>
        <MenuButton
          onPressed={async () => {
            if (playTypeState != PlayerTypeEnum.Human) {
              navigator(AppRoutes.CpuDifficulty);
            } else {
              setIsLoading(() => true);
              let multiplayerRoomHoist = multiplayerRoomState;
              if (multiplayerRoomHoist == null) {
                const multiplayerRoom = await createRoom();
                if (multiplayerRoom !== null) {
                  setMultiplayerRoomStateAction(multiplayerRoom);
                  multiplayerRoomHoist = multiplayerRoom;
                } else {
                  console.log("Multiplayer Room is null");
                }
              }

              const insertedPlayer: Player | null = await addPlayerToGame(
                multiplayerRoomHoist!.id,
                homePlayerState!
              );
              if (insertedPlayer !== null) {
                setIsLoading(() => false);
                navigator(AppRoutes.ConnectingRoom);
              } else {
                console.log("Inserted player is null");
              }
            }
          }}
          text={isLoading ? "Loading..." : "Continue"}
        />
      </div>
    </div>
  );
}

export default ChooseCharacterPage;
