import React, { ChangeEvent } from 'react';
import { TrackerSettingsCurrent } from '@/data/tracker_settings';

import '@/styles/GameSetting.css';

interface GameSettingProps {
    title: string,
    settingKey: string,
    settingOptions: string[],
    trackerSettings: TrackerSettingsCurrent,
    onChange: (s: ChangeEvent<HTMLSelectElement>) => void,
}

const GameSetting = ({
    title,
    settingKey,
    settingOptions,
    trackerSettings,
    onChange,
}: GameSettingProps) => {

    let userSetting = trackerSettings[settingKey];
    if (typeof userSetting !== 'string') {
        return null;
    }

    return (
        <React.Fragment>
            {
                <div className="wrapperWrapper">
                    <div className="nestedWrapper">
                        <div className="nested">
                            <select
                                id={settingKey}
                                className="settingSelect"
                                name={settingKey}
                                value={userSetting}
                                onChange={onChange}>
                                    {settingOptions.map((s, i) => { return (
                                        <option key={i} value={s}>{s}</option>
                                    )})}
                            </select>
                            <p className="settingText">{title}</p>
                        </div>
                    </div>
                </div>
            }
            <hr />
        </React.Fragment>
    );
}

export default GameSetting