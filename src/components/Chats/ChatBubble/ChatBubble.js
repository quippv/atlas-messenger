import React from "react";
import profileDummy from "../../../assets/images/dummy-profile.png";
import classes from "./ChatBubble.module.css";
import SpinnerChat from "../../UI/SpinnerChat/SpinnerChat";

const ChatBubble = (props) => {
  const timeDifference = () => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - props.date;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " seconds ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " minutes ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return (
        "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
      );
    } else {
      return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
    }
  };

  return (
    <div className={classes.Bubble}>
      <div
        className={classes.ProfileImage}
        style={{
          backgroundImage: `url(${!props.image ? profileDummy : props.image})`,
        }}
      ></div>
      <div
        className={classes.ChatInfo}
        style={{
          borderLeft:
            props.userId === props.myId ? "2px solid orangered" : "none",
        }}
      >
        <h5>
          {props.name} <span>{timeDifference()}</span>
        </h5>
        {props.value.includes("https://firebasestorage.googleapis.com") ? (
          <img src={props.value} alt={props.value} />
        ) : (
          <p>{props.value}</p>
        )}
      </div>
      {props.loading && <SpinnerChat />}
    </div>
  );
};

export default ChatBubble;
