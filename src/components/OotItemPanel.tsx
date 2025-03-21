import OotItemIcon from './OotItemIcon';
import ContextMenuHandlerWithArgs from './ContextMenuHandlerWithArgs';
import { GraphEntrance, GraphLocation, GraphSettingsConfiguration } from '@mracsys/randomizer-graph-tool';
import { itemPanelLayout, itemEntry } from '@/data/item_panel_layout.ts';
import React, { useState, useEffect } from 'react';
import { OotDungeonTracker } from './OotDungeonTracker';

interface OotItemPanelProps {
    addStartingItem: (item_name: string, count?: number) => void,
    removeStartingItem: (item_name: string, count?: number) => void,
    replaceStartingItem: (add_item_name: string, remove_item_name: string) => void,
    cycleGraphMultiselectOption: ({}?: {
        graphSettingName?: string | undefined;
        settingOptions?: string[] | undefined;
    }) => void,
    cycleGraphRewardHint: ({}?: {
        itemName?: string | undefined;
        forward?: boolean | undefined;
    }) => void,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    graphSettings: GraphSettingsConfiguration,
    graphCollectedItems: {[item_name: string]: number},
    graphPlayerInventory: {[item_name: string]: number},
    graphRewardHints: {[item_name: string]: {
        hint: string,
        hinted: boolean,
    }},
    graphLocations: GraphLocation[],
    graphEntrances: GraphEntrance[],
    visitedSimRegions: Set<string>,
    isNotMobile: boolean,
}

export const createBlankTrackerItem = (entryNum: number) => {
    return (<OotItemIcon
        itemName={'BlankSpace'}
        className={'ootItemBlank'}
        key={`blankItemPanelEntry${entryNum}`}
    />);
}

// Arranged such that Ruto's Letter and Big Poes are added to
// bottle slots first in case more than 4 bottles are permitted
// in plentiful/ludicrous item pools in the future.
export const bottleVariants = [
    "Rutos Letter",
    "Bottle with Big Poe",
    "Bottle",
    "Bottle with Red Potion",
    "Bottle with Green Potion",
    "Bottle with Blue Potion",
    "Bottle with Milk",
    "Bottle with Fairy",
    "Bottle with Fish",
    "Bottle with Blue Fire",
    "Bottle with Bugs",
    "Bottle with Poe",
];

