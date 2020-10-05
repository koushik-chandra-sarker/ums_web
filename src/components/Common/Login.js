import React, {useState} from 'react';
import {Grid, Typography, Box, Link} from "@material-ui/core";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import logo from "../../Images/seu-logo.png"
import "../../css/login.css"
import {GetUser} from "../Services/Login/LoginAction";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash"
import {setAuth} from "../Services/AuthApi/AuthApiAction";
import LoginAs from "./LoginAs";
import {setLoginAsOpen} from "../Services/LoginAs/LoginAsAction";
import {toast} from "react-toastify";

const Login = () => {

    const user = useSelector(state => state.user.data)
    const user1 = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [u,setU] = useState(false)

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    })





    if (!_.isEmpty(user)) {
        // Cookies.set('user_type', `${user.roles[0].role}`)
        if (user.roles.length > 1) {
            dispatch(setLoginAsOpen(true))
        } else {
            dispatch(setAuth(user.active, user.roles[0].role))
            localStorage.setItem('user_type', user.roles[0].role);
        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('credential', JSON.stringify({username: userInfo.username, password: userInfo.password}));

    }
    const FetchData = () => {
        dispatch(GetUser(userInfo.username, userInfo.password))

    }

    const formHandler = () => {
        FetchData()

    }


    return (
        <>
            <LoginAs/>
            <Grid container className={"login-main"}>
                {/*Left-side*/}
                <Grid className={"login-left"} item xs={12} md={6}>
                    <Box component={"div"} className="login-left-inner">
                        <Typography align={"center"} className="left-logo" component="div">
                            <img src={logo} alt=""/>
                        </Typography>
                        <Box className={"left-title"}>
                            <Typography align={"center"} variant="h1">Welcome to
                                southeast <br/><span>university</span></Typography>
                        </Box>
                    </Box>
                </Grid>


                {/*Right-side*/}
                <Grid className="login-right" item xs={12} md={6}>
                    <Box component={"div"} className="login-right-inner">
                        <Typography align={"center"} component={"div"} className={"right-logo"}
                                    style={{display: "none"}}>
                            <img src={logo} alt=""/>
                        </Typography>
                        <Box className={"right-form"}>
                            <Typography component="h1" align="center" variant="h1">Login</Typography>
                            <Typography component="p" align="center">If you are in SEU.</Typography>
                            <form>
                                <Typography component="div" align="center" className="input">
                                    <MailOutlineIcon className="form-icon"/>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        id="username"
                                        required
                                        onChange={(e) => {
                                            setUserInfo({...userInfo, username: e.target.value});
                                        }}
                                    />
                                </Typography>
                                <Typography component="div" align="center" className="input">
                                    <LockOpenIcon className="form-icon"/>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        id="password"
                                        required
                                        onChange={(e) => {
                                            setUserInfo({...userInfo, password: e.target.value});

                                        }}

                                    />
                                </Typography>
                                <Typography component="div" align="center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            formHandler()
                                        }
                                        }
                                    >Login
                                    </button>

                                    <div id="userD"></div>
                                </Typography>
                                <Typography component="div" align="center" className="forgot-pass">
                                    <Link href="#">Forgotten password?</Link>
                                </Typography>
                            </form>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default/* connect(mapStateToProps, mapDispatchToProps) */Login;
