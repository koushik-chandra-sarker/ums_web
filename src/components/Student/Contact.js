import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import swal from "sweetalert";
import _ from "lodash";

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

const Contact = (props) => {
    const classes = useStyles();

    function sweetAlert() {
        swal("This service not available now.", "");
    }

    return (
        <Grid container spacing={3}>
            <Grid item md={6}>
                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Typography component={"div"} className={classes.cardTitle}>
                            PRESENT ADDRESS
                        </Typography>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle} style={{color: "#3d5af1"}}>STREET
                                ADDRESS:</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>VILL.:BANDANAL,
                                P.O:BIDDAVOLLOB, P.S:KENDUA, DIST.:NETROKONA.</Typography>
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
            <Grid item md={6}>
                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Typography component={"div"} className={classes.cardTitle}>
                            PERMANENT ADDRESS
                        </Typography>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle} style={{color: "#3d5af1"}}>STREET
                                ADDRESS:</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>VILL.:BANDANAL,
                                P.O:BIDDAVOLLOB, P.S:KENDUA, DIST.:NETROKONA.</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>District</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>Netrokona</Typography>
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
            <Grid item md={6}>
                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Typography component={"div"} className={classes.cardTitle}>
                            Contact
                        </Typography>
                        <Grid item xs={8}>
                            <Typography component={"h5"} className={classes.infoTitle}
                                        style={{color: "#3d5af1"}}>MOBILE</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>
                                {

                                    !_.isEmpty(props.person) ?
                                        props.person.phone.map((v) => {
                                            return (
                                                <>
                                                    {v.phone_no} <span> </span>
                                                </>
                                            )
                                        })
                                        : <></>

                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography component={"h5"} className={classes.infoTitle}>EMAIL</Typography>
                            <Typography component={"h4"}
                                        className={classes.infoSubtitle}>{props.person.email}</Typography>
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

export default Contact;