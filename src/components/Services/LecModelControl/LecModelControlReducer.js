import {SUCCESS} from "./LecModelControlType";


const initialState ={
    data:{
        open: false,
        id: null
    }
}

const LecModelControlReducer = (state = initialState, action) => {
    switch (action.type) {

        case SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}

export default LecModelControlReducer;