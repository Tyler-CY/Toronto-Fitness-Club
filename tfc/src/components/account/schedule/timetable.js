import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button, Paper, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {BASE_URL} from "../../base_url";
import {Link, useNavigate} from "react-router-dom";


const Timetable = () => {
    let navigate = useNavigate();


    const [rows, setRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sortModel, setSortModel] = React.useState([
        {
            field: 'datetime',
            sort: 'desc',
        },
    ]);

    // must be 'upcoming' or 'past'
    const [history, setHistory] = useState('upcoming')


    const refresh = (sortArr, filterArr) => {
        setLoading(true);
        let url = BASE_URL() + 'services/sessions/' + history + '/?limit=' + pageSize + '&page=' + page;

        if (sortArr) {
            if (sortArr.length > 0) {
                if (sortArr[0].sort === 'desc') {
                    url += '&sort=-' + sortArr[0].field
                } else {
                    url += '&sort=' + sortArr[0].field
                }
            }
        }

        if (filterArr) {
            if (filterArr.length > 0) {
                url += '&filter=' + filterArr[0]
            }
        }

        console.log(url)
        fetch(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setRows(data.results);
                setCount(data.count);
            })
            .catch((reason) => console.log(reason))
        setLoading(false);
    }

    useEffect(() => {
        refresh(sortModel,)
    }, [history, pageSize, page]);


    const getClass = (params) => {
        return <Button onClick={() => {navigate(`/classes/sessions?class_id=${params.row.the_class.id}`)}}>{params.row.the_class.name}</Button>
    }

    const getLocation = (params) => {
        return <Button onClick={() => {navigate(`/studios/search?name=${params.row.the_studio.name}`)}}>{params.row.the_studio.name}</Button>
    }

    const getDate = (params) => {
        const date = new Date(params.row.datetime)
        return date.toDateString() + ' ' + date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    }

    const columns = [
        {
            field: 'class', headerName: 'Class', flex: 1, headerAlign: 'center',
            align: 'center',
            renderCell: getClass,
        },
        {
            field: 'location', headerName: 'Location', flex: 3,
            headerAlign: 'center',
            align: 'center',
            renderCell: getLocation,
        },
        {
            field: 'datetime', headerName: 'Date', width: 200, flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: getDate,
            sortComparator: (a, b) => Date(a.toString()) - Date(b.toString())
        },
        {
            field: 'status', headerName: 'Status', width: 200, flex: 1,
            headerAlign: 'center',
            align: 'center',
        },
    ];


    return (
        <>
            <Box display="flex" justifyContent="flex-start" marginBottom={'4px'}>
                <Button onClick={() => {
                    setHistory('upcoming')
                }}>Upcoming</Button>
                <Button onClick={() => {
                    setHistory('past')
                }}>Past</Button>
            </Box>

            <Grid2 container justifyContent='flex-end' spacing={1}>
                <Grid2 item xs={12}>
                    <Typography variant={'h4'}>
                        Your Timetable
                    </Typography>
                </Grid2>
                <Grid2 item xs={12}>
                    <Paper>
                        <DataGrid
                            autoHeight
                            rows={rows}
                            rowCount={count}
                            columns={columns}
                            disableColumnMenu={true}

                            loading={loading}

                            sortModel={sortModel}
                            onSortModelChange={(newSortModel) => {
                                setSortModel(newSortModel);
                                refresh(newSortModel);
                            }}

                            paginationMode='server'
                            onPageChange={(newPage) => {
                                setPage(newPage + 1);
                            }}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => {
                                setPageSize(newPageSize)
                            }}
                            getRowId={(row) => row.class + row.datetime}
                            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}

                            sx={{height: 500}}/>
                    </Paper>
                </Grid2>
            </Grid2>
        </>
    );
}

export default Timetable;