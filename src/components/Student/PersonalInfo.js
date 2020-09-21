import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import swal from 'sweetalert';
const useStyles = makeStyles({
    infoCard:{
        boxShadow: "inset 3px 3px 3px #e5e5e5, inset -3px -3px 5px #ffffff",
        padding:"12px 15px"
    },
    infoTitle:{
        fontSize:"16px",
        color:"#226089"
    },
    cardTitle:{
        padding:" 15px ",
        width:"100%",
        borderBottom:"1px solid #d5d5d5",
        margin:"8px 6px",
        textAlign:"center",
        fontWeight:"bold",
    },
    infoSubtitle:{
        fontSize:"14px",
        color:"#4592af"
    },
    common:{
        position:"relative"
    },
    editIcon:{
        position:"absolute",
        right:"20px",
        bottom:"20px",
        boxShadow: " 3px 3px 3px #e5e5e5,  -3px -3px 5px #ffffff",
        color:'#ff1f5a'
    }
});
const PersonalInfo = (props) => {
    const classes = useStyles();
    function sweetAlert() {
        swal("This service not available now.","");
    }

    return (
        <Grid container spacing={3}>
            <Grid item md={6} >
                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Grid item xs={6} >
                            <Typography component={"h5"} className={classes.infoTitle} style={{color:"#3d5af1"}}>Full Name</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>
                                {
                                    props.person.middleName!== null ?
                                        `${props.person.firstName} ${props.person.middleName} ${props.person.lastName}`
                                        :
                                        `${props.person.firstName} ${props.person.lastName}`
                                }</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>First Name</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.firstName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Middle Name</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.middleName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Last Name</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.lastName}</Typography>
                        </Grid>
                        <IconButton
                            className={classes.editIcon}
                            onClick={sweetAlert}
                        >
                            <EditOutlinedIcon/>
                        </IconButton>
                    </Grid>
                </Typography>
                <br/>
                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>{props.person.gender}</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>Male</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Date of Birth</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.birthday}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Marital Status</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.maritalStatus}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Blood Group</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.bloodGroup}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Religion</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.religion}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>Nationality</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.nationality}</Typography>
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
            <Grid item md={6} >
                <Typography component={"div"} className={classes.infoCard}>
                    <Grid container spacing={5} className={classes.common}>
                        <Typography component={"div"} className={classes.cardTitle}>
                            Identification
                        </Typography>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle} style={{color:"#3d5af1"}}>User ID</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.user?props.person.user.id:<></>}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography component={"h5"} className={classes.infoTitle}>User Name</Typography>
                            <Typography component={"h4"} className={classes.infoSubtitle}>{props.person.user?props.person.user.username:<></>}</Typography>
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

export default PersonalInfo;