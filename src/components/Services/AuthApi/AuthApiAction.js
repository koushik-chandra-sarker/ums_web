
export const setAuth = (action, role)=> dispatch =>{

    const auth={
        isActive: action,
        Role: role
    }

        dispatch({
            type:"AUTH_SUCCESS",
            payload:auth
        })

}
