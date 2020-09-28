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
import {addProgramme} from "../Services/Programme/ProgrammeAction";
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
const AddLecturerForm = (props) => {
    const classes = useStyles();
    const schoolList = useSelector(store => store.SchoolList.data)
    const lecturerList = useSelector(store => store.lecturerList.data)
    const dispatch = useDispatch()
    const [selectedBDate, setSelectedBDate] = React.useState(new Date());
    const [selectedJDate, setSelectedJDate] = React.useState(new Date());
    const [selectedGender, setSelectedGender] = React.useState("Male");
    const [lecturer, setLecturer] = useState(
        {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            initial: '',
            maritalStatus: '',
            religion: '',
            nationality: '',
            title: '',
            gender: selectedGender,
            birthday: selectedBDate.toISOString().split("T")[0],
            joiningDate: selectedBDate.toISOString().split("T")[0],
            officeRoom: '',
            phone: [{phone_no: ''}],
            supervisor: {id: ''},
            school: {id: ''}
        }
    )
    const [selectedSchool, setSelectedSchool] = useState({
        id: ''
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
        setSelectedSchool({...selectedSchool, id: e.target.value})
    }

    function handleSelectedSupervisorChange(e) {
        setSelectedSupervisor({...selectedSchool, id: e.target.value})
    }


    function handleSubmitAction(e) {
        e.preventDefault()
        addLecturer(lecturer, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    toast("Lecturer Added Successful.")
                    dispatch(getSchool(props.schoolId, credential.username, credential.password))
                    dispatch(getCampusList(credential.username, credential.password))
                    setSelectedGender("Male")
                    setSelectedSchool({...selectedSchool, id: ''})
                    setSelectedSupervisor({...selectedSupervisor, id: ''})
                    setLecturer({...lecturer,firstName: '',
                        middleName: '',
                        lastName: '',
                        email: '',
                        initial: '',
                        maritalStatus: '',
                        religion: '',
                        nationality: '',
                        title: '',
                        gender: '',
                        birthday: selectedBDate.toISOString().split("T")[0],
                        joiningDate: selectedBDate.toISOString().split("T")[0],
                        officeRoom: '',
                        phone: [{phone_no: ''}],
                        supervisor: {id: ''},
                        school: {id: ''}})
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
                        Add New Lecturer
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
                                    value={lecturer.firstName}
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
                                    value={lecturer.middleName}
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
                                    value={lecturer.lastName}
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
                                    value={lecturer.email}
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
                                    value={lecturer.officeRoom}
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
                                    value={lecturer.religion}
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
                                    value={lecturer.nationality}
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
                                    value={lecturer.maritalStatus}
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
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Joining Date"
                                        format="yyyy-MM-dd"
                                        value={selectedJDate}
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
                                    value={lecturer.title}
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
                                    value={lecturer.initial}
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
                                    inputStyle={{background: "transparent", width: "100%"}}
                                    buttonStyle={{background: "transparent"}}
                                    value={lecturer.phone[0].phone_no}
                                    onChange={e => setLecturer({...lecturer, phone: [{phone_no: e}]})}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>


                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Select Supervisor</InputLabel>
                        <Select
                            native
                            label="Select Supervisor"
                            value={selectedSupervisor.id}
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
                    </FormControl>


                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Select School</InputLabel>
                        <Select
                            native
                            required
                            value={selectedSchool.id}
                            onChange={(e) => {
                                handleSelectChange(e)
                                setLecturer({...lecturer, school: {id: e.target.value}});
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
                        <Button type={"submit"} variant="outlined" className={classes.formButton}>
                            Add
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Typography>
    );
};

export default AddLecturerForm;