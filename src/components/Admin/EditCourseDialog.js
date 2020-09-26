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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import credential from "../Common/Credential";
import {EditCourseContext} from "./ACourse";
import {updateCourse} from "../Services/Courses/CourseAction";
import {getSchool} from "../Services/School/SchoolAction";
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
        marginBottom: "40px"
    },
    formBox: {
        padding: "0 40px 0 20px"
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditCourseDialog = () => {
    const classes = useStyles();
    const openPro = useContext(EditCourseContext);
    const dispatch = useDispatch();
    const programmeList = useSelector(store => store.ProgrammeList.data)
    const handleClose = () => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open: false,
            code: '', title: '', credit: '', programme: {code: ''}
        })
    };

    function handleUpdateCourse(e) {
        e.preventDefault()
        const course = {
            code: openPro.editDialog.code,
            title: openPro.editDialog.title,
            credit: openPro.editDialog.credit,
            programme: {code: openPro.editDialog.programme.code,}
        }
        updateCourse(course, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    openPro.setEditDialog({
                        ...openPro.editDialog,
                        open: false,
                    })
                    toast("Course successfully updated.")
                    dispatch(getSchool(openPro.editDialog.schoolId, credential.username, credential.password))
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
                <Grid container>
                    <Grid item container justify={"flex-end"} alignItems={"center"} style={{position: "relative"}}>
                        <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item container justify={"center"}>
                        <Box className={classes.formBox}>
                            <form>
                                <Typography className={classes.formHeader} component="h6" align="center" variant="h6">
                                    Add New Course
                                </Typography>
                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Course code"
                                        variant="outlined"
                                        disabled
                                        value={openPro.editDialog.code}
                                        onChange={(e) => {
                                            openPro.setEditDialog({...openPro.editDialog, code: e.target.value});
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Course Title"
                                        variant="outlined"
                                        required
                                        value={openPro.editDialog.title}
                                        onChange={(e) => {
                                            openPro.setEditDialog({...openPro.editDialog, title: e.target.value});
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Credit"
                                        variant="outlined"
                                        value={openPro.editDialog.credit}
                                        onChange={(e) => {
                                            openPro.setEditDialog({...openPro.editDialog, credit: e.target.value});
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Select Programme</InputLabel>
                                    <Select
                                        native
                                        value={openPro.editDialog.programme.code}
                                        onChange={(e) => {

                                            openPro.setEditDialog({...openPro.editDialog, programme: {code: e.target.value}});
                                        }}
                                        label="Select Programme"

                                    >
                                        <option aria-label="None" value=""/>
                                        {
                                            !_.isEmpty(programmeList) ?
                                                programmeList.map(value => {
                                                    return (
                                                        <option value={value.code}>{`${value.title} (${value.code})`}</option>
                                                    )
                                                }) :
                                                <option value={''}>No record found</option>
                                        }

                                    </Select>
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Button type={"submit"} variant="outlined" className={classes.formButton}
                                            onClick={
                                                handleUpdateCourse
                                            }
                                    >
                                        Add
                                    </Button>
                                </FormControl>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
};

export default EditCourseDialog;