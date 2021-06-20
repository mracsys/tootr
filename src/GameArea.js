import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

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
                    <span className={this.props.classes.areaTitleText}>
                            {this.props.title}
                    </span>
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
                <div>
                    <div className={this.props.locationList}>
                    { Object.keys(this.props.locations).map((location, i) => { return (
                        <React.Fragment key={this.props.title + 'locationcheckcontainer' + i}>
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
                                handleFind={this.findItem}
                            />
                        </React.Fragment>
                    )})}
                    </div>
                    { Object.keys(this.props.entrances).map((entrance, i) => {
                        if ((!(this.props.showUnshuffledEntrances) && this.props.allAreas.entrances[entrance].shuffled === true) ||
                        (this.props.allAreas.entrances[entrance].connector !== "" && this.props.allAreas.entrances[this.props.allAreas.entrances[entrance].connector].shuffled && !(this.props.showUnshuffledEntrances)) ||
                        (this.props.showUnshuffledEntrances)) {
                            return (
                                <UnknownEntrance
                                    forceVisible={false}
                                    title={this.props.title}
                                    entrance={entrance}
                                    entrances={this.props.entrances}
                                    connector={false}
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
                                    handleEntranceMenuOpen={this.props.handleEntranceMenuOpen}
                                    handleFind={this.findItem}
                                    classes={this.props.classes}
                                    ekey={this.props.title + "entrance" + i}
                                    key={this.props.title + "entranceContainer" + i}
                                />
                            );
                        } else { return null }
                    })}
                </div>
            </div>
        );
    }
}

export default GameArea