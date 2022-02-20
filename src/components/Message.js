import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {setMessage} from "../store/actions";
import {SUCCESS_MESSAGE} from "../consts/Consts";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Message(){

    const {message} = useSelector(state => state.settingsReducer);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setOpen(true);

        setTimeout(()=>{
            dispatch(setMessage("", SUCCESS_MESSAGE));
        },1000)

    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
        <Snackbar open={open}
                  anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                  autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.type}>
                {message.text}
            </Alert>
        </Snackbar>
    )
}

export default Message;