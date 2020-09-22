import axios from 'axios';
import BACKEND_URL from '../config'

const SIGNUP_SUCCESS = "user_signup_success";
const SIGNUP_FAILED = "user_signup_failed";

var success = ( response, data ) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var error = ( err, data ) => {
    return {
        type: SIGNUP_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}


var userSignUpAction = ( data ) => ( dispatch ) => {
    console.log( "Inside user signup action", data )
    axios
        .post( BACKEND_URL + '/users/signup', data )
        .then( ( response ) => {
            if ( response.status === 200 ) {
                dispatch(
                    success( response, data )
                )
            }

        } )
        .catch( ( err ) => {
            dispatch( error( err, data ) )

        } );
}

export default userSignUpAction