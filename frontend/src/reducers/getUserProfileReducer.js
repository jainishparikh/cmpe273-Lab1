let initialState = {
    userData: {},
    profileImagePath: ""

}
var getUserProfileReducer = ( state = initialState, action ) => {
    let newState = { ...state }

    switch ( action.type ) {
        case "user_profile_success":
            newState.userData = action.payload.response.data;
            newState.profileImagePath = action.payload.imagePath;
            return newState;

        case "user_profile_failed":
            newState.error = true;
            newState.message = "Could Not get profile!"
            return newState;
        default:
            return newState;


    }
}

export default getUserProfileReducer