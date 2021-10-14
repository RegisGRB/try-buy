import React from "react";
import { LangProvider } from "./LangContext";
const ContextContainer = ({ children, ...props }) => {
  return (
      <LangProvider>{children}</LangProvider>
  );
};

export default ContextContainer;
