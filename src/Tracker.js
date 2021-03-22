import React from 'react';
import clsx from 'clsx';
import ls from 'local-storage';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import clone from 'lodash/clone';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
//import Brightness7Icon from '@material-ui/icons/Brightness7';
//import Brightness3Icon from '@material-ui/icons/Brightness3';
import ListItem from '@material-ui/core/ListItem';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';


import GameSetting from './GameSetting';
import GameArea from './GameArea';

import death_mountain_crater from './data/locations/death_mountain_crater.json';
import death_mountain_trail from './data/locations/death_mountain_trail.json';
import desert_colossus from './data/locations/desert_colossus.json';
import gerudo_fortress from './data/locations/gerudo_fortress.json';
import gerudo_valley from './data/locations/gerudo_valley.json';
import goron_city from './data/locations/goron_city.json';
import graveyard from './data/locations/graveyard.json';
import haunted_wasteland from './data/locations/haunted_wasteland.json';
import hyrule_field from './data/locations/hyrule_field.json';
import kakariko_village from './data/locations/kakariko_village.json';
import kokiri_forest from './data/locations/kokiri_forest.json';
import lake_hylia from './data/locations/lake_hylia.json';
import lon_lon_ranch from './data/locations/lon_lon_ranch.json';
import lost_woods from './data/locations/lost_woods.json';
import market from './data/locations/market.json';
import sacred_forest_meadow from './data/locations/sacred_forest_meadow.json';
import spawn_points from './data/locations/spawn_points.json';
import warp_songs from './data/locations/warp_songs.json';
import zora_fountain from './data/locations/zora_fountain.json';
import zora_river from './data/locations/zora_river.json';
import zoras_domain from './data/locations/zoras_domain.json';
import deku_tree from './data/locations/deku_tree.json';
import dodongos_cavern from './data/locations/dodongos_cavern.json';
import jabu_jabus_belly from './data/locations/jabu_jabus_belly.json';
import forest_temple from './data/locations/forest_temple.json';
import fire_temple from './data/locations/fire_temple.json';
import water_temple from './data/locations/water_temple.json';
import shadow_temple from './data/locations/shadow_temple.json';
import spirit_temple from './data/locations/spirit_temple.json';
import bottom_of_the_well from './data/locations/bottom_of_the_well.json';
import ice_cavern from './data/locations/ice_cavern.json';
import gerudo_training_ground from './data/locations/gerudo_training_ground.json';
import ganons_castle from './data/locations/ganons_castle.json';


import devr from './data/versions/dev6.0.41r-1.json';
//import weekly from './data/settings_presets/standard_weekly.json'
import rsl from './data/settings_presets/random-settings-league.json';
import { Link } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: blueGrey[600],
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    menuButton: {
    },
    title: {
        flexGrow: 1,
    },
    titleText: {
        'font-family': 'Hylia Serif Beta',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0,1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerContainer: {
        overflow: 'auto',
    },
    areaPaper: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        padding: 20,
    },
    areaPaperShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        padding: 20,
    },
    areaCard: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            marginRight: 20,
        },
        display: 'inline-block',
        maxWidth: '100%',
        marginBottom: 20,
        'vertical-align': 'top',
        backgroundColor: '#cbc26d',
    },
    areaHeader: {
        padding: theme.spacing(0.75),
    },
    areaTitle: {
        backgroundColor: yellow[200],
        display: 'flex',
        'flex-direction': 'row',
        padding: theme.spacing(1, 2),
        alignItems: 'center',
    },
    areaTitleText: {
        flexGrow: 1,
    },
    mqSwitchLabel: {
        marginLeft: theme.spacing(3),
    },
    areaButton: {
        marginLeft: theme.spacing(1),
    },
    areaContent: {
        padding: 0,
    },
    locationList: {
        margin: 0,
        padding: 0,
    },
    locationContainer: {
        padding: theme.spacing(1,2),
        backgroundColor: grey[200],
    },
    locationIcon: {
        marginRight: theme.spacing(2),
        width: '24px',
    },
    locationIconBlank: {
        marginRight: theme.spacing(2)+24,
    },
    locationText: {
        flexGrow: 1,
    },
    locationMark: {
        marginRight: 2,
        marginLeft: theme.spacing(3),
    },
    entranceContainer: {
        display: 'flex',
        'justify-content': 'space-between',
        padding: theme.spacing(1,2),
        alignItems: 'center',
        backgroundColor: grey[50],
    },
    entranceLabel: {
        'vertical-align': 'center',
        'margin-right': 20,
        'font-weight': 'bold',
        flexGrow: 1,
    },
    linkLabel: {
        'vertical-align': 'center',
        textAlign: 'right',
    },
    entranceMenu: {
    },
    entranceLink: {
        textAlign: 'right',
    },
    entranceLink1: {
        'font-weight': 'bold',
    },
    entranceLink2: {
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    devLink: {
        padding: theme.spacing(1, 0),
    }
});

//const light = createMuiTheme({
//    palette: {
//        type: 'light',
//    },
//});

//const dark = createMuiTheme({
//    palette: {
//        type: 'dark',
//    },
//});
  
class Tracker extends React.Component {
    constructor(props) {
        super(props);
        let areaJSON = merge(death_mountain_crater, death_mountain_trail, desert_colossus,
            gerudo_fortress, gerudo_valley, goron_city, graveyard, haunted_wasteland,
            hyrule_field, kakariko_village, kokiri_forest, lake_hylia, lon_lon_ranch,
            lost_woods, market, sacred_forest_meadow, spawn_points, warp_songs,
            zora_fountain, zora_river, zoras_domain, deku_tree, dodongos_cavern, jabu_jabus_belly,
            forest_temple, fire_temple, water_temple, shadow_temple, spirit_temple,
            bottom_of_the_well, ice_cavern, gerudo_training_ground, ganons_castle);
        //let settings = rsl.Settings;
        //let allAreas = this.addReverseEntrances(areaJSON);
        //let allEntrances = merge({}, this.categorizeEntrances(allAreas));
        let settings = !!(ls.get('RandoSettings')) ? ls.get('RandoSettings') : rsl.Settings;
        let allAreas = !!(ls.get('AllAreas')) ? ls.get('AllAreas') : this.addReverseEntrances(areaJSON);
        let allEntrances = !!(ls.get('AllEntrances')) ? ls.get('AllEntrances') : merge({}, this.categorizeEntrances(allAreas));
        this.findVisibleLocations(settings, allAreas);
        let areas = this.loadAreas(settings, allAreas, allEntrances, true);
        let entrances = this.loadEntrancePools(settings, allEntrances, allAreas);
        let oneWayEntrances = this.loadOneWayEntrancePools(settings, allEntrances, allAreas);

        let darkMode = !!(ls.get('DarkMode')) ? true : ls.get('DarkMode');

        this.linkEntrance = this.linkEntrance.bind(this);
        this.unLinkEntrance = this.unLinkEntrance.bind(this);
        this.checkLocation = this.checkLocation.bind(this);
        this.unCheckLocation = this.unCheckLocation.bind(this);
        this.resetState = this.resetState.bind(this);
        this.cancelAlert = this.cancelAlert.bind(this);
        this.toggleMQ = this.toggleMQ.bind(this);

        this.state = {
            enabled_settings: devr.Settings,
            settings: settings,
            areas: areas,
            entrances: entrances,
            oneWayEntrances: oneWayEntrances,
            allEntrances: allEntrances,
            allAreas: allAreas,
            openSettings: false,
            themeDark: darkMode,
            anchorEl: null,
            alertReset: false,
        };
    }

