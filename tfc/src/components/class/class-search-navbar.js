import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Autocomplete, Box, Button, List, ListItem, TextField, Typography} from "@mui/material";
import * as React from "react";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import CommonStyles from "../common/common-styles";
import {useState} from "react";

const ClassSearchNavbar = (props) => {
    const styles = CommonStyles();

    // Unpack the props.
    const {
        studioOptions,
        classOptions,
        keywordOptions,
        defaultValues,
        queryString,
        setQueryString,
        handleSearch
    } = props;

    const coachOptions = classOptions.map(o => o.coach);
    const studioNames = studioOptions.map(o => o.name);
    const keywords = keywordOptions.map(o => o.keyword);


    let kk = [];
    if (defaultValues.get('keywords')) {
        kk = defaultValues.get('keywords').split(',');
    }
    const [keywordsChosen, setKeywordsChosen] = useState(kk);

    const [coach, setCoach] = useState(defaultValues.get('coach')?.toString() || '');
    const [studio, setStudio] = useState(defaultValues.get('studio')?.toString() || '');
    const [minCap, setMinCap] = useState(defaultValues.get('minCapacity')?.toString() || '');
    const [maxCap, setMaxCap] = useState(defaultValues.get('maxCapacity')?.toString() || '');
    const [date, setDate] = useState(defaultValues.get('date'));
    const [before, setBefore] = useState(defaultValues.get('before'));
    const [after, setAfter] = useState(defaultValues.get('after'));


    return (
        <>
            <List>
                <ListItem>
                    <Button sx={[styles.standard_button, {backgroundColor: 'transparent'}]} onClick={handleSearch}
                            fullWidth>Search</Button>
                </ListItem>
                <ListItem>
                    <Button fullWidth sx={[styles.standard_button, {backgroundColor: 'transparent'}]} onClick={() => {
                        setQueryString({});
                        setKeywordsChosen([]);
                        setCoach('');
                        setStudio('');
                        setMinCap('');
                        setMaxCap('');
                        setDate(null);
                        setBefore(null);
                        setAfter(null);
                    }}>
                        Reset Filter</Button>
                </ListItem>
                <ListItem>
                    <Autocomplete freeSolo fullWidth
                                  options={coachOptions}
                                  value={coach}
                                  renderInput={(params) => <TextField {...params} label='Coach'/>}
                                  getOptionLabel={(option) => option.toString() ?? ''}
                                  onChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setCoach(value)
                                          setQueryString({...queryString, 'coach': value});
                                      } else {
                                          setCoach('')
                                          const queryCopy = queryString;
                                          delete queryString.coach;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
                </ListItem>

                <ListItem>
                    <Autocomplete freeSolo fullWidth
                                  options={studioNames}
                                  value={studio}
                                  renderInput={(params) => <TextField {...params} label='Studio'/>}
                                  getOptionLabel={(option) => option.toString() ?? ''}
                                  onChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setStudio(value)
                                          setQueryString({...queryString, 'studio': value});
                                      } else {
                                          setStudio('')
                                          const queryCopy = queryString;
                                          delete queryString.studio;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
                </ListItem>

                <ListItem>
                    <Autocomplete freeSolo fullWidth multiple filterSelectedOptions
                                  options={keywords}
                                  value={keywordsChosen}
                                  renderInput={(params) => <TextField {...params} label='Keywords'/>}
                                  getOptionLabel={(option) => option.toString() ?? ''}
                                  onChange={(event, value) => {
                                      setKeywordsChosen(value);
                                      if (value !== []) {
                                          setQueryString({...queryString, 'keywords': value.join(',')});
                                      } else {
                                          const queryCopy = queryString;
                                          delete queryString.keywords;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
                </ListItem>


                <ListItem>
                    {/*<Typography>Between</Typography>*/}
                    <Autocomplete freeSolo variant="outlined" fullWidth
                                  options={[]}
                                  defaultValue={minCap}
                                  renderInput={(params) => <TextField {...params} label='Min Capacity'/>}
                                  getOptionLabel={(option) => option.toString()}
                                  onInputChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setMinCap(value);
                                          setQueryString({...queryString, 'minCapacity': value});
                                      } else {
                                          setMinCap('');
                                          const queryCopy = queryString;
                                          delete queryString.minCapacity;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
                    {/*<Typography>and</Typography>*/}
                    <Autocomplete freeSolo variant="outlined" fullWidth
                                  options={[]}
                                  defaultValue={maxCap}
                                  renderInput={(params) => <TextField {...params} label='Max Capacity'/>}
                                  getOptionLabel={(option) => option.toString()}
                                  onInputChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setMaxCap(value);
                                          setQueryString({...queryString, 'maxCapacity': value});
                                      } else {
                                          setMaxCap('');
                                          const queryCopy = queryString;
                                          delete queryString.maxCapacity;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
                </ListItem>


                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <ListItem>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <DesktopDatePicker
                                label="Class Date"
                                value={date}
                                onChange={(value) => {
                                    if (!!value && value.toString() !== '') {
                                        const d = new Date(value.toString()).toISOString().split('T')[0]
                                        setDate(d);
                                        setQueryString({...queryString, 'date': d});
                                    } else {
                                        setDate(null);
                                        const queryCopy = queryString;
                                        delete queryString.date;
                                        setQueryString(queryCopy);
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </ListItem>

                    <ListItem>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography>At least one session after: </Typography>
                        <DesktopDatePicker
                            label="Start Date"
                            value={after}
                            onChange={(value) => {
                                if (!!value && value.toString() !== '') {
                                    const d = new Date(value.toString()).toISOString().split('T')[0]
                                    setAfter(d);
                                    setQueryString({...queryString, 'after': d});
                                } else {
                                    setAfter(null)
                                    const queryCopy = queryString;
                                    delete queryString.after;
                                    setQueryString(queryCopy);
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </Box>
                    </ListItem>

                    <ListItem>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography>At least one session before: </Typography>
                        <DesktopDatePicker
                            label="End Date"
                            value={before}
                            onChange={(value) => {
                                if (!!value && value.toString() !== '') {
                                    const d = new Date(value.toString()).toISOString().split('T')[0]
                                    setBefore(d);
                                    setQueryString({...queryString, 'before': d});
                                } else {
                                    setBefore(null)
                                    const queryCopy = queryString;
                                    delete queryString.before;
                                    setQueryString(queryCopy);
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </Box>
                    </ListItem>
                </LocalizationProvider>

            </List>
        </>
    );
}

export default ClassSearchNavbar;