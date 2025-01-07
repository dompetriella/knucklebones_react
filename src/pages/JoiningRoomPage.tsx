import { AppRoutes } from "../router/AppRoutes";

import { MenuButton } from "../components/utility/MenuButton";
import { useEffect, useState } from "react";
import {
  connectPlayerToRoom,
  findOtherPlayerInRoom,
} from "../logic/multiplayer";
import useGameState from "../state/gameState";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/utility/PageHeader";
import { Player } from "../models/Player";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";

function JoiningRoomPage() {
  const { roomCode } = useParams();
  const navigator = useNavigate();
  const setMultiplayerRoomStateAction = useGameState(
    (state) => state.setMultiplayerRoom
  );

  const showSnackbarAction = useGameState((state) => state.showSnackbar);

  const setPlayerTypeAction = useGameState((state) => state.setPlayerType);
  const setPlayerFromDatabaseDataAction = useGameState(
    (state) => state.setPlayerFromDatabaseData
  );

  const [isLoading, setIsLoading] = useState(false);
  const [roomCodeInputState, setRoomCodeInputState] = useState("");

  useEffect(() => {
    if (roomCode) {
      setPlayerTypeAction(PlayerTypeEnum.Human);
      setRoomCodeInputState(() => roomCode);
    }
  }, []);

  return (
    <div className="flex size-full flex-col justify-start items-center relative bg-surface">
      <PageHeader headerText={"Join Game"} returnRoute={AppRoutes.CreateRoom} />

      <div className="w-full h-full flex flex-col justify-center items-center p-16">
        <div className="p-8 mb-8 rounded-2xl border-4 border-onSecondary bg-secondary">
          <div className="p-4">
            <h1 className="text-3xl">Room Code</h1>
          </div>
          <input
            value={roomCodeInputState.toUpperCase()}
            onChange={(input) => setRoomCodeInputState(input.target.value)}
            className="w-48 text-3xl p-4 rounded-md border-2 text-center border-onSecondary"
          ></input>
        </div>
        {roomCodeInputState.length === 4 ? (
          <MenuButton
            text={isLoading ? "Loading ..." : "Join Game"}
            width={250}
            onPressed={async () => {
              setIsLoading(() => true);
              const multiplayerRoom = await connectPlayerToRoom(
                roomCodeInputState.toUpperCase()
              );
              if (multiplayerRoom !== null) {
                setMultiplayerRoomStateAction(multiplayerRoom);

                const roomCreator: Player | null = await findOtherPlayerInRoom(
                  multiplayerRoom.id
                );
                if (roomCreator != null) {
                  setPlayerFromDatabaseDataAction(roomCreator);
                  navigator(AppRoutes.ChooseCharacter);
                  setIsLoading(() => false);
                } else {
                  console.log("could not find room creator");
                }
              } else {
                showSnackbarAction(
                  "No room found with that code.  Try again",
                  "warning"
                );
                setRoomCodeInputState(() => "");
                setIsLoading(() => false);
              }
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default JoiningRoomPage;
