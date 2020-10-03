
export const setModalControl = (action, id)=> dispatch =>{

    const data={
        open: action,
        id: id
    }

        dispatch({
            type:"STD_MODAL_SUCCESS",
            payload:data
        })

}
