import React, {useEffect, useState} from 'react'
import "../../css/main.css"
import SideNav from "../SideNav"
import Content from "../Common/Content"
import TopNav from "../TopNav"
import dashboard from "../../Images/dashboard.svg"
import assignment from "../../Images/assignment.svg"
import ProfileDialogOpen from "../Context/ProfileDialogOpen"
import {useDispatch, useSelector} from "react-redux"
import Pre_reg1 from "../../Images/Pre_reg1.svg"
import grade from "../../Images/grade.svg"
import campus from "../../Images/campus.svg"
import school from "../../Images/school.svg"
import programme from "../../Images/Programme.svg"
import course from "../../Images/course.svg"
import lecturer from "../../Images/lecturer.svg"
import student from "../../Images/student.svg"
import user from "../../Images/user.svg"
import attendance from "../../Images/attendance.svg"
import notice from "../../Images/notice.svg"
import { getCampusList} from "../Services/Campus/CampusAction";
import {getSchoolList} from "../Services/School/SchoolAction";
import {getProgrammeList} from "../Services/Programme/ProgrammeAction";
import {getLecturerList} from "../Services/Lecturer/LecturerAction";
import {fetchALLStudent} from "../Services/Student/StudentAction";
import {getUserList} from "../Services/User/UserAction";

const AMenu = [
    {
        title: "Dashboard",
        link: "/admin/dashboard",
        logo: dashboard,
    },
    {
        title: "Campus",
        link: "/admin/campus",
        logo: campus,
    },
    {
        title: "School",
        link: "/admin/school",
        logo: school,
    },
    {
        title: "Programme",
        link: "/admin/programme",
        logo: programme,
    },
    {
        title: "Courses",
        link: "/admin/Course",
        logo: course,
    },
    {
        title: "Lecturers",
        link: "/admin/lecturer",
        logo: lecturer,
    },
    {
        title: "Students",
        link: "/admin/student",
        logo: student,
    },
    {
        title: "User",
        link: "/admin/user",
        logo: user,
    },
    {
        title: "Attendance",
        link: "/admin/attendance",
        logo: attendance,
    },
    {
        title: "Notice",
        link: "/admin/notice",
        logo: notice,
    },


]


const AdminMain = () => {

    const user = useSelector(store => store.user.data)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampusList(credential.username,credential.password))
        dispatch(getSchoolList(credential.username,credential.password))
        dispatch(getProgrammeList(credential.username,credential.password))
        dispatch(getLecturerList(credential.username,credential.password))
        dispatch(fetchALLStudent(credential.username,credential.password))
        dispatch(getUserList(credential.username,credential.password))
    },[])
    const [openProfileDialog, setOpenProfileDialog] = useState(false)
    return (
        <>
            <ProfileDialogOpen.Provider value={{openProfileDialog, setOpenProfileDialog}}>
                <TopNav
                    person={user.lecturer===null?user.student:user.lecturer}
                />
            </ProfileDialogOpen.Provider>

            <SideNav
                menu={AMenu}
            />
            <Content/>
        </>
    );
};

export default AdminMain;