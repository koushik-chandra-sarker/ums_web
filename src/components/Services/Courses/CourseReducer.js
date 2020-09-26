import {COURSE_ERROR,COURSE_LOADING,COURSE_SUCCESS} from "./CourseTypes";


const initialState ={
    loading:false,
    data:{},
    error:""
}

const CourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case COURSE_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Course"
            };
        default:
            return state;
    }
}

export default CourseReducer;