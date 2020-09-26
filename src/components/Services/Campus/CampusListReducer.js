import {CAMPUS_LIST_ERROR,CAMPUS_LIST_LOADING,CAMPUS_LIST_SUCCESS} from "./CampusTypes";


const initialState ={
    loading:false,
    data:[],
    error:""
}

const CampusListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAMPUS_LIST_LOADING:
            return {
                ...state,
                loading: true
            };
        case CAMPUS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case CAMPUS_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Campus"
            };
        default:
            return state;
    }
}

export default CampusListReducer;