import {LOGIN_ERROR,LOGIN_LOADING,LOGIN_SUCCESS} from "./LoginTypes";


const initialState ={
    loading:false,
    data:{},
    errorMsg:""
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                errorMsg: ""
            };
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                errorMsg:"Unable to get User"
            };
        default:
            return state;
    }
}

export default LoginReducer;