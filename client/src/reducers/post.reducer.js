import {
  DELETE_COMMENT,
  DELETE_ACT,
  DELETE_POST,
  EDIT_COMMENT,
  EDIT_RESERVATION,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
  UPDATE_STATUS,
  UPDATE_CLIENT,
} from "../actions/postAction";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case UPDATE_STATUS: 
      return {
        ...state,
      status: state.postReducer,
      };
    case UPDATE_CLIENT: 
      return {
        ...state,
      clientId: state.postReducer,
      };
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
      });

      case EDIT_RESERVATION:
        return state.map((post) => {
          if (post._id === action.payload.postId) {
            return {
              ...post,
              reservations: post.reservations.map((reservation) => {
                if (reservation._id === action.payload.reservationId) {
                  return {
                    ...reservation,
                    paiement: action.payload.paiement,
                  };
                } else {
                  return reservation;
                }
              }),
            };
          } else return post;
        });
    

    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });

      case DELETE_ACT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            activites: post.activites.filter(
              (act) => act._id !== action.payload.actId
            ),
          };
        } else return post;
      });

    default:
      return state;
  }
}
