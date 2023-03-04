import {useEffect, useState} from "react";
import {BASE_URL} from "../../../base_url";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, TextField, Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";


const CancelSubDialog = (props) => {
    const {openDialog, onClose} = props;

    const CancelSubscription = () => {
        fetch(BASE_URL() + 'subscriptions/plans/cancel/', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))
    };

    return (
        <>
            <Dialog open={openDialog} onClose={onClose}>
                <DialogTitle>Cancel Subscription?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel your subscription for the next billing period?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={() => onClose()}>Cancel</Button>
                    <Button variant='contained' onClick={() => {
                        CancelSubscription();
                        onClose();
                        window.location.reload()
                    }}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


const UpdateCardDialog = (props) => {
    const {openDialog, onClose} = props;

    const [number, setNumber] = useState('');
    const [holder, setHolder] = useState('');
    const [cvv, setCvv] = useState('');

    // send POST request to the server for update.
    const handleSubmit = (event) => {
        fetch(BASE_URL() + 'subscriptions/cardinfo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('tfc_token'),
            },
            body: JSON.stringify({
                'number': number,
                'holder': holder,
                'cvv': cvv
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))

        onClose();
    };



    return (
        <>
            <Dialog open={openDialog} onClose={onClose}>
                <DialogTitle>Update Credit/Debit Card</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your next payment will be billed to the Credit/Debit Card below.
                    </DialogContentText>

                    <TextField value={number} onChange={(e) => setNumber(e.target.value)} autoFocus variant="standard" type='text' id='number' label='Card Number' required fullWidth/>
                    <TextField value={holder} onChange={(e) => setHolder(e.target.value)} type='text' id='holder' label='Holder Name' required fullWidth/>
                    <TextField value={cvv} onChange={(e) => setCvv(e.target.value)} type='text' id='cvv' label='CVV' required fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


const UpcomingPayment = () => {
    const [info, setInfo] = useState({});
    const [fetchSuccess, setFetchSuccess] = useState(false);

    const [openCancelSub, setOpenCancelSub] = useState(false);
    const [openUpdateCard, setOpenUpdateCard] = useState(false);

    const handleCancelSubOpen = () => {
        setOpenCancelSub(true);
    };
    const handleCancelSubClose = () => {
        setOpenCancelSub(false);
    };

    const handleUpdateCardOpen = () => {
        setOpenUpdateCard(true);
    };
    const handleUpdateCardClose = () => {
        setOpenUpdateCard(false);
    };


    let navigate = useNavigate();
    const handleUpdateCard = () => {
        navigate('/update-card');
    }
    const handleSubscribe = () => {
        navigate('/plans');
    };

    useEffect(() => {
        fetch(BASE_URL() + 'subscriptions/transactions/upcoming', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setFetchSuccess(true);
                }
                return response.json();
            })
            .then((data) => {
                setInfo(data);
            })
            .catch((reason) => console.log(reason))
    }, []);


    // console.log(fetchSuccess);

    return (
        <>
            <Card sx={{backgroundColor: '#ffa258'}}>
                <CardContent>
                    {fetchSuccess ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant={"h5"}>
                                        ${info.amount} due on {info.datetime}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={handleUpdateCardOpen}>Update Card</Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant={'outlined'} onClick={handleCancelSubOpen}>Cancel
                                        Subscription</Button>
                                </Grid>
                            </Grid>
                        </>

                        :
                        <Typography variant={"h5"}>
                            No upcoming payments
                            <Button variant={'outlined'} onClick={handleSubscribe}>Subscribe</Button>
                        </Typography>
                    }

                </CardContent>
            </Card>


            <CancelSubDialog
                openDialog={openCancelSub}
                onClose={handleCancelSubClose}>
            </CancelSubDialog>
            <UpdateCardDialog
                openDialog={openUpdateCard}
                onClose={handleUpdateCardClose}>
            </UpdateCardDialog>

        </>
    );
}

// export default UpcomingPayment