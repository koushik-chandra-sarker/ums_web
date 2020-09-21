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
const Parents = () => {
    const classes = useStyles();
    function sweetAlert() {
        swal("This service not available now.","");
    }
    return (
        <Grid container spacing={3}>
            <Grid item md={6}>
                <Grid item>
                    <Typography component={"div"} className={classes.infoCard}>
                        <Grid container spacing={5} className={classes.common}>
                            <Typography component={"div"} className={classes.cardTitle}>
                                Father
                            </Typography>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Name</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>GUPAL CHANDRA SARKER</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Occupation</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>Business</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Phone Number</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>MOBILE # +880 17********</Typography>
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
                <Grid item>
                    <Typography component={"div"} className={classes.infoCard}>
                        <Grid container spacing={5} className={classes.common}>
                            <Typography component={"div"} className={classes.cardTitle}>
                                Mother
                            </Typography>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Name</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>SABITA RANI SARKER</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Occupation</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>Housewife</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography component={"h5"} className={classes.infoTitle}>Phone Number</Typography>
                                <Typography component={"h4"} className={classes.infoSubtitle}>MOBILE # +880 17********</Typography>
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

        </Grid>
    );
};

export default Parents;