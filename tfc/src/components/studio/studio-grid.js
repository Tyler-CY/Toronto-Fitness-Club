import StudioCard from "./studio-card";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";


const StudioGrid = (props) => {
    const data = props.data

    return (
        <Grid2 container spacing={4} direction="row"
               justifyContent="flex-start"
               alignItems="stretch" sx={{padding: 3}}>
            {data.length > 0 ? data.map(
                    (d) => (
                        <Grid2 key={d.id} xs={12} sm={12} md={4} lg={4} xl={4}>
                            <StudioCard data={d} anchor={props.anchor}></StudioCard>
                        </Grid2>
                    )
                )
                :
                <Grid2 xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant={'h3'} align={'center'}>No Results.</Typography>
                </Grid2>
            }
        </Grid2>
    );
}

export default StudioGrid;