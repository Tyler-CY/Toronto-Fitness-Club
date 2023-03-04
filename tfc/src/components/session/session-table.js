import {DataGrid} from "@mui/x-data-grid";
import React, {useEffect, useState} from "react";
import {BASE_URL} from "../base_url";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Button, Typography,} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import StandardDialog from "../common/standard-dialog";


const SessionTable = () => {
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

    const isNotLogin = localStorage.getItem('tfc_token') === null;


    const [allButton, setAllButton] = useState('contained');
    const [scheduledButton, setScheduledButton] = useState('outlined');
    const [cancelledButton, setCancelledButton] = useState('outlined');

    const [searchParams, setSearchParams] = useSearchParams();


    // Use together
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('Subscription required. Navigate to Subscription page?');
    const [dialogContentText, setDialogContentText] = useState('');
    const [dialogConfirmAction, setDialogConfirmAction] = useState(() => () => {
    });
    const handleClose = () => {
        setOpenDialog(false);
    };
    // End of Use together


    const handleError = () => {
        setTimeout(() => {
        }, 500);
        setDialogTitle(`Error`);
        setDialogContentText(`Subscription Required. Navigate to Subscription page?`);
        setOpenDialog(true);
        setDialogConfirmAction(() => () => {
            navigate('/plans');
        });
    }



    const refresh = (sortArr, filterArr) => {
        setLoading(true);
        let url = BASE_URL() + 'services/classes/' + searchParams.get('class_id') + '/sessions/?limit=' + pageSize + '&page=' + page;

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


        let payload = {}
        if (!isNotLogin) {
            payload = {
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('tfc_token')
                }
            };
        }

        fetch(url, payload)
            .then((response) => response.json())
            .then((data) => {
                setRows(data.results);
                setCount(data.count);
            })
            .catch((reason) => console.log(reason))
        setLoading(false);
    }

    const getAvailability = (params) => {
        return `${params.row.enrolled_count || 0} / ${params.row.max_capacity || 15}`;
    }

    const getStatus = (params) => {
        return params.row.user_status ? `Enrolled` : `-`
    }

    const getDate = (params) => {
        const date = new Date(params.row.datetime)
        // console.log(date)
        return date.toDateString() + ' ' + date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        // return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    }



    const [dialogResponse, setDialogResponse] = useState('');
    const performClassAction = (session_id, addDrop) => {
        fetch(BASE_URL() + 'services/sessions/' + session_id + '/' + addDrop + '/', {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => {
                if (response.status !== 200) {
                    return response.json()
                } else {
                    refresh(sortModel)
                }
            })
            .then((data) => {
                setDialogResponse(data);
            })
            .catch((reason) => {
                console.log(reason)
                setTimeout(() => {
                    if (addDrop === 'enrol') {
                        handleError(dialogResponse);
                    }

                }, 100)
            })


        setOpenDialog(false);

    }




    const renderEnrolButton = (params) => {
        return <Button variant={'contained'}
                       disabled={params.row.user_status || isNotLogin || params.row.enrolled_count === params.row.max_capacity}
                       onClick={() => {

                           performClassAction(params.row.id, 'enrol');
                           setTimeout(() => refresh(sortModel), 100);
                       }}>Enrol</Button>
    }




    const handleDropButton = (session, id) => {
        setDialogTitle(`Drop ${session}`);
        setDialogContentText('Are you sure you want to drop this session?');
        setOpenDialog(true);
        setDialogConfirmAction(() => () => {
            performClassAction(id, 'drop');
        })
    }

    const renderDropButton = (params) => {
        return <Button variant={'outlined'} disabled={!params.row.user_status || isNotLogin}
                       onClick={() => {
                           handleDropButton(params.row.datetime, params.row.id)
                           setTimeout(() => refresh(sortModel), 10);
                       }}>Drop</Button>
    }


    const columns = [
        {field: 'id', headerName: 'ID', flex: 1},
        {
            field: 'datetime',
            headerName: 'Date',
            flex: 3,
            headerAlign: 'center',
            align: 'center',
            valueGetter: getDate,
            sortComparator: (a, b) => Date(a.toString()) - Date(b.toString())
        },
        // {field: 'status', headerName: 'Class Status', flex: 1, headerAlign: 'center', align: 'center',},
        {
            field: 'availability',
            headerName: 'Availability',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            valueGetter: getAvailability
        },
        {
            field: 'drop',
            headerName: 'Drop',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: renderDropButton
        },
        {
            field: 'enrol',
            headerName: 'Enrol',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: renderEnrolButton
        },
        {
            field: 'user_status',
            headerName: 'Status',
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            valueGetter: getStatus
        },
    ];


    useEffect(() => {
        refresh(sortModel);
    }, [pageSize, page])


    return (
        <>
            <Grid2 container justifyContent='flex-end' spacing={1}>
                <Grid2 item xs={12}>
                    <Typography variant={'h4'}>
                        Class Sessions
                    </Typography>
                </Grid2>
                <Grid2 item xs={12}>
                    <Button variant={allButton} sx={{ml: 1, mr: 1}} onClick={() => {
                        refresh(sortModel);
                        setAllButton('contained');
                        setScheduledButton('outlined');
                        setCancelledButton('outlined');
                    }}>All</Button>
                    <Button variant={scheduledButton} sx={{ml: 1, mr: 1}} onClick={() => {
                        refresh(sortModel, ['Scheduled']);
                        setAllButton('outlined');
                        setScheduledButton('contained');
                        setCancelledButton('outlined');
                    }}>Scheduled</Button>
                    <Button variant={cancelledButton} sx={{ml: 1, mr: 1}} onClick={() => {
                        refresh(sortModel, ['Cancelled']);
                        setAllButton('outlined');
                        setScheduledButton('outlined');
                        setCancelledButton('contained');
                    }}>Cancelled</Button>
                </Grid2>
                <Grid2 item xs={12}>
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
                        onPageSizeChange={(newPageSize,) => {
                            setPageSize(newPageSize)
                        }}
                        getRowId={(row) => row.datetime}
                        rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                        sx={{height: 500}}/>
                </Grid2>
            </Grid2>

            <StandardDialog
                openDialog={openDialog}
                onClose={handleClose}
                title={dialogTitle}
                contentText={dialogContentText}
                onConfirm={dialogConfirmAction}/>
        </>
    );
}

export default SessionTable;