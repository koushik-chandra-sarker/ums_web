import React, {useEffect, useState} from 'react';
import '../../css/table.css'
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {setModalControl} from "../Services/StdModelControl/StdModelControlAction";
import {dropStudent, fetchStudent} from "../Services/Student/StudentAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import credential from "../Common/Credential";
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import _ from 'lodash'
import {dropUser, getUserList} from "../Services/User/UserAction";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        boxShadow: "none",
        background: "#00C0EF",
        color: "#fff"
    },
    table:{
        '& tbody':{
            '& tr':{
                '&:nth-child(odd)':{
                    background: "#f1ebeb  !important"
                },
                '&:hover':{
                    background: "#a5cdd7" +
                        "  !important"
                }
            }
        }
    }
}));

const tableColumn = [
    "User Id",
    "Username",
    "Email",
    "Active status",
    "Roles",
    "Action"
]


const UserTable = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [editDialog, setEditDialog] = useState({
    //     open: false,
    //     programmeCode:props.programmeCode
    //
    // })


    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const rowEvent = (id) => {
        // dispatch(setModalControl(true,id))
        // const credential = JSON.parse(localStorage.getItem("credential"))
        // dispatch(fetchStudent(id,credential.username,credential.password))

        swal("We are working in this action.")
    }
    const ShowPopover = ()=>{
        return(
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>Double click to show Details</Typography>
            </Popover>
        )
    }



    function handleDeleteStdUser(id) {
        dropUser(id, credential.username, credential.password)
            .then(r  =>{
                if (r===200){
                    toast("User Successfully Dropped.");
                    dispatch(getUserList(credential.username, credential.password))
                }
            })
    }

    return (
        <div className="table_main">
            {/*<EditStudentContext.Provider value={{editDialog, setEditDialog}}> <EditStudentDialog/>*/}
            {/*</EditStudentContext.Provider>*/}
            <table className={classes.table}>
                <thead>
                <tr>
                    {tableColumn.map((value, index) => {
                        return (
                            <th style={{background:"#ffffff",color:"#151515"}}>{value}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                <div className="massage">more info</div>
                {props.users.map((value, index) => {
                    return (
                        <>
                            <tr
                                onDoubleClick={() => {
                                    rowEvent(value.id)
                                }}
                                aria-owns={open ? 'mouse-over-popover' : undefined}
                                aria-haspopup="true"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            >
                                {ShowPopover()}
                                <td data-label="Id">{value.id}</td>
                                <td data-label="Name">{value.username}</td>
                                <td data-label="Email">{value.email}</td>
                                <td data-label="Active status">{`${value.active}`}</td>
                                <td data-label="Roles">
                                    {
                                        !_.isEmpty(value.roles)?value.roles.map((v)=>{
                                            return(
                                                <>
                                                    {v.role}
                                                    <br/>
                                                </>
                                            )
                                        })
                                            :
                                            <></>
                                    }
                                </td>
                                <td data-label="Action">
                                    <IconButton
                                        size={"small"}
                                        edge="end"
                                        aria-label="delete"
                                        style={{margin: "5px", background:"#f5f5f5"}}

                                        // onClick={event => {
                                        //     setEditDialog({
                                        //         ...editDialog, open: true
                                        //     })
                                        //     dispatch(fetchStudent(value.id, credential.username, credential.password))
                                        // }}

                                    >
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        size={"small"}
                                        edge="end"
                                        aria-label="delete"
                                        color={"secondary"}
                                        style={{ margin: "5px", background:"#f5f5f5"}}
                                        onClick={() => {
                                            handleDeleteStdUser(value.id)
                                        }}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>

                                </td>
                            </tr>


                        </>
                    )
                })}


                </tbody>

            </table>

        </div>
    );
};



export default UserTable;