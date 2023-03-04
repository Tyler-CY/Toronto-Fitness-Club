import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    Typography, Divider, CardHeader
} from "@mui/material";
import {useState} from "react";
import {BASE_URL} from "../base_url";
import {useNavigate} from "react-router-dom";
import StarIcon from '@mui/icons-material/StarBorder';

const SuccessDialog = (props) => {
    const navigate = useNavigate();

    const {openDialog, onClose, successMessage} = props;

    return (<Dialog open={openDialog} onClose={onClose}>
        <DialogTitle>Success!</DialogTitle>
        <DialogContent>
            <DialogContentText>Success! {successMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={() => {
                navigate('/payments')
            }}
            >Payments</Button>
            <Button variant='contained' onClick={() => onClose()}>Close</Button>
        </DialogActions>

    </Dialog>);
}

const ConfirmDialog = (props) => {
    const {openDialog, onClose, planName, planId} = props;

    const [success, setSuccess] = useState(false);


    const handleSuccessClose = () => {
        setSuccess(false);
    };

    const Subscribe = () => {
        fetch(BASE_URL() + 'subscriptions/plans/' + planId + '/subscribe/', {
            method: 'POST', headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setSuccess(true)
                }
                return response.json()
            })
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))
    };

    return (<>
        <Dialog open={openDialog} onClose={onClose}>
            <DialogTitle>Subscribe to Plan - {planName}?</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to subscribe to Plan - {planName}?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={() => onClose()}>Cancel</Button>
                <Button variant='contained' onClick={() => {
                    Subscribe();
                    onClose();
                }}>Confirm</Button>
            </DialogActions>
        </Dialog>

        <SuccessDialog
            openDialog={success}
            onClose={handleSuccessClose}
            successMessage={'Check Payment page for details.'}
        >
        </SuccessDialog>
    </>);
}


const PlanCard = (props) => {

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };


    if (props.data.name === 'VIP') {
        return (
            <Card sx={{border: '2px solid black'}}>

                <CardHeader title={props.data.name} titleTypographyProps={{align: 'center', variant: 'h1'}}
                            subheader={props.data.name === 'VIP' ? 'Most Popular' : null}
                            action={props.data.name === 'VIP' ? <StarIcon/> : null}
                            subheaderTypographyProps={{
                                align: 'center', variant: 'h3'
                            }}/>


                <CardContent>
                    <Grid container direction='row' justifyContent="center" alignItems="center">
                        <Grid item xs={6}>
                            <CardMedia height='auto' width='auto' component='img' image={props.data.image}
                                       alt='Studio Image'/>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant={'h4'} align="center">
                                ${props.data.price} per {props.data.interval.substring(0, props.data.interval.indexOf(' '))} days
                            </Typography>
                            <Divider sx={{mb: 2, mt: 2}}/>
                            <ul style={{listSTyleType: 'none', "padding": '0', 'margin': '0'}}>
                                {props.data.features.map((line) => (
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        key={line}
                                    >
                                        {line}
                                    </Typography>
                                ))}
                            </ul>
                            <CardActions align="center" sx={{display: 'flex'}}>
                                <Button fullWidth variant={'contained'} onClick={handleOpen}>Subscribe</Button>
                            </CardActions>
                        </Grid>
                    </Grid>

                </CardContent>

                <ConfirmDialog
                    openDialog={openDialog}
                    onClose={handleClose}
                    planName={props.data.name}
                    planId={props.data.id}>
                </ConfirmDialog>
            </Card>
        );
    }


    return (
        <Card sx={{border: '2px solid black'}}>

            <CardHeader title={props.data.name} titleTypographyProps={{align: 'center', variant: 'h2',}}
                        subheader={props.data.name === 'VIP' ? 'Most Popular' : null}
                        action={props.data.name === 'VIP' ? <StarIcon/> : null}
                        subheaderTypographyProps={{
                            align: 'center', variant: 'h6',
                        }}/>

            <CardMedia height='auto' width='auto' component='img' image={props.data.image} alt='Studio Image'/>
            <CardContent>
                <Typography variant={'h4'} align="center">
                    ${props.data.price} per {props.data.interval.substring(0, props.data.interval.indexOf(' '))} days
                </Typography>

                <Divider sx={{mt: 1, mb: 1}}/>
                <ul style={{listSTyleType: 'none', "padding": '0', 'margin': '0'}}>
                    {props.data.features.map((line) => (
                        <Typography
                            variant="h6"
                            align="center"
                            key={line}
                        >
                            {line}
                        </Typography>
                    ))}
                </ul>
            </CardContent>
            <CardActions align="center" sx={{display: 'flex'}}>
                <Button fullWidth variant={'contained'} onClick={handleOpen}>Subscribe</Button>
            </CardActions>
            <ConfirmDialog
                openDialog={openDialog}
                onClose={handleClose}
                planName={props.data.name}
                planId={props.data.id}>
            </ConfirmDialog>
        </Card>
    );


}

export default PlanCard