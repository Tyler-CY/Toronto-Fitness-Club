import {Button, Typography} from "@mui/material";


import homeImage from '../../images/homepage/pexels-max-vakhtbovych-7031706.jpg'

import StandardLayout from "../common/standard-layout";
import * as React from "react";

import {useNavigate} from "react-router-dom";
import CommonStyles from "../common/common-styles";


const HomeContent = () => {
    const style = CommonStyles();

    let navigate = useNavigate();

    return (
        <>
            <StandardLayout
                sxBackground={{
                    backgroundImage: `url(${homeImage})`,
                }}
            >
                <Typography align="center" variant="h1">
                    Toronto Fitness Club
                </Typography>
                <Typography align="center" variant="h4">
                    Downtown Toronto's Most Popular Fitness Center
                </Typography>

                <Button onClick={() => {
                    navigate('/register')
                }} sx={
                    [style.standard_button, {
                        marginTop: 4,
                        width: '30rem',
                        height: '3rem'
                    },]
                }>
                    Register
                </Button>


            </StandardLayout>
        </>
    );

}

export default HomeContent;