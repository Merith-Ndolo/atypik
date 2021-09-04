import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import errorReducer from './error.reducer';
import allPostsReducer from './posts.reducres';
import bestofReducer from './bestof.reducer';
import paramReducer from './param.reducer';
import sectionReducer from './section.reducer';

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
  allPostsReducer,
  bestofReducer,
  paramReducer,
  sectionReducer
});