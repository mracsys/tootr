import React from 'react';
import clsx from 'clsx';
import ls from 'local-storage';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';
import clone from 'lodash/clone';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
//import Brightness7Icon from '@material-ui/icons/Brightness7';
//import Brightness3Icon from '@material-ui/icons/Brightness3';
import ListItem from '@material-ui/core/ListItem';
import PublicIcon from '@material-ui/icons/Public';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Drawer } from '@material-ui/core';
import { Link } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

import GameSetting from './GameSetting';
import GameArea from './GameArea';
import EntranceMenu from './EntranceMenu';
import ItemMenu from './ItemMenu';
import ShopItemMenu from './ShopItemMenu.js';
import ContextMenuHandler from './ContextMenuHandler';

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
import OotIcon from './OotIcon';

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    scrollControl: {
        display: 'block',
        width: 0,
        height: 0,
        margin: 0,
        padding: 0,
        border: 0,
    },
    redAlert: {
        color: 'red',
        fontSize: '2em',
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
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: '#e0e0e0',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        padding: '6px 16px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.75',
        borderRadius: '4px',
        textTransform: 'uppercase',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        cursor: 'pointer',
        border: 0,
        margin: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        verticalAlign: 'middle',
        position: 'relative',
        outline: 0,
    },
    menuButtonLabel: {
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.75',
    },
    title: {
        flexGrow: 1,
        padding: theme.spacing(1.5,2),
    },
    titleText: {
        'font-family': 'Hylia Serif Beta',
        fontSize: '2.125rem',
    },
    checkCount: {
        'font-family': 'Hylia Serif Beta',
        fontSize: '1.5rem',
        marginRight: theme.spacing(2),
    },
    nested: {
        marginLeft: theme.spacing(4),
        fontSize: '1rem',
        color: 'rgba(0, 0, 0, 0.87)',
        boxSizing: 'border-box',
        position: 'relative',
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
        display: 'flex',
        flexDirection: 'column',
    },
    nestedWrapper: {
        display: 'inline-block',
    },
    wrapperWrapper: {
        display: 'block',
    },
    settingSelect: {
        font: 'inherit',
        borderRadius: 0,
        border: 0,
        minWidth: theme.spacing(2),
        cursor: 'pointer',
        paddingRight: theme.spacing(3),
        display: 'block',
        height: '1.1876em',
        margin: 0,
        padding: '6px 0px 7px 0.25em',
        boxSizing: 'content-box',
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        appearance: 'none',
        background: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'128\' height=\'128\' fill=\'black\'><polygon points=\'0,0 96,0 48,48\'/></svg>") no-repeat',
        backgroundSize: '12px',
        backgroundPosition: 'right 0.5em top 70%',
        backgroundRepeat: 'no-repeat',
    },
    settingText: {
        color: 'rgba(0, 0, 0, 0.54)',
        margin: 0,
        paddingTop: '3px',
        marginBottom: theme.spacing(2),
        textAlign: 'left',
        fontSize: '0.75rem',
        fontWeight: '400',
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
        borderTop: '1px solid rgba(0, 0, 0, 0.42)',
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
        padding: '20px 20px 56px 20px',
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
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    areaHeader: {
        padding: theme.spacing(0.75),
    },
    areaTitle: {
        backgroundColor: yellow[200],
        display: 'flex',
        'flex-direction': 'row',
        padding: theme.spacing(1, 2, 1, 0.5),
        alignItems: 'center',
    },
    areaTitleText: {
        fontFamily: 'Roboto,sans-serif',
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.6,
    },
    areaTitleCollapse: {
        flexGrow: 1,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    mqSwitchLabel: {
        marginLeft: theme.spacing(3),
        fontSize: '1rem',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
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
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'flex-start',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        "& $iconDiv": {
            padding: '0px 1em 0px 0px',
        },
    },
    shopContainer: {
        padding: theme.spacing(1,2),
        backgroundColor: grey[200],
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        verticalAlign: 'center',
        "& $iconDiv": {
            padding: '0px 1em 0px 0px',
        },
        "& div": {
            lineHeight: 0,
        }
    },
    fixedShopIcon: {
        lineHeight: 0,
        margin: 0,
        padding: 0,
        cursor: 'pointer',
        width: '24px',
        height: '24px',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1.75),
    },
    locationIcon: {
        marginRight: theme.spacing(2),
        width: '24px',
        height: '24px',
    },
    locationIconBlank: {
        marginRight: theme.spacing(2)+24,
    },
    locationText: {
        flexGrow: 1,
        margin: 0,
        textAlign: 'left',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.43',
    },
    locationMark: {
        marginRight: 2,
        marginLeft: theme.spacing(1),
    },
    locationPeek: {
        marginLeft: theme.spacing(3),
    },
    locationUnknownItem: {
        marginLeft: theme.spacing(1),
        width: theme.spacing(4),
        height: theme.spacing(4),
        border: 2,
        borderColor: '#000000',
        borderStyle: 'dashed',
        borderRadius: '5px',
        "&:hover": {
            cursor: 'pointer',
        }
    },
    itemIcon: {
        width: '24px',
        height: '24px',
        verticalAlign: 'middle',
    },
    iconDiv: {
        cursor: 'pointer',
    },
    iconKeyText: {
        position: 'absolute',
        bottom: -8,
        left: 16,
        'font-family': 'Hylia Serif Beta',
        lineHeight: '1.43em',
    },
    iconContainer: {
        position: 'relative',
    },
    locationKnownItem: {
        marginLeft: theme.spacing(1),
        position: 'relative',
        color: 'black',
        marginTop: 0,
        marginBottom: 0,
        "& img": {
            width: '24px',
            height: '24px',
            verticalAlign: 'middle',
        },
    },
    locationWalletTier: {
        "& $iconDiv": {
            marginLeft: theme.spacing(1),
            padding: 0,
            position: 'relative',
            color: 'black',
            "& img": {
                width: '16px',
                height: '16px',
                verticalAlign: 'middle',
            },
        }
    },
    priceBox: {
        width: '3em',
        marginLeft: theme.spacing(1),
        textAlign: 'right',
    },
    locationMenuIcon: {
        position: 'relative',
        "& img": {
            width: '32px',
            height: '32px',
        },
    },
    grayscaleMenuIcon: {
        position: 'relative',
        "& img": {
            width: '32px',
            height: '32px',
            filter: 'grayscale(100%)',
        },
    },
    locationMenuIconContainer: {
    },
    locationMenuClear: {
        padding: theme.spacing(2),
        margin: 0,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.43',
        color: '#FFFFFF',
        "&:hover": {
            backgroundColor: grey[800],
            cursor: 'pointer',
        }
    },
    locationItemMenu: {
        lineHeight: 0,
        padding: 0,
        "& ul": {
            padding: 0,
            backgroundColor: grey[900],
        },
        "& $iconKeyText": {
            color: '#FFFFFF',
        },
        "& $iconDiv": {
            padding: '8px',
            backgroundColor: grey[900],
        },
        "& $iconDiv:hover": {
            backgroundColor: grey[800],
            cursor: 'pointer',
            margin: '0 auto',
        },
    },
    itemMenuPaper: {
        overflowX: 'auto',
        overflowY: 'auto',
        backgroundColor: grey[900],
        width: '432px',
    },
    itemMenuRow: {
        whiteSpace: 'nowrap',
        backgroundColor: grey[900],
        "& div": {
            display: 'inline-block',
        },
        "& $itemMenuClear": {
            width: '432px',
        },
    },
    itemMenuClear: {
    },
    MenuPadding: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    entranceAutoOption: {
        display: 'block',
        padding: 0,
        paddingLeft: 0,
        '&[data-focus="true"]': {
            textDecoration: 'none',
            backgroundColor: '#52525E',
            color: '#FFFFFF',
        },
    },
    entranceAutoUl: {
        '& .MuiAutocomplete-option': {
            paddingLeft: 0,
        },
    },
    entranceAutoPaper: {
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
        margin: 0,
    },
    entranceAutoListBox: {
        padding: 0,
    },
    entranceAutoPopper: {
        position: 'relative',
    },
    entranceAutoInput: {
        backgroundColor: '#fff',
        borderBottom: '1px solid black',
        "&:after": {
            borderBottom: '0px solid #000',
        },
        "&:before": {
            borderBottom: '0px solid #000',
        },
        "&:hover:before": {
            borderBottom: '0px solid #000',
        },
    },
    entranceAutoSearchLabel: {
        "& .Mui-focused": {
            color: 'rgba(0, 0, 0, 1)',
        },
    },
    entranceAutoNoButton: {
        display: 'none',
    },
    entranceAutoWidthHack: {
        padding: theme.spacing(0,0.75,0,6.5),
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 'normal',
        letterSpacing: '0.00938em',
        height: 0,
        color: 'rgba(0, 0, 0, 0)',
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
        fontSize: '1rem',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
    },
    unlinkedEntranceLabel: {
        'vertical-align': 'center',
        'margin-right': 20,
        'font-weight': 'bold',
        flexGrow: 1,
        color: '#FF0000',
        fontSize: '1rem',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
    },
    unlinkedEntranceMenu: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: theme.spacing(0.5,0),
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.1876em',
        letterSpacing: '0.00938em',
        position: 'relative',
        "&:before": {
            content: '""',
            display: "block",
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        },
        "&:hover:before": {
            borderBottom: '2px solid rgba(0, 0, 0, 0.87)',
        },
        "& span": {
            marginRight: theme.spacing(1),
        }
    },
    linkLabel: {
        'vertical-align': 'center',
        textAlign: 'right',
    },
    entranceLink: {
        textAlign: 'right',
    },
    entranceLink1: {
        'font-weight': 'bold',
        fontSize: '1rem',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
    },
    entranceLink2: {
        fontSize: '0.75rem',
        lineHeight: '1.66',
        letterSpacing: '0.03333em',
    },
    settingCategory: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
        padding: theme.spacing(1.5,2),
        cursor: 'pointer',
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: 'transparent',
        "&:hover": {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },
        "& span": {
            flex: '1 1 auto',
        }
    },
    devLink: {
        padding: theme.spacing(1, 0),
    },
    entranceAnchor: {
        textDecoration: 'none',
        height: 0,
        position: "relative",
        top: -theme.spacing(10),
        "&:hover": {
            textDecoration: 'none',
            cursor: 'default',
        },
        "&:before": {
            content: '""',
            display: "block",
            //height: theme.spacing(10),
            //marginTop: -theme.spacing(10),
        }
    },
    entranceAnchorFakeText: {
        height: 1,
        width: 1,
        position: "absolute",
        overflow: "hidden",
        top: -10,
    },
    overworldLinkAnchor: {
        color: 'inherit',
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'underline',
        }
    },
    falseLinkAnchor: {
        textDecoration: 'none',
        "&:hover": {
            textDecoration: 'none',
            cursor: 'default',
        }
    },
    entranceText: {
        padding: theme.spacing(0.75,0.75,0.75,3),
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: 'normal',
        letterSpacing: '0.00938em',
        "&:hover": {
            textDecoration: 'none',
            backgroundColor: '#52525E',
            color: '#FFFFFF',
        }
    },
    entranceAreaText: {
        padding: theme.spacing(0.75,0.75),
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '1rem',
        lineHeight: 'normal',
        letterSpacing: '0.00938em',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000',
        "&:hover": {
            textDecoration: 'none',
            cursor: 'default',
        }
    },
    warpMenu: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            borderRadius: '8px 0 0 0',
            overflow: 'hidden',
        },
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        "& $iconKeyText": {
            color: '#FFFFFF',
        },
        "& $iconDiv": {
            padding: '8px',
            lineHeight: 0,
        },
        "& $iconDiv:hover": {
            backgroundColor: blueGrey[800],
            cursor: 'pointer',
        },
        backgroundColor: blueGrey[600],
        boxShadow: '-2px -2px 4px -1px rgba(0,0,0,0.2),-4px -4px 5px 0px rgba(0,0,0,0.14),-1px -1px 10px 0px rgba(0,0,0,0.12)',
        maxHeight: '50%',
    },
    warpMenuVisible: {
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    expandWarpMenu: {
        color: 'white',
        width: '32px',
        height: '100%',
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: blueGrey[800],
        }
    },
    warpAreaList: {
        overflowY: 'auto',
        flexGrow: 1,
    },
    warpMenuArea: {
        display: 'block',
        color: 'white',
        fontWeight: 'bold',
        padding: theme.spacing(1),
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: blueGrey[800],
        }
    },
    warpMenuAreaHidden: {
        display: 'block',
        color: grey[500],
        fontWeight: 'bold',
        padding: theme.spacing(1),
    },
    warpSongsBig: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    warpSongsSmall: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    warpSongsBlank: {
        [theme.breakpoints.down('xs')]: {
            color: grey[500],
            width: '32px',
            height: '100%',
            cursor: 'pointer',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    collapseArea: {
        cursor: 'pointer',
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

const trackerVersion = '0.3.2';

class Tracker extends React.Component {
    constructor(props) {
        super(props);

        this.linkEntrance = this.linkEntrance.bind(this);
        this.unLinkEntrance = this.unLinkEntrance.bind(this);
        this.checkLocation = this.checkLocation.bind(this);
        this.unCheckLocation = this.unCheckLocation.bind(this);
        this.resetState = this.resetState.bind(this);
        this.cancelAlert = this.cancelAlert.bind(this);
        this.toggleMQ = this.toggleMQ.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleCollapseReverse = this.toggleCollapseReverse.bind(this);
        this.handleItemMenuOpen = this.handleItemMenuOpen.bind(this);
        this.handleItemMenuClose = this.handleItemMenuClose.bind(this);
        this.handleShopItemMenuOpen = this.handleShopItemMenuOpen.bind(this);
        this.handleShopItemMenuClose = this.handleShopItemMenuClose.bind(this);
        this.handleEntranceMenuOpen = this.handleEntranceMenuOpen.bind(this);
        this.handleEntranceMenuClose = this.handleEntranceMenuClose.bind(this);
        this.toggleWalletTiers = this.toggleWalletTiers.bind(this);
        this.updateShopPrice = this.updateShopPrice.bind(this);
        this.findItem = this.findItem.bind(this);
        this.handleDungeonTravel = this.handleDungeonTravel.bind(this);
        this.handleWarpMenu = this.handleWarpMenu.bind(this);
        this.toggleAreaView = this.toggleAreaView.bind(this);
        this.setRef = this.setRef.bind(this);

        this.scroller = {};

        if (!!(ls.get('TrackerVersion'))) {
            if (ls.get('TrackerVersion') !== trackerVersion) {
                // outdated, reset everything until proper upgrade function developed
                ls.clear();
                ls.set('TrackerVersion', trackerVersion);
            }
        } else {
            // no version key
            ls.clear();
            ls.set('TrackerVersion', trackerVersion);
        }
        let settings = !!(ls.get('RandoSettings')) ? ls.get('RandoSettings') : rsl.Settings;
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
        let allAreas = !!(ls.get('AllAreas')) ? ls.get('AllAreas') : this.addReverseEntrances(areaJSON);
        let allEntrances = !!(ls.get('AllEntrances')) ? ls.get('AllEntrances') : merge({}, this.categorizeEntrances(allAreas));
        this.findVisibleLocations(settings, allAreas);
        let areas = this.loadAreas(settings, allAreas, allEntrances, true);
        let entrances = this.loadEntrancePools(settings, allEntrances, allAreas);
        let oneWayEntrances = this.loadOneWayEntrancePools(settings, allEntrances, allAreas);

        let darkMode = !!(ls.get('DarkMode')) ? true : ls.get('DarkMode');

        this.contextMenuHandler = new ContextMenuHandler(this.handleItemMenuOpen);
        this.shopContextMenuHandler = new ContextMenuHandler(this.handleShopItemMenuOpen);
        this.areaMenuHandler = new ContextMenuHandler(this.toggleAreaView);
        this.reverseCollapseHandler = new ContextMenuHandler(this.toggleCollapseReverse);

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
            alertReset: false,
            alertUpdate: false,
            itemMenuLocation: null,
            itemMenuOpen: null,
            shopItemMenuOpen: null,
            entranceMenuOpen: null,
            entranceToLink: null,
            entranceConnector: null,
            locationToLink: null,
            expandWarpMenu: false,
            expandDungeonMenu: false,
            expandSongMenu: false,
            entranceType: "",
            delayedURL: "",
            entranceRef: null,
            scrollY: null,
        };
    }

    setRef(index, element) {
        this.scroller[index] = element;
    }

    // When swapping between Overworld and Dungeon views, anchors don't
    // work until after rendering. Ugly workaround incoming.
    componentDidMount() {
        if (this.state.delayedURL !== "") {
            window.location.assign(this.state.delayedURL);
            this.setState({
                delayedURL: "",
            });
        }
        if (this.state.scrollY !== null && Object.keys(this.scroller).includes(this.state.entranceRef)) {
            let eRef = this.scroller[this.state.entranceRef];
            let rect = eRef.getBoundingClientRect();
            let oTop = rect.top;
            let scrollY = this.state.scrollY;
            window.scrollTo({
                top: 2 * window.scrollY + oTop - scrollY,
            })
            this.setState({
                scrollY: null,
                entranceRef: null,
            })
        }
    }

    componentDidUpdate() {
        if (this.state.delayedURL !== "") {
            window.location.assign(this.state.delayedURL);
            this.setState({
                delayedURL: "",
            });
        }
        if (this.state.scrollY !== null && Object.keys(this.scroller).includes(this.state.entranceRef)) {
            let eRef = this.scroller[this.state.entranceRef];
            let rect = eRef.getBoundingClientRect();
            let oTop = rect.top;
            let scrollY = this.state.scrollY;
            window.scrollTo({
                top: 2 * window.scrollY + oTop - scrollY,
            })
            this.setState({
                scrollY: null,
                entranceRef: null,
            })
        }
    }

    resetState(currentSettings) {
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
        let prevSettings = cloneDeep(currentSettings);
        settings["Show Unshuffled Entrances"] = prevSettings["Show Unshuffled Entrances"];
        settings["Show Locations"] = prevSettings["Show Locations"];
        settings["Show Unshuffled Skulls"] = prevSettings["Show Unshuffled Skulls"];
        settings["Shop Price Tracking"] = prevSettings["Shop Price Tracking"];

        this.setState({
            settings: settings,
            areas: areas,
            entrances: entrances,
            oneWayEntrances: oneWayEntrances,
            allEntrances: allEntrances,
            allAreas: allAreas,
            alertReset: false,
            expandWarpMenu: false,
            expandDungeonMenu: false,
            expandSongMenu: false,
        });
        ls.set('RandoSettings', settings);
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
        ls.set('TrackerVersion', trackerVersion);
    }

    addReverseEntrances(stateAreas) {
        // make sure the returned variable is a copy and doesn't
        // change the global state variables
        let allAreas = cloneDeep(stateAreas);
        let rEntrances = {};
        let oConnectors = {};
        let eConnector;
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
            if (allAreas.entrances[entrance].connector !== '') {
                eConnector = {};
                eConnector[entrance] = clone(allAreas.entrances[entrance]);
                oConnectors = merge(oConnectors, eConnector);
            }
        });
        let areas = { entrances: rEntrances };
        let connectors = { connectors: oConnectors };
        return merge(allAreas, areas, connectors);
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
        if (settings["Shuffle Bosses"] === "Age-Restricted" || settings["Shuffle Bosses"] === "Full") {
            erSettings.push("boss");
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
        let internalDungeonEntrance = false;
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
            // noBossShuffle is a permanently unshuffled type for Ganon's Tower until/unless it is added to the randomizer
            internalDungeonEntrance = subArea.type === 'boss' || subArea.type === 'noBossShuffle';
            eAreas.forEach(eArea => {
                if ((!(allAreas.hasOwnProperty(eArea))) && init) {
                    if (!(allAreas.hasOwnProperty(eArea))) {
                        if (subArea.oneWay && subArea.oneWayArea !== "" && subArea.type !== "overworld") {
                            allAreas[eArea] = { show: true, dungeon: internalDungeonEntrance, collapse: 'some', entrances: {}, locations: {} };
                        } else {
                            allAreas[eArea] = { show: false, dungeon: internalDungeonEntrance, collapse: 'some', entrances: {}, locations: {} };
                        }
                    }
                }
                if (!(areas.hasOwnProperty(eArea))) {
                    areas[eArea] = { show: allAreas[eArea].show, dungeon: internalDungeonEntrance, collapse: allAreas[eArea].collapse, entrances: {}, locations: {} };
                }
                if (settings["Decoupled Entrances"] === "Off" && entrance === "GV Lower Stream -> Lake Hylia") {
                    allAreas.entrances[entrance].shuffled = false;
                }
                eEntrance = {};
                eEntrance[entrance] = allAreas.entrances[entrance];
                if (!(erSettings.includes(subArea.type)) || eEntrance[entrance].shuffled === false) {
                    if (eEntrance[entrance].type !== 'overworld') {
                        if (eEntrance[entrance].type !== 'extra') {
                            eEntrance[entrance].aLink = entrance;
                            eEntrance[entrance].eLink = entrance;
                        }
                    } else {
                        if (entrance !== 'GV Lower Stream -> Lake Hylia') {
                            eEntrance[entrance].eLink = eEntrance[entrance].reverse;
                            eEntrance[entrance].aLink = eEntrance[entrance].reverse;
                        } else {
                            eEntrance[entrance].aLink = entrance;
                            eEntrance[entrance].eLink = entrance;
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
                eArea = allAreas.locations[location].area;
                if (eArea !== "") {
                    if (!(allAreas.hasOwnProperty(eArea)) && init) { 
                        allAreas[eArea] = { show: false, dungeon: false, collapse: 'some', entrances: {}, locations: {} };
                    }
                    if (!(areas.hasOwnProperty(eArea))) {
                        areas[eArea] = { show: allAreas[eArea].show, dungeon: false, collapse: allAreas[eArea].collapse, entrances: {}, locations: {} };
                    }
                    eLocation = {};
                    eLocation[location] = allAreas.locations[location];
                    areas[eArea].locations = merge(areas[eArea].locations, eLocation);
                } else if (allAreas.entrances[allAreas.locations[location].lKey].type === 'dungeon') {
                    eDungeon = allAreas.entrances[allAreas.locations[location].lKey].alias;
                    if (!(allAreas.hasOwnProperty(eDungeon)) && init) { 
                        allAreas[eDungeon] = { show: false, dungeon: true, collapse: 'some', entrances: {}, locations: {} };
                    }
                    if (!(areas.hasOwnProperty(eDungeon))) {
                        areas[eDungeon] = { show: false, dungeon: true, collapse: 'some', entrances: {}, locations: {} };
                    }
                    eLocation = {};
                    eLocation[location] = allAreas.locations[location];
                    areas[eDungeon].locations = merge(areas[eDungeon].locations, eLocation);
                    eEntrance = {};
                    eEntrance[allAreas.entrances[allAreas.locations[location].lKey].reverse] = allAreas.entrances[allAreas.entrances[allAreas.locations[location].lKey].reverse];
                    areas[eDungeon].entrances = merge(areas[eDungeon].entrances, eEntrance);
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
            if (eType === "interior" || eType === "specialInterior" || eType === "grave" || eType === "grotto" || eType === "dungeon" || eType === "boss") {
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
            if (allAreas.locations[location].lKey !== "") {
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
        if (settings["Decoupled Entrances"] !== "On") {
            let iGV = oOverworld['Lake Hylia'].indexOf('GV Lower Stream -> Lake Hylia');
            if (iGV > -1) {
                oOverworld['Lake Hylia'].splice(iGV, 1);
            }
        }
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
        if (settings["Shuffle Interiors"] === "All") {
            eInteriors.push(...(Object.filterEntrances(allAreas.entrances, (eType, eLink, eReverse) => eType === "specialInterior" && eLink === "" && eReverse === false)));
            Object.keys(allEntrances.reversespecialInterior).forEach(area => {
                if (!(oReverseInteriors.hasOwnProperty(area))) {
                    oReverseInteriors[area] = [];
                }
                oReverseInteriors[area].push(...(Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => eType === "specialInterior" && eLink === "" && eArea === area && eReverse === true)));
            });
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
        let oBosses = {};
        let oReverseBosses = {};
        let oDecoupledBosses = {};
        let eBosses = [];
        eBosses.push(...(Object.filterEntrances(allAreas.entrances, (eType, eLink, eReverse) => eType === "boss" && eLink === "" && eReverse === false)));
        Object.keys(allEntrances.reverseboss).forEach(area => {
            oReverseBosses[area] = (Object.filterReverseEntrances(allAreas.entrances, (eType, eLink, eArea, eReverse) => eType === "boss" && eLink === "" && eArea === area && eReverse === true));
        });
        oBosses = { "Bosses": eBosses };
        oDecoupledBosses = merge(clone(oBosses), clone(oReverseBosses));
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

        function mergeAreas(objValue, srcValue) {
            if (isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        }

        if (settings["Shuffle Overworld"] === "On") {
            if (settings["Mixed Pools"].includes("Overworld")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oOverworld, "mixed_reverse": oOverworld, "mixed_decoupled": oOverworld, "mixed_overworld": oOverworld}, mergeAreas);
            }
            entrances = merge(entrances, {"overworld": oOverworld});
        }
        if (settings["Shuffle Interiors"] === "Simple" || settings["Shuffle Interiors"] === "All") {
            if (settings["Mixed Pools"].includes("Interiors")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oInteriors, "mixed_reverse": oReverseInteriors, "mixed_decoupled": oDecoupledInteriors, "mixed_overworld": merge(clone(oInteriors), clone(oReverseInteriors))}, mergeAreas);
            }
            entrances = merge(entrances, {"interior": oInteriors, "interior_reverse": oReverseInteriors, "interior_decoupled": oDecoupledInteriors});
        }
        if (settings["Shuffle Grottos"] === "On") {
            if (settings["Mixed Pools"].includes("Grottos")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oGrottos, "mixed_reverse": oReverseGrottos, "mixed_decoupled": oDecoupledGrottos, "mixed_overworld": merge(clone(oGrottos), clone(oReverseGrottos))}, mergeAreas);
            }
            entrances = merge(entrances, {"grotto": oGrottos, "grotto_reverse": oReverseGrottos, "grotto_decoupled": oDecoupledGrottos});
            entrances = merge(entrances, {"grave": oGrottos, "grave_reverse": oReverseGrottos, "grave_decoupled": oDecoupledGrottos});
        }
        if (settings["Shuffle Dungeons"] === "On") {
            if (settings["Mixed Pools"].includes("Dungeons")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oDungeons, "mixed_reverse": oReverseDungeons, "mixed_decoupled": oDecoupledDungeons, "mixed_overworld": merge(clone(oDungeons), clone(oReverseDungeons))}, mergeAreas);
            }
            entrances = merge(entrances, {"dungeon": oDungeons, "dungeon_reverse": oReverseDungeons, "dungeon_decoupled": oDecoupledDungeons});
        }
        if (settings["Shuffle Bosses"] === "Age-Restricted" || settings["Shuffle Bosses"] === "Full") {
            if (settings["Mixed Pools"].includes("Boss Rooms")) {
                mixedpool = mergeWith(mixedpool, {"mixed": oBosses, "mixed_reverse": oReverseBosses, "mixed_decoupled": oDecoupledBosses, "mixed_overworld": merge(clone(oBosses), clone(oReverseBosses))}, mergeAreas);
            }
            entrances = merge(entrances, {"boss": oBosses, "boss_reverse": oReverseBosses, "boss_decoupled": oDecoupledBosses});
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
        eOverworld['Lake Hylia'].push('GV Lower Stream -> Lake Hylia');
        
        let eInteriors = [];
        eInteriors.push(...((allEntrances.interior.filter(int => allAreas.entrances[int].isReverse === false))));
        eInteriors.push(...((allEntrances.specialInterior.filter(int => allAreas.entrances[int].isReverse === false))));
        let oInteriors = { "Interiors": eInteriors };

        let eOverworldInteriors = {};
        Object.keys(allEntrances.reverseinterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                //if (!(Object.keys(eOverworld).includes(area))) {
                    eOverworldInteriors[area] = [];
                //} else {
                //    eOverworldInteriors[area] = clone(eOverworld[area]);
                //}
            }
            eOverworldInteriors[area].push(...((allEntrances.reverseinterior[area])));
        });
        Object.keys(allEntrances.reversespecialInterior).forEach(area => {
            if (!(Object.keys(eOverworldInteriors).includes(area))) {
                //if (!(Object.keys(eOverworld).includes(area))) {
                    eOverworldInteriors[area] = [];
                //} else {
                //    eOverworldInteriors[area] = clone(eOverworld[area]);
                //}
            }
            eOverworldInteriors[area].push(...((allEntrances.reversespecialInterior[area])))
        });

        let eOverworldDungeons = {};
        if (settings["Shuffle Dungeons"] === 'On' && (settings['Mixed Pools'] === 'On' || settings['Mixed Pools'] === 'Indoor')) {
            Object.keys(allEntrances.reversedungeon).forEach(area => {
                if (!(Object.keys(eOverworldDungeons).includes(area))) {
                    //if (!(Object.keys(eOverworld).includes(area))) {
                        eOverworldDungeons[area] = [];
                    //} else {
                    //    eOverworldInteriors[area] = clone(eOverworld[area]);
                    //}
                }
                eOverworldDungeons[area].push(...((allEntrances.reversedungeon[area])))
            });
            // Hack to hide Ganon's Castle exit from warp menus
            let iGC = eOverworldDungeons['Castle Grounds'].indexOf('Ganons Castle -> Ganons Castle Grounds');
            if (iGC > -1) {
                eOverworldDungeons['Castle Grounds'].splice(iGC, 1);
            }
        }

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
        
        function mergeAreas(objValue, srcValue) {
            if (isArray(objValue)) {
                return objValue.concat(srcValue);
            }
        }

        let oExtOwlDrops = mergeWith(cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(oOwlDrops), mergeAreas);
        let oExtWarpSongs = mergeWith(cloneDeep(oSpawnPoints), cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(eOverworldInteriors), cloneDeep(oInteriors), cloneDeep(oOwlDrops), cloneDeep(eOverworldDungeons), mergeAreas);
        let oExtSpawnPoints = mergeWith(cloneDeep(oSpawnPoints), cloneDeep(oWarpSongs), cloneDeep(eOverworld), cloneDeep(eOverworldInteriors), cloneDeep(oInteriors), cloneDeep(oOwlDrops), cloneDeep(eOverworldDungeons), mergeAreas);
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
                // Never shuffle Ganon's Castle
                if (entrance !== 'Ganons Castle -> Ganons Castle Grounds' && entrance !== 'Ganons Castle Grounds -> Ganons Castle') {
                    tempAreas.entrances[entrance].shuffled = true;
                }
            } else {
                tempAreas.entrances[entrance].shuffled = false;
            }
            if (settings["Decoupled Entrances"] === "Off" && entrance === "GV Lower Stream -> Lake Hylia") {
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
        });
        ls.set('RandoSettings', settings);
        ls.set('AllAreas', allAreas);
    }

    toggleMQ(dungeon) {
        let settings = cloneDeep(this.state.settings);
        let isMQ = !(settings[dungeon]);
        this.changeSetting({"target":{"name":dungeon,"value":isMQ}});
    }

    toggleCollapse(area) {
        let allAreas = cloneDeep(this.state.allAreas);
        let areas = cloneDeep(this.state.areas);
        let collapse = areas[area].collapse;
        if (collapse === 'none') {
            collapse = 'some';
        } else if (collapse === 'some') {
            collapse = 'all';
        } else {
            collapse = 'none';
        }
        allAreas[area].collapse = collapse;
        areas[area].collapse = collapse;
        this.setState({
            areas: areas,
            allAreas: allAreas,
        });
        ls.set('AllAreas', allAreas);
    }

    toggleCollapseReverse(areaDiv) {
        let allAreas = cloneDeep(this.state.allAreas);
        let areas = cloneDeep(this.state.areas);
        let area = areaDiv.innerText;
        let collapse = areas[area].collapse;
        if (collapse === 'none') {
            collapse = 'all';
        } else if (collapse === 'some') {
            collapse = 'none';
        } else {
            collapse = 'some';
        }
        allAreas[area].collapse = collapse;
        areas[area].collapse = collapse;
        this.setState({
            areas: areas,
            allAreas: allAreas,
        });
        ls.set('AllAreas', allAreas);
    }

    findVisibleAreas(shownAreas, allAreas, entrances, settings=this.state.settings) {
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        let decoupled = settings["Decoupled Entrances"] === "On";
        Object.filterAreas = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].eLink, entrances[key].aLink, entrances[key].isReverse, entrances[key].oneWay, entrances[key].shuffled, entrances[key].type, key, entrances[key].oneWayArea, entrances[key].connector) );
        Object.keys(shownAreas).forEach(targetArea => {
            let linkedTargetEntrances = (Object.filterAreas(shownAreas[targetArea].entrances, (eLink, aLink, isReverse, isOneWay, shuffled, lType, e, oneWayArea, connector) => (
                /*(isOneWay && aLink !== "" && (lType !== "overworld" && lType !== "owldrop")) ||*/
                (eLink !== "" && oneWayArea !== targetArea && (((isReverse === true) && shuffled === true) || lType === "overworld" || lType === "warpsong" || lType === "owldrop" || lType === "extra"))
                && (e !== "GV Lower Stream -> Lake Hylia" || (e === "GV Lower Stream -> Lake Hylia" && decoupled))) ));
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
                        let eLinked = allAreas.entrances[eOneWay].aLink;
                        let altLinked = true;
                        // switch to ToT entrance for Prelude
                        if (allAreas.entrances[eLinked].oneWay === true && allAreas.entrances[eLinked].connector !== "") {
                            if (allAreas.entrances[allAreas.entrances[eLinked].connector].aLink !== "") {
                                eLinked = allAreas.entrances[allAreas.entrances[eLinked].connector].aLink;
                            } else { altLinked = false }
                        }
                        // use interior exit for area if interior is linked
                        if (allAreas.entrances[eLinked].isReverse === false && allAreas.entrances[eLinked].type !== "overworld" && allAreas.entrances[eLinked].oneWay === false) {
                            if (allAreas.entrances[allAreas.entrances[eLinked].reverse].aLink !== "") {
                                eLinked = allAreas.entrances[allAreas.entrances[eLinked].reverse].aLink;
                            } else { altLinked = false }
                        }
                        if (altLinked && (allAreas.entrances[eLinked].isReverse === true || allAreas.entrances[eLinked].type === "overworld" ||
                        (allAreas.entrances[eLinked].oneWay === true && (allAreas.entrances[eLinked].oneWayArea !== "" || allAreas.entrances[eLinked].type === "extra")))) {
                            shownAreas[allAreas.entrances[eLinked].area].show = true;
                            allAreas[allAreas.entrances[eLinked].area].show = true;
                            // Hard code Gerudo Valley to Lake with decoupled off, necessary for Lake Hylia owl warp to chain off valley visibility
                            if (allAreas.entrances[eLinked].area === 'Gerudo Valley' && (settings['Decoupled Entrances'] === 'Off' || settings['Shuffle Overworld'] === 'Off')) {
                                shownAreas['Lake Hylia'].show = true;
                                allAreas['Lake Hylia'].show = true;
                            }
                        }
                    }
                });
            });
        });
        // Another pass for connectors that link to or from unshuffled entrances
        let connectorOverride = [];
        Object.keys(allAreas.connectors).forEach(connector => {
            let exit = allAreas.entrances[connector].connector
            if (allAreas.entrances[connector].eLink !== '' && allAreas.entrances[exit].aLink !== '' &&
               (((allAreas.entrances[connector].shuffled || allAreas.entrances[exit].shuffled) && (!decoupled || allAreas.entrances[allAreas.entrances[exit].aLink].isReverse)) || allAreas[allAreas.entrances[connector].area].show)) {
                shownAreas[allAreas.entrances[allAreas.entrances[exit].aLink].area].show = true;
                allAreas[allAreas.entrances[allAreas.entrances[exit].aLink].area].show = true;
                connectorOverride.push(allAreas.entrances[allAreas.entrances[exit].aLink].area);
            }
        });

        // Hard code Gerudo Valley to Lake with decoupled off again, in case one-way entrance does not lead to Valley
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
                if (((shownEntrances.length === 0 && ((settings["Show Locations"] === "Yes" && shownLocations.length !== 0) || settings["Show Locations"] !== "Yes")) ||
                (targetArea === 'Spawn Points' && settings["Shuffle Spawn Points"] === "Off" && settings["Shuffle Interiors"] !== "All")) &&
                !(connectorOverride.includes(targetArea))) {
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
        let visibleRules;
        // Location visibility
        Object.keys(allAreas.locations).forEach((location) => {
            if (settings["Show Locations"] === "Yes" || settings["Show Locations"] === "Interiors Only") {
                interiorsOnly = (settings["Show Locations"] === "Interiors Only");
                if (typeof allAreas.locations[location].settings === "boolean") {
                    allAreas.locations[location].visible = allAreas.locations[location].settings;
                    visibleRules = allAreas.locations[location].settings;
                } else if (allAreas.locations[location].settings.length > 0) {
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
                    visibleRules = ((andVisible === (andCount >= 0)) && (orVisible === (orCount > 0)));
                    allAreas.locations[location].visible = (((allAreas.locations[location].area !== "" && !(interiorsOnly)) || allAreas.locations[location].area === "") && visibleRules);
                } else {
                    allAreas.locations[location].visible = ((allAreas.locations[location].area !== "" && !(interiorsOnly)) || allAreas.locations[location].area === "");
                    visibleRules = true;
                }
            } else {
                visibleRules = false;
                allAreas.locations[location].visible = false;
            }
            if (allAreas.locations[location].shuffleRules.length > 0) {andVisible = true;
                orVisible = false;
                andCount = 0;
                orCount = 0;
                allAreas.locations[location].shuffleRules.forEach(s => {
                    if (s.required === true) { andCount++; } else { orCount++; }
                    if (settings[s.setting] === s.value && s.required === true) { andVisible = true && andVisible;  }
                    if (settings[s.setting] !== s.value && s.required === true) { andVisible = false; }
                    if (settings[s.setting] === s.value && s.required === false) { orVisible = true; }
                });
                allAreas.locations[location].shuffled = ((andVisible === (andCount >= 0)) && (orVisible === (orCount > 0)));
            } else {
                allAreas.locations[location].shuffled = visibleRules;
            }
        });
        // Entrance tag usage vs unique name
        Object.keys(allAreas.entrances).forEach((entrance) => {
            if (allAreas.entrances[entrance].tagRules.length > 0) {
                andVisible = true;
                orVisible = false;
                andCount = 0;
                orCount = 0;
                allAreas.entrances[entrance].tagRules.forEach(s => {
                    if (s.required === true) { andCount++; } else { orCount++; }
                    if (settings[s.setting] === s.value && s.required === true) { andVisible = true && andVisible;  }
                    if (settings[s.setting] !== s.value && s.required === true) { andVisible = false; }
                    if (settings[s.setting] === s.value && s.required === false) { orVisible = true; }
                });
                allAreas.entrances[entrance].enableTag = (andVisible === (andCount >= 0)) && (orVisible === (orCount > 0));
            }
        });
        // Check entrance tags if a new tag representative is needed because the previous one no longer uses a tag
        Object.keys(allAreas.entrances).forEach((entrance) => {
            if (allAreas.entrances[entrance].tag !== "") {
                if (allAreas.entrances[entrance].tagRep && !(allAreas.entrances[entrance].enableTag)) {
                    allAreas.entrances[entrance].tagRep = false;
                    Object.filterTags = (entrances, predicate) =>
                        Object.keys(entrances)
                            .filter( key => predicate(entrances[key].tag, entrances[key].tagRep, entrances[key].enableTag, entrances[key].eLink) );
                    let tagEntrances = (Object.filterTags(allAreas.entrances, (eTag, eTagRep, eEnableTag, eLink) => (eTag === allAreas.entrances[entrance].tag && eTagRep === false && eEnableTag && eLink === "")));
                    if (tagEntrances.length !== 0) {
                        allAreas.entrances[tagEntrances[0]].tagRep = true;
                    }
                }
            }
        });
    }

    linkEntrance(dataLinkFrom, dataLinkTo) {
        let originator = dataLinkFrom;
        let eCategory = dataLinkTo;
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        let unMixedDecoupled = ["boss", "noBossShuffle", "noDungeonShuffle"];
        let areas = cloneDeep(this.state.allAreas);
        let shownAreas = cloneDeep(this.state.areas);
        let entrances = cloneDeep(this.state.allEntrances);
        let area = areas.entrances[originator].area;
        let entrancePools;
        if (areas.entrances[eCategory].tag !== "" && areas.entrances[eCategory].enableTag &&
            areas.entrances[eCategory].tag === areas.entrances[originator].tag && 
            areas.entrances[originator].eLink === "" && areas.entrances[originator].enableTag) {
            eCategory = originator;
        }
        console.log(originator, "<>", eCategory,"[Connected]");
        if (areas.entrances[originator].oneWay === true && areas.entrances[originator].oneWayArea !== "") {
            area = areas.entrances[originator].oneWayArea;
        }
        let targetArea = areas.entrances[eCategory].area;
        if (areas.entrances[eCategory].oneWay === true && areas.entrances[eCategory].oneWayArea !== "") {
            targetArea = areas.entrances[eCategory].oneWayArea;
        }
        if ((this.state.settings["Decoupled Entrances"] === "Off" && !(alwaysOneWay.includes(areas.entrances[originator].type))) || (unMixedDecoupled.includes(areas.entrances[originator].type))) {
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
                .filter( key => predicate(entrances[key].tag, entrances[key].tagRep, entrances[key].enableTag, entrances[key].eLink) );
        if (areas.entrances[eCategory].tagRep) {
            let tagEntrances = (Object.filterTags(areas.entrances, (eTag, eTagRep, eEnableTag, eLink) => (eTag === areas.entrances[eCategory].tag && eTagRep === false && eEnableTag && eLink === "")));
            if (tagEntrances.length !== 0) {
                areas.entrances[tagEntrances[0]].tagRep = true;
                areas.entrances[eCategory].tagRep = false;
            }
        }
        this.findVisibleAreas(shownAreas, areas, entrances);
        entrancePools = this.loadEntrancePools(this.state.settings, this.state.allEntrances, areas);
        let eRef = this.scroller[this.state.entranceRef];
        let rect = eRef.getBoundingClientRect();
        let oTop = rect.top;
        let scrollY = oTop + window.scrollY;
        this.setState({
            allAreas: areas,
            areas: shownAreas,
            entrances: entrancePools,
            scrollY: scrollY,
        });
        ls.set('AllAreas', areas);
        this.handleEntranceMenuClose(false);
    }

    unLinkEntrance(entrance, scrollRef) {
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
        let unMixedDecoupled = ["boss", "noBossShuffle", "noDungeonShuffle"];
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
        if (this.state.settings["Decoupled Entrances"] === "Off" || (unMixedDecoupled.includes(areas.entrances[originator].type))) {
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
        let eRef = this.scroller[scrollRef];
        let rect = eRef.getBoundingClientRect();
        let oTop = rect.top;
        let scrollY = oTop + window.scrollY;
        this.setState({
            allAreas: areas,
            allEntrances: entrances,
            areas: shownAreas,
            entrances: entrancePools,
            scrollY: scrollY,
            entranceRef: scrollRef,
        });
        ls.set('AllAreas', areas);
        ls.set('AllEntrances', entrances);
    }

    toggleWalletTiers(location) {
        let originator = location;
        console.log(originator,"[wallet tier change]");
        let areas = cloneDeep(this.state.areas);
        let allAreas = cloneDeep(this.state.allAreas);
        let allEntrances = cloneDeep(this.state.allEntrances);
        let tier;
        allAreas.locations[originator].walletTier === 3 ?
            tier = 0
            : tier = allAreas.locations[originator].walletTier + 1;
        allAreas.locations[originator].walletTier = tier;
        if (allAreas.locations[originator].area !== "") {
            areas[allAreas.locations[originator].area].locations[originator].walletTier = tier;
        }
        if (allAreas.locations[originator].lKey !== "") {
            allEntrances[allAreas.locations[originator].lKey].locations[originator].walletTier = tier;
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
    }

    updateShopPrice(location, price) {
        let originator = location;
        if (price === "") { price = 0; }
        console.log(originator,"[costs]",price);
        let areas = cloneDeep(this.state.areas);
        let allAreas = cloneDeep(this.state.allAreas);
        let allEntrances = cloneDeep(this.state.allEntrances);
        allAreas.locations[originator].price = price;
        if (allAreas.locations[originator].area !== "") {
            areas[allAreas.locations[originator].area].locations[originator].price = price;
        }
        if (allAreas.locations[originator].lKey !== "") {
            allEntrances[allAreas.locations[originator].lKey].locations[originator].price = price;
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
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
            allEntrances[allAreas.locations[originator].lKey].locations[originator].check = "checked";
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
        this.handleItemMenuClose();
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
            allEntrances[allAreas.locations[originator].lKey].locations[originator].check = "";
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
    }

    findItem(ootItem) {
        let originator = ootItem.currentTarget.getAttribute('data-found-in');
        let foundItem = ootItem.currentTarget.getAttribute('data-found-item');
        foundItem === "" ? console.log(originator,"[cleared]") :
        console.log(originator,"[holds]",foundItem);
        let areas = cloneDeep(this.state.areas);
        let allAreas = cloneDeep(this.state.allAreas);
        let allEntrances = cloneDeep(this.state.allEntrances);
        allAreas.locations[originator].foundItem = foundItem;
        if (allAreas.locations[originator].area !== "") {
            areas[allAreas.locations[originator].area].locations[originator].foundItem = foundItem;
        }
        if (allAreas.locations[originator].lKey !== "") {
            allEntrances[allAreas.locations[originator].lKey].locations[originator].foundItem = foundItem;
        }
        this.setState({
            allAreas: allAreas,
            allEntrances: allEntrances,
            areas: areas,
        });
        ls.set('AllAreas', allAreas);
        ls.set('AllEntrances', allEntrances);
        this.handleItemMenuClose();
        this.handleShopItemMenuClose();
    }

    cancelAlert() {
        this.setState({ alertReset: false, });
    }

    cancelUpdate() {
        this.setState({ alertUpdate: false, });
    }

    handleItemMenuOpen(location, dataSource) {
        this.setState({
            itemMenuOpen: location,
            locationToLink: dataSource,
        });
    }

    handleShopItemMenuOpen(location, dataSource) {
        this.setState({
            shopItemMenuOpen: location,
            locationToLink: dataSource,
        });
    }

    handleItemMenuClose() {
        this.setState({
            itemMenuOpen: null,
            locationToLink: null,
        });
    }

    handleShopItemMenuClose() {
        this.setState({
            shopItemMenuOpen: null,
            locationToLink: null,
        });
    }

    handleEntranceMenuOpen(entrance, scrollRef) {
        console.log(entrance.currentTarget.getAttribute('data-source'),'-> Open menu');
        this.setState({
            entranceMenuOpen: entrance.currentTarget,
            entranceToLink: entrance.currentTarget.getAttribute('data-source'),
            entranceConnector: entrance.currentTarget.getAttribute('data-connector'),
            entranceType: entrance.currentTarget.getAttribute('data-etype'),
            entranceRef: scrollRef,
        });
    }

    handleEntranceMenuClose(clearRef=true) {
        let eRef = (clearRef === true) ? null : this.state.entranceRef;
        this.setState({
            entranceMenuOpen: null,
            entranceToLink: null,
            entranceConnector: null,
            entranceType: "",
            entranceRef: eRef,
        });
    }

    buildEntranceURL(reverseLink, useConnector=true) {
        let href = '#';
        if ((this.state.allAreas.entrances[reverseLink].type === "overworld") || (this.state.allAreas.entrances[reverseLink].isReverse)) {
            href = '#' + this.state.allAreas.entrances[reverseLink].area;
        } else if (this.state.allAreas.entrances[reverseLink].reverse !== '') {
            let reReverseLink = this.state.allAreas.entrances[this.state.allAreas.entrances[reverseLink].reverse].aLink;
            if (reReverseLink !== '') {
                if ((this.state.allAreas.entrances[reReverseLink].type === "overworld") || (this.state.allAreas.entrances[reReverseLink].isReverse)) {
                    href = '#' + this.state.allAreas.entrances[reReverseLink].area;
                } else {
                    href = this.buildEntranceURL(reReverseLink);
                }
            }
        }
        if ((this.state.allAreas.entrances[reverseLink].type === "warpsong") || (this.state.allAreas.entrances[reverseLink].type === "spawn") || (this.state.allAreas.entrances[reverseLink].type === "owldrop") || (this.state.allAreas.entrances[reverseLink].type === "extra")) {
            if (useConnector) {
                if (this.state.allAreas.entrances[reverseLink].connector !== "") {
                    if (this.state.allAreas.entrances[this.state.allAreas.entrances[reverseLink].connector].aLink !== "") {
                        href = '#' + this.state.allAreas.entrances[this.state.allAreas.entrances[this.state.allAreas.entrances[reverseLink].connector].aLink].area;
                    }
                } else {
                    href = '#' + this.state.allAreas.entrances[reverseLink].area;
                }
            } else {
                href = '#' + this.state.allAreas.entrances[reverseLink].oneWayArea;
            }
        }
        if (this.state.allAreas.entrances[reverseLink].type === "dungeon") {
            if (this.state.allAreas.entrances[reverseLink].isReverse === true) {
                href = '#' + this.state.allAreas.entrances[reverseLink].area;
            } else {
                href = '#' + this.state.allAreas.entrances[reverseLink].alias;
            }
        }
        return href;
    }

    handleDungeonTravel(entrance, useConnector=true) {
        let eType = this.state.allAreas.entrances[entrance].type;
        if (this.state.settings["View"] === "Overworld" && eType === "dungeon" && this.state.allAreas.entrances[entrance].isReverse === false) {
            this.changeSetting({"target": { "name": "View", "value": "Dungeons" }});
        }
        if (this.state.settings["View"] === "Dungeons" && (eType !== "dungeon" || (eType === "dungeon" && this.state.allAreas.entrances[entrance].isReverse === true))) {
            this.changeSetting({"target": { "name": "View", "value": "Overworld" }});
        }
        let href = this.buildEntranceURL(entrance, useConnector);
        if (href !== '#') {
            this.setState({
                delayedURL: href,
            });
        }
    }

    isWarpAreaLinked(entrance) {
        let linked = false;
        if (this.state.allAreas.entrances[entrance].aLink !== '') {
            let href = this.buildEntranceURL(this.state.allAreas.entrances[entrance].aLink);
            if (href !== '#') {
                linked = true;
            }
        }
        return linked;
    }

    handleWarpMenu(area) {
        let eType;
        if (this.state.areas[area].dungeon !== true) {
            eType = 'overworld';
        } else {
            eType = 'dungeon';
        }
        if (this.state.settings["View"] === "Overworld" && eType === "dungeon") {
            this.changeSetting({"target": { "name": "View", "value": "Dungeons" }});
        } else if (this.state.settings["View"] === "Dungeons" && eType !== "dungeon") {
            this.changeSetting({"target": { "name": "View", "value": "Overworld" }});
        }
        let href = '#' + area;
        this.setState({
            delayedURL: href,
            expandWarpMenu: false,
            expandDungeonMenu: false,
        });
    }

    toggleAreaView() {
        if (this.state.settings["View"] === "Overworld") {
            this.changeSetting({"target": { "name": "View", "value": "Dungeons" }});
        } else {
            this.changeSetting({"target": { "name": "View", "value": "Overworld" }});
        }
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
                                >
                                    <MenuIcon />
                                </IconButton>
                                <div className={classes.title}>
                                    <div>
                                        <div className={classes.titleText} variant="h4">{this.state.settings["View"]}</div>
                                    </div>
                                </div>
                                <div className={classes.checkCount}>
                                    {
                                        Object.keys(this.state.allAreas.locations).filter(l => {
                                            return this.state.allAreas.locations[l].shuffled &&
                                                   this.state.allAreas.locations[l].check !== "";
                                        }).length
                                    }
                                    /
                                    {
                                        Object.keys(this.state.allAreas.locations).filter(l => {
                                            return this.state.allAreas.locations[l].shuffled;
                                        }).length
                                    }
                                </div>
                                <button
                                    onClick={() => this.setState({alertReset: true,})}
                                    className={classes.menuButton}
                                >
                                    <span className={classes.menuButtonLabel}>Reset</span>
                                </button>
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
                            disableScrollLock={true}
                        >
                            <DialogTitle>{"Reset Tracker?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    All entrance and location checks will be cleared. Are you sure?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.resetState(this.state.settings)}>Yes</Button>
                                <Button onClick={() => this.cancelAlert()}>No</Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            open={this.state.alertUpdate}
                            onClose={() => this.cancelUpdate()}
                            disableScrollLock={true}
                        >
                            <DialogTitle>{"Scheduled Updates"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Your tracker will update on <b>May 15th at 8PM US Eastern Daylight Time</b>.
                                </DialogContentText>
                                <DialogContentText className={classes.redAlert}>
                                    <em><b>ANY SAVED PROGRESS WILL BE LOST.</b></em>
                                </DialogContentText>
                                <DialogContentText>
                                    This update includes substantial changes for new randomizer features and requires a new data format. Please finish any open seeds you may have by <b>8PM EDT on May 15</b> to avoid losing your notes.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.cancelUpdate()}>OK</Button>
                            </DialogActions>
                        </Dialog>
                        <Drawer
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={this.state.openSettings}
                            classes={{paper: classes.drawerPaper}}
                            SlideProps={{
                                unmountOnExit: true,
                            }}
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
                        <EntranceMenu
                            anchorLocation={this.state.entranceMenuOpen}
                            handleClose={this.handleEntranceMenuClose}
                            handleLink={this.linkEntrance}
                            entrancePool={this.state.entranceType in this.state.oneWayEntrances ?
                                          this.state.oneWayEntrances[this.state.entranceType] :
                                          this.state.entrances[this.state.entranceType]}
                            allAreas={this.state.allAreas}
                            connector={this.state.entranceConnector === 'true'}
                            title={this.state.entranceToLink ? this.state.allAreas.entrances[this.state.entranceToLink].area : ''}
                            oneWay={this.state.entranceToLink ? this.state.allAreas.entrances[this.state.entranceToLink].oneWay : false}
                            decoupled={this.state.settings["Decoupled Entrances"] === "On"}
                            isReverse={this.state.entranceToLink ? this.state.allAreas.entrances[this.state.entranceToLink].isReverse : false}
                            sourceEntrance={this.state.entranceToLink}
                            classes={classes}
                            id="globalEntranceMenu"
                        />
                        <ItemMenu
                            classes={classes}
                            handleClose={this.handleItemMenuClose}
                            handleFind={this.findItem}
                            anchorLocation={this.state.itemMenuOpen}
                            sourceLocation={this.state.locationToLink}
                        />
                        <ShopItemMenu
                            classes={classes}
                            handleClose={this.handleShopItemMenuClose}
                            handleFind={this.findItem}
                            anchorLocation={this.state.shopItemMenuOpen}
                            sourceLocation={this.state.locationToLink}
                        />
                        <div 
                            id="warpMenu"
                            className={classes.warpMenu}
                        >
                            <div
                                id="warpMenuVisible"
                                className={classes.warpMenuVisible}
                            >
                                <OotIcon
                                    classes={classes}
                                    itemName="Kokiri Sword"
                                    className={this.isWarpAreaLinked('Child Spawn -> KF Links House') ?
                                        classes.locationMenuIcon :
                                        classes.grayscaleMenuIcon}
                                    onClick={this.isWarpAreaLinked('Child Spawn -> KF Links House') ?
                                        () => this.handleDungeonTravel(this.state.allAreas.entrances['Child Spawn -> KF Links House'].aLink)
                                        : () => this.handleDungeonTravel('Child Spawn -> KF Links House', false)}
                                />
                                <OotIcon
                                    classes={classes}
                                    itemName="Master Sword"
                                    className={this.isWarpAreaLinked('Adult Spawn -> Temple of Time') ?
                                        classes.locationMenuIcon :
                                        classes.grayscaleMenuIcon}
                                    onClick={this.isWarpAreaLinked('Adult Spawn -> Temple of Time') ?
                                        () => this.handleDungeonTravel(this.state.allAreas.entrances['Adult Spawn -> Temple of Time'].aLink)
                                        : () => this.handleDungeonTravel('Adult Spawn -> Temple of Time', false)}
                                />
                                <div className={classes.warpSongsBig}>
                                    <OotIcon
                                        classes={classes}
                                        itemName="Minuet of Forest"
                                        className={this.isWarpAreaLinked('Minuet of Forest Warp -> Sacred Forest Meadow') ?
                                            classes.locationMenuIcon :
                                            classes.grayscaleMenuIcon}
                                        onClick={this.isWarpAreaLinked('Minuet of Forest Warp -> Sacred Forest Meadow') ?
                                            () => this.handleDungeonTravel(this.state.allAreas.entrances['Minuet of Forest Warp -> Sacred Forest Meadow'].aLink)
                                            : () => this.handleDungeonTravel('Minuet of Forest Warp -> Sacred Forest Meadow', false)}
                                    />
                                    <OotIcon
                                        classes={classes}
                                        itemName="Bolero of Fire"
                                        className={this.isWarpAreaLinked('Bolero of Fire Warp -> DMC Central Local') ?
                                            classes.locationMenuIcon :
                                            classes.grayscaleMenuIcon}
                                        onClick={this.isWarpAreaLinked('Bolero of Fire Warp -> DMC Central Local') ?
                                            () => this.handleDungeonTravel(this.state.allAreas.entrances['Bolero of Fire Warp -> DMC Central Local'].aLink)
                                            : () => this.handleDungeonTravel('Bolero of Fire Warp -> DMC Central Local', false)}
                                    />
                                    <OotIcon
                                        classes={classes}
                                        itemName="Serenade of Water"
                                        className={this.isWarpAreaLinked('Serenade of Water Warp -> Lake Hylia') ?
                                            classes.locationMenuIcon :
                                            classes.grayscaleMenuIcon}
                                        onClick={this.isWarpAreaLinked('Serenade of Water Warp -> Lake Hylia') ?
                                            () => this.handleDungeonTravel(this.state.allAreas.entrances['Serenade of Water Warp -> Lake Hylia'].aLink)
                                            : () => this.handleDungeonTravel('Serenade of Water Warp -> Lake Hylia', false)}
                                    />
                                    <OotIcon
                                        classes={classes}
                                        itemName="Requiem of Spirit"
                                        className={this.isWarpAreaLinked('Requiem of Spirit Warp -> Desert Colossus') ?
                                            classes.locationMenuIcon :
                                            classes.grayscaleMenuIcon}
                                        onClick={this.isWarpAreaLinked('Requiem of Spirit Warp -> Desert Colossus') ?
                                            () => this.handleDungeonTravel(this.state.allAreas.entrances['Requiem of Spirit Warp -> Desert Colossus'].aLink)
                                            : () => this.handleDungeonTravel('Requiem of Spirit Warp -> Desert Colossus', false)}
                                    />
                                    <OotIcon
                                        classes={classes}
                                        itemName="Nocturne of Shadow"
                                        className={this.isWarpAreaLinked('Nocturne of Shadow Warp -> Graveyard Warp Pad Region') ?
                                            classes.locationMenuIcon :
                                            classes.grayscaleMenuIcon}
                                        onClick={this.isWarpAreaLinked('Nocturne of Shadow Warp -> Graveyard Warp Pad Region') ?
                                            () => this.handleDungeonTravel(this.state.allAreas.entrances['Nocturne of Shadow Warp -> Graveyard Warp Pad Region'].aLink)
                                            : () => this.handleDungeonTravel('Nocturne of Shadow Warp -> Graveyard Warp Pad Region', false)}
                                    />
                                    <OotIcon
                                        classes={classes}
                                        itemName="Prelude of Light"
                                        className={this.isWarpAreaLinked('Prelude of Light Warp -> Temple of Time') ?
                                            classes.locationMenuIcon :
                                            classes.grayscaleMenuIcon}
                                        onClick={this.isWarpAreaLinked('Prelude of Light Warp -> Temple of Time') ?
                                            () => this.handleDungeonTravel(this.state.allAreas.entrances['Prelude of Light Warp -> Temple of Time'].aLink)
                                            : () => this.handleDungeonTravel('Prelude of Light Warp -> Temple of Time', false)}
                                    />
                                </div>
                                <div className={classes.warpSongsSmall}>
                                    <ClickAwayListener onClickAway={() => this.state.expandSongMenu ? this.setState({ expandSongMenu: false }) : null}>
                                        <div
                                            className={classes.iconDiv}
                                            onClick={() => this.setState({ expandSongMenu: !this.state.expandSongMenu })}
                                        >
                                            {<QueueMusicIcon className={Object.keys(this.state.allAreas.entrances).filter((e) => (this.state.allAreas.entrances[e].type === 'warpsong' && this.state.allAreas.entrances[e].aLink !== '')).length > 0 ?
                                                classes.expandWarpMenu :
                                                classes.warpSongsBlank}
                                            />}
                                        </div>
                                    </ClickAwayListener>
                                </div>
                                <ClickAwayListener onClickAway={() => this.state.expandWarpMenu ? this.setState({ expandWarpMenu: false }) : null}>
                                    <div
                                        className={classes.iconDiv}
                                        onClick={() => this.setState({ expandWarpMenu: !this.state.expandWarpMenu })}
                                        onContextMenu={this.areaMenuHandler.onContextMenu}
                                        onTouchStart={this.areaMenuHandler.onTouchStart}
                                        onTouchCancel={this.areaMenuHandler.onTouchCancel}
                                        onTouchEnd={this.areaMenuHandler.onTouchEnd}
                                        onTouchMove={this.areaMenuHandler.onTouchMove}
                                    >
                                        {<PublicIcon className={classes.expandWarpMenu} />}
                                    </div>
                                </ClickAwayListener>
                                <ClickAwayListener onClickAway={() => this.state.expandDungeonMenu ? this.setState({ expandDungeonMenu: false }) : null}>
                                    <div
                                        className={classes.iconDiv}
                                        onClick={() => this.setState({ expandDungeonMenu: !this.state.expandDungeonMenu })}
                                        onContextMenu={this.areaMenuHandler.onContextMenu}
                                        onTouchStart={this.areaMenuHandler.onTouchStart}
                                        onTouchCancel={this.areaMenuHandler.onTouchCancel}
                                        onTouchEnd={this.areaMenuHandler.onTouchEnd}
                                        onTouchMove={this.areaMenuHandler.onTouchMove}
                                    >
                                        {<MeetingRoomIcon className={classes.expandWarpMenu} />}
                                    </div>
                                </ClickAwayListener>
                            </div>
                            <Collapse
                                in={this.state.expandSongMenu}
                                timeout='auto'
                                unmountOnExit
                                className={classes.warpAreaList}
                            >
                                { Object.keys(this.state.allAreas.entrances).filter((e) => (this.state.allAreas.entrances[e].type === 'warpsong' && this.state.allAreas.entrances[e].aLink !== '')).map((song, ia) => {
                                    return (
                                        <span
                                            key={'quickSongMenu'+ia}
                                            className={classes.warpMenuArea}
                                            onClick={() => this.handleDungeonTravel(this.state.allAreas.entrances[song].aLink)}
                                        >
                                            {this.state.allAreas.entrances[song].alias}
                                        </span>
                                    );
                                })}
                            </Collapse>
                            <Collapse
                                in={this.state.expandWarpMenu}
                                timeout='auto'
                                unmountOnExit
                                className={classes.warpAreaList}
                            >
                                { Object.keys(this.state.areas).sort().filter((a) => (!(this.state.areas[a].dungeon))).map((area, ia) => {
                                    return (
                                        <span
                                            key={'quickAreaMenu'+ia}
                                            className={this.state.areas[area].show ? 
                                                classes.warpMenuArea :
                                                classes.warpMenuAreaHidden}
                                            onClick={this.state.areas[area].show ?
                                                () => this.handleWarpMenu(area)
                                                : null}
                                        >
                                            {area}
                                        </span>
                                    );
                                })}
                            </Collapse>
                            <Collapse
                                in={this.state.expandDungeonMenu}
                                timeout='auto'
                                unmountOnExit
                                className={classes.warpAreaList}
                            >
                                { Object.keys(this.state.areas).sort().filter((a) => (this.state.areas[a].dungeon)).map((area, ia) => {
                                    return (
                                        <span
                                            key={'quickDungeonMenu'+ia}
                                            className={classes.warpMenuArea}
                                            onClick={() => this.handleWarpMenu(area)}
                                        >
                                            {area}
                                        </span>
                                    );
                                })}
                            </Collapse>
                        </div>
                        <div
                            className={clsx(classes.areaPaper, {
                                [classes.areaPaperShift]: this.state.openSettings,
                            })}
                        >
                            <div className={classes.drawerHeader} />
                            {
                                this.state.settings["View"] === "Overworld" ?
                                Object.keys(this.state.areas).sort().filter((a) => (this.state.areas[a].show && !(this.state.areas[a].dungeon))).map((area, ia) => { 
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
                                            handleItemMenuOpen={this.handleItemMenuOpen}
                                            handleItemMenuClose={this.handleItemMenuClose}
                                            handleContextMenu={this.contextMenuHandler}
                                            handleShopContextMenu={this.shopContextMenuHandler}
                                            handleEntranceMenuOpen={this.handleEntranceMenuOpen}
                                            handleFind={this.findItem}
                                            toggleWalletTiers={this.toggleWalletTiers}
                                            updateShopPrice={this.updateShopPrice}
                                            showShops={this.state.settings["Show Locations"] !== "No"}
                                            showShopInput={this.state.settings["Shop Price Tracking"] === "Both" || this.state.settings["Shop Price Tracking"] === "Price Only"}
                                            showShopRupee={this.state.settings["Shop Price Tracking"] === "Both" || this.state.settings["Shop Price Tracking"] === "Wallet Tier"}
                                            handleDungeonTravel={this.handleDungeonTravel}
                                            classes={classes}
                                            dungeon={false}
                                            showUnshuffledEntrances={this.state.settings["Show Unshuffled Entrances"] === "Yes"}
                                            collapseSwitch={this.toggleCollapse}
                                            reverseCollapseSwitch={this.reverseCollapseHandler}
                                            setRef={this.setRef}
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
                                            handleItemMenuOpen={this.handleItemMenuOpen}
                                            handleItemMenuClose={this.handleItemMenuClose}
                                            handleContextMenu={this.contextMenuHandler}
                                            handleShopContextMenu={this.shopContextMenuHandler}
                                            handleEntranceMenuOpen={this.handleEntranceMenuOpen}
                                            handleFind={this.findItem}
                                            toggleWalletTiers={this.toggleWalletTiers}
                                            updateShopPrice={this.updateShopPrice}
                                            showShops={this.state.settings["Show Locations"] !== "No"}
                                            showShopInput={this.state.settings["Shop Price Tracking"] === "Both" || this.state.settings["Shop Price Tracking"] === "Price Only"}
                                            showShopRupee={this.state.settings["Shop Price Tracking"] === "Both" || this.state.settings["Shop Price Tracking"] === "Wallet Tier"}
                                            handleDungeonTravel={this.handleDungeonTravel}
                                            classes={classes}
                                            dungeon={true}
                                            showUnshuffledEntrances={this.state.settings["Show Unshuffled Entrances"] === "Yes"}
                                            collapseSwitch={this.toggleCollapse}
                                            reverseCollapseSwitch={this.reverseCollapseHandler}
                                            mqSwitch={this.toggleMQ}
                                            isMQ={this.state.settings[area+" MQ"]}
                                            setRef={this.setRef}
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