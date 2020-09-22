import { combineReducers } from 'redux';
import userSignUpReducer from './userSignUpReducer';
import loginReducer from './loginReducer';
import getUserProfileReducer from './getUserProfileReducer';
import updateUserProfileReducer from './updateUserProfileReducer';

var rootReducer = combineReducers( {
    userSignUpReducer: userSignUpReducer,
    loginReducer: loginReducer,
    getUserProfileReducer: getUserProfileReducer,
    updateUserProfileReducer: updateUserProfileReducer

} )
export default rootReducer