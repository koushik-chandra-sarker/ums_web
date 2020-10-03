import React, {useEffect} from 'react';
import {Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuth} from "../Services/AuthApi/AuthApiAction";
import {setUser} from "../Services/Login/LoginAction";
import {setLoginAsOpen} from "../Services/LoginAs/LoginAsAction";
import {setModalControl} from "../Services/StdModelControl/StdModelControlAction";

const Logout = () => {
    useEffect(() => {
        window.location.reload();
    },[])
    const dispatch = useDispatch()
    dispatch(setAuth(null, ""))
    dispatch(setUser({}))
    dispatch(setLoginAsOpen(false))
    // dispatch(setModalControl(false,null))
    localStorage.clear();


    return <Redirect to={"/login"}/>


};

export default Logout;