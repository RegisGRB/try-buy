import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CFooter from "../components/Footer/CFooter";
import Enav from "../components/NavBar/ENav";

import { routes } from "./Routes";

const Router = ({ children }) => {
  return (
    <BrowserRouter>
      <Enav></Enav>
      {children}
      <Switch>
        {routes.map((element, key) => {
          return (
            <Route
              exact
              path={element.path}
              key={key}
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
