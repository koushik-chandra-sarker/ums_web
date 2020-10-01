import React, {useContext, useEffect, useState} from 'react';
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
import {getSchool, getSchoolList, updateSchool} from "../Services/School/SchoolAction";
import {getCampusList} from "../Services/Campus/CampusAction";
import credential from "../Common/Credential";
import {updateLecturer} from "../Services/Lecturer/LecturerAction";
import {EditLecturerContext} from "./ALecturer";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import PhoneInput from "react-phone-input-2";
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

const EditLecturerDialog = () => {
    const classes = useStyles();
    const openPro = useContext(EditLecturerContext);
    const schoolList = useSelector(store => store.SchoolList.data)
    const lecturerList = useSelector(store => store.lecturerList.data)
    const lec = useSelector(store => store.lecturer.data)
    const [lecturer,setLecturer] = useState({});
    useEffect(() => {

        setLecturer(prevState => lec)

    },[lec])

    const dispatch = useDispatch();
    const [selectedBDate, setSelectedBDate] = React.useState(new Date());
    const [selectedJDate, setSelectedJDate] = React.useState(new Date());
    const [selectedGender, setSelectedGender] = React.useState("Male");
    const handleClose = () => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open:false,
        })
    };


    const handleChange2 = (event) => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open: false
        });

    };
    const [selectedSchool, setSelectedSchool] = useState({
        id: openPro.editDialog.schoolId
    });
    const [selectedSupervisor, setSelectedSupervisor] = useState({
        id: ''
    });


    const handleBDateChange = (date) => {
        setSelectedBDate(date);
        setLecturer({...lecturer, birthday: date.toISOString().split("T")[0]})
    };
    const handleJDateChange = (date) => {
        setSelectedJDate(date);
        setLecturer({...lecturer, joiningDate: date.toISOString().split("T")[0]})
    };

    function handleSelectChange(e) {
        openPro.setEditDialog({...openPro.editDialog,schoolId: e.target.value})
    }

    function handleSelectedSupervisorChange(e) {
        setSelectedSupervisor({...selectedSchool, id: e.target.value})
    }


    function handleSubmitAction(e) {
        e.preventDefault()
        updateLecturer(lecturer, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    openPro.setEditDialog({
                        ...openPro.editDialog,
                        open: false,
                    })
                    toast("Lecturer successfully updated.")
                    dispatch(getSchoolList(credential.username, credential.password))
                }
                else {
                    swal("Something went wrong! Try again.")
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
                    <Grid item container justify={"flex-end"} alignItems={"center"} style={{position:"absolute"}}>
                        <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item container justify={"center"}>
                        <Box className={classes.formBox}>
                            <form onSubmit={handleSubmitAction} method={"post"}>
                                <Typography className={classes.formHeader} component="h6" align="center" variant="h6">
                                    Add New Lecturer
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Id"
                                                variant="outlined"
                                                name="id"
                                                disabled
                                                value={`${lecturer.id}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, id: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="First name"
                                                variant="outlined"
                                                name="firstName"
                                                required
                                                value={`${lecturer.firstName}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, firstName: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Middle Name"
                                                variant="outlined"
                                                name="middleName"
                                                value={`${lecturer.middleName}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, middleName: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Last name"
                                                variant="outlined"
                                                name="lastName"
                                                required
                                                value={`${lecturer.lastName}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, lastName: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                name="email"
                                                type="email"
                                                value={`${lecturer.email}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, email: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Office room"
                                                variant="outlined"
                                                name="officeRoom"
                                                value={`${lecturer.officeRoom}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, officeRoom: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Religion"
                                                variant="outlined"
                                                name="religion"
                                                value={`${lecturer.religion}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, religion: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Nationality"
                                                variant="outlined"
                                                name="nationality"
                                                required
                                                value={`${lecturer.nationality}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, nationality: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Marital Status"
                                                variant="outlined"
                                                name="maritalStatus"
                                                value={`${lecturer.maritalStatus}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, maritalStatus: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker

                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Birth Date"

                                                    format="yyyy-MM-dd"
                                                    value={lecturer.birthday}
                                                    onChange={handleBDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Joining Date"
                                                    format="yyyy-MM-dd"
                                                    value={lecturer.joiningDate}
                                                    onChange={(e) => {
                                                        handleJDateChange(e)
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Title"
                                                variant="outlined"
                                                name="title"
                                                value={`${lecturer.title}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, title: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Initial"
                                                variant="outlined"
                                                name="initial"
                                                required
                                                value={`${lecturer.initial}`}
                                                onChange={(e) => {
                                                    setLecturer({...lecturer, initial: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <FormLabel component="legend">Gender</FormLabel>
                                            <RadioGroup value={selectedGender} row aria-label="position" name="position"
                                                        defaultValue="top"
                                                        onChange={(e) => {
                                                            setSelectedGender(e.target.value)
                                                            setLecturer({...lecturer, gender: e.target.value});
                                                        }}
                                            >
                                                <FormControlLabel
                                                    value="Male"
                                                    control={<Radio size={"small"} color="primary"/>}
                                                    label="Male"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="Female"
                                                    control={<Radio size={"small"} color="primary"/>}
                                                    label="Female"
                                                    labelPlacement="end"
                                                />
                                                <FormControlLabel
                                                    value="Other"
                                                    control={<Radio size={"small"} color="primary"/>}
                                                    label="Other"
                                                    labelPlacement="end"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <PhoneInput
                                                country={'bd'}
                                                value={!_.isEmpty(lecturer.phone)?lecturer.phone[0].phone_no:''}
                                                inputStyle={{background: "transparent", width: "100%"}}
                                                buttonStyle={{background: "transparent"}}
                                                // value={lecturer.phone[0].phone_no}
                                                onChange={e => setLecturer({...lecturer, phone: [{phone_no: e}]})}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>


                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Supervisor"
                                        variant="outlined"
                                        name="initial"
                                        required
                                        disabled
                                        value={!_.isEmpty(lecturer.supervisor)? lecturer.supervisor.middleName !== null ?
                                            `(${lecturer.supervisor.initial}) ${lecturer.supervisor.firstName} ${lecturer.supervisor.middleName} ${lecturer.supervisor.lastName}`
                                            :
                                            `(${lecturer.supervisor.initial}) ${lecturer.supervisor.firstName} ${lecturer.supervisor.lastName}`:''}
                                    />
                                </FormControl>
                                {/*<FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Select Supervisor</InputLabel>
                                    <Select
                                        native
                                        label="Select Supervisor"
                                        disableUnderline
                                        value={!_.isEmpty(lecturer.supervisor)?lecturer.supervisor.id:''}
                                        onChange={(e) => {
                                            handleSelectedSupervisorChange(e)
                                            setLecturer({...lecturer, supervisor: {id: e.target.value}});
                                        }}
                                    >
                                        <option aria-label="None" value=""/>
                                        {
                                            !_.isEmpty(lecturerList) ?
                                                lecturerList.map(value => {
                                                    return (
                                                        <option value={value.id}>
                                                            {
                                                                value.middleName !== null ?
                                                                    `(${value.initial}) ${value.firstName} ${value.middleName} ${value.lastName}`
                                                                    :
                                                                    `(${value.initial}) ${value.firstName} ${value.lastName}`
                                                            }
                                                        </option>
                                                    )
                                                }) :
                                                <option value={''}>No record found</option>
                                        }

                                    </Select>
                                </FormControl>*/}


                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Select School</InputLabel>
                                    <Select
                                        native
                                        required
                                        value={openPro.editDialog.schoolId}
                                        onChange={(e) => {
                                            handleSelectChange(e)
                                            // setLecturer({...lecturer, school: {id: e.target.value}});
                                        }}
                                        label="Select School"

                                    >
                                        <option aria-label="None" value=""/>
                                        {
                                            !_.isEmpty(schoolList) ?
                                                schoolList.map(value => {
                                                    return (
                                                        <option value={value.id}>{`${value.name}`}</option>
                                                    )
                                                }) :
                                                <option value={''}>No record found</option>
                                        }

                                    </Select>
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Button type={"submit"} variant="outlined" className={classes.formButton}
                                        onMouseEnter={event => setLecturer({...lecturer, school: {id: openPro.editDialog.schoolId}})}
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

export default EditLecturerDialog;