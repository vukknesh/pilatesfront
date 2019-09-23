import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./global.css";
import BaseRouter from "./Routes";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <BaseRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
