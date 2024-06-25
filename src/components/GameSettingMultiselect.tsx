import React, { MouseEventHandler } from 'react';

import '@/styles/GameSetting.css';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface GameSettingMultiselectProps {
    title: string,
    settingKey: string,
    userSetting: string[],
    settingOptionsCount: number,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
}

export const GameSettingMultiselect = ({
    title,
    settingKey,
    userSetting,
    settingOptionsCount,
    handleMultiselectMenuOpen,
}: GameSettingMultiselectProps) => {
    const globalClick: MouseEventHandler = (e) => {
        e.stopPropagation();
        handleMultiselectMenuOpen(e.currentTarget, settingKey);
    }
    let userValue = 'None';
    if (userSetting.length > 0 && userSetting.length < settingOptionsCount) {
        userValue = 'Some';
    } else if (userSetting.length === settingOptionsCount) {
        userValue = 'All';
    }
    return (
        <React.Fragment>
            <div className="wrapperWrapper">
                <div className="nestedWrapper">
                    <div className="nested">
                        <React.Fragment>
                            <button
                                id={settingKey}
                                className="settingSelect settingSelectFake"
                                name={settingKey}
                                onClick={globalClick}
                            >
                                <div className='fakeSelectValue'>{userValue}</div>
                                <ExpandMore />
                            </button>
                            <p className="settingText">{title}</p>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default GameSettingMultiselect