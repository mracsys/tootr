import React, { useEffect, useState, useRef, useMemo, ChangeEvent, MouseEventHandler, MouseEvent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import TrackerDrawer from './TrackerDrawer';
import TrackerTopBar from './TrackerTopBar';
import TrackerPaper from './TrackerPaper';
import EntranceMenu from './EntranceMenu';
import ItemMenu from './ItemMenu';
import SettingMultiselectMenu from './SettingMultiselectMenu';
import HintMenu, { HintMenuData, pathLocations, pathItems } from './HintMenu';
import ContextMenuHandler from './ContextMenuHandler';
import WarpMenu from './WarpMenu';
import TrackerUpdateDialog from './TrackerUpdateDialog';
import TrackerResetDialog from './TrackerResetDialog';

import {
    all_tracker_settings_versions,
    current_settings_version,
    TrackerSettingsCurrent,
    tracker_settings_default,
    copyTrackerSettings,
    tracker_setting_type,
    region_visibility_values,
    tracker_settings_defs,
    // tracker_settings_v1, // add specific versions if format ever changes for the upgrade function
} from '@/data/tracker_settings';
import { location_item_menu_layout, shop_item_menu_layout } from '@/data/location_item_menu_layout';

import { WorldGraphFactory, ExternalFileCacheFactory, ExternalFileCache, GraphEntrance, GraphRegion, GraphItem, GraphHintGoal } from '@mracsys/randomizer-graph-tool';

import '@/styles/tracker.css';
import { buildExitEntranceName } from './UnknownEntrance';


interface ScrollerRef {
    [scrollRef: string]: HTMLDivElement,
}

export interface CollapsedRegions {
    [regionName: string]: string
}

type TrackerSettingChangeEvent = {
    target: {
        name: string;
        value: tracker_setting_type;
        checked?: boolean;
    }
}

const localFileLocations: {[randoVersion: string]: string} = {
    '7.1.195 R-1': '/ootr-local-roman-195',
    '7.1.198 Rob-49': '/ootr-local-realrob-198',
}

// Changing the version will completely reset user preferences.
// Only touch this if absolutely necessary.
// Prefer in-place upgrades to settings in localstorage.
const trackerVersion = '1.0.0';

const Tracker = (_props: {}) => {
    const [trackerSettings, setTrackerSettings] = useState<TrackerSettingsCurrent>(tracker_settings_default);
    const [alertReset, setAlertReset] = useState<boolean>(false);
    const [alertUpdate, setAlertUpdate] = useState<boolean>(false);
    const [itemMenuOpen, setItemMenuOpen] = useState<Element | null>(null);
    const [hintMenuOpen, setHintMenuOpen] = useState<Element | null>(null);
    const [shopItemMenuOpen, setShopItemMenuOpen] = useState<Element | null>(null);
    const [entranceMenuOpen, setEntranceMenuOpen] = useState<Element | null>(null);
    const [multiselectMenuOpen, setMultiselectMenuOpen] = useState<Element | null>(null);
    const [multiselectToUpdate, setMultiselectToUpdate] = useState<string>('');
    const [entranceToLink, setEntranceToLink] = useState<string>('');
    const [locationToLink, setLocationToLink] = useState<string>('');
    const [delayedURL, setDelayedURL] = useState<string>('');
    const [entranceRef, setEntranceRef] = useState<string>('');
    const [scrollY, setScrollY] = useState<number | null>(null);
    const [trackerInitialized, setTrackerInitialized] = useState<boolean>(false);
    const [graphInitialized, setGraphInitialized] = useState<boolean>(false);
    const [collapsedRegions, setCollapsedRegions] = useState<CollapsedRegions>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [cachedRaceMode, setCachedRaceMode] = useState<boolean | null>(null);
    const [importSimMode, setImportSimMode] = useState<boolean>(false);
    const [lastEntranceName, setLastEntranceName] = useState<string>('');
    const [_fileCache, setFileCache] = useState<ExternalFileCache>({files: {}});
    const [graphVersion, setGraphVersion] = useState<string>('7.1.195 R-1');
    const scroller = useRef<ScrollerRef>({});

    // Graph state management to trigger rerender on memo change.
    // Required as graph updates are not pure, so can't be in React state.
    const [graphInitialState, setGraphInitialState] = useState<string>('{}');
    const [graphRefreshCounter, setGraphRefreshCounter] = useState<number>(0);
    const [graphImportFile, setGraphImportFile] = useState<string>('');
    const [graphPresets, setGraphPresets] = useState<string[]>([]);

    let graph = useMemo(
        () => WorldGraphFactory('ootr', {}, graphVersion, _fileCache),
        [_fileCache, graphVersion]
    );

    // run on mount and unmount
    useEffect(() => {
        let clientTrackerVersion = localStorage.getItem('TrackerVersion');
        if (!!(clientTrackerVersion)) {
            if (localStorage.getItem('TrackerVersion') !== trackerVersion) {
                majorTrackerUpgrade();
            }
        } else {
            // no version key, assume outdated
            majorTrackerUpgrade();
        }
        let clientTrackerSettings = localStorage.getItem('TrackerSettings');
        let trackerSettingsInit = tracker_settings_default;
        if (!!clientTrackerSettings) {
            let trackerSettingsStored: all_tracker_settings_versions = JSON.parse(clientTrackerSettings);
            if (trackerSettingsStored.version !== current_settings_version) {
                trackerSettingsInit = upgradeTrackerSettings(trackerSettingsStored);
            } else {
                trackerSettingsInit = trackerSettingsStored;
            }
        } else {
            // Override default dark mode setting based on browser/OS theme
            trackerSettingsInit.dark_mode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        if (trackerSettingsInit.game_version === undefined) trackerSettingsInit.game_version = graphVersion;

        let clientCollapsedRegions = localStorage.getItem('CollapsedRegions');
        let collapsedRegionsInit: CollapsedRegions = !!(clientCollapsedRegions) ? JSON.parse(clientCollapsedRegions) : {};
        let graphInitialStateInit = '{}';
        let clientSelectedGraphState = localStorage.getItem('SelectedGraphState');
        if (!!clientSelectedGraphState) {
            let savedState = getSavedGraphState(clientSelectedGraphState);
            if (savedState !== null) {
                if (Object.keys(savedState).includes(':version')) {
                    trackerSettingsInit.game_version = savedState[':version'];
                }
                graphInitialStateInit = JSON.stringify(savedState);
            }
        }

        if (trackerSettingsInit.game_version !== graphVersion) setGraphVersion(trackerSettingsInit.game_version);
        setGraphInitialState(graphInitialStateInit);
        setCollapsedRegions(collapsedRegionsInit);
        setTrackerSettings(trackerSettingsInit);
    }, []);

    // hooks to keep state saved in localstorage
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('TrackerSettings', JSON.stringify(trackerSettings));
    }, [trackerSettings]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('CollapsedRegions', JSON.stringify(collapsedRegions));
    }, [collapsedRegions]);

    // When swapping between Overworld and Dungeon views, anchors don't
    // work until after rendering. Ugly workaround incoming.
    // run every render
    useEffect(() => {
        if (delayedURL !== '') {
            window.location.assign(delayedURL);
            setDelayedURL('');
        }
        if (scrollY !== null && entranceRef !== null && Object.keys(scroller.current).includes(entranceRef)) {
            let delay = () => new Promise(res => setTimeout(res, 1));
            delay().then(() => {
                let eRef = scroller.current[entranceRef];
                let rect = eRef.getBoundingClientRect();
                let oTop = rect.top;
                let scrollToY = scrollY;
                let paper = document.getElementById('worldScrollContainer');
                if (!!paper) {
                    paper.scrollTo({
                        top: 2 * getPaperScrollY() + oTop - scrollToY,
                    });
                }
                setScrollY(null);
                setEntranceRef('');
            });
        }

        let ignore = false;
        
        const getGraph = async () => {
            if (Object.keys(_fileCache.files).length === 0) {
                let graphFileCache = await ExternalFileCacheFactory('ootr', graphVersion, { local_url: localFileLocations[graphVersion] });
                if (!ignore) {
                    setFileCache(graphFileCache);
                }
            }
            if (graph.initialized && !ignore && !graphInitialized) {
                setGraphPresets(graph.get_settings_presets());
                if (graphInitialState !== '') {
                    let plando = JSON.parse(graphInitialState);
                    graph.import(plando);
                }
                setTrackerPreferences();
                setGraphInitialized(true);
            }
        }
        getGraph();
        
        return () => { ignore = true; };
    });

    useEffect(() => {
        if (graphInitialized) {
            refreshSearch();
            setTrackerInitialized(true);
        }
    }, [graphInitialized]);

    useEffect(() => {
        if (graphInitialized && graphImportFile) {
            let importState = JSON.parse(graphImportFile);
            if (importSimMode) {
                importState['settings']['graphplugin_simulator_mode'] = true;
                changeSetting({ target: { name: 'one_region_per_page', value: true }});
                changeSetting({ target: { name: 'region_page', value: 'Warps' }});
            }
            graph.import(importState);
            setTrackerPreferences();
            refreshSearch();
            setLastEntranceName('');
            setImportSimMode(false);
            setCollapsedRegions({});
            setGraphInitialState(graphImportFile);
            setTrackerInitialized(true);
            setGraphImportFile('');
        }
    }, [graphImportFile]);

    const setTrackerPreferences = () => {
        let graphSettings = graph.get_settings_options();
        graph.change_setting(graph.worlds[trackerSettings.player_number], graphSettings['graphplugin_world_search_mode'], trackerSettings.race_mode ? 'starting_items' : 'collected');
        graph.change_setting(graph.worlds[trackerSettings.player_number], graphSettings['graphplugin_region_visibility_mode'], region_visibility_values[trackerSettings.region_visibility]);
        graph.change_setting(graph.worlds[trackerSettings.player_number], graphSettings['graphplugin_viewable_unshuffled_items'], [...trackerSettings.show_unshuffled_locations]);
    }

    const setRef = (index: string, element: HTMLDivElement | null): void => {
        if (!!element) scroller.current[index] = element;
    }

    const getPaperScrollY = () => {
        let paper = document.getElementById('worldScrollContainer');
        if (!!paper) return paper.scrollTop;
        return 0;
    }

    const majorTrackerUpgrade = () => {
        localStorage.clear();
        localStorage.setItem('TrackerVersion', trackerVersion);
    }

    const upgradeTrackerSettings = (oldTrackerSettings: all_tracker_settings_versions): TrackerSettingsCurrent => {
        // Modify stored settings as needed if they change in the future.
        // Independent of stored graph state.
        return oldTrackerSettings;
    }

    const resetState = (): void => {
        // reset graph state by re-importing only the settings
        let simMode = graph.worlds[trackerSettings.player_number].settings['graphplugin_simulator_mode'] as boolean;
        let plando = graph.export(simMode, true);
        // manually drop checked keys so that we can maintain location/entrance/hint fill
        if (simMode) {
            delete plando[':checked'];
            delete plando[':checked_entrances'];
            changeSetting({ target: { name: 'region_page', value: 'Warps' }});
        } else {
            changeSetting({ target: { name: 'region_page', value: 'Overworld' }});
        }
        setLastEntranceName('');
        graph.import(plando);
        setTrackerPreferences();
        refreshSearch();
        setGraphInitialState(JSON.stringify(graph.export(true)));
        setCollapsedRegions({});
        setAlertReset(false);
    }

    const refreshSearch = () => {
        graph.collect_locations();
        graphRefreshCounter > 0 ? setGraphRefreshCounter(graphRefreshCounter-1) : setGraphRefreshCounter(graphRefreshCounter+1);
        localStorage.setItem('GraphState', JSON.stringify(graph.export(true)));
    }

    const getSavedGraphState = (saved_name: string) => {
        let savedState = null;
        let clientSavedGraphStates = localStorage.getItem('SavedGraphStates');
        if (!!clientSavedGraphStates) {
            let savedGraphStates = JSON.parse(clientSavedGraphStates);
            if (Object.keys(savedGraphStates).includes(saved_name)) {
                savedState = savedGraphStates[saved_name];
            }
        }
        return savedState;
    }

    const loadGraphVersion = (version: string, blankState: boolean = true) => {
        graph.initialized = false;
        setFileCache({files: {}});
        setGraphInitialized(false);
        setGraphVersion(version);
        if (blankState) setGraphInitialState('{}');
    }

    const loadGraphPreset = (preset_name: string) => {
        graph.load_settings_preset(preset_name);
        refreshSearch();
        setGraphInitialState(JSON.stringify(graph.export(true)));
    }

    const importGraphState = (inputEvent: ChangeEvent<HTMLInputElement>) => {
        if (!inputEvent.target.files) return;
        let file = inputEvent.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target?.result;
            if (!!content && typeof(content) === 'string') {
                setupImport(content);
            }
        }
    }

    const importSimGraphState = (inputEvent: ChangeEvent<HTMLInputElement>) => {
        if (!inputEvent.target.files) return;
        let file = inputEvent.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target?.result;
            if (!!content && typeof(content) === 'string') {
                setImportSimMode(true);
                setupImport(content);
            }
        }
    }

    const setupImport = (content: string) => {
        setTrackerInitialized(false);
        let plando = JSON.parse(content);
        let newVersion = graphVersion;
        if (Object.keys(plando).includes(':version')) {
            newVersion = plando[':version'];
        }
        let supportedVersions = graph.get_game_versions();
        if (supportedVersions.versions.filter(v => v.version === newVersion).length === 0) {
            console.log(`Unsupported game version ${newVersion}`);
        } else {
            if (graphVersion !== newVersion) {
                setGraphInitialState(content);
                loadGraphVersion(newVersion, false);
            } else {
                setGraphImportFile(content);
            }
        }
    }

    const exportGraphState = () => {
        let fileData = JSON.stringify(graph.export());
        let blob = new Blob([fileData], { type: 'text/plain' });
        let url = URL.createObjectURL(blob);
        let link = document.createElement('a');
        link.download = 'tootr-plando.json';
        link.href = url;
        link.click();
    }

    const changeSetting = (setting: TrackerSettingChangeEvent) => {
        console.log(`[Setting] ${setting.target.name} changed to ${setting.target.value}`);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings[setting.target.name] = setting.target.value;
        setTrackerSettings(newTrackerSettings);
    }

    const changeRaceMode = (): void => {
        if (cachedRaceMode !== null) {
            let graphSettings = graph.get_settings_options();
            let newRaceMode = cachedRaceMode ? 'starting_items' : 'collected';
            graph.change_setting(graph.worlds[trackerSettings.player_number], graphSettings['graphplugin_world_search_mode'], newRaceMode);
            let newTrackerSettings = copyTrackerSettings(trackerSettings);
            newTrackerSettings.race_mode = cachedRaceMode;
            //resetState();
            setTrackerSettings(newTrackerSettings);
            setCachedRaceMode(null);
        }
        setAlertReset(false);
        refreshSearch();
    }

    const changeRegionMode = (regionSearchMode: string): void => {
        let graphSettings = graph.get_settings_options();
        graph.change_setting(graph.worlds[trackerSettings.player_number], graphSettings['graphplugin_region_visibility_mode'], regionSearchMode);
        refreshSearch();
    }

    // default to reverse direction so that right-click/long-touch handler only needs
    // to pass one argument
    const cycleGraphSetting = ({graphSettingName = '', reverseDirection = true}: {graphSettingName?: string, reverseDirection?: boolean} = {}): void => {
        let settingValue = graph.worlds[trackerSettings.player_number].settings[graphSettingName];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[graphSettingName];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'boolean') {
            graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, !settingValue);
            //graph.worlds[trackerSettings.player_number].settings[graphSettingName] = !(settingValue);
        } else if (typeof settingValue === 'string') {
            let settingChoices = graphSettingsOptions[graphSettingName].choices;
            if (!!settingChoices) {
                let settingOptions = Object.keys(settingChoices);
                let settingIndex = settingOptions.indexOf(settingValue);
                if (settingIndex === settingOptions.length - 1 && !reverseDirection) {
                    settingIndex = 0;
                } else if (settingIndex === 0 && reverseDirection) {
                    settingIndex = settingOptions.length - 1;
                } else if (!reverseDirection) {
                    settingIndex++;
                } else {
                    settingIndex--;
                }
                // skip 'random' option since we aren't interested in generation, only tracking
                if (settingOptions[settingIndex] === 'random') {
                    if (!reverseDirection) {
                        settingIndex++;
                        if (settingIndex === settingOptions.length) settingIndex = 0;
                    } else {
                        settingIndex--;
                        if (settingIndex < 0) settingIndex = settingOptions.length - 1;
                    }
                }
                graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, settingOptions[settingIndex]);
                //graph.worlds[trackerSettings.player_number].settings[graphSettingName] = settingOptions[settingIndex];
            }
        } else if (typeof settingValue === 'number') {
            let optionMax = graphSettingsOptions[graphSettingName].maximum;
            let optionMin = graphSettingsOptions[graphSettingName].minimum;
            // can't use !! on min since this will fail on 0
            if (!!optionMax && optionMin !== undefined && optionMin !== null) {
                if (!reverseDirection) {
                    (settingValue === optionMax) ? settingValue = optionMin : settingValue++;
                } else {
                    (settingValue === optionMin) ? settingValue = optionMax : settingValue--;
                }
                graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, settingValue);
                //graph.worlds[trackerSettings.player_number].settings[graphSettingName] = settingValue;
            }
        }
        refreshSearch();
        console.log(`[Setting] ${graphSettingName} changed to ${graph.worlds[trackerSettings.player_number].settings[graphSettingName]}`);
    }

    const cycleGraphMultiselectOption = ({graphSettingName = '', settingOptions = ['']}: {graphSettingName?: string, settingOptions?: string[]} = {}) => {
        let settingValue = cloneDeep(graph.worlds[trackerSettings.player_number].settings[graphSettingName]);
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[graphSettingName];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (Array.isArray(settingValue)) {
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
            graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, settingValue);
        }
        refreshSearch();
        console.log(`[Setting] ${graphSettingName} changed to ${graph.worlds[trackerSettings.player_number].settings[graphSettingName]}`);
    }

    const changeGraphStringSetting = (s: ChangeEvent<HTMLSelectElement>): void => {
        const {target: { name, value }} = s;
        let settingValue = graph.worlds[trackerSettings.player_number].settings[name];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[name];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'string') {
            let settingChoices = graphSettingsOptions[name].choices;
            if (!!settingChoices) {
                if (Object.keys(settingChoices).includes(value)) {
                    graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, value);
                } else {
                    console.log(`[Setting] Tried to change ${name} to non-existent option ${value}`);
                    return;
                }
            }
        }
        refreshSearch();
        console.log('[Setting]', name, 'changed to', value);
    }

    const changeGraphBooleanSetting = (s: ChangeEvent<HTMLInputElement>): void => {
        const {target: { name, checked }} = s;
        let settingValue = graph.worlds[trackerSettings.player_number].settings[name];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[name];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'boolean') {
            if (typeof checked === 'boolean') {
                graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, checked);
            } else {
                console.log(`[Setting] Tried to change boolean setting ${name} to non-boolean value ${checked}`);
                return;
            }
        }
        refreshSearch();
        console.log('[Setting]', name, 'changed to', checked);
    }

    const changeGraphNumericSetting = (s: ChangeEvent<HTMLSelectElement>): void => {
        const {target: { name, value }} = s;
        const numValue = parseInt(value);
        let settingValue = graph.worlds[trackerSettings.player_number].settings[name];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[name];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'number') {
            if (typeof numValue === 'number') {
                if ((graphSetting.maximum !== undefined && numValue > graphSetting.maximum) || (graphSetting.minimum !== undefined && numValue < graphSetting.minimum)) {
                    console.log(`[Setting] Tried to change numeric setting ${name} to value ${numValue} outside max ${graphSetting.maximum} and min ${graphSetting.minimum}`);
                    return;
                }
                graph.change_setting(graph.worlds[trackerSettings.player_number], graphSetting, numValue);
            } else {
                console.log(`[Setting] Tried to change numeric setting ${name} to non-numeric value ${numValue}`);
                return;
            }
        }
        refreshSearch();
        console.log('[Setting]', name, 'changed to', numValue);
    }

    const cycleGraphRewardHint = ({itemName = '', forward = true}: {itemName?: string, forward?: boolean} = {}) => {
        graph.cycle_hinted_areas_for_item(itemName, graph.worlds[trackerSettings.player_number], forward);
        refreshSearch();
        console.log(`[Reward Hint] ${itemName} area changed to ${graph.worlds[trackerSettings.player_number].fixed_item_area_hints[itemName]}`);
    }

    const addStartingItem = (item_name: string, count: number = 1) => {
        let graphItem = graph.get_item(graph.worlds[trackerSettings.player_number], item_name);
        graph.add_starting_item(graph.worlds[trackerSettings.player_number], graphItem, count);
        refreshSearch();
        console.log(`[Item] Added ${count} ${item_name} to starting items`);
    }

    const removeStartingItem = (item_name: string, count: number = 1) => {
        let graphItem = graph.get_item(graph.worlds[trackerSettings.player_number], item_name);
        graph.remove_starting_item(graph.worlds[trackerSettings.player_number], graphItem, count);
        refreshSearch();
        console.log(`[Item] Removed ${count} ${item_name} from starting items`);
    }

    const addStartingItems = (item_names: string[]) => {
        let graphItems: GraphItem[] = [];
        for (let item_name of item_names) {
            graphItems.push(graph.get_item(graph.worlds[trackerSettings.player_number], item_name));
        }
        graph.add_starting_items(graph.worlds[trackerSettings.player_number], graphItems);
        refreshSearch();
        console.log(`[Item] Added ${item_names} to starting items`);
    }

    const removeStartingItems = (item_names: string[]) => {
        let graphItems: GraphItem[] = [];
        for (let item_name of item_names) {
            graphItems.push(graph.get_item(graph.worlds[trackerSettings.player_number], item_name));
        }
        graph.remove_starting_items(graph.worlds[trackerSettings.player_number], graphItems);
        refreshSearch();
        console.log(`[Item] Removed ${item_names} to starting items`);
    }

    const replaceStartingItem = (add_item_name: string, remove_item_name: string) => {
        let addGraphItem = graph.get_item(graph.worlds[trackerSettings.player_number], add_item_name);
        let removeGraphItem = graph.get_item(graph.worlds[trackerSettings.player_number], remove_item_name);
        graph.replace_starting_item(graph.worlds[trackerSettings.player_number], addGraphItem, removeGraphItem);
        refreshSearch();
    }

    const toggleCollapse = (area: string): void => {
        let stateCollapsedRegions = cloneDeep(collapsedRegions);
        let collapse = stateCollapsedRegions[area];
        if (collapse === undefined) collapse = 'some';
        if (collapse === 'none') {
            collapse = 'some';
        } else if (collapse === 'some') {
            collapse = 'all';
        } else {
            collapse = 'none';
        }
        stateCollapsedRegions[area] = collapse;
        setCollapsedRegions(stateCollapsedRegions);
    }

    const toggleCollapseReverse = (areaDiv: HTMLDivElement) => {
        let area = areaDiv.innerText;
        let stateCollapsedRegions = cloneDeep(collapsedRegions);
        let collapse = stateCollapsedRegions[area];
        if (collapse === undefined) collapse = 'some';
        if (collapse === 'none') {
            collapse = 'all';
        } else if (collapse === 'some') {
            collapse = 'none';
        } else {
            collapse = 'some';
        }
        stateCollapsedRegions[area] = collapse;
        setCollapsedRegions(stateCollapsedRegions);
    }

    const linkEntrance = (dataLinkFrom: string, dataLinkTo: string): void => {
        let sourceEntrance = graph.worlds[trackerSettings.player_number].get_entrance(dataLinkFrom);
        let targetEntrance = graph.worlds[trackerSettings.player_number].get_entrance(dataLinkTo);
        console.log(`${dataLinkFrom} <> ${dataLinkTo} [Connected]`);
        graph.set_entrance(sourceEntrance, targetEntrance);
        refreshSearch();
        let eRef = scroller.current[entranceRef];
        let rect = eRef.getBoundingClientRect();
        let oTop = rect.top;
        //let scrollYLocal = oTop + window.scrollY;
        let scrollYLocal = oTop + getPaperScrollY();
        setScrollY(scrollYLocal);
        handleEntranceMenuClose(false);
    }

    const unLinkEntrance = (entrance: string, scrollRef: string): void => {
        let sourceEntrance = graph.worlds[trackerSettings.player_number].get_entrance(entrance);
        console.log(`${entrance} [Disconnected]`);
        graph.set_entrance(sourceEntrance, null);
        refreshSearch();
        let eRef = scroller.current[scrollRef];
        let rect = eRef.getBoundingClientRect();
        let oTop = rect.top;
        //let scrollYLocal = oTop + window.scrollY;
        let scrollYLocal = oTop + getPaperScrollY();
        setScrollY(scrollYLocal);
        setEntranceRef(scrollRef);
    }

    const toggleWalletTiers = (location: string): void => {
        let sourceLocation = graph.worlds[trackerSettings.player_number].get_location(location);
        if (!!sourceLocation.item) {
            let itemPrice = sourceLocation.item.price;
            if (itemPrice === null || itemPrice <= 99) {
                itemPrice = 200;
            } else if (itemPrice <= 200) {
                itemPrice = 500;
            } else if (itemPrice <= 500) {
                itemPrice = 999;
            } else {
                itemPrice = 99;
            }
            sourceLocation.item.price = itemPrice;
            graph.set_location_item(sourceLocation, sourceLocation.item, itemPrice);
            refreshSearch();
        }
    }

    const updateShopPrice = (location: string, priceValue: string): void => {
        let sourceLocation = graph.worlds[trackerSettings.player_number].get_location(location);
        if (!!sourceLocation.item) {
            sourceLocation.item.price = parseInt(priceValue);
            graph.set_location_item(sourceLocation, sourceLocation.item, sourceLocation.item.price);
            refreshSearch();
            console.log(sourceLocation.name, '[price]', sourceLocation.price?.toString());
        }
    }

    const checkLocation = (location: string): void => {
        console.log(`${location} [Checked]`);
        let sourceLocation = graph.worlds[trackerSettings.player_number].get_location(location);
        let simMode = graph.worlds[trackerSettings.player_number].settings['graphplugin_simulator_mode'] as boolean;
        if (sourceLocation.is_hint && simMode) {
            graph.unhide_hint(sourceLocation);
        }
        graph.check_location(sourceLocation);
        refreshSearch();
    }

    const unCheckLocation = (location: string): void => {
        console.log(`${location} [Unchecked]`);
        let sourceLocation = graph.worlds[trackerSettings.player_number].get_location(location);
        graph.uncheck_location(sourceLocation);
        refreshSearch();
    }

    const checkEntrance = (entrance: string): void => {
        console.log(`${entrance} [Checked]`);
        let sourceEntrance = graph.worlds[trackerSettings.player_number].get_entrance(entrance);
        graph.check_entrance(sourceEntrance);
        if (trackerSettings.one_region_per_page && !tracker_settings_defs.region_page.options?.includes(trackerSettings.region_page)) {
            let reverseLink = !!(sourceEntrance.replaces) ? sourceEntrance.replaces : sourceEntrance;
            handleDungeonTravel(reverseLink.target_group, sourceEntrance);
        }
        refreshSearch();
    }

    const unCheckEntrance = (entrance: string): void => {
        console.log(`${entrance} [Unchecked]`);
        let sourceEntrance = graph.worlds[trackerSettings.player_number].get_entrance(entrance);
        graph.uncheck_entrance(sourceEntrance);
        refreshSearch();
    }

    const findItem: MouseEventHandler<HTMLDivElement> = (ootItem): void => {
        let originator = ootItem.currentTarget.getAttribute('data-found-in');
        let foundItem = ootItem.currentTarget.getAttribute('data-found-item');
        if (originator === null) throw `Cannot assign item to null location`;
        let sourceLocation = graph.worlds[trackerSettings.player_number].get_location(originator);
        if (!!(foundItem) || (foundItem !== '' && typeof(foundItem) === 'string')) {
            console.log(originator, "[holds]", foundItem);
            graph.set_location_item(sourceLocation, graph.worlds[trackerSettings.player_number].get_item(foundItem));
        } else {
            console.log(originator, "[cleared]");
            graph.set_location_item(sourceLocation, null);
        }
        handleItemMenuClose();
        handleShopItemMenuClose();
        refreshSearch();
    }

    const findHint = (ootHint: HintMenuData): void => {
        switch (ootHint.hintType) {
            case 'woth':
                if (ootHint.hintRegion) {
                    let hintRegion = graph.worlds[trackerSettings.player_number].region_groups.filter(r => r.name === ootHint.hintRegion);
                    if (hintRegion.length === 1) {
                        let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                        graph.hint_required_area(hintLocation, hintRegion[0]);
                        refreshSearch();
                    }
                }
                break;
            case 'path':
                if (ootHint.hintRegion && ootHint.hintPath) {
                    let hintRegion = graph.worlds[trackerSettings.player_number].region_groups.filter(r => r.name === ootHint.hintRegion);
                    let tempGoal = new GraphHintGoal();
                    tempGoal.item_count = 1;
                    if (Object.keys(pathItems).includes(ootHint.hintPath)) {
                        tempGoal.item = graph.worlds[trackerSettings.player_number].get_item(pathItems[ootHint.hintPath]);
                    }
                    if (Object.keys(pathLocations).includes(ootHint.hintPath)) {
                        tempGoal.location = graph.worlds[trackerSettings.player_number].get_location(pathLocations[ootHint.hintPath]);
                    }
                    if (hintRegion.length === 1) {
                        let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                        graph.hint_area_required_for_goal(hintLocation, hintRegion[0], tempGoal);
                        refreshSearch();
                    }
                }
                break;
            case 'foolish':
                if (ootHint.hintRegion) {
                    let hintRegion = graph.worlds[trackerSettings.player_number].region_groups.filter(r => r.name === ootHint.hintRegion);
                    if (hintRegion.length === 1) {
                        let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                        graph.hint_unrequired_area(hintLocation, hintRegion[0]);
                        refreshSearch();
                    }
                }
                break;
            case 'important_check':
                if (ootHint.hintRegion && ootHint.hintMajorItems !== undefined) {
                    let hintRegion = graph.worlds[trackerSettings.player_number].region_groups.filter(r => r.name === ootHint.hintRegion);
                    if (hintRegion.length === 1) {
                        let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                        graph.hint_area_num_items(hintLocation, hintRegion[0], ootHint.hintMajorItems);
                        refreshSearch();
                    }
                }
                break;
            case 'location':
                if (ootHint.hintLocation && ootHint.hintItem) {
                    let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                    let hintedLocation = graph.worlds[trackerSettings.player_number].get_location(ootHint.hintLocation);
                    let hintedItem = graph.worlds[trackerSettings.player_number].get_item(ootHint.hintItem);
                    graph.hint_location(hintLocation, hintedLocation, hintedItem);
                    refreshSearch();
                }
                break;
            case 'dual':
                if (ootHint.hintLocation && ootHint.hintItem && ootHint.hintLocation2 && ootHint.hintItem2) {
                    let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                    let hintedLocation = graph.worlds[trackerSettings.player_number].get_location(ootHint.hintLocation);
                    let hintedItem = graph.worlds[trackerSettings.player_number].get_item(ootHint.hintItem);
                    let hintedLocation2 = graph.worlds[trackerSettings.player_number].get_location(ootHint.hintLocation2);
                    let hintedItem2 = graph.worlds[trackerSettings.player_number].get_item(ootHint.hintItem2);
                    graph.hint_dual_locations(hintLocation, hintedLocation, hintedItem, hintedLocation2, hintedItem2);
                    refreshSearch();
                }
                break;
            case 'entrance':
                if (ootHint.hintEntrance && ootHint.hintEntranceTarget) {
                    let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                    let hintedExit = graph.worlds[trackerSettings.player_number].get_entrance(ootHint.hintEntrance);
                    let hintedTarget = graph.worlds[trackerSettings.player_number].get_entrance(ootHint.hintEntranceTarget);
                    graph.hint_entrance(hintLocation, hintedExit, hintedTarget);
                    refreshSearch();
                }
                break;
            case 'misc':
                if (ootHint.hintRegion && ootHint.hintItem) {
                    let hintRegion = graph.worlds[trackerSettings.player_number].region_groups.filter(r => r.name === ootHint.hintRegion);
                    if (hintRegion.length === 1) {
                        let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
                        let hintedItem = graph.worlds[trackerSettings.player_number].get_item(ootHint.hintItem);
                        graph.hint_item_in_area(hintLocation, hintRegion[0], hintedItem);
                        refreshSearch();
                    }
                }
                break;
            default:
                break;
        }
        handleHintMenuClose();
    }

    const clearHint = () => {
        let hintLocation = graph.worlds[trackerSettings.player_number].get_location(locationToLink);
        graph.unhint(hintLocation);
        refreshSearch();
        handleHintMenuClose();
    }

    const searchTracker: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTerm(e.currentTarget.value);
    }

    const handleItemMenuOpen = (location: HTMLDivElement, dataSource: string | null) => {
        if (dataSource === null) return;
        setItemMenuOpen(location);
        setLocationToLink(dataSource);
    }

    const handleShopItemMenuOpen = (location: HTMLDivElement, dataSource: string | null) => {
        if (dataSource === null) return;
        setShopItemMenuOpen(location);
        setLocationToLink(dataSource);
    }

    const handleHintMenuOpen = (location: HTMLDivElement, dataSource: string | null) => {
        if (dataSource === null) return;
        setHintMenuOpen(location);
        setLocationToLink(dataSource);
    }

    const handleItemMenuClose = () => {
        setItemMenuOpen(null);
        setLocationToLink('');
    }

    const handleShopItemMenuClose = () => {
        setShopItemMenuOpen(null);
        setLocationToLink('');
    }

    const handleHintMenuClose = () => {
        setHintMenuOpen(null);
        setLocationToLink('');
    }

    const handleMultiselectMenuOpen = (setting: Element, settingName: string) => {
        setMultiselectMenuOpen(setting);
        setMultiselectToUpdate(settingName);
    }

    const handleMultiselectMenuClose = () => {
        setMultiselectMenuOpen(null);
        setMultiselectToUpdate('');
    }

    const handleEntranceMenuOpen = (entrance: MouseEvent<HTMLDivElement>, scrollRef: string): void => {
        console.log(entrance.currentTarget.getAttribute('data-source'),'-> Open menu');
        let dataSource = entrance.currentTarget.getAttribute('data-source');
        setEntranceMenuOpen(entrance.currentTarget);
        setEntranceToLink(!!dataSource ? dataSource : '');
        setEntranceRef(scrollRef);
    }

    const handleEntranceMenuClose = (clearRef=true) => {
        let eRef = (clearRef === true) ? '' : entranceRef;
        setEntranceMenuOpen(null);
        setEntranceToLink('');
        setEntranceRef(eRef);
    }

    const handleDungeonTravel = (targetRegion: GraphRegion | null, regionEntrance: GraphEntrance | null = null) => {
        let href = '#';
        let linkedRegion = targetRegion;
        if (!!(linkedRegion)) {
            let visitedEntrances: GraphEntrance[] = [];
            while (linkedRegion.page === '') {
                let foundNewEntrance = false;
                for (let i = 0; i < linkedRegion.entrances.length; i++) {
                    if (!(visitedEntrances.includes(linkedRegion.entrances[i])) && !(linkedRegion.entrances[i].is_warp) && linkedRegion !== linkedRegion.entrances[i].source_group) {
                        linkedRegion = linkedRegion.entrances[i].source_group;
                        if (linkedRegion === null) throw `Failed to find top level warp target region for starting region ${targetRegion?.alias}`;
                        foundNewEntrance = true;
                        break;
                    }
                }
                if (!foundNewEntrance) throw `Ran out of entrances to search for top level warp target region for starting region ${targetRegion?.alias}`;
            }
            if (trackerSettings.one_region_per_page) {
                if (linkedRegion.name !== trackerSettings.region_page) {
                    changeSetting({target: { name: "region_page", value: linkedRegion.name }});
                }
            } else {
                if (linkedRegion.page !== trackerSettings.region_page) {
                    changeSetting({target: { name: "region_page", value: linkedRegion.page }});
                }
            }
            if (!!regionEntrance) {
                // don't re-scroll if we're linking from within the same region
                if (regionEntrance.source_group?.name !== linkedRegion.alias) {
                    href = `#${linkedRegion.alias}`;
                }
            } else {
                href = `#${linkedRegion.alias}`;
            }
            if (!!regionEntrance && !tracker_settings_defs.region_page.options?.includes(trackerSettings.region_page)) {
                let exitedEntrance = buildExitEntranceName(regionEntrance);
                setLastEntranceName(!!exitedEntrance ? exitedEntrance : '');
            } else {
                setLastEntranceName('');
            }
        }
        if (href !== '#') {
            setDelayedURL(href);
        }
    }

    const isWarpAreaLinked = (entrance: GraphEntrance) => {
        let eLink = !!(entrance.replaces) ? entrance.replaces : entrance;
        return !!(eLink.connected_region && eLink.visited_with_other_tricks);
    }

    const toggleAreaView = () => {
        if (trackerSettings.region_page === "Overworld") {
            changeSetting({target: { name: "region_page", value: "Dungeons" }});
        } else {
            changeSetting({target: { name: "region_page", value: "Overworld" }});
        }
    }

    const contextMenuHandler = new ContextMenuHandler(handleItemMenuOpen);
    const hintContextMenuHandler = new ContextMenuHandler(handleHintMenuOpen);
    const shopContextMenuHandler = new ContextMenuHandler(handleShopItemMenuOpen);
    const areaMenuHandler = new ContextMenuHandler(toggleAreaView);
    const reverseCollapseHandler = new ContextMenuHandler(toggleCollapseReverse);

    const customTheme = createTheme({
        components: {
            MuiMenu: {
                styleOverrides: {
                    list: {
                        paddingTop: 0,
                        paddingBottom: 0,
                    },
                    paper: {
                        overflowX: 'visible',
                        overflowY: 'visible',
                    }
                }
            },
            MuiButtonBase: {
                defaultProps: {
                    disableRipple: true
                }
            }
        }
    });
    if (trackerInitialized && graphInitialized) {
        let graphSupportedVersions = graph.get_game_versions();
        let graphSettingsOptions = graph.get_settings_options();
        let graphSettingsLayout = graph.get_settings_layout();
        let graphSettings = graph.worlds[trackerSettings.player_number].settings;
        let graphCollectedItems = graph.get_collected_items_for_world(graph.worlds[trackerSettings.player_number]);
        let graphPlayerInventory = graph.get_player_inventory_for_world(graph.worlds[trackerSettings.player_number]);
        let multiselectSettingChoices = multiselectToUpdate ? graphSettingsOptions[multiselectToUpdate]?.choices : {};
        let graphRegions = graph.worlds[trackerSettings.player_number].region_groups.sort((a, b) =>
            a.alias.localeCompare(b.alias));
        let viewableRegions: GraphRegion[] = [];
        if (trackerSettings.one_region_per_page) {
            if (tracker_settings_defs.region_page.options?.includes(trackerSettings.region_page)) {
                viewableRegions = graphRegions.filter(r =>
                    r.page === trackerSettings.region_page && r.viewable);
            } else {
                viewableRegions = graphRegions.filter(r =>
                    r.name === trackerSettings.region_page);
            }
        } else {
            viewableRegions = graphRegions.filter(r =>
                r.page === trackerSettings.region_page && r.viewable);
        }
        let pages: {[page: string]: GraphRegion[]} = {};
        for (let r of graph.worlds[trackerSettings.player_number].region_groups) {
            if (Object.keys(pages).includes(r.page)) {
                pages[r.page].push(r);
            } else {
                pages[r.page] = [r];
            }
        }
        let graphEntrances = graph.get_entrances_for_world(graph.worlds[trackerSettings.player_number]);
        let warpEntrances = graphEntrances.filter(e => e.is_warp);
        let graphFullEntrancePool = graph.get_full_entrance_pool(graph.worlds[trackerSettings.player_number]);
        let graphFullExitPool = graph.get_full_exit_pool(graph.worlds[trackerSettings.player_number]);
        let graphEntrancePool = entranceToLink !== '' ? graph.get_entrance_pool(graph.worlds[trackerSettings.player_number], graph.worlds[trackerSettings.player_number].get_entrance(entranceToLink)) : {};
        let graphEntranceToLink = entranceToLink !== '' ? graph.worlds[trackerSettings.player_number].get_entrance(entranceToLink) : null;
        let graphLocations = graph.get_locations_for_world(graph.worlds[trackerSettings.player_number]);
        let graphLocationCount = graphLocations.filter(l => l.shuffled && !l.is_hint && !l.is_restricted);
        let graphRewardHints = graph.worlds[trackerSettings.player_number].fixed_item_area_hints;
        let sourceHintLocationType = locationToLink !== '' ? graph.worlds[trackerSettings.player_number].get_location(locationToLink).type : 'HintStone';
        let sourceHintLocationText = locationToLink !== '' ? graph.worlds[trackerSettings.player_number].get_location(locationToLink).hint_text : '';
        sourceHintLocationText = sourceHintLocationText.replaceAll('#', '').replaceAll('^', '\n');
        let simMode = graph.worlds[trackerSettings.player_number].settings['graphplugin_simulator_mode'] as boolean;
        return (
            <React.Fragment>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <div className={`root ${trackerSettings.dark_mode ? "dark" : ""}`}>
                        <TrackerTopBar
                            importGraphState={importGraphState}
                            exportGraphState={exportGraphState}
                            simGraphState={importSimGraphState}
                            loadGraphPreset={loadGraphPreset}
                            graphPresets={graphPresets}
                            graphLocationCount={graphLocationCount}
                            searchTracker={searchTracker}
                            trackerSettings={trackerSettings}
                            setTrackerSettings={setTrackerSettings}
                            setAlertReset={setAlertReset}
                        />
                        <TrackerDrawer
                            addStartingItem={addStartingItem}
                            addStartingItems={addStartingItems}
                            removeStartingItem={removeStartingItem}
                            removeStartingItems={removeStartingItems}
                            replaceStartingItem={replaceStartingItem}
                            cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                            cycleGraphRewardHint={cycleGraphRewardHint}
                            checkLocation={checkLocation}
                            unCheckLocation={unCheckLocation}
                            graphSettings={graphSettings}
                            graphCollectedItems={graphCollectedItems}
                            graphPlayerInventory={graphPlayerInventory}
                            graphRewardHints={graphRewardHints}
                            graphLocations={graphLocations}
                            graphEntrances={graphEntrances}
                            graphRegions={graphRegions}
                            graphRefreshCounter={graphRefreshCounter}
                            cycleGraphSetting={cycleGraphSetting}
                            handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                            graphSettingsOptions={graphSettingsOptions}
                            graphSettingsLayout={graphSettingsLayout}
                            trackerSettings={trackerSettings}
                            setTrackerSettings={setTrackerSettings}
                            changeGraphStringSetting={changeGraphStringSetting}
                            changeGraphBooleanSetting={changeGraphBooleanSetting}
                            changeGraphNumericSetting={changeGraphNumericSetting}
                            setCachedRaceMode={setCachedRaceMode}
                            setAlertReset={setAlertReset}
                            changeRegionMode={changeRegionMode}
                            changeGraphVersion={loadGraphVersion}
                            supportedGraphVersions={graphSupportedVersions}
                        />
                        <TrackerPaper
                            viewableRegions={viewableRegions}
                            collapsedRegions={collapsedRegions}
                            handleLink={linkEntrance}
                            handleUnLink={unLinkEntrance}
                            handleCheck={checkLocation}
                            handleUnCheck={unCheckLocation}
                            handleCheckEntrance={checkEntrance}
                            handleUnCheckEntrance={unCheckEntrance}
                            handleContextMenu={contextMenuHandler}
                            handleShopContextMenu={shopContextMenuHandler}
                            handleHintContextMenu={hintContextMenuHandler}
                            handleEntranceMenuOpen={handleEntranceMenuOpen}
                            handleDungeonTravel={handleDungeonTravel}
                            toggleWalletTiers={toggleWalletTiers}
                            updateShopPrice={updateShopPrice}
                            collapseSwitch={toggleCollapse}
                            reverseCollapseSwitch={reverseCollapseHandler}
                            setRef={setRef}
                            refreshCounter={graphRefreshCounter}
                            searchTerm={searchTerm}
                            trackerSettings={trackerSettings}
                            simMode={simMode}
                            lastEntranceName={lastEntranceName}
                        />
                        <EntranceMenu
                            anchorLocation={entranceMenuOpen}
                            handleClose={handleEntranceMenuClose}
                            handleLink={linkEntrance}
                            entrancePool={graphEntrancePool}
                            sourceEntrance={graphEntranceToLink}
                            regions={graphRegions}
                            id="globalEntranceMenu"
                        />
                        <ItemMenu
                            menuLayout={location_item_menu_layout}
                            handleClose={handleItemMenuClose}
                            handleFind={findItem}
                            anchorLocation={itemMenuOpen}
                            sourceLocation={locationToLink}
                        />
                        <ItemMenu
                            menuLayout={shop_item_menu_layout}
                            handleClose={handleShopItemMenuClose}
                            handleFind={findItem}
                            anchorLocation={shopItemMenuOpen}
                            sourceLocation={locationToLink}
                        />
                        <HintMenu
                            handleClose={handleHintMenuClose}
                            handleFind={findHint}
                            clearHint={clearHint}
                            anchorLocation={hintMenuOpen}
                            sourceLocation={locationToLink}
                            sourceLocationType={sourceHintLocationType}
                            sourceLocationHintText={sourceHintLocationText}
                            regions={graphRegions}
                            fullEntrancePool={graphFullEntrancePool}
                            fullExitPool={graphFullExitPool}
                            locations={graphLocationCount}
                        />
                        <SettingMultiselectMenu
                            handleClose={handleMultiselectMenuClose}
                            handleChange={cycleGraphMultiselectOption}
                            anchorLocation={multiselectMenuOpen}
                            title={multiselectToUpdate ? graphSettingsOptions[multiselectToUpdate]?.display_name : ''}
                            settingName={multiselectToUpdate ? graphSettingsOptions[multiselectToUpdate]?.name : ''}
                            settingValue={multiselectToUpdate ? graphSettings[multiselectToUpdate] as string[] : []}
                            choices={multiselectSettingChoices === undefined ? {} : multiselectSettingChoices}
                            id="globalMultiselectOptionMenu"
                        />
                        <WarpMenu
                            isWarpAreaLinked={isWarpAreaLinked}
                            handleDungeonTravel={handleDungeonTravel}
                            areaMenuHandler={areaMenuHandler}
                            pages={pages}
                            warps={warpEntrances}
                        />
                        <TrackerUpdateDialog
                            alertUpdate={alertUpdate}
                            setAlertUpdate={setAlertUpdate}
                        />
                        <TrackerResetDialog
                            alertReset={alertReset}
                            newRaceMode={cachedRaceMode}
                            setAlertReset={setAlertReset}
                            resetState={resetState}
                            changeRaceMode={changeRaceMode}
                        />
                    </div>
                </ThemeProvider>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                Loading
            </React.Fragment>
        )
    }
}

export default Tracker