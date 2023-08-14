import React from 'react';
import Menu from '@mui/material/Menu';
//import useAutocomplete from '@mui/material/useAutocomplete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { EntrancePool, AllAreas } from './Tracker';

interface AutoOption {
    areaGroup: string,
    eName: string,
    dataLinkTo: string,
    dataLinkFrom: string,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
}

interface EntranceMenuProps {
    anchorLocation?: Element | null,
    sourceEntrance: string,
    entrancePool: EntrancePool,
    allAreas: AllAreas,
    connector: boolean,
    title: string,
    oneWay: boolean,
    decoupled: boolean,
    isReverse: boolean,
    id: string,
    handleClose: () => void,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
}

const EntranceMenu = ({
    anchorLocation,
    sourceEntrance,
    entrancePool,
    allAreas,
    connector,
    title,
    oneWay,
    decoupled,
    isReverse,
    id,
    handleClose,
    handleLink,
}: EntranceMenuProps) => {
    let entranceList = allAreas.entrances;
    let eAutoOptions: AutoOption[] = [];
    let longestOption = "";
    if (typeof entrancePool === "undefined") {
        return null;
    } else {
        Object.keys(entrancePool).sort().map((areaCategory, l) => {
            let entrances: string[] = entrancePool[areaCategory];
            entrances.sort(function(a,b) {
                let aName = entranceList[a].tag === "" || entranceList[a].enableTag === false ?
                            entranceList[a].alias :
                            entranceList[a].tag;
                let bName = entranceList[b].tag === "" || entranceList[b].enableTag === false ?
                            entranceList[b].alias :
                            entranceList[b].tag;
                return aName.localeCompare(bName);
            }).map((subArea, j) => {
                if ((allAreas.entrances[subArea].tagRep || allAreas.entrances[subArea].tag === "" || allAreas.entrances[subArea].enableTag === false) &&
                (!(oneWay) || (oneWay && allAreas.entrances[subArea].oneWayELink === "")) &&
                !(((areaCategory === title && !(oneWay || isReverse)) || areaCategory === "Warp Songs" || entrancePool[areaCategory].length === 0) && connector === false)) {
                    let optionLabel = (allAreas.entrances[subArea].tag === "" || allAreas.entrances[subArea].enableTag === false) ?
                                    allAreas.entrances[subArea].alias :
                                    allAreas.entrances[subArea].tag;
                    eAutoOptions.push({
                        areaGroup: areaCategory,
                        eName: optionLabel,
                        dataLinkTo: subArea,
                        dataLinkFrom: sourceEntrance,
                        handleLink: handleLink,
                    });
                    if (optionLabel.length > longestOption.length) {
                        longestOption = optionLabel;
                    }
                }
                return null;
        }); return null;});

        const filterOptions = createFilterOptions({
            stringify: (option: AutoOption) => option.eName + " " + option.areaGroup,
        });

        return (
            <Menu
                id={id + "Element"}
                anchorEl={anchorLocation}
                open={Boolean(anchorLocation)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        border: '1px black solid',
                    },
                }}
                classes={{
                    list: "MenuPadding",
                }}
                TransitionProps={{
                    timeout: 0,
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
                    id={id + "autocomplete"}
                    options={eAutoOptions}
                    groupBy={(option) => option.areaGroup}
                    getOptionLabel={(option) => option.eName}
                    filterOptions={filterOptions}
                    renderInput={(params) => 
                        <div>
                        <div className="entranceAutoWidthHack">{longestOption}</div>
                        <TextField {...params} key={id + "autocomplete-input"} label="Search Entrances" variant="filled" />
                        </div>
                    }
                    onChange={(event, newValue: AutoOption | null, reason) => {
                        if (!!newValue)
                            handleLink(newValue.dataLinkFrom, newValue.dataLinkTo);
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
                />
            </Menu>
        );
    }
}

export default EntranceMenu