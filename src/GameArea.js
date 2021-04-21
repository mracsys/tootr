import React from 'react';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import UnknownEntrance from './UnknownEntrance'
import LocationCheck from './LocationCheck'
import { Typography, Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';

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
    render() {
        Object.filterLocations = (locations, predicate) =>
            Object.keys(locations)
                .filter( key => predicate(locations[key].visible) );
        const preventDefault = (event) => event.preventDefault();
        return (
            <Card className={this.props.classes.areaCard}>
                <Link className={this.props.classes.entranceAnchor} color="inherit" id={this.props.title} onClick={preventDefault}>
                    {/* Fake text here to make eslint happy.
                        Can't wrap the actual title with the link because the areaTitle class breaks margin collapse needed
                        to offset the anchor below the appbar */}
                    <span className={this.props.classes.entranceAnchorFakeText}>&nbsp;</span>
                </Link>
                <div className={this.props.classes.areaHeader} />
                <Box className={this.props.classes.areaTitle}>
                    <Typography variant="h6" component="span" className={this.props.classes.areaTitleText}>
                            {this.props.title}
                    </Typography>
                    {this.props.dungeon ?
                    <React.Fragment>
                        <Typography className={this.props.classes.mqSwitchLabel} component="span">MQ</Typography>
                        <YellowSwitch
                            checked={this.props.isMQ}
                            onChange={() => {this.props.mqSwitch(this.props.title + " MQ")}}
                            name={this.props.title + "MQ"}
                        />
                    </React.Fragment>
                    : null}
                </Box>
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
                                handleItemMenu={this.props.handleItemMenu}
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
                                    handleItemMenu={this.props.handleItemMenu}
                                    classes={this.props.classes}
                                    ekey={this.props.title + "entrance" + i}
                                    key={this.props.title + "entranceContainer" + i}
                                />
                            );
                        } else { return null }
                    })}
                </div>
            </Card>
        );
    }
}

export default GameArea