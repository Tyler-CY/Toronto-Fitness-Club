import {Box,} from "@mui/material";
import {useEffect, useState} from "react";
import './details.css'
import {BASE_URL} from "../../base_url";
import StandardAppbar from "../../common/standard-appbar";
import DetailsContent from "./details-content";
import AccountNavbar from "../common/account-navbar";


const Details = () => {
    const [details, setDetails] = useState({})
    const [fetchSuccess, setFetchSuccess] = useState(false)

    useEffect(() => {
        fetch(BASE_URL() + 'accounts/details/', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setFetchSuccess(true);
                }
                return response.json();
            })
            .then((data) => {
                setDetails(data);
            })
    }, []);


    return (
        <>
            <StandardAppbar/>

            <Box sx={{display: 'flex'}}>

                <Box width={'15vw'}>
                    <AccountNavbar/>
                </Box>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    <DetailsContent details={details} fetchSuccess={fetchSuccess}/>

                </Box>
            </Box>
        </>
    );
}

export default Details