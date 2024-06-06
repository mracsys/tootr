import React, { useState, Dispatch, SetStateAction, ChangeEventHandler } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Tab, Tabs } from '@mui/material';
import TabPanel from './TabPanel';

interface SeedMenuProps {
    importFunction: ChangeEventHandler<HTMLInputElement>,
    simFunction: ChangeEventHandler<HTMLInputElement>,
    presetFunction: (preset_name: string) => void,
    presets: string[],
    importDialogOpen: boolean,
    setImportDialogOpen: Dispatch<SetStateAction<boolean>>,
}

const NewSeedDialog = ({
    importFunction,
    simFunction,
    presetFunction,
    presets,
    importDialogOpen,
    setImportDialogOpen,
}: SeedMenuProps) => {
    const [tabValue, setTabValue] = useState<number>(0);

    const handleFileOpen = () => {
        handleClose();
        document.getElementById('graphDialogPlandoFileInput')?.click();
    }
    const handleSimFileOpen = () => {
        handleClose();
        document.getElementById('graphDialogSimFileInput')?.click();
    }
    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
    }
    const handleLoadPreset = () => {
        const selectElement = document.getElementById("graphPresetSelector") as HTMLSelectElement;
        const selectedValue = selectElement.value;
        if (!!selectedValue && selectedValue !== 'Select a preset...') {
            handleClose();
            presetFunction(selectedValue);
        }
    }
    const handleClose = () => {
        setImportDialogOpen(false);
    };

    return (
        <React.Fragment>
            <input id='graphDialogPlandoFileInput' style={{display: 'none'}} type='file' onChange={(e) => importFunction(e)} />
            <input id='graphDialogSimFileInput' style={{display: 'none'}} type='file' onChange={(e) => simFunction(e)} />
            <Dialog
                open={importDialogOpen}
                onClose={handleClose}
                disableScrollLock={true}
            >
                <DialogTitle>{"New Game"}</DialogTitle>
                <div style={{ minWidth: 600, borderBottom: 1, borderColor: '#ccc', borderBottomStyle: 'solid' }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label='From File' />
                        <Tab label='From Preset' />
                        <Tab label='Simulate File' />
                    </Tabs>
                </div>
                <TabPanel value={tabValue} index={0} className='seedMenu'>
                    <DialogContent>
                        <DialogContentText>
                            From File
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleFileOpen}>Select File</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </TabPanel>
                <TabPanel value={tabValue} index={1} className='seedMenu'>
                    <DialogContent>
                        <DialogContentText>
                            <select
                                id='graphPresetSelector'
                                className="presetSelect"
                                name='graphPresetSelector'
                                defaultValue='Select a preset...'
                            >
                                {presets.map((p, i) => 
                                    <option key={i} value={p}>{p}</option>
                                )}
                            </select>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleLoadPreset}>Select Preset</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </TabPanel>
                <TabPanel value={tabValue} index={2} className='seedMenu'>
                    <DialogContent>
                        <DialogContentText>
                            Simulate File
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSimFileOpen}>Select File</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </TabPanel>
            </Dialog>
        </React.Fragment>
    )
}

export default NewSeedDialog;