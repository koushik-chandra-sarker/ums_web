import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import swal from "sweetalert";

const useStyles = makeStyles({
    infoCard: {
        boxShadow: "inset 3px 3px 3px #e5e5e5, inset -3px -3px 5px #ffffff",
        padding: "12px 15px"
    },
    cardTitle: {
        padding: " 15px ",
        width: "100%",
        borderBottom: "1px solid #d5d5d5",
        margin: "8px 6px",
        textAlign: "center",
        fontWeight: "bold",
    },
    infoTitle: {
        fontSize: "16px",
        color: "#226089"
    },
    infoSubtitle: {
        fontSize: "14px",
        color: "#4592af"
    },
    common: {
        position: "relative"
    },
    editIcon: {
        position: "absolute",
        right: "20px",
        bottom: "20px",
        boxShadow: " 3px 3px 3px #e5e5e5,  -3px -3px 5px #ffffff",
        color: '#ff1f5a'
    }
});
const AcademicInfo = () => {
    const classes = useStyles();

    function sweetAlert() {
        swal("This service not available now.", "");
    }

    return (
        <Grid container spacing={3}>
            <Grid item md={6}>
                <Grid item>
                    <Typography component={"div"} className={classes.infoCard}>
                        <Grid container spacing={5} className={classes.common}>
                            <Typography component={"div"} className={classes.cardTitle}>
                                CURRENT
                            </Typography>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Program</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>BSc in CSE</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Batch ID</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>48</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Enrolling
                                    Semester</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>Spring 2018</Typography>
                            </Grid>
                            <IconButton
                                className={classes.editIcon}
                                onClick={sweetAlert}
                            >
                                <EditOutlinedIcon/>
                            </IconButton>
                        </Grid>
                    </Typography>
                </Grid>
                <br/>
                <Grid item>
                    <Typography component={"div"} className={classes.infoCard}>
                        <Grid container spacing={5} className={classes.common}>
                            <Typography component={"div"} className={classes.cardTitle}>
                                HSC
                            </Typography>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Degree</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>HSC</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"}
                                            className={classes.infoTitle}>Concentration/Major/Group</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>SCIENCE</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Institute Name</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>ROYAL MEDIA
                                    COLLEGE</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Result Type</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>GRADE</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Letter Grade</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>A</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Board</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>DHAKA</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Year Of Passing</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>2017</Typography>
                            </Grid>

                            <IconButton
                                className={classes.editIcon}
                                onClick={sweetAlert}
                            >
                                <EditOutlinedIcon/>
                            </IconButton>
                        </Grid>
                    </Typography>
                </Grid>
            </Grid>

            <Grid item md={6}>

                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Typography component={"div"} className={classes.cardTitle}>
                            SSC
                        </Typography>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Degree</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>SSC</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"}
                                        className={classes.infoTitle}>Concentration/Major/Group</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>SCIENCE</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Institute Name</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>ASUJIA J.N.C.
                                INSTITUTION</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Result Type</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>GRADE</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Letter Grade</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>A</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Board</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>DHAKA</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Year Of Passing</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>2015</Typography>
                        </Grid>

                        <IconButton
                            className={classes.editIcon}
                            onClick={sweetAlert}
                        >
                            <EditOutlinedIcon/>
                        </IconButton>
                    </Grid>
                </Typography>
            </Grid>

        </Grid>
    );
};

export default AcademicInfo;