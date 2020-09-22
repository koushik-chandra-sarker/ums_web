
export const setLoginAsOpen = (open)=> dispatch =>{

    const LoginAsOpen={
        open:open
    }

        dispatch({
            type:"SUCCESS",
            payload:LoginAsOpen
        })

}
