import {styled} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers";


const DatePicker = styled(DesktopDatePicker)({
    fontSize: 15,
    borderWidth: 5,
    borderColor: '#ff6e00',
    backgroundColor: '#ffa04c',
    color: '#000000',
    borderStyle: 'groove',
    borderRadius: 8,
    padding: 0,
    boxShadow: '0px 0px 5px rgba(66,66,66,.75)',
    textShadow: '0px 0px 0px rgba(66,66,66,.75)',
})

const StandardDesktopDatePicker = (props) => {
    return (
        <DatePicker {...props}/>
    );

}

// export default StandardDesktopDatePicker;