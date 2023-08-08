import React from 'react';
import Switch from '@mui/material/Switch';
//import { withStyles } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import UnknownEntrance from './UnknownEntrance'
import LocationCheck from './LocationCheck'

/*const YellowSwitch = withStyles({
    switchBase: {
        color: '#ffffcf',
        '&$checked': {
            color: '#cbc26d',
        },
        '&$checked + $track': {
            backgroundColor: '#cbc693',
        },
    },
    checked: {},
    track: {},
})(Switch);*/

const GameArea = (props) => {
    //constructor(props) {
    //    super(props);
    //    this.currentRef = React.createRef();
    //}

    //shouldComponentUpdate(nextProps) {
    //    return true;
    //}

    Object.filterLocations = (locations, predicate) =>
        Object.keys(locations)
            .filter( key => predicate(locations[key].visible) );
    const preventDefault = (event) => event.preventDefault();
    return (
        <div className="areaCard">
            <a className="entranceAnchor" href={props.title} id={props.title} onClick={preventDefault}>
                {/* Fake text here to make eslint happy.
                    Can't wrap the actual title with the link because the areaTitle class breaks margin collapse needed
                    to offset the anchor below the appbar */}
                <span className="entranceAnchorFakeText">&nbsp;</span>
            </a>
            <div className="areaHeader" />
            <div className="areaTitle">
                <div
                    className="areaTitleCollapse"
                    onClick={() => props.collapseSwitch(props.title)}
                    onContextMenu={props.reverseCollapseSwitch.onContextMenu}
                    data-source={props.title}
                >
                    {
                        (props.allAreas[props.title].collapse === 'none') ?
                            <ExpandMore className="collapseArea" />
                            : (props.allAreas[props.title].collapse === 'some') ?
                            <ChevronRightIcon className="collapseArea" /> :
                            <ExpandLess className="collapseArea" />
                    }
                    <span className="areaTitleText">
                        {props.title}
                    </span>
                </div>
                {props.dungeon ?
                <React.Fragment>
                    <span className="mqSwitchLabel">MQ</span>
                    <Switch
                        variant="dungeon"
                        checked={props.isMQ}
                        onChange={() => {props.mqSwitch(props.title + " MQ")}}
                        name={props.title + "MQ"}
                    />
                </React.Fragment>
                : null}
            </div>
            {
                (props.allAreas[props.title].collapse !== 'all') ?
                <div>
                    <div>
                    { Object.keys(props.locations).map((location, i) => { 
                        if (props.allAreas.locations[location].check === '' || props.allAreas[props.title].collapse === 'none') { 
                            return (<React.Fragment key={props.title + 'locationcheckcontainer' + i}>
                                <LocationCheck
                                    key={props.title + "locationcheck" + i}
                                    lkey={props.title + "location" + i}
                                    location={location}
                                    allAreas={props.allAreas}
                                    classes={props.classes}
                                    handleCheck={props.handleCheck}
                                    handleUnCheck={props.handleUnCheck}
                                    handleItemMenuOpen={props.handleItemMenuOpen}
                                    handleItemMenuClose={props.handleItemMenuClose}
                                    handleContextMenu={props.handleContextMenu}
                                    handleFind={props.handleFind}
                                    toggleWalletTiers={props.toggleWalletTiers}
                                    updateShopPrice={props.updateShopPrice}
                                    showShopInput={props.showShopInput}
                                    showShopRupee={props.showShopRupee}
                                />
                            </React.Fragment>)
                        } else { return null; }
                    })}
                    </div>
                    { Object.keys(props.entrances).map((entrance, i) => {
                        let connectorShuffled = false;
                        let areaEntrances = props.allAreas.entrances;
                        function isConnectorShuffled(entrance, index, array) {
                            return areaEntrances[entrance].shuffled || areaEntrances[entrance].shuffled;
                        }
                        if (props.allAreas.entrances[entrance].connector !== "") {
                            if (Array.isArray(props.allAreas.entrances[entrance].connector)) {
                                connectorShuffled = props.allAreas.entrances[entrance].connector.some(isConnectorShuffled);
                            } else {
                                connectorShuffled = [props.allAreas.entrances[entrance].connector].some(isConnectorShuffled);
                            }
                        }
                        if ((!(props.showUnshuffledEntrances) && props.allAreas.entrances[entrance].shuffled === true) ||
                        (connectorShuffled && !(props.showUnshuffledEntrances)) ||
                        (props.showUnshuffledEntrances)) {
                            return (
                                <React.Fragment key={props.title + "entranceScrollContainer" + i}>
                                    <div className="scrollControl" id={props.title + "entranceScrollContainer" + i} key={props.title + "entranceScrollContainer" + i} />
                                    <UnknownEntrance
                                        forceVisible={false}
                                        title={props.title}
                                        entrance={entrance}
                                        entrances={props.entrances}
                                        connector={false}
                                        renderedConnectors={[]}
                                        entrancePools={props.entrancePools}
                                        oneWayEntrancePools={props.oneWayEntrancePools}
                                        mixedPools={props.mixedPools}
                                        decoupled={props.decoupled}
                                        overworld={props.overworld}
                                        allAreas={props.allAreas}
                                        allEntrances={props.allEntrances}
                                        handleLink={props.handleLink}
                                        handleUnLink={props.handleUnLink}
                                        handleCheck={props.handleCheck}
                                        handleUnCheck={props.handleUnCheck}
                                        handleItemMenuOpen={props.handleItemMenuOpen}
                                        handleItemMenuClose={props.handleItemMenuClose}
                                        handleContextMenu={props.handleContextMenu}
                                        handleShopContextMenu={props.handleShopContextMenu}
                                        handleEntranceMenuOpen={props.handleEntranceMenuOpen}
                                        handleFind={props.handleFind}
                                        toggleWalletTiers={props.toggleWalletTiers}
                                        updateShopPrice={props.updateShopPrice}
                                        showShops={props.showShops}
                                        showShopInput={props.showShopInput}
                                        showShopRupee={props.showShopRupee}
                                        handleDungeonTravel={props.handleDungeonTravel}
                                        dungeon={props.dungeon}
                                        classes={props.classes}
                                        ekey={props.title + "entrance" + i}
                                        key={props.title + "entranceContainer" + i}
                                        scrollRef={props.title + entrance}
                                    />
                                </React.Fragment>
                            );
                        } else { return null }
                    })}
                </div> : null
            }
        </div>
    );
}

export default GameArea