import Menu from '@mui/material/Menu';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { GraphEntrance, GraphEntrancePool } from '@mracsys/randomizer-graph-tool';

interface AutoOption {
    areaGroup: string,
    eName: string,
    dataLinkTo: string,
    dataLinkFrom: string,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
}

interface EntranceMenuProps {
    anchorLocation?: Element | null,
    sourceEntrance: GraphEntrance | null,
    entrancePool: GraphEntrancePool,
    id: string,
    handleClose: () => void,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
}

const EntranceMenu = ({
    anchorLocation,
    sourceEntrance,
    entrancePool,
    id,
    handleClose,
    handleLink,
}: EntranceMenuProps) => {
    let eAutoOptions: AutoOption[] = [];
    let longestOption = "";
    if (sourceEntrance === null) {
        return null;
    } else {
        const sortEntranceAliases = (e1: GraphEntrance, e2: GraphEntrance) => {
            let e1Alias = e1.use_target_alias ? e1.target_alias : e1.alias;
            let e2Alias = e2.use_target_alias ? e2.target_alias : e2.alias;
            return e1Alias.localeCompare(e2Alias);
        }

        for (let [areaCategory, entranceList] of Object.entries(entrancePool).sort((a, b) => a[0].localeCompare(b[0]))) {
            let aliasesAdded: string[] = [];
            for (let entrance of entranceList.sort(sortEntranceAliases)) {
                let optionLabel: string;
                if (!!entrance.reverse && entrance.target_group?.page !== '') {
                    if (entrance.reverse.target_group?.page === '') {
                        optionLabel = `from ${entrance.reverse.alias}`;
                    } else {
                        optionLabel = entrance.reverse.alias;
                    }
                } else if (entrance.use_target_alias) {
                    optionLabel = entrance.target_alias;
                } else {
                    optionLabel = entrance.alias;
                }
                if (aliasesAdded.includes(optionLabel)) continue;
                aliasesAdded.push(optionLabel);
                eAutoOptions.push({
                    areaGroup: areaCategory,
                    eName: optionLabel,
                    dataLinkTo: entrance.name,
                    dataLinkFrom: sourceEntrance.name,
                    handleLink: handleLink,
                });
                if (optionLabel.length > longestOption.length) {
                    longestOption = optionLabel;
                }
            }
        }

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
                    onChange={(_event, newValue: AutoOption | null, _reason) => {
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