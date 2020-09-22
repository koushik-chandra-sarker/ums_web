import React from 'react';
import {Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import {makeStyles} from "@material-ui/core/styles";
import SInfoCard from "./sInfoCard";
import Pre_reg from "../../Images/Pre_reg.svg"
import Reg from "../../Images/Reg.svg"
import Credit from "../../Images/credit.svg"
import Notice from "../../Images/notice.svg"
import '../../css/table.css'

import {useSelector} from "react-redux";
import StdModal from "../Common/StdModal";
const useStyles = makeStyles({
    content_header: {
        padding: "20px 0 20px 0",
        color: "#867aee",

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

const SDashboard = () => {
    const classes = useStyles();
    const user = useSelector(store => store.user.data)
    return (
        <React.Fragment>
            <StdModal/>
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ContentHeader
                        title="Dashboard"
                        style={classes.content_header}
                    />
                </Grid>

                <Grid item lg={3} xs={12}>
                    <SInfoCard
                        number={5}
                        title="Pre-registered Course"
                        icon={Pre_reg}
                        actionTitle={"See All Pre-registered Courses"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <SInfoCard
                        number={5}
                        title="Registered Course"
                        icon={Reg}
                        actionTitle={"See Exam Date"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <SInfoCard
                        number={30}
                        title="Credits Completed"
                        icon={Credit}
                        actionTitle={"See All Completed Credits"}
                    />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <SInfoCard
                        number={1}
                        title="New Notice"
                        icon={Notice}
                        actionTitle={"See All Notices"}
                    />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>

            </Grid>
            </div>
        </React.Fragment>
    );
};

export default SDashboard;