import {BASE_URL} from "../../base_url";
import {Button, TextField, Typography, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import CommonStyles from "../../common/common-styles";
import {useState} from "react";


const RegisterForm = () => {
    const styles = CommonStyles();
    let navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [hasWrongInfo, setHasWrongInfo] = useState(false);
    const [error, setError] = useState('Unknown Error Occurred. Please try again.');


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!/^[0-9]+$/.test(event.target.elements.phone.value)) {
            setHasWrongInfo(true);
            setError('Invalid Phone Format. Please enter digits 0-9 only.');
            return;
        }

        fetch(BASE_URL() + 'accounts/register/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'first_name': event.target.elements.first_name.value,
                'last_name': event.target.elements.last_name.value,
                'password': event.target.elements.password.value,
                'phone': event.target.elements.phone.value,
                'email': event.target.elements.email.value,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    setSuccess(true);
                } else {
                    setHasWrongInfo(true);
                    setError('Email already exists. Please use another Email.');
                }
                return response.json();
            })
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))

    };

    if (success) {
        setTimeout(() => navigate('/login'), 2500);
    }

    return (
        <>

            <Paper sx={{
                width: '70%',
                padding: 4
            }}>
                <Typography align='center' variant='h3' sx={{color: 'black', padding: 2}}>Register</Typography>

                <div id='register_div'>
                    <form id='register_form' onSubmit={handleSubmit}>
                        <TextField type='text' id='first_name' label='First Name' required fullWidth autoFocus
                                   variant={'filled'}
                        />
                        <TextField type='text' id='last_name' label='Last Name' required fullWidth
                                   variant={'filled'}/>
                        <TextField type='email' id='email' label='Email Address' required fullWidth
                                   variant={'filled'}/>
                        <TextField type='text' id='phone' label='Phone Number (e.g. 6472253781)' fullWidth
                                   variant={'filled'}/>
                        <TextField type='password' id='password' label='Password' required fullWidth
                                   variant={'filled'}/>

                        <Typography align={'center'} sx={{color: 'red'}} variant={'h6'} hidden={!hasWrongInfo}>
                            {error}
                        </Typography>
                        <Typography align={'center'} sx={{color: 'green'}} variant={'h6'} hidden={!success}>
                            Success! Redirecting to Login...
                        </Typography>


                        <Button type='submit' value='Submit' variant='contained' fullWidth
                                sx={styles.standard_button}>Register</Button>

                        <Typography variant='h6' align={'center'}>
                            Already have an account? <Button
                            sx={[styles.standard_button, {backgroundColor: 'transparent'}]}
                            onClick={() => navigate('/login')}>Login</Button>
                        </Typography>
                    </form>
                </div>
            </Paper>
        </>
    );
}

export default RegisterForm;