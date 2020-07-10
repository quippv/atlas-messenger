import * as actionTypes from "./actionTypes";
import axios from "../../axios-chats";

export const userSuccess = (users, id) => {
  return {
    type: actionTypes.USER_SUCCESS,
    id,
    dataForm: users,
  };
};

export const userFail = (error) => {
  return {
    type: actionTypes.USER_FAIL,
    error,
  };
};

export const userStart = () => {
  return {
    type: actionTypes.USER_START,
  };
};

export const userDispatch = (token, users) => {
  return (dispatch) => {
    dispatch(userStart());

    let url = null;

    const id = localStorage.getItem("name");
    if (id !== "null") {
      url = axios.put(`/users/${id}.json?auth=` + token, users);
    } else {
      url = axios.post("/users.json?auth=" + token, users);
    }

    url
      .then((response) => {
        id === "null" && localStorage.setItem("name", response.data.name);
        dispatch(userSuccess(users, response.data.name));
      })
      .catch((error) => {
        dispatch(userFail(error));
      });
  };
};

export const fetchUserSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    users,
  };
};

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error,
  };
};

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START,
  };
};

export const fetchUserInit = (token) => {
  return (dispatch) => {
    dispatch(fetchUserStart());
    const userId = localStorage.getItem("userId");
    const id = localStorage.getItem("name");

    let queryParams = "";

    if (id !== "null") {
      queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    }

    axios
      .get(`/users.json?auth=` + token + queryParams)
      .then((res) => {
        const arrayData = [];
        for (const key in res.data) {
          arrayData.push({
            id: key,
            username: res.data[key].username,
            bio: res.data[key].bio,
            userId: res.data[key].userId,
            imageUrl: res.data[key].imageUrl,
          });
        }
        arrayData.length !== 0
          ? localStorage.setItem("name", arrayData[0].id)
          : localStorage.setItem("name", null);
        dispatch(fetchUserSuccess(arrayData[0]));
      })
      .catch((err) => {
        dispatch(fetchUserFail(err));
      });
  };
};
