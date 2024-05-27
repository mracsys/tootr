import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox'
import { FormHelperText, ListItemText, MenuItem } from '@mui/material';
import { TrackerSettingsCurrent } from '@/data/tracker_settings';

import '@/styles/GameSetting.css';

interface GameSettingMultiselectProps {
    title: string,
    settingKey: string,
    settingOptions: string[],
    trackerSettings: TrackerSettingsCurrent,
    onChange: (s: SelectChangeEvent<string[]>) => void,
}

export const GameSettingMultiselect = ({
    title,
    settingKey,
    settingOptions,
    trackerSettings,
    onChange,
}: GameSettingMultiselectProps) => {

    let userSetting = trackerSettings[settingKey];
    if (!Array.isArray(userSetting)) {
        return null;
    }

    return (
        <React.Fragment>
            <div className="wrapperWrapper">
                <div className="nestedWrapper">
                    <div className="nested">
                        <Select
                            id={"multiselect" + settingKey}
                            className={"settingMultiSelect"}
                            MenuProps={{
                                classes: {
                                    root: 'settingMultiSelectMenu'
                                }
                            }}
                            multiple
                            displayEmpty
                            name={settingKey}
                            value={userSetting}
                            onChange={onChange}
                            input={<Input />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return 'Off';
                                } else if (selected.length === settingOptions.length) {
                                    return 'All';
                                } else {
                                    return 'Some';
                                }
                            }}
                        >
                            {settingOptions.map((t) => {
                                let userChecked = userSetting.includes(t);
                                return (
                                <MenuItem key={'multiselectoption' + t} value={t}>
                                    <Checkbox checked={userChecked} />
                                    <ListItemText primary={t} />
                                </MenuItem>
                            )})}
                        </Select>
                        <FormHelperText>{title}</FormHelperText>
                    </div>
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
}

export default GameSettingMultiselect