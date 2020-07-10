import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop closed={props.canceled} />}
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    prevProps.show === nextProps.show &&
    prevProps.children === nextProps.children
);
