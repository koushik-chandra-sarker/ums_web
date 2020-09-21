import React, {useState} from 'react';
import {Grid, Typography, Icon} from "@material-ui/core";
import logo from "../Images/seu-logo.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "../css/sideNav.css"
import {NavLink} from "react-router-dom"


const SideNav = (props) => {
    const [arrowActive, setArrowActive] = useState(false)

    return (
        <Typography component="div" className={arrowActive ? "wrapper active " : "wrapper"}>
            <Grid container>
                <Typography component="div" align="left" className="sidebar_menu">
                    <Typography align={"left"} component={"div"} className={"main-logo"}>
                        <img src={logo} alt=""/>
                    </Typography>
                    <span className="hr1"> </span>
                    <div className="hamburger" onClick={() => {
                        arrowActive ? setArrowActive(false) : setArrowActive(true)
                    }}>
                        <div className="inner_hamburger">
                            <span className="arrow">
                                <ArrowBackIcon className="backArrow" style={{display: "none"}}/>
                                <ArrowForwardIcon className="forwardArrow"/>
                            </span>
                        </div>
                    </div>

                    <Typography component="div" className="sidebar_menu_content">
                        <ul>

                            {props.menu.map(value => {
                                return (
                                    <li key={value.id}>
                                        <NavLink to={value.link} activeClassName="active" underline={"none"}

                                        >
                                    <span className="icon">
                                        <Icon> <img src={value.logo} alt="icon"/> </Icon>
                                    </span>
                                            <span className="list">{value.title}</span>
                                        </NavLink>
                                    </li>
                                )
                            })}

                        </ul>
                    </Typography>


                </Typography>
            </Grid>
        </Typography>
    );
};

export default SideNav;