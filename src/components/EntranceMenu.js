import React from 'react';
import Menu from '@mui/material/Menu';
//import useAutocomplete from '@mui/material/useAutocomplete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const EntranceMenu = (props) => {
    //shouldComponentUpdate(nextProps) {
    //    return true;
    //}

    let entranceList = props.allAreas.entrances;
    let eAutoOptions = [];
    let longestOption = "";
    let handleLink = props.handleLink;
    if (typeof props.entrancePool === "undefined") {
        return null;
    } else {
        Object.keys(props.entrancePool).sort().map((areaCategory, l) => {
            props.entrancePool[areaCategory].sort(function(a,b) {
                let aName = entranceList[a].tag === "" || entranceList[a].enableTag === false ?
                            entranceList[a].alias :
                            entranceList[a].tag;
                let bName = entranceList[b].tag === "" || entranceList[b].enableTag === false ?
                            entranceList[b].alias :
                            entranceList[b].tag;
                return aName.localeCompare(bName);
            }).map((subArea, j) => {
                if ((props.allAreas.entrances[subArea].tagRep || props.allAreas.entrances[subArea].tag === "" || props.allAreas.entrances[subArea].enableTag === false) &&
                (!(props.oneWay) || (props.oneWay && props.allAreas.entrances[subArea].oneWayELink === "")) &&
                !(((areaCategory === props.title && !(props.oneWay || props.isReverse)) || areaCategory === "Warp Songs" || props.entrancePool[areaCategory].length === 0) && props.connector === false)) {
                    let optionLabel = (props.allAreas.entrances[subArea].tag === "" || props.allAreas.entrances[subArea].enableTag === false) ?
                                    props.allAreas.entrances[subArea].alias :
                                    props.allAreas.entrances[subArea].tag;
                    eAutoOptions.push({
                        areaGroup: areaCategory,
                        eName: optionLabel,
                        dataLinkTo: subArea,
                        dataLinkFrom: props.sourceEntrance,
                        handleLink: handleLink,
                    });
                    if (optionLabel.length > longestOption.length) {
                        longestOption = optionLabel;
                    }
                }
                return null;
        }); return null;});

        const filterOptions = createFilterOptions({
            stringify: (option) => option.eName + " " + option.areaGroup,
        });

        return (
            <Menu
                id={props.id + "Element"}
                anchorEl={props.anchorLocation}
                open={Boolean(props.anchorLocation)}
                onClose={props.handleClose}
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
                    id={props.id + "autocomplete"}
                    options={eAutoOptions}
                    groupBy={(option) => option.areaGroup}
                    getOptionLabel={(option) => option.eName}
                    filterOptions={filterOptions}
                    renderInput={(params) => 
                        <div>
                        <div className="entranceAutoWidthHack">{longestOption}</div>
                        <TextField {...params} key={props.id + "autocomplete-input"} label="Search Entrances" variant="filled" />
                        </div>
                    }
                    onChange={(event, newValue, reason) => {
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