import React from 'react';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


class UnLinkedEntrance extends React.Component {
    selectEntrancePool(entrance) {
        let areaType = this.props.allAreas.entrances[entrance].type
        if (areaType === "specialInterior") { areaType = "interior"; }
        let subAreas;
        if (areaType in this.props.oneWayEntrancePools) {
            subAreas = areaType;
        } else {
            if ((this.props.mixedPools === "Indoor" || this.props.mixedPools === "On") && (areaType !== "overworld" || this.props.decoupled)) { areaType = "mixed"; }
            if (this.props.mixedPools === "On" && areaType === "overworld" && !(this.props.decoupled)) { areaType = "mixed_overworld" }
            if (this.props.allAreas.entrances[entrance].isReverse && !(this.props.decoupled)) { areaType = areaType + "_reverse" }
            if (this.props.decoupled && areaType !== "overworld") { areaType = areaType + "_decoupled" }
            subAreas = areaType;
        }
        return subAreas;
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
        let entrancePool = this.selectEntrancePool(this.props.entrance);
        let scrollConnector = (this.props.connector) ? 'connector' : '';
        return (
            <div className={this.props.classes.entranceContainer} key={this.props.ekey}>
                { this.props.forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                <div className={this.props.classes.unlinkedEntranceLabel}>
                    {this.buildEntranceName(this.props.entrance)}
                </div>
                <div className={this.props.classes.unlinkedEntranceMenu}
                     data-source={this.props.entrance}
                     data-connector={this.props.connector}
                     data-etype={entrancePool}
                     data-el-id={this.props.entrance + 'scroll' + scrollConnector}
                     id={this.props.entrance + 'scroll' + scrollConnector}
                     onClick={(e) => this.props.handleEntranceMenuOpen(e, this.props.scrollRef)}
                >
                    <span>Not Checked</span><ArrowDropDownIcon />
                </div>
            </div>
        );
    }
}

export default UnLinkedEntrance