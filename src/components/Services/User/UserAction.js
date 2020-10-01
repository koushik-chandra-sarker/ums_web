
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


export const fetchUser = (id,username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"USER_LOADING"
        })


        const response = await axios.get(`${base_url}/users/${id}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"USER_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"USER_ERROR"
        })
    }
};


export const fetchUserBySId = (sid,username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"USER_LOADING"
        })


        const response = await axios.get(`${base_url}/users/sid/${sid}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"USER_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"USER_ERROR"
        })
    }
};
export const fetchUserByLId = (Lid,username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"USER_LOADING"
        })


        const response = await axios.get(`${base_url}/users/lid/${Lid}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"USER_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"USER_ERROR"
        })
    }
};

export const createStdUser = (id,username,password)=>{

    return axios.get(`${base_url}/students/createUser/${id}`,
        {
            auth: {
                username: username,
                password: password
            }
        },
    ).then(r => {
        return r.data
    }).catch(reason => {return reason.message})

}
export const createLecUser = (id,username,password)=>{

    return axios.get(`${base_url}/lecturers/createUser/${id}`,
        {
            auth: {
                username: username,
                password: password
            }
        },
    ).then(r => {
        return r.data
    }).catch(reason => {return reason.message})

}
export const dropUser = (id,username,password)=>{

    return axios.delete(`${base_url}/users/delete/${id}`,
        {
            auth: {
                username: username,
                password: password
            }
        }
    ).then(r => {
        return r.status
    }).catch(reason => {return reason.message})

}
export const updateUser = (data,username,password)=>{

    return axios.put(`${base_url}/users/update`,data,
        {
            auth: {
                username: username,
                password: password
            }
        }
    ).then(r => {
        return r.status
    }).catch(reason => {return reason.message})

}

