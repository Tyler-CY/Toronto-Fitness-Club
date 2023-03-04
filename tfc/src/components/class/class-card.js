import {
    Card,
    CardMedia,
    Typography,
    CardContent,
    Divider
} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import StockStudioImage from '../../images/stock-class-image.png'
import {useNavigate} from "react-router-dom";


const ClassCard = (props) => {
    let navigate = useNavigate();
    const handleDetails = (class_id) => {
        navigate('/classes/sessions?class_id=' + class_id)
    }


    return (
        <Card sx={{
            border: '2px solid black',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>

            <div>
                <CardMedia height='auto' width='auto' component='img' image={props.data.image ?? StockStudioImage}
                           alt='Studio Image'/>

                <CardContent>
                    <Typography variant={'h4'} align="center">
                        {props.data.name}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'h6'} align="center">
                        {props.data.studio.name}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'subtitle1'} align="center">
                        Instructor: {props.data.coach}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'subtitle1'} align="center">
                        {props.data.keywords.join(', ')}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                    <Typography variant={'subtitle1'} align="center">
                        {props.data.description}
                    </Typography>
                    <Divider sx={{pt: 1, mb: 1}}/>
                </CardContent>
            </div>


            <CardActions align="flex-end" sx={{display: 'flex',}}>
                <Button fullWidth variant={'contained'} onClick={() => {
                    handleDetails(props.data.id)
                }}>See Schedule</Button>
            </CardActions>
        </Card>

    );
}

export default ClassCard