import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BaseRouter from "./Routes";
import BottomMenu from "./components/menu/BottomMenu";
import "./global.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BaseRouter />
        <BottomMenu />
      </BrowserRouter>
    </div>
  );
}

export default App;
