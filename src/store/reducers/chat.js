import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  chats: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_START:
      return updatedObject(state, { loading: true });
    case actionTypes.CHAT_SUCCESS:
      return updatedObject(state, {
        chats: state.chats.concat({ id: action.id, data: { ...action.data } }),
        loading: false,
      });
    case actionTypes.CHAT_FAIL:
      return updatedObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.FETCH_CHAT_START:
      return updatedObject(state, {
        loading: true,
      });
    case actionTypes.FETCH_CHAT_SUCCESS:
      return updatedObject(state, {
        chats: action.chats,
        loading: false,
      });
    case actionTypes.FETCH_CHAT_FAIL:
      return updatedObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
