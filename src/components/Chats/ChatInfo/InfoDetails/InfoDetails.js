import React, { useState, useEffect } from "react";
import classes from "./InfoDetails.module.css";
import InfoDetail from "./InfoDetail/InfoDetail";
import { updatedObject } from "../../../../shared/utility";
import { connect } from "react-redux";

const InfoDetails = (props) => {
  const [info, setInfo] = useState({
    bio: {
      name: "Bio",
      detail: "",
      open: false,
    },
  });

  const { friends } = props;

  useEffect(() => {
    if (info.bio.detail === "") {
      const updated = updatedObject(info, {
        bio: updatedObject(info.bio, {
          detail: friends
            .filter(
              (friend) => friend.id === localStorage.getItem("nameFriend")
            )
            .map((friend) => friend.data.bio),
        }),
      });
      setInfo(updated);
    }
  }, [friends, info]);

  const openedHandler = (event, key) => {
    const updatedInfo = updatedObject(info, {
      [key]: updatedObject(info[key], {
        open: !info[key].open,
      }),
    });
    setInfo(updatedInfo);
  };

  const infoArray = [];
  for (const key in info) {
    infoArray.push({
      id: key,
      ...info[key],
    });
  }

  return (
    <div className={classes.InfoDetails}>
      {infoArray.map((info) => (
        <InfoDetail
          key={info.id}
          opened={(event) => openedHandler(event, info.id)}
          open={info.open}
          name={info.name}
          detail={info.detail}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    friends: state.friend.friends,
  };
};

export default connect(mapStateToProps)(InfoDetails);
