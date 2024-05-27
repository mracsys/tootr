import { Dispatch, SetStateAction } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface TrackerResetDialogProps {
    alertReset: boolean,
    newRaceMode: boolean | null,
    setAlertReset: Dispatch<SetStateAction<boolean>>,
    resetState: () => void,
    changeRaceMode: (raceMode: boolean) => void;
}

const TrackerResetDialog = ({
    alertReset,
    newRaceMode,
    setAlertReset,
    resetState,
    changeRaceMode,
}: TrackerResetDialogProps) => {

    const cancelAlert = () => {
        setAlertReset(false);
    }

    const confirmAlert = () => {
        if (newRaceMode !== null) {
            changeRaceMode(newRaceMode);
        } else {
            resetState();
        }
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
                <Button onClick={() => confirmAlert()}>Yes</Button>
                <Button onClick={() => cancelAlert()}>No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TrackerResetDialog;