let initialState = {
    response: {},
    update: false,
}
var getUserProfileReducer = ( state = initialState, action ) => {
    let newState = { ...state }

    switch ( action.type ) {
        case "user_profile_update_success":
            newState.update = true;
            newState.message = "User Profile Update Successful";
            newState.response = action.payload.response;
            return newState;

        case "user_profile_update_failed":
            newState.update = false;
            newState.message = "Update Failed";
            newState.response = action.payload.response;
            return newState;
        case "user_profile_update_default":
            newState.update = false;
            newState.message = "Default State";
            newState.response = action.payload.response;
        default:
            return newState;


    }
}

export default getUserProfileReducer