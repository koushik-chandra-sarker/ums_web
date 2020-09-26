import {PROGRAMME_ERROR,PROGRAMME_LOADING,PROGRAMME_SUCCESS} from "./ProgrammeTypes";


const initialState ={
    loading:false,
    data:{},
    error:""
}

const ProgrammeReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROGRAMME_LOADING:
            return {
                ...state,
                loading: true
            };
        case PROGRAMME_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            };
        case PROGRAMME_ERROR:
            return {
                ...state,
                loading: false,
                error:"Unable to get Programme"
            };
        default:
            return state;
    }
}

export default ProgrammeReducer;