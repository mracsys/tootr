import React from 'react';
import Menu from '@material-ui/core/Menu';
//import useAutocomplete from '@material-ui/lab/useAutocomplete';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

class EntranceMenu extends React.Component {
    shouldComponentUpdate(nextProps) {
        return true;
    }
    render() {
        let entranceList = this.props.allAreas.entrances;
        let eAutoOptions = [];
        let longestOption = "";
        let handleLink = this.props.handleLink;
        if (typeof this.props.entrancePool === "undefined") {
            return null;
        } else {
            Object.keys(this.props.entrancePool).sort().map((areaCategory, l) => {
                this.props.entrancePool[areaCategory].sort(function(a,b) {
                    let aName = entranceList[a].tag === "" || entranceList[a].enableTag === false ?
                                entranceList[a].alias :
                                entranceList[a].tag;
                    let bName = entranceList[b].tag === "" || entranceList[b].enableTag === false ?
                                entranceList[b].alias :
                                entranceList[b].tag;
                    return aName.localeCompare(bName);
                }).map((subArea, j) => {
                    if ((this.props.allAreas.entrances[subArea].tagRep || this.props.allAreas.entrances[subArea].tag === "" || this.props.allAreas.entrances[subArea].enableTag === false) &&
                    (!(this.props.oneWay) || (this.props.oneWay && this.props.allAreas.entrances[subArea].oneWayELink === ""))) {
                        let optionLabel = (this.props.allAreas.entrances[subArea].tag === "" || this.props.allAreas.entrances[subArea].enableTag === false) ?
                                        this.props.allAreas.entrances[subArea].alias :
                                        this.props.allAreas.entrances[subArea].tag;
                        eAutoOptions.push({
                            areaGroup: areaCategory,
                            eName: optionLabel,
                            dataLinkTo: subArea,
                            dataLinkFrom: this.props.sourceEntrance,
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
                    id={this.props.id + "Element"}
                    anchorEl={this.props.anchorLocation}
                    open={Boolean(this.props.anchorLocation)}
                    onClose={this.props.handleClose}
                    PaperProps={{
                        style: {
                            border: '1px black solid',
                        },
                    }}
                    classes={{
                        list: this.props.classes.MenuPadding,
                    }}
                    TransitionProps={{
                        timeout: 0,
                    }}
                    getContentAnchorEl={null}
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
                        id={this.props.id + "autocomplete"}
                        options={eAutoOptions}
                        groupBy={(option) => option.areaGroup}
                        getOptionLabel={(option) => option.eName}
                        filterOptions={filterOptions}
                        fullWidth={true}
                        classes={{
                            option: this.props.classes.entranceAutoOption,
                            paper: this.props.classes.entranceAutoPaper,
                            groupUl: this.props.classes.entranceAutoUl,
                            groupLabel: this.props.classes.entranceAreaText,
                            inputRoot: this.props.classes.entranceAutoInput,
                            endAdornment: this.props.classes.entranceAutoNoButton,
                            root: this.props.classes.entranceAutoSearchLabel,
                            popper: this.props.classes.entranceAutoPopper,
                            listbox: this.props.classes.entranceAutoListBox,
                        }}
                        onKeyDown={(e) => e.stopPropagation()}
                        renderInput={(params) => 
                            <div>
                                {/* 
                                    Hack to make the input width the same as the dropdown width since
                                    they are implemented as completely separate components styled to
                                    look connected for whatever reason.
                                    Using disablePortal to disable this behavior hard-codes the option
                                    list width to the width of the parent input and cannot be overridden.
                                    This prevents auto-resizing on option length gracefully. 
                                */}
                                <div className={this.props.classes.entranceAutoWidthHack}>{longestOption}</div>
                                <TextField {...params} autoFocus key={this.props.id + "autocomplete-input"} label="Search Entrances" variant="filled" />
                            </div>
                        }
                        renderOption={(option) => 
                            <div className={this.props.classes.entranceText}>
                                {option.eName}
                            </div>
                        }
                        open={true}
                        autoHighlight={true}
                        disablePortal={true}
                        onChange={(event, newValue) => {
                            handleLink(newValue.dataLinkFrom, newValue.dataLinkTo);
                        }}
                    />
                </Menu>
            );
        }
    }
}

export default EntranceMenu