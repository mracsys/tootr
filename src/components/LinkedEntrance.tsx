import React from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import LocationCheck from './LocationCheck'
import UnknownEntrance from './UnknownEntrance'
import FixedShopCheck from './FixedShopCheck';
import type { CollapsedRegions } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';
import type { MouseEvent } from 'react';
import { buildEntranceName, buildExitName, buildExitEntranceName } from './UnknownEntrance';

import { GraphRegion, GraphEntrance, GraphLocation } from '@mracsys/randomizer-graph-tool';
import LogicIndicator from './LogicIndicator';

import '@/styles/EntranceStyles.css';

interface LinkedEntranceProps {
    title: string,
    playerNum: number,
    collapsedRegions: CollapsedRegions,
    entrance: GraphEntrance,
    renderedConnectors: GraphEntrance[],
    currentPage: string,
    internalLocations: GraphLocation[],
    shopLocations: GraphLocation[],
    otherEntrances: GraphEntrance[],
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
    forceVisible: boolean,
    scrollRef: string,
    ekey: string,
    searchTerm: string,
    showAreaLocations: boolean,
    showEntranceLocations: boolean,
    regionIsFoolish: boolean,
    simMode: boolean,
    lastLocationName: string[],
    peekedLocations: Set<string>,
    fromWarp: boolean,
}

const LinkedEntrance = ({
    title,
    playerNum,
    collapsedRegions,
    entrance,
    renderedConnectors,
    currentPage,
    internalLocations,
    shopLocations,
    otherEntrances,
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
    forceVisible,
    scrollRef,
    ekey,
    searchTerm,
    showAreaLocations,
    showEntranceLocations,
    regionIsFoolish,
    simMode,
    lastLocationName,
    peekedLocations,
    fromWarp,
}: LinkedEntranceProps) => {
    const buildEntranceURL = (reverseLink: GraphEntrance): string => {
        let href: string = '';
        if (reverseLink.target_group?.page !== '') {
            href = `#${reverseLink.target_group?.alias}`;
        }
        return href;
    }

    let oEntrance = entrance;
    let reverseLink = !!(entrance.replaces) ? entrance.replaces : entrance;
    renderedConnectors.push(entrance);
    if (entrance.coupled && !!reverseLink.reverse) {
        renderedConnectors.push(reverseLink.reverse);
    }
    let targetDescription = (
        <div className="entranceLink">
            <div className="entranceLink1">
                {buildExitName(entrance)}
            </div>
            <div className="entranceLink2">
                {buildExitEntranceName(entrance)}
            </div>
        </div>
    );
    return (
        <React.Fragment key={ekey}>
            <LogicIndicator spot={entrance} showAgeLogic={showAgeLogic}>
                <div className="entranceContainer" key={entrance.name + "label"}>
                    { forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                    <div className="entranceLabel">
                        {buildEntranceName(entrance)}
                    </div>
                    {
                        reverseLink.target_group?.page !== '' ?
                        <a
                            href={buildEntranceURL(reverseLink)}
                            onClick={(reverseLink.target_group?.page !== currentPage) ?
                                    () => handleDungeonTravel(reverseLink.target_group, entrance)
                                    : () => {}}
                            className='overworldLinkAnchor'
                        >
                            {targetDescription}
                        </a>
                        :
                        <div className='falseLinkAnchor'>
                            {targetDescription}
                        </div>
                    }
                    {
                        (oEntrance.shuffled === true) ?
                            <IconButton
                                className="areaButton"
                                size="small"
                                component="span"
                                onClick={() => (simMode && entrance.checked) ?
                                    handleUnCheckEntrance(entrance.name) :
                                    handleUnLink(entrance.name, scrollRef)}
                                >
                                    <ClearIcon />
                                </IconButton> :
                            null
                    }
                </div>
            </LogicIndicator>
            {
                (shopLocations.length > 0) ?
                    <React.Fragment>
                        <div className="shopContainer">
                            {
                                /* Shop fixed items */
                                shopLocations.map((location, k) => {
                                    return (
                                        <FixedShopCheck
                                            key={entrance.name + 'shopfixedlocationcheck' + k}
                                            lkey={entrance.name + k}
                                            location={location}
                                            handleCheck={handleCheck}
                                            handleUnCheck={handleUnCheck}
                                            handleContextMenu={handleShopContextMenu}
                                            simMode={simMode}
                                        />
                                    );
                                })
                            }
                        </div>
                    </React.Fragment>
                    : null
            }
            {
                /* All other interior locations */
                internalLocations.map((location, k) => {
                    if (reverseLink.type !== 'Dungeon' && location.viewable(true) === true) {
                        return (
                            <LocationCheck
                                key={entrance + 'entrancelocationcheck' + k}
                                lkey={entrance.name + k}
                                location={location}
                                handleCheck={handleCheck}
                                handleUnCheck={handleUnCheck}
                                handleContextMenu={location.is_hint ? handleHintContextMenu : handleContextMenu}
                                toggleWalletTiers={toggleWalletTiers}
                                updateShopPrice={updateShopPrice}
                                showShopInput={showShopInput}
                                showShopRupee={showShopRupee}
                                showAgeLogic={showAgeLogic}
                                simMode={simMode}
                                lastLocationName={lastLocationName}
                                collapseRegion={collapsedRegions[title]}
                                peekedLocations={peekedLocations}
                            />
                        );
                    } else {
                        return null;
                    }
                })
            }
            {
                otherEntrances.map((otherEntrance, i) => { return (
                    <UnknownEntrance
                        forceVisible={true}
                        title={title}
                        playerNum={playerNum}
                        collapsedRegions={collapsedRegions}
                        entrance={otherEntrance}
                        connector={true}
                        renderedConnectors={renderedConnectors}
                        currentPage={currentPage}
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
                        showShopInput={showShopInput}
                        showShopRupee={showShopRupee}
                        showHints={showHints}
                        showAgeLogic={showAgeLogic}
                        scrollRef={scrollRef}
                        ekey={entrance.name + otherEntrance.name + ekey}
                        key={entrance.name + otherEntrance.name + ekey + i}
                        searchTerm={searchTerm}
                        showAreaLocations={showAreaLocations}
                        showEntranceLocations={showEntranceLocations}
                        regionIsFoolish={regionIsFoolish}
                        simMode={simMode}
                        lastLocationName={lastLocationName}
                        peekedLocations={peekedLocations}
                        fromWarp={fromWarp}
                    />
                )})
            }
        </React.Fragment>
    );
}

export default LinkedEntrance