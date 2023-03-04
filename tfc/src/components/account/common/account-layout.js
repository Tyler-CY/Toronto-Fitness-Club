import {Box, Grid, Container, Paper} from "@mui/material";
import backgroundImage from "../../../images/homepage/pexels-max-vakhtbovych-7031706.jpg";
import React from "react";
import AccountNavbar from "./account-navbar";

const AccountLayout = (props) => {
    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'stretch'}}>
                <Box sx={{flexGrow: 1}}>
                    <AccountNavbar/>
                </Box>

                <Box
                    component="main"
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat-y',
                        flexGrow: 20,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Grid container spacing={3}>
                            {React.Children.map(props.children, (child) => {
                                return (
                                    <Grid item xs={12}>
                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            {child}
                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Container>

                </Box>
            </Box>
        </>
    );
}

export default AccountLayout