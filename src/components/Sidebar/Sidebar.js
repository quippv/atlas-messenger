import React, { useState } from "react";
import classes from "./Sidebar.module.css";
import ToggleSideDrawer from "../Navigation/ToggleSideDrawer/ToggleSideDrawer";
import Adding from "./Adding/Adding";
import { connect } from "react-redux";
import axios from "../../axios-chats";
import Axios from "axios";

const Sidebar = (props) => {
  const [openAdding, setOpenAdding] = useState(false);
  const [search, setSearch] = useState({
    value: "",
    error: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const addingSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .get('/users.json?orderBy="userId"&equalTo="' + search.value + '"')
      .then((response) => {
        const arrayRes = [];
        for (const key in response.data) {
          arrayRes.push({
            id: key,
            data: {
              ...response.data[key],
            },
          });
        }
        setUsers(arrayRes);
        arrayRes.length === 0 &&
          setSearch({ ...search, error: "can't find your friend" });
      })
      .catch((error) => {
        setSearch({ ...search, error: "can't find your friend" });
      });
  };

  const inputChangeHandler = (event) => {
    event.target.value !== props.userId &&
      setSearch({
        ...search,
        value: event.target.value,
      });
  };

  const onShowAddingHandler = () => {
    setOpenAdding(!openAdding);
  };

  const onCloseAddingHandler = () => {
    setOpenAdding(!openAdding);
  };

  const addingFriendHandler = () => {
    const id = localStorage.getItem("name");
    const data = {
      userId: props.userId,
      username: props.username,
      bio: props.bio,
      imageUrl: props.imageUrl,
      id: id,
    };
    const dataMe = {
      userId: users[0].data.userId,
      username: users[0].data.username,
      bio: users[0].data.bio,
      imageUrl: users[0].data.imageUrl,
      id: users[0].id,
    };
    const meUrl = axios.put(
      `/users/${id}/friends/${users[0].data.userId}.json`,
      dataMe
    );
    const friendUrl = axios.put(
      `/users/${users[0].id}/friends/${props.userId}.json`,
      data
    );
    Axios.all([meUrl, friendUrl])
      .then(
        Axios.spread((...response) => {
          setLoading(true);
        })
      )
      .catch((error) => {});
    setTimeout(() => {
      setOpenAdding(!openAdding);
    }, 1000);
  };

  return (
    <React.Fragment>
      <header className={classes.Sidebar}>
        <ToggleSideDrawer clicked={props.openDraw} />
        <div className={classes.Plus} onClick={onShowAddingHandler}>
          +
        </div>
      </header>
      <Adding
        opened={openAdding}
        closed={onCloseAddingHandler}
        loading={loading}
        addingSubmitHandler={addingSubmitHandler}
        inputChangeHandler={inputChangeHandler}
        search={search}
        users={users}
        addingFriendHandler={addingFriendHandler}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    username: state.user.username,
    bio: state.user.bio,
    imageUrl: state.user.imageUrl,
  };
};

export default connect(mapStateToProps)(Sidebar);
