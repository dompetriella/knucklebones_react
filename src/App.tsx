import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./router/PageRoutes";
import { createClient } from "@supabase/supabase-js";
import GlobalSnackbar from "./components/utility/Snackbar";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL.toString(),
  import.meta.env.VITE_API_KEY.toString()
);

function App() {
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