export const OotItemPanel = ({
    addStartingItem,
    removeStartingItem,
    replaceStartingItem,
    cycleGraphMultiselectOption,
    cycleGraphRewardHint,
    handleCheck,
    handleUnCheck,
    graphSettings,
    graphCollectedItems,
    graphPlayerInventory,
    graphRewardHints,
    graphLocations,
    graphEntrances,
    visitedSimRegions,
    isNotMobile,
}: OotItemPanelProps) => {
    const [bottleSlots, setBottleSlots] = useState<(string|null)[]>([null, null, null, null]);
    const [lockedSlots, setLockedSlots] = useState<boolean[]>([false, false, false, false]);

    let locationBottles = graphLocations.filter(l => l.item?.name.startsWith('Bottle') || l.item?.name === 'Rutos Letter').map((l) => { return l.item?.name });
    let playerBottles: {[bottle: string]: number} = {};
    for (let bottle of bottleVariants) {
        if (Object.keys(graphPlayerInventory).includes(bottle)) {
            playerBottles[bottle] = graphPlayerInventory[bottle];
        } else {
            playerBottles[bottle] = 0;
        }
    }

    // run on mount and unmount
    useEffect(() => {
        loadBottleSlots(playerBottles);
    }, [...Object.values(playerBottles)]);

    const addBottleStartingItem = (itemName: string, bottleIndex: number) => {
        let newBottleSlots = [...bottleSlots];
        let prevItemName = bottleSlots[bottleIndex];
        if (!!prevItemName) {
            replaceStartingItem(itemName, prevItemName);
        } else {
            addStartingItem(itemName);
        }
        newBottleSlots[bottleIndex] = itemName;
        setBottleSlots(newBottleSlots);
    }

    const removeBottleStartingItem = (itemName: string, bottleIndex: number) => {
        let newBottleSlots = [...bottleSlots];
        removeStartingItem(itemName);
        newBottleSlots[bottleIndex] = null;
        setBottleSlots(newBottleSlots);
    }

    const loadBottleSlots = (playerBottles: {[item_name: string]: number}) => {
        let collectedBottles: {[item_name: string]: number} = {};
        let newBottleSlots: (string | null)[] = [...bottleSlots];
        let newLockedSlots = [...lockedSlots];
        // Build list of undisplayed bottles. Separate list
        // ensures that gaps in the slots are preserved as
        // well as bottle order (at least until page refresh).
        for (let [bottle, bottleCount] of Object.entries(playerBottles)) {
            collectedBottles[bottle] = bottleCount - newBottleSlots.filter((b) => b === bottle).length;
            // unset slots right to left if a bottle was removed from the inventory
            while (collectedBottles[bottle] < 0) {
                for (let i = 3; i >= 0; i--) {
                    if (newBottleSlots[i] === bottle) {
                        newBottleSlots[i] = null;
                        newLockedSlots[i] = false;
                        break;
                    }
                }
                collectedBottles[bottle] = bottleCount - newBottleSlots.filter((b) => b === bottle).length;
            }
        }
        // Starting item bottles should be able to be cycled when clicked,
        // but bottles from checked locations should remain fixed when clicked.
        let bottlesToLock: {[item_name: string]: number} = {};
        for (let bottle of locationBottles) {
            if (!!bottle) {
                if (!(Object.keys(bottlesToLock).includes(bottle))) bottlesToLock[bottle] = 0;
                bottlesToLock[bottle] += 1;
            }
        }
        for (let i = 0; i < newBottleSlots.length; i++) {
            let bottle = newBottleSlots[i];
            if (!!bottle && newLockedSlots[i] && Object.keys(bottlesToLock).includes(bottle)) {
                bottlesToLock[bottle]--;
            }
        }
        // add undisplayed bottles to empty item grid slots if any exist
        let slotNum = 0;
        for (let [bottle, bottleCount] of Object.entries(collectedBottles)) {
            while (slotNum < 4 && !!(newBottleSlots[slotNum])) {
                slotNum++;
            }
            if (slotNum >= 4) {
                break;
            }
            let numBottles = Math.min(4 - slotNum, bottleCount);
            for (let i = slotNum; i < slotNum + numBottles; i++) {
                newBottleSlots[i] = bottle;
                if (Object.keys(bottlesToLock).includes(bottle)) {
                    if (bottlesToLock[bottle] > 0) {
                        newLockedSlots[i] = true;
                        bottlesToLock[bottle]--;
                    }
                }
            }
            slotNum += numBottles;
        }
        setBottleSlots(newBottleSlots);
        setLockedSlots(newLockedSlots);
    }

    const revertAdultTradeQuest = (currentTradeItem: string) => {
        const prevItemLocations: {[itemName: string]: string | string[]} = {
            //'Pocket Egg': 'Kak Anju as Adult',
            'Cojiro': ['Kak Anju Trade Pocket Cucco'],
            'Odd Mushroom': 'LW Trade Cojiro',
            'Odd Potion': 'Kak Granny Trade Odd Mushroom',
            'Poachers Saw': 'LW Trade Odd Potion',
            'Broken Sword': 'GV Trade Poachers Saw',
            'Prescription': 'DMT Trade Broken Sword',
            'Eyeball Frog': 'ZD Trade Prescription',
            'Eyedrops': 'LH Trade Eyeball Frog',
            'Claim Check': 'DMT Trade Eyedrops',
        };
        if (Object.keys(prevItemLocations).includes(currentTradeItem)) {
            if (Array.isArray(prevItemLocations[currentTradeItem])) {
                for (let location of prevItemLocations[currentTradeItem]) {
                    handleUnCheck(location);
                }
            } else {
                handleUnCheck(prevItemLocations[currentTradeItem]);
            }
        }
    }

    const progressAdultTradeQuest = (currentTradeItem: string) => {
        const nextItemLocations: {[itemName: string]: string | string[]} = {
            // This function only runs with full adult trade quest off,
            // which means that Kak Anju as Adult is always a shuffled item
            // that shouldn't be collected automatically for Pocket Egg.
            //'None': 'Kak Anju as Adult',
            'Pocket Egg': ['Kak Anju Trade Pocket Cucco'],
            'Pocket Cucco': ['Kak Anju Trade Pocket Cucco'],
            'Cojiro': 'LW Trade Cojiro',
            'Odd Mushroom': 'Kak Granny Trade Odd Mushroom',
            'Odd Potion': 'LW Trade Odd Potion',
            'Poachers Saw': 'GV Trade Poachers Saw',
            'Broken Sword': 'DMT Trade Broken Sword',
            'Prescription': 'ZD Trade Prescription',
            'Eyeball Frog': 'LH Trade Eyeball Frog',
            'Eyedrops': 'DMT Trade Eyedrops',
        };
        if (Object.keys(nextItemLocations).includes(currentTradeItem)) {
            if (Array.isArray(nextItemLocations[currentTradeItem])) {
                for (let location of nextItemLocations[currentTradeItem]) {
                    handleCheck(location);
                }
            } else {
                handleCheck(nextItemLocations[currentTradeItem]);
            }
        }
    }

    const revertChildTradeQuest = (currentTradeItem: string) => {
        const prevItemLocations: {[itemName: string]: string[]} = {
            'Weird Egg': ['HC Malon Egg'],
            'Zeldas Letter': ['HC Zeldas Letter'],
            'Keaton Mask': ['Market Mask Shop Item 6'],
            'Skull Mask': ['Market Mask Shop Item 5'],
            'Spooky Mask': ['Market Mask Shop Item 8'],
            'Bunny Hood': ['Market Mask Shop Item 7'],
            'Mask of Truth': ['Market Mask Shop Item 3'],
        };
        if (Object.keys(prevItemLocations).includes(currentTradeItem)) {
            for (let location of prevItemLocations[currentTradeItem]) {
                handleUnCheck(location);
            }
        }
    }

    const progressChildTradeQuest = (currentTradeItem: string) => {
        const nextItemLocations: {[itemName: string]: string[]} = {
            'None': ['HC Malon Egg'],
            'Weird Egg': ['HC Zeldas Letter'],
            'Chicken': ['HC Zeldas Letter'],
            'Zeldas Letter': ['Market Mask Shop Item 6'],
            'Keaton Mask': ['Market Mask Shop Item 5'],
            'Skull Mask': ['Market Mask Shop Item 8'],
            'Spooky Mask': ['Market Mask Shop Item 7'],
            'Bunny Hood': ['Market Mask Shop Item 3'],
        };
        if (Object.keys(nextItemLocations).includes(currentTradeItem)) {
            for (let location of nextItemLocations[currentTradeItem]) {
                handleCheck(location);
            }
        }
    }

    const createTrackerItem = (gridEntry: itemEntry, entryNum: number): JSX.Element | null => {
        let collected: number;
        if (Object.keys(graphPlayerInventory).includes(gridEntry.item_name)) {
            collected = graphPlayerInventory[gridEntry.item_name];
        } else {
            collected = 0;
        }
        let itemName = '';
        let addItem = () => {};
        let contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem(gridEntry.item_name), {});
        let subClass = '';
        let subscript: string | null | undefined = null;
        let subscriptClass: string = '';
        if (!(Object.keys(gridEntry).includes('group_variants'))) {
            if (Object.keys(gridEntry).includes('item_variants') && !!(gridEntry.item_variants)) {
                if (gridEntry.item_variants.length > collected) {
                    let variant_index = collected === 0 ? 0 : collected - 1;
                    itemName = gridEntry.item_variants[variant_index];
                    addItem = () => addStartingItem(gridEntry.item_name);
                } else {
                    itemName = gridEntry.item_variants[gridEntry.item_variants.length - 1];
                    addItem = () => {};
                }
            } else if (gridEntry.item_name === 'BlankSpace') {
                itemName = 'BlankSpace';
                addItem = () => {};
                contextMenuHandler = new ContextMenuHandlerWithArgs(() => {}, {});
            } else if (gridEntry.item_name.includes('Ocarina') && gridEntry.item_name.includes('Button')) {
                // only show ocarina buttons if they are shuffled
                if (!(graphSettings['shuffle_individual_ocarina_notes'])) return null;
                itemName = gridEntry.item_name;
                addItem = (!collected || (!!(gridEntry.sub_variants) && gridEntry.sub_variants.length > collected)) ? () => addStartingItem(gridEntry.item_name) : () => {};
                // if either trade quest shuffle is off, compress the C button icons to make room for the trade item(s)
                if (!!gridEntry.position) {
                    subClass = gridEntry.position;
                }
            } else if (gridEntry.item_name === 'Scarecrow Song') {
                // Don't show the internally collected event if the user hasn't confirmed it by
                // either clicking the icon or collecting the fake viewable event in Lake Hylia.
                let pierre = graphLocations.filter((l) => l.vanilla_item?.name === 'Scarecrow Song')[0];
                let free_scarecrow = graphSettings['free_scarecrow'];
                let starting_items = graphSettings['starting_items'];
                let starting_scarecrow = false;
                if (!!starting_items) {
                    starting_scarecrow = Object.keys(starting_items).includes('Scarecrow Song');
                }
                if (free_scarecrow || pierre.checked || starting_scarecrow) {
                    collected = 1;
                } else {
                    collected = 0;
                }
                itemName = gridEntry.item_name;
                addItem = (!collected || (!!(gridEntry.sub_variants) && gridEntry.sub_variants.length > collected)) ? () => addStartingItem(gridEntry.item_name) : () => {};
            } else if (gridEntry.item_name === 'Magic Bean') {
                if (Object.keys(graphPlayerInventory).includes(gridEntry.item_name)) {
                    collected = graphPlayerInventory[gridEntry.item_name];
                } else if (Object.keys(graphPlayerInventory).includes('Magic Bean Pack')) {
                    collected = 10;
                } else {
                    collected = 0;
                }
                itemName = 'Buy Magic Bean';
                subscript = collected > 0 ? '' + collected : '';
                subscriptClass = collected >= 10 ? 'ootMaxItemUpgrade' : '';
                addItem = 10 > collected ? () => addStartingItem(gridEntry.item_name) : () => {};
            } else if (gridEntry.item_name === 'Like-like Soul') {
                itemName = gridEntry.item_name;
                if (Object.keys(graphPlayerInventory).includes('Likelike Soul')) {
                    collected = graphPlayerInventory['Likelike Soul'];
                } else {
                    collected = 0;
                }
                addItem = (!collected || (!!(gridEntry.sub_variants) && gridEntry.sub_variants.length > collected)) ? () => addStartingItem(gridEntry.item_name) : () => {};
            } else if (gridEntry.item_name === 'Bombchus') {
                itemName = gridEntry.item_name;
                let bombchuVariants = [
                    'Bombchus (5)',
                    'Bombchus (10)',
                    'Bombchus (20)',
                    'Bombchus',
                ];
                collected = 0;
                for (let v of bombchuVariants) {
                    if (!collected && Object.keys(graphPlayerInventory).includes(v)) {
                        collected = graphPlayerInventory[v];
                    }
                }
                addItem = !collected ? () => addStartingItem(gridEntry.item_name) : () => {};
            } else {
                itemName = gridEntry.item_name;
                addItem = (!collected || (!!(gridEntry.sub_variants) && gridEntry.sub_variants.length > collected)) ? () => addStartingItem(gridEntry.item_name) : () => {};
            }
        } else if (Object.keys(gridEntry).includes('group_variants') && !!(gridEntry.group_variants)) {
            if (gridEntry.item_name.startsWith('Bottle')) {
                let strBottleIndex = gridEntry.item_name.at(-1);
                let bottleIndex = !!(strBottleIndex) ? parseInt(strBottleIndex) : 0;
                let bottleSlot = bottleSlots[bottleIndex];
                let variantIndex = 0;
                if (!!bottleSlot) {
                    itemName = bottleSlot;
                    // original collected value won't be correct as the bottle entries
                    // don't use randomizer-native names for the item_name. Needs the
                    // group variant name instead.
                    if (Object.keys(graphPlayerInventory).includes(itemName)) {
                        collected = graphPlayerInventory[itemName];
                    } else {
                        collected = 0;
                    }
                    variantIndex = gridEntry.group_variants.indexOf(itemName);
                    if (variantIndex < 0) throw `Invalid bottle type in item tracker layout: ${itemName}`;
                } else {
                    itemName = gridEntry.group_variants[0];
                }
                let nextBottleItem: string | null = null;
                let prevBottleItem: string | null = null;
                if (variantIndex === 0) {
                    if (collected && gridEntry.group_variants.length > 1) {
                        nextBottleItem = gridEntry.group_variants[variantIndex + 1];
                    } else {
                        nextBottleItem = gridEntry.group_variants[variantIndex];
                        prevBottleItem = gridEntry.group_variants[gridEntry.group_variants.length - 1];
                    }
                } else if (variantIndex === gridEntry.group_variants.length - 1) {
                    // addItem should remove to cycle
                    prevBottleItem = gridEntry.group_variants[variantIndex - 1];
                } else {
                    nextBottleItem = gridEntry.group_variants[variantIndex + 1];
                    prevBottleItem = gridEntry.group_variants[variantIndex - 1];
                }
                if (lockedSlots[bottleIndex]) {
                    addItem = () => {};
                    contextMenuHandler = new ContextMenuHandlerWithArgs(() => {}, {});
                } else {
                    if (!!nextBottleItem) {
                        let newItem = nextBottleItem; // cmon typescript
                        addItem = () => addBottleStartingItem(newItem, bottleIndex);
                    } else {
                        addItem = () => removeBottleStartingItem(itemName, bottleIndex);
                    }
                    if (!!prevBottleItem) {
                        let newItem = prevBottleItem; // cmon typescript
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => addBottleStartingItem(newItem, bottleIndex), {});
                    } else {
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeBottleStartingItem(itemName, bottleIndex), {});
                    }
                }
            } else if (gridEntry.item_name === 'Weird Egg') {
                // child trade shuffle needs cumulative starting items
                // for all of the tangential events to work if only
                // using one item slot to indicate the latest completed
                // quest. Otherwise each item must be considered separately.
                if (child_trade) {
                    // whole row used potentially for ocarina buttons if both trade quests are on
                    return createBlankTrackerItem(entryNum);
                } else {
                    let currentInventoryIndex = 0;
                    for (let i = gridEntry.group_variants.length - 1; i >= 0; i--) {
                        if (Object.keys(graphPlayerInventory).includes(gridEntry.group_variants[i])) {
                            collected = 1;
                            currentInventoryIndex = i;
                            break;
                        }
                    }
                    let latestTradeIndex = currentInventoryIndex;
                    
                    let tradeList = gridEntry.group_variants;
                    itemName = tradeList[latestTradeIndex];
                    let nextTradeIndex = collected ? latestTradeIndex + 1 : latestTradeIndex;
                    let prevTradeIndex = latestTradeIndex;
                    if (nextTradeIndex >= tradeList.length) nextTradeIndex = tradeList.length - 1;
                    if (prevTradeIndex < 0) prevTradeIndex = 0;
                    if (collected) {
                        addItem = () => progressChildTradeQuest(itemName);
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => revertChildTradeQuest(itemName), {});
                    } else {
                        addItem = () => progressChildTradeQuest('None');
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => {}, {});
                    }
                }
            } else if (gridEntry.item_name === 'Pocket Egg') {
                // adult trade shuffle can be also treated as increasing starting items
                // if unshuffled, otherwise each item must be considered separately.
                if (adult_trade) {
                    // whole row used potentially for ocarina buttons if both trade quests are on
                    return createBlankTrackerItem(entryNum);
                } else {
                    let currentStartingIndex = 0;
                    if (!!(graphSettings.starting_items)) {
                        for (let i = gridEntry.group_variants.length - 1; i >= 0; i--) {
                            if (Object.keys(graphPlayerInventory).includes(gridEntry.group_variants[i])) {
                                collected = 1;
                                currentStartingIndex = i;
                                break;
                            }
                        }
                    }
                    let tradeList = gridEntry.group_variants;
                    itemName = tradeList[currentStartingIndex];
                    let nextTradeIndex = collected ? currentStartingIndex + 1 : currentStartingIndex;
                    let prevTradeIndex = currentStartingIndex;
                    if (nextTradeIndex >= tradeList.length) nextTradeIndex = tradeList.length - 1;
                    if (prevTradeIndex < 0) prevTradeIndex = 0;
                    if (collected) {
                        addItem = () => progressAdultTradeQuest(itemName);
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => revertAdultTradeQuest(itemName), {});
                    } else {
                        addItem = () => {};
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => {}, {});
                    }
                }
            } else if (gridEntry.item_name === 'Blue Arrows') {
                // Don't use replaceStartingItem function for Ice Arrows <-> Blue Fire Arrows
                // since this would conflict with checklist-collected blue arrow variants.
                if (Object.keys(graphPlayerInventory).includes('Blue Fire Arrows') && graphPlayerInventory['Blue Fire Arrows'] >= 1) {
                    collected = graphPlayerInventory['Blue Fire Arrows'];
                    itemName = 'Blue Fire Arrows';
                    addItem = () => {};
                    contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem('Blue Fire Arrows'), {});
                } else {
                    if (Object.keys(graphPlayerInventory).includes('Ice Arrows') && graphPlayerInventory['Ice Arrows'] >= 1) {
                        collected = graphPlayerInventory['Ice Arrows'];
                        itemName = 'Ice Arrows';
                        addItem = () => addStartingItem('Blue Fire Arrows');
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem('Ice Arrows'), {});
                    } else {
                        collected = 0;
                        itemName = 'Blue Arrows';
                        addItem = () => addStartingItem('Ice Arrows');
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem('Ice Arrows'), {});
                    }
                }
            } else if (gridEntry.item_name === 'Large Sword') {
                // Don't use replaceStartingItem function for Giants Knife <-> Biggoron Sword
                // since this would conflict with checklist-collected large sword variants.
                if (Object.keys(graphPlayerInventory).includes('Biggoron Sword') && graphPlayerInventory['Biggoron Sword'] >= 1) {
                    collected = graphPlayerInventory['Biggoron Sword'];
                    itemName = 'Biggoron Sword';
                    addItem = () => {};
                    contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem('Biggoron Sword'), {});
                } else {
                    if (Object.keys(graphPlayerInventory).includes('Giants Knife') && graphPlayerInventory['Giants Knife'] >= 1) {
                        collected = graphPlayerInventory['Giants Knife'];
                        itemName = 'Giants Knife';
                        addItem = () => addStartingItem('Biggoron Sword');
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem('Giants Knife'), {});
                    } else {
                        collected = 0;
                        itemName = 'Large Sword';
                        addItem = () => addStartingItem('Giants Knife');
                        contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem('Giants Knife'), {});
                    }
                }
            } else {
                itemName = gridEntry.item_name;
                addItem = (!collected || (!!(gridEntry.sub_variants) && gridEntry.sub_variants.length > collected)) ? () => addStartingItem(gridEntry.item_name) : () => {};
            }
        } else {
            itemName = gridEntry.item_name;
            addItem = (!collected || (!!(gridEntry.sub_variants) && gridEntry.sub_variants.length > collected)) ? () => addStartingItem(gridEntry.item_name) : () => {};
        }
        if (Object.keys(gridEntry).includes('sub_variants') && !!(gridEntry.sub_variants)) {
            if (Object.keys(gridEntry).includes('uncollected_variant') && collected === 0) {
                subscript = gridEntry.uncollected_variant?.toString();
            } else if (gridEntry.sub_variants.length > collected) {
                let variant_index = collected === 0 ? 0 : collected - 1;
                subscript = gridEntry.sub_variants[variant_index]?.toString();
            } else {
                subscript = gridEntry.sub_variants[gridEntry.sub_variants.length - 1]?.toString();
                subscriptClass = 'ootMaxItemUpgrade';
            }
        }
        let className = '';
        let fade = collected ? false : true;
        if (subClass) {
            className = `${className} ${subClass}`;
        }
        if (subscriptClass) {
            className = `${className} ${subscriptClass}`;
        }
        return (
            <div className='itemPanelEntry' key={`${itemName}itemPanelEntry${entryNum}`}>
                <div className={`itemPanelInset ${!fade ? 'found' : ''}`}></div>
                <OotItemIcon
                    itemName={itemName}
                    className={className}
                    onClick={addItem}
                    handleContextMenu={contextMenuHandler}
                    subscript={subscript}
                    fade={fade}
                    hideLabels={false}
                />
            </div>
        );
    }

    let main_panel_children = [];
    let entryNum = 0;
    let adult_trade = graphSettings['adult_trade_shuffle'] && (Array.isArray(graphSettings['adult_trade_start']) && graphSettings['adult_trade_start'].length > 0);
    let child_trade = Array.isArray(graphSettings['shuffle_child_trade']) && graphSettings['shuffle_child_trade'].length > 0;
    for (let gridEntry of itemPanelLayout.main_items) {
        if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
            let trackerItem = createTrackerItem(gridEntry, entryNum);
            if (!!trackerItem) {
                main_panel_children.push(trackerItem);
                entryNum++;
            }
        }
    }

    let song_panel_children = [];
    for (let gridEntry of itemPanelLayout.song_items) {
        if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
            let trackerItem = createTrackerItem(gridEntry, entryNum);
            if (!!trackerItem) {
                song_panel_children.push(trackerItem);
                entryNum++;
            }
        }
    }

    let equip_panel_children = [];
    for (let gridEntry of itemPanelLayout.equipment) {
        if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
            let trackerItem = createTrackerItem(gridEntry, entryNum);
            if (!!trackerItem) {
                equip_panel_children.push(trackerItem);
                entryNum++;
            }
        }
    }

    let boss_soul_panel_children = [];
    let boss_souls = !!graphSettings.shuffle_enemy_spawns && typeof graphSettings.shuffle_enemy_spawns === 'string' && ['all', 'bosses'].includes(graphSettings.shuffle_enemy_spawns);
    if (boss_souls) {
        for (let gridEntry of itemPanelLayout.boss_souls) {
            if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
                let trackerItem = createTrackerItem(gridEntry, entryNum);
                if (!!trackerItem) {
                    boss_soul_panel_children.push(trackerItem);
                    entryNum++;
                }
            }
        }
    }

    let enemy_soul_panel_children = [];
    let enemy_souls = !!graphSettings.shuffle_enemy_spawns && graphSettings.shuffle_enemy_spawns === 'all';
    if (enemy_souls) {
        for (let gridEntry of itemPanelLayout.enemy_souls) {
            if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
                let trackerItem = createTrackerItem(gridEntry, entryNum);
                if (!!trackerItem) {
                    enemy_soul_panel_children.push(trackerItem);
                    entryNum++;
                }
            }
        }
    }

    let regional_soul_panel_children = [];
    let regional_souls = !!graphSettings.shuffle_enemy_spawns && graphSettings.shuffle_enemy_spawns === 'regional';
    if (regional_souls) {
        for (let gridEntry of itemPanelLayout.regional_souls) {
            if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
                let trackerItem = createTrackerItem(gridEntry, entryNum);
                if (!!trackerItem) {
                    regional_soul_panel_children.push(trackerItem);
                    entryNum++;
                }
            }
        }
    }

    let song_panel_last_row = [];
    let collapsed_ocarina_buttons = [];
    for (let gridEntry of itemPanelLayout.last_song_row) {
        if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
            let trackerItem = createTrackerItem(gridEntry, entryNum);
            if (!!trackerItem) {
                if (gridEntry.item_name.includes('Ocarina C') && gridEntry.item_name.includes('Button')) {
                    collapsed_ocarina_buttons.push(trackerItem);
                } else {
                    song_panel_last_row.push(trackerItem);
                }
                entryNum++;
            }
        }
    }
    if (collapsed_ocarina_buttons.length > 0) {
        song_panel_last_row.push(
            <div className='ootCompressedCButtons' key={`ootCompressedCButtonsContainer`}>
                <div className='ootCompressedInset'></div>
                {collapsed_ocarina_buttons}
            </div>
        );
    }

    let child_trade_children = [];
    let adult_trade_children = [];
    if (child_trade) {
        for (let gridEntry of itemPanelLayout.child_trade_items) {
            if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
                let trackerItem = createTrackerItem(gridEntry, entryNum);
                if (!!trackerItem) {
                    child_trade_children.push(trackerItem);
                    entryNum++;
                }
            }
        }
    }
    if (adult_trade) {
        for (let gridEntry of itemPanelLayout.adult_trade_items) {
            if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
                let trackerItem = createTrackerItem(gridEntry, entryNum);
                if (!!trackerItem) {
                    adult_trade_children.push(trackerItem);
                    entryNum++;
                }
            }
        }
    }

    let wincon_panel_children = [];
    entryNum = 0;
    let simMode = graphSettings['graphplugin_simulator_mode'] as boolean;
    for (let [pos, gridEntry] of Object.entries(itemPanelLayout.win_cons.rewards)) {
        let itemName = gridEntry.item_name;
        let collected: number;
        if (Object.keys(graphPlayerInventory).includes(gridEntry.item_name)) {
            collected = graphPlayerInventory[gridEntry.item_name];
        } else {
            collected = 0;
        }
        let addItem = () => {};
        let contextMenuHandler = new ContextMenuHandlerWithArgs(() => {}, {});
        let subscript = '';
        let drawItem = false;
        if (itemName !== 'Triforce Piece') {
            addItem = () => cycleGraphRewardHint({itemName: itemName});
            contextMenuHandler = new ContextMenuHandlerWithArgs(() => cycleGraphRewardHint({itemName: itemName, forward: false}), {});
            subscript = graphRewardHints[itemName].hinted || !simMode ? graphRewardHints[itemName].hint : '????';
            drawItem = true;
        // triforce piece count moved to dungeon reward area for space if all three counters should be shown
        } else if (graphSettings['triforce_hunt'] && [graphSettings['shuffle_ganon_bosskey'], graphSettings['bridge']].includes('hearts')) {
            addItem = () => addStartingItem(gridEntry.item_name);
            contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem(gridEntry.item_name), {});
            subscript = collected.toString();
            drawItem = true;
        }
        if (drawItem) {
            wincon_panel_children.push(<OotItemIcon
                itemName={itemName}
                className={pos}
                onClick={addItem}
                handleContextMenu={contextMenuHandler}
                centerLabel={subscript}
                fade={collected || itemName === 'Triforce Piece' ? false : true}
                fadeLabels={false}
                hideLabels={false}
                key={`${itemName}winconPanelEntry${entryNum}`}
            />);
            entryNum++;
        }
    }

    let counter_panel_children = [];
    entryNum = 0;
    for (let gridEntry of itemPanelLayout.win_cons.counters) {
        let itemName = gridEntry.item_name;
        // don't show wincon counters if relevant settings are not on
        if (itemName === 'Triforce Piece' && !(graphSettings['triforce_hunt'])) continue;
        if (itemName === 'Heart Container' && !([graphSettings['shuffle_ganon_bosskey'], graphSettings['bridge']].includes('hearts'))) continue;
        // triforce piece count moved to dungeon reward area for space if all three counters should be shown
        if (itemName === 'Triforce Piece' && graphSettings['triforce_hunt'] && [graphSettings['shuffle_ganon_bosskey'], graphSettings['bridge']].includes('hearts')) continue;
        let collected: number;
        if (Object.keys(graphPlayerInventory).includes(gridEntry.item_name)) {
            collected = graphPlayerInventory[gridEntry.item_name];
        } else {
            collected = 0;
        }
        let available: number;
        if (Object.keys(graphCollectedItems).includes(gridEntry.item_name)) {
            available = graphCollectedItems[gridEntry.item_name];
        } else {
            available = 0;
        }
        let show_available_tokens = Object.keys(graphSettings).includes('tokensanity') && graphSettings['tokensanity'] === 'off'
            && Array.isArray(graphSettings.graphplugin_viewable_unshuffled_items) && !graphSettings.graphplugin_viewable_unshuffled_items.includes('Gold Skulltula Tokens') && itemName === 'Gold Skulltula Token';
        // Display hearts with the 3 minimum starting hearts. The randomizer logic internally assumes these are always there and starts at 0
        if (itemName === 'Heart Container') collected += 3;
        let addItem = () => addStartingItem(gridEntry.item_name);
        let contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem(gridEntry.item_name), {});
        counter_panel_children.push(
        <div
            className='ootCounterItem'
            onClick={addItem}
            onContextMenu={contextMenuHandler.onContextMenu}
            onTouchStart={contextMenuHandler.onTouchStart}
            onTouchCancel={contextMenuHandler.onTouchCancel}
            onTouchEnd={contextMenuHandler.onTouchEnd}
            onTouchMove={contextMenuHandler.onTouchMove}
            key={`${itemName}counterPanelEntry${entryNum}`}
        >
            <OotItemIcon
                itemName={itemName}
                fade={collected ? false : true}
                key={`${itemName}counterPanelEntryIcon${entryNum}`}
            />
            <div className='ootCounterLabel' key={`${itemName}counterPanelEntryLabel${entryNum}`}>{collected}{show_available_tokens ? `/${available}` : null}</div>
        </div>);
        entryNum++;
    }

    let silverRupeeLocations = graphLocations.filter((l) => l.vanilla_item?.name.includes('Silver Rupee'));
    let validSilverRupees: {[rupeeName: string]: number} = {};
    if (silverRupeeLocations.length > 0) {
        for (let rupeeLocation of silverRupeeLocations) {
            if (!!rupeeLocation.vanilla_item) {
                let rupeeName = rupeeLocation.vanilla_item.name;
                validSilverRupees[rupeeName] = silverRupeeLocations.filter((l) => l.vanilla_item?.name === rupeeName).length;
            }
        }
    }

    let hideTCGKeys = graphSettings['shuffle_tcgkeys'] === undefined || ['vanilla', 'remove'].includes(graphSettings['shuffle_tcgkeys'] as string);

    return (
        <div className='ootItemTracker'>
            <div className="ootItemsHeldContainer">
                {main_panel_children}
            </div>
            <div className="ootEquipmentHeldContainer">
                {equip_panel_children}
            </div>
            <div className='ootQuestInfoContainer'>
                <div className="ootSongsHeldContainer">
                    {song_panel_children}
                </div>
                <div className='ootWinConsContainer'>
                    <div className='ootRewardWinCons'>
                        {wincon_panel_children}
                    </div>
                    <div className='ootCounterWinCons'>
                        <div className='ootCounterItems'>
                            {counter_panel_children}
                        </div>
                    </div>
                </div>
                <div className='ootItemsHeldLastRowContainer'>
                    {song_panel_last_row}
                </div>
            </div>
            { child_trade ?
            <div className='ootChildTradeItemsContainer'>
                {child_trade_children}
            </div> : null
            }
            { adult_trade ?
            <div className={`ootAdultTradeItemsContainer ootAdultTradeItemsContainer${child_trade ? 1 : 0}`}>
                {adult_trade_children}
            </div> : null
            }
            { enemy_souls ?
            <div className={`ootEnemySoulsContainer ootEnemySoulsContainer${child_trade && adult_trade ? 2 : child_trade || adult_trade ? 1 : 0}`}>
                {enemy_soul_panel_children}
            </div> : null
            }
            { boss_souls ?
            <div className={`ootBossSoulsContainer ootBossSoulsContainer${child_trade && adult_trade && enemy_souls ? 7
                                                                        : (enemy_souls && child_trade) || (enemy_souls && adult_trade) ? 6
                                                                        : enemy_souls && !(child_trade || adult_trade) ? 5
                                                                        : !enemy_souls && child_trade && adult_trade ? 2
                                                                        : !enemy_souls && (child_trade || adult_trade) ? 1 : 0}`}>
                {boss_soul_panel_children}
            </div> : null
            }
            { regional_souls ?
            <div className={`ootRegionalSoulsContainer ootRegionalSoulsContainer${child_trade && adult_trade ? 2 : child_trade || adult_trade ? 1 : 0}`}>
                {regional_soul_panel_children}
            </div> : null
            }
            {   /* 
                    Slight overlap required between the two columns to make
                    the dungeon rewards fit in non-mobile layout. Mobile
                    splits the dungeons from two columns in one grid to two
                    grids in series vertically.
                */
                isNotMobile ?
                <div className='ootDungeonMedItemsContainer'>
                    {[0, 1, 2, 3, 4].map(i => {
                        return (
                            <React.Fragment key={`DungeonPanelPairRow${i}`}>
                                <OotDungeonTracker
                                    addStartingItem={addStartingItem}
                                    removeStartingItem={removeStartingItem}
                                    cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                                    handleCheck={handleCheck}
                                    handleUnCheck={handleUnCheck}
                                    gridEntry={itemPanelLayout.med_dungeon_items[i]}
                                    graphSettings={graphSettings}
                                    graphCollectedItems={graphPlayerInventory}
                                    graphLocations={graphLocations}
                                    graphEntrances={graphEntrances}
                                    graphRewardHints={graphRewardHints}
                                    validSilverRupees={validSilverRupees}
                                    visitedSimRegions={visitedSimRegions}
                                    includeBlankSilverRupeeSquare={true}
                                    isWide={isNotMobile}
                                    key={`${itemPanelLayout.med_dungeon_items[i].label}DungeonPanelEntryContainer`}
                                />
                                <OotDungeonTracker
                                    addStartingItem={addStartingItem}
                                    removeStartingItem={removeStartingItem}
                                    cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                                    handleCheck={handleCheck}
                                    handleUnCheck={handleUnCheck}
                                    gridEntry={itemPanelLayout.side_dungeon_items[i]}
                                    graphSettings={graphSettings}
                                    graphCollectedItems={graphPlayerInventory}
                                    graphLocations={graphLocations}
                                    graphEntrances={graphEntrances}
                                    graphRewardHints={graphRewardHints}
                                    validSilverRupees={validSilverRupees}
                                    visitedSimRegions={visitedSimRegions}
                                    includeBlankSilverRupeeSquare={true}
                                    isWide={isNotMobile}
                                    key={`${itemPanelLayout.side_dungeon_items[i].label}DungeonPanelEntryContainer`}
                                />
                            </React.Fragment>
                        )
                    })}
                </div>
                :
                <React.Fragment>
                <div className='ootDungeonMedItemsContainer med'>
                    {itemPanelLayout.med_dungeon_items.map((gridEntry) => {
                        return <OotDungeonTracker
                                addStartingItem={addStartingItem}
                                removeStartingItem={removeStartingItem}
                                cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                                handleCheck={handleCheck}
                                handleUnCheck={handleUnCheck}
                                gridEntry={gridEntry}
                                graphSettings={graphSettings}
                                graphCollectedItems={graphPlayerInventory}
                                graphLocations={graphLocations}
                                graphEntrances={graphEntrances}
                                graphRewardHints={graphRewardHints}
                                validSilverRupees={validSilverRupees}
                                visitedSimRegions={visitedSimRegions}
                                includeBlankSilverRupeeSquare={true}
                                isWide={isNotMobile}
                                key={`${gridEntry.label}DungeonPanelEntryContainer`}
                            />
                    })}
                </div>
                <div className='ootDungeonSideItemsContainer stone'>
                    {itemPanelLayout.side_dungeon_items.map((gridEntry) => {
                        return <OotDungeonTracker
                                addStartingItem={addStartingItem}
                                removeStartingItem={removeStartingItem}
                                cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                                handleCheck={handleCheck}
                                handleUnCheck={handleUnCheck}
                                gridEntry={gridEntry}
                                graphSettings={graphSettings}
                                graphCollectedItems={graphPlayerInventory}
                                graphLocations={graphLocations}
                                graphEntrances={graphEntrances}
                                graphRewardHints={graphRewardHints}
                                validSilverRupees={validSilverRupees}
                                visitedSimRegions={visitedSimRegions}
                                includeBlankSilverRupeeSquare={true}
                                isWide={isNotMobile}
                                key={`${gridEntry.label}DungeonPanelEntryContainer`}
                            />
                    })}
                </div>
                </React.Fragment>
            }
                <div className={`ootDungeonStoneItemsContainer ${hideTCGKeys ? 'ootDungeonItemsLastRow' : 'ootDungeonTCGItemsLastRow'}`}>
                    {itemPanelLayout.stone_dungeon_items.map((gridEntry) => {
                        if (gridEntry.label === 'TCG' && hideTCGKeys) return null;
                        return <OotDungeonTracker
                                addStartingItem={addStartingItem}
                                removeStartingItem={removeStartingItem}
                                cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                                handleCheck={handleCheck}
                                handleUnCheck={handleUnCheck}
                                gridEntry={gridEntry}
                                graphSettings={graphSettings}
                                graphCollectedItems={graphPlayerInventory}
                                graphLocations={graphLocations}
                                graphEntrances={graphEntrances}
                                graphRewardHints={graphRewardHints}
                                validSilverRupees={validSilverRupees}
                                visitedSimRegions={visitedSimRegions}
                                includeBlankSilverRupeeSquare={false}
                                isWide={!isNotMobile}
                                key={`${gridEntry.label}DungeonPanelEntryContainer`}
                            />
                    })}
                </div>
        </div>
    )
}