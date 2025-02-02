import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./router/PageRoutes";
import { createClient } from "@supabase/supabase-js";
import GlobalSnackbar from "./components/utility/Snackbar";
import { useEffect } from "react";
import useSystemState from "./state/systemState";
import { BackgroundMusic, SoundFiles } from "./global/soundKeys";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL.toString(),
  import.meta.env.VITE_API_KEY.toString()
);

function App() {
  const loadSoundEffectAction = useSystemState(
    (state) => state.loadSoundEffects
  );
  const loadBackgroundMusicAction = useSystemState((state) => state.loadBackgroundMusic);

  useEffect(() => {
    const handleLoad = async () => {
      await loadSoundEffectAction(SoundFiles);
      await loadBackgroundMusicAction(BackgroundMusic);
    };

    setTimeout(() => {
      handleLoad()
    }, 250)
  }, []);

  return (
    <>
      <BrowserRouter>
        <GlobalSnackbar />
        <PageRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
