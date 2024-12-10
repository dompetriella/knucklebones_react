import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./router/PageRoutes";

function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
