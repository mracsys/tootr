import { useState, Dispatch, SetStateAction, ChangeEvent, MouseEventHandler } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import type { SavedTrackerState } from './Tracker';

import '@/styles/SavedSeedDialog.css';

interface SavedSeedDialogProps {
    saving: boolean,
    saveDialogOpen: boolean,
    setSaveDialogOpen: Dispatch<SetStateAction<boolean>>,
    saveFunction: (saveName: string) => void,
    loadFunction: (saveName: string) => void,
    deleteFunction: (saveName: string) => void,
    stateListFunction: () => {[savedName: string]: SavedTrackerState},
}

const SavedSeedDialog = ({
    saving,
    saveDialogOpen,
    setSaveDialogOpen,
    saveFunction,
    loadFunction,
    deleteFunction,
    stateListFunction,

}: SavedSeedDialogProps) => {
    const [saveName, setSaveName] = useState<string>('');
    const [warningMsg, setWarningMsg] = useState<string>('');
    const [sortKey, setSortKey] = useState<string>('SaveName');

    const stateSort = (a: SavedTrackerState, b: SavedTrackerState): number => {
        switch (sortKey) {
            case 'SaveName':
                return a.SaveName.localeCompare(b.SaveName);
            case 'Modified':
                return a.Modified - b.Modified;
            case 'Created':
                return a.Created - b.Created;
            default:
                return 0;
        }
    };
    const graphStates = stateListFunction();
    const stateList = Object.values(graphStates).sort(stateSort);
    const stateNameList = Object.keys(graphStates);

    const handleSaveLoad = () => {
        if (saveName === '') {
            if (saving) {
                setWarningMsg('You must enter a new save name or select a saved game to overwrite.');
            } else {
                setWarningMsg('You must select a saved game to load.');
            }
        } else {
            if (saving) {
                handleClose();
                saveFunction(saveName);
            } else {
                if (stateNameList.includes(saveName)) {
                    handleClose();
                    loadFunction(saveName);
                } else {
                    setWarningMsg('Cannot load game. The selected game save name does not exist.')
                }
            }
        }
    }
    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortKey(e.target.value);
    }
    const handleRowClick: MouseEventHandler<HTMLTableRowElement> = (e) => {
        const newSaveName = e.currentTarget.getAttribute('data-save-name');
        if (!!newSaveName) {
            setSaveName(newSaveName);
        }
    }
    const handleSaveNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newSaveName = e.target.value;
        setSaveName(newSaveName);
    }
    const handleClose = () => {
        setWarningMsg('');
        setSaveName('');
        setSaveDialogOpen(false);
    };

    return (
        <Dialog
            open={saveDialogOpen}
            onClose={handleClose}
            disableScrollLock={true}
            className='tootrDialog graphStateDialog'
        >
            <DialogTitle>{saving ? "Save Game" : "Load Game"}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {
                        warningMsg !== '' ?
                            <span className='graphStateTableWarning'>{warningMsg}</span>
                            : null
                    }
                </DialogContentText>
                <label htmlFor="graphStateSortSelector">Sort by</label>
                <select
                    id='graphStateSortSelector'
                    className="presetSelect"
                    name='graphStateSortSelector'
                    defaultValue='SaveName'
                    onChange={handleSortChange}
                >
                    <option value="SaveName">Save Name</option>
                    <option value="Modified">Modified Date</option>
                    <option value="Created">Creation Date</option>
                </select>
                <table className='graphStateTable'>
                    <thead>
                    <tr>
                        <td>Save Name</td>
                        <td>Modified</td>
                        <td>Created</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stateList.length > 0 ?
                        stateList.map((state, i) => {
                            return (
                                <tr
                                    key={`graphStateTableRow${i}`}
                                    data-save-name={state.SaveName}
                                    onClick={handleRowClick}
                                    className={state.SaveName === saveName ? 'graphStateTableSelectedRow' : ''}
                                >
                                    <td>{state.SaveName}</td>
                                    <td>{new Date(state.Modified).toLocaleString()}</td>
                                    <td>{new Date(state.Created).toLocaleString()}</td>
                                    <td><IconButton
                                        className="stateDeleteButton"
                                        size="small"
                                        component="span"
                                        onClick={() => deleteFunction(state.SaveName)}
                                    >
                                        <ClearIcon />
                                    </IconButton></td>
                                </tr>
                            )
                        }) :
                        <tr className='graphStateTableEmpty'><td colSpan={4}>No Saved Games</td></tr>
                    }
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
                <input type="text" className='graphSaveNameInput' onChange={handleSaveNameChange} value={saveName} />
                <Button onClick={handleSaveLoad}>{saving ? 'Save' : 'Load'}</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SavedSeedDialog;