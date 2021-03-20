import React from 'react';
import UnLinkedEntrance from './UnlinkedEntrance'
import LinkedEntrance from './LinkedEntrance'
import Divider from '@material-ui/core/Divider';

class UnknownEntrance extends React.Component {
    render() {
        let eType = this.props.allAreas.entrances[this.props.entrance].type;
        if (((this.props.title === "Spawn Points" && eType === "spawn") || (this.props.title === "Warp Songs" && eType === "warpsong") || (eType !== "spawn" && eType !== "warpsong" && eType !== "extra")) &&
           (this.props.allAreas.entrances[this.props.entrance].isReverse === false || this.props.forceVisible === true || this.props.allAreas.entrances[this.props.entrance].oneWay === true || this.props.allAreas.entrances[this.props.entrance].connector !== "") &&
           ((this.props.entrance === 'GV Lower Stream -> Lake Hylia' && this.props.decoupled && this.props.overworld && this.props.title === this.props.allAreas.entrances[this.props.entrance].oneWayArea) || (this.props.entrance !== 'GV Lower Stream -> Lake Hylia'))) {
            if (this.props.allAreas.entrances[this.props.entrance].aLink === "") {
                return (
                    <React.Fragment>
                        { this.props.forceVisible === false ? <Divider /> : null }
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
                            forceVisible={this.props.forceVisible}
                            classes={this.props.classes}
                            ekey={this.props.ekey}
                        />
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        { this.props.forceVisible === false ? <Divider /> : null }
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
                            handleUnLink={this.props.handleUnLink}
                            handleCheck={this.props.handleCheck}
                            handleUnCheck={this.props.handleUnCheck}
                            forceVisible={this.props.forceVisible}
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