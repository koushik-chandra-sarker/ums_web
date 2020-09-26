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
import {getCampus, getCampusList} from "../Services/Campus/CampusAction";
import {EditProgrammeContext} from "./AProgramme";
import {updateProgramme} from "../Services/Programme/ProgrammeAction";
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
        marginBottom: "40px"
    },
    formBox: {
        padding: "0 40px 0 20px"
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditProgrammeDialog = () => {
    const classes = useStyles();
    const openPro = useContext(EditProgrammeContext);
    const dispatch = useDispatch();
    const schoolList = useSelector(store => store.SchoolList.data)

    const handleClose = () => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open: false,
            code: null,
            title: "",
            label: "",
            length: "",
            school: {id: ''},
            campusId: ''
        })
    };


    function handleUpdateProgramme() {
        const programme = {
            code: openPro.editDialog.code,
            title: openPro.editDialog.title,
            label: openPro.editDialog.label,
            length: openPro.editDialog.length,
            school: {id: openPro.editDialog.school.id,}
        }
        updateProgramme(programme, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    openPro.setEditDialog({
                        ...openPro.editDialog,
                        open: false,
                    })
                    toast("Programme successfully updated.")
                    dispatch(getCampus(openPro.editDialog.campusId, credential.username, credential.password))
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
                <Grid container>
                    <Grid item container justify={"flex-end"} alignItems={"center"} style={{position: "relative"}}>
                        <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item container justify={"center"}>
                        <Box className={classes.formBox}>
                            <Typography className={classes.formHeader} component="h6" align="center" variant="h6">
                                Edit Programme
                            </Typography>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Programme code"
                                    variant="outlined"
                                    disabled
                                    required
                                    value={`${openPro.editDialog.code}`}
                                    onChange={(e) => {
                                        openPro.setEditDialog({...openPro.editDialog, code: e.target.value});
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Programme Title"
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
                                    label="Label"
                                    variant="outlined"
                                    value={openPro.editDialog.label}
                                    onChange={(e) => {
                                        openPro.setEditDialog({...openPro.editDialog, label: e.target.value});
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Length(Year)"
                                    variant="outlined"
                                    required
                                    value={openPro.editDialog.length}
                                    onChange={(e) => {
                                        openPro.setEditDialog({...openPro.editDialog, length: e.target.value});
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Select School</InputLabel>
                                <Select
                                    native
                                    value={openPro.editDialog.school.id}
                                    onChange={(e) => {
                                        openPro.setEditDialog({...openPro.editDialog, school: {id: e.target.value}});
                                    }}
                                    label="Select School"

                                >
                                    <option aria-label="None" value=""/>
                                    {
                                        !_.isEmpty(schoolList) ?
                                            schoolList.map(value => {
                                                return (
                                                    <option value={value.id}>{value.name}</option>
                                                )
                                            }) :
                                            <option value={''}>No record found</option>
                                    }

                                </Select>
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <Button variant="outlined" className={classes.formButton}
                                    onClick={
                                        handleUpdateProgramme
                                    }
                                >
                                    Update
                                </Button>
                            </FormControl>

                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
};

export default EditProgrammeDialog;