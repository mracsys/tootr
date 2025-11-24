import React from 'react';
import { labelEntry } from "@/data/item_panel_layout";
import { SilverRupeeDisplayIcon } from './SilverRupeeDisplayIcon';
import ContextMenuHandlerWithArgs from './ContextMenuHandlerWithArgs';
import { GraphEntrance, GraphLocation, GraphSettingsConfiguration } from '@mracsys/randomizer-graph-tool';
import { createBlankTrackerItem } from "./OotItemPanel";
import OotItemIcon from './OotItemIcon';
import ContextMenuHandler from "./ContextMenuHandler";

import '@/styles/DungeonPanel.css';

export type RupeeCount = {
    name: string,
    collected: number,
    max: number,
    addItem: () => void,
    removeItem: ContextMenuHandlerWithArgs,
}

const dungeonToEntranceMap: {[dungeonName: string]: string} = {
    "Deku": "Deku Tree Before Boss -> Queen Gohma Boss Room",
    "DC": "Dodongos Cavern Before Boss -> King Dodongo Boss Room",
    "Jabu": "Jabu Jabus Belly Before Boss -> Barinade Boss Room",
    "Forest": "Forest Temple Before Boss -> Phantom Ganon Boss Room",
    "Fire": "Fire Temple Before Boss -> Volvagia Boss Room",
    "Water": "Water Temple Before Boss -> Morpha Boss Room",
    "Spirit": "Spirit Temple Before Boss -> Twinrova Boss Room",
    "Shadow": "Shadow Temple Before Boss -> Bongo Bongo Boss Room",
};

const entranceToBossRewardMap: {[entranceName: string]: string} = {
    "Deku Tree Before Boss -> Queen Gohma Boss Room": "Queen Gohma",
    "Dodongos Cavern Before Boss -> King Dodongo Boss Room": "King Dodongo",
    "Jabu Jabus Belly Before Boss -> Barinade Boss Room": "Barinade",
    "Forest Temple Before Boss -> Phantom Ganon Boss Room": "Phantom Ganon",
    "Fire Temple Before Boss -> Volvagia Boss Room": "Volvagia",
    "Water Temple Before Boss -> Morpha Boss Room": "Morpha",
    "Spirit Temple Before Boss -> Twinrova Boss Room": "Twinrova",
    "Shadow Temple Before Boss -> Bongo Bongo Boss Room": "Bongo Bongo",
};

const leftWardsSilverRupeeMenus = [
    'Well',
    'Ice',
    'GTG',
    'Ganon',
    'DC',
];

interface OotDungeonTrackerProps {
    addStartingItem: (item_name: string, count?: number) => void,
    removeStartingItem: (item_name: string, count?: number) => void,
    cycleGraphMultiselectOption: ({}?: {
        graphSettingName?: string | undefined;
        settingOptions?: string[] | undefined;
    }) => void,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    gridEntry: labelEntry,
    graphSettings: GraphSettingsConfiguration,
    graphCollectedItems: {[item_name: string]: number},
    graphLocations: GraphLocation[],
    graphEntrances: GraphEntrance[],
    graphRewardHints: {[item_name: string]: {
        hint: string,
        hinted: boolean,
    }},
    validSilverRupees: {[rupeeName: string]: number},
    includeBlankSilverRupeeSquare: boolean,
    visitedSimRegions: Set<string>,
    isWide: boolean,
}

