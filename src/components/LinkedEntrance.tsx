import React from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import LocationCheck from './LocationCheck'
import UnknownEntrance from './UnknownEntrance'
import FixedShopCheck from './FixedShopCheck';
import type { AllAreas, AllEntrances, Entrance, Entrances } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';
import type { MouseEvent } from 'react';

interface LinkedEntranceProps {
    title: string,
    entrance: string,
    entrances: {[entranceName: string]: Entrance},
    entrancePools: Entrances,
    connector: boolean,
    renderedConnectors: string[],
    oneWayEntrancePools: Entrances,
    mixedPools: string[],
    decoupled: boolean,
    allAreas: AllAreas,
    allEntrances: AllEntrances,
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
    forceVisible: boolean,
    dungeon: boolean,
    scrollRef: string,
    ekey: string,
}

const LinkedEntrance = ({
    title,
    entrance,
    entrances,
    entrancePools,
    connector,
    renderedConnectors,
    oneWayEntrancePools,
    mixedPools,
    decoupled,
    allAreas,
    allEntrances,
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
    forceVisible,
    dungeon,
    scrollRef,
    ekey,
}: LinkedEntranceProps) => {
    const buildExitName = (entrance: string): string => {
        let eLink = allAreas.entrances[entrance].aLink;
        if (allAreas.entrances[eLink].tag === "" || allAreas.entrances[eLink].enableTag === false) {
            if (allAreas.entrances[eLink].type === "overworld") {
                return allAreas.entrances[eLink].reverseAlias;
            } else if (allAreas.entrances[eLink].isReverse) {
                return allAreas.entrances[allAreas.entrances[eLink].reverse].area;
            } else {
                return allAreas.entrances[eLink].alias;
            }
        } else { 
            return allAreas.entrances[eLink].tag;
        }
    }

    const buildExitEntranceName = (entrance: string): string | null => {
        let eLink = allAreas.entrances[entrance].aLink;
        if (allAreas.entrances[eLink].tag === "" || allAreas.entrances[eLink].enableTag === false) {
            if (allAreas.entrances[eLink].type === "overworld") {
                return "from " + allAreas.entrances[eLink].alias;
            } else if (allAreas.entrances[eLink].isReverse) {
                return "from " + allAreas.entrances[allAreas.entrances[eLink].reverse].alias;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const buildEntranceName = (entrance: string): string => {
        if (allAreas.entrances[entrance].isReverse) {
            if (allAreas.entrances[allAreas.entrances[entrance].reverse].tag !== "" || allAreas.entrances[allAreas.entrances[entrance].reverse].enableTag === false) {
                return "from " + allAreas.entrances[allAreas.entrances[entrance].reverse].tag;
            } else {
                return allAreas.entrances[entrance].alias;
            }
        } else {
            if (entrance === 'GV Lower Stream -> Lake Hylia') {
                return 'Lake Hylia';
            } else {
                return allAreas.entrances[entrance].alias;
            }
        }
    }

    const buildEntranceURL = (reverseLink: string): string => {
        let href: string = '';
        if ((allAreas.entrances[reverseLink].type === "overworld") || (allAreas.entrances[reverseLink].isReverse) || (allAreas.entrances[reverseLink].type === "extra")) {
            href = '#' + allAreas.entrances[reverseLink].area;
        }
        if (['warpsong', 'spawn', 'owldrop', 'overworldoneway'].includes(allAreas.entrances[reverseLink].type)) {
            if (allAreas.entrances[reverseLink].connector !== "") {
                let connectorList = allAreas.entrances[reverseLink].connector;
                let connectorHref: string;
                if (Array.isArray(connectorList)) {
                    connectorHref = connectorList[0];
                } else {
                    connectorHref = connectorList;
                }
                if (allAreas.entrances[connectorHref].aLink !== "") {
                    href = '#' + allAreas.entrances[allAreas.entrances[connectorHref].aLink].area;
                }
            } else { 
                href = '#' + allAreas.entrances[reverseLink].area;
            }
        }
        if (allAreas.entrances[reverseLink].type === "dungeon" || allAreas.entrances[reverseLink].type === 'dungeonGanon') {
            if (allAreas.entrances[reverseLink].isReverse === true) {
                href = '#' + allAreas.entrances[reverseLink].area;
            } else {
                href = '#' + allAreas.entrances[reverseLink].alias;
            }
        }
        return href;
    }

    let oEntrance = allAreas.entrances[entrance];
    let reverseLink = oEntrance.aLink;
    let interiors = ['interior','specialInterior','hideoutInterior','grotto','grave','dungeon','dungeonGanon','boss','noBossShuffle'];
    let oneWayTypes = ['spawn','warpsong','owldrop','overworldoneway'];
    let otherEntrances = [];
    let shopLocations = Object.keys(allEntrances.entrances[reverseLink].locations).filter((a) => ((allAreas.locations[a].visible === false) && allAreas.locations[a].merchant));
    let internalLocations = Object.keys(allEntrances.entrances[reverseLink].locations).filter((l) => (allEntrances.entrances[reverseLink].locations[l].check === '' || allAreas.areas[title].collapse === 'none'));
    if (connector === false || decoupled) {
        if ((interiors.includes(allAreas.entrances[reverseLink].type) &&
        (oneWayTypes.includes(oEntrance.type) || decoupled) &&
        !(allAreas.entrances[reverseLink].isReverse)) &&
        (allAreas.entrances[reverseLink].shuffled === true) &&
        !(renderedConnectors.includes(allAreas.entrances[reverseLink].reverse))) {
            otherEntrances.push({"entrance": allAreas.entrances[reverseLink].reverse,"ekey":"Reverse","connector": false});
            renderedConnectors.push(allAreas.entrances[reverseLink].reverse);
        }
        let connectorList: string[];
        let connectorListTypeCheck = allAreas.entrances[reverseLink].connector;
        if (!Array.isArray(connectorListTypeCheck)) {
            connectorList = [connectorListTypeCheck];
        } else {
            connectorList = connectorListTypeCheck;
        }
        connectorList.forEach((connectorEntrance) => {
            if ((connectorEntrance !== "" &&
            allAreas.entrances[connectorEntrance].type !== 'overworld' &&
            (allAreas.entrances[connectorEntrance].shuffled === true || 
            allAreas.entrances[connectorEntrance].eLink === "" ||
            (allAreas.entrances[connectorEntrance].area !== allAreas.entrances[reverseLink].area &&
            !(oneWayTypes.includes(oEntrance.type))))) && !(renderedConnectors.includes(connectorEntrance))) {
                otherEntrances.push({"entrance": connectorEntrance,"ekey":"ReverseConnector","connector": true});
                renderedConnectors.push(connectorEntrance);
                shopLocations = shopLocations.concat(Object.keys(allEntrances.entrances[allAreas.entrances[connectorEntrance].reverse].locations).filter((a) => ((allAreas.locations[a].visible === false) && allAreas.locations[a].merchant)));
                internalLocations = internalLocations.concat(Object.keys(allEntrances.entrances[allAreas.entrances[connectorEntrance].reverse].locations).filter((l) => (allEntrances.entrances[allAreas.entrances[connectorEntrance].reverse].locations[l].check === '' || allAreas.areas[title].collapse === 'none')))
            }
        });
    }
    return (
        <React.Fragment key={ekey}>
            <div className="entranceContainer" key={entrance + "label"}>
                { forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                <div className="entranceLabel">
                    {buildEntranceName(entrance)}
                </div>
                <a
                    href={buildEntranceURL(reverseLink)}
                    onClick={(allAreas.entrances[reverseLink].type === "dungeon" || allAreas.entrances[reverseLink].type === "dungeonGanon" || dungeon) ?
                            () => handleDungeonTravel(reverseLink)
                            : () => {}}
                    className={(((allAreas.entrances[reverseLink].type === "overworld")
                                || (allAreas.entrances[reverseLink].type === "warpsong")
                                || (allAreas.entrances[reverseLink].type === "spawn")
                                || (allAreas.entrances[reverseLink].type === "owldrop")
                                || (allAreas.entrances[reverseLink].type === "overworldoneway")
                                || (allAreas.entrances[reverseLink].type === "dungeon")
                                || (allAreas.entrances[reverseLink].type === "dungeonGanon")
                                || (allAreas.entrances[reverseLink].type === "extra")
                                || (allAreas.entrances[reverseLink].isReverse)) ?
                                    "overworldLinkAnchor"
                                    : "falseLinkAnchor" )}
                >
                    <div className="entranceLink">
                        <div className="entranceLink1">
                            {buildExitName(entrance)}
                        </div>
                        <div className="entranceLink2">
                            {buildExitEntranceName(entrance)}
                        </div>
                    </div>
                </a>
                {
                    (oEntrance.shuffled === true) ?
                        <IconButton className="areaButton" size="small" component="span" onClick={() => handleUnLink(entrance, scrollRef)}><ClearIcon /></IconButton> :
                        null
                }
            </div>
            {
                ((shopLocations.length > 0) && (showShops === true)) ?
                    <React.Fragment>
                        <div className="shopContainer">
                            {
                                /* Shop fixed items */
                                shopLocations.map((location, k) => {
                                    return (
                                        <FixedShopCheck
                                            key={entrance + 'shopfixedlocationcheck' + k}
                                            lkey={entrance + k}
                                            location={location}
                                            allAreas={allAreas}
                                            handleContextMenu={handleShopContextMenu}
                                        />
                                    );
                                })
                            }
                        </div>
                        <hr />
                    </React.Fragment>
                    : null
            }
            {
                /* All other interior locations */
                ((decoupled === false && !(oneWayTypes.includes(oEntrance.type))) || (decoupled)) ?
                internalLocations.map((location, k) => {
                    if (allAreas.entrances[reverseLink].type !== 'dungeon' && allAreas.entrances[reverseLink].type !== 'dungeonGanon' && allAreas.locations[location].visible === true) {
                        return (
                            <LocationCheck
                                key={entrance + 'entrancelocationcheck' + k}
                                lkey={entrance + k}
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
                        );
                    } else {
                        return null;
                    }
                }) :
                null
            }
            {
                otherEntrances.map((otherEntrance, i) => { return (
                    <UnknownEntrance
                        forceVisible={true}
                        title={title}
                        entrance={otherEntrance.entrance}
                        entrances={entrances}
                        connector={otherEntrance.connector}
                        renderedConnectors={renderedConnectors}
                        entrancePools={entrancePools}
                        oneWayEntrancePools={oneWayEntrancePools}
                        mixedPools={mixedPools}
                        decoupled={decoupled}
                        allAreas={allAreas}
                        allEntrances={allEntrances}
                        handleLink={handleLink}
                        handleEntranceMenuOpen={handleEntranceMenuOpen}
                        handleUnLink={handleUnLink}
                        handleCheck={handleCheck}
                        handleUnCheck={handleUnCheck}
                        handleContextMenu={handleContextMenu}
                        handleShopContextMenu={handleShopContextMenu}
                        toggleWalletTiers={toggleWalletTiers}
                        updateShopPrice={updateShopPrice}
                        showShops={showShops}
                        showShopInput={showShopInput}
                        showShopRupee={showShopRupee}
                        handleDungeonTravel={handleDungeonTravel}
                        dungeon={dungeon}
                        scrollRef={scrollRef}
                        ekey={entrance + otherEntrance.ekey + ekey}
                        key={entrance + otherEntrance.ekey + ekey + i}
                    />
                )})
            }
        </React.Fragment>
    );
}

export default LinkedEntrance