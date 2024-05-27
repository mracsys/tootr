import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import TabPanel from "./TabPanel";
import { ItemPanel } from "./ItemPanel";
import { SettingPanel } from "./SettingsPanel";
import { SettingListPanel } from "./SettingListPanel";
import GameSetting from "./GameSetting";
import GameSettingMultiselect from "./GameSettingMultiselect";
import GameSettingSwitch from "./GameSettingSwitch";
import { Drawer, Tabs, Tab } from "@mui/material";
import SettingMultiselectMenu from './SettingMultiselectMenu';
import { TrackerSettingsCurrent, tracker_settings_defs, tracker_setting_definition, copyTrackerSettings } from "@/data/tracker_settings";

import { GraphEntrance, GraphLocation, GraphSettingsConfiguration, GraphSettingsOptions, GraphSettingsLayout } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerDrawer.css';

interface TrackerDrawerProps {
    addStartingItem: (item_name: string, count?: number) => void,
    addStartingItems: (item_names: string[]) => void,
    removeStartingItem: (item_name: string, count?: number) => void,
    removeStartingItems: (item_names: string[]) => void,
    replaceStartingItem: (add_item_name: string, remove_item_name: string) => void,
    cycleGraphMultiselectOption: ({}?: {
        graphSettingName?: string | undefined;
        settingOptions?: string[] | undefined;
    }) => void,
    cycleGraphRewardHint: ({}?: {
        itemName?: string | undefined;
        forward?: boolean | undefined;
    }) => void,
    checkLocation: (locationName: string) => void,
    unCheckLocation: (locationName: string) => void,
    graphSettings: GraphSettingsConfiguration,
    graphCollectedItems: {[item_name: string]: number},
    graphPlayerInventory: {[item_name: string]: number},
    graphRewardHints: {[item_name: string]: string},
    graphLocations: GraphLocation[],
    graphEntrances: GraphEntrance[],
    graphRefreshCounter: number,
    cycleGraphSetting: ({graphSetting, reverseDirection}: {graphSetting?: string, reverseDirection?: boolean}) => void,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
    graphSettingsOptions: GraphSettingsOptions,
    graphSettingsLayout: GraphSettingsLayout,
    trackerSettings: TrackerSettingsCurrent,
    setTrackerSettings: Dispatch<SetStateAction<TrackerSettingsCurrent>>,
    changeGraphStringSetting: (s: ChangeEvent<HTMLSelectElement>) => void,
    changeGraphBooleanSetting: (s: ChangeEvent<HTMLInputElement>) => void,
    changeGraphNumericSetting: (s: ChangeEvent<HTMLSelectElement>) => void,
}


