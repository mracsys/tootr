import React, { MouseEvent } from 'react';
import UnLinkedEntrance from './UnlinkedEntrance'
import LinkedEntrance from './LinkedEntrance'
import type { CollapsedRegions } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';

import { GraphRegion, GraphEntrance, GraphLocation } from '@mracsys/randomizer-graph-tool';

export const buildEntranceName = (entrance: GraphEntrance): string => {
    //let eLink = !!(entrance.replaces) ? entrance.replaces : entrance;
    let eLink = entrance;
    if (eLink.is_reverse()) {
        if (!!eLink.reverse?.use_target_alias) {
            return `from ${eLink.reverse.target_alias}`;
        } else if (!!eLink.reverse?.alias) {
            return `from ${eLink.reverse.alias}`;
        } else {
            return `from ${eLink.alias}`;
        }
    } else {
        return entrance.alias;
    }
}

export const buildExitName = (entrance: GraphEntrance, original: boolean = false): string => {
    let eLink = !!(entrance.replaces) && !original ? entrance.replaces : entrance;
    if (!eLink.use_target_alias) {
        return eLink.alias;
    } else {
        return eLink.target_alias;
    }
}

export const buildExitEntranceName = (entrance: GraphEntrance, original: boolean = false): string | null => {
    let eLink = !!(entrance.replaces) && !original ? entrance.replaces : entrance;
    if (!!eLink.reverse && eLink.target_group?.page !== '') {
        return `from ${eLink.reverse.alias}`;
    } else {
        return null;
    }
}

export const locationFilter = (l: GraphLocation, collapsedRegions: CollapsedRegions, title: string, showHints: boolean, regionIsFoolish: boolean, lastLocationName: string[], simMode: boolean, peekedLocations: Set<string>, searchTerm: string = ''): boolean => {
    return (!l.checked || collapsedRegions[title] === 'none' || lastLocationName.includes(l.name) || searchTerm !== '') &&
            l.viewable(true) &&
            ((!l.is_hint && (!regionIsFoolish || collapsedRegions[title] === 'none')) || (l.is_hint && showHints && l.alias !== l.name) || l.is_restricted) &&
            (searchTerm === '' || 
                l.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (!!l.item && l.item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (!simMode || l.checked || peekedLocations.has(l.name))));
}

export const shopLocationFilter = (l: GraphLocation, showShops: boolean, searchTerm: string = ''): boolean => {
    return (l.is_shop && l.holds_shop_refill) && (showShops || l.shuffled) &&
            (searchTerm === '' || 
                l.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (!!l.item && l.item.name.toLowerCase().includes(searchTerm.toLowerCase())));
}

export const entranceOrTargetMatchesTerm = (entrance: GraphEntrance, collapsedRegions: CollapsedRegions, title: string, searchTerm: string, showEntranceLocations: boolean, showShops: boolean, showHints: boolean, regionIsFoolish: boolean, lastLocationName: string[], simMode: boolean, peekedLocations: Set<string>, renderedConnectors: GraphEntrance[] = []): boolean => {
    // no filtering if no search term
    if (searchTerm === '') return true;

    // main entrance name or target name match
    let searchTermTest = searchTerm.toLowerCase();
    let entranceFrom = buildExitEntranceName(entrance);
    let searchMatch = buildEntranceName(entrance).toLowerCase().includes(searchTermTest)
                    || ((!simMode || entrance.checked)
                        && (buildExitName(entrance).toLowerCase().includes(searchTermTest)
                        || (entranceFrom !== null && entranceFrom.toLowerCase().includes(searchTermTest))));
    if (searchMatch) return true;

    let targetEntrance = !!(entrance.replaces) ? entrance.replaces : entrance;
    if (!!targetEntrance.target_group && targetEntrance.target_group.page === '' && (!entrance.shuffled || (entrance.connected_region !== null && (!simMode || entrance.checked)))) {
        if (targetEntrance.target_group.page === '') { // prevents chaining into other overworld area tiles
            // immediate target area locations match
            let targetLocations = targetEntrance.target_group.locations.filter((location) => showEntranceLocations && locationFilter(location, collapsedRegions, title, showHints, regionIsFoolish, lastLocationName, simMode, peekedLocations, searchTerm) || shopLocationFilter(location, showShops, searchTerm));
            if (targetLocations.length > 0) return true;

            // connector entrance recursion match
            renderedConnectors.push(entrance);
            if (entrance.coupled && !!targetEntrance.reverse) {
                renderedConnectors.push(targetEntrance.reverse);
            }
            let connectors = targetEntrance.target_group.exits.filter(e => !(renderedConnectors.includes(e)) && (e.shuffled || e.target_group !== targetEntrance.source_group) && (e !== targetEntrance.reverse || (!e.coupled && e.shuffled)));
            for (let connector of connectors) {
                if (entranceOrTargetMatchesTerm(connector, collapsedRegions, title, searchTerm, showEntranceLocations, showShops, showHints, regionIsFoolish, lastLocationName, simMode, peekedLocations, renderedConnectors)) {
                    return true;
                }
            }
        }
    }
    return false;
}

