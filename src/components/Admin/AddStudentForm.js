import React, {useState} from 'react';
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {addProgramme, getProgramme} from "../Services/Programme/ProgrammeAction";
import credential from "../Common/Credential";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {getCampus, getCampusList} from "../Services/Campus/CampusAction";
import {addCourse} from "../Services/Courses/CourseAction";
import {getSchool} from "../Services/School/SchoolAction";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker, KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import {addLecturer} from "../Services/Lecturer/LecturerAction";
import {addStudent} from "../Services/Student/StudentAction";


const bloodGroup = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+']


const useStyles = makeStyles((theme) => ({

    card: {
        background: "#f5f5f5",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "8px",
        height: "calc(100vh - 250px)",
        padding: "20px",
        overflow: "hidden"

    },

    formHeader: {
        color: "#858484",
        // paddingTop: "10px",
        paddingBottom: "10px"

    },
    formControl: {
        margin: "8px",
    },
    formButton: {
        marginTop: "15px",
        color: "#858484",
        "&:hover": {
            background: "#C8C7C7"
        }
    },
    formBox: {
        padding: "0 20px 0 0"
    }

}))
const AddStudentForm = (props) => {
    const classes = useStyles();
    const programmeList = useSelector(store => store.ProgrammeList.data)
    const dispatch = useDispatch()
    const [selectedBDate, setSelectedBDate] = React.useState(new Date());
    const [selectedGender, setSelectedGender] = React.useState("Male");
    const [student, setStudent] = useState(
        {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            yearEnrolled: '',
            maritalStatus: '',
            bloodGroup: '',
            religion: '',
            nationality: '',
            title: '',
            gender: selectedGender,
            birthday: selectedBDate.toISOString().split("T")[0],
            phone: [{phone_no: ''}],
            programme: {code: ''}

        }
    )
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('')
    const [SelectedProgramme, setSelectedProgramme] = useState({
        code: ''
    });


    const handleBDateChange = (date) => {
        setSelectedBDate(date);
        setStudent({...student, birthday: date.toISOString().split("T")[0]})
    };


    function handleSubmitAction(e) {
        e.preventDefault()

        addStudent(student, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    toast("Lecturer Added Successful.")
                    dispatch(getProgramme(SelectedProgramme.code, credential.username, credential.password))
                    setSelectedGender("Male")
                    setSelectedBloodGroup('')
                    setSelectedProgramme({...SelectedProgramme,code:""})
                    setSelectedBDate(new Date())
                    setStudent({...student,
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        email: '',
                        yearEnrolled: '',
                        maritalStatus: '',
                        bloodGroup: '',
                        religion: '',
                        nationality: '',
                        title: '',
                        gender: 'Male',
                        birthday: selectedBDate.toISOString().split("T")[0],
                        phone: [{phone_no: ''}],
                        programme: {code: ''}
                })
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
        <Typography component={"div"} className={classes.card} style={{overflow: "scroll",}}>
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
                                    value={student.firstName}
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
                                    value={student.middleName}
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
                                    value={student.lastName}
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
                                    value={student.email}
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
                                    value={student.yearEnrolled}
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
                                    value={student.religion}
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
                                    value={student.nationality}
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
                                    value={student.maritalStatus}
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
                                    value={student.title}
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
                                    value={selectedBloodGroup}
                                    onChange={(e) => {
                                        setSelectedBloodGroup(e.target.value);
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
                            <FormControl fullWidth className={classes.formControl} style={{marginTop:"-12px"}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker

                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Birth Date"

                                        format="yyyy-MM-dd"
                                        value={selectedBDate}
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
                                <RadioGroup value={selectedGender} row aria-label="position" name="position"
                                            defaultValue="top"
                                            onChange={(e) => {
                                                setSelectedGender(e.target.value)
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
                                    value={student.phone[0].phone_no}
                                    onChange={e => setStudent({...student, phone: [{phone_no: e}]})}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Select Programme</InputLabel>
                                <Select
                                    native
                                    value={SelectedProgramme.code}
                                    onChange={(e) => {
                                        setSelectedProgramme({...SelectedProgramme, code: e.target.value});
                                        setStudent({...student, programme: {code: e.target.value}})
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
                        <Button type={"submit"} variant="outlined" className={classes.formButton}>
                            Add
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Typography>
    );
};

export default AddStudentForm;