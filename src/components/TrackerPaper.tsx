import { MouseEvent } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GameArea from './GameArea';
import { TrackerSettingsCurrent } from '@/data/tracker_settings';
import type ContextMenuHandler from './ContextMenuHandler';
import type { CollapsedRegions } from './Tracker';

import { GraphRegion } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerPaper.css';

interface TrackerPaperProps {
    viewableRegions: GraphRegion[],
    collapsedRegions: CollapsedRegions,
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
    collapseSwitch: (areaName: string) => void,
    reverseCollapseSwitch: ContextMenuHandler,
    setRef: (entranceKey: string, e: HTMLDivElement | null) => void,
    refreshCounter: number,
    searchTerm: string,
    trackerSettings: TrackerSettingsCurrent,
}

const TrackerPaper = ({
    viewableRegions,
    collapsedRegions,
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
    collapseSwitch,
    reverseCollapseSwitch,
    setRef,
    refreshCounter,
    searchTerm,
    trackerSettings,
}: TrackerPaperProps) => {
    /*
        sidebar-width = 490px (expanded), 0px (hidden)
        window-padding = sidebar-width + areaPaper.padding(20px) * 2
        column-gap = 20px
        min-column-width = 540px
        cutoff = window-padding + (column-width + column-gap) * column-count
    */
    const masonryBreakpoints: {[breakpoint: number]: number} = trackerSettings.expand_sidebar ? {
        0: 1,
        1650: 2,
        2210: 3,
        2770: 4,
        3330: 5,
    } : {
        0: 1,
        1160: 2,
        1720: 3,
        2280: 4,
        2840: 5,
        3400: 6,
    };

    return (
        <div
            className={trackerSettings.expand_sidebar ? "areaPaper areaPaperShift" : "areaPaper"}
        >
            <div className="drawerHeader"></div>
            <div className='worldInfo'>
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
                                handleContextMenu={handleContextMenu}
                                handleShopContextMenu={handleShopContextMenu}
                                handleEntranceMenuOpen={handleEntranceMenuOpen}
                                handleDungeonTravel={handleDungeonTravel}
                                toggleWalletTiers={toggleWalletTiers}
                                updateShopPrice={updateShopPrice}
                                showShops={true}
                                showShopInput={['Both','Price Only'].includes(trackerSettings.shop_price_tracking)}
                                showShopRupee={['Both','Wallet Tier'].includes(trackerSettings.shop_price_tracking)}
                                showUnshuffledEntrances={trackerSettings.show_unshuffled_entrances}
                                key={regionIndex}
                                refreshCounter={refreshCounter}
                                searchTerm={searchTerm}
                            />
                        )
                    })
                }
                </Masonry>
                </ResponsiveMasonry>
            </div>
        </div>
    )
}

export default TrackerPaper;