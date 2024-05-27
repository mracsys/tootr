import React, { useEffect, useState, useRef, useMemo, ChangeEvent, MouseEventHandler, MouseEvent } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { TrackerDrawer } from './TrackerDrawer';
import { TrackerTopBar } from './TrackerTopBar';
import GameArea from './GameArea';
import EntranceMenu from './EntranceMenu';
import ItemMenu from './ItemMenu';
import SettingMultiselectMenu from './SettingMultiselectMenu';
import ContextMenuHandler from './ContextMenuHandler';
import WarpMenu from './WarpMenu';
import {
    all_tracker_settings_versions,
    current_settings_version,
    TrackerSettingsCurrent,
    tracker_settings_default,
    copyTrackerSettings,
    tracker_setting_type,
    // tracker_settings_v1, // add specific versions if format ever changes for the upgrade function
} from '@/data/tracker_settings';
import { location_item_menu_layout, shop_item_menu_layout } from '@/data/location_item_menu_layout';

import { WorldGraphFactory, ExternalFileCacheFactory, ExternalFileCache, GraphEntrance, GraphRegion, GraphItem } from '@mracsys/randomizer-graph-tool';

import '@/styles/tracker.css';
import '@/styles/mui-overrides.css';
import '@/styles/TrackerPaper.css';


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

// Changing the version will completely reset user preferences.
// Only touch this if absolutely necessary.
// Prefer in-place upgrades to settings in localstorage.
const trackerVersion = '1.0.0';

