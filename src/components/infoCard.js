import React from 'react';
import {Card, CardActions, CardContent, Typography} from "@material-ui/core";
import classIcon from "../Images/card_classes.svg";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({

    card: {
        background: "#00C0EF",
        position: "relative",
        "& h5": {
            color: "#E8EDF5",
            fontWeight: "bold"
        },
        "& p": {
            color: "#E8EDF5",
            fontSize: "12px"
        },
        "& a": {
            color: "#E8EDF5",
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
        background: "#00ADD8",
        marginTop: "10px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
    },
});


const InfoCard = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={`${classes.card}`} style={{background:`${props.contentBgColor}`}}>
                <CardContent className={classes.card_content}>
                    <Typography component={"div"} className={classes.content_info}>
                        <Typography component={"h5"} variant={"h5"} className="card_count">
                            {props.number}
                        </Typography>
                        <Typography component={"p"} className="card_title">
                            {props.title}
                        </Typography>
                    </Typography>
                    <Typography component={"img"} className={classes.card_icon} src={props.icon} alt={""}/>
                </CardContent>
                <CardActions className={classes.cardAction} style={{background:`${props.bottomBgColor}`}}>
                    <Typography component={"a"} href="#">More info &rarr;</Typography>
                </CardActions>

            </Card>
        </div>
    );
};

export default InfoCard;