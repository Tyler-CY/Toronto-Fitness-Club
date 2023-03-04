import {TextField, Grid, Autocomplete} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import {useState} from "react";
import dayjs from "dayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers";


const ClassSearchForm = (props) => {

    // Shared with parents (used by BOTH)
    const queryString = props.queryString;
    const setQueryString = props.setQueryString;


    // Constants found by parent.
    const defaultValues = props.defaultValues;
    const classOptions = props.classOptions;
    const studioOptions = props.studioOptions;


    const [date, setDate] = useState(defaultValues.get('date') ?? null);
    const [startDate, setStartDate] = useState(defaultValues.get('after') ?? dayjs());
    const [endDate, setEndDate] = useState(defaultValues.get('before') ?? null);


    return (
        <>
            <Grid container spacing={2}>
                {/*<Grid item xs={4}>*/}
                {/*    <StandardAutocomplete freeSolo variant="outlined" fullWidth*/}
                {/*                          options={classOptions}*/}
                {/*                          value={defaultValues.get('name')}*/}
                {/*                          renderInput={(params) => <TextField {...params} label='Name'/>}*/}
                {/*                          getOptionLabel={(option) => option.name ? option.name : option}*/}
                {/*                          onInputChange={(event, value, reason) => {*/}
                {/*                              if (value !== '') {*/}
                {/*                                  setQueryString({...queryString, 'name': value});*/}
                {/*                              } else {*/}
                {/*                                  const queryCopy = queryString;*/}
                {/*                                  delete queryString.name;*/}
                {/*                                  setQueryString(queryCopy);*/}
                {/*                              }*/}

                {/*                          }}*/}
                {/*    ></StandardAutocomplete>*/}
                {/*</Grid>*/}
                <Grid item xs={4}>
                    <Autocomplete freeSolo variant="outlined" fullWidth
                                          options={classOptions}
                                          value={defaultValues.get('coach')}
                                          renderInput={(params) => <TextField {...params} label='Coach'/>}
                                          getOptionLabel={(option) => option.coach ? option.coach : option}
                                          onInputChange={(event, value) => {
                                              if (value !== '') {
                                                  setQueryString({...queryString, 'coach': value});
                                              } else {
                                                  const queryCopy = queryString;
                                                  delete queryString.coach;
                                                  setQueryString(queryCopy);
                                              }
                                          }}
                    ></Autocomplete>
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete freeSolo variant="outlined" fullWidth
                                          options={studioOptions}
                                          value={defaultValues.get('studio')}
                                          renderInput={(params) => <TextField {...params} label='Studio'/>}
                                          getOptionLabel={(option) => option.name ? option.name : option}
                                          onChange={(event, value) => {
                                              if (value) {
                                                  setQueryString({...queryString, 'studio_id': value.id});
                                              } else {
                                                  const queryCopy = queryString;
                                                  delete queryString.studio_id;
                                                  setQueryString(queryCopy);
                                              }
                                          }}
                    ></Autocomplete>
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={3}>
                    <DesktopDatePicker
                        label="Class Date"
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                            if (!!newValue) {
                                setQueryString({...queryString, 'date': newValue.format('YYYY-MM-DD')});
                            } else {
                                const queryCopy = queryString;
                                delete queryString.date;
                                setQueryString(queryCopy);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <DesktopDatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                            if (!!newValue) {
                                setQueryString({...queryString, 'after': newValue.format('YYYY-MM-DD')});
                            } else {
                                const queryCopy = queryString;
                                delete queryString.after;
                                setQueryString(queryCopy);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={3}>
                    <DesktopDatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                            if (!!newValue) {
                                setQueryString({...queryString, 'before': newValue.format('YYYY-MM-DD')});
                            } else {
                                const queryCopy = queryString;
                                delete queryString.before;
                                setQueryString(queryCopy);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                </LocalizationProvider>
                {/*<Grid item xs={3}>*/}
                {/*    /!*<Button sx={{width: '100%', height: '80%', margin: '4px'}} onClick={handleSearch}>Search</Button>*!/*/}
                {/*    /!*<Button sx={styles.standard_button} onClick={handleSearch}>Search</Button>*!/*/}


                {/*</Grid>*/}
            </Grid>















        </>
    );
}

// export default ClassSearchForm;