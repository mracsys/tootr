import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import LocationCheck from './LocationCheck'
import UnknownEntrance from './UnknownEntrance'
import FixedShopCheck from './FixedShopCheck';

class LinkedEntrance extends React.Component {
    buildExitName(entrance) {
        let eLink = this.props.allAreas.entrances[entrance].aLink;
        if (this.props.allAreas.entrances[eLink].tag === "" || this.props.allAreas.entrances[eLink].enableTag === false) {
            if (this.props.allAreas.entrances[eLink].type === "overworld") {
                return this.props.allAreas.entrances[eLink].reverseAlias;
            } else if (this.props.allAreas.entrances[eLink].isReverse) {
                return this.props.allAreas.entrances[this.props.allAreas.entrances[eLink].reverse].area;
            } else {
                return this.props.allAreas.entrances[eLink].alias;
            }
        } else { 
            return this.props.allAreas.entrances[eLink].tag;
        }
    }

    buildExitEntranceName(entrance) {
        let eLink = this.props.allAreas.entrances[entrance].aLink;
        if (this.props.allAreas.entrances[eLink].tag === "" || this.props.allAreas.entrances[eLink].enableTag === false) {
            if (this.props.allAreas.entrances[eLink].type === "overworld") {
                return "from " + this.props.allAreas.entrances[eLink].alias;
            } else if (this.props.allAreas.entrances[eLink].isReverse) {
                return "from " + this.props.allAreas.entrances[this.props.allAreas.entrances[eLink].reverse].alias;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    buildEntranceName(entrance) {
        if (this.props.allAreas.entrances[entrance].isReverse) {
            if (this.props.allAreas.entrances[this.props.allAreas.entrances[entrance].reverse].tag !== "" || this.props.allAreas.entrances[this.props.allAreas.entrances[entrance].reverse].enableTag === false) {
                return "from " + this.props.allAreas.entrances[this.props.allAreas.entrances[entrance].reverse].tag;
            } else {
                return this.props.allAreas.entrances[entrance].alias;
            }
        } else {
            if (entrance === 'GV Lower Stream -> Lake Hylia') {
                return 'Lake Hylia';
            } else {
                return this.props.allAreas.entrances[entrance].alias;
            }
        }
    }

    buildEntranceURL(reverseLink) {
        let href;
        if ((this.props.allAreas.entrances[reverseLink].type === "overworld") || (this.props.allAreas.entrances[reverseLink].isReverse) || (this.props.allAreas.entrances[reverseLink].type === "extra")) {
            href = '#' + this.props.allAreas.entrances[reverseLink].area;
        }
        if (['warpsong', 'spawn', 'owldrop', 'overworldoneway'].includes(this.props.allAreas.entrances[reverseLink].type)) {
            if (this.props.allAreas.entrances[reverseLink].connector !== "") {
                if (this.props.allAreas.entrances[this.props.allAreas.entrances[reverseLink].connector].aLink !== "") {
                    href = '#' + this.props.allAreas.entrances[this.props.allAreas.entrances[this.props.allAreas.entrances[reverseLink].connector].aLink].area;
                }
            } else { 
                href = '#' + this.props.allAreas.entrances[reverseLink].area;
            }
        }
        if (this.props.allAreas.entrances[reverseLink].type === "dungeon" || this.props.allAreas.entrances[reverseLink].type === 'dungeonGanon') {
            if (this.props.allAreas.entrances[reverseLink].isReverse === true) {
                href = '#' + this.props.allAreas.entrances[reverseLink].area;
            } else {
                href = '#' + this.props.allAreas.entrances[reverseLink].alias;
            }
        }
        return href;
    }

    render() {
        let oEntrance = this.props.allAreas.entrances[this.props.entrance];
        let reverseLink = oEntrance.aLink;
        let interiors = ['interior','specialInterior','hideoutInterior','grotto','grave','dungeon','dungeonGanon','boss','noBossShuffle'];
        let oneWayTypes = ['spawn','warpsong','owldrop','overworldoneway'];
        let otherEntrances = [];
        let shopLocations = Object.keys(this.props.allEntrances[reverseLink].locations).filter((a) => ((this.props.allAreas.locations[a].visible === false) && this.props.allAreas.locations[a].merchant));
        let internalLocations = Object.keys(this.props.allEntrances[reverseLink].locations).filter((l) => (this.props.allEntrances[reverseLink].locations[l].check === '' || this.props.allAreas[this.props.title].collapse === 'none'));
        if (this.props.connector === false || this.props.decoupled) {
            if ((interiors.includes(this.props.allAreas.entrances[reverseLink].type) &&
            (oneWayTypes.includes(oEntrance.type) || this.props.decoupled) &&
            !(this.props.allAreas.entrances[reverseLink].isReverse)) &&
            (this.props.allAreas.entrances[reverseLink].shuffled === true) &&
            !(this.props.renderedConnectors.includes(this.props.allAreas.entrances[reverseLink].reverse))) {
                otherEntrances.push({"entrance": this.props.allAreas.entrances[reverseLink].reverse,"ekey":"Reverse","connector": false});
                this.props.renderedConnectors.push(this.props.allAreas.entrances[reverseLink].reverse);
            }
            let connectorList = [];
            if (!Array.isArray(this.props.allAreas.entrances[reverseLink].connector)) {
                connectorList = [this.props.allAreas.entrances[reverseLink].connector];
            } else {
                connectorList = this.props.allAreas.entrances[reverseLink].connector;
            }
            connectorList.forEach((connector) => {
                if ((connector !== "" &&
                this.props.allAreas.entrances[connector].type !== 'overworld' &&
                (this.props.allAreas.entrances[connector].shuffled === true || 
                this.props.allAreas.entrances[connector].eLink === "" ||
                (this.props.allAreas.entrances[connector].area !== this.props.allAreas.entrances[reverseLink].area &&
                !(oneWayTypes.includes(oEntrance.type))))) && !(this.props.renderedConnectors.includes(connector))) {
                    otherEntrances.push({"entrance": connector,"ekey":"ReverseConnector","connector": true});
                    this.props.renderedConnectors.push(connector);
                    shopLocations = shopLocations.concat(Object.keys(this.props.allEntrances[this.props.allAreas.entrances[connector].reverse].locations).filter((a) => ((this.props.allAreas.locations[a].visible === false) && this.props.allAreas.locations[a].merchant)));
                    internalLocations = internalLocations.concat(Object.keys(this.props.allEntrances[this.props.allAreas.entrances[connector].reverse].locations).filter((l) => (this.props.allEntrances[this.props.allAreas.entrances[connector].reverse].locations[l].check === '' || this.props.allAreas[this.props.title].collapse === 'none')))
                }
            });
        }
        return (
            <React.Fragment key={this.props.ekey}>
                <div className={this.props.classes.entranceContainer} key={this.props.entrance + "label"}>
                    { this.props.forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                    <div className={this.props.classes.entranceLabel}>
                        {this.buildEntranceName(this.props.entrance)}
                    </div>
                    <a
                        href={this.buildEntranceURL(reverseLink)}
                        onClick={(this.props.allAreas.entrances[reverseLink].type === "dungeon" || this.props.allAreas.entrances[reverseLink].type === "dungeonGanon" || this.props.dungeon) ?
                                () => this.props.handleDungeonTravel(reverseLink)
                                : () => {}}
                        className={(((this.props.allAreas.entrances[reverseLink].type === "overworld")
                                    || (this.props.allAreas.entrances[reverseLink].type === "warpsong")
                                    || (this.props.allAreas.entrances[reverseLink].type === "spawn")
                                    || (this.props.allAreas.entrances[reverseLink].type === "owldrop")
                                    || (this.props.allAreas.entrances[reverseLink].type === "overworldoneway")
                                    || (this.props.allAreas.entrances[reverseLink].type === "dungeon")
                                    || (this.props.allAreas.entrances[reverseLink].type === "dungeonGanon")
                                    || (this.props.allAreas.entrances[reverseLink].type === "extra")
                                    || (this.props.allAreas.entrances[reverseLink].isReverse)) ?
                                        this.props.classes.overworldLinkAnchor
                                        : this.props.classes.falseLinkAnchor )}
                    >
                        <div className={this.props.classes.entranceLink}>
                            <div className={this.props.classes.entranceLink1}>
                                {this.buildExitName(this.props.entrance)}
                            </div>
                            <div className={this.props.classes.entranceLink2}>
                                {this.buildExitEntranceName(this.props.entrance)}
                            </div>
                        </div>
                    </a>
                    {
                        (oEntrance.shuffled === true) ?
                            <IconButton className={this.props.classes.areaButton} size="small" component="span" onClick={() => this.props.handleUnLink(this.props.entrance, this.props.scrollRef)}><ClearIcon /></IconButton> :
                            null
                    }
                </div>
                {
                    ((shopLocations.length > 0) && (this.props.showShops === true)) ?
                        <React.Fragment>
                            <div className={this.props.classes.shopContainer}>
                                {
                                    /* Shop fixed items */
                                    shopLocations.map((location, k) => {
                                        return (
                                            <FixedShopCheck
                                                key={this.props.entrance + 'shopfixedlocationcheck' + k}
                                                lkey={this.props.entrance + k}
                                                location={location}
                                                allAreas={this.props.allAreas}
                                                classes={this.props.classes}
                                                handleCheck={this.props.handleCheck}
                                                handleUnCheck={this.props.handleUnCheck}
                                                handleItemMenuOpen={this.props.handleItemMenuOpen}
                                                handleItemMenuClose={this.props.handleItemMenuClose}
                                                handleContextMenu={this.props.handleShopContextMenu}
                                                handleFind={this.props.handleFind}
                                                toggleWalletTiers={this.props.toggleWalletTiers}
                                                updateShopPrice={this.props.updateShopPrice}
                                                showShopInput={this.props.showShopInput}
                                                showShopRupee={this.props.showShopRupee}
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
                    ((this.props.decoupled === false && !(oneWayTypes.includes(oEntrance.type))) || (this.props.decoupled)) ?
                    internalLocations.map((location, k) => {
                        if (this.props.allAreas.entrances[reverseLink].type !== 'dungeon' && this.props.allAreas.entrances[reverseLink].type !== 'dungeonGanon' && this.props.allAreas.locations[location].visible === true) {
                            return (
                                <LocationCheck
                                    key={this.props.entrance + 'entrancelocationcheck' + k}
                                    lkey={this.props.entrance + k}
                                    location={location}
                                    allAreas={this.props.allAreas}
                                    classes={this.props.classes}
                                    handleCheck={this.props.handleCheck}
                                    handleUnCheck={this.props.handleUnCheck}
                                    handleItemMenuOpen={this.props.handleItemMenuOpen}
                                    handleItemMenuClose={this.props.handleItemMenuClose}
                                    handleContextMenu={this.props.handleContextMenu}
                                    handleFind={this.props.handleFind}
                                    toggleWalletTiers={this.props.toggleWalletTiers}
                                    updateShopPrice={this.props.updateShopPrice}
                                    showShopInput={this.props.showShopInput}
                                    showShopRupee={this.props.showShopRupee}
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
                            title={this.props.title}
                            entrance={otherEntrance.entrance}
                            entrances={this.props.entrances}
                            connector={otherEntrance.connector}
                            renderedConnectors={this.props.renderedConnectors}
                            entrancePools={this.props.entrancePools}
                            oneWayEntrancePools={this.props.oneWayEntrancePools}
                            mixedPools={this.props.mixedPools}
                            decoupled={this.props.decoupled}
                            allAreas={this.props.allAreas}
                            allEntrances={this.props.allEntrances}
                            handleLink={this.props.handleLink}
                            handleEntranceMenuOpen={this.props.handleEntranceMenuOpen}
                            handleUnLink={this.props.handleUnLink}
                            handleCheck={this.props.handleCheck}
                            handleUnCheck={this.props.handleUnCheck}
                            handleItemMenuOpen={this.props.handleItemMenuOpen}
                            handleItemMenuClose={this.props.handleItemMenuClose}
                            handleContextMenu={this.props.handleContextMenu}
                            handleShopContextMenu={this.props.handleShopContextMenu}
                            handleFind={this.props.handleFind}
                            toggleWalletTiers={this.props.toggleWalletTiers}
                            updateShopPrice={this.props.updateShopPrice}
                            showShops={this.props.showShops}
                            showShopInput={this.props.showShopInput}
                            showShopRupee={this.props.showShopRupee}
                            handleDungeonTravel={this.props.handleDungeonTravel}
                            dungeon={this.props.dungeon}
                            classes={this.props.classes}
                            scrollRef={this.props.scrollRef}
                            ekey={this.props.entrance + otherEntrance.ekey + this.props.ekey}
                            key={this.props.entrance + otherEntrance.ekey + this.props.ekey + i}
                        />
                    )})
                }
            </React.Fragment>
        );
    }
}

export default LinkedEntrance