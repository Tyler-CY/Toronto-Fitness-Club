import {BASE_URL} from "../../../base_url";
import {Button, TextField} from "@mui/material";


const UpdateCard = () => {

    // send POST request to the server for update.
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(BASE_URL() + 'subscriptions/cardinfo/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('tfc_token'),
            },
            body: JSON.stringify({
                'number': event.target.elements.number.value,
                'holder': event.target.elements.holder.value,
                'cvv': event.target.elements.cvv.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((reason) => console.log(reason))
    };


    return (
        <>
            <h1>Update your Credit/Debit Card</h1>
            <div id='update_card_div'>
                <form id='update_card_form' onSubmit={handleSubmit}>
                    <TextField type='text' id='number' label='Card Number' required fullWidth/>
                    <br/>

                    <TextField type='text' id='holder' label='Holder Name' required fullWidth/>
                    <br/>

                    <TextField type='text' id='cvv' label='CVV' required fullWidth/>
                    <br/>

                    <Button type='submit' value='Submit' variant='contained' fullWidth>Update</Button>
                </form>
            </div>
        </>
    );
}

// export default UpdateCard;