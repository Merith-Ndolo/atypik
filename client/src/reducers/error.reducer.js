import { GET_POST_ERRORS } from "../actions/postAction";
import { GET_PARAM_ERRORS } from "../actions/paramAction";
import { GET_USER_ERRORS } from "../actions/userAction";
import { GET_SECTION_ERRORS } from "../actions/sectionAction";

const initialState = { userError: [], postError: [], paramError: [], sectionError: []};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        paramError: [],
        userError: [],
        sectionError: []
      }
    case GET_PARAM_ERRORS:
      return {
        paramError: action.payload,
        userError: [],
        postError: [],
        sectionError: []
      }
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: [],
        paramError: [],
        sectionError: []
      }
    case GET_SECTION_ERRORS:
      return {
        sectionError: action.payload,
        postError: [],
        paramError: [],
        userError: []
      }
  default: 
      return state;
  }
}