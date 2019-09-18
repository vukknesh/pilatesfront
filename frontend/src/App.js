import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import BaseRouter from "./Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="marcar-aula">marcarAula</Link>
        <BaseRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
