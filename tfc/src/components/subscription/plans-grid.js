import React, {useEffect, useState} from "react";
import {BASE_URL} from "../base_url";
import Grid2 from "@mui/material/Unstable_Grid2";
import PlanCard from "./plan-card";
import backgroundImage from "../../images/homepage/pexels-denys-gromov-4716814.jpg";
import {Container, Typography, Box, Paper} from "@mui/material";

const PlansGrid = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        fetch(BASE_URL() + "subscriptions/plans/all/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.results)
                setPlans(data.results);
            })
            .catch((reason) => console.log(reason))
    }, []);


    return (
        <>
            <Box
                component="main"
                sx={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'repeat-y',
                    overflow: 'auto',
                    height: '100vh'
                }}
            >

                <Paper sx={{pt: 6, pb: 6, backgroundColor: 'rgba(255,255,255,0.71)'}}>
                    <Typography
                        variant="h2"
                        align="center"
                        color="#000000"
                        gutterBottom
                    >
                        Membership
                    </Typography>
                    <Typography variant="h5" align="center" color="#000000" sx={{pl: '30%', pr: '30%'}}>
                        As the Top 1 Fitness Club in Downtown Toronto with more than 12 fitness studios in the city,
                        Toronto
                        Fitness Club membership offers exclusive access to all studios at any time. Members receive
                        a range of complimentary services and discounts at all our fitness studios
                    </Typography>
                </Paper>

                <Container>
                    <Grid2 container spacing={4} alignItems='flex-start' sx={{padding: 3}}>
                        {plans.slice(0, 1).map(
                            (plan) => (
                                <Grid2 key={plan.id} xs={12} sm={12} md={12} lg={12} xl={12}
                                       sx={{borderRadius: '50px'}}>
                                    <PlanCard data={plan}></PlanCard>
                                </Grid2>
                            )
                        )}

                        {plans.slice(1).map(
                            (plan) => (
                                <Grid2 key={plan.id} xs={12} sm={12} md={4} lg={4} xl={4} sx={{borderRadius: '50px'}}>
                                    <PlanCard data={plan}></PlanCard>
                                </Grid2>
                            )
                        )}
                    </Grid2>
                </Container>

            </Box>


        </>

    );
}

export default PlansGrid;