import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/AppRoutes";
import { MenuButton } from "../components/utility/MenuButton";
import useGameState from "../state/gameState";
import {
  deleteGameByRoomId,
  restartMultiplayerGame,
} from "../logic/multiplayer";
import { PlayerTypeEnum } from "../models/PlayerTypeEnum";
import useSystemState from "../state/systemState";
import { SettingsKeys } from "../global/settingsKeys";
import { useEffect } from "react";
import { AudioFileKeys } from "../global/soundKeys";
import { useRive } from "@rive-app/react-canvas";

function PlayerWonPage() {
  const navigator = useNavigate();
  const homePlayerState = useGameState((state) => state.homePlayer);
  const awayPlayerState = useGameState((state) => state.awayPlayer);
  const multiplayerRoomState = useGameState((state) => state.multiplayerRoom);
  const playerTypeState = useGameState((state) => state.playerType);

  const resetStateAction = useGameState((state) => state.resetGameToDefault);
  const resetGameOver = useGameState((state) => state.resetGameOver);

  const isMultiplayer = playerTypeState === PlayerTypeEnum.Human;

  const winningPlayer =
    homePlayerState!.score >= awayPlayerState!.score
      ? homePlayerState
      : awayPlayerState;

  const soundEffectsOn = useSystemState(
    (state) => state.settings[SettingsKeys.SoundEffects]
  );

  const backgroundMusicOn = useSystemState(
    (state) => state.settings[SettingsKeys.BackgroundMusic]
  );
  const pauseBackgroundMusicAction = useSystemState(
    (state) => state.pauseBackgroundMusic
  );

  const playBackgroundMusicAction = useSystemState(
    (state) => state.playBackgroundMusic
  );

  const playSoundEffectAction = useSystemState(
    (state) => state.playSoundEffect
  );

  useEffect(() => {
    if (soundEffectsOn) {
      playSoundEffectAction(AudioFileKeys.PlayerWinSoundEffect);
    }

    if (backgroundMusicOn) {
      pauseBackgroundMusicAction(AudioFileKeys.MenuTheme, true);
      pauseBackgroundMusicAction(AudioFileKeys.GameTheme, true);
    }
  }, [backgroundMusicOn]);

  const { rive, RiveComponent } = useRive({
    src: winningPlayer?.character?.characterImagePath,
    stateMachines: ["state_machine"],
    autoplay: true,
  });

  function playerWon() {
    const input = rive
      ?.stateMachineInputs("state_machine")
      ?.find((input) => input.name === "happy_trigger");
    input?.fire();
    console.log(input);
    if (input) {
      input.value = true;
      console.log("triggered");
    }
  }

  useEffect(() => {
    playerWon()
  }, []);


  return (
    <div className="size-full flex flex-col justify-around bg-surface">
      <div className="flex flex-col">
        <h1 className="text-[4em] font-bold">{`${winningPlayer?.character?.characterName}\n\n Won!`}</h1>
        <div className="flex flex-col justify-start">
          <div className="flex flex-col self-center">
            <RiveComponent style={{ height: 250, width: 250 }} />
            <h2 className="text-[5em] font-bold">{`${winningPlayer?.score}`}</h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <MenuButton
          text={"Play Again"}
          onPressed={async () => {
            await resetGameOver();
            if (isMultiplayer) {
              await restartMultiplayerGame({
                homePlayerState: homePlayerState!,
                awayPlayerState: awayPlayerState!,
                roomId: multiplayerRoomState?.id!,
              });
              navigator({ pathname: AppRoutes.WaitingRoom });
            } else {
              resetStateAction();
              navigator({ pathname: AppRoutes.ChooseCharacter });
            }
            if (backgroundMusicOn) {
              playBackgroundMusicAction(AudioFileKeys.GameTheme, true);
            }
          }}
          animationDelay={0.5}
        />
        <MenuButton
          text={"Main Menu"}
          onPressed={async () => {
            navigator({ pathname: AppRoutes.Start });
            const roomId = multiplayerRoomState?.id;
            await resetStateAction();
            if (isMultiplayer && roomId !== null) {
              await deleteGameByRoomId(roomId!);
            }
            if (backgroundMusicOn) {
              playBackgroundMusicAction(AudioFileKeys.MenuTheme, true);
            }
          }}
          animationDelay={1.0}
        />
      </div>
    </div>
  );
}

export default PlayerWonPage;
