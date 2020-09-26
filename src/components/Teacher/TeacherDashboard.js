import React from 'react';
import {Grid, Typography,Icon} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import {makeStyles} from "@material-ui/core/styles";
import ThreeCards from "./ThreeCards";
import Scheduler from "../ClassScheduler";
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles({
    content_header: {
        padding: "20px 0 20px 0",
        color: "#867aee",
    },
    schedule: {
        padding: "30px 0 20px 0",
        height:"calc(100vh - 300px)"
    },
    schedule_header:{
        height:"30px",
        width:"100%",
        background:"#0a4fa4",
        color:"#fff",
        display:"flex",
        alignItems:"center",
        padding:"0 0 0 10px",
        "& span":{
           position:"relative",
            top:"-3px",
        },
        "& h1":{
            padding:"0 0 0 10px",
        }
    }

})



const TeacherDashboard = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12} className="">
                    <ContentHeader
                        title="Dashboard"
                        style={classes.content_header}
                    />
                </Grid>
                <ThreeCards />
                <Grid item xs={12} >
                    <Typography component={"div"} className={classes.schedule}>
                        <Typography component={"div"} className={classes.schedule_header}>
                            <Icon component={"span"}><ScheduleIcon/></Icon>
                            <Typography component={"h1"}>Class Schedule</Typography>
                        </Typography>
                        <Scheduler/>
                    </Typography>
                </Grid>

            </Grid>
        </React.Fragment>
    );
};

export default TeacherDashboard;