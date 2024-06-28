import React, { MouseEvent } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GameArea from './GameArea';
import { TrackerSettingsCurrent } from '@/data/tracker_settings';
import type ContextMenuHandler from './ContextMenuHandler';
import type { CollapsedRegions } from './Tracker';
import WarpMenu from './WarpMenu';

import { GraphRegion, GraphEntrance } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerPaper.css';

interface TrackerPaperProps {
    viewableRegions: GraphRegion[],
    collapsedRegions: CollapsedRegions,
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
    collapseSwitch: (areaName: string) => void,
    reverseCollapseSwitch: ContextMenuHandler,
    setRef: (entranceKey: string, e: HTMLDivElement | null) => void,
    refreshCounter: number,
    searchTerm: string,
    trackerSettings: TrackerSettingsCurrent,
    simMode: boolean,
    lastLocationName: string[],
    lastEntranceName: string,
    isWarpAreaLinked: (entrance: GraphEntrance) => boolean;
    areaMenuHandler: ContextMenuHandler;
    pages: {[page: string]: GraphRegion[]};
    warps: GraphEntrance[];
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
                {
                    viewableRegions.map((region, regionIndex) => {
                        return (
                            <GameArea
                                region={region}
                                playerNum={trackerSettings.player_number}
                                collapsedRegions={collapsedRegions}
                                entrances={region.exits}
                                locations={region.locations}
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
                                showShops={trackerSettings.show_unshuffled_locations.includes('Shop Items')}
                                showShopInput={['Both','Price Only'].includes(trackerSettings.shop_price_tracking)}
                                showShopRupee={['Both','Wallet Tier'].includes(trackerSettings.shop_price_tracking)}
                                showUnshuffledEntrances={trackerSettings.show_unshuffled_entrances}
                                showAreaLocations={['Yes'].includes(trackerSettings.show_locations)}
                                showEntranceLocations={['Yes', 'Interiors Only'].includes(trackerSettings.show_locations)}
                                showHints={trackerSettings.show_hints}
                                showAgeLogic={trackerSettings.show_age_logic}
                                key={regionIndex}
                                refreshCounter={refreshCounter}
                                searchTerm={searchTerm}
                                simMode={simMode}
                                lastLocationName={lastLocationName}
                            />
                        )
                    })
                }
                </Masonry>
                </ResponsiveMasonry>
            </div>
            <WarpMenu
                isWarpAreaLinked={isWarpAreaLinked}
                handleDungeonTravel={handleDungeonTravel}
                areaMenuHandler={areaMenuHandler}
                pages={pages}
                warps={warps}
                raceMode={trackerSettings.race_mode}
            />
        </div>
    )
}

export default TrackerPaper;