export const OotDungeonTracker = ({
    addStartingItem,
    removeStartingItem,
    cycleGraphMultiselectOption,
    handleCheck,
    handleUnCheck,
    gridEntry,
    graphSettings,
    graphCollectedItems,
    graphLocations,
    graphEntrances,
    graphRewardHints,
    validSilverRupees,
    includeBlankSilverRupeeSquare,
    visitedSimRegions,
    isWide,
}: OotDungeonTrackerProps) => {
    let changeDungeon = () => {};
    let labelClass = 'ootDungeonName';
    let variantName = '';
    let simMode = graphSettings['graphplugin_simulator_mode'] as boolean;
    if (!!gridEntry.modify_setting && !!gridEntry.setting_value) {
        let settingOptions = [gridEntry.setting_value];
        changeDungeon = () => cycleGraphMultiselectOption({graphSettingName: gridEntry.modify_setting, settingOptions: settingOptions});
        labelClass = `${labelClass} clickable`;
        let currentGraphSetting = graphSettings[gridEntry.modify_setting];
        let hasMap = Object.keys(graphCollectedItems).includes(`Map (${gridEntry.setting_value})`) && graphCollectedItems[`Map (${gridEntry.setting_value})`] > 0;
        let mapInfo = graphSettings['enhance_map_compass'] as boolean;
        if (Array.isArray(currentGraphSetting) && currentGraphSetting.includes(gridEntry.setting_value) &&
            (!simMode || (hasMap && mapInfo) || visitedSimRegions.has(gridEntry.setting_value))) {
            variantName = 'MQ';
        }
    }
    const contextMenuHandler = new ContextMenuHandler(changeDungeon);
    let dungeon_item_children = [];
    let entryNum = 0;
    let dungeon_item_length = 0;
    for (let itemEntry of gridEntry.item_list) {
        if (itemEntry.item_name === 'DungeonReward') {
            let itemName: string = '?';
            let clickAction: () => void = () => {};
            let fadeIcon = false;
            if (graphEntrances.length === 0 || graphLocations.length === 0) {
                itemName = '?';
                clickAction = () => {};
            } else {
                let dungeonName = gridEntry.label;
                let bossEntrances = graphEntrances.filter((e) => e.name === dungeonToEntranceMap[dungeonName]);
                if (bossEntrances.length !== 1) {
                    console.log(`[ERROR] Unable to find boss entrance for item tracker dungeon: ${dungeonName}`);
                    //continue;
                } else {
                    let bossEntrance = bossEntrances[0];
                    if (!!bossEntrance.replaces) bossEntrance = bossEntrance.replaces;
                    let bossRewards = graphLocations.filter((l) => l.name === entranceToBossRewardMap[bossEntrance.name]);
                    if (bossRewards.length !== 1) {
                        if (bossEntrance.name === 'Ganons Castle Main -> Ganons Castle Tower') {
                            // do nothing, no reward in Ganon's Tower even if shuffled to a blue warp dungeon
                        } else {
                            console.log(`Unable to find boss reward for item tracker dungeon: ${dungeonName}, entrance: ${bossEntrance.name}`);
                        }
                        //continue;
                    } else {
                        let bossReward = bossRewards[0];
                        if (!!bossReward.item && !!bossEntrances[0].connected_region) {
                            if (!simMode || bossReward.hinted || bossReward.checked || (Object.keys(graphRewardHints).includes(bossReward.item.name) && graphRewardHints[bossReward.item.name].hinted)) {
                                itemName = bossReward.item.name;
                                if (bossReward.checked) {
                                    clickAction = () => handleUnCheck(bossReward.name);
                                } else {
                                    clickAction = () => handleCheck(bossReward.name);
                                    fadeIcon = true;
                                }
                            }
                        }
                    }
                }
            }
            dungeon_item_children.push(<OotItemIcon
                itemName={itemName}
                fade={fadeIcon}
                hideLabels={false}
                onClick={clickAction}
                key={`${itemName}DungeonPanelEntry${gridEntry.label}${entryNum}`}
            />);
        } else if (itemEntry.item_name === 'BlankSpace') {
            dungeon_item_children.push(createBlankTrackerItem(entryNum));
        } else {
            let collected: number;
            if (Object.keys(graphCollectedItems).includes(itemEntry.item_name)) {
                collected = graphCollectedItems[itemEntry.item_name];
            } else {
                collected = 0;
            }
            let addItem = (!collected || (!!(itemEntry.sub_variants) && itemEntry.sub_variants.length > collected)) ? () => addStartingItem(itemEntry.item_name) : () => {};
            let contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem(itemEntry.item_name), {});
            let subscript = ' '; // must be non-empty string to override the boss key subscripts
            let subscriptClass = '';
            if (itemEntry.item_name.includes('Small Key')) {
                let max_keys = graphLocations.filter((l) => l.vanilla_item?.name === itemEntry.item_name).length;
                if (itemEntry.item_name === 'Small Key (Thieves Hideout)' && Object.keys(graphSettings).includes('gerudo_fortress') && graphSettings['gerudo_fortress'] === 'fast') {
                    // gerudo guard locations still exist with fast fortress even though they are disabled
                    max_keys = 1;
                }
                subscript = `${collected.toString()}/${max_keys}`;
                addItem = (collected < max_keys) ? () => addStartingItem(itemEntry.item_name) : () => {};
                if (collected >= max_keys && graphLocations.length > 0) {
                    subscriptClass = 'ootMaxItemUpgrade';
                }
            }
            const smallKeys = [
                'Small Key (Forest Temple)',
                'Small Key (Fire Temple)',
                'Small Key (Water Temple)',
                'Small Key (Spirit Temple)',
                'Small Key (Shadow Temple)',
                'Small Key (Bottom of the Well)',
                'Small Key (Gerudo Training Ground)',
                'Small Key (Ganons Castle)',
            ];
            const bossKeys = [
                'Boss Key (Forest Temple)',
                'Boss Key (Fire Temple)',
                'Boss Key (Water Temple)',
                'Boss Key (Spirit Temple)',
                'Boss Key (Shadow Temple)',
            ];
            if (smallKeys.includes(itemEntry.item_name) && Object.keys(graphSettings).includes('shuffle_smallkeys') && ['vanilla', 'remove'].includes(graphSettings['shuffle_smallkeys'] as string)) {
                dungeon_item_children.push(createBlankTrackerItem(entryNum));
            } else if (bossKeys.includes(itemEntry.item_name) && Object.keys(graphSettings).includes('shuffle_bosskeys') && ['vanilla', 'remove'].includes(graphSettings['shuffle_bosskeys'] as string)) {
                dungeon_item_children.push(createBlankTrackerItem(entryNum));
            } else if (itemEntry.item_name === 'Small Key (Thieves Hideout)'
                        && ((Object.keys(graphSettings).includes('shuffle_hideoutkeys') && graphSettings['shuffle_hideoutkeys'] === 'vanilla')
                        || (Object.keys(graphSettings).includes('gerudo_fortress') && graphSettings['gerudo_fortress'] === 'open'))) {
                dungeon_item_children.push(createBlankTrackerItem(entryNum));
            } else if (itemEntry.item_name === 'Gerudo Membership Card'
                        && Object.keys(graphSettings).includes('shuffle_gerudo_card') && !(graphSettings['shuffle_gerudo_card'])) {
                dungeon_item_children.push(createBlankTrackerItem(entryNum));
            } else if (bossKeys.includes(itemEntry.item_name) && Object.keys(graphSettings).includes('shuffle_bosskeys') && ['vanilla', 'remove'].includes(graphSettings['shuffle_bosskeys'] as string)) {
                dungeon_item_children.push(createBlankTrackerItem(entryNum));
            } else if (itemEntry.item_name === 'Boss Key (Ganons Castle)' && Object.keys(graphSettings).includes('shuffle_ganon_bosskey') && ['vanilla', 'remove'].includes(graphSettings['shuffle_ganon_bosskey'] as string)) {
                dungeon_item_children.push(createBlankTrackerItem(entryNum));
            } else {
                dungeon_item_children.push(<OotItemIcon
                    itemName={itemEntry.item_name}
                    className={subscriptClass}
                    fade={collected ? false : true}
                    hideLabels={false}
                    onClick={addItem}
                    handleContextMenu={contextMenuHandler}
                    subscript={subscript}
                    key={`${itemEntry.item_name}DungeonPanelEntry${gridEntry.label}${entryNum}`}
                />);
                if (itemEntry.item_name.includes('Small Key')) dungeon_item_length = 1;
                if (itemEntry.item_name.includes('Boss Key') || itemEntry.item_name.includes('Membership')) dungeon_item_length = 2;
            }
        }
        entryNum++;
    }
    let silverRupeeSetting = 'vanilla';
    if (Object.keys(graphSettings).includes('shuffle_silver_rupees')) {
        silverRupeeSetting = graphSettings['shuffle_silver_rupees'] as string;
    }
    let openLeft = leftWardsSilverRupeeMenus.includes(gridEntry.label) && isWide;
    if (!(['remove', 'vanilla'].includes(silverRupeeSetting))) {
        
        let isBlank = true;
        let itemName = '';
        let dungeonSilverRupeeCounts: RupeeCount[] = [];
        if (!!gridEntry.silver_rupees) {
            // Extract silver rupee category from the parentheses.
            // If item names change and this is no longer true, fall back
            // to the provided item name.
            let extractSilverRupeeName = (itemName: string, dungeonName: string | undefined) => {
                let rx = /\(([^\)]+)\)/g;
                let arr = rx.exec(itemName);
                if (!!arr) {
                    let rupeeName = arr[1];
                    if (!!dungeonName) {
                        rupeeName = rupeeName.replace(`${dungeonName} `, '');
                    }
                    return rupeeName;
                } else {
                    return itemName;
                }
            }
            let collectRupee = (itemName: string, collected: number, max: number) => {
                if (collected < max) {
                    addStartingItem(itemName);
                }
            }
            let uncollectRupee = (itemName: string, collected: number) => {
                if (collected > 0) {
                    removeStartingItem(itemName);
                }
            }
            for (let itemEntry of gridEntry.silver_rupees) {
                if (Object.keys(validSilverRupees).includes(itemEntry.item_name)) {
                    let max = validSilverRupees[itemEntry.item_name];
                    let collected: number;
                    if (Object.keys(graphCollectedItems).includes(itemEntry.item_name)) {
                        collected = graphCollectedItems[itemEntry.item_name];
                    } else {
                        collected = 0;
                    }
                    if (collected > max) collected = max;
                    dungeonSilverRupeeCounts.push({
                        name: extractSilverRupeeName(itemEntry.item_name, gridEntry.setting_value),
                        collected: collected,
                        max: max,
                        addItem: () => collectRupee(itemEntry.item_name, collected, max),
                        removeItem: new ContextMenuHandlerWithArgs(() => uncollectRupee(itemEntry.item_name, collected), {}),
                    });
                    itemName = itemEntry.item_name;
                }
            }
            if (dungeonSilverRupeeCounts.length > 0) {
                isBlank = false;
                dungeon_item_children.push(<SilverRupeeDisplayIcon
                    gridEntry={gridEntry}
                    itemName={itemName}
                    entryNum={entryNum}
                    dungeonSilverRupeeCounts={dungeonSilverRupeeCounts}
                    key={`${itemName}DungeonPanelSilverRupee${gridEntry.label}${entryNum}`}
                    openLeft={openLeft}
                />);
                entryNum++;
                if (itemName === 'Silver Rupee (Dodongos Cavern Staircase)') {
                    dungeon_item_length = 1;
                } else {
                    dungeon_item_length = 3;
                }
            }
        }
        if (isBlank && includeBlankSilverRupeeSquare) {
            dungeon_item_children.push(createBlankTrackerItem(entryNum));
        }
    } else if (includeBlankSilverRupeeSquare) {
        dungeon_item_children.push(createBlankTrackerItem(entryNum));
    }
    return (
        <div className='ootDungeonContainer' key={`${gridEntry.label}DungeonPanelEntry`}>
            <div className='ootDungeonLabelContainer'>
                <div
                    className={labelClass}
                    onClick={changeDungeon}
                    onContextMenu={contextMenuHandler.onContextMenu}
                    onTouchStart={contextMenuHandler.onTouchStart}
                    onTouchCancel={contextMenuHandler.onTouchCancel}
                    onTouchEnd={contextMenuHandler.onTouchEnd}
                    onTouchMove={contextMenuHandler.onTouchMove}
                >
                    {gridEntry.label}
                </div>
                <div
                    className='ootDungeonVariantContainer'
                    onClick={changeDungeon}
                    onContextMenu={contextMenuHandler.onContextMenu}
                    onTouchStart={contextMenuHandler.onTouchStart}
                    onTouchCancel={contextMenuHandler.onTouchCancel}
                    onTouchEnd={contextMenuHandler.onTouchEnd}
                    onTouchMove={contextMenuHandler.onTouchMove}
                >
                    <div className='ootDungeonVariant'>{variantName}</div>
                </div>
            </div>
            <div className="ootDungeonInsetContainer">
                {
                    dungeon_item_length > 0 ?
                        <div className={`ootDungeonInset${dungeon_item_length}`}></div>
                        : null
                }
                <div className='ootDungeonItems'>{dungeon_item_children}</div>
            </div>
        </div>
    );
}