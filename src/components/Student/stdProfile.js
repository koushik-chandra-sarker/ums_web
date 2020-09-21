import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import AcademicInfo from "./AcademicInfo";
import Parents from "./Parents";
import GradeInfo from "./GradeInfo";
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    tabBar: {
        flexGrow: 1,
        boxShadow: "3px 3px 3px #e5e5e5, -3px -3px 5px #ffffff",
        margin:"0 40px 15px 40px"
    },
    tabs:{
        boxShadow: "3px 3px 3px #e5e5e5, -3px -3px 5px #ffffff",
        margin:"0 40px 10px 40px",
        height:"85%",
        overflow:"scroll",
    },
    infoCard:{
        boxShadow: "inset 3px 3px 3px #e5e5e5, inset -3px -3px 5px #ffffff",
        padding:"12px 15px"
    },
    infoTitle:{
        fontSize:"16px",
        color:"#226089"
    },
    infoSubtitle:{
        fontSize:"14px",
        color:"#4592af"
    }
});

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}


const StdProfile = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const student = useSelector(store => store.student.data);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Typography component={"div"} className={classes.tabBar}>
               {/* <IconButton color="secondary" aria-label="add an alarm" size={"small"} style={{position:"relative",top:"0px",right:"0"}}>
                    <ArrowBackIosIcon/>
                </IconButton>*/}
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                >
                    <LinkTab label="Personal" href="/personal" {...a11yProps(0)} />
                    <LinkTab label="Conducts" href="/contacts" {...a11yProps(1)} />
                    <LinkTab label="Parents" href="/parents" {...a11yProps(2)} />
                    <LinkTab label="Academic Information" href="/academic_info" {...a11yProps(3)} />
                    <LinkTab label="Grade Information" href="/grade_info" {...a11yProps(4)} />
                </Tabs>

            </Typography>
            <Typography component={"div"} className={classes.tabs}>
                {/*Personal info*/}
                <TabPanel value={value} index={0}>
                    <PersonalInfo person={student}/>
                </TabPanel>
                {/*Contuct*/}
                <TabPanel value={value} index={1}>
                    <Contact person={student}/>
                </TabPanel>
                {/*Parents info*/}
                <TabPanel value={value} index={2}>
                    <Parents/>
                </TabPanel>
                {/*Academic info*/}
                <TabPanel value={value} index={3}>
                    <AcademicInfo/>
                </TabPanel>
                {/*Grade info*/}
                <TabPanel value={value} index={4}>
                    <GradeInfo/>
                </TabPanel>
            </Typography>
        </>
    );
};

export default StdProfile;