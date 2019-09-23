import React from "react";
import { Route, Switch } from "react-router-dom";
import BottomMenu from "./components/menu/BottomMenu";

import asyncComponent from "./AsyncComponent";
const AsyncLogin = asyncComponent(() => import("./screens/Login/Login"));

const AsyncProfile = asyncComponent(() => import("./screens/Profile/Profile"));
const AsyncMarcarAula = asyncComponent(() =>
  import("./screens/MarcarAula/MarcarAula")
);

const BaseRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={AsyncLogin} />
        <BottomMenu />
      </Switch>
      <Switch>
        <Route exact path="/profile" component={AsyncProfile} />
        <Route exact path="/marcar-aula" component={AsyncMarcarAula} />
      </Switch>
    </>
  );
};

export default BaseRouter;
