import {USER_LIST_ERROR,USER_LIST_LOADING,USER_LIST_SUCCESS} from "./UserTypes";


const initialState ={
    loading:false,
    data:[],
    error:""
}

const UserListReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LIST_LOADING:
            return {
                ...state,
                loading: true
            };
        case USER_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case USER_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Users"
            };
        default:
            return state;
    }
}

export default UserListReducer;