    resetState() {
        let settings = rsl.Settings;
        let areaJSON = merge(death_mountain_crater, death_mountain_trail, desert_colossus,
            gerudo_fortress, gerudo_valley, goron_city, graveyard, haunted_wasteland,
            hyrule_field, kakariko_village, kokiri_forest, lake_hylia, lon_lon_ranch,
            lost_woods, market, sacred_forest_meadow, spawn_points, warp_songs,
            zora_fountain, zora_river, zoras_domain, deku_tree, dodongos_cavern, jabu_jabus_belly,
            forest_temple, fire_temple, water_temple, shadow_temple, spirit_temple,
            bottom_of_the_well, ice_cavern, gerudo_training_ground, ganons_castle);
        let allAreas = this.addReverseEntrances(areaJSON);
        let allEntrances = merge({}, this.categorizeEntrances(allAreas));
        this.findVisibleLocations(settings, allAreas);
        let areas = this.loadAreas(settings, allAreas, allEntrances, true);
        let entrances = this.loadEntrancePools(settings, allEntrances, allAreas);
        let oneWayEntrances = this.loadOneWayEntrancePools(settings, allEntrances, allAreas);

        // TODO: Separate tracker and world/preset settings
        let prevSettings = cloneDeep(this.state.settings);
        settings["Show Unshuffled Entrances"] = prevSettings["Show Unshuffled Entrances"];
        settings["Show Locations"] = prevSettings["Show Locations"];
        settings["Show Unshuffled Skulls"] = prevSettings["Show Unshuffled Skulls"];

        this.setState({
            settings: settings,
            areas: areas,
            entrances: entrances,
            oneWayEntrances: oneWayEntrances,
            allEntrances: allEntrances,
            allAreas: allAreas,
            alertReset: false,
        });
        ls.set('RandoSettings', settings);
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
    }

    addReverseEntrances(stateAreas) {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allAreas = cloneDeep(stateAreas);
        let rEntrances = {};
        let eEntrance;
        let rEntrance;
        Object.keys(allAreas.entrances).forEach(entrance => {
            if (allAreas.entrances[entrance].reverse !== "" && allAreas.entrances[entrance].oneWay === false && allAreas.entrances[entrance].type !== "overworld") {
                rEntrance = allAreas.entrances[entrance].reverse;
                eEntrance = {};
                eEntrance[rEntrance] = clone(allAreas.entrances[entrance]);
                eEntrance[rEntrance].reverse = entrance;
                eEntrance[rEntrance].isReverse = true;
                eEntrance[rEntrance].tagRep = false;
                eEntrance[rEntrance].tag = ""
                eEntrance[rEntrance].connector = ""
                eEntrance[rEntrance].alias = allAreas.entrances[entrance].reverseAlias
                eEntrance[rEntrance].reverseAlias = allAreas.entrances[entrance].alias
                eEntrance[rEntrance].lKey = ""
                rEntrances = merge(rEntrances, eEntrance);
            }
        });
        let areas = { entrances: rEntrances };
        return merge(allAreas, areas);
    }

    getShuffledTypes(settings) {
        let erSettings = [];
        if (settings["Shuffle Interiors"] === "Simple" || settings["Shuffle Interiors"] === "All") {
            erSettings.push("interior");
        }
        if (settings["Shuffle Interiors"] === "All") {
            erSettings.push("specialInterior");
        }
        if (settings["Shuffle Grottos"] === "On") {
            erSettings.push("grotto");
            erSettings.push("grave");
        }
        if (settings["Shuffle Dungeons"] === "On") {
            erSettings.push("dungeon");
        }
        if (settings["Shuffle Overworld"] === "On") {
            erSettings.push("overworld");
        }
        if (settings["Shuffle Warp Songs"] === "On") {
            erSettings.push("warpsong");
        }
        if (settings["Shuffle Spawn Points"] === "On") {
            erSettings.push("spawn");
        }
        if (settings["Shuffle Owls"] === "On") {
            erSettings.push("owldrop");
        }
        if (settings["Shuffle Warp Songs"] === "On" || settings["Shuffle Spawn Points"] === "On" || settings["Shuffle Owls"] === "On") {
            erSettings.push("extra");
        }
        return erSettings;
    }

