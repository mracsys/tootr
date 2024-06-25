import React, { Dispatch, SetStateAction } from "react";
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
    resetState: (usePreset?: boolean) => void,
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

    const confirmAlert = (usePreset: boolean) => {
        if (newRaceMode !== null) {
            changeRaceMode(newRaceMode);
        } else {
            resetState(usePreset);
        }
    }

    return (
        <Dialog
            open={alertReset}
            onClose={() => cancelAlert()}
            disableScrollLock={true}
            className='tootrDialog'
        >
            <DialogTitle>{"Reset Tracker?"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    All entrance and location checks will be cleared. Are you sure?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    newRaceMode !== null ?
                    <Button onClick={() => confirmAlert(false)}>OK</Button> :
                    <React.Fragment>
                        <Button onClick={() => confirmAlert(false)}>Reset with Current Settings</Button>
                        <Button onClick={() => confirmAlert(true)}>Rest to last Preset</Button>
                    </React.Fragment>
                }
                <Button onClick={() => cancelAlert()}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TrackerResetDialog;