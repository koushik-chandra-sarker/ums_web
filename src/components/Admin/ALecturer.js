import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box, Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import lecturerIcon from "../../Images/lecturer2.svg"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {useDispatch, useSelector} from "react-redux";
import {getCampus, getCampusList} from "../Services/Campus/CampusAction";
import {addSchool, dropSchool, getSchool, getSchoolList} from "../Services/School/SchoolAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {fetchALLStudentCourseByCSsn} from "../Services/Student/StudentAction";
import _ from "lodash"
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {toast} from "react-toastify";
import swal from "sweetalert";
import EditSchoolDialog from "./EditSchoolDialog";
import Table1 from "../Teacher/Table1";
import StdModal from "../Common/StdModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddProgrammeForm from "./AddProgrammeForm";
import {dropProgramme, getProgrammeList} from "../Services/Programme/ProgrammeAction";
import EditProgrammeDialog from "./EditProgrammeDialog";
import AddCourseForm from "./AddCourseForm";
import {dropCourse, getCourseList} from "../Services/Courses/CourseAction";
import EditCourseDialog from "./EditCourseDialog";
import AddLecturerForm from "./AddLecturerForm";
import {dropLecturer, getLecturer} from "../Services/Lecturer/LecturerAction";
import EditLecturerDialog from "./EditLecturerDialog";
import {createLecUser, createStdUser, getUserList} from "../Services/User/UserAction";
import credential from "../Common/Credential";
import {setLecModalControl} from "../Services/LecModelControl/LecModelControlAction";
// import EditSchoolContext from "../Context/EditSchoolContext";

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
        marginRight: "0px"

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
    }

}))
export const EditLecturerContext = React.createContext();
const ALecturer = () => {

    const classes = useStyles();
    const schoolList = useSelector(store => store.SchoolList.data)
    const school = useSelector(store => store.School)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);

    const [SelectedSchool, setSelectedSchool] = useState({
        id: `${!_.isEmpty(schoolList)?schoolList[0].id:''}`
    });
    const [editDialog, setEditDialog] = useState({
        open: false,
        schoolId: ''
    })
    useEffect(() => {
        dispatch(getSchool(SelectedSchool.id, credential.username, credential.password))
    }, [])

    const handleChange2 = (event) => {

    };

    function getData(id) {
        dispatch(getSchool(id, credential.username, credential.password))
    }


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    function refresh() {
        dispatch(getSchoolList(credential.username, credential.password))
    }


     function handleDeleteLecturer(code) {
         dropLecturer(code, credential.username, credential.password)
             .then(r => {
                 if (r === 200) {
                     toast("Course Dropped Successful.");
                     dispatch(getSchool( SelectedSchool.id,credential.username, credential.password))
                 }
             })
             .catch(reason => {
                 swal(reason.message)
             })
     }



    return (
        <div className={classes.root}>
            <EditLecturerContext.Provider value={{editDialog, setEditDialog}}>
                <EditLecturerDialog/>
            </EditLecturerContext.Provider>
            <Grid container spacing={3}>
                <Grid item xs={12} spacing={3} container justify={"space-between"} alignItems={"center"}>
                    <ContentHeader
                        title="Lecturers"
                        style={classes.content_header}
                    />
                    <IconButton style={{border: "1px solid"}} onClick={refresh} color="secondary" aria-label="Refresh">
                        <RefreshIcon/>
                    </IconButton>
                    <Grid item sm={12} lg={6}>
                        <Typography component={"div"} className={classes.card}
                                    style={{paddingRight: "40px"}}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Select Campus</InputLabel>
                                <Select
                                    native
                                    value={SelectedSchool.id}
                                    onChange={(e) => {
                                        setSelectedSchool({...SelectedSchool, id: e.target.value});
                                        getData(e.target.value)
                                    }}
                                    label="Select Campus"
                                >
                                    <option aria-label="None" value=""/>
                                    {
                                        !_.isEmpty(schoolList) ?
                                            schoolList.map(value => {
                                                return (
                                                    <option value={value.id}>{value.name}</option>
                                                )
                                            }) :
                                            <option value={''}>No record found</option>
                                    }

                                </Select>
                            </FormControl>

                            <Typography component={"div"} className={classes.content}>

                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    {
                                        showCampus()
                                    }

                                </FormControl>
                            </Typography>


                        </Typography>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                        <AddLecturerForm schoolId={SelectedSchool.id}/>
                    </Grid>

                </Grid>

            </Grid>
        </div>
    );


    function CreateUser(id) {
        createLecUser(id, credential.username, credential.password)
            .then(r => {
                swal(`${r}`)
                dispatch(getUserList(credential.username, credential.password))
            })
    }

    function handleLecModal(id) {
        dispatch(setLecModalControl(true,id))
        dispatch(getLecturer(id,credential.username,credential.password))
    }

    function showCampus() {
        if (school.loading) {
            return (
                <>
                    <Grid container item justify={"center"} alignItems={"center"}>
                        <CircularProgress color="secondary"/>
                    </Grid>
                </>
            )

        }
        if (_.isEmpty(school.data)) {
            return (
                <>
                    <Grid container item justify={"center"} alignItems={"center"}>
                        <p>No records found</p>
                    </Grid>
                </>
            )
        }
        if (!_.isEmpty(school.data)) {
            return (
                <Grid item xs={12}>
                    <Typography className={classes.courseInfo}>

                        <List className={classes.listRoot}
                              subheader={<ListSubheader>Lecturers list</ListSubheader>}
                        >
                            {
                                school.data.lecturers.map((value, index) => {
                                    return (
                                        <>

                                            <ListItem >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        onClick={()=>{handleLecModal(value.id)}}
                                                        src={lecturerIcon}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={`Name: ${
                                                        value.middleName !== null ?
                                                            `${value.firstName} ${value.middleName} ${value.lastName}`
                                                            :
                                                            `${value.firstName} ${value.lastName}`
                                                    }`}
                                                    secondary={`Id: ${value.id}`}

                                                />

                                                <ListItemSecondaryAction>
                                                    <Button  size={"small"} color={"default"}
                                                             variant={"outlined"}
                                                             style={{margin: "5px", background:"#f5f5f5", textTransform:"capitalize"}}
                                                            onClick={()=>CreateUser(value.id)}
                                                    >
                                                        Create User
                                                    </Button>
                                                    <IconButton
                                                        size={"small"}
                                                        edge="end"
                                                        aria-label="delete"
                                                        style={{margin: "5px", border:"1px solid"}}
                                                         onClick={() => {
                                                             setEditDialog({
                                                                 ...editDialog,
                                                                 open: true,
                                                                 schoolId: SelectedSchool.id
                                                             })
                                                            dispatch(getLecturer(value.id ,credential.username, credential.password))
                                                         }}

                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        size={"small"}
                                                        edge="end"
                                                        aria-label="delete"
                                                        style={{margin: "5px", border:"1px solid"}}
                                                         onClick={() => {
                                                             handleDeleteLecturer(value.id)
                                                         }}
                                                    >
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>


                                        </>
                                    )
                                })
                            }
                        </List>

                    </Typography>
                </Grid>
            )


        }

        if (school.error !== "") {
            return <p>{school.error}</p>
        }


        return <p>Unable to get Data</p>
    }

};

export default ALecturer;