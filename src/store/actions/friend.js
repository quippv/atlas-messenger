import * as actionTypes from "./actionTypes";
import axios from "../../axios-chats";

export const friendStart = () => {
  return {
    type: actionTypes.FRIEND_START,
  };
};

export const fetchFriendSuccess = (friends, friendsObj) => {
  return {
    type: actionTypes.FETCH_FRIEND_SUCCESS,
    friends,
    friendsObj,
  };
};

export const fetchFriendFail = (error) => {
  return {
    type: actionTypes.FETCH_FRIEND_FAIL,
    error,
  };
};

export const fetchFriendInit = (token, id) => {
  return (dispatch) => {
    dispatch(friendStart());
    axios
      .get(`/users/${id}/friends.json?auth=${token}`)
      .then((response) => {
        const friendsArray = [];
        for (const key in response.data) {
          friendsArray.push({
            id: key,
            data: response.data[key],
          });
        }
        dispatch(fetchFriendSuccess(friendsArray, response.data));
      })
      .catch((error) => {
        dispatch(fetchFriendFail(error));
      });
  };
};
