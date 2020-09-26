import {PROGRAMME_LIST_ERROR,PROGRAMME_LIST_LOADING,PROGRAMME_LIST_SUCCESS} from "./ProgrammeTypes";


const initialState ={
    loading:false,
    data:[],
    error:""
}

const ProgrammeListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROGRAMME_LIST_LOADING:
            return {
                ...state,
                loading: true
            };
        case PROGRAMME_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case PROGRAMME_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Programme"
            };
        default:
            return state;
    }
}

export default ProgrammeListReducer;