import React from "react";
import Input from "../Input/Input";
import classes from "./Search.module.css";
import { Search } from "@material-ui/icons";

const SearchBar = (props) => {
  return (
    <div className={classes.Search}>
      <Input
        elementType="input"
        elementConfig={{ placeholder: "Search" }}
        value={props.value}
        changed={props.inputChangeHandler}
      />
      <button>
        <Search style={{ fontSize: "16px" }} />
      </button>
    </div>
  );
};

export default SearchBar;
