import React, { useEffect, useState, useRef, useMemo, ChangeEvent, MouseEventHandler, MouseEvent } from 'react';
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
import TrackerUpdateDialog from './TrackerUpdateDialog';
import TrackerResetDialog from './TrackerResetDialog';

import {
    tracker_setting_type,
    region_visibility_values,
    tracker_settings_defs,
    TrackerSettingsCurrent,
    // tracker_settings_v1, // add specific versions if format ever changes for the upgrade function
} from '@/data/tracker_settings';
import { location_item_menu_layout, shop_item_menu_layout } from '@/data/location_item_menu_layout';

import { WorldGraphFactory, ExternalFileCacheFactory, ExternalFileCache, ExternalFileCacheList, GraphEntrance, GraphRegion, GraphHintGoal, GraphPlugin } from '@mracsys/randomizer-graph-tool';

import '@/styles/tracker.css';
import '@/styles/themes/light.css';
import '@/styles/themes/dark.css';
import { buildExitEntranceName, buildExitName } from './UnknownEntrance';
import { location_item_menu_layout_vertical } from '@/data/location_item_menu_layout_vertical';

export interface SavedTrackerState {
    SaveName: string,
    GraphState: string,
    PlayerNumber: number,
    Branch: string,
    RaceMode: boolean,
    SimMode: boolean,
    RegionPage: string,
    RegionVisibility: string,
    RegionsCollapsed: CollapsedRegions,
    VisitedSimRegions: string[],
    PeekedSimLocations: string[],
    Created: number,
    Modified: number,
}

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

type StateRef = {
    graphInitialized: boolean,
    showTimer: boolean,
    playerNumber: number,
    graph: GraphPlugin,
}

const useLocalFiles = true;

// Changing the version will completely reset user preferences.
// Only touch this if absolutely necessary.
// Prefer in-place upgrades to settings in localstorage.
const trackerVersion = '1.0.0';

const lightNormalMode = '#546E7A';
const lightRaceMode = '#39693b';
const darkNormalMode = '#37474F';
const darkRaceMode = '#2d542f';

