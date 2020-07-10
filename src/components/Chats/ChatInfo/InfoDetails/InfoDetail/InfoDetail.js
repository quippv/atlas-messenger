import React from "react";
import classes from "./InfoDetail.module.css";
import { ArrowRight, ArrowDropDown } from "@material-ui/icons";

const InfoDetail = (props) => {
  return (
    <div className={classes.InfoDetail}>
      <h5>
        {props.open ? (
          <span onClick={props.opened}>
            <ArrowDropDown style={{ fontSize: "16px", cursor: "pointer" }} />
          </span>
        ) : (
          <span onClick={props.opened}>
            <ArrowRight style={{ fontSize: "16px", cursor: "pointer" }} />
          </span>
        )}
        {props.name}
      </h5>
      {props.open && <p>{props.detail}</p>}
    </div>
  );
};

export default InfoDetail;
