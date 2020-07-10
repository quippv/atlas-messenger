import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import { connect } from "react-redux";
import { Settings, ExitToApp } from "@material-ui/icons";
import profileDummy from "../../assets/images/dummy-profile.png";
import { NavLink } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
import * as actions from "../../store/actions/index";

const Profile = (props) => {
  const [open, setOpen] = useState(false);

  const { onUserInit, token } = props;

  useEffect(() => {
    onUserInit(token);
  }, [onUserInit, token]);

  const openCloseEditHandler = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <div className={classes.Profile}>
        <div
          className={classes.ImageProfile}
          style={{
            backgroundImage: `url(${
              props.imageUrl ? props.imageUrl : profileDummy
            })`,
          }}
        ></div>
        <h1>{props.username ? props.username : "anonym"}</h1>
        <div onClick={openCloseEditHandler}>
          <Settings style={{ fontSize: "14px", cursor: "pointer" }} />
        </div>
        <NavLink to="/logout" style={{ textDecoration: "none", color: "#fff" }}>
          <ExitToApp style={{ fontSize: "14px", cursor: "pointer" }} />
        </NavLink>
      </div>
      <EditProfile opened={open} closed={openCloseEditHandler} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.user.loading,
    username: state.user.username,
    imageUrl: state.user.imageUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserInit: (token) => dispatch(actions.fetchUserInit(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
