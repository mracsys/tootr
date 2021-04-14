import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import Link from '@material-ui/core/Link';

import LocationCheck from './LocationCheck'
import UnknownEntrance from './UnknownEntrance'


class LinkedEntrance extends React.Component {
    buildExitName(entrance) {
        let eLink = this.props.allAreas.entrances[entrance].aLink;
        if (this.props.allAreas.entrances[eLink].tag === "") {
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
        if (this.props.allAreas.entrances[eLink].tag === "") {
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
            if (this.props.allAreas.entrances[this.props.allAreas.entrances[entrance].reverse].tag !== "") {
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

    render() {
        let oEntrance = this.props.allAreas.entrances[this.props.entrance];
        let reverseLink = oEntrance.aLink;
        let interiors = ['interior','specialInterior','grotto','grave','dungeon'];
        let oneWayTypes = ['spawn','warpsong','owldrop'];
        let otherEntrances = [];
        const preventDefault = (event) => event.preventDefault();
        if (this.props.connector === false) {
            if ((interiors.includes(this.props.allAreas.entrances[reverseLink].type) &&
            (oneWayTypes.includes(oEntrance.type) || this.props.decoupled) &&
            !(this.props.allAreas.entrances[reverseLink].isReverse)) && (this.props.allAreas.entrances[reverseLink].shuffled === true || this.props.decoupled)) {
                otherEntrances.push({"entrance": this.props.allAreas.entrances[reverseLink].reverse,"ekey":"Reverse","connector": false})
            }
            if (this.props.allAreas.entrances[reverseLink].connector !== "" &&
            this.props.allAreas.entrances[this.props.allAreas.entrances[reverseLink].connector].type !== 'overworld' &&
            (this.props.allAreas.entrances[this.props.allAreas.entrances[reverseLink].connector].shuffled === true || 
            this.props.allAreas.entrances[this.props.allAreas.entrances[reverseLink].connector].eLink === "")) {
                otherEntrances.push({"entrance": this.props.allAreas.entrances[reverseLink].connector,"ekey":"ReverseConnector","connector": true});
            }
        }
        return (
            <React.Fragment key={this.props.ekey}>
                <div className={this.props.classes.entranceContainer} key={this.props.entrance + "label"}>
                    { this.props.forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                    <Typography variant="body1" component="h1" className={this.props.classes.entranceLabel}>
                        <Link className={this.props.classes.entranceAnchor} color="inherit" id={this.props.entrance} onClick={preventDefault}>
                            {this.buildEntranceName(this.props.entrance)}
                        </Link>
                    </Typography>
                    <Link
                        color="inherit"
                        href={(((this.props.allAreas.entrances[reverseLink].type === "overworld") || (this.props.allAreas.entrances[reverseLink].isReverse)) ? '#' + this.props.allAreas.entrances[reverseLink].area : null )}
                        className={(((this.props.allAreas.entrances[reverseLink].type === "overworld") || (this.props.allAreas.entrances[reverseLink].isReverse)) ? null : this.props.classes.falseLinkAnchor )}
                    >
                        <Box className={this.props.classes.entranceLink}>
                            <Typography variant="body1" component="h2" className={this.props.classes.entranceLink1}>
                                {this.buildExitName(this.props.entrance)}
                            </Typography>
                            <Typography variant="caption" component="h3" className={this.props.classes.entranceLink2}>
                                {this.buildExitEntranceName(this.props.entrance)}
                            </Typography>
                        </Box>
                    </Link>
                    {
                        (oEntrance.shuffled === true) ?
                            <IconButton className={this.props.classes.areaButton} size="small" component="span" onClick={() => this.props.handleUnLink(this.props.entrance)}><ClearIcon /></IconButton> :
                            null
                    }
                </div>
                {
                    ((this.props.decoupled === false && !(oneWayTypes.includes(oEntrance.type))) || (this.props.decoupled)) ?
                    Object.keys(this.props.allEntrances[reverseLink].locations).map((location, k) => {
                        if (this.props.allAreas.entrances[reverseLink].type !== 'dungeon' && this.props.allAreas.locations[location].visible === true) {
                            return (
                                <LocationCheck
                                    key={this.props.entrance + 'entrancelocationcheck' + k}
                                    lkey={this.props.entrance + k}
                                    location={location}
                                    allAreas={this.props.allAreas}
                                    classes={this.props.classes}
                                    handleCheck={this.props.handleCheck}
                                    handleUnCheck={this.props.handleUnCheck}
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
                            entrancePools={this.props.entrancePools}
                            oneWayEntrancePools={this.props.oneWayEntrancePools}
                            mixedPools={this.props.mixedPools}
                            decoupled={this.props.decoupled}
                            allAreas={this.props.allAreas}
                            allEntrances={this.props.allEntrances}
                            handleLink={this.props.handleLink}
                            handleUnLink={this.props.handleUnLink}
                            classes={this.props.classes}
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