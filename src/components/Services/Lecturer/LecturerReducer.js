import {FETCH_LECTURER_REQUEST, FETCH_LECTURER_SUCCESS, FETCH_LECTURER_FAILURE} from "./LecturerTypes";


const initialState ={
    lecturer:[],
    error:""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LECTURER_REQUEST:
            return {
                ...state
            };
        case FETCH_LECTURER_SUCCESS:
            return {
                lecturer: action.payload,
                error: ""
            };
        case FETCH_LECTURER_FAILURE:
            return {
                lecturer: [],
                error: action.payload
            };
        default:
            return state;
    }
}

export default reducer;