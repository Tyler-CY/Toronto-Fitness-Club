import {Typography, Box,} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useEffect, useState} from "react";
import {BASE_URL} from "../../base_url";


const WelcomeBack = () => {
    const [details, setDetails] = useState({})

    useEffect(() => {
        fetch(BASE_URL() + 'accounts/details/', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            },
        })
            .then((response) => response.json())
            .then((data) => setDetails(data))
    }, []);


    return (
        <Grid2 container spacing={5} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
        }}>
            <Grid2 item xs={4}>
                <Box component={'img'}
                     src={details.avatar || "http://localhost:8000/media/user-avatars/stock-user-avatar.jpg"}
                     sx={{
                         alignSelf: 'center',
                         objectFit: 'cover',
                         aspectRatio: '1 / 1',
                         width: '8vw',
                         border: '1px solid #000000',
                         borderRadius: '50%'
                     }}>
                </Box>

            </Grid2>
            <Grid2 item xs={6} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "start",
            }}>
                <Typography variant={'h3'} component="pre">
                    Welcome back, {details.first_name} {details.last_name}!
                </Typography>

            </Grid2>
        </Grid2>

    );
}

export default WelcomeBack;