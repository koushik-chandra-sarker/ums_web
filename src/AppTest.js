import React, {useEffect} from 'react';
import {Switch, Route, Redirect,} from "react-router-dom"
import './App.css';
import Login from "./components/Common/Login";
import TMain from "./components/Teacher/TMain";
import {useDispatch, useSelector} from "react-redux";

import Logout from "./components/Common/Logout";
import {setAuth} from "./components/Services/AuthApi/AuthApiAction";
import {setUser} from "./components/Services/Login/LoginAction";
import SMain from "./components/Student/SMain";
import AdminMain from "./components/Admin/AdminMain";


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
    console.log(Auth)


    return (
        <Switch>
            <ProtectedLogin exact path="/login" auth={Auth.isActive} role={Auth.Role}
                            component={Login}/>

            <ProtectedRouteS path="/student" auth={Auth.isActive} role={Auth.Role}
                             component={SMain}/>
            <ProtectedRouteT path="/teacher" auth={Auth.isActive} role={Auth.Role}
                             component={TMain}/>
            <Redirect to={"/teacher/dashboard"}/>

        </Switch>
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
                    : auth && role === "STUDENT" ?
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
                ) : auth && role === "LECTURER" ?
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