const TrackerDrawer = ({
    addStartingItem,
    addStartingItems,
    removeStartingItem,
    removeStartingItems,
    replaceStartingItem,
    cycleGraphMultiselectOption,
    cycleGraphRewardHint,
    checkLocation,
    unCheckLocation,
    graphSettings,
    graphCollectedItems,
    graphPlayerInventory,
    graphRewardHints,
    graphLocations,
    graphEntrances,
    graphRefreshCounter,
    cycleGraphSetting,
    handleMultiselectMenuOpen,
    graphSettingsOptions,
    graphSettingsLayout,
    trackerSettings,
    setTrackerSettings,
    changeGraphStringSetting,
    changeGraphBooleanSetting,
    changeGraphNumericSetting,
}: TrackerDrawerProps) => {
    const [tabValue, setTabValue] = useState<number>(0);
    let [multiselectMenuOpen, setMultiselectMenuOpen] = useState<Element | null>(null);
    let [multiselectToUpdate, setMultiselectToUpdate] = useState<string>('');
    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
    }

    const changeStringSetting = (setting: ChangeEvent<HTMLSelectElement>) => {
        const {target: { name, value }} = setting;
        console.log('[Setting]', name, 'changed to', value);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings[name] = value;
        setTrackerSettings(newTrackerSettings);
    }

    const changeBooleanSetting = (setting: ChangeEvent<HTMLInputElement>) => {
        const {target: { name, checked }} = setting;
        console.log('[Setting]', name, 'changed to', checked);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings[name] = checked;
        setTrackerSettings(newTrackerSettings);
        if (name === 'race_mode') {
            
        }
    }

    const handleInternalMultiselectMenuOpen = (setting: Element, settingName: string) => {
        setMultiselectMenuOpen(setting);
        setMultiselectToUpdate(settingName);
    }

    const handleInternalMultiselectMenuClose = () => {
        setMultiselectMenuOpen(null);
        setMultiselectToUpdate('');
    }

    const cycleInternalMultiselectOption = ({graphSettingName = '', settingOptions = ['']}: {graphSettingName?: string, settingOptions?: string[]} = {}) => {
        let tempValue = trackerSettings[graphSettingName];
        if (!Array.isArray(tempValue)) return;
        let settingValue = [...tempValue];
        for (let settingOption of settingOptions) {
            if (settingValue.includes(settingOption)) {
                let optionIndex = settingValue.indexOf(settingOption);
                if (optionIndex > -1) {
                    settingValue.splice(optionIndex, 1);
                }
            } else {
                settingValue.push(settingOption);
            }
        }
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        // On autofill we get a stringified value.
        newTrackerSettings[graphSettingName] = settingValue;
        setTrackerSettings(newTrackerSettings);
        // Sync fake tracker setting with graph setting
        if (graphSettingName === 'show_unshuffled_locations') {
            cycleGraphMultiselectOption({graphSettingName: 'graphplugin_viewable_unshuffled_items', settingOptions: settingOptions});
        }
        console.log(`[Setting] ${graphSettingName} changed to ${settingValue}`);
    }

    let multiselectSettingChoices: {[name: string]: string} = {};
    let multiselectDef: tracker_setting_definition | undefined = undefined;
    for (let [setting_name, def] of Object.entries(tracker_settings_defs) as [string, tracker_setting_definition][]) {
        if (setting_name === multiselectToUpdate && !!def.options) {
            multiselectDef = def;
            break;
        }
    }
    if (!!multiselectDef && !!multiselectDef.options) {
        multiselectSettingChoices = multiselectDef.options.reduce((o, key) => ({ ...o, [key]: key}), {});
    }

    return (
        <Drawer
            className="settingsDrawer"
            variant="persistent"
            anchor="left"
            open={trackerSettings.expand_sidebar}
            classes={{paper: "drawerPaper"}}
            SlideProps={{
                unmountOnExit: true,
            }}
        >
            <div className="drawerHeader"></div>
            <div className="gameInfo">
                <ItemPanel
                    addStartingItem={addStartingItem}
                    addStartingItems={addStartingItems}
                    removeStartingItem={removeStartingItem}
                    removeStartingItems={removeStartingItems}
                    replaceStartingItem={replaceStartingItem}
                    cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                    cycleGraphRewardHint={cycleGraphRewardHint}
                    handleCheck={checkLocation}
                    handleUnCheck={unCheckLocation}
                    graphSettings={graphSettings}
                    graphCollectedItems={graphCollectedItems}
                    graphPlayerInventory={graphPlayerInventory}
                    graphRewardHints={graphRewardHints}
                    graphLocations={graphLocations}
                    graphEntrances={graphEntrances}
                    refreshCounter={graphRefreshCounter}
                />
                <div className="tabList">
                    <Tabs className="sidebarTabs" value={tabValue} onChange={handleTabChange}>
                        <Tab label='Game Settings' />
                        <Tab label='Tracker Settings' />
                    </Tabs>
                </div>
                <TabPanel value={tabValue} index={0} className='drawerTab'>
                    {
                        trackerSettings.setting_icons ?
                        <SettingPanel
                            cycleSetting={cycleGraphSetting}
                            handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                            graphSettings={graphSettings}
                            graphSettingsOptions={graphSettingsOptions}
                            graphSettingsLayout={graphSettingsLayout}
                        /> :
                        <SettingListPanel
                            graphSettings={graphSettings}
                            graphSettingsOptions={graphSettingsOptions}
                            graphSettingsLayout={graphSettingsLayout}
                            changeGraphStringSetting={changeGraphStringSetting}
                            changeGraphBooleanSetting={changeGraphBooleanSetting}
                            changeGraphNumericSetting={changeGraphNumericSetting}
                            handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                        />
                    }
                </TabPanel>
                <TabPanel value={tabValue} index={1} className='drawerTab'>
                    <SettingMultiselectMenu
                        handleClose={handleInternalMultiselectMenuClose}
                        handleChange={cycleInternalMultiselectOption}
                        anchorLocation={multiselectMenuOpen}
                        title={!!multiselectDef ? multiselectDef.display_name : ''}
                        settingName={multiselectToUpdate ? multiselectToUpdate : ''}
                        settingValue={multiselectToUpdate ? trackerSettings[multiselectToUpdate] as string[] : []}
                        choices={multiselectSettingChoices === undefined ? {} : multiselectSettingChoices}
                        id="internalMultiselectOptionMenu"
                    />
                    <ul className="drawerContainer">
                        {
                            Object.entries(tracker_settings_defs).map(([setting, def]: [string, tracker_setting_definition], si) => {
                                let userSetting = trackerSettings[setting]
                                if (!!def.options) {
                                    let optionDict: {[name: string]: string} = {};
                                    for (let o of def.options) {
                                        optionDict[o] = o;
                                    }
                                    if (typeof userSetting === 'string') {
                                        return (
                                            <GameSetting
                                                title={def.display_name}
                                                settingKey={setting}
                                                settingOptions={optionDict}
                                                userSetting={userSetting}
                                                onChange={changeStringSetting}
                                                key={si}
                                            />
                                        )
                                    } else if (Array.isArray(userSetting)) {
                                        return (
                                            <GameSettingMultiselect
                                                title={def.display_name}
                                                settingKey={setting}
                                                userSetting={userSetting}
                                                settingOptionsCount={def.options.length}
                                                handleMultiselectMenuOpen={handleInternalMultiselectMenuOpen}
                                                key={si}
                                            />
                                        )
                                    }
                                } else if (typeof userSetting === 'boolean') {
                                    return (
                                        <GameSettingSwitch
                                            title={def.display_name}
                                            settingKey={setting}
                                            userSetting={userSetting}
                                            onChange={changeBooleanSetting}
                                            key={si}
                                        />
                                    );
                                } else { return null }
                            })
                        }
                        <li>
                            <a className="devLink" href="https://github.com/mracsys/tootr"><img src={`images/${trackerSettings.dark_mode ? 'GitHub_Invertocat_Light.svg' : 'GitHub_Invertocat_Dark.svg'}`} alt="Github Icon" /><span>Github</span></a>
                        </li>
                    </ul>
                </TabPanel>
            </div>
        </Drawer>
    );
}

export default TrackerDrawer;