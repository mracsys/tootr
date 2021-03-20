import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

import UnknownEntrance from './UnknownEntrance'
import LocationCheck from './LocationCheck'
import { Typography, Box } from '@material-ui/core';

class GameArea extends React.Component {
    render() {
        Object.filterLocations = (locations, predicate) =>
            Object.keys(locations)
                .filter( key => predicate(locations[key].visible) );
        return (
            <Card className={this.props.classes.areaCard}>
                <Box className={this.props.classes.areaTitle}>
                    <Typography variant="h5" component="span" className={this.props.classes.areaTitleText}>{this.props.title}</Typography>
                    {this.props.dungeon ?
                    <React.Fragment>
                        <Typography component="span">MQ</Typography>
                        <Switch
                            checked={this.props.isMQ}
                            onChange={() => {this.props.mqSwitch(this.props.title + " MQ")}}
                            name={this.props.title + "MQ"}
                        />
                    </React.Fragment>
                    : null}
                </Box>
                <CardContent>
                <div>
                    <Divider />
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
                            />
                        </React.Fragment>
                    )})}
                    { Object.keys(this.props.entrances).map((entrance, i) => {
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
                                classes={this.props.classes}
                                ekey={this.props.title + "entrance" + i}
                                key={this.props.title + "entranceContainer" + i}
                            />
                        );
                    })}
                </div>
                </CardContent>
            </Card>
        );
    }
}

export default GameArea