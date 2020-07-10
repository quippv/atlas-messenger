import React from "react";
import Modal from "../../UI/Modal/Modal";
import SearchBar from "../../UI/Search/Search";
import classes from "./Adding.module.css";
import Add from "./Add/Add";

const Adding = (props) => {
  return (
    <Modal show={props.opened} canceled={props.closed}>
      <div className={classes.Adding}>
        <h3>Find your friends</h3>
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>user id:</p>
        <form onSubmit={props.addingSubmitHandler}>
          <SearchBar
            inputChangeHandler={props.inputChangeHandler}
            value={props.search.value}
          />
          <Add
            users={props.users}
            error={props.search.error}
            addingFriendHandler={props.addingFriendHandler}
            loading={props.loading}
          />
        </form>
      </div>
    </Modal>
  );
};

export default Adding;
