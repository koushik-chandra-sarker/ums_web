import React, {useState} from 'react';
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
import schoolIcon from "../../Images/school2.svg"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {useDispatch, useSelector} from "react-redux";
import {getCampusList} from "../Services/Campus/CampusAction";
import {addSchool, dropSchool} from "../Services/School/SchoolAction";
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
export const EditSchoolContext = React.createContext();
const ASchool = () => {
    const classes = useStyles();
    const campusList = useSelector(store => store.CampusList.data)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [school, setSchool] = React.useState({
        name: '',
        campus: {
            id: ''
        }
    });
    const [editDialog,setEditDialog] =useState({
        open:false,
        sid:null,
        sName:"",
        campus:{
            id:'',
            name:''
        }
    })
    // console.log(editDialog)
    const handleChange2 = (event) => {
        setSchool({
            ...school,
            campus: {id: event.target.value}
        });

    };
    const handleChange = (panel, cSsn) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        dispatch(fetchALLStudentCourseByCSsn(cSsn, credential.username, credential.password))
    };


    function refresh() {

        dispatch(getCampusList(credential.username, credential.password))
    }


    function addSchoolFunc() {
        if (school.name === "" || school.campus.id === "") {
            toast.error("Something want wrong!")
        } else {
            addSchool(school, credential.username, credential.password)
                .then(r => {
                    if (r === 200) {
                        toast("School Added Successful.")
                        dispatch(getCampusList(credential.username, credential.password))
                        setSchool({
                            ...school, name: "", campus: {id: ''}
                        })
                    }
                })
                .catch(reason => {
                    swal(reason.message)
                })
        }
    }

    function handleDeleteSchool(id) {
        console.log(id)
        dropSchool(id, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    toast("Campus Dropped Successful.");
                    dispatch(getCampusList(credential.username, credential.password))
                }
            })
            .catch(reason => {
                swal(reason.message)
            })
    }

    return (
        <div className={classes.root}>
            <EditSchoolContext.Provider value={{editDialog,setEditDialog}}> <EditSchoolDialog/> </EditSchoolContext.Provider>
            <Grid container spacing={3}>
                <Grid item xs={12} spacing={3} container justify={"space-between"} alignItems={"center"}>
                    <ContentHeader
                        title="School"
                        style={classes.content_header}
                    />
                    <IconButton style={{border: "1px solid"}} onClick={refresh} color="secondary" aria-label="Refresh">
                        <RefreshIcon/>
                    </IconButton>
                    <Grid item sm={12} lg={8}>
                        <Typography component={"div"} className={classes.card} style={{overflow: "scroll",}}>
                            {
                                campusList !== null ?
                                    campusList.map((value, index) => {
                                        return (
                                            <>
                                                <Accordion expanded={expanded === `panel${index + 1}`}
                                                           className={classes.paper}
                                                           onChange={handleChange(`panel${index + 1}`, value.id)}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon/>}
                                                        aria-controls="panel1bh-content"
                                                        id="panel1bh-header"
                                                    >
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={6}>
                                                                <Typography
                                                                    className={classes.heading}>{value.name}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    {
                                                                        value.address
                                                                    }
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Grid item xs={12}>
                                                            <Typography className={classes.courseInfo}>

                                                                <List className={classes.listRoot}
                                                                      subheader={<ListSubheader>School
                                                                          List</ListSubheader>}
                                                                >
                                                                    {
                                                                        !_.isEmpty(value.school) ?
                                                                            value.school.map((v, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <ListItem>
                                                                                            <ListItemAvatar>
                                                                                                <Avatar
                                                                                                    src={schoolIcon}/>
                                                                                            </ListItemAvatar>
                                                                                            <ListItemText
                                                                                                primary={v.name}
                                                                                                secondary={`School id: ${v.id}`}/>
                                                                                            <ListItemSecondaryAction>
                                                                                                <IconButton
                                                                                                    edge="end"
                                                                                                    aria-label="delete"
                                                                                                    style={{marginRight: "10px"}}
                                                                                                    onClick={()=>{setEditDialog({
                                                                                                        ...editDialog,
                                                                                                        open:true,
                                                                                                        sid:v.id,
                                                                                                        sName:v.name,
                                                                                                        campus: {
                                                                                                            id: value.id,
                                                                                                            name:value.name
                                                                                                        }
                                                                                                    })}}

                                                                                                >
                                                                                                    <EditIcon/>
                                                                                                </IconButton>
                                                                                                <IconButton edge="end"
                                                                                                            aria-label="delete"
                                                                                                            onClick={() => {
                                                                                                                handleDeleteSchool(v.id)
                                                                                                            }}
                                                                                                >
                                                                                                    <DeleteIcon/>
                                                                                                </IconButton>
                                                                                            </ListItemSecondaryAction>
                                                                                        </ListItem>

                                                                                    </>
                                                                                )
                                                                            })
                                                                            :

                                                                            <Grid container item justify={"center"}>
                                                                                <h5>No Record Found</h5>
                                                                            </Grid>

                                                                    }


                                                                </List>

                                                            </Typography>
                                                        </Grid>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </>
                                        )
                                    })
                                    :
                                    <>No courses has registered.</>
                            }

                        </Typography>

                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <Typography component={"div"} className={classes.card} style={{overflow: "scroll",}}>
                            <Box className={classes.formBox}>
                                <Typography className={classes.formHeader} component="h4" align="center" variant="h4">
                                    Add New School
                                </Typography>
                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="School name"
                                        variant="outlined"
                                        value={school.name}
                                        onChange={(e) => {
                                            setSchool({...school, name: e.target.value});
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="outlined-age-native-simple">Select Campus</InputLabel>
                                    <Select
                                        native
                                        value={school.campus.id}
                                        onChange={handleChange2}
                                        label="Select Campus"
                                        // inputProps={{
                                        //     name: 'id',
                                        //     id: 'outlined-age-native-simple',
                                        // }}
                                    >
                                        <option aria-label="None" value=""/>
                                        {
                                            !_.isEmpty(campusList) ?
                                                campusList.map(value => {
                                                    return (
                                                        <option value={value.id}>{value.name}</option>
                                                    )
                                                }) :
                                                <option value={''}>No record found</option>
                                        }

                                    </Select>
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Button variant="outlined" className={classes.formButton}
                                            onClick={
                                                addSchoolFunc
                                            }
                                    >
                                        Add
                                    </Button>
                                </FormControl>
                            </Box>
                        </Typography>
                    </Grid>

                </Grid>

            </Grid>
        </div>
    );
};

export default ASchool;