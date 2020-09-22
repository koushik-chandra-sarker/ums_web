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

const SMenu = [
    {
        title: "Dashboard",
        link: "/student/dashboard",
        logo: dashboard,
    },
    {
        title: "Preregistration",
        link: "/student/preregistration",
        logo: Pre_reg1,
    },
    {
        title: "Grades",
        link: "/students/grades",
        logo: grade,
    },
    {
        title: "Curriculum Details",
        link: "/student/curriculum",
        logo: assignment,
    },
    {
        title: "Assignment",
        link: "/student/assignment",
        logo: assignment,
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