import {SUCCESS} from "./LoginAsTypes";


const initialState ={
    data:{
        open:false
    }
}

const LoginAsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}

export default LoginAsReducer;