import React from 'react';
import UnLinkedEntrance from './UnlinkedEntrance'
import LinkedEntrance from './LinkedEntrance'

const UnknownEntrance = (props) => {
    let eType = props.allAreas.entrances[props.entrance].type;
    let eExit = props.allAreas.entrances[props.entrance].aLink;
    if (((props.title === "Spawn Points" && eType === "spawn") || (props.title === "Warp Songs" && eType === "warpsong") || (eType !== "spawn" && eType !== "warpsong" && eType !== "extra")) &&
        (props.allAreas.entrances[props.entrance].isReverse === false || props.forceVisible === true || props.allAreas.entrances[props.entrance].oneWay === true || props.allAreas.entrances[props.entrance].connector !== "" ||
        (props.dungeon && eType !== 'boss' && eType !== 'noBossShuffle')) &&
        ((props.entrance === 'GV Lower Stream -> Lake Hylia' && props.title === props.allAreas.entrances[props.entrance].oneWayArea) || (props.entrance !== 'GV Lower Stream -> Lake Hylia'))) {
//           ((props.entrance === 'GV Lower Stream -> Lake Hylia' && props.decoupled && props.overworld && props.title === props.allAreas.entrances[props.entrance].oneWayArea) || (props.entrance !== 'GV Lower Stream -> Lake Hylia'))) {
        let connectorShuffled = false;
        let areaEntrances = props.allAreas.entrances;
        function isConnectorShuffled(entrance, index, array) {
            return areaEntrances[entrance].shuffled || areaEntrances[eExit].shuffled;
        }
        if (eExit !== "") {
            if (props.allAreas.entrances[eExit].connector !== "") {
                if (Array.isArray(props.allAreas.entrances[eExit].connector)) {
                    connectorShuffled = props.allAreas.entrances[eExit].connector.some(isConnectorShuffled);
                } else {
                    connectorShuffled = [props.allAreas.entrances[eExit].connector].some(isConnectorShuffled);
                }
            }
        }
        if (props.allAreas.entrances[props.entrance].aLink === "") {
            return (
                <React.Fragment>
                    { props.forceVisible === false ? <hr /> : null }
                    <UnLinkedEntrance
                        title={props.title}
                        entrance={props.entrance}
                        entrances={props.entrances}
                        entrancePools={props.entrancePools}
                        connector={props.connector}
                        oneWayEntrancePools={props.oneWayEntrancePools}
                        mixedPools={props.mixedPools}
                        decoupled={props.decoupled}
                        allAreas={props.allAreas}
                        handleLink={props.handleLink}
                        handleEntranceMenuOpen={props.handleEntranceMenuOpen}
                        forceVisible={props.forceVisible}
                        classes={props.classes}
                        scrollRef={props.scrollRef}
                        ekey={props.ekey}
                    />
                </React.Fragment>
            );
        } else if (Object.keys(props.allEntrances[props.allAreas.entrances[props.entrance].aLink].locations).filter((l) => 
            ((props.allAreas.locations[l].check === '' && props.allAreas.locations[l].visible === true)
            || (props.allAreas.locations[l].visible === false && props.allAreas.locations[l].merchant === true && props.allAreas.locations[l].foundItem !== '')
            || props.allAreas[props.title].collapse === 'none')).length > 0 ||
            ['overworld','dungeon','warpsong','extra','spawn','owldrop','overworldoneway'].includes(props.allEntrances[props.allAreas.entrances[props.entrance].aLink].type) ||
            props.allAreas.entrances[props.allAreas.entrances[props.entrance].aLink].isReverse === true ||
            ['warpsong','spawn','owldrop','overworldoneway'].includes(props.allEntrances[props.entrance].type) ||
            props.allAreas[props.title].collapse === 'none' ||
            connectorShuffled || props.connector ||
            (props.decoupled && props.allAreas.entrances[props.entrance].shuffled)) {
            return (
                <React.Fragment>
                    { props.forceVisible === false ? <hr /> : null }
                    <LinkedEntrance
                        title={props.title}
                        entrance={props.entrance}
                        entrances={props.entrances}
                        entrancePools={props.entrancePools}
                        connector={props.connector}
                        renderedConnectors={props.renderedConnectors}
                        oneWayEntrancePools={props.oneWayEntrancePools}
                        mixedPools={props.mixedPools}
                        decoupled={props.decoupled}
                        allAreas={props.allAreas}
                        allEntrances={props.allEntrances}
                        handleLink={props.handleLink}
                        handleEntranceMenuOpen={props.handleEntranceMenuOpen}
                        handleUnLink={props.handleUnLink}
                        handleCheck={props.handleCheck}
                        handleUnCheck={props.handleUnCheck}
                        handleItemMenuOpen={props.handleItemMenuOpen}
                        handleItemMenuClose={props.handleItemMenuClose}
                        handleContextMenu={props.handleContextMenu}
                        handleShopContextMenu={props.handleShopContextMenu}
                        handleFind={props.handleFind}
                        toggleWalletTiers={props.toggleWalletTiers}
                        updateShopPrice={props.updateShopPrice}
                        showShops={props.showShops}
                        showShopInput={props.showShopInput}
                        showShopRupee={props.showShopRupee}
                        handleDungeonTravel={props.handleDungeonTravel}
                        forceVisible={props.forceVisible}
                        dungeon={props.dungeon}
                        classes={props.classes}
                        scrollRef={props.scrollRef}
                        ekey={props.ekey}
                    />
                </React.Fragment>
            );
        } else {
            return null;
        }
    } else { return null }
}

export default UnknownEntrance