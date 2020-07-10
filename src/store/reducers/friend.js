import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  friendsObj: {},
  friends: [],
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FRIEND_START:
      return updatedObject(state, { loading: true });
    case actionTypes.FETCH_FRIEND_SUCCESS:
      return updatedObject(state, {
        friends: action.friends,
        friendsObj: action.friendsObj,
        loading: false,
      });
    case actionTypes.FETCH_FRIEND_FAIL:
      return updatedObject(state, { error: action.error, loading: false });
    default:
      return state;
  }
};

export default reducer;
