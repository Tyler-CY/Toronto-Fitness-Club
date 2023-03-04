import {Button, Grid, Pagination, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import CommonStyles from "../common/common-styles";
import {useEffect, useState} from "react";


const StudioSearchBasic = (props) => {
    const styles = CommonStyles();

    // Unpack the props.
    const {
        studioOptions,
        classOptions,
        defaultValues,
        queryString,
        setQueryString,
        handleSearch,
        openFilter,
        setOpenFilter
    } = props;


    const studioNames = studioOptions.map(o => o.name);

    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        handleSearch();
    }, [trigger]);


    const [studioInput, setStudioInput] = useState(defaultValues.get('studio')?.toString() || '')
    const [postalInput, setPostalInput] = useState(defaultValues.get('postal')?.toString() || '')



    const updateAnchor = (postal) => {
        console.log('postal' + postal)
        let url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${postal}&username=stom67`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                try {
                    const lat = data.postalCodes[0].lat
                    const long = data.postalCodes[0].lng
                    props.setAnchor([lat, long])
                }
                catch (e) {
                    console.log(e)
                }
            })



        // props.setAnchor()
    }

    return (
        <>
            <Grid container spacin={2}>
                <Grid item xs={3} align="center">
                    <Autocomplete freeSolo variant="outlined" sx={styles.standard_autocomplete}
                                  options={studioNames}
                                  value={studioInput}
                                  renderInput={(params) => <TextField {...params} label='Search'/>}
                                  getOptionLabel={(option) => option.toString()}
                                  onInputChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setStudioInput(value)
                                          setQueryString({...queryString, 'name': value});
                                      } else {
                                          setStudioInput('')
                                          const queryCopy = queryString;
                                          delete queryString.name;
                                          setQueryString(queryCopy);
                                      }
                                      setTrigger(!trigger);
                                  }}
                                  onChange={(event, value,) => {
                                      if (!!value && value.toString() !== '') {
                                          setQueryString({...queryString, 'name': value});
                                      } else {
                                          const queryCopy = queryString;
                                          delete queryString.name;
                                          setQueryString(queryCopy);
                                      }
                                  }}/>
                </Grid>
                <Grid item xs={3} align="center">
                    <TextField variant="outlined" inputProps={{ maxLength: 6 }} label={'Postal Code e.g. M4XM1N'}
                                  defaultValue={postalInput}
                                  onChange={(event) => {
                                      if (event.target.value.length === 6){
                                          updateAnchor(event.target.value);
                                      }

                                      if (!!event.target.value && event.target.value.toString() !== '') {
                                          setPostalInput(event.target.value)
                                          setQueryString({...queryString, 'postal': event.target.value});
                                      } else {
                                          setPostalInput('')
                                          const queryCopy = queryString;
                                          delete queryString.postal;
                                          setQueryString(queryCopy);
                                      }
                                      setTrigger(!trigger);
                                  }}/>
                </Grid>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button sx={[styles.standard_button, {backgroundColor: 'transparent'}]} onClick={() => {
                        setOpenFilter(!openFilter)
                    }} fullWidth>Filter</Button>
                </Grid>
                <Grid item xs={3} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button sx={[styles.standard_button, {backgroundColor: 'transparent'}]} onClick={() => {
                        props.reset()
                    }} fullWidth>Reset</Button>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                    <Pagination size="large" count={props.count} page={props.page} onChange={(event, newPage) => {
                        props.setPage(newPage)
                    }}/>
                </Grid>

            </Grid>

        </>
    );
}

export default StudioSearchBasic;