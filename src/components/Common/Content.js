import React, {useEffect} from 'react';
import {Container, Box} from "@material-ui/core";
import "../../css/content.css"
import TeacherDashboard from "../Teacher/TeacherDashboard";
import {Switch, Route,} from "react-router-dom"
import TStudents from "../Teacher/T_Students";
import {useDispatch} from "react-redux";
import {fetchALLStudent} from "../Services/Student/StudentAction";
import {fetchLecturer_coursesList} from "../Services/Lecturer/LecturerAction";
import Classes from "../Teacher/Classes"
import SDashboard from "../Student/SDashboard";
import ADashboard from "../Admin/ADashboard";
import ACampus from "../Admin/ACampus";
import ASchool from "../Admin/ASchool";
import AProgramme from "../Admin/AProgramme";
import ACourse from "../Admin/ACourse";
import ALecturer from "../Admin/ALecturer";
import AStudent from "../Admin/AStudent";
import AUser from "../Admin/AUser";

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
                        <Route path="/admin/dashboard" component={ADashboard}/>
                        <Route path="/teacher/students" component={TStudents}/>
                        <Route path="/teacher/classes" component={Classes}/>
                        <Route path="/admin/campus" component={ACampus}/>
                        <Route path="/admin/school" component={ASchool}/>
                        <Route path="/admin/programme" component={AProgramme}/>
                        <Route path="/admin/course" component={ACourse}/>
                        <Route path="/admin/lecturer" component={ALecturer}/>
                        <Route path="/admin/student" component={AStudent}/>
                        <Route path="/admin/user" component={AUser}/>
                        </Switch>
                    </Container>
                </Box>

        </React.Fragment>
    );
};


export default Content;