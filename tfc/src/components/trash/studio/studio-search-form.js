import {TextField, Grid, Autocomplete, Button} from "@mui/material";
import React from "react";

const StudioSearchForm = (props) => {

    // Shared with parents (used by BOTH)
    const queryString = props.queryString;
    const setQueryString = props.setQueryString;
    const handleSearch = props.handleSearch;

    // Constants found by parent.
    const defaultValues = props.defaultValues;
    const studioOptions = props.studioOptions;
    const classOptions = props.classOptions;
    const amenitiesOptions = props.amenitiesOptions;




    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Autocomplete freeSolo variant="outlined" fullWidth
                              options={studioOptions}
                              renderInput={(params) => <TextField {...params} label='Studio'/>}
                              getOptionLabel={(option) => option.name ? option.name : option}
                              onInputChange={(event, value, reason) => {
                                  setQueryString({...queryString, 'name': value});
                              }}
                ></Autocomplete>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete freeSolo variant="outlined" fullWidth
                              options={classOptions}
                              renderInput={(params) => <TextField {...params} label='Class'/>}
                              getOptionLabel={(option) => option.name ? option.name : option}
                              onInputChange={(event, value, reason) => {
                                  setQueryString({...queryString, 'class': value});
                              }}
                ></Autocomplete>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete freeSolo variant="outlined" fullWidth
                              options={amenitiesOptions}
                              renderInput={(params) => <TextField {...params} label='Amenity'/>}
                              getOptionLabel={(option) => option.type ? option.type : option}
                              onInputChange={(event, value, reason) => {
                                  setQueryString({...queryString, 'amenity': value});
                              }}
                ></Autocomplete>
            </Grid>
            <Grid item xs={4}>
                <Autocomplete freeSolo variant="outlined" fullWidth
                              options={classOptions}
                              renderInput={(params) => <TextField {...params} label='Coach'/>}
                              getOptionLabel={(option) => option.coach ? option.coach : option}
                              onInputChange={(event, value, reason) => {
                                  setQueryString({...queryString, 'coach': value});
                              }}
                ></Autocomplete>
            </Grid>
            <Grid item xs={4} sx={{width: '100%'}}>
                <Autocomplete freeSolo variant="outlined" fullWidth
                                      options={classOptions}
                                      renderInput={(params) => <TextField {...params} label='Location'/>}
                                      getOptionLabel={(option) => 'None'}
                                      // onInputChange={(event, value, reason) => {
                                      //     setQueryString({...queryString, 'coach': value});
                                      // }}
                ></Autocomplete>
            </Grid>
            <Grid item xs={4}>
                <Button sx={{width: '100%', height: '80%', margin: '4px'}} onClick={handleSearch}>Search</Button>
            </Grid>
        </Grid>
        </>








    );
}

// export default StudioSearchForm;