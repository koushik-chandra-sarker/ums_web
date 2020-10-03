import {STD_MODAL_SUCCESS} from "./StdModelControlType";


const initialState ={
    data:{
        open: false,
        id: null
    }
}

const StdModelControlReducer = (state = initialState, action) => {
    switch (action.type) {

        case STD_MODAL_SUCCESS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}

export default StdModelControlReducer;