import { useState, ChangeEvent } from "react";
import TabPanel from "./TabPanel";
import { ItemPanel } from "./ItemPanel";
import { SettingPanel } from "./SettingsPanel";
import GameSetting from "./GameSetting";
import { List, ListItem, Link, Typography, Drawer, Tabs, Tab } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import GitHubIcon from '@mui/icons-material/GitHub';
import type { SelectedSettings, GameSettings } from './Tracker';

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
    enabled_settings: GameSettings,
    settings: SelectedSettings,
    changeSetting: (setting: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string[]> | {target: {name: string, value: boolean | string}}) => void,
    openSettings: boolean,
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
    enabled_settings,
    settings,
    changeSetting,
    openSettings,
}: TrackerDrawerProps) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
    }

    return (
        <Drawer
            className="settingsDrawer"
            variant="persistent"
            anchor="left"
            open={openSettings}
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
                    <Tabs value={tabValue} onChange={handleTabChange}>
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
                    <List className="drawerContainer">
                        {
                            Object.keys(enabled_settings).map((setting,si) => {
                                return (
                                    <GameSetting
                                        title={setting}
                                        settings={enabled_settings[setting]}
                                        userSettings={settings}
                                        onChange={(s: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string[]>) => changeSetting(s)}
                                        key={si}
                                    />
                                )
                            })
                        }
                        <ListItem>
                            <Link className="devLink" href="https://github.com/mracsys/tootr"><GitHubIcon /><Typography>Github</Typography></Link>
                        </ListItem>
                    </List>
                </TabPanel>
            </div>
        </Drawer>
    );
}