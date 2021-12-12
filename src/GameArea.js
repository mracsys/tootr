import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import UnknownEntrance from './UnknownEntrance'
import LocationCheck from './LocationCheck'

const YellowSwitch = withStyles({
    switchBase: {
        color: '#ffffcf',
        '&$checked': {
            color: '#cbc26d',
        },
        '&$checked + $track': {
            backgroundColor: '#cbc693',
        },
    },
    checked: {},
    track: {},
})(Switch);

class GameArea extends React.Component {
    constructor(props) {
        super(props);
        this.currentRef = React.createRef();
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }

    render() {
        Object.filterLocations = (locations, predicate) =>
            Object.keys(locations)
                .filter( key => predicate(locations[key].visible) );
        const preventDefault = (event) => event.preventDefault();
        return (
            <div className={this.props.classes.areaCard}>
                <a className={this.props.classes.entranceAnchor} href={this.props.title} id={this.props.title} onClick={preventDefault}>
                    {/* Fake text here to make eslint happy.
                        Can't wrap the actual title with the link because the areaTitle class breaks margin collapse needed
                        to offset the anchor below the appbar */}
                    <span className={this.props.classes.entranceAnchorFakeText}>&nbsp;</span>
                </a>
                <div className={this.props.classes.areaHeader} />
                <div className={this.props.classes.areaTitle}>
                    <div
                        className={this.props.classes.areaTitleCollapse}
                        onClick={() => this.props.collapseSwitch(this.props.title)}
                        onContextMenu={this.props.reverseCollapseSwitch.onContextMenu}
                        data-source={this.props.title}
                    >
                        {
                            (this.props.allAreas[this.props.title].collapse === 'none') ?
                                <ExpandMore className={this.props.classes.collapseArea} />
                                : (this.props.allAreas[this.props.title].collapse === 'some') ?
                                <ChevronRightIcon className={this.props.classes.collapseArea} /> :
                                <ExpandLess className={this.props.classes.collapseArea} />
                        }
                        <span className={this.props.classes.areaTitleText}>
                            {this.props.title}
                        </span>
                    </div>
                    {this.props.dungeon ?
                    <React.Fragment>
                        <span className={this.props.classes.mqSwitchLabel}>MQ</span>
                        <YellowSwitch
                            checked={this.props.isMQ}
                            onChange={() => {this.props.mqSwitch(this.props.title + " MQ")}}
                            name={this.props.title + "MQ"}
                        />
                    </React.Fragment>
                    : null}
                </div>
                {
                    (this.props.allAreas[this.props.title].collapse !== 'all') ?
                    <div>
                        <div>
                        { Object.keys(this.props.locations).map((location, i) => { 
                            if (this.props.allAreas.locations[location].check === '' || this.props.allAreas[this.props.title].collapse === 'none') { 
                                return (<React.Fragment key={this.props.title + 'locationcheckcontainer' + i}>
                                    <LocationCheck
                                        key={this.props.title + "locationcheck" + i}
                                        lkey={this.props.title + "location" + i}
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
                                </React.Fragment>)
                            } else { return null; }
                        })}
                        </div>
                        { Object.keys(this.props.entrances).map((entrance, i) => {
                            if ((!(this.props.showUnshuffledEntrances) && this.props.allAreas.entrances[entrance].shuffled === true) ||
                            (this.props.allAreas.entrances[entrance].connector !== "" && this.props.allAreas.entrances[this.props.allAreas.entrances[entrance].connector].shuffled && !(this.props.showUnshuffledEntrances)) ||
                            (this.props.showUnshuffledEntrances)) {
                                return (
                                    <React.Fragment key={this.props.title + "entranceScrollContainer" + i}>
                                        <div className={this.props.classes.scrollControl} ref={(e) => this.props.setRef(this.props.title + entrance, e)} id={this.props.title + "entranceScrollContainer" + i} key={this.props.title + "entranceScrollContainer" + i} />
                                        <UnknownEntrance
                                            forceVisible={false}
                                            title={this.props.title}
                                            entrance={entrance}
                                            entrances={this.props.entrances}
                                            connector={false}
                                            renderedConnectors={[]}
                                            entrancePools={this.props.entrancePools}
                                            oneWayEntrancePools={this.props.oneWayEntrancePools}
                                            mixedPools={this.props.mixedPools}
                                            decoupled={this.props.decoupled}
                                            overworld={this.props.overworld}
                                            allAreas={this.props.allAreas}
                                            allEntrances={this.props.allEntrances}
                                            handleLink={this.props.handleLink}
                                            handleUnLink={this.props.handleUnLink}
                                            handleCheck={this.props.handleCheck}
                                            handleUnCheck={this.props.handleUnCheck}
                                            handleItemMenuOpen={this.props.handleItemMenuOpen}
                                            handleItemMenuClose={this.props.handleItemMenuClose}
                                            handleContextMenu={this.props.handleContextMenu}
                                            handleShopContextMenu={this.props.handleShopContextMenu}
                                            handleEntranceMenuOpen={this.props.handleEntranceMenuOpen}
                                            handleFind={this.props.handleFind}
                                            toggleWalletTiers={this.props.toggleWalletTiers}
                                            updateShopPrice={this.props.updateShopPrice}
                                            showShops={this.props.showShops}
                                            showShopInput={this.props.showShopInput}
                                            showShopRupee={this.props.showShopRupee}
                                            handleDungeonTravel={this.props.handleDungeonTravel}
                                            dungeon={this.props.dungeon}
                                            classes={this.props.classes}
                                            ekey={this.props.title + "entrance" + i}
                                            key={this.props.title + "entranceContainer" + i}
                                            scrollRef={this.props.title + entrance}
                                        />
                                    </React.Fragment>
                                );
                            } else { return null }
                        })}
                    </div> : null
                }
            </div>
        );
    }
}

export default GameArea