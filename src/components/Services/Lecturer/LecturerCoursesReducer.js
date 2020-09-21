import {FETCH_LECTURER_COURSES_REQUEST, FETCH_LECTURER_COURSES_SUCCESS, FETCH_LECTURER_COURSES_FAILURE} from "./LecturerTypes";


const initialState ={
    loading:false,
    data:[],
    error:""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LECTURER_COURSES_REQUEST:
            return {
                ...state,
                loading:true
            };
        case FETCH_LECTURER_COURSES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                error: "",
                loading:false
            };
        case FETCH_LECTURER_COURSES_FAILURE:
            return {
                ...state,
                data: [],
                error: action.payload,
                loading:false
            };
        default:
            return state;
    }
}

export default reducer;