import SessionTable from "./session-table";
import SessionSummary from "./session-summary";
import StandardAppbar from "../common/standard-appbar";
import {Box, Container, Paper} from "@mui/material";
import backgroundImage from "../../images/homepage/pexels-max-vakhtbovych-7031706.jpg";
import React from "react";



const Sessions = () => {


    return (
        <>
            <StandardAppbar/>


            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-y',
            }}>
                <Box margin={'50px'} sx={{
                    flexGrow: 1,
                    maxWidth: '40vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                    <SessionSummary
                    />
                </Box>

                <Box
                    sx={{
                        flexGrow: 2,
                        height: '100vh',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                    }}
                >
                    <Container sx={{minWidth: '90%'}}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <SessionTable/>
                        </Paper>
                    </Container>

                </Box>
            </Box>
        </>
    )
}

export default Sessions;