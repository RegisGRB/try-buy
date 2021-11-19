import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CFooter from "../components/Footer/CFooter";
import Enav from "../components/NavBar/ENav";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import { routes } from "./Routes";

const Router = ({ children }) => {
  return (
    <BrowserRouter>
      <Enav></Enav>
      {children}
      <Switch>
        {routes.map((element, key) => {
          return (
            <ProtectedRoute
              exact
              path={element.path}
              key={key}
              protectedRoute={element.protectedRoute}
              admin={element.Admin}
              component={element.component}
            />
          );
        })}
        
      </Switch>
      <CFooter></CFooter>
    </BrowserRouter>
  );
};
export default Router;
