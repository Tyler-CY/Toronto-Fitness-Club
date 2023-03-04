import {Button, Grid, TextField, Pagination} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import CommonStyles from "../common/common-styles";
import {useEffect, useState} from "react";


const ClassSearchBasic = (props) => {
    const styles = CommonStyles();

    // Unpack the props.
    const {classOptions, defaultValues, queryString, setQueryString, handleSearch, openFilter, setOpenFilter} = props;

    const classNames = classOptions.map(o => o.name);

    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        handleSearch();
    }, [trigger]);


    const [classInput, setClassInput] = useState(defaultValues.get('name')?.toString() || '')


    return (
        <>
            <Grid container spacin={2}>
                <Grid item xs={6} align="center">
                    <Autocomplete freeSolo variant="outlined" sx={styles.standard_autocomplete}
                                  options={classNames}
                                  value={classInput}
                                  renderInput={(params) => <TextField {...params} label='Search'/>}
                                  getOptionLabel={(option) => option.toString()}
                                  onInputChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setClassInput(value);
                                          setQueryString({...queryString, 'name': value});
                                      } else {
                                          setClassInput('');
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

export default ClassSearchBasic;