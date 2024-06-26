import { labelEntry } from "@/data/item_panel_layout";
import OotItemIcon from "./OotItemIcon";
import { RupeeCount } from "./OotDungeonTracker";
import { useState } from 'react';

import '@/styles/SilverRupeeDisplay.css';

interface SilverRupeeDisplayIconProps {
    gridEntry: labelEntry,
    itemName: string,
    entryNum: number,
    dungeonSilverRupeeCounts: RupeeCount[],
    openLeft: boolean,
}


export const SilverRupeeDisplayIcon = ({
    gridEntry,
    itemName,
    entryNum,
    dungeonSilverRupeeCounts,
    openLeft,
}: SilverRupeeDisplayIconProps) => {
    const [silverRupeeExpanded, setSilverRupeeExpanded] = useState<boolean>(false);

    let rSub = dungeonSilverRupeeCounts[0].collected.toString();
    let rSuper = dungeonSilverRupeeCounts.length > 1 ? dungeonSilverRupeeCounts[1].collected.toString() : '';
    let lSub = dungeonSilverRupeeCounts.length > 2 ? dungeonSilverRupeeCounts[2].collected.toString() : '';
    let lSuper = dungeonSilverRupeeCounts.length > 3 ? dungeonSilverRupeeCounts[3].collected.toString() : '';
    let rSubStyle = dungeonSilverRupeeCounts[0].collected >= dungeonSilverRupeeCounts[0].max ? { color: 'var(--color-sidebar-upgrade)' } : {};
    let rSuperStyle = dungeonSilverRupeeCounts.length > 1 && dungeonSilverRupeeCounts[1].collected >= dungeonSilverRupeeCounts[1].max ? { color: 'var(--color-sidebar-upgrade)' } : {};
    let lSubStyle = dungeonSilverRupeeCounts.length > 2 && dungeonSilverRupeeCounts[2].collected >= dungeonSilverRupeeCounts[2].max ? { color: 'var(--color-sidebar-upgrade)' } : {};
    let lSuperStyle = dungeonSilverRupeeCounts.length > 3 && dungeonSilverRupeeCounts[3].collected >= dungeonSilverRupeeCounts[3].max ? { color: 'var(--color-sidebar-upgrade)' } : {};
    if (openLeft && dungeonSilverRupeeCounts.length > 2) {
        let tempRSub = rSub;
        let tempRSuper = rSuper;
        let tempLSub = lSub;
        let tempLSuper = lSuper;
        let tempRSubStyle = rSubStyle;
        let tempRSuperStyle = rSuperStyle;
        let tempLSubStyle = lSubStyle;
        let tempLSuperStyle = lSuperStyle;
        rSub = tempLSub;
        rSubStyle = tempLSubStyle;
        lSub = tempRSub;
        lSubStyle = tempRSubStyle;
        if (dungeonSilverRupeeCounts.length > 3) {
            rSuper = tempLSuper;
            rSuperStyle = tempLSuperStyle;
            lSuper = tempRSuper;
            lSuperStyle = tempRSuperStyle;
        }
    }
    return (
        <div
            className={`ootSilverRupeeExpando ${openLeft ? 'ootSilverRupeeOpenLeft': ''} ${silverRupeeExpanded ? 'ootSilverRupeeExpanded' : ''}`}
            onBlur={() => setSilverRupeeExpanded(false)}
            tabIndex={0}
        >
            <div className='ootSilverRupeeMask'>
                    <OotItemIcon
                        itemName={itemName}
                        className="ootSilverRupeeTracker"
                        subscript={rSub}
                        leftLabel={lSub}
                        topRightLabel={rSuper}
                        topLeftLabel={lSuper}
                        subscriptStyle={rSubStyle}
                        topRightStyle={rSuperStyle}
                        leftSubStyle={lSubStyle}
                        topLeftStyle={lSuperStyle}
                        onClick={() => setSilverRupeeExpanded(!silverRupeeExpanded)}
                        key={`${itemName}DungeonPanelEntry${gridEntry.label}${entryNum}`}
                    />
                <div className='ootSilverRupeeNamesContainer'>
                    <div className='ootSilverRupeeNames'>
                        { dungeonSilverRupeeCounts.length > 3 ?
                        <div
                            key={`${itemName}name4${gridEntry.label}${entryNum}`}
                            onClick={dungeonSilverRupeeCounts[3].addItem}
                            onContextMenu={dungeonSilverRupeeCounts[3].removeItem.onContextMenu}
                            onTouchStart={dungeonSilverRupeeCounts[3].removeItem.onTouchStart}
                            onTouchCancel={dungeonSilverRupeeCounts[3].removeItem.onTouchCancel}
                            onTouchEnd={dungeonSilverRupeeCounts[3].removeItem.onTouchEnd}
                            onTouchMove={dungeonSilverRupeeCounts[3].removeItem.onTouchMove}
                        >
                            { dungeonSilverRupeeCounts.length > 3 ? <span>
                                <span className={`silverRupeeCount ${dungeonSilverRupeeCounts[3].max === dungeonSilverRupeeCounts[3].collected ? 'dungeonItemMaxCollected' : ''}`}>{dungeonSilverRupeeCounts[3].collected} </span>
                                <span className='silverRupeeLabel'>{dungeonSilverRupeeCounts[3].name}</span>
                            </span> : null }
                        </div>
                        : <div className='noSilverRupee'></div> }
                        { dungeonSilverRupeeCounts.length > 2 ?
                        <div
                            key={`${itemName}name3${gridEntry.label}${entryNum}`}
                            onClick={dungeonSilverRupeeCounts[2].addItem}
                            onContextMenu={dungeonSilverRupeeCounts[2].removeItem.onContextMenu}
                            onTouchStart={dungeonSilverRupeeCounts[2].removeItem.onTouchStart}
                            onTouchCancel={dungeonSilverRupeeCounts[2].removeItem.onTouchCancel}
                            onTouchEnd={dungeonSilverRupeeCounts[2].removeItem.onTouchEnd}
                            onTouchMove={dungeonSilverRupeeCounts[2].removeItem.onTouchMove}
                        >
                            { dungeonSilverRupeeCounts.length > 2 ? <span>
                                <span className={`silverRupeeCount ${dungeonSilverRupeeCounts[2].max === dungeonSilverRupeeCounts[2].collected ? 'dungeonItemMaxCollected' : ''}`}>{dungeonSilverRupeeCounts[2].collected} </span>
                                <span className='silverRupeeLabel'>{dungeonSilverRupeeCounts[2].name}</span>
                            </span> : null }
                        </div>
                        : <div className='noSilverRupee'></div> }
                        { dungeonSilverRupeeCounts.length > 1 ?
                        <div
                            key={`${itemName}name2${gridEntry.label}${entryNum}`}
                            onClick={dungeonSilverRupeeCounts[1].addItem}
                            onContextMenu={dungeonSilverRupeeCounts[1].removeItem.onContextMenu}
                            onTouchStart={dungeonSilverRupeeCounts[1].removeItem.onTouchStart}
                            onTouchCancel={dungeonSilverRupeeCounts[1].removeItem.onTouchCancel}
                            onTouchEnd={dungeonSilverRupeeCounts[1].removeItem.onTouchEnd}
                            onTouchMove={dungeonSilverRupeeCounts[1].removeItem.onTouchMove}
                        >
                            { dungeonSilverRupeeCounts.length > 1 ? <span>
                                <span className={`silverRupeeCount ${dungeonSilverRupeeCounts[1].max === dungeonSilverRupeeCounts[1].collected ? 'dungeonItemMaxCollected' : ''}`}>{dungeonSilverRupeeCounts[1].collected} </span>
                                <span className='silverRupeeLabel'>{dungeonSilverRupeeCounts[1].name}</span>
                            </span> : null }
                        </div>
                        : <div className='noSilverRupee'></div> }
                        <div
                            key={`${itemName}name1${gridEntry.label}${entryNum}`}
                            onClick={dungeonSilverRupeeCounts[0].addItem}
                            onContextMenu={dungeonSilverRupeeCounts[0].removeItem.onContextMenu}
                            onTouchStart={dungeonSilverRupeeCounts[0].removeItem.onTouchStart}
                            onTouchCancel={dungeonSilverRupeeCounts[0].removeItem.onTouchCancel}
                            onTouchEnd={dungeonSilverRupeeCounts[0].removeItem.onTouchEnd}
                            onTouchMove={dungeonSilverRupeeCounts[0].removeItem.onTouchMove}
                        >
                            { dungeonSilverRupeeCounts.length > 0 ? <span>
                                <span className={`silverRupeeCount ${dungeonSilverRupeeCounts[0].max === dungeonSilverRupeeCounts[0].collected ? 'dungeonItemMaxCollected' : ''}`}>{dungeonSilverRupeeCounts[0].collected} </span>
                                <span className='silverRupeeLabel'>{dungeonSilverRupeeCounts[0].name}</span>
                            </span> : null }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}