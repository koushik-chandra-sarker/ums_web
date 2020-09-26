import {CAMPUS_ERROR,CAMPUS_LOADING,CAMPUS_SUCCESS} from "./CampusTypes";


const initialState ={
    loading:false,
    data:{},
    error:""
}

const CampusReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAMPUS_LOADING:
            return {
                ...state,
                loading: true
            };
        case CAMPUS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case CAMPUS_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Campus"
            };
        default:
            return state;
    }
}

export default CampusReducer;