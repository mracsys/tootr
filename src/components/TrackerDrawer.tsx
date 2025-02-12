import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import TabPanel from "./TabPanel";
import { ItemPanel } from "./ItemPanel";
import { SettingPanel } from "./SettingsPanel";
import { SettingListPanel } from "./SettingListPanel";
import GameSetting from "./GameSetting";
import GameSettingMultiselect from "./GameSettingMultiselect";
import GameSettingSwitch from "./GameSettingSwitch";
import { Drawer, Tabs, Tab } from "@mui/material";
import SettingMultiselectMenu from './SettingMultiselectMenu';
import { TrackerSettingsCurrent, tracker_settings_defs, tracker_setting_definition, copyTrackerSettings, region_visibility_values } from "@/data/tracker_settings";

import { GraphGameVersions, GraphRegion, GraphEntrance, GraphLocation, GraphSettingsConfiguration, GraphSettingsOptions, GraphSettingsLayout, GameVersion } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerDrawer.css';
import RaceTimer from "./RaceTimer";

interface TrackerDrawerProps {
    addStartingItem: (item_name: string, count?: number) => void,
    removeStartingItem: (item_name: string, count?: number) => void,
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
    graphRewardHints: {[item_name: string]: {
        hint: string,
        hinted: boolean,
    }},
    graphLocations: GraphLocation[],
    graphEntrances: GraphEntrance[],
    graphRegions: GraphRegion[],
    cycleGraphSetting: ({graphSetting, reverseDirection}: {graphSetting?: string, reverseDirection?: boolean}) => void,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
    graphSettingsOptions: GraphSettingsOptions,
    graphSettingsLayout: GraphSettingsLayout,
    graphVersion: GameVersion,
    trackerSettings: TrackerSettingsCurrent,
    setTrackerSettings: (newSettings: TrackerSettingsCurrent) => void,
    setLastEntranceName: Dispatch<SetStateAction<string>>,
    changeGraphStringSetting: (s: ChangeEvent<HTMLSelectElement>) => void,
    changeGraphBooleanSetting: (s: ChangeEvent<HTMLInputElement>) => void,
    changeGraphNumericSetting: (s: ChangeEvent<HTMLSelectElement>) => void,
    setCachedRaceMode: Dispatch<SetStateAction<boolean | null>>,
    setAlertReset: Dispatch<SetStateAction<boolean>>,
    changeRegionMode: (regionSearchMode: string) => void,
    changeGraphVersion: (version: string) => void,
    supportedGraphVersions: GraphGameVersions,
    visitedSimRegions: Set<string>,
    itemPanelAsTab: boolean,
    isNotMobile: boolean,
}