const Tracker = (_props: {}) => {
    let [trackerSettings, setTrackerSettings] = useState<TrackerSettingsCurrent>(tracker_settings_default);
    let [alertReset, setAlertReset] = useState<boolean>(false);
    let [alertUpdate, setAlertUpdate] = useState<boolean>(false);
    let [itemMenuOpen, setItemMenuOpen] = useState<Element | null>(null);
    let [shopItemMenuOpen, setShopItemMenuOpen] = useState<Element | null>(null);
    let [entranceMenuOpen, setEntranceMenuOpen] = useState<Element | null>(null);
    let [multiselectMenuOpen, setMultiselectMenuOpen] = useState<Element | null>(null);
    let [multiselectToUpdate, setMultiselectToUpdate] = useState<string>('');
    let [entranceToLink, setEntranceToLink] = useState<string>('');
    let [locationToLink, setLocationToLink] = useState<string>('');
    let [delayedURL, setDelayedURL] = useState<string>('');
    let [entranceRef, setEntranceRef] = useState<string>('');
    let [scrollY, setScrollY] = useState<number | null>(null);
    let [trackerInitialized, setTrackerInitialized] = useState<boolean>(false);
    let [graphInitialized, setGraphInitialized] = useState<boolean>(false);
    let [collapsedRegions, setCollapsedRegions] = useState<CollapsedRegions>({});
    let [searchTerm, setSearchTerm] = useState<string>('');
    const [_fileCache, setFileCache] = useState<ExternalFileCache>({files: {}});
    const scroller = useRef<ScrollerRef>({});

    // Graph state management to trigger rerender on memo change.
    // Required as graph updates are not pure.
    let [graphInitialState, setGraphInitialState] = useState<string>('{}');
    let [graphRefreshCounter, setGraphRefreshCounter] = useState<number>(0);
    let [graphImportFile, setGraphImportFile] = useState<string>('');
    let [graphPresets, setGraphPresets] = useState<string[]>([]);

    let graph = useMemo(
        () => WorldGraphFactory('ootr', {}, '7.1.195 R-1', _fileCache),
        [_fileCache]
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

        let clientCollapsedRegions = localStorage.getItem('CollapsedRegions');
        let collapsedRegionsInit: CollapsedRegions = !!(clientCollapsedRegions) ? JSON.parse(clientCollapsedRegions) : {};
        let clientInitialGraphState = localStorage.getItem('GraphState');
        let graphInitialStateInit = !!(clientInitialGraphState) ? JSON.parse(clientInitialGraphState) : {};

        setGraphInitialState(graphInitialStateInit);
        setCollapsedRegions(collapsedRegionsInit);
        setTrackerSettings(trackerSettings);
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
                window.scrollTo({
                    top: 2 * window.scrollY + oTop - scrollToY,
                });
                setScrollY(null);
                setEntranceRef('');
            });
        }

        let ignore = false;
        
        const getGraph = async () => {
            if (Object.keys(_fileCache.files).length === 0) {
                let graphFileCache = await ExternalFileCacheFactory('ootr', '7.1.195 R-1', { local_url: '/ootr-local-roman-195' });
                if (!ignore) {
                    setFileCache(graphFileCache);
                }
            }
            if (graph.initialized && !ignore && !graphInitialized) {
                setGraphPresets(graph.get_settings_presets());
                if (Object.keys(graphInitialState).length > 0) graph.import(graphInitialState);
                graph.set_search_mode('Collected Items');
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
            graph.import(importState);
            refreshSearch();
            setGraphInitialState(graphImportFile);
            setTrackerInitialized(true);
            setGraphImportFile('');
        }
    }, [graphImportFile]);

    const setRef = (index: string, element: HTMLDivElement | null): void => {
        if (!!element) scroller.current[index] = element;
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
        graph.import(graph.export(false, true));
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
                setTrackerInitialized(false);
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
        console.log(setting.target.name, setting.target.value);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        setting.target
        newTrackerSettings[setting.target.name] = setting.target.value;
        setTrackerSettings(newTrackerSettings);
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
            //graph.worlds[trackerSettings.player_number].settings[graphSettingName] = settingValue;
        }
        refreshSearch();
        console.log(`[Setting] ${graphSettingName} changed to ${graph.worlds[trackerSettings.player_number].settings[graphSettingName]}`);
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
        let scrollYLocal = oTop + window.scrollY;
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
        let scrollYLocal = oTop + window.scrollY;
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
            graph.set_location_item(sourceLocation, sourceLocation.item);
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
        graph.check_location(sourceLocation);
        refreshSearch();
    }

    const unCheckLocation = (location: string): void => {
        console.log(`${location} [Unchecked]`);
        let sourceLocation = graph.worlds[trackerSettings.player_number].get_location(location);
        graph.uncheck_location(sourceLocation);
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

    const searchTracker: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearchTerm(e.currentTarget.value);
    }

    const cancelAlert = () => {
        setAlertReset(false);
    }

    const cancelUpdate = () => {
        setAlertUpdate(false);
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

    const handleItemMenuClose = () => {
        setItemMenuOpen(null);
        setLocationToLink('');
    }

    const handleShopItemMenuClose = () => {
        setShopItemMenuOpen(null);
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

    const handleDungeonTravel = (targetRegion: GraphRegion | null) => {
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
            if (linkedRegion.page !== trackerSettings.region_page) {
                changeSetting({target: { name: "region_page", value: linkedRegion.page }});
            }
            href = `#${linkedRegion.alias}`;
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
            changeSetting({target: { name: "region_page", "value": "Dungeons" }});
        } else {
            changeSetting({target: { name: "region_page", "value": "Overworld" }});
        }
    }

    const contextMenuHandler = new ContextMenuHandler(handleItemMenuOpen);
    const shopContextMenuHandler = new ContextMenuHandler(handleShopItemMenuOpen);
    const areaMenuHandler = new ContextMenuHandler(toggleAreaView);
    const reverseCollapseHandler = new ContextMenuHandler(toggleCollapseReverse);

    const customTheme = createTheme({
        /*breakpoints: {
            values: {
                xs: 0,
                sm: 1704,
                md: 2264,
                lg: 2824,
                xl: 3384,
            }
        },*/
        components: {
            MuiMenu: {
                styleOverrides: {
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
    /*
        sidebar-width = 490px (expanded), 0px (hidden)
        window-padding = sidebar-width + areaPaper.padding(20px) * 2
        column-gap = 20px
        min-column-width = 540px
        cutoff = window-padding + (column-width + column-gap) * column-count
    */
    const masonryBreakpoints: {[breakpoint: number]: number} = trackerSettings.expand_sidebar ? {
        0: 1,
        1650: 2,
        2210: 3,
        2770: 4,
        3330: 5,
    } : {
        0: 1,
        1160: 2,
        1720: 3,
        2280: 4,
        2840: 5,
        3400: 6,
    }
    if (trackerInitialized && graphInitialized) {
        let graphSettingsOptions = graph.get_settings_options();
        let graphSettingsLayout = graph.get_settings_layout();
        let graphSettings = graph.worlds[trackerSettings.player_number].settings;
        let graphCollectedItems = graph.get_collected_items_for_world(graph.worlds[trackerSettings.player_number]);
        let graphPlayerInventory = graph.get_player_inventory_for_world(graph.worlds[trackerSettings.player_number]);
        let multiselectSettingChoices = multiselectToUpdate ? graphSettingsOptions[multiselectToUpdate]?.choices : {};
        let currentPage = trackerSettings.region_page;
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
        let graphEntrancePool = entranceToLink !== '' ? graph.get_entrance_pool(graph.worlds[trackerSettings.player_number], graph.worlds[trackerSettings.player_number].get_entrance(entranceToLink)) : {};
        let graphEntranceToLink = entranceToLink !== '' ? graph.worlds[trackerSettings.player_number].get_entrance(entranceToLink) : null;
        let graphLocations = graphInitialized ? graph.get_locations_for_world(graph.worlds[trackerSettings.player_number]) : [];
        let graphLocationCount = graphInitialized ? graphLocations.filter(l => l.shuffled && !l.is_hint && !l.is_restricted) : [];
        let graphRewardHints = graph.worlds[trackerSettings.player_number].fixed_item_area_hints;
        return (
            <React.Fragment>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <div className={trackerSettings.dark_mode ? "root dark" : "root"}>
                        <TrackerTopBar
                            importGraphState={importGraphState}
                            exportGraphState={exportGraphState}
                            loadGraphPreset={loadGraphPreset}
                            graphPresets={graphPresets}
                            graphLocationCount={graphLocationCount}
                            searchTracker={searchTracker}
                            trackerSettings={trackerSettings}
                            setTrackerSettings={setTrackerSettings}
                        />
                        <Dialog
                            open={alertReset}
                            onClose={() => cancelAlert()}
                            disableScrollLock={true}
                        >
                            <DialogTitle>{"Reset Tracker?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    All entrance and location checks will be cleared. Are you sure?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => resetState()}>Yes</Button>
                                <Button onClick={() => cancelAlert()}>No</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={alertUpdate}
                            onClose={() => cancelUpdate()}
                            disableScrollLock={true}
                        >
                            <DialogTitle>{"Scheduled Updates"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your tracker will update on <b>May 15th at 8PM US Eastern Daylight Time</b>.
                                </DialogContentText>
                                <DialogContentText className="redAlert">
                                    <em><b>ANY SAVED PROGRESS WILL BE LOST.</b></em>
                                </DialogContentText>
                                <DialogContentText>
                                    This update includes substantial changes for new randomizer features and requires a new data format. Please finish any open seeds you may have by <b>8PM EDT on May 15</b> to avoid losing your notes.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => cancelUpdate()}>OK</Button>
                            </DialogActions>
                        </Dialog>
                        <EntranceMenu
                            anchorLocation={entranceMenuOpen}
                            handleClose={handleEntranceMenuClose}
                            handleLink={linkEntrance}
                            entrancePool={graphEntrancePool}
                            sourceEntrance={graphEntranceToLink}
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
                            graphRefreshCounter={graphRefreshCounter}
                            cycleGraphSetting={cycleGraphSetting}
                            handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                            graphSettingsOptions={graphSettingsOptions}
                            graphSettingsLayout={graphSettingsLayout}
                            trackerSettings={trackerSettings}
                            setTrackerSettings={setTrackerSettings}
                        />
                        <div
                            className={trackerSettings.expand_sidebar ? "areaPaper areaPaperShift" : "areaPaper"}
                        >
                            <div className="drawerHeader"></div>
                            <div className='worldInfo'>
                                <ResponsiveMasonry columnsCountBreakPoints={masonryBreakpoints}>
                                <Masonry gutter="20px">
                                {
                                    graph.worlds[trackerSettings.player_number].region_groups.filter(r => r.page === trackerSettings.region_page && r.viewable).sort((a, b) => a.alias.localeCompare(b.alias)).map((region, regionIndex) => {
                                        return (
                                            <GameArea
                                                region={region}
                                                playerNum={trackerSettings.player_number}
                                                collapsedRegions={collapsedRegions}
                                                entrances={region.exits}
                                                locations={region.locations}
                                                currentPage={currentPage}
                                                collapseSwitch={toggleCollapse}
                                                reverseCollapseSwitch={reverseCollapseHandler}
                                                setRef={setRef}
                                                handleLink={linkEntrance}
                                                handleUnLink={unLinkEntrance}
                                                handleCheck={checkLocation}
                                                handleUnCheck={unCheckLocation}
                                                handleContextMenu={contextMenuHandler}
                                                handleShopContextMenu={shopContextMenuHandler}
                                                handleEntranceMenuOpen={handleEntranceMenuOpen}
                                                handleDungeonTravel={handleDungeonTravel}
                                                toggleWalletTiers={toggleWalletTiers}
                                                updateShopPrice={updateShopPrice}
                                                showShops={true}
                                                showShopInput={true}
                                                showShopRupee={true}
                                                showUnshuffledEntrances={true}
                                                key={regionIndex}
                                                refreshCounter={graphRefreshCounter}
                                                searchTerm={searchTerm}
                                            />
                                        )
                                    })
                                }
                                </Masonry>
                                </ResponsiveMasonry>
                            </div>
                        </div>
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