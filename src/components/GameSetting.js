import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox'
import { FormHelperText, ListItemText, MenuItem } from '@mui/material';

const GameSetting = (props) => {
    let [open, setOpen] = useState(props.settings.open);

    return (
        <React.Fragment>
            <div className="settingCategory" onClick={() => setOpen(!open)}>
                <span>{props.title}</span>
                {open ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={open} timeout='auto' unmountOnExit>
                    { Object.keys(props.settings).map((setting, i) => {
                        if (setting !== 'open' && setting !== 'Mixed Pools' && setting !== 'Shuffle Interiors') {
                            return (
                            <React.Fragment key={'settingFrag' + i}>
                                <div className="wrapperWrapper">
                                    <div className="nestedWrapper">
                                        <div className="nested" key={'setting' + i}>
                                            <select
                                                id={setting}
                                                className="settingSelect"
                                                name={setting}
                                                value={props.userSettings[setting]}
                                                onChange={props.onChange}>
                                                    {props.settings[setting].map((s, i) => { return (
                                                        <option key={i} value={s}>{s}</option>
                                                    )})}
                                            </select>
                                            <p className="settingText">{setting}</p>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                            );
                        } else if (setting === 'Mixed Pools' || setting === 'Shuffle Interiors') {
                            return (
                                <React.Fragment key={'settingFrag' + i}>
                                    <div className="wrapperWrapper">
                                        <div className="nestedWrapper">
                                            <div className="nested" key={'setting' + i}>
                                                <Select
                                                    id={"multiselect" + i}
                                                    multiple
                                                    displayEmpty
                                                    name={setting}
                                                    value={Object.keys(props.settings[setting]).filter((t) => {
                                                        return props.userSettings[setting].includes(t);
                                                    })}
                                                    onChange={props.onChange}
                                                    input={<Input />}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return 'Off';
                                                        } else if (selected.length === Object.keys(props.settings[setting]).length) {
                                                            return 'All';
                                                        } else {
                                                            return 'Some';
                                                        }
                                                    }}
                                                >
                                                    {Object.keys(props.settings[setting]).map((t) => { return (
                                                        <MenuItem key={'multiselectoption' + i + t} value={t}>
                                                            <Checkbox checked={props.userSettings[setting].includes(t)} />
                                                            <ListItemText primary={t} />
                                                        </MenuItem>
                                                    )})}
                                                </Select>
                                                <FormHelperText>{setting}</FormHelperText>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        } else { return null }
                    })}
            </Collapse>
            <hr />
        </React.Fragment>
    );
}

export default GameSetting