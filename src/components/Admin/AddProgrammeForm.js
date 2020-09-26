import React, {useState} from 'react';
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import {useDispatch, useSelector} from "react-redux";
import {addProgramme} from "../Services/Programme/ProgrammeAction";
import credential from "../Common/Credential";
import {toast} from "react-toastify";
import swal from "sweetalert";
import {getCampus, getCampusList} from "../Services/Campus/CampusAction";
const useStyles = makeStyles((theme) => ({

    card: {
        background: "#f5f5f5",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "8px",
        height: "calc(100vh - 250px)",
        padding: "20px",
        overflow: "hidden"

    },

    formHeader: {
        color: "#858484",
        // paddingTop: "10px",
        paddingBottom: "10px"

    },
    formControl: {
        margin: "8px",
    },
    formButton: {
        marginTop: "15px",
        color: "#858484",
        "&:hover": {
            background: "#C8C7C7"
        }
    },
    formBox: {
        padding: "0 20px 0 0"
    }

}))
const AddProgrammeForm = (props) => {
    const classes = useStyles();
    const schoolList = useSelector(store => store.SchoolList.data)
    console.log(schoolList)
    const dispatch =useDispatch()
    const [programme, setProgramme] = useState(
        {code: '', title: '', label: '', length: '', school: {id: ''}}
    )
    const [selectedSchool, setSelectedSchool] = useState({
        id: ''
    });


    function handleSelectChange(e) {
        setSelectedSchool({...selectedSchool, id: e.target.value})
    }


    function addProgrammeFunc(e) {
        e.preventDefault()
        if (programme.code === "") {
            toast.error("Please fill the programme code")
        }else if (programme.title === "") {
            toast.error("Please fill the programme title")
        }else if (programme.label === "") {
            toast.error("Please fill the programme label")
        }else if (programme.length === "") {
            toast.error("Please fill the programme length")
        }else if (programme.school.id === "") {
            toast.error("Please select a school")
        } else {
            addProgramme(programme, credential.username, credential.password)
                .then(r => {
                    if (r === 200) {
                        toast("School Added Successful.")
                        dispatch(getCampus(props.campusId, credential.username, credential.password))
                        dispatch(getCampusList(credential.username, credential.password))
                        setSelectedSchool({
                            ...selectedSchool, id: ""
                        })
                        setProgramme({...programme,code: '', title: '', label: '', length: '', school: {id: ''}})
                    }
                })
                .catch(reason => {
                    swal(reason.message)
                })
        }
    }

    return (
        <Typography component={"div"} className={classes.card} style={{overflow: "scroll",}}>
            <Box className={classes.formBox}>
                <form>
                    <Typography className={classes.formHeader} component="h6" align="center" variant="h6">
                        Add New Programme
                    </Typography>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="outlined-basic"
                            label="Programme code"
                            variant="outlined"
                            required
                            value={programme.code}
                            onChange={(e) => {
                                setProgramme({...programme, code: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="outlined-basic"
                            label="Programme Title"
                            variant="outlined"
                            required
                            value={programme.title}
                            onChange={(e) => {
                                setProgramme({...programme, title: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="outlined-basic"
                            label="Label"
                            variant="outlined"
                            value={programme.label}
                            onChange={(e) => {
                                setProgramme({...programme, label: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <TextField
                            id="outlined-basic"
                            label="Length(Year)"
                            variant="outlined"
                            required
                            value={programme.length}
                            onChange={(e) => {
                                setProgramme({...programme, length: e.target.value});
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Select School</InputLabel>
                        <Select
                            native
                            value={selectedSchool.id}
                            onChange={(e) => {
                                handleSelectChange(e)
                                setProgramme({...programme, school: {id: e.target.value}});
                            }}
                            label="Select School"

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
                    <FormControl fullWidth className={classes.formControl}>
                        <Button type={"submit"} variant="outlined" className={classes.formButton}
                            onClick={
                                    addProgrammeFunc
                            }
                        >
                            Add
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </Typography>
    );
};

export default AddProgrammeForm;