import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/AppRoutes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useSystemState from "../../state/systemState";
import { AudioFileKeys } from "../../global/soundKeys";
import { SettingsKeys } from "../../global/settingsKeys";

export function BackButton({ route }: { route: AppRoutes }) {
  const navigator = useNavigate();

  const playSoundEffect = useSystemState((state) => state.playSoundEffect);
  const isSoundEffectsOn = useSystemState(
    (state) => state.settings[SettingsKeys.SoundEffects]
  );

  return (
    <button
      className="absolute flex top-4 left-4 bg-primary text-onPrimary px-4 py-2 rounded-md border-onSurface filter hover:brightness-125"
      onClick={() => {
        navigator(route);
        if (isSoundEffectsOn) {
          playSoundEffect(AudioFileKeys.ButtonClickSoundEffect);
        }
      }}
    >
      <ArrowBackIcon />
    </button>
  );
}
