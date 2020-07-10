import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";

const NavigationItem = (props) => {
  const clickHandler = () => {
    localStorage.setItem("nameFriend", props.nameFriend);
    localStorage.setItem("userIdFriend", props.data.userId);
    localStorage.setItem("friendId", props.data.id);
  };

  return (
    <li className={classes.NavLink}>
      <NavLink
        to={
          localStorage.getItem("userIdFriend") !== "undefined"
            ? `/chats/${localStorage.getItem("userIdFriend")}`
            : "/chats"
        }
        exact={props.exact}
        activeClassName={classes.active}
        style={{ textDecoration: "none", color: "#fff" }}
        onClick={clickHandler}
      >
        {props.name}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
