import {
  GET_USER,
  UPDATE_BIO,
  UPLOAD_PICTURE,
  DELETE_USER
} from "../actions/userAction";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
      case DELETE_USER:
        return {
          ...state,
          userId: action.payload,
        };
    default:
      return state;
  }
}