const Tracker = (_props: {}) => {
    const [userSettingsLoaded, setUserSettingsLoaded] = useState<boolean>(false);
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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [cachedRaceMode, setCachedRaceMode] = useState<boolean | null>(null);
    const [importSimMode, setImportSimMode] = useState<boolean>(false);
    const [lastLocationName, setLastLocationName] = useState<string[]>([]);
    const scroller = useRef<ScrollerRef>({});
    const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const listRef = useRef<string[]>([]);

    // user settings panel
    const [savedSettingsVersion, setSavedSettingsVersion] = useState<number>(1);
    const [graphVersion, setGraphVersion] = useState<string>('8.3.0 Release');
    const [playerNumber, setPlayerNumber] = useState<number>(0);
    const [settingIcons, setSettingIcons] = useState<boolean>(true);
    const [regionPage, setRegionPage] = useState<string>('Overworld');
    const [oneRegionPerPage, setOneRegionPerPage] = useState<boolean>(false);
    const [expandSidebar, setExpandSidebar] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showAgeLogic, setShowAgeLogic] = useState<boolean>(false);
    const [raceMode, setRaceMode] = useState<boolean>(true);
    const [regionVisibility, setRegionVisibility] = useState<string>('Reachable with All Tricks');
    const [showUnshuffledEntrances, setShowUnshuffledEntrances] = useState<boolean>(true);
    const [showUnshuffledLocations, setShowUnshuffledLocations] = useState<string[]>([]);
    const [showHints, setShowHints] = useState<boolean>(true);
    const [showLocations, setShowLocations] = useState<string>('Yes');
    const [showPriceTracking, setShowPriceTracking] = useState<string>('Both');
    const [showTimer, setShowTimer] = useState<boolean>(false);
    const [showCheckCounter, setShowCheckCounter] = useState<boolean>(true);

    // other settings that need to be persistent across sessions
    const [collapsedRegions, setCollapsedRegions] = useState<CollapsedRegions>({});
    const [visitedSimRegions, setVisitedSimRegions] = useState<Set<string>>(new Set());
    const [peekedSimLocations, setPeekedSimLocations] = useState<Set<string>>(new Set());
    const [lastRegionName, setLastRegionName] = useState<string>('');
    const [lastEntranceName, setLastEntranceName] = useState<string>('');
    const [currentGraphPreset, setCurrentGraphPreset] = useState<string>('Random Settings League');

    // safe defaults for 1080p fullscreen
    const [isNotMobile, setIsNotMobile] = useState<boolean>(false);
    const [isWide, setIsWide] = useState<boolean>(true);
    const [isTall, setIsTall] = useState<boolean>(false);

    // Graph state management to trigger rerender on memo change.
    // Required as graph updates are not pure, so can't be in React state.
    const [_fileCache, setFileCache] = useState<ExternalFileCache>({files: {}, subfolder: ''});
    const [graphRefreshCounter, setGraphRefreshCounter] = useState<number>(0);
    const [graphImportFile, setGraphImportFile] = useState<string>('');
    const [graphPresets, setGraphPresets] = useState<string[]>([]);

    const setTrackerPreferences = (graphGlobal: GraphPlugin) => {
        if (graphGlobal.initialized) {
            let graphSettings = graphGlobal.get_settings_options();
            graphGlobal.change_setting(graphGlobal.worlds[playerNumber], graphSettings['graphplugin_world_search_mode'], raceMode ? 'starting_items' : 'collected');
            graphGlobal.change_setting(graphGlobal.worlds[playerNumber], graphSettings['graphplugin_region_visibility_mode'], region_visibility_values[regionVisibility]);
            graphGlobal.change_setting(graphGlobal.worlds[playerNumber], graphSettings['graphplugin_viewable_unshuffled_items'], [...showUnshuffledLocations]);
        }
    }

    // Keep select state values available to event listeners via ref
    const stateRef = useRef<StateRef>({
        graphInitialized: graphInitialized,
        showTimer: showTimer,
        playerNumber: playerNumber,
        graph: WorldGraphFactory('empty'),
    });

    let graph = useMemo(() => {
        let clientGraphInitialStateInit = localStorage.getItem('CurrentGraphState');
        let graphInitialStateInit = '{}';
        let loadingState = false;
        if (clientGraphInitialStateInit !== null) {
            graphInitialStateInit = clientGraphInitialStateInit;
            loadingState = true;
        }
        let savedState = JSON.parse(graphInitialStateInit);
        if (Object.keys(savedState).includes(':version')) {
            // This function initially runs before the saved graphVersion is retrieved
            // from localstorage. It runs again after the file cache and version are
            // fully loaded. Until then, don't inadvertently throw out user graph state.
            if (userSettingsLoaded && savedState[':version'] !== graphVersion) {
                console.log('Graph version mismatch! Resetting saved graph state');
                savedState = {};
                loadingState = false;
            }
        } else if (graphInitialStateInit === '{}' && userSettingsLoaded) {
            // If the user does not interact at all with the tracker on first run,
            // there is no state to retrieve. The user can swap game versions which
            // would rerun this memo and potentially ignore the current preset,
            // resetting all tracker settings to upstream default settings, which should
            // never happen unless explicitly requested.
            loadingState = false;
        }
        let graphGlobal = WorldGraphFactory('ootr', savedState, graphVersion, _fileCache);
        if (!loadingState) {
            console.log('No saved state found, loading default preset');
            let activePresets = graphGlobal.get_settings_presets();
            // During initial loading, presets aren't available yet
            if (activePresets.length > 0) {
                let loadPreset = currentGraphPreset;
                if (!activePresets.includes(loadPreset)) {
                    // This preset is created by the graph library and guaranteed to exist for every version.
                    loadPreset = 'Random Settings League';
                }
                graphGlobal.load_settings_preset(loadPreset);
                if (loadPreset !== currentGraphPreset) {
                    setCurrentGraphPreset(loadPreset);
                }
            }
        }
        setTrackerPreferences(graphGlobal);
        stateRef.current.graph = graphGlobal;
        return graphGlobal;
    }, [_fileCache, graphVersion, userSettingsLoaded]);

    const handleResize = () => {
        if (stateRef.current.graphInitialized && stateRef.current.graph.worlds.length > 0) {
            let settings = stateRef.current.graph.worlds[stateRef.current.playerNumber].settings;
            let adult_trade = settings.adult_trade_shuffle && (Array.isArray(settings.adult_trade_start) && settings.adult_trade_start.length > 0);
            let child_trade = Array.isArray(settings.shuffle_child_trade) && settings.shuffle_child_trade.length > 0;
            let boss_souls = !!settings.shuffle_enemy_spawns && typeof settings.shuffle_enemy_spawns === 'string' && ['all', 'bosses'].includes(settings.shuffle_enemy_spawns);
            let enemy_souls = !!settings.shuffle_enemy_spawns && settings.shuffle_enemy_spawns === 'all';
            let regional_souls = !!settings.shuffle_enemy_spawns && settings.shuffle_enemy_spawns === 'regional';

            let tabsBreakPoint = 64  // top bar height
                            + 624    // base item tracker height (13 rows * 48px)
                            + 300    // minimum settings panel height
                            + 58     // tab list height
                            + (child_trade ? 48 : 0)
                            + (adult_trade ? 48 : 0)
                            + (boss_souls ? 48 : 0)
                            + (enemy_souls ? 192 : 0)
                            + (regional_souls ? 144 : 0)
                            + (stateRef.current.showTimer ? 82 : 0);
            let viewportIsTall = window.matchMedia(`(min-height: ${tabsBreakPoint}px)`).matches;
            
            setIsTall(viewportIsTall);
        }
        // item panel expands vertically significantly for mobile screens
        // less than 480px, assume no vertical room rather than recalculate
        // the vertical breakpoint
        let viewportIsMobile = window.matchMedia(`(min-width: 481px)`).matches; // JS is off-by-one compared to same CSS rule
        let viewportIsWide = window.matchMedia(`(min-width: 510px)`).matches;
        setIsNotMobile(viewportIsMobile);
        setIsWide(viewportIsWide);
    };

    const handleThemeChange = (e: MediaQueryListEvent) => {
        setDarkMode(e.matches);
    }

    // keep select state values available to event listeners via ref
    useEffect(() => {
        stateRef.current = {
            graphInitialized: graphInitialized,
            showTimer: showTimer,
            playerNumber: playerNumber,
            graph: graph,
        }
        handleResize();
    }, [graphInitialized, showTimer, playerNumber])

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

        let clientTrackerSettingsVersion = localStorage.getItem('SavedSettingsVersion');
        let clientGraphVersion = localStorage.getItem('GraphVersion');
        let clientPlayerNumber = localStorage.getItem('PlayerNumber');
        let clientSettingIcons = localStorage.getItem('SettingIcons');
        let clientRegionPage = localStorage.getItem('RegionPage');
        let clientOneRegionPerPage = localStorage.getItem('OneRegionPerPage');
        let clientExpandSidebar = localStorage.getItem('ExpandSidebar');
        let clientDarkMode = localStorage.getItem('DarkMode');
        let clientShowAgeLogic = localStorage.getItem('ShowAgeLogic');
        let clientRaceMode = localStorage.getItem('RaceMode');
        let clientRegionVisibility = localStorage.getItem('RegionVisibility');
        let clientShowUnshuffledEntrances = localStorage.getItem('ShowUnshuffledEntrances');
        let clientShowUnshuffledLocations = localStorage.getItem('ShowUnshuffledLocations');
        let clientShowHints = localStorage.getItem('ShowHints');
        let clientShowLocations = localStorage.getItem('ShowLocations');
        let clientShowPriceTracking = localStorage.getItem('ShowPriceTracking');
        let clientShowTimer = localStorage.getItem('ShowTimer');
        let clientShowCheckCounter = localStorage.getItem('ShowCheckCounter');
        let trackerSettingsVersionInit = clientTrackerSettingsVersion !== null ? JSON.parse(clientTrackerSettingsVersion) : savedSettingsVersion;
        let graphVersionInit = clientGraphVersion !== null ? JSON.parse(clientGraphVersion) : graphVersion;
        let playerNumberInit = clientPlayerNumber !== null ? JSON.parse(clientPlayerNumber) : playerNumber;
        let settingIconsInit = clientSettingIcons !== null ? JSON.parse(clientSettingIcons) : settingIcons;
        let regionPageInit = clientRegionPage !== null ? JSON.parse(clientRegionPage) : regionPage;
        let oneRegionPerPageInit = clientOneRegionPerPage !== null ? JSON.parse(clientOneRegionPerPage) : oneRegionPerPage;
        let expandSidebarInit = clientExpandSidebar !== null ? JSON.parse(clientExpandSidebar) : expandSidebar;
        let darkModeInit = clientDarkMode !== null ? JSON.parse(clientDarkMode) : darkMode;
        let showAgeLogicInit = clientShowAgeLogic !== null ? JSON.parse(clientShowAgeLogic) : showAgeLogic;
        let raceModeInit = clientRaceMode !== null ? JSON.parse(clientRaceMode) : raceMode;
        let regionVisibilityInit = clientRegionVisibility !== null ? JSON.parse(clientRegionVisibility) : regionVisibility;
        let showUnshuffledEntrancesInit = clientShowUnshuffledEntrances !== null ? JSON.parse(clientShowUnshuffledEntrances) : showUnshuffledEntrances;
        let showUnshuffledLocationsInit = clientShowUnshuffledLocations !== null ? JSON.parse(clientShowUnshuffledLocations) : showUnshuffledLocations;
        let showHintsInit = clientShowHints !== null ? JSON.parse(clientShowHints) : showHints;
        let showLocationsInit = clientShowLocations !== null ? JSON.parse(clientShowLocations) : showLocations;
        let showPriceTrackingInit = clientShowPriceTracking !== null ? JSON.parse(clientShowPriceTracking) : showPriceTracking;
        let showTimerInit = clientShowTimer !== null ? JSON.parse(clientShowTimer) : showTimer;
        let showCheckCounterInit = clientShowCheckCounter !== null ? JSON.parse(clientShowCheckCounter) : showCheckCounter;

        if (trackerSettingsVersionInit !== savedSettingsVersion) {
            // handle tracker settings upgrades
        }

        if (clientDarkMode === null) {
            // Override default dark mode setting based on browser/OS theme
            darkModeInit = window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        // Shouldn't be possible, but just in case
        if (graphVersionInit === '') {
            graphVersionInit = graphVersion
        }
        let twoColumnFormat = window.matchMedia(`(min-width: 601px)`).matches; // JS is off-by-one compared to same CSS rule
        if (!twoColumnFormat) {
            // Show areas by default on first load if viewport isn't wide enough for both
            // the sidebar and the area cards
            expandSidebarInit = false;
        }

        let clientCollapsedRegions = localStorage.getItem('CollapsedRegions');
        let collapsedRegionsInit: CollapsedRegions = !!(clientCollapsedRegions) ? JSON.parse(clientCollapsedRegions) : {};

        let clientGraphInitialStateInit = localStorage.getItem('CurrentGraphState');
        let graphInitialStateInit = !!(clientGraphInitialStateInit) ? clientGraphInitialStateInit : '{}';
        let savedState = JSON.parse(graphInitialStateInit);
        if (Object.keys(savedState).includes(':version')) {
            graphVersionInit = savedState[':version'];
        }
        // Don't allow race mode to be bypassed through localstorage manipulation
        if (savedState.settings?.graphplugin_world_search_mode === 'starting_items') {
            raceModeInit = true;
        }
        let simModeInit = false;
        if (savedState.settings?.graphplugin_simulator_mode === true) {
            simModeInit = true;
        }
        // Settings toggle replaces theme classes, add initial one here
        if (darkModeInit) {
            document.body.classList.add('dark');
            document.querySelector("meta[name=theme-color]")?.setAttribute('content', raceModeInit ? darkRaceMode : darkNormalMode);
        } else {
            document.body.classList.add('light');
            document.querySelector("meta[name=theme-color]")?.setAttribute('content', raceModeInit ? lightRaceMode : lightNormalMode);
        }

        let clientVisitedRegions = localStorage.getItem('SimModeVisitedRegions');
        let visitedRegionsInit = !!clientVisitedRegions ? new Set<string>(JSON.parse(clientVisitedRegions)) : new Set<string>();
        let clientLastEntranceName = localStorage.getItem('SimModeLastEntranceName');
        let lastEntranceNameInit = !!clientLastEntranceName ? clientLastEntranceName : '';
        let clientLastRegionName = localStorage.getItem('SimModeLastRegionName');
        let lastRegionNameInit = !!clientLastRegionName ? clientLastRegionName : '';
        let clientPeekedLocations = localStorage.getItem('SimModePeekedLocations');
        let peekedLocationsInit = !!clientPeekedLocations ? new Set<string>(JSON.parse(clientPeekedLocations)) : new Set<string>();
        let clientCurrentPreset = localStorage.getItem('CurrentGraphPreset');
        let currentPresetInit = !!clientCurrentPreset ? clientCurrentPreset : 'Random Settings League';

        setCollapsedRegions(collapsedRegionsInit);
        setVisitedSimRegions(visitedRegionsInit);
        setLastEntranceName(lastEntranceNameInit);
        setLastRegionName(lastRegionNameInit);
        setPeekedSimLocations(peekedLocationsInit);
        setCurrentGraphPreset(currentPresetInit);
        setImportSimMode(simModeInit);

        setSavedSettingsVersion(trackerSettingsVersionInit);
        setGraphVersion(graphVersionInit);
        setPlayerNumber(playerNumberInit);
        setSettingIcons(settingIconsInit);
        setRegionPage(regionPageInit);
        setOneRegionPerPage(oneRegionPerPageInit);
        setExpandSidebar(expandSidebarInit);
        setDarkMode(darkModeInit);
        setShowAgeLogic(showAgeLogicInit);
        setRaceMode(raceModeInit);
        setRegionVisibility(regionVisibilityInit);
        setShowUnshuffledEntrances(showUnshuffledEntrancesInit);
        setShowUnshuffledLocations(showUnshuffledLocationsInit);
        setShowHints(showHintsInit);
        setShowLocations(showLocationsInit);
        setShowPriceTracking(showPriceTrackingInit);
        setShowTimer(showTimerInit);
        setShowCheckCounter(showCheckCounterInit);

        setUserSettingsLoaded(true);

        window.addEventListener('resize', handleResize);
        screen.orientation.addEventListener('change', handleResize);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', handleThemeChange);

        return () => {
            // clear pending timeouts on unmount
            if (timerRef.current !== null) { timerRef.current.forEach(t => clearTimeout(t)) }
        };
    }, []);

    // hooks to keep state saved in localstorage
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('SavedSettingsVersion', JSON.stringify(savedSettingsVersion));
    }, [savedSettingsVersion]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('GraphVersion', JSON.stringify(graphVersion));
    }, [graphVersion]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('PlayerNumber', JSON.stringify(playerNumber));
    }, [playerNumber]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('SettingIcons', JSON.stringify(settingIcons));
    }, [settingIcons]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('RegionPage', JSON.stringify(regionPage));
    }, [regionPage]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('OneRegionPerPage', JSON.stringify(oneRegionPerPage));
    }, [oneRegionPerPage]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ExpandSidebar', JSON.stringify(expandSidebar));
    }, [expandSidebar]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('DarkMode', JSON.stringify(darkMode));
    }, [darkMode]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowAgeLogic', JSON.stringify(showAgeLogic));
    }, [showAgeLogic]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('RaceMode', JSON.stringify(raceMode));
    }, [raceMode]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('RegionVisibility', JSON.stringify(regionVisibility));
    }, [regionVisibility]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowUnshuffledEntrances', JSON.stringify(showUnshuffledEntrances));
    }, [showUnshuffledEntrances]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowUnshuffledLocations', JSON.stringify(showUnshuffledLocations));
    }, [showUnshuffledLocations]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowHints', JSON.stringify(showHints));
    }, [showHints]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowLocations', JSON.stringify(showLocations));
    }, [showLocations]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowPriceTracking', JSON.stringify(showPriceTracking));
    }, [showPriceTracking]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowTimer', JSON.stringify(showTimer));
    }, [showTimer]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('ShowCheckCounter', JSON.stringify(showCheckCounter));
    }, [showCheckCounter]);
    // This causes a warning from React when starting new seeds, resetting the collapsed region list:
    //      Warning: The final argument passed to useEffect changed size between renders.
    //      The order and size of this array must remain constant.
    //      
    //      Previous: [none, none, some, some]
    //      Incoming: [] Error:
    //useEffect(() => {
    //    if (trackerInitialized) localStorage.setItem('CollapsedRegions', JSON.stringify(collapsedRegions));
    //}, [...Object.values(collapsedRegions)]);
    const updateAndSaveCollapsedRegions = (newCollapsedRegions: CollapsedRegions): void => {
        setCollapsedRegions(newCollapsedRegions);
        if (trackerInitialized) localStorage.setItem('CollapsedRegions', JSON.stringify(newCollapsedRegions));
    };
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('SimModeVisitedRegions', JSON.stringify(Array.from(visitedSimRegions.values())));
    }, [visitedSimRegions.size]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('SimModePeekedLocations', JSON.stringify(Array.from(peekedSimLocations.values())));
    }, [peekedSimLocations.size]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('SimModeLastEntranceName', lastEntranceName);
    }, [lastEntranceName]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('SimModeLastRegionName', lastRegionName);
    }, [lastRegionName]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('CurrentGraphPreset', currentGraphPreset);
    }, [currentGraphPreset]);

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
                let graphFileCache: ExternalFileCache
                let filesDownloaded = false;
                let fileList = ExternalFileCacheList('ootr', graphVersion);
                while (!filesDownloaded) {
                    if (useLocalFiles) {
                        graphFileCache = await ExternalFileCacheFactory('ootr', graphVersion, { local_url: '/' });
                        filesDownloaded = true;
                    } else {
                        graphFileCache = await ExternalFileCacheFactory('ootr', graphVersion, {});
                        filesDownloaded = true;
                    }
                    for (let f of fileList) {
                        if (graphFileCache.files[f] === undefined) {
                            filesDownloaded = false;
                            console.log(`Failed to download external file ${f}`);
                        }
                    }
                    if (!ignore && filesDownloaded) {
                        setFileCache(graphFileCache);
                    }
                }
            }
            if (graph.initialized && !ignore && !graphInitialized) {
                setGraphPresets(graph.get_settings_presets());
                setTrackerPreferences(graph);
                setGraphInitialized(true);
                // initial run for component mount
                handleResize();
            }
        }
        getGraph();
        
        return () => { ignore = true; };
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.replace('light', 'dark');
            document.querySelector("meta[name=theme-color]")?.setAttribute('content', raceMode ? darkRaceMode : darkNormalMode);
        } else {
            document.body.classList.replace('dark', 'light');
            document.querySelector("meta[name=theme-color]")?.setAttribute('content', raceMode ? lightRaceMode : lightNormalMode);
        }
    }, [darkMode, raceMode]);

    useEffect(() => {
        if (graphInitialized && !graphImportFile) {
            console.log('[Import] No plando specified, refreshing current graph');
            refreshSearch();
            setTrackerInitialized(true);
        }
        if (graphInitialized && graphImportFile) {
            console.log('[Import] Importing plando');
            let importState = JSON.parse(graphImportFile);
            if (importSimMode) {
                console.log('[Import] Updating plando to enable sim mode');
                importState['settings']['graphplugin_simulator_mode'] = true;
            } else {
                console.log('[Import] Not changing sim mode setting in plando');
            }
            graph.import(importState);
            setTrackerPreferences(graph);
            refreshSearch();
            setLastEntranceName('');
            setLastRegionName('');
            setTrackerInitialized(true);
            setGraphImportFile('');
            setVisitedSimRegions(new Set());
            setPeekedSimLocations(new Set());
        }
    }, [graphImportFile, graphInitialized]);

    useEffect(() => {
        if (trackerInitialized) {
            if (importSimMode) {
                console.log('[Simulator] Enabling sim mode');
                setRegionPage('Warps');
                setOneRegionPerPage(true);
                let spawn = graph.get_starting_region_for_world(graph.worlds[playerNumber]);
                if (!!spawn) {
                    let [spawn_region, spawn_entrance] = spawn;
                    if (!!spawn_region) {
                        checkEntrance(spawn_entrance.name, false);
                        handleDungeonTravel(spawn_entrance.target_group, spawn_entrance, false);
                    } else {
                        setLastEntranceName('');
                        setLastRegionName('Warps');
                    }
                } else {
                    setLastEntranceName('');
                    setLastRegionName('Warps');
                }
            } else {
                console.log('[Simulator] Disabling sim mode');
                setRegionPage('Overworld');
                setOneRegionPerPage(false);
                setLastEntranceName('');
                setLastRegionName('Overworld');
            }
        }
    }, [importSimMode, trackerInitialized]);

    useEffect(() => {
        if (lastLocationName.length === 0) {
            timerRef.current = [];
        }
    }, [lastLocationName]);

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

    const resetState = (resetToPreset: boolean = true): void => {
        // reset graph state by re-importing only the settings
        let simMode = graph.worlds[playerNumber].settings['graphplugin_simulator_mode'] as boolean;
        if (!resetToPreset) {
            // Need to make a copy of the export to prevent the plando
            // sharing the same object as the internal world settings
            // during import, which would otherwise reset plando settings
            // to their defaults.
            let plando = JSON.parse(JSON.stringify(graph.export(simMode, !simMode)));
            // manually drop checked keys so that we can maintain location/entrance/hint fill
            if (simMode) {
                delete plando[':checked'];
                delete plando[':checked_entrances'];
                setRegionPage('Warps');
                setOneRegionPerPage(true);
            } else {
                setRegionPage('Overworld');
                setOneRegionPerPage(false);
            }
            graph.import(plando);
        } else {
            graph.load_settings_preset(currentGraphPreset);
        }
        setTrackerPreferences(graph);
        refreshSearch();
        updateAndSaveCollapsedRegions({});
        setAlertReset(false);
        setVisitedSimRegions(new Set());
        setPeekedSimLocations(new Set());
        setLastEntranceName('');
        setLastRegionName('');
    }

    const refreshSearch = () => {
        graph.collect_locations();
        // number change triggers rerender after graph memo mutation
        graphRefreshCounter > 0 ? setGraphRefreshCounter(graphRefreshCounter-1) : setGraphRefreshCounter(graphRefreshCounter+1);
        localStorage.setItem('CurrentGraphState', JSON.stringify(graph.export(true)));
    }

    const getSavedGraphState = (saved_name: string): SavedTrackerState | null => {
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

    const getSavedGraphStates = (): {[savedName: string]: SavedTrackerState} => {
        let clientSavedGraphStates = localStorage.getItem('SavedGraphStates');
        let savedStates: {[savedName: string]: SavedTrackerState} = {};
        if (!!clientSavedGraphStates) {
            savedStates = JSON.parse(clientSavedGraphStates);
        }
        return savedStates;
    }

    const deleteSavedGraphState = (savedName: string) => {
        let savedGraphStates = getSavedGraphStates();
        if (Object.keys(savedGraphStates).includes(savedName)) {
            delete savedGraphStates[savedName];
            localStorage.setItem('SavedGraphStates', JSON.stringify(savedGraphStates));
        }
    }

    const loadSavedGraphState = (savedName: string) => {
        let savedState = getSavedGraphState(savedName);
        if (savedState !== null) {
            if (savedState.Branch !== graphVersion) {
                setGraphVersion(savedState.Branch);
            }
            setImportSimMode(savedState.SimMode);
            updateAndSaveCollapsedRegions(savedState.RegionsCollapsed);
            setVisitedSimRegions(new Set(savedState.VisitedSimRegions));
            setPeekedSimLocations(new Set(savedState.PeekedSimLocations));
            setPlayerNumber(savedState.PlayerNumber);
            setRaceMode(savedState.RaceMode);
            setRegionPage(savedState.RegionPage);
            setRegionVisibility(savedState.RegionVisibility);
            setupImport(savedState.GraphState);
        } else {
            console.log(`Problem loading saved state ${savedName}: state does not exist.`)
        }
    }

    const saveGraphState = (savedName: string) => {
        let savedGraphStates = getSavedGraphStates();
        let graphState = JSON.stringify(graph.export(true));
        let createdDate = Date.now();
        if (Object.keys(savedGraphStates).includes(savedName)) {
            createdDate = savedGraphStates[savedName].Created;
        }
        let savedState: SavedTrackerState = {
            SaveName: savedName,
            GraphState: graphState,
            PlayerNumber: playerNumber,
            Branch: graphVersion,
            RaceMode: raceMode,
            SimMode: graph.worlds[playerNumber].settings['graphplugin_simulator_mode'] as boolean,
            RegionPage: regionPage,
            RegionVisibility: regionVisibility,
            RegionsCollapsed: collapsedRegions,
            VisitedSimRegions: Array.from(visitedSimRegions),
            PeekedSimLocations: Array.from(peekedSimLocations),
            Created: createdDate,
            Modified: Date.now(),
        }
        savedGraphStates[savedName] = savedState;
        localStorage.setItem('SavedGraphStates', JSON.stringify(savedGraphStates));
    }

    const loadGraphVersion = (version: string, blankState: boolean = true) => {
        graph.initialized = false;
        setFileCache({files: {}, subfolder: ''});
        setGraphInitialized(false);
        setGraphVersion(version);
        changeSetting({target: { name: 'game_version', value: version}});
        if (blankState) {
            localStorage.setItem('CurrentGraphState', '{}');
        }
    }

    const loadGraphPreset = (presetName: string) => {
        graph.load_settings_preset(presetName);
        refreshSearch();
        setCurrentGraphPreset(presetName);
        setRegionPage('Overworld');
        setOneRegionPerPage(false);
        updateAndSaveCollapsedRegions({});
        setVisitedSimRegions(new Set());
        setPeekedSimLocations(new Set());
        setLastEntranceName('');
        setLastRegionName('');
    }

    const importGraphState = (inputEvent: ChangeEvent<HTMLInputElement>) => {
        if (!inputEvent.target.files) return;
        let file = inputEvent.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target?.result;
            if (!!content && typeof(content) === 'string') {
                setImportSimMode(false);
                updateAndSaveCollapsedRegions({});
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
                updateAndSaveCollapsedRegions({});
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
        // handle Fenhl's riir variant
        if (newVersion.split(' ').length > 2) {
            newVersion = newVersion.split(' ')[0] + ' ' + newVersion.split(' ')[1];
            if (Object.keys(plando).includes(':version')) {
                plando[':version'] = newVersion;
            }
        }
        let supportedVersions = graph.get_game_versions(true);
        if (supportedVersions.versions.filter(v => v.version === newVersion).length === 0) {
            alert(`Unsupported game version ${newVersion}`);
            setTrackerInitialized(true);
        } else {
            if (graphVersion !== newVersion) {
                localStorage.setItem('CurrentGraphState', '{}');
                loadGraphVersion(newVersion, false);
            }
            setGraphImportFile(content);
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
        switch (setting.target.name) {
            case 'game_version':
                setGraphVersion(setting.target.value as string);
                break;
            case 'player_number':
                setPlayerNumber(setting.target.value as number);
                break;
            case 'setting_icons':
                setSettingIcons(setting.target.value as boolean);
                break;
            case 'region_page':
                setRegionPage(setting.target.value as string);
                setLastEntranceName('');
                setLastRegionName('');
                break;
            case 'one_region_per_page':
                setOneRegionPerPage(setting.target.value as boolean);
                break;
            case 'expand_sidebar':
                setExpandSidebar(setting.target.value as boolean);
                break;
            case 'dark_mode':
                setDarkMode(setting.target.value as boolean);
                break;
            case 'show_age_logic':
                setShowAgeLogic(setting.target.value as boolean);
                break;
            case 'race_mode':
                setRaceMode(setting.target.value as boolean);
                break;
            case 'region_visibility':
                setRegionVisibility(setting.target.value as string);
                break;
            case 'show_unshuffled_entrances':
                setShowUnshuffledEntrances(setting.target.value as boolean);
                break;
            case 'show_unshuffled_locations':
                setShowUnshuffledLocations([...(setting.target.value as string[])]);
                break;
            case 'show_hints':
                setShowHints(setting.target.value as boolean);
                break;
            case 'show_locations':
                setShowLocations(setting.target.value as string);
                break;
            case 'shop_price_tracking':
                setShowPriceTracking(setting.target.value as string);
                break;
            case 'show_timer':
                setShowTimer(setting.target.value as boolean);
                break;
            case 'show_check_counter':
                setShowCheckCounter(setting.target.value as boolean);
                break;
        }
        console.log(`[Setting] ${setting.target.name} changed to ${setting.target.value}`);
    }

    const settingChanged = (setting: TrackerSettingChangeEvent): boolean => {
        switch (setting.target.name) {
            case 'game_version':
                return graphVersion !== setting.target.value;
                break;
            case 'player_number':
                return playerNumber !== setting.target.value;
                break;
            case 'setting_icons':
                return settingIcons !== setting.target.value;
                break;
            case 'region_page':
                return regionPage !== setting.target.value;
                break;
            case 'one_region_per_page':
                return oneRegionPerPage !== setting.target.value;
                break;
            case 'expand_sidebar':
                return expandSidebar !== setting.target.value;
                break;
            case 'dark_mode':
                return darkMode !== setting.target.value;
                break;
            case 'show_age_logic':
                return showAgeLogic !== setting.target.value;
                break;
            case 'race_mode':
                return raceMode !== setting.target.value;
                break;
            case 'region_visibility':
                return regionVisibility !== setting.target.value;
                break;
            case 'show_unshuffled_entrances':
                return showUnshuffledEntrances !== setting.target.value;
                break;
            case 'show_unshuffled_locations':
                let shownLocations = [...(setting.target.value as string[])];
                if (shownLocations.length !== showUnshuffledLocations.length) return true;
                for (let l of shownLocations) {
                    if (!(showUnshuffledLocations.includes(l))) return true;
                }
                return false;
                break;
            case 'show_hints':
                return showHints !== setting.target.value;
                break;
            case 'show_locations':
                return showLocations !== setting.target.value;
                break;
            case 'shop_price_tracking':
                return showPriceTracking !== setting.target.value;
                break;
            case 'show_timer':
                return showTimer !== setting.target.value;
                break;
            case 'show_check_counter':
                return showCheckCounter !== setting.target.value;
                break;
        }
        return false;
    }

    const setTrackerSettings = (newTrackerSettings: TrackerSettingsCurrent) => {
        for (let [settingName, settingValue] of Object.entries(newTrackerSettings)) {
            let trackerSetting = {
                target: {
                    name: settingName,
                    value: settingValue,
                }
            };
            if (settingChanged(trackerSetting)) changeSetting(trackerSetting);
        }
    }

    const changeRaceMode = (): void => {
        if (cachedRaceMode !== null) {
            let graphSettings = graph.get_settings_options();
            let newRaceMode = cachedRaceMode ? 'starting_items' : 'collected';
            graph.change_setting(graph.worlds[playerNumber], graphSettings['graphplugin_world_search_mode'], newRaceMode);
            setRaceMode(cachedRaceMode);
            resetState(false);
            setCachedRaceMode(null);
        }
        setAlertReset(false);
        refreshSearch();
    }

    const changeRegionMode = (regionSearchMode: string): void => {
        let graphSettings = graph.get_settings_options();
        graph.change_setting(graph.worlds[playerNumber], graphSettings['graphplugin_region_visibility_mode'], regionSearchMode);
        refreshSearch();
    }

    // default to reverse direction so that right-click/long-touch handler only needs
    // to pass one argument
    const cycleGraphSetting = ({graphSettingName = '', reverseDirection = true}: {graphSettingName?: string, reverseDirection?: boolean} = {}): void => {
        let settingValue = graph.worlds[playerNumber].settings[graphSettingName];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[graphSettingName];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'boolean') {
            graph.change_setting(graph.worlds[playerNumber], graphSetting, !settingValue);
            //graph.worlds[playerNumber].settings[graphSettingName] = !(settingValue);
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
                graph.change_setting(graph.worlds[playerNumber], graphSetting, settingOptions[settingIndex]);
                //graph.worlds[playerNumber].settings[graphSettingName] = settingOptions[settingIndex];
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
                graph.change_setting(graph.worlds[playerNumber], graphSetting, settingValue);
                //graph.worlds[playerNumber].settings[graphSettingName] = settingValue;
            }
        }
        refreshSearch();
        console.log(`[Setting] ${graphSettingName} changed to ${graph.worlds[playerNumber].settings[graphSettingName]}`);
    }

    const cycleGraphMultiselectOption = ({graphSettingName = '', settingOptions = ['']}: {graphSettingName?: string, settingOptions?: string[]} = {}) => {
        let settingValue: string[] = [];
        let settingArray = graph.worlds[playerNumber].settings[graphSettingName];
        if (settingArray !== undefined && settingArray !== null && Array.isArray(settingArray)) {
            settingValue = [...settingArray];
        } else {
            return;
        }
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
            graph.change_setting(graph.worlds[playerNumber], graphSetting, settingValue);
        }
        refreshSearch();
        console.log(`[Setting] ${graphSettingName} changed to ${graph.worlds[playerNumber].settings[graphSettingName]}`);
    }

    const changeGraphStringSetting = (s: ChangeEvent<HTMLSelectElement>): void => {
        const {target: { name, value }} = s;
        let settingValue = graph.worlds[playerNumber].settings[name];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[name];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'string') {
            let settingChoices = graphSettingsOptions[name].choices;
            if (!!settingChoices) {
                if (Object.keys(settingChoices).includes(value)) {
                    graph.change_setting(graph.worlds[playerNumber], graphSetting, value);
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
        let settingValue = graph.worlds[playerNumber].settings[name];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[name];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'boolean') {
            if (typeof checked === 'boolean') {
                graph.change_setting(graph.worlds[playerNumber], graphSetting, checked);
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
        let settingValue = graph.worlds[playerNumber].settings[name];
        let graphSettingsOptions = graph.get_settings_options();
        let graphSetting = graphSettingsOptions[name];
        if (settingValue === undefined || settingValue === null || graphSetting === undefined) return;
        if (typeof settingValue === 'number') {
            if (typeof numValue === 'number') {
                if ((graphSetting.maximum !== undefined && numValue > graphSetting.maximum) || (graphSetting.minimum !== undefined && numValue < graphSetting.minimum)) {
                    console.log(`[Setting] Tried to change numeric setting ${name} to value ${numValue} outside max ${graphSetting.maximum} and min ${graphSetting.minimum}`);
                    return;
                }
                graph.change_setting(graph.worlds[playerNumber], graphSetting, numValue);
            } else {
                console.log(`[Setting] Tried to change numeric setting ${name} to non-numeric value ${numValue}`);
                return;
            }
        }
        refreshSearch();
        console.log('[Setting]', name, 'changed to', numValue);
    }

    const cycleGraphRewardHint = ({itemName = '', forward = true}: {itemName?: string, forward?: boolean} = {}) => {
        graph.cycle_hinted_areas_for_item(itemName, graph.worlds[playerNumber], forward);
        refreshSearch();
        console.log(`[Reward Hint] ${itemName} area changed to ${graph.worlds[playerNumber].fixed_item_area_hints[itemName].hint}`);
    }

    const addStartingItem = (item_name: string, count: number = 1) => {
        let graphItem = graph.get_item(graph.worlds[playerNumber], item_name);
        graph.add_starting_item(graph.worlds[playerNumber], graphItem, count);
        refreshSearch();
        console.log(`[Item] Added ${count} ${item_name} to starting items`);
    }

    const removeStartingItem = (item_name: string, count: number = 1) => {
        let graphItem = graph.get_item(graph.worlds[playerNumber], item_name);
        graph.remove_starting_item(graph.worlds[playerNumber], graphItem, count);
        refreshSearch();
        console.log(`[Item] Removed ${count} ${item_name} from starting items`);
    }

    const replaceStartingItem = (add_item_name: string, remove_item_name: string) => {
        let addGraphItem = graph.get_item(graph.worlds[playerNumber], add_item_name);
        let removeGraphItem = graph.get_item(graph.worlds[playerNumber], remove_item_name);
        graph.replace_starting_item(graph.worlds[playerNumber], addGraphItem, removeGraphItem);
        refreshSearch();
    }

    const toggleCollapse = (area: string): void => {
        let stateCollapsedRegions = Object.assign({}, collapsedRegions);
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
        updateAndSaveCollapsedRegions(stateCollapsedRegions);
    }

    const toggleCollapseReverse = (areaDiv: HTMLDivElement) => {
        let area = areaDiv.innerText;
        let stateCollapsedRegions = Object.assign({}, collapsedRegions);
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
        updateAndSaveCollapsedRegions(stateCollapsedRegions);
    }

    const linkEntrance = (dataLinkFrom: string, dataLinkTo: string): void => {
        let sourceEntrance = graph.worlds[playerNumber].get_entrance(dataLinkFrom);
        let targetEntrance = graph.worlds[playerNumber].get_entrance(dataLinkTo);
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
        let sourceEntrance = graph.worlds[playerNumber].get_entrance(entrance);
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
        let sourceLocation = graph.worlds[playerNumber].get_location(location);
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
        let sourceLocation = graph.worlds[playerNumber].get_location(location);
        if (!!sourceLocation.item) {
            sourceLocation.item.price = parseInt(priceValue);
            graph.set_location_item(sourceLocation, sourceLocation.item, sourceLocation.item.price);
            refreshSearch();
            console.log(sourceLocation.name, '[price]', sourceLocation.price?.toString());
        }
    }

    const clearLocationAnimation = () => {
        let newLocationList = [...listRef.current];
        newLocationList.shift();
        listRef.current.shift();
        setLastLocationName(newLocationList);
    }

    const checkLocation = (location: string): void => {
        console.log(`${location} [Checked]`);
        let sourceLocation = graph.worlds[playerNumber].get_location(location);
        let simMode = graph.worlds[playerNumber].settings['graphplugin_simulator_mode'] as boolean;
        graph.check_location(sourceLocation);
        if ((sourceLocation.is_hint || sourceLocation.item?.name.includes('Compass')) && simMode) {
            graph.unhide_hint(sourceLocation);
        }
        if (simMode) {
            let newLocationList = [...listRef.current, location];
            listRef.current = newLocationList;
            setLastLocationName(newLocationList);
            timerRef.current.push(setTimeout(clearLocationAnimation, 2500));
        }
        refreshSearch();
    }

    const unCheckLocation = (location: string): void => {
        console.log(`${location} [Unchecked]`);
        let sourceLocation = graph.worlds[playerNumber].get_location(location);
        graph.uncheck_location(sourceLocation);
        refreshSearch();
    }

    const checkEntrance = (entrance: string, fromWarp: boolean = false): void => {
        console.log(`${entrance} [Checked]`);
        let sourceEntrance = graph.worlds[playerNumber].get_entrance(entrance);
        graph.check_entrance(sourceEntrance);
        if (fromWarp || (oneRegionPerPage && !tracker_settings_defs.region_page.options?.includes(regionPage))) {
            let reverseLink = !!(sourceEntrance.replaces) ? sourceEntrance.replaces : sourceEntrance;
            handleDungeonTravel(reverseLink.target_group, sourceEntrance);
        }
        refreshSearch();
    }

    const unCheckEntrance = (entrance: string): void => {
        console.log(`${entrance} [Unchecked]`);
        let sourceEntrance = graph.worlds[playerNumber].get_entrance(entrance);
        graph.uncheck_entrance(sourceEntrance);
        refreshSearch();
    }

    const findItem: MouseEventHandler<HTMLDivElement> = (ootItem): void => {
        let originator = ootItem.currentTarget.getAttribute('data-found-in');
        let foundItem = ootItem.currentTarget.getAttribute('data-found-item');
        if (originator === null) throw `Cannot assign item to null location`;
        let sourceLocation = graph.worlds[playerNumber].get_location(originator);
        if (!!(foundItem) || (foundItem !== '' && typeof(foundItem) === 'string')) {
            console.log(originator, "[holds]", foundItem);
            graph.set_location_item(sourceLocation, graph.worlds[playerNumber].get_item(foundItem));
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
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    graph.hint_required_area(hintLocation, ootHint.hintRegion);
                    refreshSearch();
                }
                break;
            case 'path':
                if (ootHint.hintRegion && ootHint.hintPath) {
                    let tempGoal = new GraphHintGoal();
                    tempGoal.item_count = 1;
                    if (Object.keys(pathItems).includes(ootHint.hintPath)) {
                        tempGoal.item = graph.worlds[playerNumber].get_item(pathItems[ootHint.hintPath]);
                    }
                    if (Object.keys(pathLocations).includes(ootHint.hintPath)) {
                        tempGoal.location = graph.worlds[playerNumber].get_location(pathLocations[ootHint.hintPath]);
                    }
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    graph.hint_area_required_for_goal(hintLocation, ootHint.hintRegion, tempGoal);
                    refreshSearch();
                }
                break;
            case 'foolish':
                if (ootHint.hintRegion) {
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    graph.hint_unrequired_area(hintLocation, ootHint.hintRegion);
                    refreshSearch();
                }
                break;
            case 'important_check':
                if (ootHint.hintRegion && ootHint.hintMajorItems !== undefined) {
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    graph.hint_area_num_items(hintLocation, ootHint.hintRegion, ootHint.hintMajorItems);
                    refreshSearch();
                }
                break;
            case 'location':
                if (ootHint.hintLocation && ootHint.hintItem) {
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    let hintedLocation = graph.worlds[playerNumber].get_location(ootHint.hintLocation);
                    let hintedItem = graph.worlds[playerNumber].get_item(ootHint.hintItem);
                    graph.hint_location(hintLocation, hintedLocation, hintedItem);
                    refreshSearch();
                }
                break;
            case 'dual':
                if (ootHint.hintLocation && ootHint.hintItem && ootHint.hintLocation2 && ootHint.hintItem2) {
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    let hintedLocation = graph.worlds[playerNumber].get_location(ootHint.hintLocation);
                    let hintedItem = graph.worlds[playerNumber].get_item(ootHint.hintItem);
                    let hintedLocation2 = graph.worlds[playerNumber].get_location(ootHint.hintLocation2);
                    let hintedItem2 = graph.worlds[playerNumber].get_item(ootHint.hintItem2);
                    graph.hint_dual_locations(hintLocation, hintedLocation, hintedItem, hintedLocation2, hintedItem2);
                    refreshSearch();
                }
                break;
            case 'entrance':
                if (ootHint.hintEntrance && ootHint.hintEntranceTarget) {
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    let hintedExit = graph.worlds[playerNumber].get_entrance(ootHint.hintEntrance);
                    let hintedTarget = graph.worlds[playerNumber].get_entrance(ootHint.hintEntranceTarget);
                    graph.hint_entrance(hintLocation, hintedExit, hintedTarget);
                    refreshSearch();
                }
                break;
            case 'misc':
                if (ootHint.hintRegion && ootHint.hintItem) {
                    let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
                    let hintedItem = graph.worlds[playerNumber].get_item(ootHint.hintItem);
                    graph.hint_item_in_area(hintLocation, ootHint.hintRegion, hintedItem);
                    refreshSearch();
                }
                break;
            default:
                break;
        }
        handleHintMenuClose();
    }

    const clearHint = () => {
        let hintLocation = graph.worlds[playerNumber].get_location(locationToLink);
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

    const handleSimModePeek = (_: HTMLDivElement, dataSource: string | null) => {
        if (dataSource === null) return;
        let sourceLocation = graph.worlds[playerNumber].get_location(dataSource);
        console.log(sourceLocation.name, "[peeked]", sourceLocation.item?.peek);
        let newPeeked = new Set(peekedSimLocations);
        if (newPeeked.has(dataSource)) {
            newPeeked.delete(dataSource);
        } else {
            newPeeked.add(dataSource);
        }
        setPeekedSimLocations(newPeeked);
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

    const handleDungeonTravel = (targetRegion: GraphRegion | null, regionEntrance: GraphEntrance | null = null, fromWarpMenu: boolean = false) => {
        let href = '#';
        let linkedRegion = targetRegion;
        if (!!(linkedRegion) && (linkedRegion.page !== '' || fromWarpMenu)) {
            let warpExit: GraphEntrance | null = null;
            if (fromWarpMenu || (!!regionEntrance && regionEntrance.reverse === null)) {
                while (linkedRegion.page === '') {
                    let foundNewEntrance = false;
                    if (linkedRegion.exits.filter(e => !e.is_warp).length > 1) {
                        if (!!regionEntrance?.source_group) {
                            linkedRegion = regionEntrance?.source_group;
                            setLastEntranceName('');
                            setLastRegionName('');
                            break;
                        } else {
                            console.log(`Could not find source group for warp ${regionEntrance?.name} with target group containing multiple exits`);
                            return;
                        }
                    }
                    for (let i = 0; i < linkedRegion.exits.length; i++) {
                        let replacedExit: GraphEntrance | null = linkedRegion.exits[i].replaces;
                        warpExit = !!(replacedExit) ? replacedExit : linkedRegion.exits[i];
                        if (!(linkedRegion.exits[i].is_warp) && linkedRegion !== warpExit.target_group) {
                            linkedRegion = warpExit.target_group;
                            if (linkedRegion === null) throw `Failed to find top level warp target region for starting region ${targetRegion?.alias}`;
                            foundNewEntrance = true;
                            break;
                        }
                    }
                    if (!foundNewEntrance) throw `Ran out of entrances to search for top level warp target region for starting region ${targetRegion?.alias}`;
                }
            }
            let newPage = '';
            if (oneRegionPerPage) {
                let actualLinkedRegion: GraphRegion | null = null;
                if ((linkedRegion.name !== regionPage && linkedRegion.parent_group === null) || linkedRegion.name === 'Warps') {
                    actualLinkedRegion = linkedRegion;
                }
                if ((linkedRegion.parent_group !== null && linkedRegion.parent_group.name !== regionPage && linkedRegion.name !== 'Warps')) {
                    actualLinkedRegion = linkedRegion.parent_group;
                }
                if (fromWarpMenu && !!targetRegion && !!regionEntrance) {
                    setLastRegionName(buildExitName(regionEntrance));
                } else {
                    setLastRegionName(linkedRegion.name);
                }
                if (!!actualLinkedRegion) {
                    let newRegions = new Set(visitedSimRegions);
                    newRegions.add(actualLinkedRegion.name);
                    setVisitedSimRegions(newRegions);
                    setRegionPage(actualLinkedRegion.name);
                    newPage = actualLinkedRegion.name;
                }
            } else {
                if (linkedRegion.page !== regionPage && regionPage !== 'All') {
                    setRegionPage(linkedRegion.page);
                    setLastRegionName(linkedRegion.page);
                    newPage = linkedRegion.page;
                }
            }
            if (!!regionEntrance) {
                // don't re-scroll if we're linking from within the same region
                if (regionEntrance.source_group?.alias !== linkedRegion.alias) {
                    href = `#${linkedRegion.alias}`;
                }
            } else {
                href = `#${linkedRegion.alias}`;
            }
            if (!!regionEntrance && !tracker_settings_defs.region_page.options?.includes(newPage) && newPage !== 'Warps') {
                if (regionEntrance.is_warp) {
                    let eLink = !!(regionEntrance.replaces) ? regionEntrance.replaces : regionEntrance;
                    let exitedEntrance = '';
                    if (!!eLink.reverse && eLink.reverse.target_group?.page !== '') {
                        exitedEntrance = `from ${eLink.reverse.alias}`;
                    } else if (eLink.reverse === null && !!warpExit?.reverse) {
                        exitedEntrance = `from ${warpExit.reverse.use_target_alias ? warpExit.reverse.target_alias : warpExit.reverse.alias}`;
                    } else if (eLink.reverse === null) {
                        exitedEntrance = `from ${eLink.use_target_alias ? eLink.target_alias : eLink.alias}`;
                    } else if (eLink.reverse.target_group?.page === '') {
                        exitedEntrance = `from ${eLink.reverse.alias}`;
                    }
                    if (!!exitedEntrance) {
                        setLastEntranceName(exitedEntrance);
                    } else {
                        setLastEntranceName('');
                    }
                } else {
                    let exitedEntrance = buildExitEntranceName(regionEntrance);
                    if (!!exitedEntrance) {
                        setLastEntranceName(exitedEntrance);
                    } else if (regionEntrance.reverse === null) {
                        let target = !!regionEntrance.replaces ? regionEntrance.replaces : regionEntrance;
                        setLastEntranceName(`from ${target.use_target_alias ? target.target_alias : target.alias}`);
                    } else {
                        setLastEntranceName('');
                    }
                }
            } else {
                setLastEntranceName('');
            }
        }
        if (href !== '#') {
            setDelayedURL(href);
        }
        setSearchTerm('');
    }

    const isWarpAreaLinked = (entrance: GraphEntrance) => {
        let canReach = true;
        if (entrance.type === 'WarpSong') {
            let itemName = entrance.name.split(' Warp -> ')[0];
            let playerInventory = graph.get_player_inventory_for_world(graph.worlds[playerNumber]);
            if (!(Object.keys(playerInventory).includes(itemName)) || playerInventory.itemName === 0) {
                canReach = false;
            }
        }
        return !!(entrance.connected_region && canReach);
    }

    const toggleAreaView = () => {
        if (regionPage === "Overworld") {
            changeSetting({target: { name: "region_page", value: "Dungeons" }});
        } else {
            changeSetting({target: { name: "region_page", value: "Overworld" }});
        }
    }

    let contextMenuHandler = new ContextMenuHandler(handleItemMenuOpen);
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
        let fullGraphVersion = graph.version;
        let graphSettingsOptions = graph.get_settings_options();
        let graphSettingsLayout = graph.get_settings_layout();
        let graphSettings = graph.worlds[playerNumber].settings;
        let graphCollectedItems = graph.get_collected_items_for_world(graph.worlds[playerNumber]);
        let graphPlayerInventory = graph.get_player_inventory_for_world(graph.worlds[playerNumber]);
        let multiselectSettingChoices = multiselectToUpdate ? graphSettingsOptions[multiselectToUpdate]?.choices : {};
        let graphRegions = graph.worlds[playerNumber].region_groups.sort((a, b) =>
            a.alias.localeCompare(b.alias));
        let viewableRegions: GraphRegion[] = [];
        if (oneRegionPerPage && searchTerm === '') {
            if (tracker_settings_defs.region_page.options?.includes(regionPage)) {
                viewableRegions = graphRegions.filter(r =>
                    r.page === regionPage && r.viewable);
            } else {
                viewableRegions = graphRegions.filter(r =>
                    r.name === regionPage);
            }
        } else {
            let searchPage = searchTerm === '' ? regionPage : 'All';
            viewableRegions = graphRegions.filter(r =>
                (r.page === searchPage || searchPage === 'All') && r.viewable);
        }
        let pages: {[page: string]: GraphRegion[]} = {};
        for (let r of graph.worlds[playerNumber].region_groups) {
            if (Object.keys(pages).includes(r.page)) {
                pages[r.page].push(r);
            } else {
                pages[r.page] = [r];
            }
        }
        let graphEntrances = graph.get_entrances_for_world(graph.worlds[playerNumber]);
        let warpEntrances = graphEntrances.filter(e => e.is_warp);
        let graphFullEntrancePool = graph.get_full_entrance_pool(graph.worlds[playerNumber]);
        let graphFullExitPool = graph.get_full_exit_pool(graph.worlds[playerNumber]);
        let graphEntrancePool = entranceToLink !== '' ? graph.get_entrance_pool(graph.worlds[playerNumber], graph.worlds[playerNumber].get_entrance(entranceToLink)) : {};
        let graphEntranceToLink = entranceToLink !== '' ? graph.worlds[playerNumber].get_entrance(entranceToLink) : null;
        let graphLocations = graph.get_locations_for_world(graph.worlds[playerNumber]);
        let graphLocationCount = graphLocations.filter(l => l.shuffled && !l.is_hint && !l.is_restricted);
        let graphHintLocations = graphLocations.filter(l => l.is_hint && !!l.hint);
        let graphHintRegions = graph.get_hint_regions().sort();
        let graphRewardHints = graph.worlds[playerNumber].fixed_item_area_hints;
        let sourceHintLocationType = locationToLink !== '' ? graph.worlds[playerNumber].get_location(locationToLink).type : 'HintStone';
        let sourceHintLocationText = locationToLink !== '' ? graph.worlds[playerNumber].get_location(locationToLink).hint_text : '';
        sourceHintLocationText = sourceHintLocationText.replaceAll('#', '').replaceAll('^', '\n');
        let simMode = graph.worlds[playerNumber].settings['graphplugin_simulator_mode'] as boolean;
        if (simMode) {
            contextMenuHandler = new ContextMenuHandler(handleSimModePeek);
        }
        let trackerSettings = {
            version: savedSettingsVersion,
            game_version: graphVersion,
            player_number: playerNumber,
            setting_icons: settingIcons,
            region_page: regionPage,
            one_region_per_page: oneRegionPerPage,
            expand_sidebar: expandSidebar,
            dark_mode: darkMode,
            show_age_logic: showAgeLogic,
            race_mode: raceMode,
            region_visibility: regionVisibility,
            show_unshuffled_entrances: showUnshuffledEntrances,
            show_unshuffled_locations: showUnshuffledLocations,
            show_hints: showHints,
            show_locations: showLocations,
            shop_price_tracking: showPriceTracking,
            show_timer: showTimer,
            show_check_counter: showCheckCounter,
        };

        return (
            <React.Fragment>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <div className={`root`}>
                        <TrackerTopBar
                            importGraphState={importGraphState}
                            exportGraphState={exportGraphState}
                            simGraphState={importSimGraphState}
                            loadGraphPreset={loadGraphPreset}
                            graphPresets={graphPresets}
                            currentPreset={currentGraphPreset}
                            graphLocationCount={graphLocationCount}
                            searchTracker={searchTracker}
                            trackerSettings={trackerSettings}
                            setExpandSidebar={setExpandSidebar}
                            setAlertReset={setAlertReset}
                            saveFunction={saveGraphState}
                            loadFunction={loadSavedGraphState}
                            deleteFunction={deleteSavedGraphState}
                            stateListFunction={getSavedGraphStates}
                            lastEntranceName={lastEntranceName}
                            lastRegionName={lastRegionName}
                        />
                        <TrackerDrawer
                            addStartingItem={addStartingItem}
                            removeStartingItem={removeStartingItem}
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
                            graphHintLocations={graphHintLocations}
                            graphEntrances={graphEntrances}
                            graphRegions={graphRegions}
                            cycleGraphSetting={cycleGraphSetting}
                            handleMultiselectMenuOpen={handleMultiselectMenuOpen}
                            graphSettingsOptions={graphSettingsOptions}
                            graphSettingsLayout={graphSettingsLayout}
                            graphVersion={fullGraphVersion}
                            trackerSettings={trackerSettings}
                            setTrackerSettings={setTrackerSettings}
                            setLastEntranceName={setLastEntranceName}
                            setLastRegionName={setLastRegionName}
                            changeGraphStringSetting={changeGraphStringSetting}
                            changeGraphBooleanSetting={changeGraphBooleanSetting}
                            changeGraphNumericSetting={changeGraphNumericSetting}
                            setCachedRaceMode={setCachedRaceMode}
                            setAlertReset={setAlertReset}
                            changeRegionMode={changeRegionMode}
                            changeGraphVersion={loadGraphVersion}
                            supportedGraphVersions={graphSupportedVersions}
                            visitedSimRegions={visitedSimRegions}
                            itemPanelAsTab={!isTall || !isNotMobile}
                            isNotMobile={isNotMobile}
                            simMode={simMode}
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
                            lastLocationName={lastLocationName}
                            lastEntranceName={lastEntranceName}
                            isWarpAreaLinked={isWarpAreaLinked}
                            areaMenuHandler={areaMenuHandler}
                            pages={pages}
                            warps={warpEntrances}
                            peekedLocations={peekedSimLocations}
                        />
                        <EntranceMenu
                            anchorLocation={entranceMenuOpen}
                            handleClose={handleEntranceMenuClose}
                            handleLink={linkEntrance}
                            entrancePool={graphEntrancePool}
                            sourceEntrance={graphEntranceToLink}
                            id="globalEntranceMenu"
                        />
                        {
                            isWide ?
                            <ItemMenu
                                menuLayout={location_item_menu_layout}
                                handleClose={handleItemMenuClose}
                                handleFind={findItem}
                                anchorLocation={itemMenuOpen}
                                sourceLocation={locationToLink}
                                showClearButton={true}
                            /> :
                            <ItemMenu
                                menuLayout={location_item_menu_layout_vertical}
                                handleClose={handleItemMenuClose}
                                handleFind={findItem}
                                anchorLocation={itemMenuOpen}
                                sourceLocation={locationToLink}
                                showClearButton={true}
                            />
                        }
                        <ItemMenu
                            menuLayout={shop_item_menu_layout}
                            handleClose={handleShopItemMenuClose}
                            handleFind={findItem}
                            anchorLocation={shopItemMenuOpen}
                            sourceLocation={locationToLink}
                            showClearButton={true}
                        />
                        <HintMenu
                            handleClose={handleHintMenuClose}
                            handleFind={findHint}
                            clearHint={clearHint}
                            anchorLocation={hintMenuOpen}
                            sourceLocation={locationToLink}
                            sourceLocationType={sourceHintLocationType}
                            sourceLocationHintText={sourceHintLocationText}
                            hintRegions={graphHintRegions}
                            fullEntrancePool={graphFullEntrancePool}
                            fullExitPool={graphFullExitPool}
                            locations={graphLocationCount}
                            isWide={isWide}
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
            <div className='loadingScreen' aria-busy="true" aria-describedby="loadingBar">
                <div className='loadingText'>Loading</div>
                <progress id='loadingBar' className='loadingBar'></progress>
            </div>
        )
    }
}

export default Tracker