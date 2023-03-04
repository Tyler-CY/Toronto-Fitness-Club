import {Button, styled} from "@mui/material";
import * as React from "react";


const Btn = styled(Button)({
    // background: 'linear-gradient(to bottom, #ff7700 5%, #ff3c00 100%)',
    backgroundColor: 'transparent',

    borderRadius: '28px',

    display: 'inline-block',
    cursor: 'pointer',

    color: '#000000',

    fontFamily: 'Helvetica',
    fontSize: '20px',
    fontWeight: 'bold',

    padding: '4px 16px',
    marginTop: '4px',
    marginBottom: '4px',
    marginLeft: '8px',
    marginRight: '8px',

    '&:hover': {
        // background: 'linear-gradient(to bottom, #ff3c00 5%, #ff7700 100%)',
        backgroundColor: '#ffd500',
    }
});

const StandardButton = (props) => {
    return (
        <Btn  {...props}>{props.children}</Btn>
    );
}

// export default StandardButton;