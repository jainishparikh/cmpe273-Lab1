import axios from 'axios';
import BACKEND_URL from '../config'
import cookie from "react-cookies";

const USER_LOGIN_SUCCESS = "user_login_success";
const USER_LOGIN_FAILED = "user_login_failed";

var success = ( response, data ) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var error = ( err, data ) => {
    return {
        type: USER_LOGIN_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}


var loginAction = ( data ) => ( dispatch ) => {
    // console.log( "Inside user signup action", data )
    var backend_path = '';
    if ( data.type === 'users' ) {
        backend_path = '/users/login'
    } else if ( data.type === 'restaurants' ) {
        backend_path = '/restaurants/login'
    }
    console.log( BACKEND_URL + backend_path )
    axios
        .post( BACKEND_URL + backend_path, data )
        .then( ( response ) => {
            if ( response.status === 200 ) {
                cookie.save( "auth", true, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "id", response.data.id, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "name", response.data.name, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "email", response.data.email, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                cookie.save( "type", data.type, {
                    path: '/',
                    httpOnly: false,
                    maxAge: 90000
                } )
                dispatch( success( response, data ) );
            }
        } )
        .catch( ( err ) => {
            dispatch( error( err, data ) );

        } );
}

export default loginAction