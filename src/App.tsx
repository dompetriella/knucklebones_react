import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./router/PageRoutes";
import { createClient } from "@supabase/supabase-js";
import GlobalSnackbar from "./components/utility/Snackbar";
import { useEffect } from "react";
import useSystemState from "./state/systemState";
import { SoundFiles } from "./global/soundKeys";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL.toString(),
  import.meta.env.VITE_API_KEY.toString()
);

function App() {
  const loadSoundEffectAction = useSystemState(
    (state) => state.loadSoundEffects
  );

  useEffect(() => {
    loadSoundEffectAction(SoundFiles);
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
