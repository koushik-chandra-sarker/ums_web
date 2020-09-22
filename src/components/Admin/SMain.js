import React, {useState} from 'react'
import "../../css/main.css"
import SideNav from "../SideNav"
import Content from "../Content"
import TopNav from "../TopNav"
import dashboard from "../../Images/dashboard.svg"
import assignment from "../../Images/assignment.svg"
import ProfileDialogOpen from "../Context/ProfileDialogOpen"
import {useSelector} from "react-redux"
import Pre_reg1 from "../../Images/Pre_reg1.svg"
import grade from "../../Images/grade.svg"

const AMenu = [
    {
        title: "Dashboard",
        link: "/admin/dashboard",
        logo: dashboard,
    },
    {
        title: "Campus",
        link: "/admin/campus",
        logo: Pre_reg1,
    },
    {
        title: "School",
        link: "/admin/school",
        logo: grade,
    },
    {
        title: "Programme",
        link: "/admin/programme",
        logo: assignment,
    },
    {
        title: "Courses",
        link: "/admin/courses",
        logo: assignment,
    },
    {
        title: "Lecturers",
        link: "/admin/lecturer",
        logo: assignment,
    },
    {
        title: "Students",
        link: "/admin/student",
        logo: assignment,
    },
    {
        title: "User",
        link: "/admin/user",
        logo: assignment,
    },


]


const AdminMain = () => {
    const user = useSelector(store => store.user.data)
    console.log(user)
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