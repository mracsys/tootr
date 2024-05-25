import Menu from '@mui/material/Menu';
import { ContextCallback } from './ContextMenuHandlerWithArgs';
import '@/styles/SettingMultiselectMenu.css';

interface SettingMultiselectMenuProps {
    anchorLocation?: Element | null,
    choices: { [optionName: string]: string },
    settingName: string,
    settingValue: string[],
    title: string,
    id: string,
    handleClose: () => void,
    handleChange: ContextCallback,
}

const SettingMultiselectMenu = ({
    anchorLocation,
    id,
    handleClose,
    handleChange,
    settingName,
    settingValue,
    title,
    choices,

}: SettingMultiselectMenuProps) => {
    let optionElements: JSX.Element[] = [];
    let selectAllOptions: string[] = [];
    let selectNoneOptions: string[] = [];
    for (let [optionName, optionDisplayName] of Object.entries(choices)) {
        if (settingValue.includes(optionName)) {
            selectNoneOptions.push(optionName);
        } else {
            selectAllOptions.push(optionName);
        }
        optionElements.push(
            <div
                key={optionName + 'Div'}
                className={settingValue.includes(optionName) ? undefined : 'MultiselectOptionDisabled'}
                onClick={(e) => {
                    e.stopPropagation();
                    handleChange({graphSettingName: settingName, settingOptions: [optionName]});
                }}
            >
                {optionDisplayName}
            </div>
        );
    }
    return (
        <Menu
            id={id + 'Element'}
            anchorEl={anchorLocation}
            open={Boolean(anchorLocation)}
            onClose={handleClose}
            classes={{
                list: "MenuPadding",
            }}
        >
            <div key="multiselectContainerDiv" className="multiselectSettingMenu">
                <div key="multiselectNameDiv" className="multiselectSettingMenuTitle">{title}</div>
                <div>
                    <span
                        key='multiselectSelectAllDiv'
                        className="multiselectSettingMenuAll"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleChange({graphSettingName: settingName, settingOptions: selectAllOptions});
                        }}
                    >
                        All
                    </span>
                    <span
                        key='multiselectSelectNoneDiv'
                        onClick={(e) => {
                            e.stopPropagation();
                            handleChange({graphSettingName: settingName, settingOptions: selectNoneOptions});
                        }}
                    >
                        None
                    </span>
                </div>
                {optionElements}
            </div>
        </Menu>
    );
}

export default SettingMultiselectMenu;