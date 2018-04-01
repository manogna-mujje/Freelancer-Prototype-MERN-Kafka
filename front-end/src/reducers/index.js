import { combineReducers } from 'redux';
import emailReducer from './reducer_email';
import usernameReducer from './reducer_username';
import passwordReducer from './reducer_password';
import loginReducer from './reducer_login';
import sessionReducer from './reducer_session';
import bidReducer from './reducer_bid';
import projectDetailsReducer from './reducer_project_details';

const rootReducer = combineReducers({
  emailMsg: emailReducer,
  usernameMsg: usernameReducer,
  passwordMsg: passwordReducer,
  loginOutput: loginReducer,
  session: sessionReducer,
  bids: bidReducer,
  details: projectDetailsReducer
});


export default rootReducer;
