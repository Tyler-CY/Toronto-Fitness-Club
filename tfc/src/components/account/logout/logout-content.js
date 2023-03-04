import StandardLayout from "../../common/standard-layout";
import {Typography, Paper} from "@mui/material";

import backgroundImage from "../../../images/homepage/pexels-max-vakhtbovych-7031706.jpg";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const LogoutContent = () => {

    let navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, []);

    return (
        <StandardLayout sxBackground={{backgroundImage: `url(${backgroundImage})`}}>
            <Paper sx={{backgroundColor: 'rgba(255,162,88,0.76)', padding: 4}}>
                <Typography variant='h4' align='center' sx={{m: 1}}>You have logged out of your account.</Typography>
                <Typography variant='h4' align='center' sx={{m: 1}}>Redirecting to Home Page...</Typography>
            </Paper>
        </StandardLayout>
    );
}

export default LogoutContent;