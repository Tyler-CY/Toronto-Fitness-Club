import {TextField, } from "@mui/material";



const StandardTextField = (props) => {

    return (
        <TextField
                   sx={{
                       fontFamily: 'Helvetica', fontSize: '20px', fontWeight: 'bold', color: '#000000',
                       backgroundColor: '#ffffff',
                       borderRadius: '50px'
                   }}
                   {...props}/>
    );
}

// export default StandardTextField;