interface UnknownEntranceProps {
    forceVisible: boolean,
    title: string,
    playerNum: number,
    collapsedRegions: CollapsedRegions,
    entrance: GraphEntrance,
    connector: boolean,
    renderedConnectors: GraphEntrance[],
    currentPage: string,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
    handleUnLink: (entrance: string, scrollRef: string) => void,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    handleCheckEntrance: (entranceName: string) => void,
    handleUnCheckEntrance: (entranceName: string) => void,
    handleContextMenu: ContextMenuHandler,
    handleShopContextMenu: ContextMenuHandler,
    handleHintContextMenu: ContextMenuHandler,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    handleDungeonTravel: (targetRegion: GraphRegion | null, regionEntrance?: GraphEntrance | null) => void,
    toggleWalletTiers: (locationName: string) => void,
    updateShopPrice: (locationName: string, price: string) => void,
    showShops: boolean,
    showShopInput: boolean,
    showShopRupee: boolean,
    showHints: boolean,
    showAgeLogic: boolean,
    ekey: string,
    scrollRef: string,
    searchTerm: string,
    showAreaLocations: boolean,
    showEntranceLocations: boolean,
    regionIsFoolish: boolean,
    simMode: boolean,
    lastLocationName: string[],
    peekedLocations: Set<string>,
    fromWarp?: boolean,
}

