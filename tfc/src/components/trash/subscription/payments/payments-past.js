import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {BASE_URL} from "../../../base_url";
import React from 'react';
import {Paper} from "@mui/material";

const columns = [
    {field: 'datetime', headerName: 'Transaction Date', width: 200},
    {field: 'card', headerName: 'Card Charged', width: 200},
    {field: 'amount', headerName: 'Amount', width: 200},
];

// TODO: Ascending Order
const PastPayments = () => {
    const [transactions, setTransactions] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [login, setLogin] = useState(false);



    useEffect(() => {
        fetch(BASE_URL() + 'subscriptions/transactions/past?limit=' + pageSize + '&page=' + page, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setLogin(true);
                }
                return response.json()
            })
            .then((data) => {
                // console.log(data.results);
                setTransactions(data.results);
                setCount(data.count);
            })
        // .catch((reason) => console.log(reason))
    }, [pageSize, page])

    // // According to Material UI (https://mui.com/x/react-data-grid/pagination/#initialize-the-page),
    // // Since rowCount prop is used to compute the number of available pages,
    // // switching it to undefined during loading reset page to zero. To avoid this problem,
    // // keep the previous value of rowCount.
    // // Some API clients return undefined while loading
    // // Following lines are here to prevent `rowCountState` from being undefined during the loading
    // const [rowCountState, setRowCountState] = React.useState(
    //     pageInfo?.totalRowCount || 0,
    // );
    // React.useEffect(() => {
    //     setRowCountState((prevRowCountState) =>
    //         pageInfo?.totalRowCount !== undefined
    //             ? pageInfo?.totalRowCount
    //             : prevRowCountState,
    //     );
    // }, [pageInfo?.totalRowCount, setRowCountState]);

    if (!login) {
        return <h1>ERROR</h1>
    }

    return (
            <Paper style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={transactions}
                    rowCount={count}

                    columns={columns}

                    paginationMode='server'
                    onPageChange={(newPage) => {
                        setPage(newPage + 1);
                        // console.log(newPage + 1)
                    }}
                    pageSize={pageSize}
                    onPageSizeChange={(pageSize, details) => {
                        setPageSize(pageSize)
                    }}

                    getRowId={(row) => row.datetime + row.card}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}/>
            </Paper>
    );
}

// export default PastPayments