    loadAreas(settings, allAreas, allEntrances, init = false) {
        let areas = {};
        let erSettings = this.getShuffledTypes(settings);
        let subArea;
        let eAreas = [];
        let eLocation;
        let eEntrance;
        Object.keys(allAreas.entrances).forEach((entrance) => {
            subArea = allAreas.entrances[entrance];
            eAreas = [];
            if (subArea.oneWay && subArea.oneWayArea !== "" && subArea.type === "overworld") {
                eAreas.push(subArea.oneWayArea);
                eAreas.push(subArea.area);
            } else if (subArea.oneWay && subArea.oneWayArea !== "") {
                eAreas.push(subArea.oneWayArea);
            } else {
                eAreas.push(subArea.area);
            }
            eAreas.forEach(eArea => {
                if ((!(allAreas.hasOwnProperty(eArea))) && init) {
                    if (!(allAreas.hasOwnProperty(eArea))) {
                        if (subArea.oneWay && subArea.oneWayArea !== "" && subArea.type !== "overworld") {
                            allAreas[eArea] = { show: true, dungeon: false, entrances: {}, locations: {} };
                        } else {
                            allAreas[eArea] = { show: false, dungeon: false, entrances: {}, locations: {} };
                        }
                    }
                }
                if (!(areas.hasOwnProperty(eArea))) {
                    areas[eArea] = { show: allAreas[eArea].show, dungeon: false, entrances: {}, locations: {} };
                }
                eEntrance = {};
                eEntrance[entrance] = allAreas.entrances[entrance];
                if (!(erSettings.includes(subArea.type))) {
                    if (eEntrance[entrance].type !== 'overworld') {
                        if (eEntrance[entrance].type !== 'extra') {
                            eEntrance[entrance].aLink = entrance;
                            eEntrance[entrance].eLink = entrance;
                        }
                    } else {
                        if (entrance !== 'GV Lower Stream -> Lake Hylia') {
                            eEntrance[entrance].eLink = eEntrance[entrance].reverse;
                            eEntrance[entrance].aLink = eEntrance[entrance].reverse;
                        }
                    }
                } else {
                    eEntrance[entrance].eLink = allAreas.entrances[entrance].userELink;
                    eEntrance[entrance].aLink = allAreas.entrances[entrance].userALink;
                }
                areas[eArea].entrances = merge(areas[eArea].entrances, eEntrance);
            });
        });
        let eArea = "";
        let eDungeon = "";
        Object.keys(allAreas.locations).forEach((location) => {
            if (allAreas.locations[location].visible === true) {
                // Ganon's Castle is never shuffled, so it doesn't have a key
                // in allAreas.entrances to activate the dungeon check
                if (allAreas.locations[location].lKey !== "Ganon's Castle") {
                    eArea = allAreas.locations[location].area;
                    if (eArea !== "") {
                        if (!(allAreas.hasOwnProperty(eArea)) && init) { 
                            allAreas[eArea] = { show: false, dungeon: false, entrances: {}, locations: {} };
                        }
                        if (!(areas.hasOwnProperty(eArea))) {
                            areas[eArea] = { show: allAreas[eArea].show, dungeon: false, entrances: {}, locations: {} };
                        }
                        eLocation = {};
                        eLocation[location] = allAreas.locations[location];
                        areas[eArea].locations = merge(areas[eArea].locations, eLocation);
                    } else if (allAreas.entrances[allAreas.locations[location].lKey].type === 'dungeon') {
                        eDungeon = allAreas.entrances[allAreas.locations[location].lKey].alias;
                        if (!(allAreas.hasOwnProperty(eDungeon)) && init) { 
                            allAreas[eDungeon] = { show: false, dungeon: true, entrances: {}, locations: {} };
                        }
                        if (!(areas.hasOwnProperty(eDungeon))) {
                            areas[eDungeon] = { show: false, dungeon: true, entrances: {}, locations: {} };
                        }
                        eLocation = {};
                        eLocation[location] = allAreas.locations[location];
                        areas[eDungeon].locations = merge(areas[eDungeon].locations, eLocation);
                    }
                } else {
                    eDungeon = "Ganon's Castle"
                    if (!(allAreas.hasOwnProperty(eDungeon)) && init) { 
                        allAreas[eDungeon] = { show: false, dungeon: true, entrances: {}, locations: {} };
                    }
                    if (!(areas.hasOwnProperty(eDungeon))) {
                        areas[eDungeon] = { show: false, dungeon: true, entrances: {}, locations: {} };
                    }
                    eLocation = {};
                    eLocation[location] = allAreas.locations[location];
                    areas[eDungeon].locations = merge(areas[eDungeon].locations, eLocation);
                }
            }
        });
        return areas;
    }

    categorizeEntrances(stateAreas) {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allAreas = cloneDeep(stateAreas);
        let entrances = {};
        let eType;
        let eRevType;
        let area;
        Object.keys(allAreas.entrances).forEach(entrance => {
            eType = allAreas.entrances[entrance].type;
            entrances[entrance] = { type: eType, category: "", locations: {} };
            entrances[allAreas.entrances[entrance].reverse] = { type: eType, category: "", locations: {} };
            if (eType === "overworld" || eType === "spawn" || eType === "warpsong" || eType === "owldrop" || eType === "extra") {
                if (!(entrances.hasOwnProperty(eType))) {
                    entrances[eType] = {};
                }
                if (allAreas.entrances[entrance].oneWay && allAreas.entrances[entrance].oneWayArea !== "") {
                    area = allAreas.entrances[entrance].oneWayArea;
                } else {
                    area = allAreas.entrances[entrance].area;
                }
                if (!(entrances[eType].hasOwnProperty(area))) {
                    entrances[eType][area] = [];
                }
                entrances[eType][area].push(entrance);
            }
            if (eType === "interior" || eType === "specialInterior" || eType === "grave" || eType === "grotto" || eType === "dungeon") {
                if (!(entrances.hasOwnProperty(eType))) {
                    entrances[eType] = [];
                }
                entrances[eType].push(entrance);
                if (allAreas.entrances[entrance].isReverse) {
                    eRevType = "reverse" + eType;
                    area = allAreas.entrances[entrance].area;
                    if (!(entrances.hasOwnProperty(eRevType))) {
                        entrances[eRevType] = {};
                    }
                    if (!(entrances[eRevType].hasOwnProperty(area))) {
                        entrances[eRevType][area] = [];
                    }
                    entrances[eRevType][area].push(entrance);
                }
            }
        });
        let entrance;
        let eLocation;
        Object.keys(allAreas.locations).forEach(location => {
            if (allAreas.locations[location].lKey !== "" && allAreas.locations[location].lKey !== "Ganon's Castle") {
                entrance = allAreas.locations[location].lKey;
                eLocation = {};
                eLocation[location] = allAreas.locations[location];
                entrances[entrance].locations = merge(entrances[entrance].locations, eLocation);
            }
        });
        entrances["linked"] = [];
        entrances["oneWayAreas"] = [];
        entrances["oneWayAreas"].push("Spawn Points");
        entrances["oneWayAreas"].push("Warp Songs");
        return entrances;
    }

