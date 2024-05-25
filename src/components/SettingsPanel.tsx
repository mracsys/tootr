import OotSettingIcon from "./OotSettingIcon";
import { OotSettingAssetMapFactory } from "./OotSettingAssetMap";
import { IconDict } from "./OotIcon";

import { GraphSettingsOptions, GraphSettingsConfiguration, GraphSettingsLayout, GraphSetting } from '@mracsys/randomizer-graph-tool';

import '@/styles/SettingsPanel.css';

interface SettingPanelProps {
    cycleSetting: ({graphSetting, reverseDirection}: {graphSetting?: string, reverseDirection?: boolean}) => void,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
    graphSettings: GraphSettingsConfiguration,
    graphSettingsOptions: GraphSettingsOptions,
    graphSettingsLayout: GraphSettingsLayout,
}

export const SettingPanel = ({
    cycleSetting,
    handleMultiselectMenuOpen,
    graphSettings,
    graphSettingsOptions,
    graphSettingsLayout,
}: SettingPanelProps) => {
    let settingAssetMap: IconDict
    if (!!graphSettings && !!graphSettingsOptions) {
        settingAssetMap = OotSettingAssetMapFactory(graphSettings, graphSettingsOptions);
    } else {
        return null;
    }

    let tab_output = [];
    let settingIconsPerRow = 10;
    for (let [tab_name, tab] of Object.entries(graphSettingsLayout)) {
        let visible_tab_settings = tab.settings.filter(s => Object.keys(settingAssetMap).includes(s.name) && !(s.disabled(graphSettings)));
        let tab_setting_sets = [];
        while(visible_tab_settings.length) {
            tab_setting_sets.push(visible_tab_settings.splice(0, settingIconsPerRow));
        }
        let visible_section_settings: {[section: string]: GraphSetting[][]} = Object.keys(tab.sections).sort().reduce((p: any, c: string) => {
            let visible = tab.sections[c].filter(s => Object.keys(settingAssetMap).includes(s.name) && !(s.disabled(graphSettings)));
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
                                tab_setting_row.map(s =>
                                    <OotSettingIcon
                                        graphSettingsOptions={graphSettingsOptions}
                                        settingAssetMap={settingAssetMap}
                                        onClick={cycleSetting}
                                        handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                                        itemName={s.name}
                                        key={s.name + tab_name + 'tabpanelkey'}
                                    />
                                )
                            }
                            </div>
                        )
                    }
                    </div>
                    {
                        Object.entries(visible_section_settings).map(([section_name, section_settings_sets]) => 
                            <div className="settingSectionContainer" key={tab_name + section_name + 'tabsectionpanelkey'}>
                                <span className="settingSectionName">{section_name}</span>
                                <div className="settingCollectionContainer">
                                {
                                    section_settings_sets.map((section_setting_row, i) =>
                                        <div className="settingMenuRow" key={tab_name + section_name + 'tabsectionpanelrowkey' + i}>
                                            {
                                                section_setting_row.map(s =>
                                                    <OotSettingIcon
                                                        graphSettingsOptions={graphSettingsOptions}
                                                        settingAssetMap={settingAssetMap}
                                                        onClick={cycleSetting}
                                                        handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                                                        itemName={s.name}
                                                        key={s.name + tab_name + section_name + 'tabsectionpanelkey'}
                                                    />
                                                )
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
            <div className="settingsContainer">
                {tab_output}
            </div>
        )
    }
}