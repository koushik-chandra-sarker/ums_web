import React from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuth} from "../Services/AuthApi/AuthApiAction";
import {setUser} from "../Services/Login/LoginAction";
import {setLoginAsOpen} from "../Services/LoginAs/LoginAsAction";

const Logout = () => {
    const dispatch = useDispatch()
    dispatch(setAuth(null, ""))
    dispatch(setUser({}))
    dispatch(setLoginAsOpen(false))
    localStorage.clear();


    return <Redirect to={"/login"}/>


};

export default Logout;