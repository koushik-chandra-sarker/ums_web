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
import {dropStudentCourse, fetchStudent, takeStudentCourse} from "./Services/Student/StudentAction";
import swal from 'sweetalert';


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

const TransferList = () => {
    const dispatch = useDispatch();
    const lecturer_courseList = useSelector(store => store.lecturer_courseList.data);
    const student = useSelector(store => store.student.data);
    const [data_1, setData_1] = useState([]);
    const [data_2, setData_2] = useState([]);
    useEffect(() => {
        if (!_.isEmpty(student)) {
            setData_1(prevState => student.reg_courses)
            setData_2(prevState => lecturer_courseList)
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
        const credential = JSON.parse(localStorage.getItem("credential"))

        RegChecked.map(value => {
            dropStudentCourse(value, credential.username, credential.password)
                .then(value1 => {
                    if (value1 === 200){
                        const credential = JSON.parse(localStorage.getItem("credential"))
                        dispatch(fetchStudent(student.id,credential.username,credential.password))
                        const currentIndex = RegChecked.indexOf(value);
                        const newChecked = [...RegChecked];
                        if (currentIndex === -1) {
                            newChecked.push(value);
                        } else {
                            newChecked.splice(currentIndex, 1);
                        }
                        setRegChecked(newChecked);
                        swal(`Course dropped successful.`)

                    }
                    }
                ).catch(reason => swal(reason.message))
        })

    }

    function takeCourse() {
        const credential = JSON.parse(localStorage.getItem("credential"))
        ALlCourseChecked.map(value => {

            if(data_1.map(v=>v.ssn.split("-")[1]).indexOf(value.split("-")[0])!== -1){
                swal(`${value.split("-")[0]} has been registered.`)
            }
            else {
                const data = {
                    "yearTaken": new Date().getFullYear(),
                    "semesterTaken": "spring",
                    "student": {
                        "id": student.id
                    },
                    "courses": {
                        "ssn": `${value}`
                    }
                }
                takeStudentCourse(data, credential.username, credential.password)
                    .then(value1 => {
                        if (value1 === 200){
                            swal(`Course Added Successful.`)
                            dispatch(fetchStudent(student.id,credential.username,credential.password))
                            const currentIndex = ALlCourseChecked.indexOf(value);
                            const newChecked = [...ALlCourseChecked];
                            if (currentIndex === -1) {
                                newChecked.push(value);
                            } else {
                                newChecked.splice(currentIndex, 1);
                            }
                            setALlCourseChecked(newChecked);
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
                                <ListItem>
                                    <ListItemText style={{paddingLeft: "30px"}} id={1} primary={`Course_code`}/>
                                    <ListItemText style={{paddingLeft: "20px"}} id={2} primary={`Lecturer_initial`}/>

                                </ListItem>
                                <hr style={{background: "#e3dbdb"}}/>
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
                                            <ListItemText id={labelId} primary={`${value.ssn.split("-")[1]}`}/>
                                            <ListItemText id={labelId} primary={`${value.ssn.split("-")[2]}`}/>
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
                                <ListItem>
                                    <ListItemText style={{paddingLeft: "30px"}} id={1} primary={`Course_code`}/>
                                    <ListItemText style={{paddingLeft: "20px"}} id={2} primary={`Lecturer_initial`}/>
                                </ListItem>
                                <hr style={{color: "#beb3b3"}}/>
                                {data_2.map((value, index) => {
                                    const labelId = `checkbox-list-label-${index + 1}`;

                                    return (
                                        <ListItem key={index} dense button
                                                  onClick={handleAllCourseToggle(value.ssn ? value.ssn : value)}>
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={ALlCourseChecked.indexOf(value.ssn ? value.ssn : value) !== -1}
                                                    disableRipple
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId}
                                                          primary={`${value.ssn ? value.ssn.split("-")[0] : value.split("-")[0]}`}/>
                                            <ListItemText id={labelId}
                                                          primary={`${value.ssn ? value.ssn.split("-")[1] : value.split("-")[1]}`}/>
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

export default TransferList;