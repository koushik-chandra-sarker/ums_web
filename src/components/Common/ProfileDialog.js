import React, {useContext, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ProfileDialogOpen from "../Context/ProfileDialogOpen";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Grid, Avatar} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import defaultProfilePic from "../../Images/DefaultprofilePic.png"
import {setModalControl} from "../Services/StdModelControl/StdModelControlAction";
import {fetchStudent} from "../Services/Student/StudentAction";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const useStyles = makeStyles({
    root: {
        minWidth: "444px"
    },
    content: {
        width: "100%"
    },
    profilePic: {
        width: "100px",
        height: "100px",
    },
    contentChild: {
        paddingTop: "20px"
    }
})


export default function ProfileDialog(props) {

    const open = useContext(ProfileDialogOpen);
    const user = useSelector(store => store.user.data)
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleClose = () => {
        open.setOpenProfileDialog(false);

    };
    const student = useSelector(store => store.student.data);
    const rowEvent = (id) => {
        dispatch(setModalControl(true,id))
        const credential = JSON.parse(localStorage.getItem("credential"))
        dispatch(fetchStudent(id,credential.username,credential.password))
        open.setOpenProfileDialog(false);
        console.log(props.person)


    }


    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title"
                    open={open.openProfileDialog}>

                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <Typography component={"h4"} variant={"h5"} style={{paddingLeft: "20px"}}>
                                    Id: {props.person.id}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <DialogContent dividers className={classes.content}>
                    <Grid container justify={"center"} direction={"column"} alignItems={"center"}>
                        <Grid item>
                            <Avatar alt="Remy Sharp" src={defaultProfilePic} className={classes.profilePic}/>
                        </Grid>
                        <Grid item>
                            <Typography component={"h4"} style={{padding: "20px 0"}}>
                                Name: {
                                props.person.middleName !== null ?
                                    `${props.person.firstName} ${props.person.middleName} ${props.person.lastName}`
                                    :
                                    `${props.person.firstName} ${props.person.lastName}`
                            }
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Typography component={"h4"}>
                                Email: {props.person.email}
                            </Typography> <br/>
                        </Grid>
                        <Grid item>
                            <Typography component={"h4"}>
                                {/*School: {props.person.school ? props.person.school.name : props.person.programme.school.name}*/}
                            </Typography> <br/>
                        </Grid>
                        <Grid item>
                            <Typography component={"h4"}>
                                Title: {props.person.title}
                            </Typography> <br/>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="secondary" onClick={()=>{rowEvent(props.person.id)}}>
                                View Profile
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Link to={"/logout"} onClick={handleClose}>
                        <Button autoFocus color="primary">
                            Logout
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
}
