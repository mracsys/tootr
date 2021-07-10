import React from 'react';
import UnLinkedEntrance from './UnlinkedEntrance'
import LinkedEntrance from './LinkedEntrance'

class UnknownEntrance extends React.Component {
    render() {
        let eType = this.props.allAreas.entrances[this.props.entrance].type;
        if (((this.props.title === "Spawn Points" && eType === "spawn") || (this.props.title === "Warp Songs" && eType === "warpsong") || (eType !== "spawn" && eType !== "warpsong" && eType !== "extra")) &&
           (this.props.allAreas.entrances[this.props.entrance].isReverse === false || this.props.forceVisible === true || this.props.allAreas.entrances[this.props.entrance].oneWay === true || this.props.allAreas.entrances[this.props.entrance].connector !== "" || this.props.dungeon) &&
           ((this.props.entrance === 'GV Lower Stream -> Lake Hylia' && this.props.title === this.props.allAreas.entrances[this.props.entrance].oneWayArea) || (this.props.entrance !== 'GV Lower Stream -> Lake Hylia'))) {
//           ((this.props.entrance === 'GV Lower Stream -> Lake Hylia' && this.props.decoupled && this.props.overworld && this.props.title === this.props.allAreas.entrances[this.props.entrance].oneWayArea) || (this.props.entrance !== 'GV Lower Stream -> Lake Hylia'))) {
            if (this.props.allAreas.entrances[this.props.entrance].aLink === "") {
                return (
                    <React.Fragment>
                        { this.props.forceVisible === false ? <hr /> : null }
                        <UnLinkedEntrance
                            title={this.props.title}
                            entrance={this.props.entrance}
                            entrances={this.props.entrances}
                            entrancePools={this.props.entrancePools}
                            connector={this.props.connector}
                            oneWayEntrancePools={this.props.oneWayEntrancePools}
                            mixedPools={this.props.mixedPools}
                            decoupled={this.props.decoupled}
                            allAreas={this.props.allAreas}
                            handleLink={this.props.handleLink}
                            handleEntranceMenuOpen={this.props.handleEntranceMenuOpen}
                            forceVisible={this.props.forceVisible}
                            classes={this.props.classes}
                            ekey={this.props.ekey}
                        />
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        { this.props.forceVisible === false ? <hr /> : null }
                        <LinkedEntrance
                            title={this.props.title}
                            entrance={this.props.entrance}
                            entrances={this.props.entrances}
                            entrancePools={this.props.entrancePools}
                            connector={this.props.connector}
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
                            forceVisible={this.props.forceVisible}
                            dungeon={this.props.dungeon}
                            classes={this.props.classes}
                            ekey={this.props.ekey}
                        />
                    </React.Fragment>
                );
            }
        } else { return null }
    }
}

export default UnknownEntrance