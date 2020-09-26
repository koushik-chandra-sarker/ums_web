
import axios from "axios"
import base_url from "../../api/bootApi";

export const getCourseList = (username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"COURSE_LIST_LOADING"
        })


        const response = await axios.get(`${base_url}/courses`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"COURSE_LIST_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"COURSE_LIST_ERROR"
        })
    }
};



export const getCourse = (id,username,password)=> async dispatch =>{

    try{
        dispatch({
            type:"COURSE_LOADING"
        })


        const response = await axios.get(`${base_url}/courses/${id}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )

        dispatch({
            type:"COURSE_SUCCESS",
            payload:response.data
        })
    }catch (e) {
        dispatch({
            type:"COURSE_ERROR"
        })
    }
};

export const addCourse = (data,username,password)=>{

    return axios.post(`${base_url}/courses/add`,data,
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

export const dropCourse = (code,username,password)=>{

    return axios.delete(`${base_url}/courses/delete/${code}`,
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

export const updateCourse = (data,username,password)=>{

    return axios.put(`${base_url}/courses/update`,data,
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
