import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { MouseEvent } from 'react';
import { buildEntranceName } from './UnknownEntrance';

import { GraphEntrance } from '@mracsys/randomizer-graph-tool';

interface UnLinkedEntranceProps {
    entrance: GraphEntrance,
    connector: boolean,
    handleEntranceMenuOpen: (e: MouseEvent<HTMLDivElement>, scrollRef: string) => void,
    forceVisible: boolean,
    scrollRef: string,
    ekey: string,
}

const UnLinkedEntrance = ({
    entrance,
    connector,
    handleEntranceMenuOpen,
    forceVisible,
    scrollRef,
    ekey,
}: UnLinkedEntranceProps) => {
    /*const selectEntrancePool = (entrance: string): string => {
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
    }*/

    //let entrancePool = selectEntrancePool(entrance);
    let scrollConnector = (connector) ? 'connector' : '';
    let logicColor: string;
    if (entrance.visited) {
        logicColor = 'logicalGreen';
    } else if (entrance.visited_with_other_tricks) {
        logicColor = 'logicalYellow';
    } else {
        logicColor = 'logicalBlank';
    }
    return (
        <div className='logicContainer'>
            <div className={logicColor} />
            <div className="entranceContainer" key={ekey}>
                { forceVisible ? <SubdirectoryArrowRightIcon /> : null }
                <div className="unlinkedEntranceLabel">
                    {buildEntranceName(entrance)}
                </div>
                <div className="unlinkedEntranceMenu"
                    data-source={entrance.name}
                    data-el-id={entrance.name + 'scroll' + scrollConnector}
                    id={entrance.name + 'scroll' + scrollConnector}
                    onClick={(e) => handleEntranceMenuOpen(e, scrollRef)}
                >
                    <span>Not Checked</span><ArrowDropDownIcon />
                </div>
            </div>
        </div>
    );
}

export default UnLinkedEntrance