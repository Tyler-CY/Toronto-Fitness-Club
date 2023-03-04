import {Card, CardMedia, Typography, CardContent, CardActions, Button, Divider} from "@mui/material";

import StockStudioImage from '../../images/stock-studio-image.png'
import {useNavigate} from "react-router-dom";
import {Marker} from "pigeon-maps";


const StudioCard = (props) => {

    const studio_name = props.data.name;
    let navigate = useNavigate();
    const goToStudioClasses = () => {
        navigate('/classes/search?&studio=' + studio_name);
    }


    // Reference for calculating distance:
    // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
    // by Feb 7, 2014 at 8:52 Salvador Dali
    // edited Aug 14, 2021 at 15:24 angleKH

    const calculateDistance = (lat1, long1, lat2, long2) => {
        const p = Math.PI / 180;
        const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 +
            Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((long2 - long1) * p)) / 2;
        return 12742 * Math.asin(Math.sqrt(a));
    }

    return (

        <Card sx={{
            border: '2px solid black',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>

            <div>
                <CardMedia height='auto' width='auto' component='img' image={props.data.images[0].image ?? StockStudioImage}
                           alt='Studio Image'/>

                <CardContent>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'h4'} align="center">
                        {props.data.name}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'h6'} align="center">
                        Distance: {Math.round(calculateDistance(props.data.latitude, props.data.longitude, props.anchor[0], props.anchor[1]) * 100, 2) / 100} km
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'h6'} align="center">
                        {props.data.address} {props.data.postal_code}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'h6'} align="center">
                        {props.data.phone_number}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                </CardContent>
            </div>


            <CardActions align="flex-end" sx={{display: 'flex', alignItems: 'stretch'}}>
                <Button fullWidth variant={'outlined'} onClick={() => {
                }}>Details</Button>
                <Button fullWidth variant={'contained'} onClick={() => {

                    goToStudioClasses();
                }}>Classes</Button>

            </CardActions>

        </Card>


    );
}

export default StudioCard