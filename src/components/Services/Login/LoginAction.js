// import {LOGIN_ERROR,LOGIN_LOADING,LOGIN_SUCCESS} from "./LoginTypes";
import axios from "axios"
import base_url from "../../api/bootApi";

export const GetUser = (username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"LOGIN_LOADING"
        })


        const response = await axios.get(`${base_url}/users/uname/${username}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"LOGIN_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"LOGIN_ERROR"
        })
    }
};

export const setUser =(data)=> dispatch =>{
    dispatch({
        type:"LOGIN_SUCCESS",
        payload:data
    })
}
