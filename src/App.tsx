import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import StartPage from "./pages/StartPage";
import ExamplePage from "./pages/ExamplePage";
import { AppRoutes } from "./router/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Start} element={<StartPage />}></Route>
        <Route path={AppRoutes.Example} element={<ExamplePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
