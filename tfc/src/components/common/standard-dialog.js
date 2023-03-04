import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";


const StandardDialog = (props) => {

    const {openDialog, onClose, title, contentText, onConfirm} = props

    return (
        <Dialog open={openDialog} onClose={onClose}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.children}

                <Button variant='outlined' onClick={onClose}>Cancel</Button>
                <Button variant='contained' onClick={() => {
                    onConfirm();
                }}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );

}

export default StandardDialog