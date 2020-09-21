import React, {useState} from 'react';
import {Paper, Grid, colors,Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1, 0),
        boxShadow: "3px 3px 3px #e5e5e5, -3px -3px 5px #ffffff",
        background:"#f5f5f5",
    },
    title:{
        padding:"10px",
        textAlign:"center",
        boxShadow: "0px 5px 10px #e9e9e5",
        fontSize:"16px",
        color:"#3D6CB9",
        borderTopLeftRadius:"10px",
        borderTopRightRadius:"10px",
    }
}));
const style = {

    height:"100%",
    paper: {
        background: "#f5f5f5",
        height:"100%",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius:"10px"
    }

}


const data1 =[
    {
        id:1,
        CourseCode:"ACT1021",
        CourseTitle:"Introduction to Accounting"
    },
    {
        id:3,
        CourseCode:"CSE1011",
        CourseTitle:"Programming Language I (C)"
    },
    {
        id:4,
        CourseCode:"CSE1012",
        CourseTitle:"Programming Language I (C) Lab"
    },
    {
        id:5,
        CourseCode:"CSE1013",
        CourseTitle:"Computer Fundamentals"
    },
    {
        id:6,
        CourseCode:"CSE1021",
        CourseTitle:"Discrete Mathematics"
    }
]

const data2 =[
    {
        id:7,
        CourseCode:"CSE1031",
        CourseTitle:"Numerical Methods"
    },
    {
        id:8,
        CourseCode:"CSE1033",
        CourseTitle:"Data Structure"
    }
]

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}
function intersection(a, b) {
    return a.filter((value)=> b.indexOf(value) !== -1);
}

const TransferList = () => {
    const [data_1, setData_1] = useState(data1);
    const [data_2, setData_2] = useState(data2);

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);

    const [left, setLeft] = React.useState(data1.map(value => value.id));
    const [right, setRight] = React.useState(data2.map(value => value.id));
    const leftChecked = intersection(checked,left);
    const rightChecked = intersection(checked,right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    // console.log(leftChecked)
    // console.log(rightChecked)
    // console.log(checked)

    const handleCheckedRight =()=>{

       /* setData_1(prevState =>  prevState.filter(function(value) {
            return !this.has(value.id);
        }, new Set(leftChecked.map(value => value))));
        console.log(data_1)*/
        setData_2(prevState => prevState.concat(data_1.filter(value => leftChecked.map(val => val).includes(value.id))))
        setData_1(prevState =>  prevState.filter(value => !leftChecked.map(val => val).includes(value.id)));
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    // setInterval(()=> console.log(data_1), 2000)
    const handleCheckedLeft = ()=>{
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const customList = (data,title)=>(
        <Typography component={"div"} style={style.paper}>
            <Typography className={classes.title}     component={"div"} >
                {title}
            </Typography>
            <List>
                {data.map((value,index) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                        <ListItem key={index} dense button onClick={handleToggle(value.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value.id) !== -1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.CourseCode}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </Typography>
    );



    return (

        <div style={style}>
            <Grid container spacing={3} justify={"center"} style={{height:"100%"}}>
                <Grid item md={5} >
                    {customList(data_1,"Registered Courses")}
                </Grid>
                <Grid item>
                    <Grid container direction={"column"} alignItems={"center"} justify={"center"} style={{height:"100%"}}>
                    <Button

                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button

                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    </Grid>
                </Grid>
                <Grid item md={5} >
                    {customList(data_2,"All Courses")}
                </Grid>
            </Grid>

        </div>
    );
};

export default TransferList;