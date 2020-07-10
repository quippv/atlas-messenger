import React from "react";
import classes from "./Add.module.css";
import { AddCircle, CheckCircle } from "@material-ui/icons";

const Add = (props) => {
  return (
    <div className={classes.ADD}>
      {props.users.length > 0 ? (
        props.users.map((user) => (
          <React.Fragment key={user.id}>
            <h5>{user.data.username}</h5>
            <h6>
              {user.data.bio}
              {!props.loading ? (
                <span onClick={props.addingFriendHandler}>
                  <AddCircle
                    style={{
                      fontSize: "12px",
                      marginLeft: "10px",
                      color: "#595353",
                      cursor: "pointer",
                    }}
                  />
                </span>
              ) : (
                <CheckCircle
                  style={{
                    fontSize: "12px",
                    marginLeft: "10px",
                    color: "green",
                  }}
                />
              )}
            </h6>
          </React.Fragment>
        ))
      ) : (
        <p>{props.error}</p>
      )}
    </div>
  );
};

export default Add;
