import React, {useEffect, useState} from "react";
import {BASE_URL} from "../base_url";
import StandardAppbar from "../common/standard-appbar";
import StudioGrid from "./studio-grid";
import {useSearchParams} from "react-router-dom";
import SearchLayout from "../common/search-layout";
import StudioSearchNavbar from "./studio-search-navbar";

import StudioSearchBasic from "./studio-search-basic";
import {Map, Marker, Draggable, ZoomControl} from "pigeon-maps";
import StudioMap from "./studio-map";
import {Box, Container, Grid, Paper} from "@mui/material";
import backgroundImage from "../../images/homepage/pexels-max-vakhtbovych-7031706.jpg";

function searchParamsToObject(searchParams) {
    // Create an object representation, called queryString, from searchParams.
    const startingQuery = {}
    if (searchParams.get('name')) startingQuery['name'] = searchParams.get('name');
    if (searchParams.get('amenity')) startingQuery['amenity'] = searchParams.get('amenity');
    if (searchParams.get('class')) startingQuery['class'] = searchParams.get('class');
    if (searchParams.get('coach')) startingQuery['coach'] = searchParams.get('coach');
    if (searchParams.get('postal')) startingQuery['postal'] = searchParams.get('postal');
    return startingQuery;
}

const Studios = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const startingQuery = searchParamsToObject(searchParams);
    const [queryString, setQueryString] = useState(startingQuery);


    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);

    const [studioResults, setStudioResults] = useState([]);

    const searchOnce = () => {
        // console.log(queryString)
        let url = BASE_URL() + 'services/studios/search/?limit=' + PAGE_SIZE + '&page=' + page;
        if (Object.keys(queryString).length !== 0) {
            url = url + '&' + new URLSearchParams(queryString).toString();
        }
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    setPage(1);
                    return
                }
                return response.json();
            })
            .then((data) => {

                setStudioResults(data.results);
                setCount(data.count);
            })
            .catch((reason) => console.log(reason))
    }


    const reset = () => {
        setQueryString({})
        let url = BASE_URL() + 'services/studios/search/?limit=' + PAGE_SIZE + '&page=' + 1;
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    setPage(1);
                    return
                }
                return response.json();
            })
            .then((data) => {

                setStudioResults(data.results);
                setCount(data.count);
            })
            .catch((reason) => console.log(reason))
    }


    // At the beginning, initialize a result.
    useEffect(() => {
        searchOnce();
    }, [page, count]);


    // Get the available studio options for the class filter.
    const [studioOptions, setStudioOptions] = useState([])
    useEffect(() => {
        fetch(BASE_URL() + 'services/studios/search/?limit=1000')
            .then((response) => response.json())
            .then((data) => setStudioOptions(data.results))
    }, []);

    // Get the available class options for the class filter.
    const [classOptions, setClassOptions] = useState([])
    useEffect(() => {
        fetch(BASE_URL() + 'services/classes/search/?limit=1000')
            .then((response) => response.json())
            .then((data) => setClassOptions(data.results))
    }, []);

    // Get the available amenities options for the class filter.
    const [amenityOptions, setAmenityOptions] = useState([]);
    useEffect(() => {
        fetch(BASE_URL() + 'services/amenities/?limit=1000',)
            .then((response) => response.json())
            .then((data) => setAmenityOptions(data.results))
    }, []);


    const handleSearch = () => {
        searchOnce();
        setSearchParams(queryString);
    }


    const [openFilter, setOpenFilter] = useState(false);


    const [anchor, setAnchor] = useState([43.66455786200873, -79.39144763755495]);

    useEffect(() => {
        setQueryString({...queryString, 'latitude': anchor[0], 'longitude': anchor[1]})
    }, [anchor])
    useEffect(() => {
        handleSearch();
    }, [queryString])

    return (
        <>
            <StandardAppbar/>


            <Box sx={{display: 'flex', alignItems: 'stretch',}}>
                {openFilter ?
                    <Box sx={{flexGrow: 1, minWidth: '15vw'}}>
                        <StudioSearchNavbar classOptions={classOptions}
                                            amenityOptions={amenityOptions}
                                            defaultValues={searchParams}
                                            queryString={queryString}
                                            setQueryString={setQueryString}
                                            handleSearch={handleSearch}/>
                    </Box>
                    : <></>
                }


                <Paper
                    component="main"
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'repeat-y',
                        flexGrow: 2,
                        height: '100vh',
                        overflow: 'auto',
                        flexDirection: 'column'
                    }}
                >

                    {/*<Container sx={{mt: 0, pb: 0,}}>*/}
                    <Grid container spacing={3} direction="row" display='flex'
                          justifyContent="center"
                          alignItems="center" sx={{ml: 0, mr: 0, minHeight: '90vh'}}>

                        <Grid spacing={2} direction={'column'} xs={4}
                              sx={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                            <Grid item xs={12} sx={{display: 'flex', alignItems: 'stretch', justifyContent: 'center',
                                    mb: 4
                            }}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <StudioSearchBasic
                                        studioOptions={studioOptions}
                                        reset={reset}
                                        defaultValues={searchParams}
                                        queryString={queryString}
                                        setQueryString={setQueryString}
                                        handleSearch={handleSearch}
                                        openFilter={openFilter}
                                        setOpenFilter={setOpenFilter}
                                        count={Math.ceil(count / PAGE_SIZE)}
                                        page={page}
                                        setPage={setPage}
                                        setAnchor={setAnchor}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <StudioMap anchor={anchor} setAnchor={setAnchor} studioResults={studioResults}/>


                                </Paper>
                            </Grid>
                        </Grid>


                        <Grid item xs={7} sx={{alignItems: 'center', justifyContent: 'center',}}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxHeight: '90vh',
                                    overflow: 'auto'
                                }}
                            >
                                <StudioGrid data={studioResults} anchor={anchor}/>
                            </Paper>
                        </Grid>
                    </Grid>
                    {/*</Container>*/}


                </Paper>
            </Box>


            {/*<SearchLayout*/}
            {/*    navbar={<StudioSearchNavbar classOptions={classOptions}*/}
            {/*                                amenityOptions={amenityOptions}*/}
            {/*                                defaultValues={searchParams}*/}
            {/*                                queryString={queryString}*/}
            {/*                                setQueryString={setQueryString}*/}
            {/*                                handleSearch={handleSearch}/>}*/}
            {/*    openFilter={openFilter}*/}
            {/*    setOpenFilter={setOpenFilter}*/}
            {/*>*/}
            {/*    <StudioMap anchor={anchor} setAnchor={setAnchor} studioResults={studioResults}/>*/}

            {/*    <StudioSearchBasic*/}
            {/*        studioOptions={studioOptions}*/}
            {/*        reset={reset}*/}
            {/*        defaultValues={searchParams}*/}
            {/*        queryString={queryString}*/}
            {/*        setQueryString={setQueryString}*/}
            {/*        handleSearch={handleSearch}*/}
            {/*        openFilter={openFilter}*/}
            {/*        setOpenFilter={setOpenFilter}*/}
            {/*        count={Math.ceil(count / PAGE_SIZE)}*/}
            {/*        page={page}*/}
            {/*        setPage={setPage}*/}
            {/*        setAnchor={setAnchor}*/}
            {/*    />*/}


            {/*    <StudioGrid data={studioResults} anchor={anchor}/>*/}
            {/*</SearchLayout>*/}
        </>
    );
}

export default Studios