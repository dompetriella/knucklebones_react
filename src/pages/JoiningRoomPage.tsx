import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import { MenuButton } from "../components/utility/MenuButton";
import { useState } from "react";
import { connectPlayerToRoom } from "../logic/multiplayer";
import useGameState from "../state/gameState";
import { useNavigate } from "react-router-dom";

function JoiningRoomPage() {
  const navigator = useNavigate();
  const setMultiplayerRoomStateAction = useGameState(
    (state) => state.setMultiplayerRoom
  );

  const [isLoading, setIsLoading] = useState(false);
  const [roomCodeInputState, setRoomCodeInputState] = useState("");

  return (
    <div className="flex size-full flex-col justify-start items-center relative bg-surface">
      <BackButton route={AppRoutes.CreateRoom} />
      <div className="bg-secondary h-1/5 w-full flex justify-center border-b-4 border-onSurface items-center">
        <h1 className="text-3xl">Join Game</h1>
        <div className="flex">
          <div></div>
        </div>
      </div>
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
        <MenuButton
          text={isLoading ? "Loading ..." : "Join Game"}
          width={250}
          onPressed={async () => {
            setIsLoading(() => true);
            const multiplayerRoom = await connectPlayerToRoom(
              roomCodeInputState
            );
            if (multiplayerRoom !== null) {
              console.log(multiplayerRoom);
              setMultiplayerRoomStateAction(multiplayerRoom);
              setIsLoading(() => false);
              navigator(AppRoutes.WaitingRoom);
            }
          }}
        />
      </div>
    </div>
  );
}

export default JoiningRoomPage;
