import React, { useEffect, useState } from "react";

import { LangContext } from "../../context";
const PwaInstall = ({ className }) => {
  const LangContextx = React.useContext(LangContext);
  const [supportsPWA, setSupportsPWA] = useState();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      alert(e)
      setSupportsPWA(e);
    });
  },[]);
  const onClick = async (evt) => {
    evt.preventDefault();
    console.log(supportsPWA)
    // if (supportsPWA !== null) {
    //   supportsPWA.prompt();
    //   const { outcome } = await supportsPWA.userChoice;
    //   if (outcome === "accepted") {
    //     supportsPWA = null;
    //   }
    // }
  };

  return (
    <>
      <a
        href="#"
        className={className}
        id="PWA-button"
        aria-label={LangContextx.PWAInstall}
        title={LangContextx.PWAInstall}
        onClick={onClick}
      >
        {LangContextx.PWAInstall}
      </a>
    </>
  );
};

export default PwaInstall;
