import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Avatar from "@material-ui/core/Avatar";
import defaultProfilePic from "../../Images/DefaultprofilePic.png"
import Paper from "@material-ui/core/Paper";
import {Container, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TransferList from "../TransferList";
import StdProfile from "../Student/stdProfile";
import {useDispatch, useSelector} from "react-redux";
import {setModalControl} from "../Services/StdModelControl/StdModelControlAction";
import _ from "lodash"

const useStyles = makeStyles((theme) => ({


    dialog: {
        background: "#F1F0F0",
        width: "100%",
        height: "100%",
        overflow:"scroll"
    },
    title: {
        color: "#3d6cb9",
        margin: '20px 0',
        fontWeight: "bold",
        letterSpacing: "5px",
        wordSpacing: "8px",
    },

    closeIcon: {
        color: "#efe3e5",
        background: "#f5587b",
        marginTop: "10px",
        position: "fixed",
        top: 0,
        right: "20px",
        "&:hover": {
            background: "#ff304f",
        }
    },
    stdInfo: {
        background: "transparent", display: "flex", alignItems: "center", flexDirection: "column",
        borderRadius: "10px",
        boxShadow: "inset 5px 5px 10px #e9e9e5, inset -5px -5px 10px #ffffff",
        textAlign: "center",
        paddingBottom: "40px"

    },
    pro_pic: {
        width: "120px",
        height: "120px",
        margin: "40px 0",
        "& div": {
            height: "100%",
            width: "100%",
        }

    },
    stdDetails: {
        "& h4": {
            lineHeight: "35px",
            fontSize: "16px",
            "& span": {
                fontWeight: "bold",
            }
        }
    },
    courses: {
        background: "transparent",
        borderRadius: "10px",
        boxShadow: "inset 5px 5px 10px #e9e9e5, inset -5px -5px 10px #ffffff",
        height: "calc( 100vh - 140px)",
        margin: 0,
        padding:"40px 0 20px 0"

    },


}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StdModal = /*forwardRef((props, ref)*/ () => {
    useEffect(() => {
        userType==="STUDENT"? setViewProfile(true):setViewProfile(false)
    },[])
    const userType = localStorage.getItem("user_type")
    const crlModal = useSelector(store => store.stdModalControl.data)
    const student = useSelector(store => store.student.data);
    const classes = useStyles();
    const open = crlModal.open;
    const [viewProfile,setViewProfile] = useState(false)
    const dispatch = useDispatch();

   /* useImperativeHandle(ref, () => ({
        handleClickOpen
    }));*/
   /* const handleClickOpen = () => {
        dispatch(setModalControl(true,null))
    };*/

    const handleClose = () => {
        dispatch(setModalControl(false,null))

    };
    return (
        <div>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <Paper className={classes.dialog}>
                    <Container maxWidth={"xl"}>

                        <Grid item xs={12} justify={"center"}>
                            <Typography className={classes.title} component={"h4"} variant={"h4"} align={"center"}>
                                Student Details
                            </Typography>
                            <IconButton className={classes.closeIcon} edge="start" color="inherit"
                                        onClick={()=> {
                                            handleClose()
                                        }}
                                        aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3} >
                                <Grid container className={classes.stdInfo}>
                                    <Typography component={"div"} className={classes.pro_pic}>
                                        <Avatar alt="Remy Sharp" src={defaultProfilePic}/>
                                    </Typography>
                                    <Typography component={"div"} className={classes.stdDetails}>
                                        <Typography component={"h4"}> <span>ID: </span>{student.id}</Typography>
                                        <Typography component={"h4"}> <span>Name: </span>
                                            {
                                                student.middleName!== null ?
                                                    `${student.firstName} ${student.middleName} ${student.lastName}`
                                                    :
                                                    `${student.firstName} ${student.lastName}`
                                            }
                                        </Typography>
                                        <Typography component={"h4"}>
                                            <span>Email: </span>
                                            {student.email}
                                        </Typography>
                                        <Typography component={"h4"}> <span>Phone: </span>
                                            {
                                                !_.isEmpty(student)?
                                                student.phone.map((v)=>{
                                                    return(
                                                        <>
                                                            {v.phone_no} <span> </span>
                                                        </>
                                                    )
                                                })
                                                    : <></>
                                            }
                                        </Typography>
                                        {/*<Typography component={"h4"}>
                                            <span>Programme: </span>
                                            {
                                                !_.isEmpty(student)?
                                                    student.programme.title
                                                    :<></>
                                            }
                                        </Typography>*/}
                                    </Typography>
                                    <br/>
                                    {
                                        userType !== "STUDENT"?
                                            <>
                                                <Button variant="outlined" color="secondary" onClick={()=>{viewProfile?setViewProfile(false):setViewProfile(true)}}>
                                                    {viewProfile?  <>Show Course info</> : <>View Profile</>}
                                                </Button>
                                            </>
                                            :<></>
                                    }

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={9} style={{paddingRight:"30px"}}>
                                <Typography  className={classes.courses}>
                                    {
                                        userType !== "STUDENT" ?
                                            viewProfile ? <StdProfile/> : <TransferList/>
                                            : <StdProfile/>
                                    }
                                </Typography>

                            </Grid>
                        </Grid>
                    </Container>

                </Paper>
            </Dialog>
        </div>
    );
};

export default StdModal;