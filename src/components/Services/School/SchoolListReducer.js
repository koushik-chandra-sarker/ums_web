import {SCHOOL_LIST_ERROR,SCHOOL_LIST_LOADING,SCHOOL_LIST_SUCCESS} from "./SchoolTypes";


const initialState ={
    loading:false,
    data:[],
    error:""
}

const SchoolListReducer = (state = initialState, action) => {
    switch (action.type) {
        case SCHOOL_LIST_LOADING:
            return {
                ...state,
                loading: true
            };
        case SCHOOL_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case SCHOOL_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get School"
            };
        default:
            return state;
    }
}

export default SchoolListReducer;