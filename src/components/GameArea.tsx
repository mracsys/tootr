import React, { MouseEventHandler, MouseEvent } from 'react';
import Switch from '@mui/material/Switch';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import UnknownEntrance from './UnknownEntrance'
import LocationCheck from './LocationCheck'
import type { AllAreas, AllEntrances, EntrancePool, Entrance, Entrances, Location } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';

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


interface GameAreaProps {
    title: string,
    entrances: {[entranceName: string]: Entrance},
    entrancePools: Entrances,
    oneWayEntrancePools: Entrances,
    mixedPools: string[],
    decoupled: boolean,
    allEntrances: AllEntrances,
    allAreas: AllAreas,
    locations: {[locationName: string]: Location},
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
    handleUnLink: (entrance: string, scrollRef: string) => void,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    handleContextMenu: ContextMenuHandler,
    handleShopContextMenu: ContextMenuHandler,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    handleDungeonTravel: (entrance: string, useConnector?: boolean) => void,
    toggleWalletTiers: (locationName: string) => void,
    updateShopPrice: (locationName: string, price: string) => void,
    showShops: boolean,
    showShopInput: boolean,
    showShopRupee: boolean,
    dungeon: boolean,
    showUnshuffledEntrances: boolean,
    collapseSwitch: (areaName: string) => void,
    reverseCollapseSwitch: ContextMenuHandler,
    setRef: (entranceKey: string, e: HTMLDivElement | null) => void,
    mqSwitch: (dungeonName: string) => void,
    isMQ: boolean,
}

const GameArea = ({
    title,
    entrances,
    entrancePools,
    oneWayEntrancePools,
    mixedPools,
    decoupled,
    allEntrances,
    allAreas,
    locations,
    handleLink,
    handleUnLink,
    handleCheck,
    handleUnCheck,
    handleContextMenu,
    handleShopContextMenu,
    handleEntranceMenuOpen,
    handleDungeonTravel,
    toggleWalletTiers,
    updateShopPrice,
    showShops,
    showShopInput,
    showShopRupee,
    dungeon,
    showUnshuffledEntrances,
    collapseSwitch,
    reverseCollapseSwitch,
    setRef,
    mqSwitch,
    isMQ,
}: GameAreaProps) => {
    //Object.filterLocations = (locations: {[locationName: string]: Location}, predicate) =>
    //    Object.keys(locations)
    //        .filter( key => predicate(locations[key].visible) );
    const preventDefault: MouseEventHandler = (event: MouseEvent) => event.preventDefault();
    return (
        <div className="areaCard">
            <a className="entranceAnchor" href={title} id={title} onClick={preventDefault}>
                {/* Fake text here to make eslint happy.
                    Can't wrap the actual title with the link because the areaTitle class breaks margin collapse needed
                    to offset the anchor below the appbar */}
                <span className="entranceAnchorFakeText">&nbsp;</span>
            </a>
            <div className="areaHeader" />
            <div className="areaTitle">
                <div
                    className="areaTitleCollapse"
                    onClick={() => collapseSwitch(title)}
                    onContextMenu={reverseCollapseSwitch.onContextMenu}
                    data-source={title}
                >
                    {
                        (allAreas.areas[title].collapse === 'none') ?
                            <ExpandMore className="collapseArea" />
                            : (allAreas.areas[title].collapse === 'some') ?
                            <ChevronRightIcon className="collapseArea" /> :
                            <ExpandLess className="collapseArea" />
                    }
                    <span className="areaTitleText">
                        {title}
                    </span>
                </div>
                {dungeon ?
                <React.Fragment>
                    <span className="mqSwitchLabel">MQ</span>
                    <Switch
                        className="dungeonMQSwitch"
                        checked={isMQ}
                        onChange={() => {mqSwitch(title + " MQ")}}
                        name={title + "MQ"}
                    />
                </React.Fragment>
                : null}
            </div>
            {
                (allAreas.areas[title].collapse !== 'all') ?
                <div>
                    <div>
                    { Object.keys(locations).map((location, i) => { 
                        if (allAreas.locations[location].check === '' || allAreas.areas[title].collapse === 'none') { 
                            return (<React.Fragment key={title + 'locationcheckcontainer' + i}>
                                <LocationCheck
                                    key={title + "locationcheck" + i}
                                    lkey={title + "location" + i}
                                    location={location}
                                    allAreas={allAreas}
                                    handleCheck={handleCheck}
                                    handleUnCheck={handleUnCheck}
                                    handleContextMenu={handleContextMenu}
                                    toggleWalletTiers={toggleWalletTiers}
                                    updateShopPrice={updateShopPrice}
                                    showShopInput={showShopInput}
                                    showShopRupee={showShopRupee}
                                />
                            </React.Fragment>)
                        } else { return null; }
                    })}
                    </div>
                    { Object.keys(entrances).map((entrance, i) => {
                        let connectorShuffled = false;
                        let areaEntrances = allAreas.entrances;
                        function isConnectorShuffled(entrance: string, index: number, array: string[]) {
                            return areaEntrances[entrance].shuffled || areaEntrances[entrance].shuffled;
                        }
                        if (allAreas.entrances[entrance].connector !== "") {
                            let connector = allAreas.entrances[entrance].connector;
                            if (Array.isArray(connector)) {
                                connectorShuffled = connector.some(isConnectorShuffled);
                            } else {
                                connectorShuffled = [connector].some(isConnectorShuffled);
                            }
                        }
                        if ((!(showUnshuffledEntrances) && allAreas.entrances[entrance].shuffled === true) ||
                        (connectorShuffled && !(showUnshuffledEntrances)) ||
                        (showUnshuffledEntrances)) {
                            return (
                                <React.Fragment key={title + "entranceScrollContainer" + i}>
                                    <div className="scrollControl" ref={(e) => setRef(title + entrance, e)} id={title + "entranceScrollContainer" + i} key={title + "entranceScrollContainer" + i} />
                                    <UnknownEntrance
                                        forceVisible={false}
                                        title={title}
                                        entrance={entrance}
                                        entrances={entrances}
                                        connector={false}
                                        renderedConnectors={[]}
                                        entrancePools={entrancePools}
                                        oneWayEntrancePools={oneWayEntrancePools}
                                        mixedPools={mixedPools}
                                        decoupled={decoupled}
                                        allAreas={allAreas}
                                        allEntrances={allEntrances}
                                        handleLink={handleLink}
                                        handleUnLink={handleUnLink}
                                        handleCheck={handleCheck}
                                        handleUnCheck={handleUnCheck}
                                        handleContextMenu={handleContextMenu}
                                        handleShopContextMenu={handleShopContextMenu}
                                        handleEntranceMenuOpen={handleEntranceMenuOpen}
                                        handleDungeonTravel={handleDungeonTravel}
                                        toggleWalletTiers={toggleWalletTiers}
                                        updateShopPrice={updateShopPrice}
                                        showShops={showShops}
                                        showShopInput={showShopInput}
                                        showShopRupee={showShopRupee}
                                        dungeon={dungeon}
                                        ekey={title + "entrance" + i}
                                        key={title + "entranceContainer" + i}
                                        scrollRef={title + entrance}
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