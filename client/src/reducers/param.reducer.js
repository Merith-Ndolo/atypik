import { 
  GET_PARAM,
  UPDATE_PARAM,
  DELETE_PARAM,
  UPLOAD_PICTURE,
} from "../actions/paramAction";

const initialState = {};

export default function paramReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PARAM:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_PARAM:
      return state.map((param) => {
        if (param._id === action.payload.paramId) {
          return {
            ...param,
           //message: action.payload.message,
          };
        } else return param;
      });
    case DELETE_PARAM:
      return state.filter((param) => param._id !== action.payload.paramId);
    default:
      return state;
  }
}

