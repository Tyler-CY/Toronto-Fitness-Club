import React, {useEffect, useState} from "react";
import {BASE_URL} from "../base_url";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, Card, CardContent, Typography, CardActions, Divider, CardMedia} from "@mui/material";
import StockStudioImage from "../../images/stock-class-image.png";
import StandardDialog from "../common/standard-dialog";


const SessionSummary = () => {

    const [studioClass, setStudioClass] = useState({});

    let navigate = useNavigate();
    const isNotLogin = localStorage.getItem('tfc_token') === null;

    const [searchParams, setSearchParams] = useSearchParams();

    // Use together
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('Subscription required. Navigate to Subscription page?');
    const [dialogContentText, setDialogContentText] = useState('');
    const [dialogConfirmAction, setDialogConfirmAction] = useState(() => () => {
    });
    const handleClose = () => {
        setOpenDialog(false);
    };
    // End of Use together


    const handleError = () => {
        setTimeout(() => {
        }, 500);
        setDialogTitle(`Error`);
        setDialogContentText(`Subscription Required. Navigate to Subscription page?`);
        setOpenDialog(true);
        setDialogConfirmAction(() => () => {
            navigate('/plans');
        });
    }

    useEffect(() => {
        fetch(BASE_URL() + 'services/classes/' + searchParams.get('class_id') + '/')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setStudioClass(data);
            })
            .catch((reason) => console.log(reason))
    }, []);


    const [dialogResponse, setDialogResponse] = useState('');
    const performClassAction = (class_id, addDrop) => {
        fetch(BASE_URL() + 'services/classes/' + class_id + '/' + addDrop + '/', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    return response.json()
                } else {
                    window.location.reload();
                }
            })
            .then((data) => {
                setDialogResponse(data);
            })
            .catch((reason) => console.log(reason))


        setOpenDialog(false);
        setTimeout(() => {
            if (addDrop === 'enrol') {
                handleError(dialogResponse);
            }

        }, 100)
    }


    const handleEnrolButton = () => {
        setDialogTitle(`Enrol in ${studioClass.name}`);
        setDialogContentText('Are you sure you want to enrol in all sessions?');
        setOpenDialog(true);
        setDialogConfirmAction(() => () => {
            performClassAction(studioClass.id, 'enrol');
        });
    }

    const handleDropButton = () => {
        setDialogTitle(`Drop ${studioClass.name}`);
        setDialogContentText('Are you sure you want to drop all sessions?');
        setOpenDialog(true);
        setDialogConfirmAction(() => () => {
            performClassAction(studioClass.id, 'drop');
        })
    }


    try {
        return (
            <>
                <Card sx={{
                    border: '2px solid black',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>

                    <div>
                        <CardMedia height='auto' width='auto' component='img'
                                   image={studioClass.image ?? StockStudioImage}
                                   alt='Studio Image'/>

                        <CardContent>
                            <Typography variant={'h4'} align="center">
                                {studioClass.name}
                            </Typography>
                            <Divider sx={{pt: 1, mb: 1}}/>
                            <Typography variant={'h6'} align="center">
                                {studioClass.studio.name}
                            </Typography>
                            <Divider sx={{pt: 1, mb: 1}}/>
                            <Typography variant={'subtitle1'} align="center">
                                Instructor: {studioClass.coach}
                            </Typography>
                            <Divider sx={{pt: 1, mb: 1}}/>
                            <Typography variant={'subtitle1'} align="center">
                                {studioClass.keywords.join(', ')}
                            </Typography>
                            <Divider sx={{pt: 1, mb: 1}}/>
                            <Typography variant={'subtitle1'} align="center">
                                {studioClass.description}
                            </Typography>
                            <Divider sx={{pt: 1, mb: 1}}/>

                        </CardContent>
                    </div>


                    <CardActions align="flex-end" sx={{display: 'flex',}}>
                        <Button fullWidth disabled={studioClass.user_status || isNotLogin} variant={'contained'}
                                onClick={handleEnrolButton}>Enrol</Button>
                        <Button fullWidth disabled={studioClass.user_status || isNotLogin} variant={'outlined'}
                                onClick={handleDropButton}>Drop</Button>
                    </CardActions>
                </Card>


                <StandardDialog
                    openDialog={openDialog}
                    onClose={handleClose}
                    title={dialogTitle}
                    contentText={dialogContentText}
                    onConfirm={dialogConfirmAction}/>

            </>
        );
    } catch (e) {
        return <></>
    }
}

export default SessionSummary;