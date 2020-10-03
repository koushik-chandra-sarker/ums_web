
export const setLecModalControl = (action, id)=> dispatch =>{

    const data={
        open: action,
        id: id
    }

        dispatch({
            type:"LEC_MODAL_SUCCESS",
            payload:data
        })

}
