import {Button, TextField, Typography, Box, Grid} from "@mui/material";
import CommonStyles from "../../common/common-styles";
import {BASE_URL} from "../../base_url";
import StandardAppbar from "../../common/standard-appbar";
import AccountLayout from "../common/account-layout";
import {useNavigate} from "react-router-dom";


const UpdateBilling = (props) => {

    let navigate = useNavigate();

    const styles = CommonStyles();
    const updateInfo = (event) => {
        event.preventDefault();
        fetch(BASE_URL() + 'subscriptions/cardinfo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            },
            body: JSON.stringify({
                'number': event.target.elements.number.value,
                'holder': event.target.elements.holder.value,
                'cvv': event.target.elements.cvv.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))

        navigate('/dashboard');
    }

    return (
        <>
            <StandardAppbar/>
            <AccountLayout>
                <Box hidden={props.hidden}>
                    <Typography variant={'h4'}>
                        Update Billing Information
                    </Typography>

                    <form id='update-billing-form' onSubmit={updateInfo}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField type='text' id='number' label='Card Number (without spaces)' required
                                           fullWidth
                                           autoFocus
                                           variant={'filled'}/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField type='text' id='holder' label="Holder's Name" required fullWidth
                                           variant={'filled'}/>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField type='text' id='cvv' label='CVV' required fullWidth
                                           variant={'filled'}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Button type='submit' value='Submit' variant='contained' fullWidth
                                        sx={[styles.standard_button, {backgroundColor: 'transparent'}]}
                                >Update</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </AccountLayout>
        </>
    )
}

export default UpdateBilling;