import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash"
import {setLoginAsOpen} from "../Services/LoginAs/LoginAsAction";
import {setAuth} from "../Services/AuthApi/AuthApiAction";
import store from "../Services/Store";
const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;
    const user = JSON.parse(localStorage.getItem("user"));
    // const user = useSelector(store => store.user.data)
    const dispatch = useDispatch()
    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
        console.log(value)
        dispatch(setAuth(user.active,value))
        localStorage.setItem('user_type', value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Login As</DialogTitle>
            <List>
                { user!==null?
                    user.roles.map((roles) => (
                    <ListItem button onClick={() => handleListItemClick(roles.role)} key={roles.role}>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={roles.role} />
                    </ListItem>
                )):<></>
                }
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function LoginAs(props) {
    const LoginAsOpen = useSelector(state => state.LoginAsOpen.data)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    useEffect(() => {
        setOpen(LoginAsOpen.open)
    })

    const handleClose = (value) => {
        // setOpen(false);
        dispatch(setLoginAsOpen(false))
        console.log(open)
        setSelectedValue(value);
    };

    return (
        <div>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}
