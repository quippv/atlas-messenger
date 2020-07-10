import React, { useEffect } from "react";
import { connect } from "react-redux";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import * as actions from "../../../store/actions/index";

const NavigationItems = (props) => {
  const { onInitFriend, token, id } = props;

  useEffect(() => {
    onInitFriend(token, id);
  }, [onInitFriend, token, id]);

  return (
    <div className={classes.Items}>
      <div>
        <h3>{props.name}</h3>
        <div
          className={props.open ? classes.TriangleUp : classes.TriangleDown}
          onClick={props.opened}
        ></div>
      </div>
      {props.open && (
        <ul>
          {props.friends.map((friend) => (
            <NavigationItem
              key={friend.id}
              data={friend.data}
              name={`${props.sign}${friend.data.username}`}
              nameFriend={friend.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    id: state.user.id,
    friends: state.friend.friends,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitFriend: (token, id) => dispatch(actions.fetchFriendInit(token, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
