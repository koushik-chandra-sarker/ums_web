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
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import {useDispatch, useSelector} from "react-redux";
import {addCampus, dropCampus, getCampusList} from "../Services/Campus/CampusAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import {toast} from "react-toastify";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import swal from "sweetalert";
import EditCampusModal from "./EditCampusModal";

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
    listRoot: {
        background: "#f5f5f5",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "8px",
        height: "calc(100vh - 250px)",
        overflow: "scroll",
        padding: "0 20px 20px 20px",

    },
    formHeader: {
        color: "#858484",
        paddingTop: "40px",
        paddingBottom: "40px"

    },
    formControl: {
        margin: "12px"
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
export const openEditDialogContext = React.createContext();
const ACampus = () => {
    const classes = useStyles();
    const campusList = useSelector(store => store.CampusList.data)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();

    const [openEditDialog,setOpenEditDialog] =useState({
        open:false,
        cid:null,
        cName:"",
        cAddress:""
    })

    const [campus, setCampus] = useState({
        name: "",
        address: ""
    });

    function refresh() {

        dispatch(getCampusList(credential.username, credential.password))
    }

    function deleteCampus(id) {
        dropCampus(id, credential.username, credential.password)
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

    function handleAddCampus() {
        if (campus.name === "" || campus.address === "") {
            toast.error("Something want wrong!")
        } else {
            addCampus(campus, credential.username, credential.password)
                .then(r => {
                    if (r === 200) {
                        toast("Campus Added Successful.")
                        dispatch(getCampusList(credential.username, credential.password))
                        setCampus({...campus,name:"",address: ""})
                    }
                })
                .catch(reason => {
                    swal(reason.message)
                })
        }

    }

    return (
        <div className={classes.root}>
            <openEditDialogContext.Provider value={{openEditDialog,setOpenEditDialog}}><EditCampusModal/></openEditDialogContext.Provider>
            <Grid container spacing={3}>
                <Grid item xs={12} spacing={3} container justify={"space-between"} alignItems={"center"}>
                    <ContentHeader
                        title="Campus"
                        style={classes.content_header}
                    />
                    <IconButton style={{border: "1px solid"}} onClick={refresh} color="secondary" aria-label="Refresh">
                        <RefreshIcon/>
                    </IconButton>
                    <Grid item sm={12} lg={8}>
                        <List className={classes.listRoot}
                              subheader={<ListSubheader>Course List</ListSubheader>}
                        >
                            {
                                campusList ?
                                    campusList.map((value) => {
                                        return (
                                            <>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar src={campus}/>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={value.name}
                                                                  secondary={`Address: ${value.address}`}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            edge="end" aria-label="delete"
                                                                    style={{marginRight: "10px"}}
                                                            onClick={()=>{setOpenEditDialog({
                                                                ...openEditDialog,
                                                                open:true,
                                                                cid:value.id,
                                                                cName:value.name,
                                                                cAddress:value.address
                                                            })}}

                                                        >
                                                            <EditIcon/>
                                                        </IconButton>
                                                        <IconButton edge="end" aria-label="delete"
                                                                    onClick={() => {
                                                                        deleteCampus(value.id)
                                                                    }}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>

                                            </>
                                        )
                                    })
                                    :
                                    <>No Record Found</>
                            }


                        </List>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                        <Typography component={"div"} className={classes.listRoot}>
                            <Box className={classes.formBox}>
                                <Typography className={classes.formHeader} component="h4" align="center" variant="h4">Add
                                    new Campus</Typography>
                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Campus name"
                                        variant="outlined"
                                        value={campus.name}
                                        onChange={(e) => {
                                            setCampus({...campus, name: e.target.value});
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Campus address"
                                        variant="outlined"
                                        value={campus.address}

                                        onChange={(e) => {
                                            setCampus({...campus, address: e.target.value});
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth className={classes.formControl}>
                                    <Button variant="outlined" className={classes.formButton}
                                            onClick={
                                                handleAddCampus
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

export default ACampus;