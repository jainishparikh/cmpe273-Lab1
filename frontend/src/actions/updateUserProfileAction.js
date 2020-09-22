import axios from 'axios';
import BACKEND_URL from '../config'
import cookie from "react-cookies";


const USER_PROFILE_UPDATE_SUCCESS = "user_profile_update_success";
const USER_PROFILE_UPDATE_FAILED = "user_profile_update_failed";
const USER_PROFILE_UPDATE_DEFAULT = "user_profile_update_default"
var success = ( response, data ) => {
    return {
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var error = ( err, data ) => {
    console.log( "err", err )
    return {
        type: USER_PROFILE_UPDATE_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}

var def = () => {
    return {
        type: USER_PROFILE_UPDATE_DEFAULT,
        payload: {
            response: {},
            data: {}
        }
    }
}


var updateUserProfileAction = ( data ) => ( dispatch ) => {
    if ( data ) {
        axios
            .put( BACKEND_URL + "/users/about", data ).then( response => {
                if ( response.status === 200 ) {

                    if ( cookie.load( 'email' ) !== data.email ) {
                        cookie.remove( "email", {
                            path: '/'
                        } );
                        cookie.save( "email", data.email, {
                            path: '/',
                            httpOnly: false,
                            maxAge: 90000
                        } )
                    }
                    if ( cookie.load( 'name' ) !== data.name ) {
                        cookie.remove( "name", {
                            path: '/'
                        } );
                        cookie.save( "name", data.name, {
                            path: '/',
                            httpOnly: false,
                            maxAge: 90000
                        } )
                    }
                    dispatch( success( response, data ) )
                }

            } ).catch( err => {
                dispatch( error( err, data ) )
            } )
    } else {
        dispatch( def() )
    }
}

export default updateUserProfileAction