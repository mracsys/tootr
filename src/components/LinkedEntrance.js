import React from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import LocationCheck from './LocationCheck'
import UnknownEntrance from './UnknownEntrance'
import FixedShopCheck from './FixedShopCheck';

const LinkedEntrance = (props) => {
    const buildExitName = (entrance) => {
        let eLink = props.allAreas.entrances[entrance].aLink;
        if (props.allAreas.entrances[eLink].tag === "" || props.allAreas.entrances[eLink].enableTag === false) {
            if (props.allAreas.entrances[eLink].type === "overworld") {
                return props.allAreas.entrances[eLink].reverseAlias;
            } else if (props.allAreas.entrances[eLink].isReverse) {
                return props.allAreas.entrances[props.allAreas.entrances[eLink].reverse].area;
            } else {
                return props.allAreas.entrances[eLink].alias;
            }
        } else { 
            return props.allAreas.entrances[eLink].tag;
        }
    }

    const buildExitEntranceName = (entrance) => {
        let eLink = props.allAreas.entrances[entrance].aLink;
        if (props.allAreas.entrances[eLink].tag === "" || props.allAreas.entrances[eLink].enableTag === false) {
            if (props.allAreas.entrances[eLink].type === "overworld") {
                return "from " + props.allAreas.entrances[eLink].alias;
            } else if (props.allAreas.entrances[eLink].isReverse) {
                return "from " + props.allAreas.entrances[props.allAreas.entrances[eLink].reverse].alias;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    const buildEntranceName = (entrance) => {
        if (props.allAreas.entrances[entrance].isReverse) {
            if (props.allAreas.entrances[props.allAreas.entrances[entrance].reverse].tag !== "" || props.allAreas.entrances[props.allAreas.entrances[entrance].reverse].enableTag === false) {
                return "from " + props.allAreas.entrances[props.allAreas.entrances[entrance].reverse].tag;
            } else {
                return props.allAreas.entrances[entrance].alias;
            }
        } else {
            if (entrance === 'GV Lower Stream -> Lake Hylia') {
                return 'Lake Hylia';
            } else {
                return props.allAreas.entrances[entrance].alias;
            }
        }
    }

    const buildEntranceURL = (reverseLink) => {
        let href;
        if ((props.allAreas.entrances[reverseLink].type === "overworld") || (props.allAreas.entrances[reverseLink].isReverse) || (props.allAreas.entrances[reverseLink].type === "extra")) {
            href = '#' + props.allAreas.entrances[reverseLink].area;
        }
        if (['warpsong', 'spawn', 'owldrop', 'overworldoneway'].includes(props.allAreas.entrances[reverseLink].type)) {
            if (props.allAreas.entrances[reverseLink].connector !== "") {
                if (props.allAreas.entrances[props.allAreas.entrances[reverseLink].connector].aLink !== "") {
                    href = '#' + props.allAreas.entrances[props.allAreas.entrances[props.allAreas.entrances[reverseLink].connector].aLink].area;
                }
            } else { 
                href = '#' + props.allAreas.entrances[reverseLink].area;
            }
        }
        if (props.allAreas.entrances[reverseLink].type === "dungeon" || props.allAreas.entrances[reverseLink].type === 'dungeonGanon') {
            if (props.allAreas.entrances[reverseLink].isReverse === true) {
                href = '#' + props.allAreas.entrances[reverseLink].area;
            } else {
                href = '#' + props.allAreas.entrances[reverseLink].alias;
            }
        }
        return href;
    }

    let oEntrance = props.allAreas.entrances[props.entrance];
    let reverseLink = oEntrance.aLink;
    let interiors = ['interior','specialInterior','hideoutInterior','grotto','grave','dungeon','dungeonGanon','boss','noBossShuffle'];
    let oneWayTypes = ['spawn','warpsong','owldrop','overworldoneway'];
    let otherEntrances = [];
    let shopLocations = Object.keys(props.allEntrances[reverseLink].locations).filter((a) => ((props.allAreas.locations[a].visible === false) && props.allAreas.locations[a].merchant));
    let internalLocations = Object.keys(props.allEntrances[reverseLink].locations).filter((l) => (props.allEntrances[reverseLink].locations[l].check === '' || props.allAreas[props.title].collapse === 'none'));
    if (props.connector === false || props.decoupled) {
        if ((interiors.includes(props.allAreas.entrances[reverseLink].type) &&
        (oneWayTypes.includes(oEntrance.type) || props.decoupled) &&
        !(props.allAreas.entrances[reverseLink].isReverse)) &&
        (props.allAreas.entrances[reverseLink].shuffled === true) &&
        !(props.renderedConnectors.includes(props.allAreas.entrances[reverseLink].reverse))) {
            otherEntrances.push({"entrance": props.allAreas.entrances[reverseLink].reverse,"ekey":"Reverse","connector": false});
            props.renderedConnectors.push(props.allAreas.entrances[reverseLink].reverse);
        }
        let connectorList = [];
        if (!Array.isArray(props.allAreas.entrances[reverseLink].connector)) {
            connectorList = [props.allAreas.entrances[reverseLink].connector];
        } else {
            connectorList = props.allAreas.entrances[reverseLink].connector;
        }
        connectorList.forEach((connector) => {
            if ((connector !== "" &&
            props.allAreas.entrances[connector].type !== 'overworld' &&
            (props.allAreas.entrances[connector].shuffled === true || 
            props.allAreas.entrances[connector].eLink === "" ||
            (props.allAreas.entrances[connector].area !== props.allAreas.entrances[reverseLink].area &&
            !(oneWayTypes.includes(oEntrance.type))))) && !(props.renderedConnectors.includes(connector))) {
                otherEntrances.push({"entrance": connector,"ekey":"ReverseConnector","connector": true});
                props.renderedConnectors.push(connector);
                shopLocations = shopLocations.concat(Object.keys(props.allEntrances[props.allAreas.entrances[connector].reverse].locations).filter((a) => ((props.allAreas.locations[a].visible === false) && props.allAreas.locations[a].merchant)));
                internalLocations = internalLocations.concat(Object.keys(props.allEntrances[props.allAreas.entrances[connector].reverse].locations).filter((l) => (props.allEntrances[props.allAreas.entrances[connector].reverse].locations[l].check === '' || props.allAreas[props.title].collapse === 'none')))
            }
        });
    }
    return (
        <React.Fragment key={props.ekey}>
            <div className="entranceContainer" key={props.entrance + "label"}>
                { props.forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                <div className="entranceLabel">
                    {buildEntranceName(props.entrance)}
                </div>
                <a
                    href={buildEntranceURL(reverseLink)}
                    onClick={(props.allAreas.entrances[reverseLink].type === "dungeon" || props.allAreas.entrances[reverseLink].type === "dungeonGanon" || props.dungeon) ?
                            () => props.handleDungeonTravel(reverseLink)
                            : () => {}}
                    className={(((props.allAreas.entrances[reverseLink].type === "overworld")
                                || (props.allAreas.entrances[reverseLink].type === "warpsong")
                                || (props.allAreas.entrances[reverseLink].type === "spawn")
                                || (props.allAreas.entrances[reverseLink].type === "owldrop")
                                || (props.allAreas.entrances[reverseLink].type === "overworldoneway")
                                || (props.allAreas.entrances[reverseLink].type === "dungeon")
                                || (props.allAreas.entrances[reverseLink].type === "dungeonGanon")
                                || (props.allAreas.entrances[reverseLink].type === "extra")
                                || (props.allAreas.entrances[reverseLink].isReverse)) ?
                                    "overworldLinkAnchor"
                                    : "falseLinkAnchor" )}
                >
                    <div className="entranceLink">
                        <div className="entranceLink1">
                            {buildExitName(props.entrance)}
                        </div>
                        <div className="entranceLink2">
                            {buildExitEntranceName(props.entrance)}
                        </div>
                    </div>
                </a>
                {
                    (oEntrance.shuffled === true) ?
                        <IconButton className="areaButton" size="small" component="span" onClick={() => props.handleUnLink(props.entrance, props.scrollRef)}><ClearIcon /></IconButton> :
                        null
                }
            </div>
            {
                ((shopLocations.length > 0) && (props.showShops === true)) ?
                    <React.Fragment>
                        <div className="shopContainer">
                            {
                                /* Shop fixed items */
                                shopLocations.map((location, k) => {
                                    return (
                                        <FixedShopCheck
                                            key={props.entrance + 'shopfixedlocationcheck' + k}
                                            lkey={props.entrance + k}
                                            location={location}
                                            allAreas={props.allAreas}
                                            classes={props.classes}
                                            handleCheck={props.handleCheck}
                                            handleUnCheck={props.handleUnCheck}
                                            handleItemMenuOpen={props.handleItemMenuOpen}
                                            handleItemMenuClose={props.handleItemMenuClose}
                                            handleContextMenu={props.handleShopContextMenu}
                                            handleFind={props.handleFind}
                                            toggleWalletTiers={props.toggleWalletTiers}
                                            updateShopPrice={props.updateShopPrice}
                                            showShopInput={props.showShopInput}
                                            showShopRupee={props.showShopRupee}
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
                ((props.decoupled === false && !(oneWayTypes.includes(oEntrance.type))) || (props.decoupled)) ?
                internalLocations.map((location, k) => {
                    if (props.allAreas.entrances[reverseLink].type !== 'dungeon' && props.allAreas.entrances[reverseLink].type !== 'dungeonGanon' && props.allAreas.locations[location].visible === true) {
                        return (
                            <LocationCheck
                                key={props.entrance + 'entrancelocationcheck' + k}
                                lkey={props.entrance + k}
                                location={location}
                                allAreas={props.allAreas}
                                classes={props.classes}
                                handleCheck={props.handleCheck}
                                handleUnCheck={props.handleUnCheck}
                                handleItemMenuOpen={props.handleItemMenuOpen}
                                handleItemMenuClose={props.handleItemMenuClose}
                                handleContextMenu={props.handleContextMenu}
                                handleFind={props.handleFind}
                                toggleWalletTiers={props.toggleWalletTiers}
                                updateShopPrice={props.updateShopPrice}
                                showShopInput={props.showShopInput}
                                showShopRupee={props.showShopRupee}
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
                        title={props.title}
                        entrance={otherEntrance.entrance}
                        entrances={props.entrances}
                        connector={otherEntrance.connector}
                        renderedConnectors={props.renderedConnectors}
                        entrancePools={props.entrancePools}
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
                        dungeon={props.dungeon}
                        classes={props.classes}
                        scrollRef={props.scrollRef}
                        ekey={props.entrance + otherEntrance.ekey + props.ekey}
                        key={props.entrance + otherEntrance.ekey + props.ekey + i}
                    />
                )})
            }
        </React.Fragment>
    );
}

export default LinkedEntrance