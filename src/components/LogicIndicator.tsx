import { GraphEntrance, GraphLocation } from '@mracsys/randomizer-graph-tool';
import { PropsWithChildren } from 'react';

import '@/styles/LogicIndicator.css';

interface LogicIndicator {
    spot: GraphEntrance | GraphLocation;
}

const LogicIndicator = ({
    children,
    spot,
}: PropsWithChildren<LogicIndicator>) => {
    let logicColor: string;
    if (spot.visited) {
        logicColor = 'logicalGreen';
    } else if (spot.visited_with_other_tricks) {
        logicColor = 'logicalYellow';
    } else {
        logicColor = 'logicalBlank';
    }

    return (
        <div className='logicContainer'>
            <div className={logicColor}></div>
            {children}
        </div>
    );
}

export default LogicIndicator;