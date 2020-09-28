import {USER_ERROR,USER_LOADING,USER_SUCCESS} from "./UserTypes";


const initialState ={
    loading:false,
    data:{},
    error:""
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case USER_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Users"
            };
        default:
            return state;
    }
}

export default UserReducer;