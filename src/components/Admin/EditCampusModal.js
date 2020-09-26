import React, {useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";
import { openEditDialogContext} from "./ACampus";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {getCampusList, updateCampus} from "../Services/Campus/CampusAction";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {useDispatch} from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({


    formHeader: {
        color: "#858484",
        paddingTop: "40px",
        paddingBottom: "40px"

    },
    formControl: {
        margin: "12px"
    },
    formButton: {
        marginTop: "20px",
        color: "#858484",
        "&:hover": {
            background: "#C8C7C7"
        },
        marginBottom:"40px"
    },
    formBox: {
        padding: "0 40px 0 20px"
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditCampusModal = () => {
    const openPro = useContext(openEditDialogContext);
    const dispatch = useDispatch();
    const handleClose = () => {
        openPro.setOpenEditDialog({
            ...openPro.openEditDialog,
            open: false,
            cid: null,
            cName: "",
            cAddress: ""
        })
    };
    const classes = useStyles();
    console.log(openPro)
    const credential = JSON.parse(localStorage.getItem("credential"))

    function handleUpdateCampus() {
        const campus ={
            id: openPro.openEditDialog.cid,
            name:  openPro.openEditDialog.cName,
            address:  openPro.openEditDialog.cAddress
        }
        updateCampus(campus, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    openPro.setOpenEditDialog({
                        ...openPro.openEditDialog,
                        open: false,
                    })
                    toast("Campus successfully updated.")
                    dispatch(getCampusList(credential.username, credential.password))
                }
            })
            .catch(reason => {
                swal(reason.message)
            })
    }

    return (
        <React.Fragment>
            <Dialog
                open={openPro.openEditDialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Grid container >
                    <Grid item container justify={"flex-end"} alignItems={"center"} style={{position:"relative"}}>
                        <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item container justify={"center"}>
                        <Box className={classes.formBox}>
                            <Typography className={classes.formHeader} style={{paddingTop:"0"}} component="h4" align="center" variant="h4">
                                Edit Campus
                            </Typography>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Campus Id"
                                    variant="outlined"
                                    disabled
                                    value={`${openPro.openEditDialog.cid}`}

                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Campus name"
                                    variant="outlined"
                                    value={openPro.openEditDialog.cName}
                                    onChange={(e) => {
                                        openPro.setOpenEditDialog({
                                            ...openPro.openEditDialog,
                                            cName: e.target.value,
                                        })
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Campus address"
                                    variant="outlined"
                                    value={openPro.openEditDialog.cAddress}
                                    onChange={(e) => {
                                        openPro.setOpenEditDialog({
                                            ...openPro.openEditDialog,
                                            cAddress: e.target.value,
                                        })
                                    }}

                                />
                            </FormControl>
                            <Grid container justify={"center"}>
                            <Grid  xs={6} item className={classes.formControl}>
                                <Button fullWidth variant="outlined" className={classes.formButton}
                                        onClick={
                                            handleUpdateCampus
                                        }
                                >
                                    Update
                                </Button>
                            </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
};

export default EditCampusModal;