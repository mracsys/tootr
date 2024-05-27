import React, { ChangeEvent } from 'react';

import '@/styles/GameSetting.css';

interface GameSettingProps {
    title: string,
    settingKey: string,
    settingOptions: {[name: string]: string},
    userSetting: string,
    onChange: (s: ChangeEvent<HTMLSelectElement>) => void,
}

const GameSetting = ({
    title,
    settingKey,
    settingOptions,
    userSetting,
    onChange,
}: GameSettingProps) => {
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
                                    {Object.entries(settingOptions).map(([name, display_name], i) => { return (
                                        <option key={i} value={name}>{display_name}</option>
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