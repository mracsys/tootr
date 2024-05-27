import { ChangeEvent } from "react";
import { OotSettingAssetMapFactory } from "./OotSettingAssetMap";
import { IconDict } from "./OotIcon";
import GameSetting from "./GameSetting";
import GameSettingMultiselect from "./GameSettingMultiselect";
import GameSettingSwitch from "./GameSettingSwitch";

import { GraphSettingsOptions, GraphSettingsConfiguration, GraphSettingsLayout, GraphSetting } from '@mracsys/randomizer-graph-tool';

import '@/styles/SettingsPanel.css';

interface SettingListPanelProps {
    graphSettings: GraphSettingsConfiguration,
    graphSettingsOptions: GraphSettingsOptions,
    graphSettingsLayout: GraphSettingsLayout,
    changeGraphStringSetting: (s: ChangeEvent<HTMLSelectElement>) => void,
    changeGraphBooleanSetting: (s: ChangeEvent<HTMLInputElement>) => void,
    changeGraphNumericSetting: (s: ChangeEvent<HTMLSelectElement>) => void,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
}

export const SettingListPanel = ({
    graphSettings,
    graphSettingsOptions,
    graphSettingsLayout,
    changeGraphStringSetting,
    changeGraphBooleanSetting,
    changeGraphNumericSetting,
    handleMultiselectMenuOpen,
}: SettingListPanelProps) => {
    let settingAssetMap: IconDict
    if (!!graphSettings && !!graphSettingsOptions) {
        settingAssetMap = OotSettingAssetMapFactory(graphSettings, graphSettingsOptions);
    } else {
        return null;
    }

    const settingWidgetSelector = (s: GraphSetting, key: string) => {
        let userSetting = graphSettings[s.name];
        if (s.type === 'str' && !!s.choices && typeof userSetting === 'string') {
            return (
                <GameSetting
                    title={s.display_name}
                    settingKey={s.name}
                    settingOptions={s.choices}
                    userSetting={userSetting}
                    onChange={changeGraphStringSetting}
                    key={key}
                />
            )
        } else if (s.type === 'bool' && typeof userSetting === 'boolean') {
            return (
                <GameSettingSwitch
                    title={s.display_name}
                    settingKey={s.name}
                    userSetting={userSetting}
                    onChange={changeGraphBooleanSetting}
                    key={key}
                />
            )
        } else if (s.type === 'int' && typeof userSetting === 'number') {
            return (
                <GameSetting
                    title={s.display_name}
                    settingKey={s.name}
                    settingOptions={
                        s.minimum !== undefined && s.maximum !== undefined ?
                            Array(s.maximum - s.minimum + 1).fill(0).map((_, i) => `${i + (!!s.minimum ? s.minimum : 0)}`).reduce((o, key) => ({ ...o, [key]: key}), {}) :
                        s.minimum !== undefined && s.maximum === undefined ?
                            Array(10).fill(0).map((_, i) => `${i + (!!s.minimum ? s.minimum : 0)}`).reduce((o, key) => ({ ...o, [key]: key}), {}) :
                        s.minimum === undefined && s.maximum !== undefined ?
                            Array(s.maximum).fill(0).map((_, i) => `${i + 1}`).reduce((o, key) => ({ ...o, [key]: key}), {}) :
                            Array(10).fill(0).map((_, i) => `${i + 1}`).reduce((o, key) => ({ ...o, [key]: key}), {})
                    }
                    userSetting={`${userSetting}`}
                    onChange={changeGraphNumericSetting}
                    key={key}
                />
            )
        } else if (s.type === 'list' && !!s.choices && Array.isArray(userSetting)) {
            return (
                <GameSettingMultiselect
                    title={s.display_name}
                    settingKey={s.name}
                    userSetting={userSetting}
                    settingOptionsCount={Object.keys(s.choices).length}
                    handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                    key={key}
                />
            )
        } else {
            return null;
        }
    }

    let tab_output = [];
    let settingIconsPerRow = 10;
    for (let [tab_name, tab] of Object.entries(graphSettingsLayout)) {
        // skip some internal tabs that only have ROM generation settings
        let forbidden_tabs = [
            'general_tab',
            'ROM Options',
            'general_tab_web_patcher',
            'ROM Generation',
            'cosmetics_tab',
            'Cosmetics',
            'sfx_tab',
            'SFX',
            'footer_tab_electron',
            'footer_tab_web',
            '',
        ];
        let forbidden_settings = ['starting_items', 'starting_equipment', 'starting_songs', 'starting_inventory', 'randomize_settings'];

        if (forbidden_tabs.includes(tab_name)) continue;

        let visible_tab_settings = tab.settings.filter(s => !forbidden_settings.includes(s.name) && !(s.disabled(graphSettings)));

        let tab_setting_sets = [];
        while(visible_tab_settings.length) {
            tab_setting_sets.push(visible_tab_settings.splice(0, settingIconsPerRow));
        }
        let visible_section_settings: {[section: string]: GraphSetting[][]} = Object.keys(tab.sections).sort().reduce((p: any, c: string) => {
            let visible = tab.sections[c].filter(s => !forbidden_settings.includes(s.name) && !(s.disabled(graphSettings)));
            let section_visible = [];
            while(visible.length) {
                section_visible.push(visible.splice(0, settingIconsPerRow));
            }
            if (section_visible.length > 0) p[c] = section_visible;
            return p;
        }, {});

        if (tab_setting_sets.length > 0 || Object.keys(visible_section_settings).length > 0) {
            tab_output.push(
                <div className="settingTabContainer" key={tab_name + 'tabpanelkey'}>
                    <div className="settingCollectionContainer">
                    {
                        tab_setting_sets.map((tab_setting_row, j) =>
                            <div className="settingMenuRow" key={tab_name + 'tabpanelrowkey' + j}>
                            {
                                tab_setting_row.map((s) => settingWidgetSelector(s, s.name + tab_name + 'listpanelkey'))
                            }
                            </div>
                        )
                    }
                    </div>
                    {
                        Object.entries(visible_section_settings).map(([section_name, section_settings_sets]) => 
                            <div className="settingListSectionContainer" key={tab_name + section_name + 'tabsectionpanelkey'}>
                                <span className="settingSectionName">{section_name}</span>
                                <div className="settingCollectionContainer">
                                {
                                    section_settings_sets.map((section_setting_row, i) =>
                                        <div className="settingMenuRow" key={tab_name + section_name + 'tabsectionpanelrowkey' + i}>
                                            {
                                                section_setting_row.map((s) => settingWidgetSelector(s, s.name + tab_name + section_name + 'tabsectionlistpanelkey'))
                                            }
                                        </div>
                                    )
                                }
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        }
    }
    // keep React happy with a return value if no tabs are printed
    if (tab_output.length === 0) {
        return null;
    } else {
        return (
            <div className="settingsListContainer">
                {tab_output}
            </div>
        )
    }
}