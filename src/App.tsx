import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ExamplePage from "./pages/ExamplePage";
import { AppRoutes } from "./router/AppRoutes";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Start} element={<StartPage />}></Route>
        <Route path={AppRoutes.Example} element={<ExamplePage />}></Route>
        <Route path={AppRoutes.Game} element={<GamePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
