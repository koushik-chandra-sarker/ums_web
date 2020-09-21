import React from 'react';
import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import classIcon from "../../Images/card_classes.svg";
import student from "../../Images/card_student.svg";
import attendance from "../../Images/card_attendance.svg";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        position: "relative"
    },
    class_card: {
        background: "#00C0EF",
            "& h5": {
                color: "#E8EDF5",
                fontWeight:"bold"
            },
        "& p": {
            color: "#E8EDF5",
            fontSize:"12px"
        },
        "& a": {
            color: "#E8EDF5",
            fontSize:"14px"
        },

    },
    std_card: {
        background: "#00A65A",
        "& h5": {
            color: "#E8EDF5",
            fontWeight:"bold"
        },
        "& p": {
            color: "#E8EDF5",
            fontSize:"12px"
        },
        "& a": {
            color: "#E8EDF5",
            fontSize:"14px"
        },
    },
    attendance_card: {
        background: " #DD4C39",
        "& h5": {
            color: "#E8EDF5",
            fontWeight:"bold"
        },
        "& p": {
            color: "#E8EDF5",
            fontSize:"12px"
        },
        "& a": {
            color: "#E8EDF5",
            fontSize:"14px",
            textAlign:"center"
        },
    },
    card_icon: {
        height: "50px",
        position: "absolute",
        right: "20px",
        top: "20px",
    },
    class_cardAction:{
        background:"#00ADD8",
        marginTop:"10px",
        height:"25px",
        display:"flex",
        justifyContent:"center",
    },
    std_cardAction:{
        background:"#009551",
        marginTop:"10px",
        height:"25px",
        display:"flex",
        justifyContent:"center",
    },
    attendance_cardAction:{
        background:"#C74432",
        marginTop:"10px",
        height:"25px",
        display:"flex",
        justifyContent:"center",

    }
});


const ThreeCards = () => {
    const classes = useStyles();
    return (
        <>
            <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                    <Card className={`${classes.class_card} ${classes.card}`}>
                        <CardContent>
                            <Typography component={"h5"} variant={"h5"} className="card_count">
                                150
                            </Typography>
                            <Typography component={"p"} className="card_title">
                                Total Classes
                            </Typography>
                            <Typography component={"img"} className={classes.card_icon} src={classIcon} alt={""}/>

                        </CardContent>
                        <CardActions className={classes.class_cardAction}>
                            <Link to={"/teacher/classes"}><Typography component={"p"} >More info &rarr;</Typography></Link>
                        </CardActions>

                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card className={`${classes.std_card} ${classes.card}`}>
                        <CardContent>
                            <Typography component={"h5"} variant={"h5"} className="card_count">
                                150
                            </Typography>
                            <Typography component={"p"} className="card_title">
                                Total Students
                            </Typography>
                            <Typography component={"img"} className={classes.card_icon} src={student} alt={""}/>

                        </CardContent>
                        <CardActions className={classes.std_cardAction}>
                            <Link to={"/teacher/students"}><Typography component={"p"}>More info &rarr;</Typography></Link>
                        </CardActions>

                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card className={`${classes.attendance_card} ${classes.card}`}>
                        <CardContent>
                            <Typography component={"h5"} variant={"h5"} className="card_count">
                                120/150
                            </Typography>
                            <Typography component={"p"} className="card_title">
                                Students present today
                            </Typography>
                            <Typography component={"img"} className={classes.card_icon} src={attendance} alt={""}/>

                        </CardContent>
                        <CardActions className={classes.attendance_cardAction}>
                            <Link to={"/teacher/attendance"}><Typography component={"p"}>More info &rarr;</Typography></Link>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default ThreeCards;