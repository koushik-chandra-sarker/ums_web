import React, {useEffect, useRef, useState} from 'react';
import {Grid} from "@material-ui/core";
import ContentHeader from "../ContentHeader";
import {makeStyles} from "@material-ui/core/styles";
import InfoCard from "../infoCard";
import students1 from "../../Images/card_student_1.svg"
import students2 from "../../Images/card_student_2.svg"
import Table from "../Table";
import StdModal from "../Common/StdModal";


const useStyles = makeStyles({
    content_header: {
        padding: "20px 0 20px 0",
        color: "#867aee",
    },
});



const TStudents = (props) => {

    const classes = useStyles();
    const childRef = useRef();

    const [stdId,setStdId] = useState()
    const StdDialogControl =(id)=>{
       /* childRef.current.handleClickOpen()
        setStdId(id)*/
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid xs={12} className="">
                    <ContentHeader
                        title="Students"
                        style={classes.content_header}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InfoCard
                        number={50}
                        title="Total student under your Advise"
                        icon={students1}
                        /* contentBgColor={"red"}
                         bottomBgColor={"green"}*/

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InfoCard
                        number={50}
                        title="Total student on your Classes"
                        icon={students2}
                        contentBgColor={"#dd4c39"}
                        bottomBgColor={"#c74432"}

                    />
                </Grid>
                <Grid item xs={12}>
                    {/*{props.studentData.error ?
                     alert(props.studentData.error):

                    }*/}
                    <Table
                        // column={tableColumn}
                        // tableData={tableData}
                        action={StdDialogControl}
                    />
                </Grid>

            </Grid>
        </>
    );
};



export default TStudents;