const TrackerDrawer = ({
    addStartingItem,
    removeStartingItem,
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
    graphRegions,
    cycleGraphSetting,
    handleMultiselectMenuOpen,
    graphSettingsOptions,
    graphSettingsLayout,
    graphVersion,
    trackerSettings,
    setTrackerSettings,
    setLastEntranceName,
    changeGraphStringSetting,
    changeGraphBooleanSetting,
    changeGraphNumericSetting,
    setCachedRaceMode,
    setAlertReset,
    changeRegionMode,
    changeGraphVersion,
    supportedGraphVersions,
    visitedSimRegions,
    itemPanelAsTab,
    isNotMobile,
}: TrackerDrawerProps) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [multiselectMenuOpen, setMultiselectMenuOpen] = useState<Element | null>(null);
    const [multiselectToUpdate, setMultiselectToUpdate] = useState<string>('');

    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
    }

    const changeStringSetting = (setting: ChangeEvent<HTMLSelectElement>) => {
        const {target: { name, value }} = setting;
        console.log('[Setting]', name, 'changed to', value);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        let newValue = value;
        if (name === 'region_visibility') {
            newValue = region_visibility_values[value];
            changeRegionMode(newValue);
        }
        if (name === 'game_version') {
            changeGraphVersion(value);
        }
        if (name === 'region_page') {
            setLastEntranceName('');
        }
        newTrackerSettings[name] = value;
        setTrackerSettings(newTrackerSettings);
    }

    const changeBooleanSetting = (setting: ChangeEvent<HTMLInputElement>) => {
        const {target: { name, checked }} = setting;
        console.log('[Setting]', name, 'changed to', checked);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings[name] = checked;
        if (name === 'one_region_per_page' && !checked) {
            newTrackerSettings.region_page = 'Overworld';
        }
        if (name === 'race_mode') {
            setAlertReset(true);
            setCachedRaceMode(checked);
        } else {
            setTrackerSettings(newTrackerSettings);
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

    useEffect(() => {
        if (!itemPanelAsTab && tabValue === 2) {
            setTabValue(1);
        }
    }, [itemPanelAsTab, tabValue]);

    let tabOffset = itemPanelAsTab ? 1 : 0;

    return (
        <Drawer
            className="settingsDrawer"
            variant="persistent"
            anchor="left"
            open={trackerSettings.expand_sidebar}
            classes={{paper: "drawerPaper"}}
        >
            <div className="drawerHeader"></div>
            <div className="gameInfo">
                { !itemPanelAsTab ?
                    <div className="ootItemPanelContainer">
                        <ItemPanel
                            addStartingItem={addStartingItem}
                            removeStartingItem={removeStartingItem}
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
                            visitedSimRegions={visitedSimRegions}
                            isNotMobile={isNotMobile}
                        />
                    </div>
                    : null
                }
                {
                    !itemPanelAsTab && trackerSettings.show_timer ?
                        <RaceTimer />
                        : null
                }
                { itemPanelAsTab ?
                    <TabPanel value={tabValue} index={0} className="drawerTab scrollable">
                        <div className="ootItemPanelContainer">
                            <ItemPanel
                                addStartingItem={addStartingItem}
                                removeStartingItem={removeStartingItem}
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
                                visitedSimRegions={visitedSimRegions}
                                isNotMobile={isNotMobile}
                            />
                        </div>
                        {
                            itemPanelAsTab && trackerSettings.show_timer ?
                                <RaceTimer />
                                : null
                        }
                    </TabPanel>
                    : null
                }
                <TabPanel value={tabValue} index={0 + tabOffset} className='drawerTab scrollable'>
                    {
                        trackerSettings.setting_icons ?
                        <SettingPanel
                            cycleSetting={cycleGraphSetting}
                            handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                            graphSettings={graphSettings}
                            graphSettingsOptions={graphSettingsOptions}
                            graphSettingsLayout={graphSettingsLayout}
                            graphVersion={graphVersion}
                            isWide={isNotMobile}
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
                <TabPanel value={tabValue} index={1 + tabOffset} className='drawerTab scrollable paddedTab'>
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
                                if (def.options !== undefined) {
                                    let optionDict: {[name: string]: string} = {};
                                    for (let o of def.options) {
                                        optionDict[o] = o;
                                    }
                                    if (setting === 'region_page' && trackerSettings.one_region_per_page) {
                                        for (let region of graphRegions) {
                                            optionDict[region.name] = region.name;
                                        }
                                    }
                                    if (setting === 'game_version') {
                                        for (let gitBranch of supportedGraphVersions.versions) {
                                            optionDict[gitBranch.version] = gitBranch.version;
                                        }
                                        userSetting = graphVersion.version;
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
                <div className="tabList">
                    <Tabs className="sidebarTabs" value={tabValue} onChange={handleTabChange}>
                        { itemPanelAsTab ?
                            <Tab label='Inventory' />
                            : null
                        }
                        <Tab label='Game Settings' />
                        <Tab label='Tracker Settings' />
                    </Tabs>
                </div>
            </div>
        </Drawer>
    );
}

export default TrackerDrawer;