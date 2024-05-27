import React, { ChangeEvent } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TrackerSettingsCurrent } from '@/data/tracker_settings';

import '@/styles/GameSetting.css';

interface GameSettingSwitchProps {
    title: string,
    settingKey: string,
    trackerSettings: TrackerSettingsCurrent,
    onChange: (s: ChangeEvent<HTMLInputElement>) => void,
}

const GameSettingSwitch = ({
    title,
    settingKey,
    trackerSettings,
    onChange,
}: GameSettingSwitchProps) => {

    let userSetting = trackerSettings[settingKey];
    if (typeof userSetting !== 'boolean') {
        return null;
    }

    return (
        <React.Fragment>
            {
                <div className="wrapperWrapper">
                    <div className="nestedWrapper">
                        <div className="nested">
                            <FormControlLabel label={title} control={
                                <Switch
                                    id={settingKey}
                                    name={settingKey}
                                    checked={userSetting}
                                    onChange={onChange}
                                />
                            } />
                        </div>
                    </div>
                </div>
            }
            <hr />
        </React.Fragment>
    );
}

export default GameSettingSwitch