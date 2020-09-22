import axios from 'axios';
import BACKEND_URL from '../config'
import cookie from "react-cookies";
import profile_picture from '../images/profile.png';


const USER_PROFILE_SUCCESS = "user_profile_success";
const USER_PROFILE_FAILED = "user_profile_failed";

var success = ( response, data, imagePath ) => {
    return {
        type: USER_PROFILE_SUCCESS,
        payload: {
            response: response,
            imagePath: imagePath,
            data: data
        }
    }
}

var error = ( err, data ) => {
    console.log( "err", err )
    return {
        type: USER_PROFILE_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}


var getUserProfileAction = ( data ) => ( dispatch ) => {
    let email = cookie.load( "email" )
    axios.get( BACKEND_URL + '/users/about/' + email ).then( ( response ) => {
        if ( response.status === 200 ) {
            console.log( "got data" )
            let imagePath = BACKEND_URL + "/images/profilepics/" + response.data.profilePicture
            if ( response.data.profilePicture === null ) {
                console.log( "inside imagepath null" )
                imagePath = profile_picture
            }
            dispatch( success( response, data, imagePath ) );
        }


    } ).catch( ( err ) => {
        console.log( " error getting user data" )
        dispatch( error( err, data ) );

    } );
}

export default getUserProfileAction