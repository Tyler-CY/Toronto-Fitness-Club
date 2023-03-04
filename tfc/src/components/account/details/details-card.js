import {Card, CardHeader, CardMedia, Box, Grid, Paper, styled, IconButton} from "@mui/material";
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";

const DetailsCard = (props) => {

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: '#ff7c00',
        padding: theme.spacing(2),
        textAlign: 'left',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontSize: '24px'
    }));


    let navigate = useNavigate();
    const handleEdit = () => {
        navigate('/update-account');
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
                alignContent: 'stretch'
            }}>
                <Card sx={{backgroundColor: '#ffa258',}}>
                    <CardHeader
                        title={'User Profile'}
                        action={
                            <IconButton aria-label='edit' onClick={handleEdit}>
                                <EditIcon/>
                            </IconButton>
                        }
                    />

                    <CardContent>
                        <Grid container spacing={1}>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <CardMedia alt={'Profile Picture'}
                                               image={props.user.avatar || "http://localhost:8000/media/user-avatars/stock-user-avatar.jpg"}
                                               component="img"
                                               sx={{
                                                   margin: 'auto',
                                                   width: '75%',
                                                   aspectRatio: '1 / 1',
                                                   border: '3px solid black',
                                                   borderRadius: '50%'
                                               }}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6} spacing={0}>
                                <Grid item xs={12}>
                                    <Item>First Name: <b>{props.user.first_name}</b></Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Item>Last Name: <b>{props.user.last_name}</b></Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Item>Phone
                                        Number: <b>{props.user.phone_number ? props.user.phone_number : 'unknown'}</b></Item>
                                </Grid>
                                <Grid item xs={12}>
                                    <Item>Email: <b>{props.user.email}</b></Item>
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </Card>
            </Box>

        </>
    );
}

export default DetailsCard;