import React, {useContext} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {EditSchoolContext} from "./ASchool";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import {updateSchool} from "../Services/School/SchoolAction";
import {getCampusList} from "../Services/Campus/CampusAction";
import credential from "../Common/Credential";
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

const EditSchoolDialog = () => {
    const classes = useStyles();
    const openPro = useContext(EditSchoolContext);
    const dispatch = useDispatch();
    const campusList = useSelector(store => store.CampusList.data)
    const handleClose = () => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open:false,
            sid:null,
            sName:"",
            campus:{
                id:'',
                name:''
            }
        })
    };

    const handleChange2 = (event) => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            campus: {id: event.target.value}
        });

    };


    function handleUpdateSchool() {
        const school = {
            id: openPro.editDialog.sid,
            name: openPro.editDialog.sName,
            campus: {
                id: openPro.editDialog.campus.id
            }
        }
        updateSchool(school, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    openPro.setEditDialog({
                        ...openPro.editDialog,
                        open: false,
                    })
                    toast("School successfully updated.")
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
                open={openPro.editDialog.open}
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
                                Edit School
                            </Typography>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="School Id"
                                    variant="outlined"
                                    disabled
                                    value={`${openPro.editDialog.sid}`}

                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="School name"
                                    variant="outlined"
                                    value={openPro.editDialog.sName}
                                    onChange={(e) => {
                                        openPro.setEditDialog({
                                            ...openPro.editDialog,
                                            sName: e.target.value,
                                        })
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Select School</InputLabel>
                                <Select
                                    native
                                    value={openPro.editDialog.campus.id}
                                    onChange={handleChange2}
                                    label="Select School"
                                >
                                    {/*<option value={openPro.editDialog.campus.id}>{openPro.editDialog.campus.name}</option>*/}
                                    <option aria-label="None" value=""/>
                                    {
                                        !_.isEmpty(campusList) ?
                                            campusList.map(value => {
                                                return (
                                                    <option value={value.id}>{value.name}</option>
                                                )
                                            }) :
                                            <option value={''}>No record found</option>
                                    }
                                </Select>



                            </FormControl>
                            <Grid container justify={"center"}>
                            <Grid  xs={6} item className={classes.formControl}>
                                <Button fullWidth variant="outlined" className={classes.formButton}
                                        onClick={
                                            handleUpdateSchool
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

export default EditSchoolDialog;