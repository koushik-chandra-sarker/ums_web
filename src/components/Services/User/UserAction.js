
import axios from "axios"
import base_url from "../../api/bootApi";

export const getUserList = (username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"USER_LIST_LOADING"
        })


        const response = await axios.get(`${base_url}/users`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"USER_LIST_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"USER_LIST_ERROR"
        })
    }
};
