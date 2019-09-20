import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import BaseRouter from "./Routes";
import BottomMenu from "./components/menu/BottomMenu";
import Layout from './layout/Layout'
import './global.css'
function App() {
  return (
    <div className="App" >

      <BrowserRouter>
        <Link to="/">Login</Link>
        <Link to="/profile">Profile</Link>
        <Link to="marcar-aula">marcarAula</Link>
        <BaseRouter />
      </BrowserRouter>
      <BottomMenu />

    </div>
  );
}

export default App;
