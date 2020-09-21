import {FETCH_STUDENT_REQUEST, FETCH_STUDENT_SUCCESS, FETCH_STUDENT_FAILURE} from "./StudentTypes";


const initialState ={
    loading:false,
    data: {},
    error:""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            };
        case FETCH_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case FETCH_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default reducer;