import { GET_TRENDS } from "../actions/postAction";

const initialState = {};

export default function bestofReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload;
    default:
      return state;
  }
}
