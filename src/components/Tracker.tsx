'use client'

import React, { useEffect, useState, useRef, useMemo, ChangeEvent, MouseEventHandler, MouseEvent } from 'react';
//import ls from 'local-storage';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';
import clone from 'lodash/clone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ListItem from '@mui/material/ListItem';
import PublicIcon from '@mui/icons-material/Public';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Drawer } from '@mui/material';
import { Link } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { SelectChangeEvent } from '@mui/material/Select';
import '/public/index.css';
import CssBaseline from '@mui/material/CssBaseline';


import GameSetting from './GameSetting';
import GameArea from './GameArea';
import EntranceMenu from './EntranceMenu';
import ItemMenu from './ItemMenu';
import ShopItemMenu from './ShopItemMenu';
import ContextMenuHandler from './ContextMenuHandler';


import death_mountain_crater from '@/data/locations/death_mountain_crater.json';
import death_mountain_trail from '@/data/locations/death_mountain_trail.json';
import desert_colossus from '@/data/locations/desert_colossus.json';
import gerudo_fortress from '@/data/locations/gerudo_fortress.json';
import gerudo_valley from '@/data/locations/gerudo_valley.json';
import goron_city from '@/data/locations/goron_city.json';
import graveyard from '@/data/locations/graveyard.json';
import haunted_wasteland from '@/data/locations/haunted_wasteland.json';
import hyrule_field from '@/data/locations/hyrule_field.json';
import kakariko_village from '@/data/locations/kakariko_village.json';
import kokiri_forest from '@/data/locations/kokiri_forest.json';
import lake_hylia from '@/data/locations/lake_hylia.json';
import lon_lon_ranch from '@/data/locations/lon_lon_ranch.json';
import lost_woods from '@/data/locations/lost_woods.json';
import market from '@/data/locations/market.json';
import sacred_forest_meadow from '@/data/locations/sacred_forest_meadow.json';
import spawn_points from '@/data/locations/spawn_points.json';
import warp_songs from '@/data/locations/warp_songs.json';
import zora_fountain from '@/data/locations/zora_fountain.json';
import zora_river from '@/data/locations/zora_river.json';
import zoras_domain from '@/data/locations/zoras_domain.json';
import deku_tree from '@/data/locations/deku_tree.json';
import dodongos_cavern from '@/data/locations/dodongos_cavern.json';
import jabu_jabus_belly from '@/data/locations/jabu_jabus_belly.json';
import forest_temple from '@/data/locations/forest_temple.json';
import fire_temple from '@/data/locations/fire_temple.json';
import water_temple from '@/data/locations/water_temple.json';
import shadow_temple from '@/data/locations/shadow_temple.json';
import spirit_temple from '@/data/locations/spirit_temple.json';
import bottom_of_the_well from '@/data/locations/bottom_of_the_well.json';
import ice_cavern from '@/data/locations/ice_cavern.json';
import gerudo_training_ground from '@/data/locations/gerudo_training_ground.json';
import ganons_castle from '@/data/locations/ganons_castle.json';


import devr from '@/data/versions/dev6.0.41r-1.json';
import defaultSettings from '@/data/settings_presets/defaults.json';
import rslS4 from '@/data/settings_presets/rsl-s4.json';
import mixedPoolsTourney from '@/data/settings_presets/mixed-pools-s1.json';
import standardS5 from '@/data/settings_presets/standard-s5.json';
import ddrS1 from '@/data/settings_presets/ddr-s1.json';
import leagueS2 from '@/data/settings_presets/league-s2.json';
import maxChex from '@/data/settings_presets/1175.json';
import mw3 from '@/data/settings_presets/mw3.json';
import OotIcon from './OotIcon';


import { WorldGraphFactory, ExternalFileCacheFactory, ExternalFileCache } from '@mracsys/randomizer-graph-tool';
import plando from '@/data/seed143.json';


export type SettingTypes = string[] | {[s: string]: boolean};
export interface SettingCategory {
    [settingName: string]: SettingTypes,
}
export interface GameSettings {
    [settingCategory: string]: SettingCategory,
}
interface RandoVersionData {
    Settings: GameSettings,
    Locations: {[locationName: string]: string},
}

export type SettingSelectionTypes = string | string[] | boolean;
export interface SelectedSettings {
    [settingName: string]: SettingSelectionTypes
}

interface SettingPreset {
    Settings: SelectedSettings,
}

export interface Entrance {
    area: string,
    reverse: string,
    oneWay: boolean,
    oneWayArea: string,
    connector: string | string[],
    isReverse: boolean,
    alias: string,
    reverseAlias: string,
    tag: string,
    tagRep: boolean,
    tagRules: TagRule[],
    enableTag: boolean,
    type: string,
    lKey: string,
    aLink: string,
    eLink: string,
    userALink: string,
    userELink: string,
    oneWayELink: string,
    userOneWayELink: string,
    shuffled: boolean,
}

export interface EntrancePool {
    [categoryName: string]: string[],
}

export interface Entrances {
    [entranceType: string]: EntrancePool,
}

export interface Location {
    area: string,
    lKey: string,
    alias: string,
    type: string,
    settings: TagRule[],
    visible: boolean,
    check: string,
    foundItem: string,
    merchant: boolean,
    price: number,
    walletTier: number,
    shuffled: boolean,
    shuffleRules: TagRule[],
}

export interface TagRule {
    setting: string,
    value: string,
    required: boolean,
}

export interface Area {
    show: boolean,
    dungeon: boolean,
    collapse: string,
    entrances: {[entranceName: string]: Entrance},
    locations: {[locationName: string]: Location},
}

export interface Areas {
    [areaName: string]: Area,
}

export interface AllAreas {
    areas: Areas,
    entrances: {[entranceName: string]: Entrance},
    locations: {[locationName: string]: Location},
    connectors: {[connectorName: string]: Entrance},
}

export interface AllEntrances {
    oneWayAreas: string[], // Warp Songs and Spawn Points hard coded visibility
    entrances: {
        [entranceName: string]: {
            type: string,
            category: string,
            locations: {[locationName: string]: Location},
        }
    },
    areaEntranceTypes: {
        [entranceType: string]: {
            [areaName: string]: string[],
        },
    },
    interiorEntranceTypes: {
        [entranceType: string]: string[],
    },
}

interface ScrollerRef {
    [scrollRef: string]: HTMLDivElement,
}

const trackerVersion = '1.0.0';

