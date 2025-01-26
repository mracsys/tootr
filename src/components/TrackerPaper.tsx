import React, { MouseEvent } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GameArea from './GameArea';
import { TrackerSettingsCurrent } from '@/data/tracker_settings';
import type ContextMenuHandler from './ContextMenuHandler';
import type { CollapsedRegions } from './Tracker';
import WarpMenu from './WarpMenu';
import { locationFilter, entranceOrTargetMatchesTerm } from './UnknownEntrance';

import { GraphRegion, GraphEntrance, GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerPaper.css';

interface TrackerPaperProps {
    viewableRegions: GraphRegion[],
    collapsedRegions: CollapsedRegions,
    handleLink: (dataLinkFrom: string, dataLinkTo: string) => void,
    handleUnLink: (entrance: string, scrollRef: string) => void,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    handleCheckEntrance: (entranceName: string, fromWarp?: boolean) => void,
    handleUnCheckEntrance: (entranceName: string) => void,
    handleContextMenu: ContextMenuHandler,
    handleShopContextMenu: ContextMenuHandler,
    handleHintContextMenu: ContextMenuHandler,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    handleDungeonTravel: (targetRegion: GraphRegion | null, regionEntrance?: GraphEntrance | null) => void,
    toggleWalletTiers: (locationName: string) => void,
    updateShopPrice: (locationName: string, price: string) => void,
    collapseSwitch: (areaName: string) => void,
    reverseCollapseSwitch: ContextMenuHandler,
    setRef: (entranceKey: string, e: HTMLDivElement | null) => void,
    refreshCounter: number,
    searchTerm: string,
    trackerSettings: TrackerSettingsCurrent,
    simMode: boolean,
    lastLocationName: string[],
    lastEntranceName: string,
    isWarpAreaLinked: (entrance: GraphEntrance) => boolean,
    areaMenuHandler: ContextMenuHandler,
    pages: {[page: string]: GraphRegion[]},
    warps: GraphEntrance[],
    peekedLocations: Set<string>,
}

const TrackerPaper = ({
    viewableRegions,
    collapsedRegions,
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
    collapseSwitch,
    reverseCollapseSwitch,
    setRef,
    refreshCounter,
    searchTerm,
    trackerSettings,
    simMode,
    lastLocationName,
    lastEntranceName,
    isWarpAreaLinked,
    areaMenuHandler,
    pages,
    warps,
    peekedLocations,
}: TrackerPaperProps) => {
    /*
        sidebar-width = 480px (expanded), 0px (hidden)
        window-padding = sidebar-width + areaPaper.padding(20px) * 2
        column-gap = 20px
        min-column-width = 540px
        cutoff = window-padding + (column-width + column-gap) * column-count
    */
    const masonryBreakpoints: {[breakpoint: number]: number} = trackerSettings.expand_sidebar ? {
        0:    1,
        1360: 2,
        1780: 3,
        2200: 4,
        2620: 5,
        3040: 6,
        3460: 7,
    } : {
        0:    1,
        880:  2,
        1300: 3,
        1720: 4,
        2140: 5,
        2560: 6,
        2980: 7,
        3400: 8,
    };

    let cards = viewableRegions.map((region, regionIndex) => {
        let title = region.name;
        let showAreaLocations = ['Yes'].includes(trackerSettings.show_locations);
        let showHints = trackerSettings.show_hints;
        let filteredLocations: GraphLocation[] = region.locations.filter((location) => showAreaLocations && locationFilter(location, collapsedRegions, title, showHints, region.is_not_required, lastLocationName, simMode, peekedLocations, searchTerm));
        // At the moment, the only unshuffled entrances that have
        // connectors of a different entrance type are:
        //      Dampe's Grave -> Windmill exit
        //      Spawn points
        //      Warp songs
        // Dampe's Grave has locations that will always be visible,
        // and the one-ways are forced visible, so checking for connector
        // visibility to determine main entrance visibility is redundant.
        let connectorShuffled = false;
        let showUnshuffledEntrances = trackerSettings.show_unshuffled_entrances;
        let showEntranceLocations = ['Yes', 'Interiors Only'].includes(trackerSettings.show_locations);
        let showShops = trackerSettings.show_unshuffled_locations.includes('Shop Items');
        let filteredEntrances: GraphEntrance[] = region.exits.filter((entrance) => 
            ((!showUnshuffledEntrances && (entrance.shuffled || connectorShuffled)) || showUnshuffledEntrances) &&
            entranceOrTargetMatchesTerm(entrance, collapsedRegions, title, searchTerm, showEntranceLocations, showShops, showHints, region.is_not_required, lastLocationName, simMode, peekedLocations)).sort((a, b) => a.type_priority - b.type_priority || a.alias.localeCompare(b.alias));
    
        // Don't show areas that don't match search criteria
        if (filteredEntrances.length === 0 && filteredLocations.length === 0 && searchTerm !== '') {
            return null;
        }
        // Don't show areas with unshuffled entrances that all lead to the same area.
        // Used to filter out Thieves Hideout subregions when unshuffled without pots/crates/keys shuffled
        if (region.exits.filter((e) => e.shuffled || (!e.use_target_alias && !e.is_reverse()) || (!!e.reverse && !e.reverse.use_target_alias && e.is_reverse())).length === 0
        && filteredLocations.length === 0) {
            return null;
        }

        return (
            <GameArea
                region={region}
                playerNum={trackerSettings.player_number}
                collapsedRegions={collapsedRegions}
                currentPage={trackerSettings.region_page}
                collapseSwitch={collapseSwitch}
                reverseCollapseSwitch={reverseCollapseSwitch}
                setRef={setRef}
                handleLink={handleLink}
                handleUnLink={handleUnLink}
                handleCheck={handleCheck}
                handleUnCheck={handleUnCheck}
                handleCheckEntrance={handleCheckEntrance}
                handleUnCheckEntrance={handleUnCheckEntrance}
                handleContextMenu={handleContextMenu}
                handleShopContextMenu={handleShopContextMenu}
                handleHintContextMenu={handleHintContextMenu}
                handleEntranceMenuOpen={handleEntranceMenuOpen}
                handleDungeonTravel={handleDungeonTravel}
                toggleWalletTiers={toggleWalletTiers}
                updateShopPrice={updateShopPrice}
                showShops={showShops}
                showShopInput={['Both','Price Only'].includes(trackerSettings.shop_price_tracking)}
                showShopRupee={['Both','Wallet Tier'].includes(trackerSettings.shop_price_tracking)}
                showUnshuffledEntrances={showUnshuffledEntrances}
                showAreaLocations={showAreaLocations}
                showEntranceLocations={showEntranceLocations}
                showHints={showHints}
                showAgeLogic={trackerSettings.show_age_logic}
                key={regionIndex}
                refreshCounter={refreshCounter}
                searchTerm={searchTerm}
                simMode={simMode}
                lastLocationName={lastLocationName}
                peekedLocations={peekedLocations}
                isSubArea={false}
            />
        )
    }).filter(a => a !== null);

    return (
        <div
            className={trackerSettings.expand_sidebar ? "areaPaper areaPaperShift" : "areaPaper"}
        >
            <div className="drawerHeader"></div>
            <div id='worldScrollContainer' className='worldInfo'>
                {!!lastEntranceName ?
                    <div className="lastEntranceNameMessage">{`Entered ${lastEntranceName}`}</div>
                    : null
                }
                <ResponsiveMasonry columnsCountBreakPoints={masonryBreakpoints}>
                <Masonry gutter="20px">
                    {cards}
                </Masonry>
                </ResponsiveMasonry>
            </div>
            <WarpMenu
                isWarpAreaLinked={isWarpAreaLinked}
                handleDungeonTravel={handleDungeonTravel}
                checkEntrance={handleCheckEntrance}
                areaMenuHandler={areaMenuHandler}
                pages={pages}
                warps={warps}
                raceMode={trackerSettings.race_mode}
            />
        </div>
    )
}

export default TrackerPaper;