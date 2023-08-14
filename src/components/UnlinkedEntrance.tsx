import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { AllAreas, Entrances } from './Tracker';
import type { MouseEvent } from 'react';

interface UnLinkedEntranceProps {
    entrance: string,
    connector: boolean,
    oneWayEntrancePools: Entrances,
    mixedPools: string[],
    decoupled: boolean,
    allAreas: AllAreas,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    forceVisible: boolean,
    scrollRef: string,
    ekey: string,
}

const UnLinkedEntrance = ({
    entrance,
    connector,
    oneWayEntrancePools,
    mixedPools,
    decoupled,
    allAreas,
    handleEntranceMenuOpen,
    forceVisible,
    scrollRef,
    ekey,
}: UnLinkedEntranceProps) => {
    const selectEntrancePool = (entrance: string): string => {
        let settingAreaTypes: {[areaType: string]: string} = {
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
        let areaType = allAreas.entrances[entrance].type
        if (areaType === "specialInterior" || areaType === "hideoutInterior") { areaType = "interior"; }
        if (areaType === "dungeonGanon") { areaType = "dungeon"; }
        let subAreas;
        if (areaType in oneWayEntrancePools) {
            subAreas = areaType;
        } else {
            if ((mixedPools.includes(settingAreaTypes[areaType])) && (areaType !== "overworld" || decoupled)) { areaType = "mixed"; }
            if (mixedPools.includes(settingAreaTypes[areaType]) && areaType === "overworld" && !(decoupled)) { areaType = "mixed_overworld" }
            if (allAreas.entrances[entrance].isReverse && !(decoupled)) { areaType = areaType + "_reverse" }
            if (decoupled && areaType !== "overworld" && !(["boss","noBossShuffle"].includes(areaType))) { areaType = areaType + "_decoupled" }
            subAreas = areaType;
        }
        return subAreas;
    }
    const buildEntranceName = (entrance: string): string => {
        if (allAreas.entrances[entrance].isReverse) {
            if (allAreas.entrances[allAreas.entrances[entrance].reverse].tag !== "") {
                return "from " + allAreas.entrances[allAreas.entrances[entrance].reverse].tag;
            } else {
                return allAreas.entrances[entrance].alias;
            }
        } else {
            if (entrance === 'GV Lower Stream -> Lake Hylia') {
                return 'Lake Hylia';
            } else {
                return allAreas.entrances[entrance].alias;
            }
        }
    }

    let entrancePool = selectEntrancePool(entrance);
    let scrollConnector = (connector) ? 'connector' : '';
    return (
        <div className="entranceContainer" key={ekey}>
            { forceVisible ? <SubdirectoryArrowRightIcon /> : null }
            <div className="unlinkedEntranceLabel">
                {buildEntranceName(entrance)}
            </div>
            <div className="unlinkedEntranceMenu"
                    data-source={entrance}
                    data-connector={connector}
                    data-etype={entrancePool}
                    data-el-id={entrance + 'scroll' + scrollConnector}
                    id={entrance + 'scroll' + scrollConnector}
                    onClick={(e) => handleEntranceMenuOpen(e, scrollRef)}
            >
                <span>Not Checked</span><ArrowDropDownIcon />
            </div>
        </div>
    );
}

export default UnLinkedEntrance