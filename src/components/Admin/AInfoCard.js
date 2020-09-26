import React from 'react';
import {Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles({

    card: {
        background: "#f5f5f5",
        boxShadow: "5px 5px 8px #e9e9e5, -5px -5px 8px #ffffff",
        borderRadius: "8px",
        position: "relative",
        "& h5": {
            color: "#666666",
            fontWeight: "bold"
        },
        "& p": {
            color: "#666666",
            fontSize: "12px"
        },
        "& a": {
            color: "#666666",
            fontSize: "14px"
        },

    },
    card_content:{
        display:"flex",
        justifyContent:"space-between",
        
    },
    card_icon: {
        height: "50px",
        right: 0,
        padding:"0 20px",

    },
    cardAction: {
        background: "#c8c7c7",
        marginTop: "10px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
    },
});


const AInfoCard = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={`${classes.card}`} style={{background:`${props.contentBgColor}`}}>
                <CardContent className={classes.card_content}>
                    <Typography component={"div"} className={classes.content_info}>
                        <Typography component={"h5"} variant={"h5"} className="card_count">
                            {props.number}
                        </Typography>
                        <Typography component={"p"} className="card_title" >
                            {props.title}
                        </Typography>
                    </Typography>
                    <Typography component={"img"} className={classes.card_icon} src={props.icon} alt={""}/>
                </CardContent>
                <CardActions className={classes.cardAction} style={{background:`${props.bottomBgColor}`}}>
                    <Link to={props.link}><Typography component={"p"} >{props.actionTitle} &rarr;</Typography></Link>
                </CardActions>

            </Card>
        </div>
    );
};

export default AInfoCard;