import {Autocomplete, Button, List, ListItem, TextField, } from "@mui/material";
import * as React from "react";
import CommonStyles from "../common/common-styles";
import {useState} from "react";

const StudioSearchNavbar = (props) => {
    const styles = CommonStyles();

    // Unpack the props.
    const {classOptions, amenityOptions, defaultValues, queryString, setQueryString, handleSearch} = props;

    const classNames = classOptions.map(o => o.name);
    const amenityNames = amenityOptions.map(o => o.type);
    const coachOptions = classOptions.map(o => o.coach);


    const [cls, setClass] = useState(defaultValues.get('class')?.toString() || '');
    const [coach, setCoach] = useState(defaultValues.get('coach')?.toString() || '');

    let am = [];
    if (defaultValues.get('amenity')) {
        am = defaultValues.get('amenity').split(',');
    }
    const [amenities, setAmenities] = useState(am);


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
                        setClass('');
                        setCoach('');
                        setAmenities([]);
                    }}>
                        Reset Filter</Button>
                </ListItem>
                <ListItem>
                    <Autocomplete freeSolo fullWidth
                                  options={classNames}
                                  value={cls}
                                  renderInput={(params) => <TextField {...params} label='Class'/>}
                                  getOptionLabel={(option) => option.toString()}
                                  onInputChange={(event, value) => {
                                      if (!!value && value.toString() !== '') {
                                          setClass(value)
                                          setQueryString({...queryString, 'class': value});
                                      } else {
                                          setClass('')
                                          const queryCopy = queryString;
                                          delete queryString.class;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
                </ListItem>

                <ListItem>
                    <Autocomplete freeSolo fullWidth multiple filterSelectedOptions
                                  options={amenityNames}
                                  value={amenities}
                                  renderInput={(params) => <TextField {...params} label='Amenities'/>}
                                  getOptionLabel={(option) => option.toString() ?? ''}
                                  onChange={(event, value) => {
                                      setAmenities(value)
                                      if (value !== []) {
                                          setQueryString({...queryString, 'amenity': value.join(',')});
                                      } else {
                                          const queryCopy = queryString;
                                          delete queryString.amenity;
                                          setQueryString(queryCopy);
                                      }
                                  }}
                                  sx={styles.standard_autocomplete}
                    ></Autocomplete>
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

            </List>
        </>
    );
}

export default StudioSearchNavbar;