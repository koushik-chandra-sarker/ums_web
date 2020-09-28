import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box, Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useDispatch, useSelector} from "react-redux";
import {getCampus, getCampusList} from "../Services/Campus/CampusAction";
import {addSchool, dropSchool, getSchoolList} from "../Services/School/SchoolAction";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import _ from "lodash"
import StdModal from "../Common/StdModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import '../../css/table.css'

import AddStudentForm from "./AddStudentForm";
import userTable from "./UserTable";
import UserTable from "./UserTable";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "transparent",
        borderRadius: "10px",
        boxShadow: "inset 5px 5px 10px #e9e9e5, inset -5px -5px 10px #ffffff",
        padding: "20px !important",
        marginTop: "20px",
        height: "calc(100vh - 120px)",
        overflow: "scroll",
    },
    content_header: {
        padding: "20px 0 20px 0",
        color: "#867aee",
        width: "80%"

    },
    card: {
        background: "#f5f5f5",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "8px",
        height: "calc(100vh - 250px)",
        padding: "20px",
        overflow: "hidden"

    },
    content: {
        height: "calc(100% - 80px)",
        overflow: "scroll",

    },
    formHeader: {
        color: "#858484",
        paddingTop: "40px",
        paddingBottom: "40px"

    },
    formControl: {
        marginTop: "12px",
    },
    formButton: {
        marginTop: "20px",
        color: "#858484",
        "&:hover": {
            background: "#C8C7C7"
        }
    },
    formBox: {
        padding: "0 20px 0 0"
    },

}))



// export const EditStudentContext = React.createContext();
const AUser = () => {

    const classes = useStyles();
    const userList = useSelector(store => store.userList)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSchoolList(credential.username, credential.password))
    }, [])


    function refresh() {
        dispatch(getCampusList(credential.username, credential.password))
    }


    // function handleDeleteProgramme(code) {
    //     dropProgramme(code, credential.username, credential.password)
    //         .then(r => {
    //             if (r === 200) {
    //                 toast("Programme Dropped Successful.");
    //                 // dispatch(getCampus(SelectedCampus.id, credential.username, credential.password))
    //                 dispatch(getCampusList(credential.username, credential.password))
    //             }
    //         })
    //         .catch(reason => {
    //             swal(reason.message)
    //         })
    // }



    return (
        <div className={classes.root}>
            <StdModal/>

            <Grid container spacing={3}>
                <Grid item xs={12} spacing={3} container justify={"space-between"} alignItems={"center"}>
                    <ContentHeader
                        title="Programme"
                        style={classes.content_header}
                    />
                    <IconButton style={{border: "1px solid"}} onClick={refresh} color="secondary" aria-label="Refresh">
                        <RefreshIcon/>
                    </IconButton>
                    <Grid item xs={12}>
                        <Typography component={"div"} className={classes.card}
                                    style={{paddingRight: "40px"}}>
                            <Typography component={"div"} className={classes.content}>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    {showUsers()}
                                </FormControl>
                            </Typography>


                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/*<AddStudentForm programmeCode={SelectedProgramme.code}/>*/}
                    </Grid>

                </Grid>

            </Grid>
        </div>
    );


    function showUsers() {
        if (userList.loading) {
            return (
                <>
                    <Grid container item justify={"center"} alignItems={"center"}>
                        <CircularProgress color="secondary"/>
                    </Grid>
                </>
            )

        }
        if (_.isEmpty(userList.data)) {
            return <p>No records found</p>
        }
        if (!_.isEmpty(userList.data)) {
            return (
                <UserTable users={userList.data}/>
            )


        }

        if (userList.error !== "") {
            return <p>{userList.error}</p>
        }


        return <p>Unable to get Data</p>
    }

};

export default AUser;