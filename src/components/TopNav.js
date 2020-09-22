import React, {useContext} from 'react';
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import notification from "../Images/notification.svg";
import massage from "../Images/massege.svg";
import profilePic from "../Images/profile_pic.JPG";
import "../css/TopNav.css"
import active from "../Images/active.svg"
import ProfileDialog from "./Common/ProfileDialog";
import ProfileDialogOpen from "./Context/ProfileDialogOpen";


const TopNav = (props) => {
    const OpenProfileDialog = useContext(ProfileDialogOpen)
    function ProfilePicClickHandler() {
        OpenProfileDialog.setOpenProfileDialog(true)
    }

    const ShowProfileDialog = () => {
        if (OpenProfileDialog) {
            return (
                <ProfileDialog person={props.person}/>
            )
        }
    }


    return (
        <>
            {ShowProfileDialog()}
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="div" className={"top_navbar"}>
                        <Typography component="h5" align={"left"} variant={"h5"} className="user_name">
                            <span>Welcome </span>
                            {
                                props.person.middleName !== null?
                                    `${props.person.firstName} ${props.person.middleName} ${props.person.lastName}`
                                    :
                                    `${props.person.firstName} ${props.person.lastName}`
                            }
                        </Typography>

                        <Typography component={"div"} className="top_navbar_right">
                            <Typography component={"div"} align={"left"} className="Notify_icons">
                                <div className="notify_count"><img src={active} alt=""/></div>
                                <img src={notification} alt=""/>
                                <div className="massage-count"><img src={active} alt=""/></div>
                                <img src={massage} alt=""/>
                            </Typography>
                            <Typography component="div" align={"right"} className="profile_pic">
                                <Typography
                                    component={"img"}
                                    src={profilePic}
                                    alt="Profile Picture"
                                    onClick={ProfilePicClickHandler}

                                />
                            </Typography>
                        </Typography>

                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default TopNav;