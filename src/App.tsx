import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./router/PageRoutes";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
   import.meta.env.VITE_SUPABASE_URL.toString(),
   import.meta.env.VITE_API_KEY.toString()
);

function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
