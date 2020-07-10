import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./ChatHeader.module.css";
import { MoreVert } from "@material-ui/icons";
import Modal from "../../UI/Modal/Modal";
import InfoDetails from "../ChatInfo/InfoDetails/InfoDetails";
import InfoHeader from "../ChatInfo/InfoHeader/InfoHeader";
import Input from "../../UI/Input/Input";

const ChatHeader = (props) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [name, setName] = useState("");

  const { friends } = props;

  useEffect(() => {
    const name = localStorage.getItem("nameFriend");
    setName(
      friends
        .filter((friend) => friend.id === name)
        .map((friend) => friend.data.username)
    );
  }, [friends]);

  const openInfoHandler = () => {
    setOpenInfo(!openInfo);
  };

  return (
    <React.Fragment>
      <div className={classes.ChatHeader}>
        <div className={classes.ChatHeaderName}>
          <h1>
            <span>@</span>
            {name}
          </h1>
        </div>
        <div className={classes.ChatSearch}>
          <Input
            elementType="input"
            elementConfig={{ placeholder: "Search" }}
            value={props.value}
            changed={props.inputChangeHandler}
          />
          <div className={classes.Vert} onClick={openInfoHandler}>
            <MoreVert style={{ marginTop: "8px" }} />
          </div>
        </div>
      </div>
      <Modal show={openInfo} canceled={openInfoHandler}>
        <InfoHeader />
        <InfoDetails />
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friend.friends,
  };
};

export default connect(mapStateToProps)(ChatHeader);
