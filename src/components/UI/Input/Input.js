import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.isTouched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "profile":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          onChange={props.changed}
        />
      );
      break;
    case "reply":
      inputElement = (
        <div className={classes.InputReply}>
          <div className={classes.AddEmoji} onClick={props.clickedEmoji}>
            <p>{props.closedEmoji ? "x" : "+"}</p>
          </div>
          <input
            className={inputClasses.join(" ")}
            style={{
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              resize: "none",
            }}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
