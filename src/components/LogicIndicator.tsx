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
    let logicColor: string = '';
    let adultColor: string = '';
    let childColor: string = '';
    if (showAgeLogic) {
        if (spot.adult_visited) {
            adultColor = 'logicalGreen';
        } else if (spot.adult_visited_with_other_tricks) {
            adultColor = 'logicalYellow';
        } else {
            adultColor = 'logicalBlank';
        }
        if (spot.child_visited) {
            childColor = 'logicalGreen';
        } else if (spot.child_visited_with_other_tricks) {
            childColor = 'logicalYellow';
        } else {
            childColor = 'logicalBlank';
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
                <div className='logicMultiIndicator'>
                    {
                        spot.child_visited || spot.child_visited_with_other_tricks ?
                        <div className={childColor}>
                            {/*<img src="/images/OoT_Kokiri_Sword_Icon.png" alt="Child Logical Access" />*/}
                            C
                        </div>
                        : null
                    }
                    {
                        spot.adult_visited || spot.adult_visited_with_other_tricks ?
                        <div className={adultColor}>
                            {/*<img src="/images/OoT_Master_Sword_Icon.png" alt="Adult Logical Access" />*/}
                            A
                        </div>
                        : null
                    }
                    {
                        !spot.visited && !spot.visited_with_other_tricks ?
                        <div className={logicColor}></div>
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