const Tracker = (props: {}) => {
    let [enabled_settings, setEnabledSettings] = useState<GameSettings>({});
    let [settings, setSettings] = useState<SelectedSettings>({});
    let [areas, setAreas] = useState<Areas>({});
    let [entrances, setEntrances] = useState<Entrances>({});
    let [oneWayEntrances, setOneWayEntrances] = useState<Entrances>({});
    let [allEntrances, setAllEntrances] = useState<AllEntrances>({ entrances: {}, areaEntranceTypes: {}, interiorEntranceTypes: {}, oneWayAreas: [] });
    let [allAreas, setAllAreas] = useState<AllAreas>({areas: {}, entrances: {}, locations: {}, connectors: {}});
    let [openSettings, setOpenSettings] = useState<boolean>(false);
    let [themeDark, setThemeDark] = useState<boolean>(false);
    let [alertReset, setAlertReset] = useState<boolean>(false);
    let [alertUpdate, setAlertUpdate] = useState<boolean>(false);
    let [itemMenuOpen, setItemMenuOpen] = useState<Element | null>(null);
    let [shopItemMenuOpen, setShopItemMenuOpen] = useState<Element | null>(null);
    let [entranceMenuOpen, setEntranceMenuOpen] = useState<Element | null>(null);
    let [entranceToLink, setEntranceToLink] = useState<string>('');
    let [entranceConnector, setEntranceConnector] = useState<string>('');
    let [locationToLink, setLocationToLink] = useState<string>('');
    let [expandWarpMenu, setExpandWarpMenu] = useState<boolean>(false);
    let [expandDungeonMenu, setExpandDungeonMenu] = useState<boolean>(false);
    let [expandSongMenu, setExpandSongMenu] = useState<boolean>(false);
    let [entranceType, setEntranceType] = useState<string>('');
    let [delayedURL, setDelayedURL] = useState<string>('');
    let [entranceRef, setEntranceRef] = useState<string>('');
    let [scrollY, setScrollY] = useState<number | null>(null);
    let [trackerInitialized, setTrackerInitialized] = useState<boolean>(false);
    let [graphInitialized, setGraphInitialized] = useState<boolean>(false);
    const scroller = useRef<ScrollerRef>({});
    const [_fileCache, setFileCache] = useState<ExternalFileCache>({files: {}});

    let graph = useMemo(
        () => WorldGraphFactory('ootr', plando, '7.1.143', _fileCache),
        [_fileCache]
    );

    // run on mount and unmount
    useEffect(() => {
        let clientTrackerVersion = localStorage.getItem('TrackerVersion');
        if (!!(clientTrackerVersion)) {
            if (localStorage.getItem('TrackerVersion') !== trackerVersion) {
                // outdated, reset everything until proper upgrade function developed
                localStorage.clear();
                localStorage.setItem('TrackerVersion', trackerVersion);
            }
        } else {
            // no version key
            localStorage.clear();
            localStorage.setItem('TrackerVersion', trackerVersion);
        }
        let clientSettings = localStorage.getItem('RandoSettings');
        let settingsInit: SelectedSettings = !!(clientSettings) ? JSON.parse(clientSettings) : cloneDeep(defaultSettings.Settings);
        //let settingsInit: SelectedSettings = cloneDeep(defaultSettings.Settings);
        // Disable preset settings on load until custom saved settings are handled
        //let presetSettings = getPresetSettings(settings['Settings Preset']);
        //setPresetSettings(settings, presetSettings);
        let areaJSON = merge(death_mountain_crater, death_mountain_trail, desert_colossus,
            gerudo_fortress, gerudo_valley, goron_city, graveyard, haunted_wasteland,
            hyrule_field, kakariko_village, kokiri_forest, lake_hylia, lon_lon_ranch,
            lost_woods, market, sacred_forest_meadow, spawn_points, warp_songs,
            zora_fountain, zora_river, zoras_domain, deku_tree, dodongos_cavern, jabu_jabus_belly,
            forest_temple, fire_temple, water_temple, shadow_temple, spirit_temple,
            bottom_of_the_well, ice_cavern, gerudo_training_ground, ganons_castle);
        let clientAllAreas = localStorage.getItem('AllAreas');
        let allAreasInit: AllAreas = !!(clientAllAreas) ? JSON.parse(clientAllAreas) : addReverseEntrances(areaJSON);
        let clientAllEntrances = localStorage.getItem('AllEntrances');
        let allEntrancesInit: AllEntrances = !!(clientAllEntrances) ? JSON.parse(clientAllEntrances) : merge({}, categorizeEntrances(allAreasInit));
        //let allAreasInit = addReverseEntrances(areaJSON);
        //let allEntrancesInit = merge({}, categorizeEntrances(allAreasInit));
        findVisibleLocations(settingsInit, allAreasInit);
        let areasInit = loadAreas(settingsInit, allAreasInit, allEntrancesInit, true);
        let entrancesInit = loadEntrancePools(settingsInit, allEntrancesInit, allAreasInit);
        let oneWayEntrancesInit = loadOneWayEntrancePools(settingsInit, allEntrancesInit, allAreasInit);

        //let darkMode = !!(localStorage.getItem('DarkMode')) ? true : localStorage.getItem('DarkMode');
        let clientDarkMode = localStorage.getItem('DarkMode');
        const darkMode: boolean = !!(clientDarkMode) ? JSON.parse(clientDarkMode) : window.matchMedia("(prefers-color-scheme: dark)").matches;

        setEnabledSettings(devr.Settings);
        setSettings(settingsInit);
        setAreas(areasInit);
        setEntrances(entrancesInit);
        setOneWayEntrances(oneWayEntrancesInit);
        setAllEntrances(allEntrancesInit);
        setAllAreas(allAreasInit);
        setThemeDark(darkMode);
        setTrackerInitialized(true);
    }, []);

    // hooks to keep state saved in localstorage
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('RandoSettings', JSON.stringify(settings));
    }, [settings]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('AllAreas', JSON.stringify(allAreas));
    }, [allAreas]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('AllEntrances', JSON.stringify(allEntrances));
    }, [allEntrances]);
    useEffect(() => {
        if (trackerInitialized) localStorage.setItem('DarkMode', JSON.stringify(themeDark));
    }, [themeDark]);

    // When swapping between Overworld and Dungeon views, anchors don't
    // work until after rendering. Ugly workaround incoming.
    // run every render
    useEffect(() => {
        if (delayedURL !== '') {
            window.location.assign(delayedURL);
            setDelayedURL('');
        }
        if (scrollY !== null && entranceRef !== null && Object.keys(scroller.current).includes(entranceRef)) {
            let eRef = scroller.current[entranceRef];
            let rect = eRef.getBoundingClientRect();
            let oTop = rect.top;
            let scrollToY = scrollY;
            window.scrollTo({
                top: 2 * window.scrollY + oTop - scrollToY,
            });
            setScrollY(null);
            setEntranceRef('');
        }

        let ignore = false;

        const getGraph = async () => {
            if (Object.keys(_fileCache.files).length === 0) {
                let graphFileCache = await ExternalFileCacheFactory('ootr', '7.1.143', { local_url: '/ootr-local' });
                if (!ignore) {
                    setFileCache(graphFileCache);
                }
            }
            if (graph.initialized && !ignore) {
                console.log(`World graph initialized with ${graph.get_locations_for_world(graph.worlds[0]).length} locations and ${graph.get_entrances_for_world(graph.worlds[0]).length} entrances`);
                setGraphInitialized(true);
            }
        }
        //getGraph();
    
        return () => { ignore = true; };    
    });

    const setRef = (index: string, element: HTMLDivElement | null): void => {
        if (!!element) scroller.current[index] = element;
    }

    const getPresetSettings = (presetName: string, customSettings: SelectedSettings = {}): SelectedSettings => {
        let presetSettings;
        switch (presetName) {
            case "RSL":
                presetSettings = cloneDeep(rslS4.Settings);
                break;
            case "Mixed Pools":
                presetSettings = cloneDeep(mixedPoolsTourney.Settings);
                break;
            case "Standard":
                presetSettings = cloneDeep(standardS5.Settings);
                break;
            case "DDR":
                presetSettings = cloneDeep(ddrS1.Settings);
                break;
            case "League":
                presetSettings = cloneDeep(leagueS2.Settings);
                break;
            case "Max Chex":
                presetSettings = cloneDeep(maxChex.Settings);
                break;
            case "MW Season 3":
                presetSettings = cloneDeep(mw3.Settings);
                break;
            case "Custom":
                presetSettings = cloneDeep(customSettings);
                break;
            default:
                presetSettings = cloneDeep(defaultSettings.Settings);
                break;
        }
        return presetSettings;
    }

    const setPresetSettings = (gameSettings: SelectedSettings, presetSettings: SelectedSettings): void => {
        Object.keys(presetSettings).forEach(setting => {
            gameSettings[setting] = presetSettings[setting];
        });
    }

    const resetState = (currentSettings: SelectedSettings): void => {
        let settingsReset: SelectedSettings = cloneDeep(defaultSettings.Settings);

        // TODO: Separate tracker and world/preset settings
        let prevSettings = cloneDeep(currentSettings);
        settingsReset["Settings Preset"] = prevSettings["Settings Preset"];
        settingsReset["Show Unshuffled Entrances"] = prevSettings["Show Unshuffled Entrances"];
        settingsReset["Show Locations"] = prevSettings["Show Locations"];
        settingsReset["Show Unshuffled Skulls"] = prevSettings["Show Unshuffled Skulls"];
        settingsReset["Shop Price Tracking"] = prevSettings["Shop Price Tracking"];
        
        //let presetSettings = getPresetSettings(settingsReset['Settings Preset'], prevSettings);
        //setPresetSettings(settingsReset, presetSettings);

        let areaJSON = merge(death_mountain_crater, death_mountain_trail, desert_colossus,
            gerudo_fortress, gerudo_valley, goron_city, graveyard, haunted_wasteland,
            hyrule_field, kakariko_village, kokiri_forest, lake_hylia, lon_lon_ranch,
            lost_woods, market, sacred_forest_meadow, spawn_points, warp_songs,
            zora_fountain, zora_river, zoras_domain, deku_tree, dodongos_cavern, jabu_jabus_belly,
            forest_temple, fire_temple, water_temple, shadow_temple, spirit_temple,
            bottom_of_the_well, ice_cavern, gerudo_training_ground, ganons_castle);
        let allAreasReset = addReverseEntrances(areaJSON);
        let allEntrancesReset = merge({}, categorizeEntrances(allAreasReset));
        findVisibleLocations(settingsReset, allAreasReset);
        let areasReset = loadAreas(settingsReset, allAreasReset, allEntrancesReset, true);
        let entrancesReset = loadEntrancePools(settingsReset, allEntrancesReset, allAreasReset);
        let oneWayEntrancesReset = loadOneWayEntrancePools(settingsReset, allEntrancesReset, allAreasReset);

        setSettings(settingsReset);
        setAreas(areasReset);
        setEntrances(entrancesReset);
        setOneWayEntrances(oneWayEntrancesReset);
        setAllEntrances(allEntrancesReset);
        setAllAreas(allAreasReset);
        setAlertReset(false);
        setExpandWarpMenu(false);
        setExpandDungeonMenu(false);
        setExpandSongMenu(false);
    }

    const addReverseEntrances = (stateAreas: AllAreas): AllAreas => {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allAreasCopy = cloneDeep(stateAreas);
        let rEntrances: {[entranceName: string]: Entrance} = {};
        let oConnectors: {[entranceName: string]: Entrance} = {};
        let eConnector: {[entranceName: string]: Entrance};
        let eEntrance: {[entranceName: string]: Entrance};
        let rEntrance: string;
        Object.keys(allAreasCopy.entrances).forEach(entrance => {
            if (allAreasCopy.entrances[entrance].reverse !== "" && allAreasCopy.entrances[entrance].oneWay === false && allAreasCopy.entrances[entrance].type !== "overworld") {
                rEntrance = allAreasCopy.entrances[entrance].reverse;
                eEntrance = {};
                eEntrance[rEntrance] = clone(allAreasCopy.entrances[entrance]);
                eEntrance[rEntrance].reverse = entrance;
                eEntrance[rEntrance].isReverse = true;
                eEntrance[rEntrance].tagRep = false;
                eEntrance[rEntrance].tag = ""
                eEntrance[rEntrance].connector = ""
                eEntrance[rEntrance].alias = allAreasCopy.entrances[entrance].reverseAlias
                eEntrance[rEntrance].reverseAlias = allAreasCopy.entrances[entrance].alias
                eEntrance[rEntrance].lKey = ""
                rEntrances = merge(rEntrances, eEntrance);
            }
            if (Array.isArray(allAreasCopy.entrances[entrance].connector) || allAreasCopy.entrances[entrance].connector !== '') {
                eConnector = {};
                eConnector[entrance] = clone(allAreasCopy.entrances[entrance]);
                oConnectors = merge(oConnectors, eConnector);
            }
        });
        let areasMerge = { entrances: rEntrances };
        let connectorsMerge = { connectors: oConnectors };
        return merge(allAreasCopy, areasMerge, connectorsMerge, { areas: {} });
    }

    const getShuffledTypes = (globalSettings: SelectedSettings): string[] => {
        let erSettings = [];
        if (Array.isArray(globalSettings["Shuffle Interiors"]) && globalSettings["Shuffle Interiors"].includes("Simple")) {
            erSettings.push("interior");
        }
        if (Array.isArray(globalSettings["Shuffle Interiors"]) && globalSettings["Shuffle Interiors"].includes("Special")) {
            erSettings.push("specialInterior");
        }
        if (Array.isArray(globalSettings["Shuffle Interiors"]) && globalSettings["Shuffle Interiors"].includes("Hideout")) {
            erSettings.push("hideoutInterior");
        }
        if (globalSettings["Shuffle Grottos"] === "On") {
            erSettings.push("grotto");
            erSettings.push("grave");
        }
        if (globalSettings["Shuffle Dungeons"] === "Dungeons" || globalSettings["Shuffle Dungeons"] === "Dungeons and Ganon") {
            erSettings.push("dungeon");
        }
        if (globalSettings["Shuffle Dungeons"] === "Dungeons and Ganon") {
            erSettings.push("dungeonGanon");
        }
        if (globalSettings["Shuffle Bosses"] === "Age-Restricted" || globalSettings["Shuffle Bosses"] === "Full") {
            erSettings.push("boss");
        }
        if (globalSettings["Shuffle Overworld"] === "On") {
            erSettings.push("overworld");
        }
        if (globalSettings["Shuffle Warp Songs"] === "On") {
            erSettings.push("warpsong");
        }
        if (globalSettings["Shuffle Spawn Points"] === "On") {
            erSettings.push("spawn");
        }
        if (globalSettings["Shuffle Owls"] === "On") {
            erSettings.push("owldrop");
        }
        if (globalSettings["Shuffle Valley/Lake"] === "On") {
            erSettings.push("overworldoneway");
        }
        if (globalSettings["Shuffle Warp Songs"] === "On" || globalSettings["Shuffle Spawn Points"] === "On" || globalSettings["Shuffle Owls"] === "On" || globalSettings["Shuffle Valley/Lake"] === "On") {
            erSettings.push("extra");
        }
        return erSettings;
    }

    const loadAreas = (settingsLoad: SelectedSettings, allAreasLoad: AllAreas, allEntrancesLoad: AllEntrances, init: boolean = false): Areas => {
        let areasLocal: Areas = {};
        let erSettings = getShuffledTypes(settingsLoad);
        let subArea: Entrance;
        let eAreas = [];
        let eLocation: {[locationName: string]: Location};
        let eEntrance: {[entranceName: string]: Entrance};
        let internalDungeonEntrance = false;
        Object.keys(allAreasLoad.entrances).forEach((entrance) => {
            subArea = allAreasLoad.entrances[entrance];
            eAreas = [];
            if (subArea.oneWay && subArea.oneWayArea !== "" && subArea.type === "overworld") {
                eAreas.push(subArea.oneWayArea);
                eAreas.push(subArea.area);
            } else if (subArea.oneWay && subArea.oneWayArea !== "") {
                eAreas.push(subArea.oneWayArea);
            } else {
                eAreas.push(subArea.area);
            }
            // noBossShuffle is a permanently unshuffled type for Ganon's Tower until/unless it is added to the randomizer
            internalDungeonEntrance = subArea.type === 'boss' || subArea.type === 'noBossShuffle';
            eAreas.forEach(eArea => {
                if ((!(allAreasLoad.areas.hasOwnProperty(eArea))) && init) {
                    if (!(allAreasLoad.areas.hasOwnProperty(eArea))) {
                        if (subArea.oneWay && subArea.oneWayArea !== "" && subArea.type !== "overworld") {
                            allAreasLoad.areas[eArea] = { show: true, dungeon: internalDungeonEntrance, collapse: 'some', entrances: {}, locations: {} };
                        } else {
                            allAreasLoad.areas[eArea] = { show: false, dungeon: internalDungeonEntrance, collapse: 'some', entrances: {}, locations: {} };
                        }
                    }
                }
                if (!(areasLocal.hasOwnProperty(eArea))) {
                    areasLocal[eArea] = { show: allAreasLoad.areas[eArea].show, dungeon: internalDungeonEntrance, collapse: allAreasLoad.areas[eArea].collapse, entrances: {}, locations: {} };
                }
                eEntrance = {};
                eEntrance[entrance] = allAreasLoad.entrances[entrance];
                if (!(erSettings.includes(subArea.type)) || eEntrance[entrance].shuffled === false) {
                    if (eEntrance[entrance].type !== 'overworld') {
                        if (eEntrance[entrance].type !== 'extra') {
                            eEntrance[entrance].aLink = entrance;
                            eEntrance[entrance].eLink = entrance;
                        }
                    } else {
                        eEntrance[entrance].aLink = eEntrance[entrance].reverse;
                        eEntrance[entrance].eLink = eEntrance[entrance].reverse;
                    }
                } else {
                    eEntrance[entrance].eLink = allAreasLoad.entrances[entrance].userELink;
                    eEntrance[entrance].aLink = allAreasLoad.entrances[entrance].userALink;
                }
                areasLocal[eArea].entrances = merge(areasLocal[eArea].entrances, eEntrance);
            });
        });
        let eArea = "";
        let eDungeon = "";
        Object.keys(allAreasLoad.locations).forEach((location) => {
            if (allAreasLoad.locations[location].visible === true) {
                eArea = allAreasLoad.locations[location].area;
                if (eArea !== "") {
                    if (!(allAreasLoad.areas.hasOwnProperty(eArea)) && init) { 
                        allAreasLoad.areas[eArea] = { show: false, dungeon: false, collapse: 'some', entrances: {}, locations: {} };
                    }
                    if (!(areasLocal.hasOwnProperty(eArea))) {
                        areasLocal[eArea] = { show: allAreasLoad.areas[eArea].show, dungeon: false, collapse: allAreasLoad.areas[eArea].collapse, entrances: {}, locations: {} };
                    }
                    eLocation = {};
                    eLocation[location] = allAreasLoad.locations[location];
                    areasLocal[eArea].locations = merge(areasLocal[eArea].locations, eLocation);
                } else if (['dungeon', 'dungeonGanon'].includes(allAreasLoad.entrances[allAreasLoad.locations[location].lKey].type)) {
                    eDungeon = allAreasLoad.entrances[allAreasLoad.locations[location].lKey].alias;
                    if (!(allAreasLoad.areas.hasOwnProperty(eDungeon)) && init) { 
                        allAreasLoad.areas[eDungeon] = { show: false, dungeon: true, collapse: 'some', entrances: {}, locations: {} };
                    }
                    if (!(areasLocal.hasOwnProperty(eDungeon))) {
                        areasLocal[eDungeon] = { show: false, dungeon: true, collapse: 'some', entrances: {}, locations: {} };
                    }
                    eLocation = {};
                    eLocation[location] = allAreasLoad.locations[location];
                    areasLocal[eDungeon].locations = merge(areasLocal[eDungeon].locations, eLocation);
                    eEntrance = {};
                    eEntrance[allAreasLoad.entrances[allAreasLoad.locations[location].lKey].reverse] = allAreasLoad.entrances[allAreasLoad.entrances[allAreasLoad.locations[location].lKey].reverse];
                    areasLocal[eDungeon].entrances = merge(areasLocal[eDungeon].entrances, eEntrance);
                }
            }
        });
        return areasLocal;
    }

    const categorizeEntrances = (stateAreas: AllAreas): AllEntrances => {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allAreasCat = cloneDeep(stateAreas);
        let entrancesCat: AllEntrances = { entrances: {}, areaEntranceTypes: {}, interiorEntranceTypes: {}, oneWayAreas: [] };
        let eType: string;
        let eRevType: string;
        let area: string;
        Object.keys(allAreasCat.entrances).forEach(entrance => {
            eType = allAreasCat.entrances[entrance].type;
            entrancesCat.entrances[entrance] = { type: eType, category: "", locations: {} };
            entrancesCat.entrances[allAreasCat.entrances[entrance].reverse] = { type: eType, category: "", locations: {} };
            if (eType === "overworld" || eType === "spawn" || eType === "warpsong" || eType === "owldrop" || eType === "extra" || eType === "overworldoneway") {
                if (!(entrancesCat.areaEntranceTypes.hasOwnProperty(eType))) {
                    entrancesCat.areaEntranceTypes[eType] = {};
                }
                if (allAreasCat.entrances[entrance].oneWay && allAreasCat.entrances[entrance].oneWayArea !== "") {
                    area = allAreasCat.entrances[entrance].oneWayArea;
                } else {
                    area = allAreasCat.entrances[entrance].area;
                }
                if (!(entrancesCat.areaEntranceTypes[eType].hasOwnProperty(area))) {
                    entrancesCat.areaEntranceTypes[eType][area] = [];
                }
                entrancesCat.areaEntranceTypes[eType][area].push(entrance);
            }
            if (eType === "interior" || eType === "specialInterior" || eType === "hideoutInterior" || eType === "grave" || eType === "grotto" || eType === "dungeon" || eType === "dungeonGanon" || eType === "boss") {
                if (!(entrancesCat.interiorEntranceTypes.hasOwnProperty(eType))) {
                    entrancesCat.interiorEntranceTypes[eType] = [];
                }
                entrancesCat.interiorEntranceTypes[eType].push(entrance);
                if (allAreasCat.entrances[entrance].isReverse) {
                    eRevType = "reverse" + eType;
                    area = allAreasCat.entrances[entrance].area;
                    if (!(entrancesCat.areaEntranceTypes.hasOwnProperty(eRevType))) {
                        entrancesCat.areaEntranceTypes[eRevType] = {};
                    }
                    if (!(entrancesCat.areaEntranceTypes[eRevType].hasOwnProperty(area))) {
                        entrancesCat.areaEntranceTypes[eRevType][area] = [];
                    }
                    entrancesCat.areaEntranceTypes[eRevType][area].push(entrance);
                }
            }
        });
        let entrance: string;
        let eLocation: {[locationName: string]: Location};
        Object.keys(allAreasCat.locations).forEach(location => {
            if (allAreasCat.locations[location].lKey !== "") {
                entrance = allAreasCat.locations[location].lKey;
                eLocation = {};
                eLocation[location] = allAreasCat.locations[location];
                entrancesCat.entrances[entrance].locations = merge(entrancesCat.entrances[entrance].locations, eLocation);
            }
        });
        //entrancesCat["linked"] = [];
        entrancesCat.oneWayAreas = [];
        entrancesCat.oneWayAreas.push("Spawn Points");
        entrancesCat.oneWayAreas.push("Warp Songs");
        return entrancesCat;
    }

    const loadEntrancePools = (settingsLocal: SelectedSettings, stateEntrances: AllEntrances, stateAreas: AllAreas): Entrances => {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allEntrancesLocal = cloneDeep(stateEntrances);
        let allAreasLocal = cloneDeep(stateAreas);
        let filterOWEntrances = (entrances: {[entranceName: string]: Entrance}, predicate: (eType: string, eLink: string, eArea: string) => boolean): string[] =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].type, entrances[key].eLink, entrances[key].area) );
        let filterReverseEntrances = (entrances: {[entranceName: string]: Entrance}, predicate: (eType: string, eLink: string, eArea: string, eReverse: boolean) => boolean): string[] =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].type, entrances[key].eLink, entrances[key].area, entrances[key].isReverse) );
        let filterEntrances = (entrances: {[entranceName: string]: Entrance}, predicate: (eType: string, eLink: string, eReverse: boolean) => boolean): string[] =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].type, entrances[key].eLink, entrances[key].isReverse) );
        let entrancesPools = {};
        let mixedpool = {};
        let oOverworld: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.overworld).forEach(area => {
            oOverworld[area] = (filterOWEntrances(allAreasLocal.entrances, (eType, eLink, eArea) => eType === "overworld" && eLink === "" && eArea === area));
        });
        let oExtra: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.extra).forEach(area => {
            oExtra[area] = (filterOWEntrances(allAreasLocal.entrances, (eType, eLink, eArea) => eType === "extra" && eLink === "" && eArea === area));
        });
        let oWarpSong: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.warpsong).forEach(area => {
            oWarpSong[area] = (filterOWEntrances(allAreasLocal.entrances, (eType, eLink, eArea) => eType === "warpsong" && eLink === "" && eArea === area));
        });
        let oOwlDrop: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.owldrop).forEach(area => {
            oOwlDrop[area] = (filterOWEntrances(allAreasLocal.entrances, (eType, eLink, eArea) => eType === "owldrop" && eLink === "" && eArea === area));
        });
        let oOverworldOneway: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.overworldoneway).forEach(area => {
            oOverworldOneway[area] = (filterOWEntrances(allAreasLocal.entrances, (eType, eLink, eArea) => eType === "overworldoneway" && eLink === "" && eArea === area));
        });

        let oInteriors: EntrancePool = {} = {};
        let oReverseInteriors: EntrancePool = {} = {};
        let oDecoupledInteriors: EntrancePool = {} = {};
        let eInteriors: string[] = [];
        if (Array.isArray(settingsLocal["Shuffle Interiors"]) && settingsLocal["Shuffle Interiors"].includes("Simple")) {
            eInteriors.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => eType === "interior" && eLink === "" && eReverse === false)));
            Object.keys(allEntrancesLocal.areaEntranceTypes.reverseinterior).forEach(area => {
                if (!(oReverseInteriors.hasOwnProperty(area))) {
                    oReverseInteriors[area] = [];
                }
                oReverseInteriors[area] = (filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => eType === "interior" && eLink === "" && eArea === area && eReverse === true));
            });
        }
        if (Array.isArray(settingsLocal["Shuffle Interiors"]) && settingsLocal["Shuffle Interiors"].includes("Special")) {
            eInteriors.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => eType === "specialInterior" && eLink === "" && eReverse === false)));
            Object.keys(allEntrancesLocal.areaEntranceTypes.reversespecialInterior).forEach(area => {
                if (!(oReverseInteriors.hasOwnProperty(area))) {
                    oReverseInteriors[area] = [];
                }
                oReverseInteriors[area].push(...(filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => eType === "specialInterior" && eLink === "" && eArea === area && eReverse === true)));
            });
        }
        oInteriors = { "Interiors": eInteriors };
        let eHideout: string[] = [];
        if (Array.isArray(settingsLocal["Shuffle Interiors"]) && settingsLocal["Shuffle Interiors"].includes("Hideout")) {
            eHideout.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => eType === "hideoutInterior" && eLink === "" && eReverse === false)));
            Object.keys(allEntrancesLocal.areaEntranceTypes.reversehideoutInterior).forEach(area => {
                if (!(oReverseInteriors.hasOwnProperty(area))) {
                    oReverseInteriors[area] = [];
                }
                oReverseInteriors[area].push(...(filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => eType === "hideoutInterior" && eLink === "" && eArea === area && eReverse === true)));
            });
            oInteriors = merge(oInteriors, {"Hideout": eHideout });
        }

        oDecoupledInteriors = merge(clone(oInteriors), clone(oReverseInteriors));
        let oDungeons: EntrancePool = {} = {};
        let oReverseDungeons: EntrancePool = {} = {};
        let oDecoupledDungeons: EntrancePool = {} = {};
        let eDungeons: string[] = [];
        eDungeons.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => eType === "dungeon" && eLink === "" && eReverse === false)));
        Object.keys(allEntrancesLocal.areaEntranceTypes.reversedungeon).forEach(area => {
            oReverseDungeons[area] = (filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => eType === "dungeon" && eLink === "" && eArea === area && eReverse === true));
        });
        if (settingsLocal["Shuffle Dungeons"] === "Dungeons and Ganon") {
            eDungeons.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => eType === "dungeonGanon" && eLink === "" && eReverse === false)));
            Object.keys(allEntrancesLocal.areaEntranceTypes.reversedungeonGanon).forEach(area => {
                if (!(oReverseDungeons.hasOwnProperty(area))) {
                    oReverseDungeons[area] = [];
                }
                oReverseDungeons[area].push(...(filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => eType === "dungeonGanon" && eLink === "" && eArea === area && eReverse === true)));
            });
        }
        oDungeons = { "Dungeons": eDungeons };
        oDecoupledDungeons = merge(clone(oDungeons), clone(oReverseDungeons));
        let oBosses: EntrancePool = {} = {};
        let oReverseBosses: EntrancePool = {} = {};
        let oDecoupledBosses: EntrancePool = {} = {};
        let eBosses: string[] = [];
        eBosses.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => eType === "boss" && eLink === "" && eReverse === false)));
        Object.keys(allEntrancesLocal.areaEntranceTypes.reverseboss).forEach(area => {
            oReverseBosses[area] = (filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => eType === "boss" && eLink === "" && eArea === area && eReverse === true));
        });
        oBosses = { "Bosses": eBosses };
        oDecoupledBosses = merge(clone(oBosses), clone(oReverseBosses));
        let oGrottos: EntrancePool = {} = {};
        let oReverseGrottos: EntrancePool = {} = {};
        let oDecoupledGrottos: EntrancePool = {} = {};
        let eGrottos: string[] = [];
        eGrottos.push(...(filterEntrances(allAreasLocal.entrances, (eType, eLink, eReverse) => (eType === "grotto" || eType === "grave") && eLink === "" && eReverse === false)));
        Object.keys(allEntrancesLocal.areaEntranceTypes.reversegrotto).forEach(area => {
            oReverseGrottos[area] = (filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => (eType === "grotto") && eLink === "" && eArea === area && eReverse === true));
        });
        Object.keys(allEntrancesLocal.areaEntranceTypes.reversegrave).forEach(area => {
            if (!(oReverseGrottos.hasOwnProperty(area))) {
                oReverseGrottos[area] = [];
            }
            oReverseGrottos[area].push(...(filterReverseEntrances(allAreasLocal.entrances, (eType, eLink, eArea, eReverse) => (eType === "grave") && eLink === "" && eArea === area && eReverse === true)));
        });
        oGrottos = { "Grottos": eGrottos };
        oDecoupledGrottos = merge(clone(oGrottos), clone(oReverseGrottos));

        function mergeAreas(objValue: any, srcValue: any) {
            if (isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        }

        if (settingsLocal["Shuffle Overworld"] === "On") {
            if (Array.isArray(settingsLocal["Mixed Pools"]) && settingsLocal["Mixed Pools"].includes("Overworld")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oOverworld, "mixed_reverse": oOverworld, "mixed_decoupled": oOverworld, "mixed_overworld": oOverworld}, mergeAreas);
            }
            entrancesPools = merge(entrancesPools, {"overworld": oOverworld});
        }
        if (Array.isArray(settingsLocal["Shuffle Interiors"]) && (settingsLocal["Shuffle Interiors"].includes("Simple") || settingsLocal["Shuffle Interiors"].includes("Special") || settingsLocal["Shuffle Interiors"].includes("Hideout"))) {
            if (Array.isArray(settingsLocal["Mixed Pools"]) && settingsLocal["Mixed Pools"].includes("Interiors")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oInteriors, "mixed_reverse": oReverseInteriors, "mixed_decoupled": oDecoupledInteriors, "mixed_overworld": merge(clone(oInteriors), clone(oReverseInteriors))}, mergeAreas);
            }
            entrancesPools = merge(entrancesPools, {"interior": oInteriors, "interior_reverse": oReverseInteriors, "interior_decoupled": oDecoupledInteriors});
        }
        if (settingsLocal["Shuffle Grottos"] === "On") {
            if (Array.isArray(settingsLocal["Mixed Pools"]) && settingsLocal["Mixed Pools"].includes("Grottos")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oGrottos, "mixed_reverse": oReverseGrottos, "mixed_decoupled": oDecoupledGrottos, "mixed_overworld": merge(clone(oGrottos), clone(oReverseGrottos))}, mergeAreas);
            }
            entrancesPools = merge(entrancesPools, {"grotto": oGrottos, "grotto_reverse": oReverseGrottos, "grotto_decoupled": oDecoupledGrottos});
            entrancesPools = merge(entrancesPools, {"grave": oGrottos, "grave_reverse": oReverseGrottos, "grave_decoupled": oDecoupledGrottos});
        }
        if (settingsLocal["Shuffle Dungeons"] === "Dungeons" || settingsLocal["Shuffle Dungeons"] === "Dungeons and Ganon") {
            if (Array.isArray(settingsLocal["Mixed Pools"]) && settingsLocal["Mixed Pools"].includes("Dungeons")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oDungeons, "mixed_reverse": oReverseDungeons, "mixed_decoupled": oDecoupledDungeons, "mixed_overworld": merge(clone(oDungeons), clone(oReverseDungeons))}, mergeAreas);
            }
            entrancesPools = merge(entrancesPools, {"dungeon": oDungeons, "dungeon_reverse": oReverseDungeons, "dungeon_decoupled": oDecoupledDungeons});
        }
        if (settingsLocal["Shuffle Bosses"] === "Age-Restricted" || settingsLocal["Shuffle Bosses"] === "Full") {
            if (Array.isArray(settingsLocal["Mixed Pools"]) && settingsLocal["Mixed Pools"].includes("Boss Rooms")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oBosses, "mixed_reverse": oReverseBosses, "mixed_decoupled": oDecoupledBosses, "mixed_overworld": merge(clone(oBosses), clone(oReverseBosses))}, mergeAreas);
            }
            entrancesPools = merge(entrancesPools, {"boss": oBosses, "boss_reverse": oReverseBosses, "boss_decoupled": oDecoupledBosses});
        }
        if (settingsLocal["Shuffle Warp Songs"] === "On") {
            entrancesPools = merge(entrancesPools, {"warpsong": [], "warpsong_reverse": [], "warpsong_decoupled": []});
        }
        if (settingsLocal["Shuffle Owls"] === "On") {
            entrancesPools = merge(entrancesPools, {"owldrop": [], "owldrop_reverse": [], "owldrop_decoupled": []});
        }
        if (settingsLocal["Shuffle Spawn Points"] === "On") {
            entrancesPools = merge(entrancesPools, {"spawn": [], "spawn_reverse": [], "spawn_decoupled": []});
        }
        if (settingsLocal["Shuffle Valley/Lake"] === "On") {
            entrancesPools = merge(entrancesPools, {"overworldoneway": [], "overworldoneway_reverse": [], "overworldoneway_decoupled": []});
        }
        entrancesPools = merge(entrancesPools, mixedpool);
        return entrancesPools;
    }

    const loadOneWayEntrancePools = (settingsLocal: SelectedSettings, stateEntrances: AllEntrances, stateAreas: AllAreas): Entrances => {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allEntrancesLocal = cloneDeep(stateEntrances);
        let allAreasLocal = cloneDeep(stateAreas);
        let entrancesPools: Entrances = {};

        let eOverworld: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.overworld).forEach(area => {
            eOverworld[area] = (clone(allEntrancesLocal.areaEntranceTypes.overworld[area]));
        });

        Object.keys(allEntrancesLocal.areaEntranceTypes.extra).forEach(area => {
            if (!(Object.keys(eOverworld).includes(area))) {
                eOverworld[area] = [];
            }
            eOverworld[area].push(...((allEntrancesLocal.areaEntranceTypes.extra[area])));
        });

        Object.keys(allEntrancesLocal.areaEntranceTypes.overworldoneway).forEach(area => {
            allEntrancesLocal.areaEntranceTypes.overworldoneway[area].forEach(e => {
                let destArea = allAreasLocal.entrances[e].area
                if (!(Object.keys(eOverworld).includes(destArea))) {
                    eOverworld[destArea] = [];
                }
                eOverworld[destArea].push(e);
            });
        });
        
        let eInteriors: string[] = [];
        eInteriors.push(...((allEntrancesLocal.interiorEntranceTypes.interior.filter(int => allAreasLocal.entrances[int].isReverse === false))));
        eInteriors.push(...((allEntrancesLocal.interiorEntranceTypes.specialInterior.filter(int => allAreasLocal.entrances[int].isReverse === false))));
        eInteriors.push(...((allEntrancesLocal.interiorEntranceTypes.hideoutInterior.filter(int => allAreasLocal.entrances[int].isReverse === false))));
        let oInteriors: EntrancePool = { "Interiors": eInteriors };

        let eOverworldInteriors: EntrancePool = {};
        Object.keys(allEntrancesLocal.areaEntranceTypes.reverseinterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                eOverworldInteriors[area] = [];
            }
            eOverworldInteriors[area].push(...((allEntrancesLocal.areaEntranceTypes.reverseinterior[area])));
        });
        Object.keys(allEntrancesLocal.areaEntranceTypes.reversespecialInterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                eOverworldInteriors[area] = [];
            }
            eOverworldInteriors[area].push(...((allEntrancesLocal.areaEntranceTypes.reversespecialInterior[area])))
        });
        Object.keys(allEntrancesLocal.areaEntranceTypes.reversehideoutInterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                eOverworldInteriors[area] = [];
            }
            eOverworldInteriors[area].push(...((allEntrancesLocal.areaEntranceTypes.reversehideoutInterior[area])))
        });

        let eOverworldDungeons: EntrancePool = {};
        if ((settingsLocal["Shuffle Dungeons"] === 'Dungeons' || settingsLocal["Shuffle Dungeons"] === 'Dungeons and Ganon') &&
            (Array.isArray(settingsLocal['Mixed Pools']) && settingsLocal['Mixed Pools'].includes("Dungeons"))) {
            Object.keys(allEntrancesLocal.areaEntranceTypes.reversedungeon).forEach(area => {
                if (!(Object.keys(eOverworldDungeons).includes(area))) {
                    eOverworldDungeons[area] = [];
                }
                eOverworldDungeons[area].push(...((allEntrancesLocal.areaEntranceTypes.reversedungeon[area])))
            });
            if (settingsLocal["Shuffle Dungeons"] === 'Dungeons and Ganon') {
                Object.keys(allEntrancesLocal.areaEntranceTypes.reversedungeonGanon).forEach(area => {
                    if (!(Object.keys(eOverworldDungeons).includes(area))) {
                        eOverworldDungeons[area] = [];
                    }
                    eOverworldDungeons[area].push(...((allEntrancesLocal.areaEntranceTypes.reversedungeonGanon[area])))
                });
            }
        }

        let eOwlDrops: string[] = [];
        Object.keys(allEntrancesLocal.areaEntranceTypes.owldrop).forEach(area => {
            eOwlDrops.push(...((allEntrancesLocal.areaEntranceTypes.owldrop[area])));
        });
        let oOwlDrops: EntrancePool = { "Owl Drops": eOwlDrops };

        let eSpawnPoints: string[] = [];
        eSpawnPoints.push(...((allEntrancesLocal.areaEntranceTypes.spawn["Spawn Points"])));
        let oSpawnPoints: EntrancePool = { "Spawn Points": eSpawnPoints };
        
        let eWarpSongs: string[] = [];
        Object.keys(allEntrancesLocal.areaEntranceTypes.warpsong).forEach(area => {
            eWarpSongs.push(...((allEntrancesLocal.areaEntranceTypes.warpsong[area])));
        });
        let oWarpSongs: EntrancePool = { "Warp Song Pads": eWarpSongs };
        
        function mergeAreas(objValue: any, srcValue: any) {
            if (isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        }

        let oExtOwlDrops: EntrancePool = mergeWith(cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(oOwlDrops), mergeAreas);
        let oExtWarpSongs: EntrancePool = mergeWith(cloneDeep(oSpawnPoints), cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(eOverworldInteriors), cloneDeep(oInteriors), cloneDeep(oOwlDrops), cloneDeep(eOverworldDungeons), mergeAreas);
        let oExtSpawnPoints: EntrancePool = mergeWith(cloneDeep(oSpawnPoints), cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(eOverworldInteriors), cloneDeep(oInteriors), cloneDeep(oOwlDrops), cloneDeep(eOverworldDungeons), mergeAreas);
        let oExtOverworldOneway: EntrancePool = mergeWith(cloneDeep(oSpawnPoints), cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(eOverworldInteriors), cloneDeep(oInteriors), cloneDeep(oOwlDrops), cloneDeep(eOverworldDungeons), mergeAreas);
        entrancesPools = {
                        "spawn": oExtSpawnPoints,
                        "owldrop": oExtOwlDrops,
                        "warpsong": oExtWarpSongs,
                        "overworldoneway": oExtOverworldOneway,
                    };
        return entrancesPools;
    }

    const setShuffledEntrances = (settingsLocal: SelectedSettings, allAreasLocal: AllAreas): AllAreas => {
        let tempAreas = cloneDeep(allAreasLocal);
        let erSettings = getShuffledTypes(settingsLocal);
        Object.keys(tempAreas.entrances).forEach(entrance => {
            if (erSettings.includes(tempAreas.entrances[entrance].type)) {
                tempAreas.entrances[entrance].shuffled = true;
            } else {
                tempAreas.entrances[entrance].shuffled = false;
            }
        });
        return tempAreas; 
    }

    const changeSetting = (setting: ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string[]> | {target: {name: string, value: boolean | string}}) => {
        console.log(setting.target.name, setting.target.value);
        let allEntrancesLocal = cloneDeep(allEntrances);
        let allAreasLocal = cloneDeep(allAreas);
        let settingsLocal: SelectedSettings;
        if (setting.target.name === 'Settings Preset' && typeof setting.target.value === 'string') {
            let prevSettings = cloneDeep(settings);
            settingsLocal = cloneDeep(defaultSettings.Settings);
            settingsLocal["Settings Preset"] = prevSettings["Settings Preset"];
            settingsLocal["Show Unshuffled Entrances"] = prevSettings["Show Unshuffled Entrances"];
            settingsLocal["Show Locations"] = prevSettings["Show Locations"];
            settingsLocal["Show Unshuffled Skulls"] = prevSettings["Show Unshuffled Skulls"];
            settingsLocal["Shop Price Tracking"] = prevSettings["Shop Price Tracking"];
            settingsLocal["View"] = prevSettings["View"];
            
            let presetSettings = getPresetSettings(setting.target.value, prevSettings);
            setPresetSettings(settingsLocal, presetSettings);
        } else {
            settingsLocal = cloneDeep(settings);
        }
        settingsLocal[setting.target.name] = setting.target.value;
        allAreasLocal = setShuffledEntrances(settingsLocal, allAreasLocal);
        findVisibleLocations(settingsLocal, allAreasLocal);
        let areasLocal = loadAreas(settingsLocal, allAreasLocal, allEntrancesLocal);
        let entrancesLocal = loadEntrancePools(settingsLocal, allEntrancesLocal, allAreasLocal);
        let oneWayEntrancesLocal = loadOneWayEntrancePools(settingsLocal, allEntrancesLocal, allAreasLocal);
        findVisibleAreas(areasLocal, allAreasLocal, allEntrancesLocal, settingsLocal);
        setSettings(settingsLocal);
        setEntrances(entrancesLocal);
        setOneWayEntrances(oneWayEntrancesLocal);
        setAreas(areasLocal);
        setAllAreas(allAreasLocal);
    }

    const toggleMQ = (dungeon: string): void => {
        let settingsLocal = cloneDeep(settings);
        let isMQ = !(settingsLocal[dungeon]);
        let mqEvent = Event
        changeSetting({"target":{"name":dungeon,"value":isMQ}});
    }

    const toggleCollapse = (area: string): void => {
        let allAreasLocal = cloneDeep(allAreas);
        let areasLocal = cloneDeep(areas);
        let collapse = areasLocal[area].collapse;
        if (collapse === 'none') {
            collapse = 'some';
        } else if (collapse === 'some') {
            collapse = 'all';
        } else {
            collapse = 'none';
        }
        allAreasLocal.areas[area].collapse = collapse;
        areasLocal[area].collapse = collapse;
        setAreas(areasLocal);
        setAllAreas(allAreasLocal);
    }

    const toggleCollapseReverse = (areaDiv: HTMLDivElement) => {
        let allAreasLocal = cloneDeep(allAreas);
        let areasLocal = cloneDeep(areas);
        let area = areaDiv.innerText;
        let collapse = areasLocal[area].collapse;
        if (collapse === 'none') {
            collapse = 'all';
        } else if (collapse === 'some') {
            collapse = 'none';
        } else {
            collapse = 'some';
        }
        allAreasLocal.areas[area].collapse = collapse;
        areasLocal[area].collapse = collapse;
        setAreas(areasLocal);
        setAllAreas(allAreasLocal);
    }

    const findVisibleAreas = (shownAreas: Areas, allAreasLocal: AllAreas, entrancesLocal: AllEntrances, settingsParam?: SelectedSettings): void => {
        let settingsLocal: SelectedSettings;
        if (settingsParam !== undefined) {
            settingsLocal = settingsParam;
        } else {
            settingsLocal = cloneDeep(settings);
        }
        let alwaysOneWay: string[] = ["spawn","warpsong","owldrop","extra","overworldoneway"];
        let decoupled: boolean = settingsLocal["Decoupled Entrances"] === "On";
        let overworldOneWays: boolean = settingsLocal["Shuffle Valley/Lake"] === "On";
        let filterAreas = (entrances: {[entranceName: string]: Entrance}, predicate: (eLink: string, aLink: string, isReverse: boolean, isOneWay: boolean, shuffled: boolean, lType: string, e: string, oneWayArea: string, connector: string | string[]) => boolean) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].eLink, entrances[key].aLink, entrances[key].isReverse, entrances[key].oneWay, entrances[key].shuffled, entrances[key].type, key, entrances[key].oneWayArea, entrances[key].connector) );
        Object.keys(shownAreas).forEach(targetArea => {
            let linkedTargetEntrances = (filterAreas(shownAreas[targetArea].entrances, (eLink, aLink, isReverse, isOneWay, shuffled, lType, e, oneWayArea, connector) => (
                /*(isOneWay && aLink !== "" && (lType !== "overworld" && lType !== "owldrop")) ||*/
                (eLink !== "" && oneWayArea !== targetArea && (((isReverse === true) && shuffled === true) || lType === "overworld" || lType === "warpsong" || lType === "owldrop" || lType === "extra" || lType === "overworldoneway"))) ));
            if (linkedTargetEntrances.length === 0 && !(entrancesLocal.oneWayAreas.includes(targetArea))) {
                shownAreas[targetArea].show = false;
                allAreasLocal.areas[targetArea].show = false;
            } else {
                shownAreas[targetArea].show = true;
                allAreasLocal.areas[targetArea].show = true;
            }
        });

        alwaysOneWay.forEach(oneType => {
            Object.keys(entrancesLocal.areaEntranceTypes[oneType]).forEach(aOneWay => {
                entrancesLocal.areaEntranceTypes[oneType][aOneWay].forEach(eOneWay => {
                    if (allAreasLocal.entrances[eOneWay].aLink !== "" && allAreasLocal.areas[allAreasLocal.entrances[eOneWay].oneWayArea].show === true) {
                        let eLinked = allAreasLocal.entrances[eOneWay].aLink;
                        let altLinked = true;
                        // switch to ToT entrance for Prelude
                        if (allAreasLocal.entrances[eLinked].oneWay === true && allAreasLocal.entrances[eLinked].connector !== "") {
                            let totConnector = allAreasLocal.entrances[eLinked].connector;
                            if (!(Array.isArray(totConnector)) && allAreasLocal.entrances[totConnector].aLink !== "") {
                                eLinked = allAreasLocal.entrances[totConnector].aLink;
                            } else { altLinked = false }
                        }
                        // use interior exit for area if interior is linked
                        if (allAreasLocal.entrances[eLinked].isReverse === false && allAreasLocal.entrances[eLinked].type !== "overworld" && allAreasLocal.entrances[eLinked].oneWay === false) {
                            if (allAreasLocal.entrances[allAreasLocal.entrances[eLinked].reverse].aLink !== "") {
                                eLinked = allAreasLocal.entrances[allAreasLocal.entrances[eLinked].reverse].aLink;
                            } else { altLinked = false }
                        }
                        if (altLinked && (allAreasLocal.entrances[eLinked].isReverse === true || allAreasLocal.entrances[eLinked].type === "overworld" ||
                        (allAreasLocal.entrances[eLinked].oneWay === true && (allAreasLocal.entrances[eLinked].oneWayArea !== "" || allAreasLocal.entrances[eLinked].type === "extra")))) {
                            shownAreas[allAreasLocal.entrances[eLinked].area].show = true;
                            allAreasLocal.areas[allAreasLocal.entrances[eLinked].area].show = true;
                            // Hard code Gerudo Valley to Lake with decoupled off, necessary for Lake Hylia owl warp to chain off valley visibility
                            if (allAreasLocal.entrances[eLinked].area === 'Gerudo Valley' && !(decoupled || overworldOneWays)) {
                                shownAreas['Lake Hylia'].show = true;
                                allAreasLocal.areas['Lake Hylia'].show = true;
                            }
                        }
                    }
                });
            });
        });
        // Another pass for connectors that link to or from unshuffled entrances
        let connectorOverride: string[] = [];
        Object.keys(allAreasLocal.connectors).forEach(connector => {
            let connectorList: string[];
            let connectorTypeCheck = allAreasLocal.entrances[connector].connector;
            if (Array.isArray(connectorTypeCheck)) {
                connectorList = connectorTypeCheck;
            } else {
                connectorList = [connectorTypeCheck];
            }
            connectorList.forEach(exit => {
                if (allAreasLocal.entrances[connector].eLink !== '' && allAreasLocal.entrances[exit].aLink !== '' &&
                (((allAreasLocal.entrances[connector].shuffled || allAreasLocal.entrances[exit].shuffled) && (!decoupled || allAreasLocal.entrances[allAreasLocal.entrances[exit].aLink].isReverse)) || allAreasLocal.areas[allAreasLocal.entrances[connector].area].show)) {
                    shownAreas[allAreasLocal.entrances[allAreasLocal.entrances[exit].aLink].area].show = true;
                    allAreasLocal.areas[allAreasLocal.entrances[allAreasLocal.entrances[exit].aLink].area].show = true;
                    connectorOverride.push(allAreasLocal.entrances[allAreasLocal.entrances[exit].aLink].area);
                }
            })
        });

        // Hard code Gerudo Valley to Lake with decoupled off again, in case one-way entrance does not lead to Valley
        if (shownAreas['Gerudo Valley'].show === true && !(decoupled || overworldOneWays)) {
            shownAreas['Lake Hylia'].show = true;
            allAreasLocal.areas['Lake Hylia'].show = true;
        }

        // Hard code LW Bridge and LW visibility if one or the other is visible
        // Can't merge into one area since Kokiri Forest has an exit to LW and LW Bridge each,
        // causing possible naming confusion. This is important if/when logic is added
        if (shownAreas['Lost Woods'].show === true) {
            shownAreas['Lost Woods Bridge'].show = true;
            allAreasLocal.areas['Lost Woods Bridge'].show = true;
        } else if (shownAreas['Lost Woods Bridge'].show === true) {
            shownAreas['Lost Woods'].show = true;
            allAreasLocal.areas['Lost Woods'].show = true;
        }

        // Hard code Colossus from Spirit Temple so that we don't have to add dummy
        // unshuffled entrances to the hands
        if ((allAreasLocal.entrances['Desert Colossus -> Spirit Temple Lobby'].eLink !== '') ||
            (allAreasLocal.entrances['Twinrova -> Spirit Temple'].eLink !== '' && settingsLocal["Shuffle Bosses"] !== "Off")) {
            shownAreas['Desert Colossus'].show = true;
            allAreasLocal.areas['Desert Colossus'].show = true;
        }

        // Filter areas with no visible entrances or locations
        const hideAreas = (entrances: {[entranceName: string]: Entrance}, predicate: (shuffled: boolean, eType: string) => boolean) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].shuffled, entrances[key].type) );
        const hideAreaLocations = (locations: {[locationName: string]: Location}, predicate: (visible: boolean) => boolean) =>
            Object.keys(locations)
                .filter( key => predicate(locations[key].visible) );
        if (settingsLocal["Show Unshuffled Entrances"] === "No") {
            Object.keys(shownAreas).filter((a) => (shownAreas[a].show)).forEach(targetArea => {
                let shownEntrances = (hideAreas(shownAreas[targetArea].entrances, (shuffled, type) => ( (shuffled || type === 'spawn') && type !== 'extra' )));
                let shownLocations = []; //(hideAreaLocations(shownAreas[targetArea].locations, (visible) => visible ));
                // Special case for unshuffled spawn points with shuffled interiors all
                // due to the connector implementation
                if (((shownEntrances.length === 0 && ((settingsLocal["Show Locations"] === "Yes" && shownLocations.length !== 0) || settingsLocal["Show Locations"] !== "Yes")) ||
                (targetArea === 'Spawn Points' && settingsLocal["Shuffle Spawn Points"] === "Off" && (Array.isArray(settingsLocal["Shuffle Interiors"]) && !settingsLocal["Shuffle Interiors"].includes("Special")))) &&
                !(connectorOverride.includes(targetArea))) {
                    shownAreas[targetArea].show = false;
                    allAreasLocal.areas[targetArea].show = false;
                }
            });
        }
    }

    const findVisibleLocations = (settingsLocal: SelectedSettings, allAreasLocal: AllAreas): void => {
        let andVisible: boolean;
        let andCount: number;
        let orVisible: boolean;
        let orCount: number;
        let interiorsOnly: boolean;
        let visibleRules: boolean;
        // Location visibility
        Object.keys(allAreasLocal.locations).forEach((location) => {
            if (settingsLocal["Show Locations"] === "Yes" || settingsLocal["Show Locations"] === "Interiors Only") {
                interiorsOnly = (settingsLocal["Show Locations"] === "Interiors Only");
                let locationRules = allAreasLocal.locations[location].settings;
                if (typeof locationRules === "boolean") {
                    allAreasLocal.locations[location].visible = locationRules;
                    visibleRules = locationRules;
                } else if (locationRules.length > 0) {
                    andVisible = true;
                    orVisible = false;
                    andCount = 0;
                    orCount = 0;
                    locationRules.forEach(s => {
                        if (s.required === true) { andCount++; } else { orCount++; }
                        if (settingsLocal[s.setting] === s.value && s.required === true) { andVisible = true && andVisible;  }
                        if (settingsLocal[s.setting] !== s.value && s.required === true) { andVisible = false; }
                        if (settingsLocal[s.setting] === s.value && s.required === false) { orVisible = true; }
                    });
                    visibleRules = ((andVisible === (andCount >= 0)) && (orVisible === (orCount > 0)));
                    allAreasLocal.locations[location].visible = (((allAreasLocal.locations[location].area !== "" && !(interiorsOnly)) || allAreasLocal.locations[location].area === "") && visibleRules);
                } else {
                    allAreasLocal.locations[location].visible = ((allAreasLocal.locations[location].area !== "" && !(interiorsOnly)) || allAreasLocal.locations[location].area === "");
                    visibleRules = true;
                }
            } else {
                visibleRules = false;
                allAreasLocal.locations[location].visible = false;
            }
            if (allAreasLocal.locations[location].shuffleRules.length > 0) {andVisible = true;
                orVisible = false;
                andCount = 0;
                orCount = 0;
                allAreasLocal.locations[location].shuffleRules.forEach(s => {
                    if (s.required === true) { andCount++; } else { orCount++; }
                    if (settingsLocal[s.setting] === s.value && s.required === true) { andVisible = true && andVisible;  }
                    if (settingsLocal[s.setting] !== s.value && s.required === true) { andVisible = false; }
                    if (settingsLocal[s.setting] === s.value && s.required === false) { orVisible = true; }
                });
                allAreasLocal.locations[location].shuffled = ((andVisible === (andCount >= 0)) && (orVisible === (orCount > 0)));
            } else {
                allAreasLocal.locations[location].shuffled = visibleRules;
            }
        });
        // Entrance tag usage vs unique name
        Object.keys(allAreasLocal.entrances).forEach((entrance) => {
            if (allAreasLocal.entrances[entrance].tagRules.length > 0) {
                andVisible = true;
                orVisible = false;
                andCount = 0;
                orCount = 0;
                allAreasLocal.entrances[entrance].tagRules.forEach(s => {
                    if (s.required === true) { andCount++; } else { orCount++; }
                    if (settingsLocal[s.setting] === s.value && s.required === true) { andVisible = true && andVisible;  }
                    if (settingsLocal[s.setting] !== s.value && s.required === true) { andVisible = false; }
                    if (settingsLocal[s.setting] === s.value && s.required === false) { orVisible = true; }
                });
                allAreasLocal.entrances[entrance].enableTag = (andVisible === (andCount >= 0)) && (orVisible === (orCount > 0));
            }
        });
        // Check entrance tags if a new tag representative is needed because the previous one no longer uses a tag
        Object.keys(allAreasLocal.entrances).forEach((entrance) => {
            if (allAreasLocal.entrances[entrance].tag !== "") {
                if (allAreasLocal.entrances[entrance].tagRep && !(allAreasLocal.entrances[entrance].enableTag)) {
                    allAreasLocal.entrances[entrance].tagRep = false;
                    let tagEntrances = (filterTags(allAreasLocal.entrances, (eTag, eTagRep, eEnableTag, eLink) => (eTag === allAreasLocal.entrances[entrance].tag && eTagRep === false && eEnableTag && eLink === "")));
                    if (tagEntrances.length !== 0) {
                        allAreasLocal.entrances[tagEntrances[0]].tagRep = true;
                    }
                }
            }
        });
    }

    const filterTags = (entrances: {[entranceName: string]: Entrance}, predicate: (eTag: string, eTagRep: boolean, enableTag: boolean, eLink: string) => boolean) =>
        Object.keys(entrances).filter( key => predicate(entrances[key].tag, entrances[key].tagRep, entrances[key].enableTag, entrances[key].eLink) );

    const linkEntrance = (dataLinkFrom: string, dataLinkTo: string): void => {
        let originator = dataLinkFrom;
        let eCategory = dataLinkTo;
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra","overworldoneway"];
        let unMixedDecoupled = ["boss", "noBossShuffle", "noDungeonShuffle"];
        let areasLocal = cloneDeep(allAreas);
        let shownAreas = cloneDeep(areas);
        let entrancesLocal = cloneDeep(allEntrances);
        let area = areasLocal.entrances[originator].area;
        let entrancePools;
        if (areasLocal.entrances[eCategory].tag !== "" && areasLocal.entrances[eCategory].enableTag &&
            areasLocal.entrances[eCategory].tag === areasLocal.entrances[originator].tag && 
            areasLocal.entrances[originator].eLink === "" && areasLocal.entrances[originator].enableTag) {
            eCategory = originator;
        }
        console.log(originator, "<>", eCategory,"[Connected]");
        if (areasLocal.entrances[originator].oneWay === true && areasLocal.entrances[originator].oneWayArea !== "") {
            area = areasLocal.entrances[originator].oneWayArea;
        }
        let targetArea = areasLocal.entrances[eCategory].area;
        if (areasLocal.entrances[eCategory].oneWay === true && areasLocal.entrances[eCategory].oneWayArea !== "") {
            targetArea = areasLocal.entrances[eCategory].oneWayArea;
        }
        if ((settings["Decoupled Entrances"] === "Off" && !(alwaysOneWay.includes(areasLocal.entrances[originator].type))) || (unMixedDecoupled.includes(areasLocal.entrances[originator].type))) {
            let revECategory;
            let revTargetE;
            if (areasLocal.entrances[eCategory].type === "overworld") {
                revECategory = eCategory;
            } else {
                revECategory = areasLocal.entrances[eCategory].reverse;
            }
            if (areasLocal.entrances[originator].type === "overworld") {
                revTargetE = originator;
            } else {
                revTargetE = areasLocal.entrances[originator].reverse;
            }
            let revArea = areasLocal.entrances[revECategory].area;
            let revTargetArea = areasLocal.entrances[revTargetE].area;
            areasLocal.entrances[revECategory].aLink = revTargetE;
            shownAreas[revArea].entrances[revECategory].aLink = revTargetE;
            areasLocal.entrances[revECategory].userALink = revTargetE;
            shownAreas[revArea].entrances[revECategory].userALink = revTargetE;
            areasLocal.entrances[revTargetE].eLink = revECategory;
            shownAreas[revTargetArea].entrances[revTargetE].eLink = revECategory;
            areasLocal.entrances[revTargetE].userELink = revECategory;
            shownAreas[revTargetArea].entrances[revTargetE].userELink = revECategory;
        }
        areasLocal.entrances[originator].aLink = eCategory;
        shownAreas[area].entrances[originator].aLink = eCategory;
        areasLocal.entrances[originator].userALink = eCategory;
        shownAreas[area].entrances[originator].userALink = eCategory;
        if (!(alwaysOneWay.includes(areasLocal.entrances[originator].type))) {
            areasLocal.entrances[eCategory].eLink = originator;
            shownAreas[targetArea].entrances[eCategory].eLink = originator;
            areasLocal.entrances[eCategory].userELink = originator;
            shownAreas[targetArea].entrances[eCategory].userELink = originator;
            if (areasLocal.entrances[eCategory].type === "overworld" && areasLocal.entrances[eCategory].oneWay && areasLocal.entrances[eCategory].oneWayArea !== "") {
                shownAreas[areasLocal.entrances[eCategory].area].entrances[eCategory].eLink = originator;
                shownAreas[areasLocal.entrances[eCategory].area].entrances[eCategory].userELink = originator;
            }
        } else {
            areasLocal.entrances[eCategory].oneWayELink = originator;
            shownAreas[targetArea].entrances[eCategory].oneWayELink = originator;
            areasLocal.entrances[eCategory].userOneWayELink = originator;
            shownAreas[targetArea].entrances[eCategory].userOneWayELink = originator;
        }

        if (areasLocal.entrances[eCategory].tagRep) {
            let tagEntrances = (filterTags(areasLocal.entrances, (eTag, eTagRep, eEnableTag, eLink) => (eTag === areasLocal.entrances[eCategory].tag && eTagRep === false && eEnableTag && eLink === "")));
            if (tagEntrances.length !== 0) {
                areasLocal.entrances[tagEntrances[0]].tagRep = true;
                areasLocal.entrances[eCategory].tagRep = false;
            }
        }
        findVisibleAreas(shownAreas, areasLocal, entrancesLocal);
        entrancePools = loadEntrancePools(settings, allEntrances, areasLocal);
        let eRef = scroller.current[entranceRef];
        let rect = eRef.getBoundingClientRect();
        let oTop = rect.top;
        let scrollYLocal = oTop + window.scrollY;
        setAllAreas(areasLocal);
        setAreas(shownAreas);
        setEntrances(entrancePools);
        setScrollY(scrollYLocal);
        handleEntranceMenuClose(false);
    }

    const unLinkEntrance = (entrance: string, scrollRef: string): void => {
        let originator = entrance;
        console.log(originator,"[Disconnected]");
        let areasLocal = cloneDeep(allAreas);
        let shownAreas = cloneDeep(areas);
        let entrancesLocal = cloneDeep(allEntrances);
        let subArea = areasLocal.entrances[originator].aLink;
        let area = areasLocal.entrances[originator].area;
        if (areasLocal.entrances[originator].oneWay === true && areasLocal.entrances[originator].oneWayArea !== "") {
            area = areasLocal.entrances[originator].oneWayArea;
        }
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra","overworldoneway"];
        let unMixedDecoupled = ["boss", "noBossShuffle", "noDungeonShuffle"];
        let targetArea = areasLocal.entrances[subArea].area;
        if (areasLocal.entrances[subArea].oneWay === true && areasLocal.entrances[subArea].oneWayArea !== "") {
            targetArea = areasLocal.entrances[subArea].oneWayArea;
        }
        areasLocal.entrances[originator].aLink = "";
        shownAreas[area].entrances[originator].aLink = "";
        areasLocal.entrances[originator].userALink = "";
        shownAreas[area].entrances[originator].userALink = "";
        
        if (!(alwaysOneWay.includes(areasLocal.entrances[originator].type))) {
            areasLocal.entrances[subArea].eLink = "";
            shownAreas[targetArea].entrances[subArea].eLink = "";
            areasLocal.entrances[subArea].userELink = "";
            shownAreas[targetArea].entrances[subArea].userELink = "";
            if (areasLocal.entrances[subArea].type === "overworld" && areasLocal.entrances[subArea].oneWay && areasLocal.entrances[subArea].oneWayArea !== "") {
                shownAreas[areasLocal.entrances[subArea].area].entrances[subArea].eLink = "";
                shownAreas[areasLocal.entrances[subArea].area].entrances[subArea].userELink = "";
            }
        } else {
            areasLocal.entrances[subArea].oneWayELink = "";
            shownAreas[targetArea].entrances[subArea].oneWayELink = "";
            areasLocal.entrances[subArea].userOneWayELink = "";
            shownAreas[targetArea].entrances[subArea].userOneWayELink = "";
        }
        if (settings["Decoupled Entrances"] === "Off" || (unMixedDecoupled.includes(areasLocal.entrances[originator].type))) {
            if (!(alwaysOneWay.includes(areasLocal.entrances[originator].type))) {
                let revSubArea;
                let revTargetE;
                if (areasLocal.entrances[subArea].type === "overworld") {
                    revSubArea = subArea;
                } else {
                    revSubArea = areasLocal.entrances[subArea].reverse;
                }
                if (areasLocal.entrances[originator].type === "overworld") {
                    revTargetE = originator;
                } else {
                    revTargetE = areasLocal.entrances[originator].reverse;
                }
                let revArea = areasLocal.entrances[revSubArea].area;
                let revTargetArea = areasLocal.entrances[revTargetE].area;
                areasLocal.entrances[revSubArea].aLink = "";
                shownAreas[revArea].entrances[revSubArea].aLink = "";
                areasLocal.entrances[revTargetE].eLink = "";
                shownAreas[revTargetArea].entrances[revTargetE].eLink = "";
                areasLocal.entrances[revSubArea].userALink = "";
                shownAreas[revArea].entrances[revSubArea].userALink = "";
                areasLocal.entrances[revTargetE].userELink = "";
                shownAreas[revTargetArea].entrances[revTargetE].userELink = "";
            }
        }

        if (areasLocal.entrances[subArea].tag !== "") {
            let tagEntrances = (filterTags(areasLocal.entrances, (eTag, eTagRep, eEnableTag, eLink) => (eTag === areasLocal.entrances[subArea].tag && eTagRep === true && eLink === "")));
            if (tagEntrances.length === 0) {
                areasLocal.entrances[subArea].tagRep = true;
            }
        }

        findVisibleAreas(shownAreas, areasLocal, entrancesLocal);
        let entrancePools = loadEntrancePools(settings, entrancesLocal, areasLocal);
        let eRef = scroller.current[scrollRef];
        let rect = eRef.getBoundingClientRect();
        let oTop = rect.top;
        let scrollYLocal = oTop + window.scrollY;
        setAllAreas(areasLocal);
        setAllEntrances(entrancesLocal);
        setAreas(shownAreas);
        setEntrances(entrancePools);
        setScrollY(scrollYLocal);
        setEntranceRef(scrollRef);
    }

    const toggleWalletTiers = (location: string): void => {
        let originator = location;
        console.log(originator,"[wallet tier change]");
        let areasLocal = cloneDeep(areas);
        let allAreasLocal = cloneDeep(allAreas);
        let allEntrancesLocal = cloneDeep(allEntrances);
        let tier;
        allAreasLocal.locations[originator].walletTier === 3 ?
            tier = 0
            : tier = allAreasLocal.locations[originator].walletTier + 1;
        allAreasLocal.locations[originator].walletTier = tier;
        if (allAreasLocal.locations[originator].area !== "") {
            areasLocal[allAreasLocal.locations[originator].area].locations[originator].walletTier = tier;
        }
        if (allAreasLocal.locations[originator].lKey !== "") {
            allEntrancesLocal.entrances[allAreasLocal.locations[originator].lKey].locations[originator].walletTier = tier;
        }
        setAllAreas(allAreasLocal);
        setAllEntrances(allEntrancesLocal);
        setAreas(areasLocal);
    }

    const updateShopPrice = (location: string, priceValue: string): void => {
        let originator = location;
        let price: number;
        if (priceValue === "") {
            price = 0;
        } else {
            price = parseInt(priceValue);
        }
        console.log(originator,"[costs]",price);
        let areasLocal = cloneDeep(areas);
        let allAreasLocal = cloneDeep(allAreas);
        let allEntrancesLocal = cloneDeep(allEntrances);
        allAreasLocal.locations[originator].price = price;
        if (allAreasLocal.locations[originator].area !== "") {
            areasLocal[allAreasLocal.locations[originator].area].locations[originator].price = price;
        }
        if (allAreasLocal.locations[originator].lKey !== "") {
            allEntrancesLocal.entrances[allAreasLocal.locations[originator].lKey].locations[originator].price = price;
        }
        setAllAreas(allAreasLocal);
        setAllEntrances(allEntrancesLocal);
        setAreas(areasLocal);
    }

    const checkLocation = (location: string): void => {
        let originator = location;
        console.log(originator, "[Checked]");
        let areasLocal = cloneDeep(areas);
        let allAreasLocal = cloneDeep(allAreas);
        let allEntrancesLocal = cloneDeep(allEntrances);
        allAreasLocal.locations[originator].check = "checked";
        if (allAreasLocal.locations[originator].area !== "") {
            areasLocal[allAreasLocal.locations[originator].area].locations[originator].check = "checked";
        }
        if (allAreasLocal.locations[originator].lKey !== "") {
            allEntrancesLocal.entrances[allAreasLocal.locations[originator].lKey].locations[originator].check = "checked";
        }
        setAllAreas(allAreasLocal);
        setAllEntrances(allEntrancesLocal);
        setAreas(areasLocal);
        handleItemMenuClose();
    }

    const unCheckLocation = (location: string): void => {
        let originator = location;
        console.log(originator, "[Unchecked]");
        let areasLocal = cloneDeep(areas);
        let allAreasLocal = cloneDeep(allAreas);
        let allEntrancesLocal = cloneDeep(allEntrances);
        allAreasLocal.locations[originator].check = "";
        if (allAreasLocal.locations[originator].area !== "") {
            areasLocal[allAreasLocal.locations[originator].area].locations[originator].check = "";
        }
        if (allAreasLocal.locations[originator].lKey !== "") {
            allEntrancesLocal.entrances[allAreasLocal.locations[originator].lKey].locations[originator].check = "";
        }
        setAllAreas(allAreasLocal);
        setAllEntrances(allEntrancesLocal);
        setAreas(areasLocal);
    }

    const findItem: MouseEventHandler<HTMLDivElement> = (ootItem): void => {
        let originator = ootItem.currentTarget.getAttribute('data-found-in');
        let foundItem = ootItem.currentTarget.getAttribute('data-found-item');
        if (originator === null || foundItem === null) return;
        foundItem === "" ?  console.log(originator,"[cleared]") :
                            console.log(originator,"[holds]",foundItem);
        let areasLocal = cloneDeep(areas);
        let allAreasLocal = cloneDeep(allAreas);
        let allEntrancesLocal = cloneDeep(allEntrances);
        allAreasLocal.locations[originator].foundItem = foundItem;
        if (allAreasLocal.locations[originator].area !== "") {
            areasLocal[allAreasLocal.locations[originator].area].locations[originator].foundItem = foundItem;
        }
        if (allAreasLocal.locations[originator].lKey !== "") {
            allEntrancesLocal.entrances[allAreasLocal.locations[originator].lKey].locations[originator].foundItem = foundItem;
        }
        setAllAreas(allAreasLocal);
        setAllEntrances(allEntrancesLocal);
        setAreas(areasLocal);
        handleItemMenuClose();
        handleShopItemMenuClose();
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

    const handleEntranceMenuOpen = (entrance: MouseEvent<HTMLDivElement>, scrollRef: string): void => {
        console.log(entrance.currentTarget.getAttribute('data-source'),'-> Open menu');
        let dataSource = entrance.currentTarget.getAttribute('data-source');
        let dataConnector = entrance.currentTarget.getAttribute('data-connector');
        let dataEType = entrance.currentTarget.getAttribute('data-etype');
        setEntranceMenuOpen(entrance.currentTarget);
        setEntranceToLink(!!dataSource ? dataSource : '');
        setEntranceConnector(!!dataConnector ? dataConnector : '');
        setEntranceType(!!dataEType ? dataEType : '');
        setEntranceRef(scrollRef);
    }

    const handleEntranceMenuClose = (clearRef=true) => {
        let eRef = (clearRef === true) ? '' : entranceRef;
        setEntranceMenuOpen(null);
        setEntranceToLink('');
        setEntranceConnector('');
        setEntranceType('');
        setEntranceRef(eRef);
    }

    const buildEntranceURL = (reverseLink: string, useConnector: boolean = true): string => {
        let href = '#';
        if ((allAreas.entrances[reverseLink].type === "overworld") || (allAreas.entrances[reverseLink].isReverse)) {
            href = '#' + allAreas.entrances[reverseLink].area;
        } else if (allAreas.entrances[reverseLink].reverse !== '') {
            let reReverseLink = allAreas.entrances[allAreas.entrances[reverseLink].reverse].aLink;
            if (reReverseLink !== '') {
                if ((allAreas.entrances[reReverseLink].type === "overworld") || (allAreas.entrances[reReverseLink].isReverse)) {
                    href = '#' + allAreas.entrances[reReverseLink].area;
                } else {
                    href = buildEntranceURL(reReverseLink);
                }
            }
        }
        if (['warpsong', 'spawn', 'owldrop', 'extra', 'overworldoneway'].includes(allAreas.entrances[reverseLink].type)) {
            if (useConnector) {
                let connectorList = allAreas.entrances[reverseLink].connector;
                if (!(Array.isArray(connectorList)) && connectorList !== "") {
                    if (allAreas.entrances[connectorList].aLink !== "") {
                        href = '#' + allAreas.entrances[allAreas.entrances[connectorList].aLink].area;
                    }
                } else {
                    href = '#' + allAreas.entrances[reverseLink].area;
                }
            } else {
                href = '#' + allAreas.entrances[reverseLink].oneWayArea;
            }
        }
        if (allAreas.entrances[reverseLink].type === "dungeon" || allAreas.entrances[reverseLink].type === "dungeonGanon") {
            if (allAreas.entrances[reverseLink].isReverse === true) {
                href = '#' + allAreas.entrances[reverseLink].area;
            } else {
                href = '#' + allAreas.entrances[reverseLink].alias;
            }
        }
        return href;
    }

    const handleDungeonTravel = (entrance: string, useConnector: boolean = true) => {
        let eType = allAreas.entrances[entrance].type;
        if (settings["View"] === "Overworld" && (eType === "dungeon" || eType === "dungeonGanon") && allAreas.entrances[entrance].isReverse === false) {
            changeSetting({"target": { "name": "View", "value": "Dungeons" }});
        }
        if (settings["View"] === "Dungeons" && ((eType !== "dungeon" && eType !== "dungeonGanon") || ((eType === "dungeon" || eType === "dungeonGanon") && allAreas.entrances[entrance].isReverse === true))) {
            changeSetting({"target": { "name": "View", "value": "Overworld" }});
        }
        let href = buildEntranceURL(entrance, useConnector);
        if (href !== '#') {
            setDelayedURL(href);
        }
    }

    const isWarpAreaLinked = (entrance: string) => {
        let linked = false;
        if (allAreas.entrances[entrance].aLink !== '') {
            let href = buildEntranceURL(allAreas.entrances[entrance].aLink);
            if (href !== '#') {
                linked = true;
            }
        }
        return linked;
    }

    const handleWarpMenu = (area: string) => {
        let eType;
        if (areas[area].dungeon !== true) {
            eType = 'overworld';
        } else {
            eType = 'dungeon';
        }
        if (settings["View"] === "Overworld" && eType === "dungeon") {
            changeSetting({"target": { "name": "View", "value": "Dungeons" }});
        } else if (settings["View"] === "Dungeons" && eType !== "dungeon") {
            changeSetting({"target": { "name": "View", "value": "Overworld" }});
        }
        let href = '#' + area;
        setDelayedURL(href);
        setExpandWarpMenu(false);
        setExpandDungeonMenu(false);
    }

    const toggleAreaView = () => {
        if (settings["View"] === "Overworld") {
            changeSetting({"target": { "name": "View", "value": "Dungeons" }});
        } else {
            changeSetting({"target": { "name": "View", "value": "Overworld" }});
        }
    }

    const contextMenuHandler = new ContextMenuHandler(handleItemMenuOpen);
    const shopContextMenuHandler = new ContextMenuHandler(handleShopItemMenuOpen);
    const areaMenuHandler = new ContextMenuHandler(toggleAreaView);
    const reverseCollapseHandler = new ContextMenuHandler(toggleCollapseReverse);

    // Revisit after conversion to functional components
    //const customTheme = themeDark ? dark : light;
    //const { classes } = this.props;
    const customTheme = createTheme({});
    if (trackerInitialized) {
        let mixedPoolsType = settings["Mixed Pools"];
        let mixedPools: string[];
        if (!Array.isArray(mixedPoolsType) && typeof mixedPoolsType === 'string') {
            mixedPools = [mixedPoolsType];
        } else if (typeof mixedPoolsType === 'boolean') {
            mixedPools = [];
        } else {
            mixedPools = mixedPoolsType;
        }
        return (
            <React.Fragment>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <div className={themeDark ? "root dark" : "root"}>
                        <AppBar
                            position="fixed"
                        >
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    aria-label="open drawer"
                                    onClick={() => setOpenSettings(!openSettings)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <div className="title">
                                    <div>
                                        <div className="titleText">{settings["View"]}</div>
                                    </div>
                                </div>
                                <div className="checkCount">
                                    {
                                        !!allAreas && !!(allAreas.locations) ?
                                        Object.keys(allAreas.locations).filter(l => {
                                            return allAreas.locations[l].shuffled &&
                                                    allAreas.locations[l].check !== "";
                                        }).length : 0
                                    }
                                    /
                                    {
                                        !!allAreas && !!(allAreas.locations) ?
                                        Object.keys(allAreas.locations).filter(l => {
                                            return allAreas.locations[l].shuffled;
                                        }).length : 0
                                    }
                                </div>
                                <button
                                    onClick={() => setAlertReset(true)}
                                    className="menuButton"
                                >
                                    <span className="menuButtonLabel">Reset</span>
                                </button>
                                {/*<button
                                    onClick={() => {
                                        let darkMode = !themeDark;
                                        setThemeDark(darkMode);
                                    }}
                                    className="menuButton"
                                >
                                    {
                                        themeDark ?
                                            <span className="menuButtonLabel"><Brightness7Icon />Light Mode</span> :
                                            <span className="menuButtonLabel"><Brightness3Icon />Dark Mode</span>
                                    }
                                </button>*/}
                            </Toolbar>
                        </AppBar>
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
                                <Button onClick={() => resetState(settings)}>Yes</Button>
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
                            <div className="drawerHeader" />
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
                        </Drawer>
                        <EntranceMenu
                            anchorLocation={entranceMenuOpen}
                            handleClose={handleEntranceMenuClose}
                            handleLink={linkEntrance}
                            entrancePool={entranceType in oneWayEntrances ?
                                            oneWayEntrances[entranceType] :
                                            entrances[entranceType]}
                            allAreas={allAreas}
                            connector={entranceConnector === 'true'}
                            title={entranceToLink ? allAreas.entrances[entranceToLink].area : ''}
                            oneWay={entranceToLink ? allAreas.entrances[entranceToLink].oneWay : false}
                            decoupled={settings["Decoupled Entrances"] === "On"}
                            isReverse={entranceToLink ? allAreas.entrances[entranceToLink].isReverse : false}
                            sourceEntrance={entranceToLink}
                            id="globalEntranceMenu"
                        />
                        <ItemMenu
                            handleClose={handleItemMenuClose}
                            handleFind={findItem}
                            anchorLocation={itemMenuOpen}
                            sourceLocation={locationToLink}
                        />
                        <ShopItemMenu
                            handleClose={handleShopItemMenuClose}
                            handleFind={findItem}
                            anchorLocation={shopItemMenuOpen}
                            sourceLocation={locationToLink}
                        />
                        <div 
                            id="warpMenu"
                            className="warpMenu"
                        >
                            <div
                                id="warpMenuVisible"
                                className="warpMenuVisible"
                            >
                                <OotIcon
                                    itemName="Kokiri Sword"
                                    className={isWarpAreaLinked('Child Spawn -> KF Links House') ?
                                        "locationMenuIcon" :
                                        "grayscaleMenuIcon"}
                                    onClick={isWarpAreaLinked('Child Spawn -> KF Links House') ?
                                        () => handleDungeonTravel(allAreas.entrances['Child Spawn -> KF Links House'].aLink)
                                        : () => handleDungeonTravel('Child Spawn -> KF Links House', false)}
                                />
                                <OotIcon
                                    itemName="Master Sword"
                                    className={isWarpAreaLinked('Adult Spawn -> Temple of Time') ?
                                        "locationMenuIcon" :
                                        "grayscaleMenuIcon"}
                                    onClick={isWarpAreaLinked('Adult Spawn -> Temple of Time') ?
                                        () => handleDungeonTravel(allAreas.entrances['Adult Spawn -> Temple of Time'].aLink)
                                        : () => handleDungeonTravel('Adult Spawn -> Temple of Time', false)}
                                />
                                <div className="warpSongsBig">
                                    <OotIcon
                                        itemName="Minuet of Forest"
                                        className={isWarpAreaLinked('Minuet of Forest Warp -> Sacred Forest Meadow') ?
                                            "locationMenuIcon" :
                                            "grayscaleMenuIcon"}
                                        onClick={isWarpAreaLinked('Minuet of Forest Warp -> Sacred Forest Meadow') ?
                                            () => handleDungeonTravel(allAreas.entrances['Minuet of Forest Warp -> Sacred Forest Meadow'].aLink)
                                            : () => handleDungeonTravel('Minuet of Forest Warp -> Sacred Forest Meadow', false)}
                                    />
                                    <OotIcon
                                        itemName="Bolero of Fire"
                                        className={isWarpAreaLinked('Bolero of Fire Warp -> DMC Central Local') ?
                                            "locationMenuIcon" :
                                            "grayscaleMenuIcon"}
                                        onClick={isWarpAreaLinked('Bolero of Fire Warp -> DMC Central Local') ?
                                            () => handleDungeonTravel(allAreas.entrances['Bolero of Fire Warp -> DMC Central Local'].aLink)
                                            : () => handleDungeonTravel('Bolero of Fire Warp -> DMC Central Local', false)}
                                    />
                                    <OotIcon
                                        itemName="Serenade of Water"
                                        className={isWarpAreaLinked('Serenade of Water Warp -> Lake Hylia') ?
                                            "locationMenuIcon" :
                                            "grayscaleMenuIcon"}
                                        onClick={isWarpAreaLinked('Serenade of Water Warp -> Lake Hylia') ?
                                            () => handleDungeonTravel(allAreas.entrances['Serenade of Water Warp -> Lake Hylia'].aLink)
                                            : () => handleDungeonTravel('Serenade of Water Warp -> Lake Hylia', false)}
                                    />
                                    <OotIcon
                                        itemName="Requiem of Spirit"
                                        className={isWarpAreaLinked('Requiem of Spirit Warp -> Desert Colossus') ?
                                            "locationMenuIcon" :
                                            "grayscaleMenuIcon"}
                                        onClick={isWarpAreaLinked('Requiem of Spirit Warp -> Desert Colossus') ?
                                            () => handleDungeonTravel(allAreas.entrances['Requiem of Spirit Warp -> Desert Colossus'].aLink)
                                            : () => handleDungeonTravel('Requiem of Spirit Warp -> Desert Colossus', false)}
                                    />
                                    <OotIcon
                                        itemName="Nocturne of Shadow"
                                        className={isWarpAreaLinked('Nocturne of Shadow Warp -> Graveyard Warp Pad Region') ?
                                            "locationMenuIcon" :
                                            "grayscaleMenuIcon"}
                                        onClick={isWarpAreaLinked('Nocturne of Shadow Warp -> Graveyard Warp Pad Region') ?
                                            () => handleDungeonTravel(allAreas.entrances['Nocturne of Shadow Warp -> Graveyard Warp Pad Region'].aLink)
                                            : () => handleDungeonTravel('Nocturne of Shadow Warp -> Graveyard Warp Pad Region', false)}
                                    />
                                    <OotIcon
                                        itemName="Prelude of Light"
                                        className={isWarpAreaLinked('Prelude of Light Warp -> Temple of Time') ?
                                            "locationMenuIcon" :
                                            "grayscaleMenuIcon"}
                                        onClick={isWarpAreaLinked('Prelude of Light Warp -> Temple of Time') ?
                                            () => handleDungeonTravel(allAreas.entrances['Prelude of Light Warp -> Temple of Time'].aLink)
                                            : () => handleDungeonTravel('Prelude of Light Warp -> Temple of Time', false)}
                                    />
                                </div>
                                <div className="warpSongsSmall">
                                    <ClickAwayListener onClickAway={() => expandSongMenu ? setExpandSongMenu(false) : null}>
                                        <div
                                            className="iconDiv"
                                            onClick={() => setExpandSongMenu(!expandSongMenu)}
                                        >
                                            {<QueueMusicIcon className={Object.keys(allAreas.entrances).filter((e) => (allAreas.entrances[e].type === 'warpsong' && allAreas.entrances[e].aLink !== '')).length > 0 ?
                                                "expandWarpMenu" :
                                                "warpSongsBlank"}
                                            />}
                                        </div>
                                    </ClickAwayListener>
                                </div>
                                <ClickAwayListener onClickAway={() => expandWarpMenu ? setExpandWarpMenu(false) : null}>
                                    <div
                                        className="iconDiv"
                                        onClick={() => setExpandWarpMenu(!expandWarpMenu)}
                                        onContextMenu={areaMenuHandler.onContextMenu}
                                        onTouchStart={areaMenuHandler.onTouchStart}
                                        onTouchCancel={areaMenuHandler.onTouchCancel}
                                        onTouchEnd={areaMenuHandler.onTouchEnd}
                                        onTouchMove={areaMenuHandler.onTouchMove}
                                    >
                                        {<PublicIcon className="expandWarpMenu" />}
                                    </div>
                                </ClickAwayListener>
                                <ClickAwayListener onClickAway={() => expandDungeonMenu ? setExpandDungeonMenu(false) : null}>
                                    <div
                                        className="iconDiv"
                                        onClick={() => setExpandDungeonMenu(!expandDungeonMenu)}
                                        onContextMenu={areaMenuHandler.onContextMenu}
                                        onTouchStart={areaMenuHandler.onTouchStart}
                                        onTouchCancel={areaMenuHandler.onTouchCancel}
                                        onTouchEnd={areaMenuHandler.onTouchEnd}
                                        onTouchMove={areaMenuHandler.onTouchMove}
                                    >
                                        {<MeetingRoomIcon className="expandWarpMenu" />}
                                    </div>
                                </ClickAwayListener>
                            </div>
                            <Collapse
                                in={expandSongMenu}
                                timeout='auto'
                                unmountOnExit
                                className="warpAreaList"
                            >
                                { Object.keys(allAreas.entrances).filter((e) => (allAreas.entrances[e].type === 'warpsong' && allAreas.entrances[e].aLink !== '')).map((song, ia) => {
                                    return (
                                        <span
                                            key={'quickSongMenu'+ia}
                                            className="warpMenuArea"
                                            onClick={() => handleDungeonTravel(allAreas.entrances[song].aLink)}
                                        >
                                            {allAreas.entrances[song].alias}
                                        </span>
                                    );
                                })}
                            </Collapse>
                            <Collapse
                                in={expandWarpMenu}
                                timeout='auto'
                                unmountOnExit
                                className="warpAreaList"
                            >
                                { Object.keys(areas).sort().filter((a) => (!(areas[a].dungeon))).map((area, ia) => {
                                    return (
                                        <span
                                            key={'quickAreaMenu'+ia}
                                            className={areas[area].show ? 
                                                "warpMenuArea" :
                                                "warpMenuAreaHidden"}
                                            onClick={areas[area].show ?
                                                () => handleWarpMenu(area)
                                                : undefined}
                                        >
                                            {area}
                                        </span>
                                    );
                                })}
                            </Collapse>
                            <Collapse
                                in={expandDungeonMenu}
                                timeout='auto'
                                unmountOnExit
                                className="warpAreaList"
                            >
                                { Object.keys(areas).sort().filter((a) => (areas[a].dungeon)).map((area, ia) => {
                                    return (
                                        <span
                                            key={'quickDungeonMenu'+ia}
                                            className="warpMenuArea"
                                            onClick={() => handleWarpMenu(area)}
                                        >
                                            {area}
                                        </span>
                                    );
                                })}
                            </Collapse>
                        </div>
                        <div
                            className={openSettings ? "areaPaper areaPaperShift" : "areaPaper"}
                        >
                            <div className="drawerHeader" />
                            {
                                settings["View"] === "Overworld" ?
                                Object.keys(areas).sort().filter((a) => (areas[a].show && !(areas[a].dungeon))).map((area, ia) => { 
                                    return (
                                        <GameArea
                                            title={area}
                                            entrances={areas[area].entrances}
                                            entrancePools={entrances}
                                            oneWayEntrancePools={oneWayEntrances}
                                            mixedPools={mixedPools}
                                            decoupled={settings["Decoupled Entrances"] === "On"}
                                            allEntrances={allEntrances}
                                            allAreas={allAreas}
                                            locations={areas[area].locations}
                                            handleLink={linkEntrance}
                                            handleUnLink={unLinkEntrance}
                                            handleCheck={checkLocation}
                                            handleUnCheck={unCheckLocation}
                                            handleContextMenu={contextMenuHandler}
                                            handleShopContextMenu={shopContextMenuHandler}
                                            handleEntranceMenuOpen={handleEntranceMenuOpen}
                                            toggleWalletTiers={toggleWalletTiers}
                                            updateShopPrice={updateShopPrice}
                                            showShops={settings["Show Locations"] !== "No"}
                                            showShopInput={settings["Shop Price Tracking"] === "Both" || settings["Shop Price Tracking"] === "Price Only"}
                                            showShopRupee={settings["Shop Price Tracking"] === "Both" || settings["Shop Price Tracking"] === "Wallet Tier"}
                                            handleDungeonTravel={handleDungeonTravel}
                                            dungeon={false}
                                            showUnshuffledEntrances={settings["Show Unshuffled Entrances"] === "Yes"}
                                            collapseSwitch={toggleCollapse}
                                            reverseCollapseSwitch={reverseCollapseHandler}
                                            mqSwitch={toggleMQ}
                                            isMQ={false}
                                            setRef={setRef}
                                            key={ia}
                                        />
                                    )
                                }) :
                                Object.keys(areas).sort().filter((a) => (areas[a].dungeon)).map((area, ia) => {
                                    let isMQType = settings[area+" MQ"];
                                    let isMQ: boolean;
                                    if (typeof isMQType !== 'boolean') {
                                        isMQ = false;
                                    } else {
                                        isMQ = isMQType;
                                    }
                                    return (
                                        <GameArea
                                            title={area}
                                            entrances={areas[area].entrances}
                                            entrancePools={entrances}
                                            oneWayEntrancePools={oneWayEntrances}
                                            mixedPools={mixedPools}
                                            decoupled={settings["Decoupled Entrances"] === "On"}
                                            allEntrances={allEntrances}
                                            allAreas={allAreas}
                                            locations={areas[area].locations}
                                            handleLink={linkEntrance}
                                            handleUnLink={unLinkEntrance}
                                            handleCheck={checkLocation}
                                            handleUnCheck={unCheckLocation}
                                            handleContextMenu={contextMenuHandler}
                                            handleShopContextMenu={shopContextMenuHandler}
                                            handleEntranceMenuOpen={handleEntranceMenuOpen}
                                            toggleWalletTiers={toggleWalletTiers}
                                            updateShopPrice={updateShopPrice}
                                            showShops={settings["Show Locations"] !== "No"}
                                            showShopInput={settings["Shop Price Tracking"] === "Both" || settings["Shop Price Tracking"] === "Price Only"}
                                            showShopRupee={settings["Shop Price Tracking"] === "Both" || settings["Shop Price Tracking"] === "Wallet Tier"}
                                            handleDungeonTravel={handleDungeonTravel}
                                            dungeon={true}
                                            showUnshuffledEntrances={settings["Show Unshuffled Entrances"] === "Yes"}
                                            collapseSwitch={toggleCollapse}
                                            reverseCollapseSwitch={reverseCollapseHandler}
                                            mqSwitch={toggleMQ}
                                            isMQ={isMQ}
                                            setRef={setRef}
                                            key={ia}
                                        />
                                    )
                                })
                            }
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

// ========================================

//Tracker.propTypes = {
//    classes: PropTypes.object.isRequired,
//};

//export default withStyles(useStyles, { withTheme: true })(Tracker)
export default Tracker