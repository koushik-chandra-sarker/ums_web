
import axios from "axios"
import base_url from "../../api/bootApi";

export const getSchoolList = (username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"SCHOOL_LIST_LOADING"
        })


        const response = await axios.get(`${base_url}/schools`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"SCHOOL_LIST_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"SCHOOL_LIST_ERROR"
        })
    }
};



export const getSchool = (id,username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"SCHOOL_LOADING"
        })


        const response = await axios.get(`${base_url}/schools/${id}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"SCHOOL_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"SCHOOL_ERROR"
        })
    }
};

export const addSchool = (data,username,password)=>{

    return axios.post(`${base_url}/schools/add`,data,
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

export const dropSchool = (id,username,password)=>{

    return axios.delete(`${base_url}/schools/delete/${id}`,
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

export const updateSchool = (data,username,password)=>{

    return axios.put(`${base_url}/schools/update`,data,
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
