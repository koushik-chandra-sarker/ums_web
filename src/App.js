import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect,} from "react-router-dom"
import './App.css';
import Login from "./components/Common/Login";
import TMain from "./components/Teacher/TMain";
import {useDispatch, useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import Logout from "./components/Common/Logout";
import {setAuth} from "./components/Services/AuthApi/AuthApiAction";
import {setUser} from "./components/Services/Login/LoginAction";
import SMain from "./components/Student/SMain";
import AdminMain from "./components/Admin/AdminMain";
import {ToastContainer} from "react-toastify";
import LecModal from "./components/Common/LecModal";
import StdModal from "./components/Common/StdModal";


function App() {

    const dispatch = useDispatch();
    const readCookie = () => {
        // const userCookie = Cookies.get("user_type")
        const user_type = localStorage.getItem("user_type");
        if (user_type) {
            dispatch(setAuth(true, user_type))
            dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
        }
    }
    useEffect(() => {
        readCookie()
    }, [])

    return (
        <>
            <ToastContainer/>
            <Routes/>
            <Switch>
                {/*<Route exact path={"/"} component={WelcomePage}/>*/}
                <Route exact path={"/logout"} component={Logout}/>
            </Switch>

        </>

    );
}


const CheckRoute = (Auth) => {

    if (Auth.isActive === false) {
        return (
            <ProtectedLogin exact path="/login" auth={Auth.isActive} role={Auth.Role}
                            component={Login}/>
        )
    }
    if (Auth.isActive && Auth.Role === "ADMIN") {
        return (
            <>
                <ProtectedRouteS path="/admin" auth={Auth.isActive} role={Auth.Role}
                                 component={AdminMain}/>
                <Redirect to={"/admin/dashboard"}/>
            </>
        )
    }
    if (Auth.isActive && Auth.Role === "LECTURER") {
        return (
            <>
                <ProtectedRouteT path="/teacher" auth={Auth.isActive} role={Auth.Role}
                                 component={TMain}/>
                <Redirect to={"/teacher/dashboard"}/>
            </>
        )
    }
    if (Auth.isActive && Auth.Role === "STUDENT") {
        return (
            <>
                <ProtectedRouteS path="/student" auth={Auth.isActive} role={Auth.Role}
                                 component={SMain}/>
                <Redirect to={"/student/dashboard"}/>
            </>
        )
    }


}
const Routes = () => {
    const Auth = useSelector(state => state.auth.data)
    return (
        <Switch>
            <ProtectedLogin exact path="/login" auth={Auth.isActive} role={Auth.Role}
                            component={Login}/>

            <ProtectedRouteS path="/student" auth={Auth.isActive} role={Auth.Role}
                             component={SMain}/>
            <ProtectedRouteA path="/admin" auth={Auth.isActive} role={Auth.Role}
                             component={AdminMain}/>
            <ProtectedRouteT path="/teacher" auth={Auth.isActive} role={Auth.Role}
                             component={TMain}/>
            <Redirect to={"/teacher/dashboard"}/>

        </Switch>
    )
}
const ProtectedRouteA = ({auth, role, component: Component, ...rest}) => {
    const Auth = useSelector(state => state.auth.data)
    return (
        <Route
            {...rest}
            render={() =>
                auth && role === "ADMIN" ? (
                        <Component/>
                    )
                    : auth && (role === "STUDENT" || role==="LECTURER") ?
                    (
                        // <Redirect to={"/student"}/>
                        CheckRoute(Auth)

                    )

                    :
                    (
                        <Redirect to={"/login"}/>
                    )
            }
        />
    )
}
const ProtectedRouteT = ({auth, role, component: Component, ...rest}) => {
    const Auth = useSelector(state => state.auth.data)
    return (
        <Route
            {...rest}
            render={() =>
                auth && role === "LECTURER" ? (
                        <Component/>
                    )
                    : auth && (role === "STUDENT" || role === "ADMIN")?
                    (
                        // <Redirect to={"/student"}/>
                        CheckRoute(Auth)

                    )

                    :
                    (
                        <Redirect to={"/login"}/>
                    )
            }
        />
    )
}

const ProtectedRouteS = ({auth, role, component: Component, ...rest}) => {
    const Auth = useSelector(state => state.auth.data)
    return (
        <Route
            {...rest}
            render={() =>
                auth && role === "STUDENT" ? (
                    <Component/>
                ) : auth && (role === "LECTURER" || role === "ADMIN") ?
                    (
                        // <Redirect to={"/teacher"}/>
                        CheckRoute(Auth)
                    )
                    :
                    (
                        <Redirect to={"/login"}/>
                    )
            }
        />
    )
}


const ProtectedLogin = ({auth, role, component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={() =>
                !auth ? (
                        <Component/>
                    ) :
                    (
                        <Redirect to={"/"}/>
                    )
            }
        />
    )
}



export default App;