const UnknownEntrance = ({
    forceVisible,
    title,
    playerNum,
    collapsedRegions,
    entrance,
    connector,
    renderedConnectors,
    currentPage,
    handleLink,
    handleUnLink,
    handleCheck,
    handleUnCheck,
    handleCheckEntrance,
    handleUnCheckEntrance,
    handleContextMenu,
    handleShopContextMenu,
    handleHintContextMenu,
    handleEntranceMenuOpen,
    handleDungeonTravel,
    toggleWalletTiers,
    updateShopPrice,
    showShops,
    showShopInput,
    showShopRupee,
    showHints,
    showAgeLogic,
    ekey,
    scrollRef,
    searchTerm,
    showAreaLocations,
    showEntranceLocations,
    regionIsFoolish,
    simMode,
    lastLocationName,
    peekedLocations,
    fromWarp = false,
}: UnknownEntranceProps) => {
    let eType = entrance.type;
    let reverseLink = !!(entrance.replaces) ? entrance.replaces : entrance;
    let rootIsWarp = fromWarp || entrance.is_warp || entrance.reverse === null;
    if (!!eType) {
        if (entrance.connected_region === null || (simMode && !entrance.checked && entrance.shuffled)) {
            return (
                <React.Fragment>
                    <UnLinkedEntrance
                        entrance={entrance}
                        connector={connector}
                        handleEntranceMenuOpen={handleEntranceMenuOpen}
                        handleCheckEntrance={handleCheckEntrance}
                        forceVisible={forceVisible}
                        showAgeLogic={showAgeLogic}
                        simMode={simMode}
                        scrollRef={scrollRef}
                        ekey={ekey}
                    />
                </React.Fragment>
            );
        } else if (!!reverseLink.target_group) {
            let shopLocations: GraphLocation[] = [];
            let internalLocations: GraphLocation[] = [];
            let otherEntrances: GraphEntrance[] = [];
            let showHideoutExit = false;
            let isFoolish = reverseLink.target_group.is_hint_region ? reverseLink.target_group.is_not_required : regionIsFoolish;
            if (!!reverseLink.target_group && reverseLink.target_group.page === '') {
                internalLocations.push(...reverseLink.target_group.locations.filter(l => showEntranceLocations && locationFilter(l, collapsedRegions, title, showHints, isFoolish, lastLocationName, simMode, peekedLocations, searchTerm)));
                shopLocations.push(...reverseLink.target_group.locations.filter(l => showEntranceLocations && shopLocationFilter(l, showShops, searchTerm)));
                otherEntrances.push(...reverseLink.target_group.exits.filter(e => 
                    !(renderedConnectors.includes(e)) &&
                    (e.shuffled || entrance.source_group !== (!!e.replaces ? e.replaces : e).target_group || rootIsWarp) && // || e.target_group !== reverseLink.source_group
                    (e !== reverseLink.reverse || rootIsWarp || (!e.coupled && e.shuffled)) &&
                    entranceOrTargetMatchesTerm(e, collapsedRegions, title, searchTerm, showEntranceLocations, showShops, showHints, isFoolish, lastLocationName, simMode, peekedLocations, [...renderedConnectors])));
            } else if (!!reverseLink.target_group && reverseLink.use_target_alias && reverseLink.target_group.page !== '') {
                let target_foolish = reverseLink.target_group.is_not_required;
                let filteredLocations: GraphLocation[] = reverseLink.target_group.locations.filter((location) => showAreaLocations && locationFilter(location, collapsedRegions, title, showHints, target_foolish, lastLocationName, simMode, peekedLocations, searchTerm));
                let filteredEntrances: GraphEntrance[] = reverseLink.target_group.entrances.filter((e) => e.shuffled || (!e.use_target_alias && !e.is_reverse()) || (!!e.reverse && !e.reverse.use_target_alias && e.is_reverse()));
                showHideoutExit = filteredEntrances.length !== 0 || filteredLocations.length !== 0;
            }
            if (((reverseLink.target_group.page !== '' && !reverseLink.use_target_alias)
                || (reverseLink.target_group.page !== '' && showHideoutExit))
            || rootIsWarp
            || (reverseLink.target_group.page === '' && (searchTerm !== '' || internalLocations.length > 0 || shopLocations.length > 0 || otherEntrances.length > 0 || collapsedRegions[title] === 'none'))) {
                return (
                    <React.Fragment>
                        <LinkedEntrance
                            title={title}
                            playerNum={playerNum}
                            collapsedRegions={collapsedRegions}
                            entrance={entrance}
                            renderedConnectors={renderedConnectors}
                            currentPage={currentPage}
                            internalLocations={internalLocations}
                            shopLocations={shopLocations}
                            otherEntrances={otherEntrances}
                            handleLink={handleLink}
                            handleEntranceMenuOpen={handleEntranceMenuOpen}
                            handleDungeonTravel={handleDungeonTravel}
                            handleUnLink={handleUnLink}
                            handleCheck={handleCheck}
                            handleUnCheck={handleUnCheck}
                            handleCheckEntrance={handleCheckEntrance}
                            handleUnCheckEntrance={handleUnCheckEntrance}
                            handleContextMenu={handleContextMenu}
                            handleShopContextMenu={handleShopContextMenu}
                            handleHintContextMenu={handleHintContextMenu}
                            toggleWalletTiers={toggleWalletTiers}
                            updateShopPrice={updateShopPrice}
                            showShops={showShops}
                            showShopInput={showShopInput}
                            showShopRupee={showShopRupee}
                            showHints={showHints}
                            showAgeLogic={showAgeLogic}
                            forceVisible={forceVisible}
                            scrollRef={scrollRef}
                            ekey={ekey}
                            searchTerm={searchTerm}
                            showAreaLocations={showAreaLocations}
                            showEntranceLocations={showEntranceLocations}
                            regionIsFoolish={regionIsFoolish}
                            simMode={simMode}
                            lastLocationName={lastLocationName}
                            peekedLocations={peekedLocations}
                            fromWarp={rootIsWarp}
                        />
                    </React.Fragment>
                );
            } else { return null }
        } else { return null }
    } else { return null }
}

export default UnknownEntrance