import {COURSE_LIST_ERROR,COURSE_LIST_LOADING,COURSE_LIST_SUCCESS} from "./CourseTypes";


const initialState ={
    loading:false,
    data:[],
    error:""
}

const CourseListReducer = (state = initialState, action) => {
    switch (action.type) {
        case COURSE_LIST_LOADING:
            return {
                ...state,
                loading: true
            };
        case COURSE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case COURSE_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Courses"
            };
        default:
            return state;
    }
}

export default CourseListReducer;