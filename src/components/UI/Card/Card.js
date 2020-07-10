import React from "react";
import classes from "./Card.module.css";

const Card = (props) => <div className={classes.Card}>{props.children}</div>;

export default Card;
