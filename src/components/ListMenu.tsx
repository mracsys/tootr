import React from "react";
import { Menu } from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import '@/styles/ListMenu.css';

interface ListMenuProps {
    anchorLocation?: Element | null,
    handleClose: () => void,
    handleFind: (option: string) => void,
    regions: string[],
    id: string,
}

const ListMenu = ({
    anchorLocation,
    handleClose,
    handleFind,
    regions,
    id,

}: ListMenuProps) => {

    const filterOptions = createFilterOptions({
        stringify: (option: string) => option,
    });

    const equalOptions = (option: string, value: string) => {
        return option === value;
    };

    let longestOption: string = '';

    for (let r of regions) {
        if (r.length > longestOption.length) {
            longestOption = r;
        }
    }

    return (
        <React.Fragment>
            <Menu
                id={id}
                anchorEl={anchorLocation}
                open={Boolean(anchorLocation)}
                onClose={handleClose}
                className="hintListMenu"
                TransitionProps={{ timeout: 0 }}
                disableScrollLock={true}
                slotProps={{
                    paper: {
                        style: {
                            border: '1px black solid',
                            backgroundColor: 'var(--md-sys-color-surface-bright)',
                            color: 'var(--md-sys-color-on-surface)',
                        },
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Autocomplete
                    id={id + "hint-autocomplete"}
                    options={regions}
                    filterOptions={filterOptions}
                    isOptionEqualToValue={equalOptions}
                    renderInput={(params) => 
                        <div>
                        <div className="entranceAutoWidthHack">{longestOption}</div>
                        <TextField {...params} autoFocus key={id + "hint-autocomplete-input"} label="Search..." variant="filled" />
                        </div>
                    }
                    onChange={(_event, newValue: string | null, _reason) => {
                        if (!!newValue)
                            handleFind(newValue);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                    open={true}
                    disablePortal={true}
                    fullWidth={true}
                    classes={{
                        option: "entranceAutoOption entranceText",
                        groupUl: "entranceAutoUl",
                        groupLabel: "entranceAreaText",
                        endAdornment: "entranceAutoNoButton",
                        listbox: "entranceAutoListBox",
                        popper: "entranceAutoPopper",
                        inputRoot: "entranceAutoInput",
                        root: "entranceAutoSearchLabel",
                        paper: "entranceAutoPaper",
                    }}
                    slotProps={{
                        paper: {
                            style: {
                                backgroundColor: 'var(--md-sys-color-surface-bright)',
                                color: 'var(--md-sys-color-on-surface)',
                            }
                        },
                    }}
                />
            </Menu>
        </React.Fragment>
    );
}

export default ListMenu;