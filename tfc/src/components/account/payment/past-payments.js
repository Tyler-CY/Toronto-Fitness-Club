import {Typography, Paper} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {DataGrid,} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {BASE_URL} from "../../base_url";


const PastPayments = () => {
    const columns = [
        {field: 'datetime', headerName: 'Transaction Date', width: 200, flex: 1},
        {field: 'card_info', headerName: 'Card Charged', width: 200, flex: 1},
        {field: 'amount', headerName: 'Amount', width: 200, flex: 1},
    ];

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


    const refresh = (sortArr) => {
        setLoading(true);
        let url = BASE_URL() + 'subscriptions/transactions/past?limit=' + pageSize + '&page=' + page;

        if (sortArr) {
            if (sortArr.length > 0) {
                if (sortArr[0].sort === 'desc') {
                    url += '&sort=-' + sortArr[0].field
                } else {
                    url += '&sort=' + sortArr[0].field
                }
            }
        }


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
        refresh();
    }, [pageSize, page])


    return (
        <>
            <Grid2 container justifyContent='flex-end' spacing={1}>
                <Grid2 item xs={12}>
                    <Typography variant={'h4'}>
                        Past Payment
                    </Typography>
                </Grid2>
                <Grid2 item xs={12}>
                    <Paper>
                        <DataGrid
                            autoHeight={true}
                            rows={rows}
                            rowCount={count}
                            columns={columns}

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
                            getRowId={(row) => row.datetime}
                            rowsPerPageOptions={[5, 10, 12, 25, 50, 100]}
                            sx={{height: 500}}
                        />
                    </Paper>
                </Grid2>
            </Grid2>
        </>
    );

}

export default PastPayments;