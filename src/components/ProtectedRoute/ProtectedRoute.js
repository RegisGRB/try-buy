import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as Cookies from "../../api/cookies";
import * as Api from "../../api/api";
const ProtectedRoute = ({ key, path, component,admin, protectedRoute=false }) => {

  return (
    <>
      {protectedRoute ? (
        Cookies.getAuth() ? 
        admin ?  true ?   <Route exact key={key} path={path} component={component} /> :  <Redirect to="/Gallery"></Redirect> : 
        (
          <Route exact key={key} path={path} component={component} />
        ) : (
          <Redirect to="/Gallery"></Redirect>
        )
        ) : (
        <Route exact key={key} path={path} component={component} />
      )}
    </>
  );
};

export default ProtectedRoute;



