import React from "react";
import atlasLogo from "../../assets/images/atlas-logo.png";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={atlasLogo} alt="Atlas Logo" />
    </div>
  );
};

export default Logo;
