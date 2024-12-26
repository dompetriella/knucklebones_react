import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import { characterDataList } from "../global/characterData";
import { CharacterSelect } from "../components/character/CharacterSelect";
import useGameState from "../state/gameState";
import { MenuButton } from "../components/utility/MenuButton";

function WaitingRoomPage() {
  const homePlayerState = useGameState((state) => state.homePlayer);
  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);

  return (
    <div className="flex size-full flex-col justify-start items-center relative bg-surface">
      <BackButton route={AppRoutes.CreateRoom} />
      <div className="bg-secondary h-1/5 w-full flex justify-center border-b-4 border-onSurface items-center">
        <h1 className="text-3xl">Waiting Room</h1>
      </div>
      <div className="flex flex-col p-4">
        <h2 className="text-4xl">{multiplayerRoomState?.roomCode}</h2>
        <h2 className="text-3xl">Room Code</h2>
      </div>

      <button className="bg-secondary p-4 my-4 rounded-md border-4 border-onSurface">Copy Invite to Clipboard</button>

      <div className="flex flex-wrap justify-center">
        {characterDataList.map((character) => {
          return (
            <CharacterSelect
              character={character}
              player={homePlayerState!}
              isSmall={true}
            />
          );
        })}
      </div>
      <MenuButton text={"Continue"} onPressed={() => console.log("confirm")} />
    </div>
  );
}

export default WaitingRoomPage;
