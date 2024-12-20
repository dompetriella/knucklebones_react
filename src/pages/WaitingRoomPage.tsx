import { AppRoutes } from "../router/AppRoutes";
import { BackButton } from "../components/utility/BackButton";
import { characterDataList } from "../global/characterData";
import { CharacterSelect } from "../components/character/CharacterSelect";
import useGameState from "../state/gameState";

function WaitingRoomPage() {
  const homePlayerState = useGameState((state) => state.homePlayer);

  return (
    <div className="flex size-full flex-col justify-start items-center relative bg-surface">
      <BackButton route={AppRoutes.CreateRoom} />
      <div className="bg-secondary h-1/5 w-full flex justify-center border-b-4 border-onSurface items-center">
        <h1 className="text-3xl">Waiting Room</h1>
      </div>
      <div className="flex flex-col p-4">
        <div className="text-2xl">Room Code</div>
        <div className="text-3xl p-2">Room Code</div>
      </div>

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
    </div>
  );
}

export default WaitingRoomPage;
