import React, { MouseEvent } from 'react';
import UnLinkedEntrance from './UnlinkedEntrance'
import LinkedEntrance from './LinkedEntrance'
import type { AllAreas, AllEntrances, Entrance, Entrances } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';

interface UnknownEntranceProps {
    forceVisible: boolean,
    title: string,
    entrance: string,
    entrances: {[entranceName: string]: Entrance},
    connector: boolean,
    renderedConnectors: string[],
    entrancePools: Entrances,
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
    dungeon: boolean,
    ekey: string,
    scrollRef: string,
}

const UnknownEntrance = ({
    forceVisible,
    title,
    entrance,
    entrances,
    connector,
    renderedConnectors,
    entrancePools,
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
    dungeon,
    ekey,
    scrollRef,
}: UnknownEntranceProps) => {
    let eType = allAreas.entrances[entrance].type;
    let eExit = allAreas.entrances[entrance].aLink;
    let areaEntrances = allAreas.entrances;
    function isConnectorShuffled(entrance: string, _index: number, _array: string[]) {
        return areaEntrances[entrance].shuffled || areaEntrances[eExit].shuffled;
    }
    if (((title === "Spawn Points" && eType === "spawn") || (title === "Warp Songs" && eType === "warpsong") || (eType !== "spawn" && eType !== "warpsong" && eType !== "extra")) &&
        (allAreas.entrances[entrance].isReverse === false || forceVisible === true || allAreas.entrances[entrance].oneWay === true || allAreas.entrances[entrance].connector !== "" ||
        (dungeon && eType !== 'boss' && eType !== 'noBossShuffle')) &&
        ((entrance === 'GV Lower Stream -> Lake Hylia' && title === allAreas.entrances[entrance].oneWayArea) || (entrance !== 'GV Lower Stream -> Lake Hylia'))) {
//           ((entrance === 'GV Lower Stream -> Lake Hylia' && decoupled && overworld && title === allAreas.entrances[entrance].oneWayArea) || (entrance !== 'GV Lower Stream -> Lake Hylia'))) {
        let connectorShuffled = false;
        if (eExit !== "") {
            if (allAreas.entrances[eExit].connector !== "") {
                let connectorEntrance = allAreas.entrances[eExit].connector;
                if (Array.isArray(connectorEntrance)) {
                    connectorShuffled = connectorEntrance.some(isConnectorShuffled);
                } else {
                    connectorShuffled = [connectorEntrance].some(isConnectorShuffled);
                }
            }
        }
        if (allAreas.entrances[entrance].aLink === "") {
            return (
                <React.Fragment>
                    { forceVisible === false ? <hr /> : null }
                    <UnLinkedEntrance
                        entrance={entrance}
                        connector={connector}
                        oneWayEntrancePools={oneWayEntrancePools}
                        mixedPools={mixedPools}
                        decoupled={decoupled}
                        allAreas={allAreas}
                        handleEntranceMenuOpen={handleEntranceMenuOpen}
                        forceVisible={forceVisible}
                        scrollRef={scrollRef}
                        ekey={ekey}
                    />
                </React.Fragment>
            );
        } else if (Object.keys(allEntrances.entrances[allAreas.entrances[entrance].aLink].locations).filter((l) => 
            ((allAreas.locations[l].check === '' && allAreas.locations[l].visible === true)
            || (allAreas.locations[l].visible === false && allAreas.locations[l].merchant === true && allAreas.locations[l].foundItem !== '')
            || allAreas.areas[title].collapse === 'none')).length > 0 ||
            ['overworld','dungeon','warpsong','extra','spawn','owldrop','overworldoneway'].includes(allEntrances.entrances[allAreas.entrances[entrance].aLink].type) ||
            allAreas.entrances[allAreas.entrances[entrance].aLink].isReverse === true ||
            ['warpsong','spawn','owldrop','overworldoneway'].includes(allEntrances.entrances[entrance].type) ||
            allAreas.areas[title].collapse === 'none' ||
            connectorShuffled || connector ||
            (decoupled && allAreas.entrances[entrance].shuffled)) {
            return (
                <React.Fragment>
                    { forceVisible === false ? <hr /> : null }
                    <LinkedEntrance
                        title={title}
                        entrance={entrance}
                        entrances={entrances}
                        entrancePools={entrancePools}
                        connector={connector}
                        renderedConnectors={renderedConnectors}
                        oneWayEntrancePools={oneWayEntrancePools}
                        mixedPools={mixedPools}
                        decoupled={decoupled}
                        allAreas={allAreas}
                        allEntrances={allEntrances}
                        handleLink={handleLink}
                        handleEntranceMenuOpen={handleEntranceMenuOpen}
                        handleDungeonTravel={handleDungeonTravel}
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
                        forceVisible={forceVisible}
                        dungeon={dungeon}
                        scrollRef={scrollRef}
                        ekey={ekey}
                    />
                </React.Fragment>
            );
        } else {
            return null;
        }
    } else { return null }
}

export default UnknownEntrance