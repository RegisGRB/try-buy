import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as Cookies from "../../api/cookies";
const ProtectedRoute = ({ key, path, component, protectedRoute=false }) => {
  return (
    <>
      {protectedRoute ? (
        Cookies.getAuth() ? (
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