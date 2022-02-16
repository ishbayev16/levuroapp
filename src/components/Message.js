import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Message(){

    const {message} = useSelector(state => state.settingsReducer);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
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
                  autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={message.type}>
                {message.text}
            </Alert>
        </Snackbar>
    )
}

export default Message;