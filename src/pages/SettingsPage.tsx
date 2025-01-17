import { AppRoutes } from "../router/AppRoutes";
import { PageHeader } from "../components/utility/PageHeader";
import { SettingsToggle } from "../components/settings/SettingsToggle";
import { SettingsKeys } from "../global/settingsKeys";

function SettingsPage() {
  return (
    <>
      <div className="flex h-full flex-col bg-surface justify-start">
        <PageHeader headerText="Settings" returnRoute={AppRoutes.Start} />
        <div className="flex flex-col justify-center bg-surface">
          <SettingsToggle
            title={"Sound Effects"}
            settingsKey={SettingsKeys.SoundEffects}
          />

          {/* <SettingsToggle
            title={"Background Music"}
            settingsKey={SettingsKeys.BackgroundMusic}
          /> */}
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
