import {useEffect, useState} from "react";
import {BASE_URL} from "../../../../base_url";
import {Card, CardContent, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const CardInfo = () => {
    const [cardInfo, setCardInfo] = useState({});
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const token = localStorage.getItem('tfc_token')

    let navigate = useNavigate();
    const handleUpdateCard = () => {
        navigate('/update-card');
    }

    useEffect(() => {
        fetch(BASE_URL() + 'subscriptions/cardinfo/', {
            headers: {
                'Authorization': "Bearer " + token
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setFetchSuccess(true);
                }
                return response.json();
            })
            .then((data) => {
                setCardInfo(data);
            })
            .catch((reason) => console.log(reason))
    }, []);

    if (fetchSuccess) {
        return (
            <Card style={{display: "flex", width: '100%'}}>
                {/*<CardMedia height={100} width={500} component={'img'} image={StockCardImage} alt={"Credit Card"}/>*/}
                <CardContent>
                    <Typography variant={"h5"} padding={-5}>
                        Your Credit/Debit Card: {cardInfo.holder}'s {cardInfo.number} <Button
                        onClick={handleUpdateCard}>Update Card</Button>
                    </Typography>

                </CardContent>
            </Card>
        );
    } else {
        return <p>No Credit/Debit card in record.</p>
    }
}

// export default CardInfo