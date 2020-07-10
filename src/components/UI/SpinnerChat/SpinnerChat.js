import React from "react";
import classes from "./SpinnerChat.module.css";

const SpinnerChat = () => {
  return (
    <div className={classes.Spinner}>
      <span className={classes.Spinme}>
        <div className={classes.Spinner}>
          <div className={classes.Bounce1}></div>
          <div className={classes.Bounce2}></div>
          <div className={classes.Bounce3}></div>
        </div>
      </span>
    </div>
  );
};

export default SpinnerChat;
