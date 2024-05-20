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

export const buildExitName = (entrance: GraphEntrance): string => {
    let eLink = !!(entrance.replaces) ? entrance.replaces : entrance;
    if (!eLink.use_target_alias) {
        return eLink.alias;
    } else {
        return eLink.target_alias;
    }
}

export const buildExitEntranceName = (entrance: GraphEntrance): string | null => {
    let eLink = !!(entrance.replaces) ? entrance.replaces : entrance;
    if (!!eLink.reverse && eLink.target_group?.page !== '') {
        return `from ${eLink.reverse.alias}`;
    } else {
        return null;
    }
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
    handleContextMenu: ContextMenuHandler,
    handleShopContextMenu: ContextMenuHandler,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    handleDungeonTravel: (targetRegion: GraphRegion | null) => void,
    toggleWalletTiers: (locationName: string) => void,
    updateShopPrice: (locationName: string, price: string) => void,
    showShops: boolean,
    showShopInput: boolean,
    showShopRupee: boolean,
    ekey: string,
    scrollRef: string,
    searchTerm: string,
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
    handleContextMenu,
    handleShopContextMenu,
    handleEntranceMenuOpen,
    handleDungeonTravel,
    toggleWalletTiers,
    updateShopPrice,
    showShops,
    showShopInput,
    showShopRupee,
    ekey,
    scrollRef,
    searchTerm,
}: UnknownEntranceProps) => {
    let eType = entrance.type;
    let reverseLink = !!(entrance.replaces) ? entrance.replaces : entrance;
    if (!!eType) {
        if (entrance.connected_region === null) {
            return (
                <React.Fragment>
                    { forceVisible === false ? <hr /> : null }
                    <UnLinkedEntrance
                        entrance={entrance}
                        connector={connector}
                        handleEntranceMenuOpen={handleEntranceMenuOpen}
                        forceVisible={forceVisible}
                        scrollRef={scrollRef}
                        ekey={ekey}
                    />
                </React.Fragment>
            );
        } else if (!!reverseLink.target_group) {
            let shopLocations: GraphLocation[] = [];
            let internalLocations: GraphLocation[] = [];
            let otherEntrances: GraphEntrance[] = [];
            if (!!reverseLink.target_group && reverseLink.target_group.page === '') {
                internalLocations.push(...reverseLink.target_group.locations.filter(l => (!l.checked || collapsedRegions[title] === 'none') && l.viewable(true) && !l.is_hint && (searchTerm === '' || l.alias.toLowerCase().includes(searchTerm.toLowerCase()))));
                shopLocations.push(...reverseLink.target_group.locations.filter(l => l.is_shop && l.holds_shop_refill && (searchTerm === '' || l.alias.toLowerCase().includes(searchTerm.toLowerCase()))));
                otherEntrances.push(...reverseLink.target_group.exits.filter(e => !(renderedConnectors.includes(e)) && (e.shuffled || e.target_group !== reverseLink.source_group) && (e !== reverseLink.reverse || (!e.coupled && e.shuffled))));
            }
            let entranceFrom = buildExitEntranceName(reverseLink);
            let searchMatch = searchTerm === ''
                || buildEntranceName(reverseLink).toLowerCase().includes(searchTerm.toLowerCase())
                || buildExitName(reverseLink).toLowerCase().includes(searchTerm.toLowerCase())
                || (entranceFrom !== null && entranceFrom.toLowerCase().includes(searchTerm.toLowerCase()));
            // Need to figure out what to do about nested entrances (decoupled, interior connectors)
            if (((reverseLink.target_group.page !== '' && searchMatch)
            || (reverseLink.is_warp && searchMatch)
            || (reverseLink.target_group.page === '' && ((searchMatch && searchTerm !== '') || internalLocations.length > 0 || shopLocations.length > 0 || otherEntrances.length > 0)))) {
                return (
                    <React.Fragment>
                        { forceVisible === false ? <hr /> : null }
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
                            handleContextMenu={handleContextMenu}
                            handleShopContextMenu={handleShopContextMenu}
                            toggleWalletTiers={toggleWalletTiers}
                            updateShopPrice={updateShopPrice}
                            showShops={showShops}
                            showShopInput={showShopInput}
                            showShopRupee={showShopRupee}
                            forceVisible={forceVisible}
                            scrollRef={scrollRef}
                            ekey={ekey}
                            searchTerm={searchTerm}
                        />
                    </React.Fragment>
                );
            } else { return null }
        } else { return null }
    } else { return null }
}

export default UnknownEntrance