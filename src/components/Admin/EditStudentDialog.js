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
import {EditStudentContext} from "./AStudent";
import {updateStudent} from "../Services/Student/StudentAction";

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
const bloodGroup = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditStudentDialog = () => {
    const classes = useStyles();
    const openPro = useContext(EditStudentContext);
    const programmeList = useSelector(store => store.ProgrammeList.data)
    const std = useSelector(store => store.student.data)
    const [student, setStudent] = useState({});
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('')
    const [SelectedProgramme, setSelectedProgramme] = useState({
        code: openPro.editDialog.programmeCode
    });
    useEffect(() => {

        setStudent(prevState => std)

    }, [std])

    const dispatch = useDispatch();
    const [selectedBDate, setSelectedBDate] = React.useState(new Date());
    const [selectedGender, setSelectedGender] = React.useState("Male");
    const handleClose = () => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open: false,
        })
    };


    const handleChange2 = (event) => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open: false
        });

    };


    const handleBDateChange = (date) => {
        setStudent({...student, birthday: date.toISOString().split("T")[0]})
    };

    function handleSelectChange(e) {
        openPro.setEditDialog({...openPro.editDialog, schoolId: e.target.value})
    }


    function handleSubmitAction(e) {
        e.preventDefault()
        updateStudent(student, credential.username, credential.password)
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
                <Grid container>
                    <Grid item container justify={"flex-end"} alignItems={"center"} style={{position: "absolute"}}>
                        <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item container justify={"center"}>
                        <Box className={classes.formBox}>
                            <form onSubmit={handleSubmitAction} method="post">
                                <Typography className={classes.formHeader} component="h6" align="center" variant="h6">
                                    Add New Student
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="First name"
                                                variant="outlined"
                                                name="firstName"
                                                required
                                                value={`${student.firstName}`}
                                                onChange={(e) => {
                                                    setStudent({...student, firstName: e.target.value});
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
                                                value={`${student.middleName}`}
                                                onChange={(e) => {
                                                    setStudent({...student, middleName: e.target.value});
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
                                                value={`${student.lastName}`}
                                                onChange={(e) => {
                                                    setStudent({...student, lastName: e.target.value});
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
                                                value={`${student.email}`}
                                                onChange={(e) => {
                                                    setStudent({...student, email: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Enrolled year"
                                                variant="outlined"
                                                name="yearEnrolled"
                                                type="number"
                                                value={`${student.yearEnrolled}`}
                                                onChange={(e) => {
                                                    setStudent({...student, yearEnrolled: e.target.value});
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
                                                value={`${student.religion}`}
                                                onChange={(e) => {
                                                    setStudent({...student, religion: e.target.value});
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
                                                value={`${student.nationality}`}
                                                onChange={(e) => {
                                                    setStudent({...student, nationality: e.target.value});
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
                                                value={`${student.maritalStatus}`}
                                                onChange={(e) => {
                                                    setStudent({...student, maritalStatus: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Title"
                                                variant="outlined"
                                                name="title"
                                                value={`${student.title}`}
                                                onChange={(e) => {
                                                    setStudent({...student, title: e.target.value});
                                                }}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Blood Group</InputLabel>
                                            <Select
                                                native
                                                value={`${student.bloodGroup}`}
                                                onChange={(e) => {
                                                    // setSelectedBloodGroup(e.target.value);
                                                    setStudent({...student, bloodGroup: e.target.value})
                                                }}
                                                label="Blood Group"
                                            >
                                                <option aria-label="None" value=""/>
                                                {
                                                    bloodGroup.map(value => {
                                                        return (
                                                            <option
                                                                value={value}>{value}</option>
                                                        )
                                                    })
                                                }

                                            </Select>

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth className={classes.formControl}
                                                     style={{marginTop: "-12px"}}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker

                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Birth Date"

                                                    format="yyyy-MM-dd"
                                                    value={student.birthday}
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
                                            <FormLabel component="legend">Gender</FormLabel>
                                            <RadioGroup value={`${student.gender}`} row aria-label="position"
                                                        name="position"
                                                        defaultValue="top"
                                                        onChange={(e) => {
                                                            // setSelectedGender(e.target.value)
                                                            setStudent({...student, gender: e.target.value});
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
                                                inputStyle={{background: "transparent", width: "100%"}}
                                                buttonStyle={{background: "transparent"}}
                                                value={!_.isEmpty(student.phone) ? student.phone[0].phone_no : ''}
                                                onChange={e => setStudent({...student, phone: [{phone_no: e}]})}
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                            <InputLabel htmlFor="outlined-age-native-simple">Select
                                                Programme</InputLabel>
                                            <Select
                                                native
                                                value={SelectedProgramme.code}
                                                onChange={(e) => {
                                                    setSelectedProgramme({...SelectedProgramme, code: e.target.value});
                                                }}
                                                label="Select Programme"
                                            >
                                                <option aria-label="None" value=""/>
                                                {
                                                    !_.isEmpty(programmeList) ?
                                                        programmeList.map(value => {
                                                            return (
                                                                <option
                                                                    value={value.code}>{`${value.title} (${value.code})`}</option>
                                                            )
                                                        }) :
                                                        <option value={''}>No record found</option>
                                                }

                                            </Select>

                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Button type={"submit"} variant="outlined" className={classes.formButton}
                                            onMouseEnter={()=>{
                                                setStudent({...student, programme: {code: SelectedProgramme.code}})
                                            }}
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

export default EditStudentDialog;