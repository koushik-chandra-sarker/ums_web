import React from 'react';
import {Typography} from "@material-ui/core";

const ContentHeader = (props) => {
    return (
        <Typography component="h1" align={"left"} variant={"h4"}
                    className={props.style}>
            {props.title}
        </Typography>
    );
};

export default ContentHeader;