import React, {useState} from 'react';
import "../../css/main.css"

import SideNav from "../SideNav";
import Content from "../Content";
import TopNav from "../TopNav";
import dashboard from "../../Images/dashboard.svg"
import Students from "../../Images/student.svg"
import classes from "../../Images/classes.svg"
import assignment from "../../Images/assignment.svg"
import attendance from "../../Images/attendance.svg"
import ProfileDialogOpen from "../Context/ProfileDialogOpen";
import {useSelector} from "react-redux";

const SMenu = [
    {
        title: "Dashboard",
        link: "/student/dashboard",
        logo: dashboard,
    },
    {
        title: "Preregistration",
        link: "/student/preregistration",
        logo: Students,
    },
    {
        title: "Grades",
        link: "/students/grades",
        logo: classes,
    },
    {
        title: "Curriculum Details",
        link: "/student/curriculum",
        logo: assignment,
    },
    {
        title: "Assignment",
        link: "/student/assignment",
        logo: attendance,
    },

]


const SMain = () => {
    const user = useSelector(store => store.user.data)
    console.log(user)
    const [openProfileDialog, setOpenProfileDialog] = useState(false)
    return (
        <>
            <ProfileDialogOpen.Provider value={{openProfileDialog, setOpenProfileDialog}}>
                <TopNav
                    name={"Koushik Sarker"}
                    person={user.student}
                />
            </ProfileDialogOpen.Provider>

            <SideNav
                menu={SMenu}
            />
            <Content/>
        </>
    );
};

export default SMain;