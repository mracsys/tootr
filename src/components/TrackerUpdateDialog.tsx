import { Dispatch, SetStateAction } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '@/styles/TrackerUpdateDialog.css';

interface TrackerUpdateDialogProps {
    alertUpdate: boolean,
    setAlertUpdate: Dispatch<SetStateAction<boolean>>,
}

const TrackerUpdateDialog = ({
    alertUpdate,
    setAlertUpdate,
}: TrackerUpdateDialogProps) => {
    const cancelUpdate = () => {
        setAlertUpdate(false);
    }

    return (
        <Dialog
            open={alertUpdate}
            onClose={() => cancelUpdate()}
            disableScrollLock={true}
        >
            <DialogTitle>{"Scheduled Updates"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your tracker will update on <b>May 15th at 8PM US Eastern Daylight Time</b>.
                </DialogContentText>
                <DialogContentText className="redAlert">
                    <em><b>ANY SAVED PROGRESS WILL BE LOST.</b></em>
                </DialogContentText>
                <DialogContentText>
                    This update includes substantial changes for new randomizer features and requires a new data format. Please finish any open seeds you may have by <b>8PM EDT on May 15</b> to avoid losing your notes.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => cancelUpdate()}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TrackerUpdateDialog;