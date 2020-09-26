import {SCHOOL_ERROR,SCHOOL_LOADING,SCHOOL_SUCCESS} from "./SchoolTypes";


const initialState ={
    loading:false,
    data:{},
    error:""
}

const SchoolReducer = (state = initialState, action) => {
    switch (action.type) {
        case SCHOOL_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SCHOOL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case SCHOOL_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get School"
            };
        default:
            return state;
    }
}

export default SchoolReducer;