import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';


class UnLinkedEntrance extends React.Component {
    selectEntrancePool(entrance) {
        let areaType = this.props.allAreas.entrances[entrance].type
        if (areaType === "specialInterior") { areaType = "interior"; }
        let subAreas;
        if (areaType in this.props.oneWayEntrancePools) {
            subAreas = this.props.oneWayEntrancePools[areaType];
        } else {
            if (this.props.mixedPools === "On" || (this.props.mixedPools === "Indoor" && areaType !== "overworld")) { areaType = "mixed"; }
            if (this.props.allAreas.entrances[entrance].isReverse && !(this.props.decoupled)) { areaType = areaType + "_reverse" }
            if (this.props.decoupled && areaType !== "overworld") { areaType = areaType + "_decoupled" }
            subAreas = this.props.entrancePools[areaType];
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
        return (
            <div className={this.props.classes.entranceContainer} key={this.props.ekey}>
                { this.props.forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                <Typography variant="h6" component="h1" color="error" className={this.props.classes.entranceLabel}>{this.buildEntranceName(this.props.entrance)}</Typography>
                <FormControl>
                    <Select className={this.props.classes.entranceMenu} native displayEmpty id={this.props.entrance + "select"} onChange={this.props.handleLink} name={this.props.entrance}>
                        <option aria-label="None" value="">Not Checked</option>
                        {Object.keys(entrancePool).sort().map((areaCategory, l) => {
                            if (((areaCategory === this.props.title && areaCategory !== "Spawn Points") || areaCategory === "Warp Songs" || entrancePool[areaCategory].length === 0) && this.props.connector === false) {
                                return null;
                            } else {
                                return (
                                    <optgroup key={this.props.entrance + "header" + l} label={areaCategory}>
                                        {entrancePool[areaCategory].sort().map((subArea, j) => {
                                            if ((this.props.allAreas.entrances[subArea].tagRep || this.props.allAreas.entrances[subArea].tag === "")) {
                                                return (<option
                                                            key={this.props.entrance + "option" + j}
                                                            value={subArea}>
                                                            {(this.props.allAreas.entrances[subArea].tag === "") ?
                                                                this.props.allAreas.entrances[subArea].alias :
                                                                this.props.allAreas.entrances[subArea].tag}
                                                        </option>);
                                            } else { return null }
                                        })}
                                    </optgroup>
                                );
                        }})}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default UnLinkedEntrance