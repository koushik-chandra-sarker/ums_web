import React, {useContext, useEffect, useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {useDispatch, useSelector} from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {updateSchool} from "../Services/School/SchoolAction";
import {getCampusList} from "../Services/Campus/CampusAction";
import credential from "../Common/Credential";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {EditUserContext} from "./UserTable";
import _ from 'lodash'
import {getUserList, updateUser} from "../Services/User/UserAction";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";


const useStyles = makeStyles({


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
        },
        marginBottom: "40px"
    },
    formBox: {
        padding: "0 40px 0 20px"
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Roles = [
    {
        roleId: '',
        role: "ADMIN"
    },
    {
        roleId: '',
        role: "LECTURER"
    },
    {
        roleId: '',
        role: "STUDENT",
    }
]

const EditUserDialog = () => {
    const classes = useStyles();
    const openPro = useContext(EditUserContext);
    const dispatch = useDispatch();
    const user = useSelector(store => store.user1.data)
    const [user1, setUser1] = useState({})
    const [value, setValue] = React.useState([]);
    const [defaultRole, setDefaultRole] = useState([])
    useEffect(() => {
        setDefaultRole(openPro.editDialog.defaultRole)
        setUser1(prevState => user)
        if (!_.isEmpty(user.roles)) {
            setValue([user.roles.map(value => value)])

        }

    }, [user])
    const [checked, setChecked] = React.useState(false);

    const handleChecked = (event) => {
        setChecked(event.target.checked);

    };
    

    const handleClose = () => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            open: false,
        })
    };

    const handleChange2 = (event) => {
        openPro.setEditDialog({
            ...openPro.editDialog,
            campus: {id: event.target.value}
        });

    };


    function handleUpdateUser() {

        updateUser(user1, credential.username, credential.password)
            .then(r => {
                if (r === 200) {
                    openPro.setEditDialog({
                        ...openPro.editDialog,
                        open: false,
                    })
                    toast("User successfully updated.")
                    dispatch(getUserList(credential.username, credential.password))
                }
            })
            .catch(reason => {
                swal(reason.message)
            })
    }

    return (
        <React.Fragment>
            <Dialog
                open={openPro.editDialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <Grid container>
                    <Grid item container justify={"flex-end"} alignItems={"center"} style={{position: "relative"}}>
                        <IconButton color="secondary" aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item container justify={"center"}>
                        <Box className={classes.formBox}>
                            <Typography className={classes.formHeader} style={{paddingTop: "0"}} component="h4"
                                        align="center" variant="h4">
                                Edit User
                            </Typography>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="User Id"
                                    variant="outlined"
                                    disabled
                                    value={`${user1.id}`}

                                />
                            </FormControl>
                            <FormControl fullWidth className={classes.formControl}>
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    value={`${user1.username}`}
                                    disabled
                                />
                            </FormControl>
                            <FormControl fullWidth component="fieldset" className={classes.formControl}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={checked} onChange={handleChecked}/>}
                                        label="Check for update password"
                                    />
                                </FormGroup>
                            </FormControl>
                            {
                                checked ?
                                    <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"

                                            onChange={(e) => {
                                                setUser1({...user1, password: e.target.value})
                                            }}
                                        />
                                    </FormControl>
                                    :
                                    <></>
                            }


                            {
                                openPro.editDialog.open ?
                                    <>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <Autocomplete
                                                multiple
                                                limitTags={2}
                                                onChange={(event, newValue) => {
                                                    setValue([
                                                        ...newValue,
                                                    ]);
                                                    setUser1({...user1, roles: newValue})
                                                }}
                                                id="multiple-limit-tags"
                                                options={Roles}
                                                getOptionLabel={(option) => option.role}
                                                defaultValue={openPro.editDialog.defaultRole}
                                                renderInput={(params) => (
                                                    <TextField {...params} variant="outlined" label="limitTags"
                                                               placeholder="Add More"/>
                                                )}
                                            />
                                        </FormControl>
                                    </>
                                    :
                                    <></>
                            }

                            <Grid container justify={"center"}>
                                <Grid xs={6} item className={classes.formControl}>
                                    <Button fullWidth variant="outlined" className={classes.formButton}
                                            onClick={
                                                handleUpdateUser
                                            }
                                    >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
};

export default EditUserDialog;