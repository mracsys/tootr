import React, { MouseEventHandler, MouseEvent } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import UnknownEntrance, { locationFilter, entranceOrTargetMatchesTerm } from './UnknownEntrance';
import LocationCheck from './LocationCheck';
import type { CollapsedRegions } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';

import { GraphRegion, GraphEntrance, GraphLocation } from '@mracsys/randomizer-graph-tool';

interface GameAreaProps {
    region: GraphRegion,
    playerNum: number,
    collapsedRegions: CollapsedRegions,
    entrances: GraphEntrance[],
    locations: GraphLocation[],
    currentPage: string,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
    handleUnLink: (entrance: string, scrollRef: string) => void,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    handleContextMenu: ContextMenuHandler,
    handleShopContextMenu: ContextMenuHandler,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    handleDungeonTravel: (targetRegion: GraphRegion | null) => void,
    toggleWalletTiers: (locationName: string) => void,
    updateShopPrice: (locationName: string, price: string) => void,
    showShops: boolean,
    showShopInput: boolean,
    showShopRupee: boolean,
    showUnshuffledEntrances: boolean,
    collapseSwitch: (areaName: string) => void,
    reverseCollapseSwitch: ContextMenuHandler,
    setRef: (entranceKey: string, e: HTMLDivElement | null) => void,
    refreshCounter: number,
    searchTerm: string,
}

const GameArea = ({
    region,
    playerNum,
    collapsedRegions,
    entrances,
    locations,
    currentPage,
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
    showUnshuffledEntrances,
    collapseSwitch,
    reverseCollapseSwitch,
    setRef,
    refreshCounter,
    searchTerm,
}: GameAreaProps) => {
    const preventDefault: MouseEventHandler = (event: MouseEvent) => event.preventDefault();
    let title = region.name;

    let filteredLocations: GraphLocation[] = locations.filter((location) => locationFilter(location, collapsedRegions, title, searchTerm));
    // At the moment, the only unshuffled entrances that have
    // connectors of a different entrance type are:
    //      Dampe's Grave -> Windmill exit
    //      Spawn points
    //      Warp songs
    // Dampe's Grave has locations that will always be visible,
    // and the one-ways are forced visible, so checking for connector
    // visibility to determine main entrance visibility is redundant.
    let connectorShuffled = false;
    let filteredEntrances: GraphEntrance[] = entrances.filter((entrance) => 
        ((!showUnshuffledEntrances && (entrance.shuffled || connectorShuffled)) || showUnshuffledEntrances) &&
        entranceOrTargetMatchesTerm(entrance, collapsedRegions, title, searchTerm)).sort((a, b) => a.type_priority - b.type_priority || a.alias.localeCompare(b.alias));

    if (filteredEntrances.length === 0 && filteredLocations.length === 0 && searchTerm !== '') {
        return null;
    }
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
                        (collapsedRegions[title] === 'none') ?
                            <ExpandMore className="collapseArea" />
                            : (collapsedRegions[title] === 'some' || collapsedRegions[title] === undefined) ?
                            <ChevronRightIcon className="collapseArea" /> :
                            <ExpandLess className="collapseArea" />
                    }
                    <span className="areaTitleText">
                        {title}
                    </span>
                </div>
                <span className="areaRefreshCounter">
                    {refreshCounter}
                </span>
            </div>
            {
                (collapsedRegions[title] !== 'all') ?
                <div>
                    <div>
                    { filteredLocations.map((location, i) => { 
                        return (<React.Fragment key={title + 'locationcheckcontainer' + i}>
                            <LocationCheck
                                key={title + "locationcheck" + i}
                                lkey={title + "location" + i}
                                location={location}
                                handleCheck={handleCheck}
                                handleUnCheck={handleUnCheck}
                                handleContextMenu={handleContextMenu}
                                toggleWalletTiers={toggleWalletTiers}
                                updateShopPrice={updateShopPrice}
                                showShopInput={showShopInput}
                                showShopRupee={showShopRupee}
                            />
                        </React.Fragment>)
                    })}
                    </div>
                    { filteredEntrances.map((entrance, i) => {
                        return (
                            <React.Fragment key={title + "entranceScrollContainer" + i}>
                                <div className="scrollControl" ref={(e) => setRef(title + entrance.name, e)} id={title + "entranceScrollContainer" + i} key={title + "entranceScrollContainer" + i} />
                                <UnknownEntrance
                                    title={title}
                                    playerNum={playerNum}
                                    collapsedRegions={collapsedRegions}
                                    entrance={entrance}
                                    currentPage={currentPage}
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

                                    connector={false}
                                    forceVisible={false}
                                    renderedConnectors={[]}

                                    ekey={title + "entrance" + i}
                                    key={title + "entranceContainer" + i}
                                    scrollRef={title + entrance.name}
                                    searchTerm={searchTerm}
                                />
                            </React.Fragment>
                        );
                    })}
                </div> : null
            }
        </div>
    );
}

export default GameArea