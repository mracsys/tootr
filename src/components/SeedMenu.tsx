import { useState, MouseEvent, ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NewSeedDialog from './NewSeedDialog';
import type { SavedTrackerState } from './Tracker';
import SavedSeedDialog from './SavedSeedDialog';

interface SeedMenuProps {
    importFunction: ChangeEventHandler<HTMLInputElement>,
    exportFunction: () => void,
    presetFunction: (preset_name: string) => void,
    saveFunction: (saveName: string) => void,
    loadFunction: (saveName: string) => void,
    deleteFunction: (saveName: string) => void,
    simFunction: ChangeEventHandler<HTMLInputElement>,
    stateListFunction: () => {[savedName: string]: SavedTrackerState},
    setAlertReset: Dispatch<SetStateAction<boolean>>,
    presets: string[],
    currentPreset: string,
}

export const SeedMenu = ({
    importFunction,
    exportFunction,
    presetFunction,
    saveFunction,
    loadFunction,
    deleteFunction,
    simFunction,
    stateListFunction,
    setAlertReset,
    presets,
    currentPreset,
}: SeedMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [importDialogOpen, setImportDialogOpen] = useState<boolean>(false);
    const [saveDialogOpen, setSaveDialogOpen] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleImport = () => {
        setImportDialogOpen(true);
        handleClose();
    };
    const handleExport = () => {
        exportFunction();
        handleClose();
    }
    const handleFileOpen = () => {
        handleClose();
        document.getElementById('graphPlandoFileInput')?.click();
    }
    const handleReset = () => {
        setAlertReset(true);
        handleClose();
    }
    const handleLoad = () => {
        setSaving(false);
        setSaveDialogOpen(true);
        handleClose();
    }
    const handleSave = () => {
        setSaving(true);
        setSaveDialogOpen(true);
        handleClose();
    }

    return (
        <div className='seedMenuContainer'>
            <button
                onClick={handleClick}
                className="menuButton"
            >
                <span className="menuButtonLabel">File</span>
            </button>
            <input id='graphPlandoFileInput' style={{display: 'none'}} type='file' onChange={(e) => importFunction(e)} />
            <Menu
                id="seedMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleImport}>New</MenuItem>
                <MenuItem onClick={handleLoad}>Load</MenuItem>
                <MenuItem onClick={handleSave}>Save</MenuItem>
                <MenuItem onClick={handleFileOpen}>Import</MenuItem>
                <MenuItem onClick={handleExport}>Export</MenuItem>
                <MenuItem onClick={handleReset}>Reset</MenuItem>
            </Menu>
            <NewSeedDialog
                importFunction={importFunction}
                simFunction={simFunction}
                presetFunction={presetFunction}
                presets={presets}
                currentPreset={currentPreset}
                importDialogOpen={importDialogOpen}
                setImportDialogOpen={setImportDialogOpen}
            />
            <SavedSeedDialog
                saving={saving}
                saveDialogOpen={saveDialogOpen}
                setSaveDialogOpen={setSaveDialogOpen}
                saveFunction={saveFunction}
                loadFunction={loadFunction}
                deleteFunction={deleteFunction}
                stateListFunction={stateListFunction}
            />
        </div>
    );
}