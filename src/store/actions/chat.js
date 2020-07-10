import * as actionTypes from "./actionTypes";
import axios from "../../axios-chats";
import Axios from "axios";

export const chatStart = () => {
  return {
    type: actionTypes.CHAT_START,
  };
};

export const chatSuccess = (id, chats) => {
  return {
    type: actionTypes.CHAT_SUCCESS,
    data: chats,
    id,
  };
};

export const chatFail = (error) => {
  return {
    type: actionTypes.CHAT_FAIL,
    error,
  };
};

export const chatInit = (chats) => {
  return (dispatch) => {
    dispatch(chatStart());
    const id = localStorage.getItem("name");
    const friendName = localStorage.getItem("nameFriend");
    const token = localStorage.getItem("token");
    const friendId = localStorage.getItem("friendId");
    const userId = localStorage.getItem("userId");
    const meUrl = axios.post(
      `/users/${id}/friends/${friendName}/chats.json?auth=${token}`,
      chats
    );
    const friendUrl = axios.post(
      `/users/${friendId}/friends/${userId}/chats.json?auth=${token}"`,
      chats
    );
    Axios.all([meUrl, friendUrl])
      .then(
        Axios.spread((...response) => {
          const meResponse = response[0];
          dispatch(chatSuccess(meResponse.data.name, chats));
        })
      )
      .catch((error) => {
        dispatch(chatFail(error));
      });
  };
};

export const fetchChatStart = () => {
  return {
    type: actionTypes.FETCH_CHAT_START,
  };
};

export const fetchChatSuccess = (chats) => {
  return {
    type: actionTypes.FETCH_CHAT_SUCCESS,
    chats,
  };
};

export const fetchChatFail = (error) => {
  return {
    type: actionTypes.FETCH_CHAT_FAIL,
    error,
  };
};

export const fetchChatInit = () => {
  return (dispatch) => {
    dispatch(fetchChatStart());
    const id = localStorage.getItem("name");
    const friendName = localStorage.getItem("nameFriend");
    const token = localStorage.getItem("token");
    axios
      .get(`/users/${id}/friends/${friendName}/chats.json?auth=${token}`)
      .then((response) => {
        const resArray = [];
        for (const key in response.data) {
          resArray.push({
            id: key,
            data: {
              ...response.data[key],
            },
          });
        }
        dispatch(fetchChatSuccess(resArray));
      })
      .catch((error) => {
        dispatch(fetchChatFail(error));
      });
  };
};
