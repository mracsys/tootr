import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import TabPanel from "./TabPanel";
import { ItemPanel } from "./ItemPanel";
import { SettingPanel } from "./SettingsPanel";
import GameSetting from "./GameSetting";
import { Drawer, Tabs, Tab } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { TrackerSettingsCurrent, tracker_settings_defs, tracker_setting_definition, copyTrackerSettings } from "@/data/tracker_settings";

import { GraphEntrance, GraphLocation, GraphSettingsConfiguration, GraphSettingsOptions, GraphSettingsLayout } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerDrawer.css';
import GameSettingMultiselect from "./GameSettingMultiselect";
import GameSettingSwitch from "./GameSettingSwitch";

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
}


export const TrackerDrawer = ({
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
}: TrackerDrawerProps) => {
    const [tabValue, setTabValue] = useState<number>(0);
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

    const changeArraySetting = (setting: SelectChangeEvent<string[]>) => {
        const {target: { name, value }} = setting;
        console.log('[Setting]', name, 'changed to', value);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        // On autofill we get a stringified value.
        newTrackerSettings[name] = typeof value === 'string' ? value.split(',') : value;
        setTrackerSettings(newTrackerSettings);
    }

    const changeBooleanSetting = (setting: ChangeEvent<HTMLInputElement>) => {
        const {target: { name, checked }} = setting;
        console.log('[Setting]', name, 'changed to', checked);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings[name] = checked;
        setTrackerSettings(newTrackerSettings);
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
                <div>
                    <Tabs className="sidebarTabs" value={tabValue} onChange={handleTabChange}>
                        <Tab label='Game Settings' />
                        <Tab label='Tracker Settings' />
                    </Tabs>
                </div>
                <TabPanel value={tabValue} index={0} className='drawerTab'>
                    <SettingPanel
                        cycleSetting={cycleGraphSetting}
                        handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                        graphSettings={graphSettings}
                        graphSettingsOptions={graphSettingsOptions}
                        graphSettingsLayout={graphSettingsLayout}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1} className='drawerTab'>
                    <ul className="drawerContainer">
                        {
                            Object.entries(tracker_settings_defs).map(([setting, def]: [string, tracker_setting_definition], si) => {
                                if (!!def.options) {
                                    if (def.type === 'str') {
                                        return (
                                            <GameSetting
                                                title={def.display_name}
                                                settingKey={setting}
                                                settingOptions={def.options}
                                                trackerSettings={trackerSettings}
                                                onChange={changeStringSetting}
                                                key={si}
                                            />
                                        )
                                    } else {
                                        return (
                                            <GameSettingMultiselect
                                                title={def.display_name}
                                                settingKey={setting}
                                                settingOptions={def.options}
                                                trackerSettings={trackerSettings}
                                                onChange={changeArraySetting}
                                                key={si}
                                            />
                                        )
                                    }
                                } else {
                                    return (
                                        <GameSettingSwitch
                                            title={def.display_name}
                                            settingKey={setting}
                                            trackerSettings={trackerSettings}
                                            onChange={changeBooleanSetting}
                                            key={si}
                                        />
                                    );
                                }
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