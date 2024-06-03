import { useState, MouseEvent, ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Tab, Tabs } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TabPanel from './TabPanel';

interface SeedMenuProps {
    importFunction: ChangeEventHandler<HTMLInputElement>,
    exportFunction: () => void,
    presetFunction: (preset_name: string) => void,
    simFunction: ChangeEventHandler<HTMLInputElement>,
    setAlertReset: Dispatch<SetStateAction<boolean>>,
    presets: string[],
}

export const SeedMenu = ({
    importFunction,
    exportFunction,
    presetFunction,
    simFunction,
    setAlertReset,
    presets,
}: SeedMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [importDialogOpen, setImportDialogOpen] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState<number>(0);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setImportDialogOpen(false);
        setAnchorEl(null);
    };
    const handleImport = () => {
        setImportDialogOpen(true);
        setAnchorEl(null);
    };
    const handleExport = () => {
        exportFunction();
        setAnchorEl(null);
    }
    const handleFileOpen = () => {
        setAnchorEl(null);
        document.getElementById('graphPlandoFileInput')?.click();
    }
    const handleSimFileOpen = () => {
        setAnchorEl(null);
        document.getElementById('graphSimFileInput')?.click();
    }
    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
    }
    const handleLoadPreset = () => {
        const selectElement = document.getElementById("graphPresetSelector") as HTMLSelectElement;
        const selectedValue = selectElement.value;
        if (!!selectedValue && selectedValue !== 'Select a preset...') {
            presetFunction(selectedValue);
            setAnchorEl(null);
            handleClose();
        }
    }

    const handleReset = () => {
        setAlertReset(true);
        setAnchorEl(null);
    }

    return (
        <div className='seedMenuContainer'>
            <div className="menuSeedButton">
                <span onClick={handleClick} className="seedMenuButtonLabel">Seed 1 <ExpandMore /></span>
                <input id='graphPlandoFileInput' style={{display: 'none'}} type='file' onChange={(e) => importFunction(e)} />
                <input id='graphSimFileInput' style={{display: 'none'}} type='file' onChange={(e) => simFunction(e)} />
            </div>
            <Menu
                id="seedMenu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleImport}>New</MenuItem>
                <MenuItem onClick={handleClose}>Recent</MenuItem>
                <MenuItem onClick={handleFileOpen}>Import</MenuItem>
                <MenuItem onClick={handleExport}>Export</MenuItem>
                <MenuItem onClick={handleReset}>Reset</MenuItem>
            </Menu>
            <Dialog
                open={importDialogOpen}
                onClose={handleClose}
                disableScrollLock={true}
            >
                <DialogTitle>{"Track New Seed"}</DialogTitle>
                
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
        </div>
    );
}