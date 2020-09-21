import {FETCH_LECTURER_REQUEST, FETCH_LECTURER_SUCCESS, FETCH_LECTURER_FAILURE} from "./LecturerTypes";
import {FETCH_LECTURER_COURSES_REQUEST, FETCH_LECTURER_COURSES_SUCCESS, FETCH_LECTURER_COURSES_FAILURE} from "./LecturerTypes";
import axios from "axios"
import base_url from "../../api/bootApi";


export const fetchLecturer = (username,password)=>{
    return dispatch =>{
        dispatch(
            {
                type: FETCH_LECTURER_REQUEST
            }
        );
        axios.get(`${base_url}/lecturers/${username}`,
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
