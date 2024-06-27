import { GraphEntrance, GraphLocation } from '@mracsys/randomizer-graph-tool';
import { PropsWithChildren } from 'react';

import '@/styles/LogicIndicator.css';

interface LogicIndicator {
    spot: GraphEntrance | GraphLocation;
    showAgeLogic: boolean,
}

const LogicIndicator = ({
    children,
    spot,
    showAgeLogic,
}: PropsWithChildren<LogicIndicator>) => {
    let logicColor = '';
    let adultColor = 0;
    let childColor = 0;
    let childVisited = false;
    let adultVisited = false;
    let ageColor = '';
    let ageImage: string | null = null;
    let logicColors = [
        'logicalBlank',
        'logicalYellow',
        'logicalGreen',
    ]
    if (showAgeLogic) {
        if (spot.adult_visited) {
            adultColor = 2;
            adultVisited = true;
        } else if (spot.adult_visited_with_other_tricks) {
            adultColor = 1;
            adultVisited = true;
        } else {
            adultColor = 0;
        }
        if (spot.child_visited) {
            childColor = 2;
            childVisited = true;
        } else if (spot.child_visited_with_other_tricks) {
            childColor = 1;
            childVisited = true;
        } else {
            childColor = 0;
        }
        ageColor = logicColors[Math.max(adultColor, childColor)];
        if (childVisited && adultVisited) {
            ageImage = '/images/both_logic.png';
        } else if (adultVisited) {
            ageImage = '/images/adult_logic.png';
        } else if (childVisited) {
            ageImage = '/images/child_logic.png';
        }
    }
    if (spot.visited) {
        logicColor = 'logicalGreen';
    } else if (spot.visited_with_other_tricks) {
        logicColor = 'logicalYellow';
    } else {
        logicColor = 'logicalBlank';
    }
    return (
        <div className='logicContainer'>
            {
                showAgeLogic ?
                <div className={`logicMultiIndicator ${ageColor !== logicColor && ageColor === 'logicalBlank' ? logicColor : ageColor}`}>
                    {
                        !!ageImage ?
                            <img src={ageImage} alt='Age Access Indicator' />
                            : null
                    }
                </div> :
                <div className={`logicIndicator ${logicColor}`}></div>
            }
            {children}
        </div>
    );
}

export default LogicIndicator;