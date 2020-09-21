
export const setModalControl = (action, id)=> dispatch =>{

    const data={
        open: action,
        id: id
    }

        dispatch({
            type:"SUCCESS",
            payload:data
        })

}
