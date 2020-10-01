import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useDispatch, useSelector} from "react-redux";
import {getCampus, getCampusList} from "../Services/Campus/CampusAction";
import {addSchool, dropSchool, getSchoolList} from "../Services/School/SchoolAction";
import Typography from "@material-ui/core/Typography";
import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from "@material-ui/core/FormControl";
import _ from "lodash"
import StdModal from "../Common/StdModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import '../../css/table.css'
import AddIcon from '@material-ui/icons/Add';
import UserTable from "./UserTable";
import {getUserList} from "../Services/User/UserAction";
import Fab from "@material-ui/core/Fab";
import InputBase from "@material-ui/core/InputBase";
import Popover from "@material-ui/core/Popover";
import {setModalControl} from "../Services/StdModelControl/StdModelControlAction";
import {fetchStudent} from "../Services/Student/StudentAction";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import EditUserDialog from "./EditUserDialog";

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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        boxShadow: "inset 5px 5px 10px #e9e9e5, inset -5px -5px 10px #ffffff",
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },

}))


const AUser = () => {

    const classes = useStyles();
    const userList = useSelector(store => store.userList)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        dispatch(getSchoolList(credential.username, credential.password))
    }, [])
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    function refresh() {
        dispatch(getUserList(credential.username, credential.password))
    }
    const ShowPopover = () => {
        return (
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Card  elevation={3}  style={{padding:"20px"}}>

                    <Grid container spacing={2}  justify={"center"}>
                        <Grid item xs={12} container justify={"center"} alignItems={"center"}>
                            <Typography variant={"h5"}>First Create a</Typography>
                        </Grid>
                        <Grid item xs={12} lg={5} container justify={"center"} alignItems={"center"}>
                            <Link to={"/admin/lecturer"}> <Button variant={"contained"} color={"primary"}>Lecturer</Button></Link>
                        </Grid>
                        <Grid item xs={12} lg={1} container justify={"center"} alignItems={"center"}>
                            <p>or</p>
                        </Grid>

                        <Grid item xs={12} lg={5} container justify={"center"} alignItems={"center"}>
                            <Link to={"/admin/student"}> <Button variant={"contained"} color={"secondary"}>Student</Button></Link>
                        </Grid>
                    </Grid>

                </Card>
            </Popover>
        )
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
                            <Grid container item justify={"space-between"} alignItems={"center"}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{'aria-label': 'search'}}
                                    />
                                </div>
                                <Fab color="default" aria-label="add"
                                     aria-owns={open ? 'mouse-over-popover' : undefined}
                                     aria-haspopup="true"
                                     onMouseEnter={handlePopoverOpen}
                                     onMouseLeave={handlePopoverClose}
                                >
                                    <AddIcon/>
                                    {ShowPopover()}
                                </Fab>
                            </Grid>

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