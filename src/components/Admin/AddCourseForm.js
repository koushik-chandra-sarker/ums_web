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
const AddCourseForm = (props) => {
    const classes = useStyles();
    const programmeList = useSelector(store => store.ProgrammeList.data)
    const dispatch =useDispatch()
    const [course, setCourse] = useState(
        {code: '', title: '', credit: '', programme: {code: ''}}
    )
    const [selectedProgramme, setSelectedProgramme] = useState({
        code: ''
    });


    function handleSelectChange(e) {
        setSelectedProgramme({...selectedProgramme, code: e.target.value})
    }


    function handleAddCourse(e) {
        e.preventDefault()
        if (course.code === "") {
            toast.error("Please fill the course code field")
        }else if (course.title === "") {
            toast.error("Please fill the course title field")
        }else if (course.credit === "") {
            toast.error("Please fill the course credit field")
        }else if (course.programme.code === "") {
            toast.error("Please select a programme")
        } else {
            addCourse(course, credential.username, credential.password)
                .then(r => {
                    if (r === 200) {
                        toast("Course Added Successful.")
                        dispatch(getSchool(props.schoolId, credential.username, credential.password))
                        dispatch(getCampusList(credential.username, credential.password))
                        setSelectedProgramme({
                            ...selectedProgramme, code: ""
                        })
                        setCourse({...course,code: '', title: '', credit: '', programme: {code: ''}})
                    }
                })
                .catch(reason => {
                    swal(reason.message)
                })
        }
    }

    return (
        <Typography component={"div"} className={classes.card} style={{overflow: "scroll",}}>
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
                            required
                            value={course.code}
                            onChange={(e) => {
                                setCourse({...course, code: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="outlined-basic"
                            label="Course Title"
                            variant="outlined"
                            required
                            value={course.title}
                            onChange={(e) => {
                                setCourse({...course, title: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="outlined-basic"
                            label="Credit"
                            variant="outlined"
                            value={course.credit}
                            onChange={(e) => {
                                setCourse({...course, credit: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Select Programme</InputLabel>
                        <Select
                            native
                            value={selectedProgramme.code}
                            onChange={(e) => {
                                handleSelectChange(e)
                                setCourse({...course, programme: {code: e.target.value}});
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
                                handleAddCourse
                            }
                        >
                            Add
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Typography>
    );
};

export default AddCourseForm;