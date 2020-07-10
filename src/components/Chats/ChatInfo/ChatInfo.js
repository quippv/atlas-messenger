import React from "react";
import classes from "./ChatInfo.module.css";
import InfoDetails from "./InfoDetails/InfoDetails";
import InfoHeader from "./InfoHeader/InfoHeader";

const ChatInfo = (props) => {
  return (
    <div className={classes.ChatInfo}>
      <InfoHeader />
      <InfoDetails />
    </div>
  );
};

export default ChatInfo;
