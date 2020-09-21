import {AUTH_SUCCESS} from "./AuthApiTypes";


const initialState ={
    data:{isActive: null,
        Role: ""}
}

const AuthApiReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}

export default AuthApiReducer;