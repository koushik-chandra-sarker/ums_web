import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash"
import {dropStudentCourse, fetchStudent, takeStudentCourse} from "../Services/Student/StudentAction";
import swal from 'sweetalert';
import credential from "./Credential";
import {addLecturer_Course, dropLecturer_Course, getLecturer} from "../Services/Lecturer/LecturerAction";


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1, 0),
        boxShadow: "3px 3px 3px #e5e5e5, -3px -3px 5px #ffffff",
        background: "#f5f5f5",
    },
    title: {
        padding: "10px",
        textAlign: "center",
        boxShadow: "0px 5px 10px #e9e9e5",
        fontSize: "16px",
        color: "#3D6CB9",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
    }
}));
const style = {

    height: "100%",
    paper: {
        background: "#f5f5f5",
        height: "100%",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "10px"
    }

}


const data1 = [
    {
        id: 1,
        CourseCode: "ACT1021",
        CourseTitle: "Introduction to Accounting"
    },
    {
        id: 3,
        CourseCode: "CSE1011",
        CourseTitle: "Programming Language I (C)"
    },
    {
        id: 4,
        CourseCode: "CSE1012",
        CourseTitle: "Programming Language I (C) Lab"
    },
    {
        id: 5,
        CourseCode: "CSE1013",
        CourseTitle: "Computer Fundamentals"
    },
    {
        id: 6,
        CourseCode: "CSE1021",
        CourseTitle: "Discrete Mathematics"
    }
]

const data2 = [
    {
        id: 7,
        CourseCode: "CSE1031",
        CourseTitle: "Numerical Methods"
    },
    {
        id: 8,
        CourseCode: "CSE1033",
        CourseTitle: "Data Structure"
    }
]

const LecCourseTransferList = () => {
    const dispatch = useDispatch();
    const courseList = useSelector(store => store.courseList.data);
    const lecturer = useSelector(store => store.lecturer.data);
    const [data_1, setData_1] = useState([]);
    const [data_2, setData_2] = useState([]);
    useEffect(() => {
        if (!_.isEmpty(lecturer)) {
            setData_1(prevState => lecturer.lecturer_courses)
            setData_2(prevState => courseList)
        }
    })

    const classes = useStyles();

    const [RegChecked, setRegChecked] = React.useState([]);
    const handleRegCourseToggle = (value) => () => {
        const currentIndex = RegChecked.indexOf(value);
        const newChecked = [...RegChecked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setRegChecked(newChecked);
    };


    const [ALlCourseChecked, setALlCourseChecked] = React.useState([]);
    const handleAllCourseToggle = (value) => () => {
        const currentIndex = ALlCourseChecked.indexOf(value);
        const newChecked = [...ALlCourseChecked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setALlCourseChecked(newChecked);
    };

    function dropCourse() {

        RegChecked.map(value => {
            dropLecturer_Course(value, credential.username, credential.password)
                .then(value1 => {
                        if (value1 === 200) {
                            dispatch(getLecturer(lecturer.id, credential.username, credential.password))
                            const currentIndex = RegChecked.indexOf(value);
                            const newChecked = [...RegChecked];
                            if (currentIndex === -1) {
                                newChecked.push(value);
                            } else {
                                newChecked.splice(currentIndex, 1);
                            }
                            setRegChecked(newChecked);
                            swal(`Course dropped successful.`)

                        } else {
                            swal(`Something Went Wrong! Try Again.`)
                        }
                    }
                ).catch(reason => swal(reason.message))
        })

    }

    function takeCourse() {

        ALlCourseChecked.map(value => {

            if (data_1.map(v => v.course.code).indexOf(value) !== -1) {
                swal(`${value} has been registered.`)
            } else {
                const data = {
                    "lecturer": {
                        "id": lecturer.id
                    },
                    "course": {
                        "code": value
                    }
                }
                addLecturer_Course(data, credential.username, credential.password)
                    .then(value1 => {
                        if (value1 === 200) {
                            swal(`Course Added Successful.`)
                            dispatch(getLecturer(lecturer.id, credential.username, credential.password))
                            const currentIndex = ALlCourseChecked.indexOf(value);
                            const newChecked = [...ALlCourseChecked];
                            if (currentIndex === -1) {
                                newChecked.push(value);
                            } else {
                                newChecked.splice(currentIndex, 1);
                            }
                            setALlCourseChecked(newChecked);
                        } else {
                            swal(`Something Went Wrong! Try Again.`)
                        }

                    }).catch(reason => swal(reason.message))
            }

        })

    }

    return (
        <>
            <div style={style}>
                <Grid container spacing={3} justify={"center"} style={{height: "100%"}}>
                    <Grid item md={5}>
                        <Typography component={"div"} style={style.paper}>
                            <Typography className={classes.title} component={"div"}>
                                Registered Courses
                            </Typography>
                            <List>

                                {data_1.map((value, index) => {
                                    const labelId = `checkbox-list-label-${index + 1}`;

                                    return (
                                        <ListItem key={index} dense button onClick={handleRegCourseToggle(value.ssn)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={RegChecked.indexOf(value.ssn) !== -1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId}
                                                          primary={`${value.course.code}`}
                                                          secondary={`${value.course.title}`}
                                            />

                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction={"column"} alignItems={"center"} justify={"center"}
                              style={{height: "100%"}}>
                            <Button

                                size="small"
                                className={classes.button}
                                disabled={RegChecked.length === 0}
                                aria-label="move selected right"
                                onClick={dropCourse}
                            >
                                &gt;
                            </Button>
                            <Button

                                size="small"
                                className={classes.button}
                                disabled={ALlCourseChecked.length === 0}
                                aria-label="move selected left"
                                onClick={takeCourse}
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item md={5}>
                        <Typography component={"div"} style={style.paper}>
                            <Typography className={classes.title} component={"div"}>
                                All Courses
                            </Typography>
                            <List>
                                {/* <ListItem>
                                    <ListItemText style={{paddingLeft: "30px"}} id={1} primary={`Course_code`}/>
                                    <ListItemText style={{paddingLeft: "20px"}} id={2} primary={`Lecturer_initial`}/>
                                </ListItem>*/}
                                {/*<hr style={{color: "#beb3b3"}}/>*/}
                                {data_2.map((value, index) => {
                                    const labelId = `checkbox-list-label-${index + 1}`;

                                    return (
                                        <ListItem key={index} dense button
                                                  onClick={handleAllCourseToggle(value.code ? value.code : value)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={ALlCourseChecked.indexOf(value.code ? value.code : value) !== -1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId}
                                                          primary={`${value.code ? value.code : value}`}
                                                          secondary={`${value.title ? value.title : <></>}`}/>

                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Typography>

                    </Grid>
                </Grid>

            </div>
        </>
    );
};

export default LecCourseTransferList;