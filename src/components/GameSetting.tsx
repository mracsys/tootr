import React, { useState, ChangeEvent } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox'
import { FormHelperText, ListItemText, MenuItem } from '@mui/material';
import type { SelectedSettings, SettingCategory, SettingTypes } from './Tracker';

interface GameSettingProps {
    title: string,
    settings: SettingCategory,
    userSettings: SelectedSettings,
    onChange: (s: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string[]>) => void,
}

const GameSetting = ({
    title,
    settings,
    userSettings,
    onChange,
}: GameSettingProps) => {
    let [open, setOpen] = useState(false);

    function isStringArray(value: SettingTypes): value is string[] {
        return Array.isArray(value);
    }

    return (
        <React.Fragment>
            <div className="settingCategory" onClick={() => setOpen(!open)}>
                <span>{title}</span>
                {open ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse in={open} timeout='auto' unmountOnExit>
                    { Object.keys(settings).map((setting, i) => {
                        let settingValue = settings[setting];
                        if (isStringArray(settingValue)) {
                            let userSettingValue: string;
                            let userSettingType = userSettings[setting];
                            if (typeof userSettingType === 'string') {
                                userSettingValue = userSettingType;
                            } else {
                                userSettingValue = '';
                            }
                            return (
                            <React.Fragment key={'settingFrag' + i}>
                                <div className="wrapperWrapper">
                                    <div className="nestedWrapper">
                                        <div className="nested" key={'setting' + i}>
                                            <select
                                                id={setting}
                                                className="settingSelect"
                                                name={setting}
                                                value={userSettingValue}
                                                onChange={onChange}>
                                                    {settingValue.map((s, i) => { return (
                                                        <option key={i} value={s}>{s}</option>
                                                    )})}
                                            </select>
                                            <p className="settingText">{setting}</p>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                            );
                        } else if (!(typeof settings[setting] === 'boolean')) {
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
                                                    value={Object.keys(settings[setting]).filter((t) => {
                                                        let userSettingType = userSettings[setting];
                                                        if (Array.isArray(userSettingType)) {
                                                            return userSettingType.includes(t);
                                                        } else {
                                                            return false;
                                                        }
                                                    })}
                                                    onChange={onChange}
                                                    input={<Input />}
                                                    renderValue={(selected) => {
                                                        if (selected.length === 0) {
                                                            return 'Off';
                                                        } else if (selected.length === Object.keys(settings[setting]).length) {
                                                            return 'All';
                                                        } else {
                                                            return 'Some';
                                                        }
                                                    }}
                                                >
                                                    {Object.keys(settings[setting]).map((t) => {
                                                        let userSettingType = userSettings[setting];
                                                        let userChecked: boolean;
                                                        if (Array.isArray(userSettingType)) {
                                                            userChecked = userSettingType.includes(t);
                                                        } else {
                                                            userChecked = false;
                                                        }
                                                        return (
                                                        <MenuItem key={'multiselectoption' + i + t} value={t}>
                                                            <Checkbox checked={userChecked} />
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