import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ExamplePage from "./pages/ExamplePage";
import { AppRoutes } from "./router/AppRoutes";
import GamePage from "./pages/GamePage";
import CpuDifficultyPage from "./pages/CpuDifficultyPage";
import HowToPlayPage from "./pages/HowToPlayPage";
import PlayerWonPage from "./pages/PlayerWonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Start} element={<StartPage />}></Route>
        <Route path={AppRoutes.Example} element={<ExamplePage />}></Route>
        <Route
          path={AppRoutes.CpuDifficulty}
          element={<CpuDifficultyPage />}
        ></Route>
        <Route path={AppRoutes.Game} element={<GamePage />}></Route>
        <Route path={AppRoutes.HowToPlay} element={<HowToPlayPage />}></Route>
        <Route path={AppRoutes.PlayerWon} element={<PlayerWonPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
