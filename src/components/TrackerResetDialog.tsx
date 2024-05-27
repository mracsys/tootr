import { Dispatch, SetStateAction } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface TrackerResetDialogProps {
    alertReset: boolean,
    setAlertReset: Dispatch<SetStateAction<boolean>>,
    resetState: () => void,
}

const TrackerResetDialog = ({
    alertReset,
    setAlertReset,
    resetState,
}: TrackerResetDialogProps) => {

    const cancelAlert = () => {
        setAlertReset(false);
    }

    return (
        <Dialog
            open={alertReset}
            onClose={() => cancelAlert()}
            disableScrollLock={true}
        >
            <DialogTitle>{"Reset Tracker?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    All entrance and location checks will be cleared. Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => resetState()}>Yes</Button>
                <Button onClick={() => cancelAlert()}>No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TrackerResetDialog;