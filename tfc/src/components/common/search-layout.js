import {Box, Grid, Container, Paper, } from "@mui/material";
import backgroundImage from "../../images/homepage/pexels-max-vakhtbovych-7031706.jpg";
import React from "react";

const SearchLayout = (props) => {
    const {navbar, openFilter,} = props
    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'stretch',}}>
                {openFilter ?
                    <Box sx={{flexGrow: 1, maxWidth: '35vh',}}>
                        {navbar}
                    </Box>
                    : <></>
                }


                <Paper
                    component="main"
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat-y',
                        flexGrow: 5,
                        height: '100vh',
                        overflow: 'auto',
                        flexDirection: 'column'
                    }}
                >

                    <Container sx={{mt: 4, pb: 4,}}>
                        <Grid container spacing={3} direction="row"
                              justifyContent="center"
                              alignItems="flex-end">
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


                </Paper>
            </Box>
        </>
    );
}

export default SearchLayout