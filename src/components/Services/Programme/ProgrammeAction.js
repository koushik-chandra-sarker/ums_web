
import axios from "axios"
import base_url from "../../api/bootApi";

export const getProgrammeList = (username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"PROGRAMME_LIST_LOADING"
        })


        const response = await axios.get(`${base_url}/programmes`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"PROGRAMME_LIST_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"PROGRAMME_LIST_ERROR"
        })
    }
};



export const addProgramme = (data,username,password)=>{

    return axios.post(`${base_url}/programmes/add`,data,
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


export const dropProgramme = (code,username,password)=>{

    return axios.delete(`${base_url}/programmes/delete/${code}`,
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


export const updateProgramme = (data,username,password)=>{

    return axios.put(`${base_url}/programmes/update`,data,
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
