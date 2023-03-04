import {
    Box,
    Button,
    CardMedia,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../../base_url";
import CloseIcon from '@mui/icons-material/Close';
import CommonStyles from "../../common/common-styles";

const styles = CommonStyles();

const UpdateCard = () => {
    const [details, setDetails] = useState({})

    const [oldEmail, setOldEmail] = useState('')

    useEffect(() => {
        fetch(BASE_URL() + 'accounts/details/', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            },
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setDetails(data);
                setOldEmail(data.email)
            })
    }, []);

    let navigate = useNavigate();
    const handleExit = () => {
        navigate('/dashboard');
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            'first_name': details.first_name,
            'last_name': details.last_name,
        }
        if (details.email !== oldEmail) {
            payload['email'] = details.email;
        }
        if (details.phone_number) {
            payload['phone_number'] = details.phone_number;
        }
        if (details.password) {
            payload['password'] = details.password;
        }


        fetch(BASE_URL() + 'accounts/details/', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))


        handleExit();


    };


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center'
            }}>
                <div/>
                <Typography align='center' variant='h3' sx={{color: 'black', padding: 2}}>Update Profile</Typography>

                <IconButton aria-label='close' onClick={handleExit} sx={{mt: -8}}>
                    <CloseIcon/>
                </IconButton>
            </Box>


            <Grid container spacing={1}>
                <Grid container item xs={6}>
                    <CardMedia alt={'Profile Picture'} component="img"
                               image={details.avatar || "http://localhost:8000/media/user-avatars/stock-user-avatar.jpg"}
                               sx={{
                                   margin: 'auto',
                                   width: '60%',
                                   aspectRatio: '1 / 1',
                                   border: '3px solid black',
                                   borderRadius: '50%'
                               }}/>
                </Grid>
                <Grid container item xs={6} sx={{pr: 10}}>
                    <div id='register_div'>
                        <form id='register_form' onSubmit={handleSubmit}>
                            <TextField type='text' id='first_name' label='First Name' required fullWidth autoFocus
                                       variant={'filled'} value={details.first_name || ''}
                                       InputLabelProps={{shrink: !!details.first_name}}
                                       onChange={(event) => setDetails({
                                           ...details,
                                           'first_name': event.target.value
                                       })}
                            />
                            <TextField type='text' id='last_name' label='Last Name' required fullWidth
                                       variant={'filled'} value={details.last_name || ''}
                                       InputLabelProps={{shrink: !!details.last_name}}
                                       onChange={(event) => setDetails({
                                           ...details,
                                           'last_name': event.target.value
                                       })}
                            />
                            <TextField type='email' id='email' label='Email Address' required fullWidth
                                       variant={'filled'} value={details.email || ''}
                                       InputLabelProps={{shrink: !!details.email}}
                                       onChange={(event) => setDetails({
                                           ...details,
                                           'email': event.target.value
                                       })}/>
                            <TextField type='text' id='phone_number' label='Phone Number (e.g. 6472253781)' fullWidth
                                       variant={'filled'} value={details.phone_number || ''}
                                       InputLabelProps={{shrink: !!details.phone_number}}
                                       onChange={(event) => setDetails({
                                           ...details,
                                           'phone_number': event.target.value
                                       })}/>

                            <TextField type='password' id='password' label='New Password' fullWidth
                                       variant={'filled'}/>


                            <Box align="flex-end" sx={{display: 'flex', alignItems: 'stretch'}}>
                                <Button variant='contained' fullWidth onClick={() => {
                                    handleExit()
                                }}
                                        sx={[styles.standard_button, {backgroundColor: 'transparent'}]}>Cancel</Button>
                                <Button type='submit' value='Submit' variant='contained' fullWidth
                                        sx={styles.standard_button}>Update</Button>
                            </Box>

                        </form>
                    </div>
                </Grid>
            </Grid>


        </>
    );
}

export default UpdateCard;