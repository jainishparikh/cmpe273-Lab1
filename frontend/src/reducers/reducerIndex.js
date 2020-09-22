import { combineReducers } from 'redux';
import userSignUpReducer from './userSignUpReducer';
import loginReducer from './loginReducer';

var rootReducer = combineReducers( {
    userSignUpReducer: userSignUpReducer,
    loginReducer: loginReducer,
} )
export default rootReducer