import Autocomplete from "@mui/material/Autocomplete";
import {styled} from "@mui/material";


const AutoComp = styled(Autocomplete)({
    fontSize: 15,
    borderWidth: 5,
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '3px solid',
    borderColor: '#000000',
    borderRadius: '50px',
    padding: 5,
    boxShadow: '0px 0px 5px rgba(66,66,66,.75)',
    textShadow: '0px 0px 0px rgba(66,66,66,.75)',
});

const StandardAutocomplete = (props) => {
    return (
        <AutoComp {...props}/>
    );
}

// export default StandardAutocomplete;