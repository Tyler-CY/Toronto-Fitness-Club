import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {styled} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

import CommonStyles from "./common-styles";
import StandardDialog from "./standard-dialog";

const StyledAppBar = styled(AppBar)({
    backgroundColor: '#ffa159',
    opacity: 0.9
});


const StandardAppBar = () => {
    const styles = CommonStyles();


    // Use together
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContentText, setDialogContentText] = useState('');
    const [dialogConfirmAction, setDialogConfirmAction] = useState(() => () => {
    });
    const handleClose = () => {
        setOpenDialog(false);
    };
    // End of Use together


    const login = !!localStorage.getItem('tfc_token')

    let navigate = useNavigate();


    const handleLogout = () => {
        setDialogTitle(`Logout`);
        setDialogContentText('Are you sure you want to log out?');
        setOpenDialog(true);
        setDialogConfirmAction(() => () => {
            navigate('/logout');
        });
    }

    return (
        <><Box>
            <StyledAppBar position="static">
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box display={'inline-flex'} onClick={() => {
                        navigate('/')
                    }} sx={{cursor: 'pointer'}}>
                        <Typography variant="h6" sx={{
                            marginLeft: '8px',
                            flexGrow: 1, alignItems: 'center', display: 'flex',
                            fontFamily: 'Helvetica', fontSize: '20px', fontWeight: 'bold', color: '#000000'
                        }}>
                            Toronto Fitness Club
                        </Typography>
                    </Box>

                    <div>
                        {login ? (
                                <>
                                    <Button sx={styles.appbar_button} onClick={() => {
                                        navigate('/dashboard');
                                    }}>Account</Button>
                                    <Button sx={styles.appbar_button} onClick={() => {
                                        navigate('/studios/search');
                                    }}>Studio</Button>
                                    <Button sx={styles.appbar_button} onClick={() => {
                                        navigate('/classes/search');
                                    }}>Class</Button>
                                    <Button sx={styles.appbar_button} onClick={() => {
                                        navigate('/plans');
                                    }}>Plans</Button>
                                    <Button sx={styles.appbar_button} onClick={handleLogout}>Logout</Button>
                                </>
                            ) :
                            <>
                                <Button sx={styles.appbar_button} onClick={() => {
                                    navigate('/studios/search');
                                }}>Studio</Button>
                                <Button sx={styles.appbar_button} onClick={() => {
                                    navigate('/classes/search');
                                }}>Class</Button>
                                <Button sx={styles.appbar_button} onClick={() => {
                                    navigate('/plans');
                                }}>Plans</Button>
                                <Button sx={styles.appbar_button} onClick={() => {
                                    navigate('/login');
                                }}>Login</Button>
                                <Button onClick={() => {
                                    navigate('/register')
                                }}
                                        sx={[styles.appbar_button, {border: '1px solid #000000'}]}>Register</Button>
                            </>}

                    </div>

                </Toolbar>
            </StyledAppBar>
        </Box>
            <StandardDialog
                openDialog={openDialog}
                onClose={handleClose}
                title={dialogTitle}
                contentText={dialogContentText}
                onConfirm={dialogConfirmAction}/>
        </>

    )
}

export default StandardAppBar;