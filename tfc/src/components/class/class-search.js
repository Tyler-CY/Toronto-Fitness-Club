import {useEffect, useState} from "react";
import {BASE_URL} from "../base_url";
import * as React from 'react';
import {useSearchParams} from "react-router-dom";
import ClassGrid from "./class-grid";
import StandardAppbar from "../common/standard-appbar";
import SearchLayout from "../common/search-layout";
import ClassSearchBasic from "./class-search-basic";
import ClassSearchNavbar from "./class-search-navbar";
import {Box, Paper, Typography} from "@mui/material";



function searchParamsToObject(searchParams) {
    const startingQuery = {}
    if (searchParams.get('name')) startingQuery['name'] = searchParams.get('name');
    if (searchParams.get('coach')) startingQuery['coach'] = searchParams.get('coach');
    if (searchParams.get('studio')) startingQuery['studio'] = searchParams.get('studio');
    if (searchParams.get('date')) startingQuery['date'] = searchParams.get('date');
    if (searchParams.get('after')) startingQuery['after'] = searchParams.get('after');
    if (searchParams.get('before')) startingQuery['before'] = searchParams.get('before');
    if (searchParams.get('keyword')) startingQuery['keyword'] = searchParams.get('keyword');
    if (searchParams.get('maxCapacity')) startingQuery['maxCapacity'] = searchParams.get('maxCapacity');
    if (searchParams.get('minCapacity')) startingQuery['minCapacity'] = searchParams.get('minCapacity');
    return startingQuery;
}

const ClassSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Create an object representation, called queryString, from searchParams.
    const startingQuery = searchParamsToObject(searchParams);
    const [queryString, setQueryString] = useState(startingQuery);

    const PAGE_SIZE = 6;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);


    const [classResults, setClassResults] = useState([]);

    const searchOnce = () => {
        let url = BASE_URL() + 'services/classes/search/?limit=' + PAGE_SIZE + '&page=' + page
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

                setClassResults(data.results);
                setCount(data.count);
            })
            .catch((reason) => console.log(reason))
    }
    // At the beginning, initialize a result.
    useEffect(() => {
        searchOnce();
    }, [page, count]);


    const reset = () => {
        setQueryString({})
        let url = BASE_URL() + 'services/classes/search/?limit=' + PAGE_SIZE + '&page=' + 1
        fetch(url)
            .then((response) => {
                if (response.status !== 200) {
                    setPage(1);
                    return
                }
                return response.json();
            })
            .then((data) => {
                setClassResults(data.results);
                setCount(data.count);
            })
            .catch((reason) => console.log(reason))
    }


    // Get the available studio options for the search filter.
    const [studioOptions, setStudioOptions] = useState([]);
    useEffect(() => {
        fetch(BASE_URL() + 'services/studios/search/?limit=1000')
            .then((response) => response.json())
            .then((data) => setStudioOptions(data.results))
            .catch((reason) => console.log(reason))
    }, []);

    // Get the available class options for the class filter.
    const [classOptions, setClassOptions] = useState([])
    useEffect(() => {
        fetch(BASE_URL() + 'services/classes/search/?limit=1000')
            .then((response) => response.json())
            .then((data) => setClassOptions(data.results))
            .catch((reason) => console.log(reason))
    }, []);

    const [keywordOptions, setKeywordOptions] = useState([]);
    useEffect(() => {
        fetch(BASE_URL() + 'services/classes/keywords/?limit=1000')
            .then((response) => response.json())
            .then((data) => setKeywordOptions(data.results))
            .catch((reason) => console.log(reason))
    }, []);


    const handleSearch = () => {
        searchOnce();
        setSearchParams(queryString);
    }


    const [openFilter, setOpenFilter] = useState(false);


    return (
        <>
            <StandardAppbar/>
            <SearchLayout
                navbar={
                <Box sx={{overflow: 'hidden'}}>

                    <ClassSearchNavbar studioOptions={studioOptions}
                                       classOptions={classOptions}
                                       keywordOptions={keywordOptions}
                                       defaultValues={searchParams}
                                       queryString={queryString}
                                       setQueryString={setQueryString}
                                       handleSearch={handleSearch}/>
                </Box>


                }
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
            >
                <Paper sx={{pt: 3, pb: 3, backgroundColor: 'rgba(255,255,255,0.71)'}}>
                    <Typography
                        variant="h2"
                        align="center"
                        color="#000000"
                        gutterBottom
                    >
                        Classes
                    </Typography>
                    <Typography variant="h5" align="center" color="#000000" >
                        With a coaching team led by world-class instructors, ex Professional players and ex Olympic athletes,
                        our classes are designed to accommodate you in all the ways. Whether you are a regular member or a newcomer,
                        come join us and discover a whole new world of sports and exercise.
                    </Typography>
                </Paper>

                <ClassSearchBasic
                    classOptions={classOptions}
                    defaultValues={searchParams}
                    queryString={queryString}
                    setQueryString={setQueryString}
                    handleSearch={handleSearch}
                    openFilter={openFilter}
                    setOpenFilter={setOpenFilter}
                    count={Math.ceil(count / PAGE_SIZE)}
                    page={page}
                    setPage={setPage}
                    reset={reset}
                />
                <ClassGrid data={classResults}/>
            </SearchLayout>

        </>
    );
}

export default ClassSearch