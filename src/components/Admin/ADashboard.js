import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import {makeStyles} from "@material-ui/core/styles";
import campus from "../../Images/campus1.svg"
import school from "../../Images/school1.svg"
import programme from "../../Images/campus1.svg"
import lecturer from "../../Images/lecturer1.svg"
import student from "../../Images/studentAsh.svg"
import attendance from "../../Images/attendanceAsh.svg"
import notice from "../../Images/notice.svg"
import user1 from "../../Images/userAsh.svg"
import '../../css/table.css'
import RefreshIcon from '@material-ui/icons/Refresh';
import {useDispatch, useSelector} from "react-redux";
import AInfoCard from "./AInfoCard";
import IconButton from "@material-ui/core/IconButton";
import {Link, Route, Switch,useHistory} from "react-router-dom";
import {getCampusList} from "../Services/Campus/CampusAction";
import {getSchoolList} from "../Services/School/SchoolAction";
import {getProgrammeList} from "../Services/Programme/ProgrammeAction";
import {getLecturerList} from "../Services/Lecturer/LecturerAction";
import {fetchALLStudent} from "../Services/Student/StudentAction";
import {getUserList} from "../Services/User/UserAction";
const useStyles = makeStyles({
    content_header: {
        padding: "20px 0 20px 0",
        color: "#867aee",
        width:"80%"

    },
    root: {
        background: "transparent",
        borderRadius: "10px",
        boxShadow: "inset 5px 5px 10px #e9e9e5, inset -5px -5px 10px #ffffff",
        padding: "20px !important",
        marginTop: "20px",
        height: "calc(100vh - 120px)",
        overflow:"scroll"
    },
    paper: {
        background: "#f5f5f5",
        borderRadius: "10px"
    },
    table:{
        background: "#f5f5f5",
        height: "100%",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "10px",
        padding:"10px",
        "& table":{
            "& th":{
                background: "#F5F5F5",
                color: "#000",
            }
        },
        '& tbody':{
            '& tr':{
                '&:nth-child(odd)':{
                    background: "transparent !important"
                },
                '&:hover':{
                    background: "#C8C7C7" +
                        "  !important"
                }
            }
        }
    }
});
const tableColumn = [
    "Course Code",
    "Title",
    "Faculty Initial",
    "Semester"
]

const ADashboard = () => {
    const campusList = useSelector(store => store.CampusList.data)
    const schoolList = useSelector(store => store.SchoolList.data)
    const programmeList = useSelector(store => store.ProgrammeList.data)
    const lecturerList = useSelector(store => store.ProgrammeList.data)
    const studentList = useSelector(store => store.studentList.data)
    const userList = useSelector(store => store.userList.data)
    const classes = useStyles();
    const user = useSelector(store => store.user.data)
    const dispatch = useDispatch();

    function refresh() {
        const credential = JSON.parse(localStorage.getItem("credential"))
        dispatch(getCampusList(credential.username,credential.password))
        dispatch(getSchoolList(credential.username,credential.password))
        dispatch(getProgrammeList(credential.username,credential.password))
        dispatch(getLecturerList(credential.username,credential.password))
        dispatch(fetchALLStudent(credential.username,credential.password))
        dispatch(getUserList(credential.username,credential.password))
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} container justify={"space-between"} alignItems={"center"}>
                    <ContentHeader
                        title="Dashboard"
                        style={classes.content_header}
                    />
                    <IconButton style={{border:"1px solid"}} onClick={refresh}  color="secondary" aria-label="Refresh">
                        <RefreshIcon />
                    </IconButton>

                </Grid>

                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={campusList.length}
                        title="Campus"
                        icon={campus}
                        actionTitle={"Manage"}
                        link={"/admin/campus"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={schoolList.length}
                        title="School"
                        icon={school}
                        actionTitle={"Manage"}
                        link={"/admin/school"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={programmeList.length}
                        title="Programme"
                        icon={programme}
                        actionTitle={"Manage"}
                        link={"/admin/programme"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={lecturerList.length}
                        title="Lecturer"
                        icon={lecturer}
                        actionTitle={"Manage"}
                        link={"/admin/lecturer"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={studentList.length}
                        title="Total Students"
                        icon={student}
                        actionTitle={"Manage"}
                        link={"/admin/student"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={0}
                        title="Attendance"
                        icon={attendance}
                        actionTitle={"Manage"}
                        link={"/admin/attendance"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={0}
                        title="Notice"
                        icon={notice}
                        actionTitle={"Manage"}
                        link={"/admin/notice"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <AInfoCard
                        number={userList.length}
                        title="User"
                        icon={user1}
                        actionTitle={"Manage"}
                        link={"/admin/user"}
                    />
                </Grid>
                {/*<Grid item xs={12}>
                    <div className={`${classes.table} table_main`}>
                        <table>
                            <thead>
                            <tr>
                                {tableColumn.map((value, index) => {
                                    return (
                                        <th>{value}</th>
                                    )
                                })}
                            </tr>
                            </thead>
                            <tbody>
                            <div className="massage">more info</div>
                            {   user.student.reg_courses?
                                user.student.reg_courses.map((value, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td data-label="Course Code">{value.ssn.split("-")[1]}</td>
                                            <td data-label="Title">{value.courseTitle}</td>
                                            <td data-label="Faculty Initial">{value.ssn.split("-")[2]}</td>
                                            <td data-label="Semester">{`${value.semesterTaken}-${value.yearTaken}`}</td>
                                        </tr>

                                    </>
                                )
                            })
                            :
                                <>No Course has been registered</>
                            }


                            </tbody>

                        </table>

                    </div>
                </Grid>*/}

            </Grid>
            </div>
        </React.Fragment>
    );
};

export default ADashboard;