    loadEntrancePools(settings, stateEntrances, stateAreas) {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allEntrances = cloneDeep(stateEntrances);
        let allAreas = cloneDeep(stateAreas);
        Object.filterOWEntrances = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].type, entrances[key].eLink, entrances[key].area) );
        Object.filterReverseEntrances = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].type, entrances[key].eLink, entrances[key].area, entrances[key].isReverse) );
        Object.filterEntrances = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].type, entrances[key].eLink, entrances[key].isReverse) );
        let entrances = {};
        let mixedpool = {};
        let oOverworld = {};
        Object.keys(allEntrances.overworld).forEach(area => {
            oOverworld[area] = (Object.filterOWEntrances(allAreas.entrances, (eType, eLink, eArea) => eType === "overworld" && eLink === "" && eArea === area));
        });
        //if (settings["Decoupled Entrances"] === "On") {
        //    oOverworld['Lake Hylia'].push('GV Lower Stream -> Lake Hylia');
        //}
        let oExtra = {};
        Object.keys(allEntrances.extra).forEach(area => {
            oExtra[area] = (Object.filterOWEntrances(allAreas.entrances, (eType, eLink, eArea) => eType === "extra" && eLink === "" && eArea === area));
        });
        let oWarpSong = {};
        Object.keys(allEntrances.warpsong).forEach(area => {
            oWarpSong[area] = (Object.filterOWEntrances(allAreas.entrances, (eType, eLink, eArea) => eType === "warpsong" && eLink === "" && eArea === area));
        });
        let oOwlDrop = {};
        Object.keys(allEntrances.owldrop).forEach(area => {
            oOwlDrop[area] = (Object.filterOWEntrances(allAreas.entrances, (eType, eLink, eArea) => eType === "owldrop" && eLink === "" && eArea === area));
        });
        let oInteriors = {};
        let oReverseInteriors = {};
        let oDecoupledInteriors = {};
        let eInteriors = [];
        eInteriors.push(...(Object.filterEntrances(allAreas.entrances, (eType, eLink, eReverse) => eType === "interior" && eLink === "" && eReverse === false)));
        Object.keys(allEntrances.reverseinterior).forEach(area => {
            oReverseInteriors[area] = (Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => eType === "interior" && eLink === "" && eArea === area && eReverse === true));
        });
        Object.keys(allEntrances.reversespecialInterior).forEach(area => {
            if (!(oReverseInteriors.hasOwnProperty(area))) {
                oReverseInteriors[area] = [];
            }
            oReverseInteriors[area].push(...(Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => eType === "specialInterior" && eLink === "" && eArea === area && eReverse === true)));
        });
        if (settings["Shuffle Interiors"] === "All") {
            eInteriors.push(...(Object.filterEntrances(allAreas.entrances, (eType, eLink, eReverse) => eType === "specialInterior" && eLink === "" && eReverse === false)));
        }
        oInteriors = { "Interiors": eInteriors };
        oDecoupledInteriors = merge(clone(oInteriors), clone(oReverseInteriors));
        let oDungeons = {};
        let oReverseDungeons = {};
        let oDecoupledDungeons = {};
        let eDungeons = [];
        eDungeons.push(...(Object.filterEntrances(allAreas.entrances, (eType, eLink, eReverse) => eType === "dungeon" && eLink === "" && eReverse === false)));
        Object.keys(allEntrances.reversedungeon).forEach(area => {
            oReverseDungeons[area] = (Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => eType === "dungeon" && eLink === "" && eArea === area && eReverse === true));
        });
        oDungeons = { "Dungeons": eDungeons };
        oDecoupledDungeons = merge(clone(oDungeons), clone(oReverseDungeons));
        let oGrottos = {};
        let oReverseGrottos = {};
        let oDecoupledGrottos = {};
        let eGrottos = [];
        eGrottos.push(...(Object.filterEntrances(allAreas.entrances, (eType, eLink, eReverse) => (eType === "grotto" || eType === "grave") && eLink === "" && eReverse === false)));
        Object.keys(allEntrances.reversegrotto).forEach(area => {
            oReverseGrottos[area] = (Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => (eType === "grotto") && eLink === "" && eArea === area && eReverse === true));
        });
        Object.keys(allEntrances.reversegrave).forEach(area => {
            if (!(oReverseGrottos.hasOwnProperty(area))) {
                oReverseGrottos[area] = [];
            }
            oReverseGrottos[area].push(...(Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => (eType === "grave") && eLink === "" && eArea === area && eReverse === true)));
        });
        oGrottos = { "Grottos": eGrottos };
        oDecoupledGrottos = merge(clone(oGrottos), clone(oReverseGrottos));
        if (settings["Shuffle Overworld"] === "On") {
            if (settings["Mixed Pools"] === "On") {
                mixedpool = merge(mixedpool, {"mixed": oOverworld});
            }
            entrances = merge(entrances, {"overworld": oOverworld});
        }
        if (settings["Shuffle Interiors"] === "Simple" || settings["Shuffle Interiors"] === "All") {
            mixedpool = merge(mixedpool, {"mixed": oInteriors, "mixed_reverse": oReverseInteriors, "mixed_decoupled": oDecoupledInteriors});
            entrances = merge(entrances, {"interior": oInteriors, "interior_reverse": oReverseInteriors, "interior_decoupled": oDecoupledInteriors});
        }
        if (settings["Shuffle Grottos"] === "On") {
            mixedpool = merge(mixedpool, {"mixed": oGrottos, "mixed_reverse": oReverseGrottos, "mixed_decoupled": oDecoupledGrottos});
            entrances = merge(entrances, {"grotto": oGrottos, "grotto_reverse": oReverseGrottos, "grotto_decoupled": oDecoupledGrottos});
            entrances = merge(entrances, {"grave": oGrottos, "grave_reverse": oReverseGrottos, "grave_decoupled": oDecoupledGrottos});
        }
        if (settings["Shuffle Dungeons"] === "On") {
            mixedpool = merge(mixedpool, {"mixed": oDungeons, "mixed_reverse": oReverseDungeons, "mixed_decoupled": oDecoupledDungeons});
            entrances = merge(entrances, {"dungeon": oDungeons, "dungeon_reverse": oReverseDungeons, "dungeon_decoupled": oDecoupledDungeons});
        }
        if (settings["Shuffle Warp Songs"] === "On") {
            entrances = merge(entrances, {"warpsong": [], "warpsong_reverse": [], "warpsong_decoupled": []});
        }
        if (settings["Shuffle Owls"] === "On") {
            entrances = merge(entrances, {"owldrop": [], "owldrop_reverse": [], "owldrop_decoupled": []});
        }
        if (settings["Shuffle Spawn Points"] === "On") {
            entrances = merge(entrances, {"spawn": [], "spawn_reverse": [], "spawn_decoupled": []});
        }
        entrances = merge(entrances, mixedpool);
        return entrances;
    }

    loadOneWayEntrancePools(settings, stateEntrances, stateAreas) {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allEntrances = cloneDeep(stateEntrances);
        let allAreas = cloneDeep(stateAreas);
        let entrances = {};

        let eOverworld = {};
        Object.keys(allEntrances.overworld).forEach(area => {
            eOverworld[area] = (clone(allEntrances.overworld[area]));
        });

        Object.keys(allEntrances.extra).forEach(area => {
            if (!(Object.keys(eOverworld).includes(area))) {
                eOverworld[area] = [];
            }
            eOverworld[area].push(...((allEntrances.extra[area])));
        });
        let iGV = eOverworld['Gerudo Valley'].indexOf('GV Lower Stream -> Lake Hylia');
        if (iGV > -1) {
            eOverworld['Gerudo Valley'].splice(iGV, 1);
        }
        if (settings['Decoupled Entrances'] === 'On') {
            eOverworld['Lake Hylia'].push('GV Lower Stream -> Lake Hylia');
        }

        let eInteriors = [];
        eInteriors.push(...((allEntrances.interior.filter(int => allAreas.entrances[int].isReverse === false))));
        eInteriors.push(...((allEntrances.specialInterior.filter(int => allAreas.entrances[int].isReverse === false))));
        let oInteriors = { "Interiors": eInteriors };

        let eOverworldInteriors = {};
        Object.keys(allEntrances.reverseinterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                if (!(Object.keys(eOverworld).includes(area))) {
                    eOverworldInteriors[area] = [];
                } else {
                    eOverworldInteriors[area] = clone(eOverworld[area]);
                }
            }
            eOverworldInteriors[area].push(...((allEntrances.reverseinterior[area])));
        });
        Object.keys(allEntrances.reversespecialInterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                if (!(Object.keys(eOverworld).includes(area))) {
                    eOverworldInteriors[area] = [];
                } else {
                    eOverworldInteriors[area] = clone(eOverworld[area]);
                }
            }
            eOverworldInteriors[area].push(...((allEntrances.reversespecialInterior[area])))
        });

        let eOwlDrops = [];
        Object.keys(allEntrances.owldrop).forEach(area => {
            eOwlDrops.push(...((allEntrances.owldrop[area])));
        });
        let oOwlDrops = { "Owl Drops": eOwlDrops };

        let eSpawnPoints = [];
        eSpawnPoints.push(...((allEntrances.spawn["Spawn Points"])));
        let oSpawnPoints = { "Spawn Points": eSpawnPoints };
        
        let eWarpSongs = [];
        Object.keys(allEntrances.warpsong).forEach(area => {
            eWarpSongs.push(...((allEntrances.warpsong[area])));
        });
        let oWarpSongs = { "Warp Song Pads": eWarpSongs };
        
        let oExtOwlDrops = merge(oWarpSongs, eOverworld, oOwlDrops);
        let oExtWarpSongs = merge(oSpawnPoints, oWarpSongs, eOverworldInteriors, oInteriors, oOwlDrops);
        let oExtSpawnPoints = merge(oSpawnPoints, oWarpSongs, eOverworldInteriors, oInteriors, oOwlDrops);
        entrances = {
                        "spawn": oExtSpawnPoints,
                        "owldrop": oExtOwlDrops,
                        "warpsong": oExtWarpSongs
                    };
        return entrances;
    }

    setShuffledEntrances(settings, allAreas) {
        let tempAreas = cloneDeep(allAreas);
        let erSettings = this.getShuffledTypes(settings);
        Object.keys(tempAreas.entrances).forEach(entrance => {
            if (erSettings.includes(tempAreas.entrances[entrance].type)) {
                tempAreas.entrances[entrance].shuffled = true;
            } else {
                tempAreas.entrances[entrance].shuffled = false;
            }
        });
        return tempAreas; 
    }

    changeSetting(setting) {
        console.log(setting.target.name, setting.target.value);
        let settings = cloneDeep(this.state.settings);
        let allEntrances = cloneDeep(this.state.allEntrances);
        let allAreas = cloneDeep(this.state.allAreas);
        settings[setting.target.name] = setting.target.value;
        allAreas = this.setShuffledEntrances(settings, allAreas);
        this.findVisibleLocations(settings, allAreas);
        let areas = this.loadAreas(settings, allAreas, allEntrances);
        let entrances = this.loadEntrancePools(settings, allEntrances, allAreas);
        let oneWayEntrances = this.loadOneWayEntrancePools(settings, allEntrances, allAreas);
        this.findVisibleAreas(areas, allAreas, allEntrances, settings);
        this.setState({
            settings: settings,
            entrances: entrances,
            oneWayEntrances: oneWayEntrances,
            areas: areas,
            allAreas: allAreas,
            anchorEl: null,
        });
        ls.set('RandoSettings', settings);
        ls.set('AllAreas', allAreas);
    }

    toggleMQ(dungeon) {
        let settings = cloneDeep(this.state.settings);
        let isMQ = !(settings[dungeon]);
        this.changeSetting({"target":{"name":dungeon,"value":isMQ}});
    }

    findVisibleAreas(shownAreas, allAreas, entrances, settings=this.state.settings) {
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        let decoupled = settings["Decoupled Entrances"] === "On";
        Object.filterAreas = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].eLink, entrances[key].aLink, entrances[key].isReverse, entrances[key].oneWay, entrances[key].shuffled, entrances[key].type, key, entrances[key].oneWayArea, entrances[key].connector) );
        Object.keys(shownAreas).forEach(targetArea => {
            let linkedTargetEntrances = (Object.filterAreas(shownAreas[targetArea].entrances, (eLink, aLink, isReverse, isOneWay, shuffled, lType, e, oneWayArea, connector) => (
                (isOneWay && aLink !== "" && (lType !== "overworld" && lType !== "owldrop")) ||
                (eLink !== "" && oneWayArea !== targetArea && ((isReverse === true && (shuffled === true || decoupled || e === "KF Links House -> Kokiri Forest")) || lType === "overworld" || lType === "warpsong" || lType === "owldrop" || lType === "extra"))) ));
            if (linkedTargetEntrances.length === 0 && !(entrances["oneWayAreas"].includes(targetArea))) {
                shownAreas[targetArea].show = false;
                allAreas[targetArea].show = false;
            } else {
                shownAreas[targetArea].show = true;
                allAreas[targetArea].show = true;
            }
        });
        alwaysOneWay.forEach(oneType => {
            Object.keys(entrances[oneType]).forEach(aOneWay => {
                entrances[oneType][aOneWay].forEach(eOneWay => {
                    if (allAreas.entrances[eOneWay].aLink !== "" && allAreas[allAreas.entrances[eOneWay].oneWayArea].show === true) {
                        if (allAreas.entrances[allAreas.entrances[eOneWay].aLink].isReverse === true || allAreas.entrances[allAreas.entrances[eOneWay].aLink].type === "overworld" ||
                        (allAreas.entrances[allAreas.entrances[eOneWay].aLink].oneWay === true && allAreas.entrances[allAreas.entrances[eOneWay].aLink].oneWayArea !== "")) {
                            shownAreas[allAreas.entrances[allAreas.entrances[eOneWay].aLink].area].show = true;
                            allAreas[allAreas.entrances[allAreas.entrances[eOneWay].aLink].area].show = true;
                        }
                    }
                });
            });
        });

        // Hard code Gerudo Valley to Lake with decoupled off
        if (shownAreas['Gerudo Valley'].show === true && (settings['Decoupled Entrances'] === 'Off' || settings['Shuffle Overworld'] === 'Off')) {
            shownAreas['Lake Hylia'].show = true;
            allAreas['Lake Hylia'].show = true;
        }

        // Hard code LW Bridge and LW visibility if one or the other is visible
        // Can't merge into one area since Kokiri Forest has an exit to LW and LW Bridge each,
        // causing possible naming confusion. This is important if/when logic is added
        if (shownAreas['Lost Woods'].show === true) {
            shownAreas['Lost Woods Bridge'].show = true;
            allAreas['Lost Woods Bridge'].show = true;
        } else if (shownAreas['Lost Woods Bridge'].show === true) {
            shownAreas['Lost Woods'].show = true;
            allAreas['Lost Woods'].show = true;
        }

        // Filter areas with no visible entrances or locations
        Object.hideAreas = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].shuffled, entrances[key].type) );
        Object.hideAreaLocations = (locations, predicate) =>
            Object.keys(locations)
                .filter( key => predicate(locations[key].visible) );
        if (settings["Show Unshuffled Entrances"] === "No") {
            Object.keys(shownAreas).filter((a) => (shownAreas[a].show)).forEach(targetArea => {
                let shownEntrances = (Object.hideAreas(shownAreas[targetArea].entrances, (shuffled, type) => ( (shuffled || type === 'spawn') && type !== 'extra' )));
                let shownLocations = (Object.hideAreaLocations(shownAreas[targetArea].entrances, (shuffled, type) => ( (shuffled || type === 'spawn') && type !== 'extra' )));
                // Special case for unshuffled spawn points with shuffled interiors all
                // due to the connector implementation
                if ((shownEntrances.length === 0 && ((settings["Show Locations"] === "Yes" && shownLocations.length !== 0) || settings["Show Locations"] !== "Yes")) ||
                (targetArea === 'Spawn Points' && settings["Shuffle Spawn Points"] === "Off" && settings["Shuffle Interiors"] !== "All")) {
                    shownAreas[targetArea].show = false;
                    allAreas[targetArea].show = false;
                }
            });
        }
    }

    findVisibleLocations(settings, allAreas) {
        let andVisible;
        let andCount;
        let orVisible;
        let orCount;
        let interiorsOnly;
        Object.keys(allAreas.locations).forEach((location) => {
            if (settings["Show Locations"] === "Yes" || settings["Show Locations"] === "Interiors Only") {
                interiorsOnly = (settings["Show Locations"] === "Interiors Only");
                if (allAreas.locations[location].settings.length > 0) {
                    andVisible = true;
                    orVisible = false;
                    andCount = 0;
                    orCount = 0;
                    allAreas.locations[location].settings.forEach(s => {
                        if (s.required === true) { andCount++; } else { orCount++; }
                        if (settings[s.setting] === s.value && s.required === true) { andVisible = true && andVisible;  }
                        if (settings[s.setting] !== s.value && s.required === true) { andVisible = false; }
                        if (settings[s.setting] === s.value && s.required === false) { orVisible = true; }
                    });
                    allAreas.locations[location].visible = (((allAreas.locations[location].area !== "" && !(interiorsOnly)) || allAreas.locations[location].area === "") && (andVisible === (andCount >= 0)) && (orVisible === (orCount > 0)));
                } else {
                    allAreas.locations[location].visible = ((allAreas.locations[location].area !== "" && !(interiorsOnly)) || allAreas.locations[location].area === "");
                }
            } else {
                allAreas.locations[location].visible = false;
            }
        });
    }

    linkEntrance(entrance) {
        let originator = entrance.target.name;
        let eCategory = entrance.target.value;
        console.log(originator, "<>", eCategory,"[Connected]");
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        let areas = cloneDeep(this.state.allAreas);
        let shownAreas = cloneDeep(this.state.areas);
        let entrances = cloneDeep(this.state.allEntrances);
        let area = areas.entrances[originator].area;
        let entrancePools;
        if (areas.entrances[originator].oneWay === true && areas.entrances[originator].oneWayArea !== "") {
            area = areas.entrances[originator].oneWayArea;
        }
        let targetArea = areas.entrances[eCategory].area;
        if (areas.entrances[eCategory].oneWay === true && areas.entrances[eCategory].oneWayArea !== "") {
            targetArea = areas.entrances[eCategory].oneWayArea;
        }
        if (this.state.settings["Decoupled Entrances"] === "Off" && !(alwaysOneWay.includes(areas.entrances[originator].type))) {
            let revECategory;
            let revTargetE;
            if (areas.entrances[eCategory].type === "overworld") {
                revECategory = eCategory;
            } else {
                revECategory = areas.entrances[eCategory].reverse;
            }
            if (areas.entrances[originator].type === "overworld") {
                revTargetE = originator;
            } else {
                revTargetE = areas.entrances[originator].reverse;
            }
            let revArea = areas.entrances[revECategory].area;
            let revTargetArea = areas.entrances[revTargetE].area;
            areas.entrances[revECategory].aLink = revTargetE;
            shownAreas[revArea].entrances[revECategory].aLink = revTargetE;
            areas.entrances[revECategory].userALink = revTargetE;
            shownAreas[revArea].entrances[revECategory].userALink = revTargetE;
            areas.entrances[revTargetE].eLink = revECategory;
            shownAreas[revTargetArea].entrances[revTargetE].eLink = revECategory;
            areas.entrances[revTargetE].userELink = revECategory;
            shownAreas[revTargetArea].entrances[revTargetE].userELink = revECategory;
        }
        areas.entrances[originator].aLink = eCategory;
        shownAreas[area].entrances[originator].aLink = eCategory;
        areas.entrances[originator].userALink = eCategory;
        shownAreas[area].entrances[originator].userALink = eCategory;
        if (!(alwaysOneWay.includes(areas.entrances[originator].type))) {
            areas.entrances[eCategory].eLink = originator;
            shownAreas[targetArea].entrances[eCategory].eLink = originator;
            areas.entrances[eCategory].userELink = originator;
            shownAreas[targetArea].entrances[eCategory].userELink = originator;
            if (areas.entrances[eCategory].type === "overworld" && areas.entrances[eCategory].oneWay && areas.entrances[eCategory].oneWayArea !== "") {
                shownAreas[areas.entrances[eCategory].area].entrances[eCategory].eLink = originator;
                shownAreas[areas.entrances[eCategory].area].entrances[eCategory].userELink = originator;
            }
        } else {
            areas.entrances[eCategory].oneWayELink = originator;
            shownAreas[targetArea].entrances[eCategory].oneWayELink = originator;
            areas.entrances[eCategory].userOneWayELink = originator;
            shownAreas[targetArea].entrances[eCategory].userOneWayELink = originator;
        }

        Object.filterTags = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].tag, entrances[key].tagRep, entrances[key].eLink) );
        if (areas.entrances[eCategory].tagRep) {
            let tagEntrances = (Object.filterTags(areas.entrances, (eTag, eTagRep, eLink) => (eTag === areas.entrances[eCategory].tag && eTagRep === false && eLink === "")));
            if (tagEntrances.length !== 0) {
                areas.entrances[tagEntrances[0]].tagRep = true;
            }
            areas.entrances[eCategory].tagRep = false;
        }
        this.findVisibleAreas(shownAreas, areas, entrances);
        entrancePools = this.loadEntrancePools(this.state.settings, this.state.allEntrances, areas);
        this.setState({
            allAreas: areas,
            areas: shownAreas,
            entrances: entrancePools,
        });
        ls.set('AllAreas', areas);
    }

    unLinkEntrance(entrance) {
        let originator = entrance;
        console.log(originator,"[Disconnected]");
        let areas = cloneDeep(this.state.allAreas);
        let shownAreas = cloneDeep(this.state.areas);
        let entrances = cloneDeep(this.state.allEntrances);
        let subArea = areas.entrances[originator].aLink;
        let area = areas.entrances[originator].area;
        if (areas.entrances[originator].oneWay === true && areas.entrances[originator].oneWayArea !== "") {
            area = areas.entrances[originator].oneWayArea;
        }
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        let targetArea = areas.entrances[subArea].area;
        if (areas.entrances[subArea].oneWay === true && areas.entrances[subArea].oneWayArea !== "") {
            targetArea = areas.entrances[subArea].oneWayArea;
        }
        Object.filterAreas = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].aLink, entrances[key].shuffled, entrances[key].type) );
        areas.entrances[originator].aLink = "";
        shownAreas[area].entrances[originator].aLink = "";
        areas.entrances[originator].userALink = "";
        shownAreas[area].entrances[originator].userALink = "";
        
        if (!(alwaysOneWay.includes(areas.entrances[originator].type))) {
            areas.entrances[subArea].eLink = "";
            shownAreas[targetArea].entrances[subArea].eLink = "";
            areas.entrances[subArea].userELink = "";
            shownAreas[targetArea].entrances[subArea].userELink = "";
            if (areas.entrances[subArea].type === "overworld" && areas.entrances[subArea].oneWay && areas.entrances[subArea].oneWayArea !== "") {
                shownAreas[areas.entrances[subArea].area].entrances[subArea].eLink = "";
                shownAreas[areas.entrances[subArea].area].entrances[subArea].userELink = "";
            }
        } else {
            areas.entrances[subArea].oneWayELink = "";
            shownAreas[targetArea].entrances[subArea].oneWayELink = "";
            areas.entrances[subArea].userOneWayELink = "";
            shownAreas[targetArea].entrances[subArea].userOneWayELink = "";
        }
        if (this.state.settings["Decoupled Entrances"] === "Off") {
            if (!(alwaysOneWay.includes(entrances[originator].type))) {
                let revSubArea;
                let revTargetE;
                if (areas.entrances[subArea].type === "overworld") {
                    revSubArea = subArea;
                } else {
                    revSubArea = areas.entrances[subArea].reverse;
                }
                if (areas.entrances[originator].type === "overworld") {
                    revTargetE = originator;
                } else {
                    revTargetE = areas.entrances[originator].reverse;
                }
                let revArea = areas.entrances[revSubArea].area;
                let revTargetArea = areas.entrances[revTargetE].area;
                areas.entrances[revSubArea].aLink = "";
                shownAreas[revArea].entrances[revSubArea].aLink = "";
                areas.entrances[revTargetE].eLink = "";
                shownAreas[revTargetArea].entrances[revTargetE].eLink = "";
                areas.entrances[revSubArea].userALink = "";
                shownAreas[revArea].entrances[revSubArea].userALink = "";
                areas.entrances[revTargetE].userELink = "";
                shownAreas[revTargetArea].entrances[revTargetE].userELink = "";
            }
        }
        
        Object.filterTags = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].tag, entrances[key].tagRep, entrances[key].eLink) );
        if (areas.entrances[subArea].tag !== "") {
            let tagEntrances = (Object.filterTags(areas.entrances, (eTag, eTagRep, eLink) => (eTag === areas.entrances[subArea].tag && eTagRep === true && eLink === "")));
            if (tagEntrances.length === 0) {
                areas.entrances[subArea].tagRep = true;
            }
        }

        this.findVisibleAreas(shownAreas, areas, entrances);
        let entrancePools = this.loadEntrancePools(this.state.settings, entrances, areas);
        this.setState({
            allAreas: areas,
            allEntrances: entrances,
            areas: shownAreas,
            entrances: entrancePools,
        });
        ls.set('AllAreas', areas);
        ls.set('AllEntrances', entrances);
    }

    checkLocation(location) {
        let originator = location;
        console.log(originator, "[Checked]");
        let areas = cloneDeep(this.state.areas);
        let allAreas = cloneDeep(this.state.allAreas);
        let allEntrances = cloneDeep(this.state.allEntrances);
        allAreas.locations[originator].check = "checked";
        if (allAreas.locations[originator].area !== "") {
            areas[allAreas.locations[originator].area].locations[originator].check = "checked";
        }
        if (allAreas.locations[originator].lKey !== "") {
            if (allAreas.locations[originator].lKey === "Ganon's Castle") {
                areas["Ganon's Castle"].locations[originator].check = "checked";
            } else {
                allEntrances[allAreas.locations[originator].lKey].locations[originator].check = "checked";
            }
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
    }

    unCheckLocation(location) {
        let originator = location;
        console.log(originator, "[Unchecked]");
        let areas = cloneDeep(this.state.areas);
        let allAreas = cloneDeep(this.state.allAreas);
        let allEntrances = cloneDeep(this.state.allEntrances);
        allAreas.locations[originator].check = "";
        if (allAreas.locations[originator].area !== "") {
            areas[allAreas.locations[originator].area].locations[originator].check = "";
        }
        if (allAreas.locations[originator].lKey !== "") {
            if (allAreas.locations[originator].lKey === "Ganon's Castle") {
                areas["Ganon's Castle"].locations[originator].check = "";
            } else {
                allEntrances[allAreas.locations[originator].lKey].locations[originator].check = "";
            }
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
    }

    cancelAlert() {
        this.setState({ alertReset: false, });
    }

    render() {
        // Revisit after conversion to functional components
        //const customTheme = this.state.themeDark ? dark : light;
        const customTheme = createMuiTheme();
        const { classes } = this.props;
        return (
            <React.Fragment>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <div className={classes.root}>
                        <AppBar
                            position="fixed"
                            className={classes.appBar}
                        >
                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    aria-label="open drawer"
                                    onClick={() => this.setState({ openSettings: !this.state.openSettings })}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <List component="nav" className={classes.title}>
                                    { (this.state.settings["Show Locations"] === "Yes" || this.state.settings["Show Locations"] === "Interiors Only") ? 
                                    <ListItem
                                        button
                                        onClick={(e) => {
                                            if (this.state.settings["View"] === "Overworld") {
                                                this.changeSetting({"target": { "name": "View", "value": "Dungeons" }});
                                            } else {
                                                this.changeSetting({"target": { "name": "View", "value": "Overworld" }});
                                            }
                                        }}
                                    >
                                        <Typography className={classes.titleText} variant="h4">{this.state.settings["View"]}</Typography><ExpandMore />
                                    </ListItem> :
                                    <ListItem>
                                        <Typography className={classes.titleText} variant="h4">{this.state.settings["View"]}</Typography>
                                    </ListItem>
                                    }
                                </List>
                                <Button
                                    variant="contained"
                                    onClick={() => this.setState({alertReset: true,})}
                                    className={classes.menuButton}
                                >
                                    Reset
                                </Button>
                                {/*<Button
                                    variant="contained"
                                    onClick={() => {
                                        let darkMode = !this.state.themeDark;
                                        this.setState({ themeDark: darkMode, });
                                        ls.set('DarkMode',darkMode);
                                    }}
                                    className={classes.menuButton}
                                >
                                    {
                                        this.state.themeDark ?
                                            <React.Fragment><Brightness7Icon />Light Mode</React.Fragment> :
                                            <React.Fragment><Brightness3Icon />Dark Mode</React.Fragment>
                                    }
                                </Button>*/}
                            </Toolbar>
                        </AppBar>
                        <Dialog
                            open={this.state.alertReset}
                            onClose={() => this.cancelAlert()}
                        >
                            <DialogTitle>{"Reset Tracker?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    All entrance and location checks will be cleared. Are you sure?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.resetState()}>Yes</Button>
                                <Button onClick={() => this.cancelAlert()}>No</Button>
                            </DialogActions>
                        </Dialog>
                        <Drawer
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={this.state.openSettings}
                            classes={{paper: classes.drawerPaper}}
                        >
                            <div className={classes.drawerHeader} />
                            <List className={classes.drawerContainer}>
                                {
                                    Object.keys(this.state.enabled_settings).map((setting,si) => {
                                        return (
                                            <GameSetting
                                                title={setting}
                                                settings={this.state.enabled_settings[setting]}
                                                userSettings={this.state.settings}
                                                onChange={(s) => this.changeSetting(s)}
                                                classes={classes}
                                                key={si}
                                            />
                                        )
                                    })
                                }
                                <ListItem>
                                    <Link className={classes.devLink} href="https://github.com/mracsys/tootr"><Typography>Github</Typography></Link>
                                </ListItem>
                            </List>
                        </Drawer>
                        <div
                            className={clsx(classes.areaPaper, {
                                [classes.areaPaperShift]: this.state.openSettings,
                            })}
                        >
                            <div className={classes.drawerHeader} />
                            {
                                this.state.settings["View"] === "Overworld" ?
                                Object.keys(this.state.areas).sort().filter((a) => (this.state.areas[a].show)).map((area, ia) => { 
                                    return (
                                        <GameArea
                                            title={area}
                                            entrances={this.state.areas[area].entrances}
                                            entrancePools={this.state.entrances}
                                            oneWayEntrancePools={this.state.oneWayEntrances}
                                            mixedPools={this.state.settings["Mixed Pools"]}
                                            decoupled={this.state.settings["Decoupled Entrances"] === "On"}
                                            overworld={this.state.settings["Shuffle Overworld"] === "On"}
                                            allEntrances={this.state.allEntrances}
                                            allAreas={this.state.allAreas}
                                            locations={this.state.areas[area].locations}
                                            handleLink={this.linkEntrance}
                                            handleUnLink={this.unLinkEntrance}
                                            handleCheck={this.checkLocation}
                                            handleUnCheck={this.unCheckLocation}
                                            classes={classes}
                                            dungeon={false}
                                            showUnshuffledEntrances={this.state.settings["Show Unshuffled Entrances"] === "Yes"}
                                            key={ia}
                                        />
                                    )
                                }) :
                                Object.keys(this.state.areas).sort().filter((a) => (this.state.areas[a].dungeon)).map((area, ia) => { 
                                    return (
                                        <GameArea
                                            title={area}
                                            entrances={this.state.areas[area].entrances}
                                            entrancePools={this.state.entrances}
                                            oneWayEntrancePools={this.state.oneWayEntrances}
                                            mixedPools={this.state.settings["Mixed Pools"]}
                                            decoupled={this.state.settings["Decoupled Entrances"] === "On"}
                                            overworld={this.state.settings["Shuffle Overworld"] === "On"}
                                            allEntrances={this.state.allEntrances}
                                            allAreas={this.state.allAreas}
                                            locations={this.state.areas[area].locations}
                                            handleLink={this.linkEntrance}
                                            handleUnLink={this.unLinkEntrance}
                                            handleCheck={this.checkLocation}
                                            handleUnCheck={this.unCheckLocation}
                                            classes={classes}
                                            dungeon={true}
                                            showUnshuffledEntrances={this.state.settings["Show Unshuffled Entrances"] === "Yes"}
                                            mqSwitch={this.toggleMQ}
                                            isMQ={this.state.settings[area+" MQ"]}
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
    }
}

// ========================================

Tracker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles, { withTheme: true })(Tracker)