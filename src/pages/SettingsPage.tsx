import { AppRoutes } from "../router/AppRoutes";
import { PageHeader } from "../components/utility/PageHeader";
import { SettingsToggle } from "../components/settings/SettingsToggle";
import { SettingsKeys } from "../global/settingsKeys";
import useSystemState from "../state/systemState";
import { AudioFileKeys } from "../global/soundKeys";
import { useEffect } from "react";

function SettingsPage() {
  const backgroundMusicOn = useSystemState(
    (state) => state.settings[SettingsKeys.BackgroundMusic]
  );
  const playBackgroundMusicAction = useSystemState(
    (state) => state.playBackgroundMusic
  );
  const pauseBackgroundMusicAction = useSystemState(
    (state) => state.pauseBackgroundMusic
  );

  useEffect(() => {
    if (backgroundMusicOn) {
      playBackgroundMusicAction(AudioFileKeys.MenuTheme, false);
    } else {
      pauseBackgroundMusicAction(AudioFileKeys.MenuTheme, false);
    }
  }, [backgroundMusicOn]);

  return (
    <>
      <div className="flex h-full flex-col bg-surface justify-start">
        <PageHeader headerText="Settings" returnRoute={AppRoutes.Start} />
        <div className="flex flex-col justify-center bg-surface">
          <SettingsToggle
            title={"Sound Effects"}
            settingsKey={SettingsKeys.SoundEffects}
          />

          <SettingsToggle
            title={"Background Music"}
            settingsKey={SettingsKeys.BackgroundMusic}
          />
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
