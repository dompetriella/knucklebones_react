import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import StartPage from "../pages/StartPage";
import ExamplePage from "../pages/ExamplePage";
import CpuDifficultyPage from "../pages/CpuDifficultyPage";
import GamePage from "../pages/GamePage";
import HowToPlayPage from "../pages/HowToPlayPage";
import PlayerWonPage from "../pages/PlayerWonPage";
import CoinFlipPage from "../pages/CoinFlipPage";
import ChoosePlayerPage from "../pages/ChooseCharacterPage";
import CreateRoomPage from "../pages/CreateRoomPage";
import WaitingRoomPage from "../pages/WaitingRoomPage";
import JoiningRoomPage from "../pages/JoiningRoomPage";
import ConnectingRoomPage from "../pages/WaitingRoomPage";
import SettingsPage from "../pages/SettingsPage";

export function PageRoutes() {
  return (
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
      <Route path={AppRoutes.CoinFlip} element={<CoinFlipPage />}></Route>
      <Route
        path={AppRoutes.ChooseCharacter}
        element={<ChoosePlayerPage />}
      ></Route>
      <Route path={AppRoutes.CreateRoom} element={<CreateRoomPage />}></Route>
      <Route path={AppRoutes.WaitingRoom} element={<WaitingRoomPage />}></Route>
      <Route
        path={"joiningRoom/:roomCode?"}
        element={<JoiningRoomPage />}
      ></Route>
      <Route
        path={AppRoutes.ConnectingRoom}
        element={<ConnectingRoomPage />}
      ></Route>
      <Route path={AppRoutes.Settings} element={<SettingsPage />}></Route>
    </Routes>
  );
}
