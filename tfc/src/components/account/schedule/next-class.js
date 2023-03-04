import Grid2 from "@mui/material/Unstable_Grid2";
import {Box, Button, Typography} from "@mui/material";
import {BASE_URL} from "../../base_url";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


const NextClass = () => {

    let navigate = useNavigate();

    const [nextClass, setNextClass] = useState({});

    const getUpcomingSessions = () => {
        let url = BASE_URL() + 'services/sessions/upcoming/'

        fetch(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('tfc_token')
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.count > 0) {
                    setNextClass(data.results[0])
                }
            })
            .catch((reason) => console.log(reason))
    }


    useEffect(() => {
        getUpcomingSessions()
    }, [])


    let date = new Date(nextClass.datetime)
    date = date.toDateString() + ' ' + date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});


    if (Object.keys(nextClass).length === 0) {
        return (
            <>
                <Grid2 container spacing={1}>
                    <Grid2 item xs={9}>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography variant='h4'>
                                No Upcoming Classes
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={3}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={() => {
                                navigate('/classes/search')
                            }}>
                                Go to Class Page
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </>
        );
    } else {
        return (
            <>
                <Grid2 container spacing={1}>
                    <Grid2 item xs={9}>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography variant='h4'>
                                Next Class: {nextClass.the_class.name} with {nextClass.the_class.coach}
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={3}>
                    </Grid2>
                    <Grid2 item xs={9}>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography variant='h5'>
                                Location: {nextClass.the_studio.name} at {nextClass.the_studio.address}
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={3}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={() => {
                                navigate('/classes/sessions?class_id=' + nextClass.the_class.id)
                            }}>
                                Cancel Lesson
                            </Button>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={9} alignSelf={'flex-end'}>
                        <Box display="flex" justifyContent="flex-start">
                            <Typography variant='h5'>
                                Date: {date}
                            </Typography>
                        </Box>
                    </Grid2>
                    <Grid2 item xs={3}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button onClick={() => {
                                navigate('/classes/search')
                            }}>
                                Go to Class Page
                            </Button>
                        </Box>
                    </Grid2>
                </Grid2>
            </>
        );
    }
}

export default NextClass;