import React, {useEffect} from 'react';
import {Container, Box} from "@material-ui/core";
import "../css/content.css"
import TeacherDashboard from "./Teacher/TeacherDashboard";
import {Switch, Route,} from "react-router-dom"
import TStudents from "./Teacher/T_Students";
import {useDispatch} from "react-redux";
import {fetchALLStudent} from "./Services/Student/StudentAction";
import {fetchLecturer_coursesList} from "./Services/Lecturer/LecturerAction";
import Classes from "./Teacher/Classes"
import SDashboard from "./Student/SDashboard";

const Content = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const credential = JSON.parse(localStorage.getItem("credential"))
        dispatch(fetchALLStudent(credential.username,credential.password));
        dispatch(fetchLecturer_coursesList(credential.username,credential.password))
    },[])

    return (
        <React.Fragment>

                <Box component={"div"} className="main_content">
                    <Container maxWidth={"xl"}>
                        <Switch>
                        <Route path="/teacher/dashboard" component={TeacherDashboard}/>
                        <Route path="/student/dashboard" component={SDashboard}/>
                        <Route path="/teacher/students" component={TStudents}/>
                        <Route path="/teacher/classes" component={Classes}/>
                        </Switch>
                    </Container>
                </Box>

        </React.Fragment>
    );
};


export default Content;