import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import {makeStyles} from "@material-ui/core/styles";
import InfoCard from "../infoCard";
import students1 from "../../Images/card_student_1.svg"
import students2 from "../../Images/card_student_2.svg";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import {useDispatch, useSelector} from "react-redux";
import {fetchALLStudentCourseByCSsn} from "../Services/Student/StudentAction";
import Table1 from "./Table1";
import _ from "lodash"
import StdModal from "./StdModal";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles({
    content_header: {
        padding: "20px 0 20px 0",
        color: "#867aee",
    },
    courseInfo:{
        background: "transparent", alignItems: "center",
        borderRadius: "10px",
        boxShadow: "inset 5px 5px 10px #e9e9e5, inset -5px -5px 10px #ffffff",
        textAlign: "center",
        padding: "20px !important"
    },
    paper: {
        background: "#f5f5f5",
        borderRadius: "10px"
    }
});


const Classes = (props) => {

    const classes = useStyles();
    const user = useSelector(store => store.user.data)
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel, cSsn) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        dispatch(fetchALLStudentCourseByCSsn(cSsn, credential.username, credential.password))
    };
    const dispatch = useDispatch();
    const credential = JSON.parse(localStorage.getItem("credential"))
    const studentCourse = useSelector(store => store.studentCourseListByCSsn)


    const ShowStudents = () => {
        if (_.isEmpty(studentCourse.data)) {
            return <p>No records found</p>
        }
        if (!_.isEmpty(studentCourse.data)) {
            return (
                <>
                <Table1 person={studentCourse.data}/>
                <StdModal/>
                </>
            )
        }
        if (studentCourse.loading) {
            return <CircularProgress color="secondary" />

        }
        if (user.error !== "") {
            return <p>{studentCourse.error}</p>
        }


        return <p>Unable to get Data</p>

    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} className="">
                    <ContentHeader
                        title="Classes"
                        style={classes.content_header}
                    />
                </Grid>


                <Grid item xs={12} className={classes.courseInfo} >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"} style={{padding:"20px", color:"#22119D"}}> Registered Courses</Typography>
                        </Grid>
                    </Grid>

                    {
                        user.lecturer.lecturer_courses !== null ?
                            user.lecturer.lecturer_courses.map((value, index) => {
                                return (
                                    <>
                                        <Accordion expanded={expanded === `panel${index + 1}`} className={classes.paper}
                                                   onChange={handleChange(`panel${index + 1}`, value.ssn)}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <Typography
                                                            className={classes.heading}>{value.ssn.split("-")[0]}</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography className={classes.secondaryHeading}>
                                                            {
                                                                value.course.title
                                                            }
                                                        </Typography>
                                                    </Grid>
                                                </Grid>

                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid item xs={12}>
                                                    <Typography className={classes.courseInfo}>

                                                        {ShowStudents()}

                                                    </Typography>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </>
                                )
                            })
                            :
                            <>No courses has registered.</>
                    }

                </Grid>
            </Grid>
        </>
    );
};


export default Classes