import {SUCCESS} from "./StdModelControlType";


const initialState ={
    data:{
        open: false,
        id: null
    }
}

const StdModelControlReducer = (state = initialState, action) => {
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

export default StdModelControlReducer;