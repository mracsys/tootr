import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import type { MouseEvent } from 'react';
import { buildEntranceName } from './UnknownEntrance';

import { GraphEntrance } from '@mracsys/randomizer-graph-tool';
import LogicIndicator from './LogicIndicator';

import '@/styles/EntranceStyles.css';

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
    let scrollConnector = (connector) ? 'connector' : '';
    return (
        <LogicIndicator spot={entrance}>
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
        </LogicIndicator>
    );
}

export default UnLinkedEntrance