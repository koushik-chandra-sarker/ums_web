import {FETCH_LECTURER_LIST_REQUEST, FETCH_LECTURER_LIST_SUCCESS, FETCH_LECTURER_LIST_FAILURE} from "./LecturerTypes";
import {FETCH_LECTURER_REQUEST, FETCH_LECTURER_SUCCESS, FETCH_LECTURER_FAILURE} from "./LecturerTypes";
import {FETCH_LECTURER_COURSES_REQUEST, FETCH_LECTURER_COURSES_SUCCESS, FETCH_LECTURER_COURSES_FAILURE} from "./LecturerTypes";
import axios from "axios"
import base_url from "../../api/bootApi";


export const getLecturerList = (username,password)=>{
    return dispatch =>{
        dispatch(
            {
                type: FETCH_LECTURER_LIST_REQUEST
            }
        );
        axios.get(`${base_url}/lecturers`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
            )
            .then(response =>{
                dispatch({
                    type: FETCH_LECTURER_LIST_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_LECTURER_LIST_FAILURE,
                    payload:error.message
                })
            })

    }
}


export const getLecturer = (id,username,password)=>{
    return dispatch =>{
        dispatch(
            {
                type: FETCH_LECTURER_REQUEST
            }
        );
        axios.get(`${base_url}/lecturers/${id}`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )
            .then(response =>{
                dispatch({
                    type: FETCH_LECTURER_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_LECTURER_FAILURE,
                    payload:error.message
                })
            })

    }
}


export const addLecturer = (data,username,password)=>{

    return axios.post(`${base_url}/lecturers/add`,data,
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

export const dropLecturer = (id,username,password)=>{

    return axios.delete(`${base_url}/lecturers/delete/${id}`,
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

export const addLecturer_Course = (data,username,password)=>{

    return axios.post(`${base_url}/lecturer_courses/add`,data,
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


export const dropLecturer_Course = (ssn,username,password)=>{

    return axios.delete(`${base_url}/lecturer_courses/delete/${ssn}`,
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



export const updateLecturer = (data,username,password)=>{

    return axios.put(`${base_url}/lecturers/update`,data,
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




export const fetchLecturer_coursesList = (username,password)=>{
    return dispatch =>{
        dispatch(
            {
                type: FETCH_LECTURER_COURSES_REQUEST
            }
        );
        axios.get(`${base_url}/lecturer_courses`,
            {
                auth: {
                    username: username,
                    password: password
                }
            }
        )
            .then(response =>{
                dispatch({
                    type: FETCH_LECTURER_COURSES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: FETCH_LECTURER_COURSES_FAILURE,
                    payload:error.message
                })
            })

    }
}
