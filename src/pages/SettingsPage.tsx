import { AppRoutes } from "../router/AppRoutes";
import { PageHeader } from "../components/utility/PageHeader";
import { SettingsToggle } from "../components/settings/SettingsToggle";
import { SettingsKeys } from "../global/settingsKeys";
import useGameState from "../state/gameState";

function SettingsPage() {
  const hasAudio = useGameState(
    (state) => state.settings[SettingsKeys.GameAudio]
  );
  return (
    <>
      <div className="flex h-full flex-col justify-start">
        <PageHeader headerText="Settings" returnRoute={AppRoutes.Start} />
        <div className="flex h-full flex-wrap justify-center bg-surface">
          <SettingsToggle
            title={"Game Audio"}
            settingsKey={SettingsKeys.GameAudio}
          />
          {hasAudio ? (
            <SettingsToggle
              title={"Sound Effects"}
              settingsKey={SettingsKeys.SoundEffects}
            />
          ) : null}
          {hasAudio ? (
            <SettingsToggle
              title={"Game Music"}
              settingsKey={SettingsKeys.GameMusicVersion}
              offSubtitle={"Classic"}
              onSubtitle={"Modern"}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
