import React from 'react';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const UnLinkedEntrance = (props) => {
    const selectEntrancePool = (entrance) => {
        let settingAreaTypes = {
            'interior': 'Interiors',
            'specialInterior': 'Interiors',
            'hideoutInterior': 'Interiors',
            'grotto': 'Grottos',
            'grave': 'Grottos',
            'dungeon': 'Dungeons',
            'dungeonGanon': 'Dungeons',
            'overworld': 'Overworld',
            'boss': 'Boss Rooms',
        }
        let areaType = props.allAreas.entrances[entrance].type
        if (areaType === "specialInterior" || areaType === "hideoutInterior") { areaType = "interior"; }
        if (areaType === "dungeonGanon") { areaType = "dungeon"; }
        let subAreas;
        if (areaType in props.oneWayEntrancePools) {
            subAreas = areaType;
        } else {
            if ((props.mixedPools.includes(settingAreaTypes[areaType])) && (areaType !== "overworld" || props.decoupled)) { areaType = "mixed"; }
            if (props.mixedPools.includes(settingAreaTypes[areaType]) && areaType === "overworld" && !(props.decoupled)) { areaType = "mixed_overworld" }
            if (props.allAreas.entrances[entrance].isReverse && !(props.decoupled)) { areaType = areaType + "_reverse" }
            if (props.decoupled && areaType !== "overworld" && !(["boss","noBossShuffle"].includes(areaType))) { areaType = areaType + "_decoupled" }
            subAreas = areaType;
        }
        return subAreas;
    }
    const buildEntranceName = (entrance) => {
        if (props.allAreas.entrances[entrance].isReverse) {
            if (props.allAreas.entrances[props.allAreas.entrances[entrance].reverse].tag !== "") {
                return "from " + props.allAreas.entrances[props.allAreas.entrances[entrance].reverse].tag;
            } else {
                return props.allAreas.entrances[entrance].alias;
            }
        } else {
            if (entrance === 'GV Lower Stream -> Lake Hylia') {
                return 'Lake Hylia';
            } else {
                return props.allAreas.entrances[entrance].alias;
            }
        }
    }

    let entrancePool = selectEntrancePool(props.entrance);
    let scrollConnector = (props.connector) ? 'connector' : '';
    return (
        <div className="entranceContainer" key={props.ekey}>
            { props.forceVisible ? <SubdirectoryArrowRightIcon /> : null }
            <div className="unlinkedEntranceLabel">
                {buildEntranceName(props.entrance)}
            </div>
            <div className="unlinkedEntranceMenu"
                    data-source={props.entrance}
                    data-connector={props.connector}
                    data-etype={entrancePool}
                    data-el-id={props.entrance + 'scroll' + scrollConnector}
                    id={props.entrance + 'scroll' + scrollConnector}
                    onClick={(e) => props.handleEntranceMenuOpen(e, props.scrollRef)}
            >
                <span>Not Checked</span><ArrowDropDownIcon />
            </div>
        </div>
    );
}

export default UnLinkedEntrance