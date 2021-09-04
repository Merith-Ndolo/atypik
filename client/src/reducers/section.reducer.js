import { 
    GET_SECTION,
    UPDATE_SECTION,
    DELETE_SECTION,
    UPLOAD_PICTURE,
  } from "../actions/sectionAction";
  
  const initialState = {};
  
  export default function sectionReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SECTION:
        return action.payload;
      case UPLOAD_PICTURE:
        return {
          ...state,
          picture: action.payload,
        };
      case UPDATE_SECTION:
        return state.map((section) => {
          if (section._id === action.payload.sectionId) {
            return {
              ...section,
             //message: action.payload.message,
            };
          } else return section;
        });
      case DELETE_SECTION:
        return state.filter((section) => section._id !== action.payload.sectionId);
      default:
        return state;
    }
  }