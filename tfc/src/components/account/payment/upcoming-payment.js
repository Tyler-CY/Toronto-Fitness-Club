import {Typography, Button, Box} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {BASE_URL} from "../../base_url";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const UpcomingPayment = () => {
    let navigate = useNavigate();

    const cancelSubscription = () => {
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


    const [upcomingPayment, setUpcomingPayment] = useState({});
    const getUpcomingPayment = () => {
        fetch(BASE_URL() + 'subscriptions/transactions/upcoming', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return response.status.toString();
            })
            .then((data) => setUpcomingPayment(data))
            .catch((reason) => console.log(reason))
    }

    const [lastPayment, setLastPayment] = useState({});
    const getLastPayment = () => {
        fetch(BASE_URL() + 'subscriptions/transactions/last', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return response.status.toString();
            })
            .then((data) => setLastPayment(data))
            .catch((reason) => console.log(reason))
    }


    useEffect(() => {
        getUpcomingPayment();
        getLastPayment();
    }, [])


    return (
        <>
            <Grid2 container spacing={1}>
                <Grid2 item xs={9}>
                    <Box display="flex" justifyContent="flex-start">
                        {upcomingPayment.datetime ?
                            <Typography variant='h4'>
                                Next Payment: ${upcomingPayment.amount} on {upcomingPayment.datetime}
                            </Typography>
                            :
                            <Typography variant='h4'>
                                No upcoming payments.
                            </Typography>
                        }
                    </Box>
                </Grid2>
                <Grid2 item xs={3}>
                </Grid2>
                <Grid2 item xs={9}>
                    <Box display="flex" justifyContent="flex-start">
                        {upcomingPayment.datetime ?
                            <Typography variant='h5'>
                                Upcoming Subscription Plan: {upcomingPayment.plan}
                            </Typography>
                            :
                            <Typography variant='h5'>
                                No upcoming subscription.
                            </Typography>
                        }
                    </Box>
                </Grid2>
                <Grid2 item xs={3}>
                    <Box display="flex" justifyContent="flex-end">
                        {upcomingPayment.datetime ?
                            <Button onClick={cancelSubscription}>
                                Cancel Subscription
                            </Button>
                            :
                            <Button onClick={() => {
                                navigate('/plans')
                            }}>
                                Subscribe
                            </Button>
                        }
                    </Box>
                </Grid2>
                <Grid2 item xs={9} alignSelf={'flex-end'}>
                    <Box display="flex" justifyContent="flex-start">
                        {lastPayment.datetime ?
                            <Typography variant='h5'>
                                Last Payment: ${lastPayment.amount} on {lastPayment.datetime}
                            </Typography>
                            :
                            <Typography variant='h5'>
                                No payment on record.
                            </Typography>
                        }

                    </Box>
                </Grid2>
                <Grid2 item xs={3}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button onClick={() => {
                            navigate('/payments/update-billing')
                        }}>
                            Update Billing Method
                        </Button>
                    </Box>
                </Grid2>

            </Grid2>


        </>
    );
}

export default UpcomingPayment;