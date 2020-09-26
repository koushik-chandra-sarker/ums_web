
import axios from "axios"
import base_url from "../../api/bootApi";

export const getCampusList = (username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"CAMPUS_LIST_LOADING"
        })


        const response = await axios.get(`${base_url}/campuses`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"CAMPUS_LIST_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"CAMPUS_LIST_ERROR"
        })
    }
};
export const getCampus = (id,username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"CAMPUS_LOADING"
        })


        const response = await axios.get(`${base_url}/campuses/${id}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"CAMPUS_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"CAMPUS_ERROR"
        })
    }
};


export const dropCampus = (id,username,password)=>{

    return axios.delete(`${base_url}/campuses/delete/${id}`,
        {
            auth: {
                username: username,
                password: password
            }
        }
    ).then(r => {
        return r.status
    })

}

export const addCampus = (data, username, password)=>{

    return axios.post(`${base_url}/campuses/add`,data,
        {
            auth: {
                username: username,
                password: password
            }
        },
    ).then(r => {
        return r.status
    }).catch(reason => {return reason.message})

}

export const updateCampus = (data, username, password)=>{

    return axios.put(`${base_url}/campuses/update`,data,
        {
            auth: {
                username: username,
                password: password
            }
        },
    ).then(r => {
        return r.status
    }).catch(reason => {return reason.message})

}
