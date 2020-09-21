import React from 'react';
import {Grid, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAuth} from "./components/Services/AuthApi/AuthApiAction";

const useStyles = makeStyles({
    root: {
        background: "coral",
        height: "100vh",
        width: "100vw"
    },
    continueBtn: {
        position: "relative",
        left: "50%",
        top: "50%",
        transform: "translateX(-50%)"
    }
})

const WelcomePage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <>
            <Grid container>
                <Grid xs={12} className={classes.root}>
                    <Link to={"/login"}>
                        <Button variant={"contained"} className={classes.continueBtn}
                            onClick={()=>{
                                dispatch(setAuth(false, ""))
                            }
                            }
                        >
                            Continue
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </>
    );
};

export default WelcomePage;