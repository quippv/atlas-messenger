import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../../shared/utility";

const initialState = {
  id: null,
  userId: null,
  username: null,
  bio: null,
  imageUrl: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_START:
      return updatedObject(state, { loading: true });
    case actionTypes.USER_SUCCESS:
      const newObject = { ...action.dataForm };
      return updatedObject(state, {
        username: newObject.username,
        bio: newObject.bio,
        userId: newObject.userId,
        loading: false,
        id: action.id,
        imageUrl: newObject.imageUrl,
      });
    case actionTypes.USER_FAIL:
      return updatedObject(state, {
        error: action.error,
        loading: false,
      });
    case actionTypes.FETCH_USER_START:
      return updatedObject(state, {
        loading: true,
      });
    case actionTypes.FETCH_USER_SUCCESS:
      const newFetch = { ...action.users };
      return updatedObject(state, {
        username: newFetch.username,
        bio: newFetch.bio,
        userId: newFetch.userId,
        loading: false,
        id: newFetch.id,
        imageUrl: newFetch.imageUrl,
      });
    case actionTypes.FETCH_USER_FAIL:
      return updatedObject(state, {
        error: action.error,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
