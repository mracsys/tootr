import React from 'react';

import { GraphHint, GraphLocation } from '@mracsys/randomizer-graph-tool';
import OotItemIcon from './OotItemIcon';
import { buildEntranceName, buildExitName, buildExitEntranceName } from './UnknownEntrance';

import '@/styles/HintPanel.css';

interface HintPanelProps {
    graphHintLocations: GraphLocation[],
    simMode: boolean,
}

export const HintPanel = ({
    graphHintLocations,
    simMode,
}: HintPanelProps) => {

    class HintStats {
        public copies: number;
        public hint: GraphHint;

        constructor(hint: GraphHint) {
            this.hint = hint;
            this.copies = 1;
        }
    }

    let wothRegions: {[region_name: string]: HintStats} = {};
    let pathRegions: {[region_name: string]: HintStats} = {};
    let foolishRegions: {[region_name: string]: HintStats} = {};
    let hintedLocations: {[location_name: string]: HintStats} = {};
    let hintedEntrances: {[entrance_name: string]: HintStats} = {};
    let hintedRegions: {[region_name: string]: HintStats} = {};
    let regionItemCounts: {[region_name: string]: HintStats} = {};

    let show_hinted_items = (l: GraphLocation): boolean => {
        return !!l.item && l.item.major_item && !l.hint_locked && (!simMode || l.checked);
    };

    let show_important_items = (l: GraphLocation): boolean => {
        return !!l.item && l.item.important_item && !l.hint_locked && (!simMode || l.checked);
    };

    for (let hintLocation of graphHintLocations) {
        if (!!hintLocation.hint && (!simMode || hintLocation.checked)) {
            let hint = hintLocation.hint;
            switch (hint.type) {
                case 'woth':
                    if (!!hint.area) {
                        if (Object.keys(wothRegions).includes(hint.area.name)) {
                            wothRegions[hint.area.name].copies++;
                        } else {
                            wothRegions[hint.area.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'goal':
                    if (!!hint.area && !!hint.goal) {
                        if (Object.keys(pathRegions).includes(hint.area.name)) {
                            pathRegions[hint.area.name].copies++;
                        } else {
                            pathRegions[hint.area.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'foolish':
                    if (!!hint.area) {
                        if (Object.keys(foolishRegions).includes(hint.area.name)) {
                            foolishRegions[hint.area.name].copies++;
                        } else {
                            foolishRegions[hint.area.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'misc':
                    if (!!hint.area && !!hint.item) {
                        if (Object.keys(hintedRegions).includes(hint.area.name)) {
                            hintedRegions[hint.area.name].copies++;
                        } else {
                            hintedRegions[hint.area.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'dual':
                    if (!!hint.location && !!hint.location2 && !!hint.item && !!hint.item2) {
                        if (Object.keys(hintedLocations).includes(hint.location.name)) {
                            hintedLocations[hint.location.name].copies++;
                        } else {
                            hintedLocations[hint.location.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'location':
                    if (!!hint.location && !!hint.item) {
                        if (Object.keys(hintedLocations).includes(hint.location.name)) {
                            hintedLocations[hint.location.name].copies++;
                        } else {
                            hintedLocations[hint.location.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'entrance':
                    if (!!hint.entrance && !!hint.target) {
                        if (Object.keys(hintedEntrances).includes(hint.entrance.name)) {
                            hintedEntrances[hint.entrance.name].copies++;
                        } else {
                            hintedEntrances[hint.entrance.name] = new HintStats(hint);
                        }
                    }
                    break;
                case 'important_check':
                    if (!!hint.area && hint.num_major_items !== null) {
                        if (Object.keys(regionItemCounts).includes(hint.area.name)) {
                            regionItemCounts[hint.area.name].copies++;
                        } else {
                            regionItemCounts[hint.area.name] = new HintStats(hint);
                        }
                    }
                    break;
            }
        }
    }

    return (
        <div className='hintPanelContainer'>
            { Object.values(wothRegions).length > 0 ?
            <div className='wothTitle'>
                <div className='hintTypeTitle'>Way of the Hero</div>
                <div>
                    {Object.values(wothRegions).map((hintStats, i) => {
                        let region = hintStats.hint.area;
                        if (!!region) {
                            return (
                            <React.Fragment key={`wothHintContainer${i}`}>
                            <div className='hintContainer' key={`wothHintText${i}`}>
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className='hintText'>{region.alias}</div>
                                    <div className='hintCopies'>({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})</div>
                                </div>
                                </div>
                                <div className='hintIconContainer'>
                                {region.nested_locations.map((l, j) =>
                                    !!l.item && show_hinted_items(l) ?
                                        <OotItemIcon key={`wothHintItem${i}_${j}`} className='hintPanelItemIcon' itemName={l.item.name} />
                                        : null
                                )}
                                </div>
                            </div>
                            </React.Fragment>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
            : null}
            { Object.values(pathRegions).length > 0 ?
            <div className='pathTitle'>
                <div className='hintTypeTitle'>Paths</div>
                <div>
                    {Object.values(pathRegions).map((hintStats, i) => {
                        let h = hintStats.hint;
                        if (!!h.area) return (
                            <div className='hintContainer' key={`pathHintText${i}`}>
                                {
                                    !!h.goal && !!h.goal.item ?
                                        <OotItemIcon
                                            itemName={h.goal.item.name}
                                            className="hintPanelKnownItem"
                                        />
                                    : !!h.goal && !!h.goal.location ?
                                        <OotItemIcon
                                            itemName={h.goal.location.name}
                                            className="hintPanelKnownItem"
                                        />
                                    : null
                                }
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className='hintText'>{h.area.alias}</div>
                                    <div className='hintCopies'>({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})</div>
                                </div>
                                </div>
                                <div className='hintIconContainer'>
                                {h.area.nested_locations.map((l, j) => 
                                    !!l.item && show_hinted_items(l) ?
                                        <OotItemIcon key={`pathHintItem${i}_${j}`} className='hintPanelItemIcon' itemName={l.item.name} />
                                        : null
                                )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            : null }
            { Object.values(foolishRegions).length > 0 ?
            <div className='foolishTitle'>
                <div className='hintTypeTitle'>Foolish</div>
                <div>
                    {Object.values(foolishRegions).map((hintStats, i) => {
                        let region = hintStats.hint.area;
                        if (!!region) return (
                            <div className='hintContainer' key={`foolishHintText${i}`}>
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className='hintText'>{region.alias}</div>
                                    <div className='hintCopies'>({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})</div>
                                </div>
                                </div>
                                <div className='hintIconContainer'>
                                {region.nested_locations.map((l, j) => 
                                    !!l.item && show_hinted_items(l) ?
                                        <OotItemIcon key={`foolishHintItem${i}_${j}`} className='hintPanelItemIcon' itemName={l.item.name} />
                                        : null
                                )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            : null }
            { Object.values(hintedLocations).length > 0 || Object.values(hintedRegions).length > 0 ?
            <div className='locationTitle'>
                <div className='hintTypeTitle'>Locations</div>
                <div>
                    {Object.values(hintedLocations).map((hintStats, i) => {
                        let l = hintStats.hint.location;
                        let l2 = hintStats.hint.location2;
                        let item1 = hintStats.hint.item;
                        let item2 = hintStats.hint.item2;
                        let lGroup = hintStats.hint.location?.hint_area;
                        let lGroup2 = hintStats.hint.location2?.hint_area;
                        return (
                            <React.Fragment key={`locHintContainer${i}`}>
                            { !!l ?
                            <div className='hintContainer' key={`locHintText${i}`}>
                                <div className="hintPanelLocation">
                                    <div className='hintPanelLocationContainer'>
                                    <div className="hintPanelLocationName">
                                        {l.alias}
                                    </div>
                                    <div className="hintPanelLocationArea">
                                        {lGroup} ({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})
                                    </div>
                                    </div>
                                </div>
                                {!!item1 ?
                                    <OotItemIcon key={`locHintItem${i}`} className='hintPanelItemIcon' itemName={item1.name} />
                                    : null
                                }
                            </div>
                            : null }
                            { !!l2 ?
                            <div className='hintContainer' key={`loc2HintText${i}`}>
                                <div className="hintPanelLocation">
                                    <div className='hintPanelLocationContainer'>
                                    <div className="hintPanelLocationName">
                                        {l2.alias}
                                    </div>
                                    <div className="hintPanelLocationArea">
                                        {lGroup2} ({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})
                                    </div>
                                    </div>
                                </div>
                                {!!item2 ?
                                    <OotItemIcon key={`loc2HintItem${i}`} className='hintPanelItemIcon' itemName={item2.name} />
                                    : null }
                            </div>
                            : null }
                            </React.Fragment>
                        );
                    })}
                    {Object.values(hintedRegions).map((hintStats, i) => {
                        let h = hintStats.hint;
                        if (!!h.area && !!h.item) return (
                            <div className='hintContainer' key={`regionHintText${i}`}>
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className='hintText'>{h.area.alias}</div>
                                    <div className='hintCopies'>({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})</div>
                                </div>
                                </div>
                                <OotItemIcon key={`regionHintItem${i}`} className='hintPanelItemIcon' itemName={h.item.name} />
                            </div>
                        )
                    })}
                </div>
            </div>
            : null}
            { Object.values(regionItemCounts).length > 0 ?
            <div className='importantTitle'>
                <div className='hintTypeTitle'>Total Important Items</div>
                <div>
                    {Object.values(regionItemCounts).map((hintStats, i) => {
                        let h = hintStats.hint;
                        if (!!h.area) return (
                            <div className='hintContainer' key={`importantHintText${i}`}>
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className='hintText'>{h.area.alias} ({h.num_major_items})</div>
                                    <div className='hintCopies'>({hintStats.copies} {hintStats.copies === 1 ? 'copy' : 'copies'})</div>
                                </div>
                                </div>
                                <div className='hintIconContainer'>
                                {h.area.nested_locations.map((l, j) =>
                                    !!l.item && show_important_items(l) ?
                                        <OotItemIcon key={`importantHintItem${i}_${j}`} className='hintPanelItemIcon' itemName={l.item.name} />
                                        : null
                                )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            : null }
            { Object.values(hintedEntrances).length > 0 ?
            <div className='entranceTitle'>
                <div className='hintTypeTitle'>Entrances</div>
                <div>
                    {Object.values(hintedEntrances).map((hintStats, i) => {
                        let e = hintStats.hint.entrance;
                        let t = hintStats.hint.entrance; // Name building auto switches to the replaced entrance
                        if (!!e && !!t && !!e.parent_region) return (
                            <div className='hintContainer' key={`hintPanelEntrance${i}`}>
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className="entranceLinkFrom">
                                        <div className="entranceLink1">
                                            {e.parent_region.parent_group?.name}
                                        </div>
                                        <div className="entranceLink2">
                                            to {buildEntranceName(e)}
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className='hintTextFlexContainer'>
                                <div className='hintTextContainer'>
                                    <div className="entranceLinkTo">
                                        <div className="entranceLink1">
                                            {buildExitName(t)}
                                        </div>
                                        <div className="entranceLink2">
                                            {buildExitEntranceName(t)}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            : null }
        </div>
    )
}