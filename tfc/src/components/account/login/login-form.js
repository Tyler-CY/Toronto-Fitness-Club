import {Button, TextField, Typography, Paper} from "@mui/material";
import backgroundImage from "../../../images/homepage/pexels-max-vakhtbovych-7031705.jpg";
import StandardLayout from "../../common/standard-layout";
import {useNavigate} from "react-router-dom";
import CommonStyles from "../../common/common-styles";
import {useState} from "react";

const LoginForm = () => {

    const styles = CommonStyles();
    let navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [hasWrongInfo, setHasWrongInfo] = useState(false);

    // Send POST request to the server for login.
    const handleLogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/accounts/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'password': event.target.elements.password.value,
                'email': event.target.elements.email.value,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setSuccess(true);
                } else {
                    setHasWrongInfo(true);
                }
                return response.json();
            })
            .then((data) => localStorage.setItem('tfc_token', data.access))
            .catch((reason) => console.log(reason))
    }

    if (success) {
        setTimeout(() => navigate('/dashboard'), 500);
    }


    return (
        <StandardLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >


            <Paper sx={{
                // backgroundColor: 'rgba(255,162,88,0.76)',
                width: '70%',
                padding: 4
            }}>

                <Typography align='center' variant='h3' sx={{color: 'black', padding: 2}}>Login</Typography>


                <form id='login_form' onSubmit={handleLogin}>
                    <TextField type='email' id='email' name='email' label='Email' required fullWidth variant={'filled'}
                               autoFocus
                    />
                    <TextField type='password' id='password' name='password' label='Password' required
                               variant={'filled'}
                               fullWidth/>
                    <Typography align={'center'} sx={{color: 'red'}} variant={'h6'} hidden={!hasWrongInfo}>
                        Incorrect Email or Password. Please try again.
                    </Typography>
                    <Button type='submit' value='Submit' variant='contained' fullWidth sx={styles.standard_button}>Sign
                        In</Button>
                    <Typography variant='h6' align={'center'}>
                        Don't have an account?
                        <Button sx={[styles.standard_button, {backgroundColor: 'transparent'}]}
                                onClick={() => {
                                    navigate('/register')
                                }}>Register</Button>
                    </Typography>
                </form>
            </Paper>

        </StandardLayout>
    );
}

export default LoginForm;