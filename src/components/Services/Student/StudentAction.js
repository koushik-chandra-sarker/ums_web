import {
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAILURE,
    FETCH_STUDENT_LIST_REQUEST,
    FETCH_STUDENT_LIST_SUCCESS,
    FETCH_STUDENT_LIST_FAILURE,
    FETCH_STUDENT_COURSE_LIST_FAILURE, FETCH_STUDENT_COURSE_LIST_SUCCESS, FETCH_STUDENT_COURSE_LIST_REQUEST

} from "./StudentTypes";
import axios from "axios"
import base_url from "../../api/bootApi";


export const fetchALLStudent = (username,password)=>{

    return dispatch =>{
        dispatch({
            type: FETCH_STUDENT_LIST_REQUEST
        });
        axios.get(`${base_url}/students`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
            )
            .then(response =>{
                dispatch({
                    type: FETCH_STUDENT_LIST_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_STUDENT_LIST_FAILURE,
                    payload: error.message
                })
            })

    }
}


export const fetchStudent = (id,username,password)=>{

    return dispatch =>{
        dispatch({
            type: FETCH_STUDENT_REQUEST
        });
        axios.get(`${base_url}/students/find/${id}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )
            .then(response =>{
                dispatch({
                    type: FETCH_STUDENT_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_STUDENT_FAILURE,
                    payload: error.message
                })
            })

    }
}



export const addStudent = (data,username,password)=>{

    return axios.post(`${base_url}/students/add`,data,
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

export const updateStudent = (data,username,password)=>{

    return axios.put(`${base_url}/students/update`,data,
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


export const dropStudent = (id,username,password)=>{

    return axios.delete(`${base_url}/students/delete/${id}`,
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



export const dropStudentCourse = (ssn,username,password)=>{

    return axios.delete(`${base_url}/student_courses/delete/${ssn}`,
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
export const takeStudentCourse = (data,username,password)=>{

    return axios.post(`${base_url}/student_courses/add`,data,
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

export const fetchALLStudentCourseByCSsn = (cSsn,username,password)=>{

    return dispatch =>{
        dispatch({
            type: FETCH_STUDENT_COURSE_LIST_REQUEST
        });
        axios.get(`${base_url}/student_courses/course/${cSsn}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )
            .then(response =>{
                dispatch({
                    type: FETCH_STUDENT_COURSE_LIST_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_STUDENT_COURSE_LIST_FAILURE,
                    payload: error.message
                })
            })

    }
}
