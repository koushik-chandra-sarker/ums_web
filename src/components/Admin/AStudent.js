import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {Box, Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useDispatch, useSelector} from "react-redux";
import {addSchool, dropSchool, getSchoolList} from "../Services/School/SchoolAction";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import _ from "lodash"
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import StdModal from "../Common/StdModal";
import CircularProgress from "@material-ui/core/CircularProgress";
import {dropProgramme, getProgramme, getProgrammeList} from "../Services/Programme/ProgrammeAction";
import '../../css/table.css'

import StTable from "./StTable";
import AddStudentForm from "./AddStudentForm";

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



export const EditStudentContext = React.createContext();
const AStudent = () => {

    const classes = useStyles();
    const programmeList = useSelector(store => store.ProgrammeList.data)
    const programme = useSelector(store => store.Programme)
    const credential = JSON.parse(localStorage.getItem("credential"))
    const dispatch = useDispatch();

    const [SelectedProgramme, setSelectedProgramme] = useState({
        code: `${!_.isEmpty(programmeList)?programmeList[0].code:''}`
    });

    useEffect(() => {
        dispatch(getSchoolList(credential.username, credential.password))
    }, [])




    function getData(id) {
        dispatch(getProgramme(id, credential.username, credential.password))
    }



    function refresh() {
        dispatch(getProgrammeList(credential.username, credential.password))
    }

    const campus = useSelector(store => store.Campus)
    console.log(campus)


    return (
        <div className={classes.root}>
            <StdModal/>

            <Grid container spacing={3}>
                <Grid item xs={12} spacing={3} container justify={"space-between"} alignItems={"center"}>
                    <ContentHeader
                        title="Students"
                        style={classes.content_header}
                    />
                    <IconButton style={{border: "1px solid"}} onClick={refresh} color="secondary" aria-label="Refresh">
                        <RefreshIcon/>
                    </IconButton>
                    <Grid item xs={12}>
                        <Typography component={"div"} className={classes.card}
                                    style={{paddingRight: "40px"}}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Select Programme</InputLabel>
                                <Select
                                    native
                                    value={SelectedProgramme.code}
                                    onChange={(e) => {
                                        setSelectedProgramme({...SelectedProgramme, code: e.target.value});
                                        getData(e.target.value)
                                    }}
                                    label="Select Programme"
                                >
                                    <option aria-label="None" value=""/>
                                    {
                                        !_.isEmpty(programmeList) ?
                                            programmeList.map(value => {
                                                return (
                                                    <option value={value.code}>{`${value.title} (${value.code})`}</option>
                                                )
                                            }) :
                                            <option value={''}>No record found</option>
                                    }

                                </Select>
                            </FormControl>

                            <Typography component={"div"} className={classes.content}>

                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    {showProgrammes()}

                                </FormControl>
                            </Typography>


                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <AddStudentForm programmeCode={SelectedProgramme.code}/>
                    </Grid>

                </Grid>

            </Grid>
        </div>
    );


    function showProgrammes() {
        if (programme.loading) {
            return (
                <>
                    <Grid container item justify={"center"} alignItems={"center"}>
                        <CircularProgress color="secondary"/>
                    </Grid>
                </>
            )

        }
        if (_.isEmpty(programme.data)) {
            return <p>No records found</p>
        }
        if (!_.isEmpty(programme.data)) {
            return (

                <StTable Students={programme.data.students} programmeCode={programme.data.code}/>
            )


        }

        if (programme.error !== "") {
            return <p>{programme.error}</p>
        }


        return <p>Unable to get Data</p>
    }

};

export default AStudent;