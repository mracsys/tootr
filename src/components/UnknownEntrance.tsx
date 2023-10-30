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
                internalLocations.push(...reverseLink.target_group.locations.filter(l => (!l.checked || collapsedRegions[title] === 'none') && l.viewable() && !l.is_hint));
                shopLocations.push(...reverseLink.target_group.locations.filter(l => l.is_shop && l.holds_shop_refill));
                otherEntrances.push(...reverseLink.target_group.exits.filter(e => !(renderedConnectors.includes(e)) && (e !== reverseLink.reverse || (!e.coupled && e.shuffled))));
            }
            if ((reverseLink.target_group.page !== ''
            || reverseLink.is_warp
            || (reverseLink.target_group.page === '' && (internalLocations.length > 0 || shopLocations.length > 0 || otherEntrances.length > 0)))) {
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
                        />
                    </React.Fragment>
                );
            }
        }
    } else { return null }
}

export default UnknownEntrance