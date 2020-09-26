import React, {useEffect, useState} from 'react';
import "../../css/main.css"

import SideNav from "../SideNav";
import Content from "../Common/Content";
import TopNav from "../TopNav";
import dashboard from "../../Images/dashboard.svg"
import Students from "../../Images/student.svg"
import classes from "../../Images/classes.svg"
import assignment from "../../Images/assignment.svg"
import attendance from "../../Images/attendance.svg"
import ProfileDialogOpen from "../Context/ProfileDialogOpen";
import {useSelector} from "react-redux";
import store from "../Services/Store";


const TMenu = [
    {
        id: 1,
        title: "Dashboard",
        link: "/teacher/dashboard",
        logo: dashboard,
    },
    {
        id: 2,
        title: "Students",
        link: "/teacher/students",
        logo: Students,
    },
    {
        id: 3,
        title: "Classes",
        link: "/teacher/classes",
        logo: classes,
    },
    {
        id: 4,
        title: "Assignment",
        link: "/teacher/assignment",
        logo: assignment,
    },
    {
        id: 5,
        title: "Attendance",
        link: "/teacher/attendance",
        logo: attendance,
    },

]


const TMain = () => {

    const user = useSelector(store => store.user.data)
    const [openProfileDialog, setOpenProfileDialog] = useState(false)
    return (
        <>
            <ProfileDialogOpen.Provider value={{openProfileDialog, setOpenProfileDialog}}>
                <TopNav
                    person={user.lecturer}
                />
            </ProfileDialogOpen.Provider>

            <SideNav
                menu={TMenu}
            />
            <Content/>
        </>
    );
};

export default TMain;