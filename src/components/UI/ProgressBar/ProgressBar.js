import React from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = (props) => (
  <div className={classes.ProgressBar}>
    <span style={{ width: props.width * (1 / 100) }}></span>
  </div>
);

export default ProgressBar;
