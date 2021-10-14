import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";


import {routes} from "./Routes";

const Router = ({children}) => {
  return (
    <BrowserRouter>
        {children}
        <Switch>
          {routes.map((element,key)=>{
            return <Route exact path={element.path} key={key} component={element.component} />
          })}
        </Switch>
    </BrowserRouter>
  );
};
export default Router;
