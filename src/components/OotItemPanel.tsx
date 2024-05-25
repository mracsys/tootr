import OotItemIcon from './OotItemIcon';
import ContextMenuHandlerWithArgs from './ContextMenuHandlerWithArgs';
import { GraphEntrance, GraphLocation, GraphSettingsConfiguration } from '@mracsys/randomizer-graph-tool';
import { itemPanelLayout, itemEntry } from '@/data/item_panel_layout.ts';
import { useState, useEffect } from 'react';
import { OotDungeonTracker } from './OotDungeonTracker';

interface OotItemPanelProps {
    addStartingItem: (item_name: string, count?: number) => void,
    addStartingItems: (item_names: string[]) => void,
    removeStartingItem: (item_name: string, count?: number) => void,
    removeStartingItems: (item_names: string[]) => void,
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
    graphRewardHints: {[item_name: string]: string},
    graphLocations: GraphLocation[],
    graphEntrances: GraphEntrance[],
    refreshCounter: number,
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
    addStartingItems,
    removeStartingItem,
    removeStartingItems,
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
    refreshCounter,
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

    const addCumulativeStartingItems = (itemList: string[], itemIndex: number) => {
        let newStartingItems: string[] = [];
        for (let i = 0; i <= itemIndex; i++) {
            if (!!(graphSettings.starting_items) && !(Object.keys(graphSettings.starting_items).includes(itemList[i]))) {
                newStartingItems.push(itemList[i]);
            }
        }
        addStartingItems(newStartingItems);
    }

    const removeCumulativeStartingItems = (itemList: string[], itemIndex: number) => {
        let newStartingItems: string[] = [];
        for (let i = itemList.length - 1; i >= itemIndex; i--) {
            // Only remove current starting items. Technically the graph already
            // handles this, but better to be thorough.
            if (!!(graphSettings.starting_items) && Object.keys(graphSettings.starting_items).includes(itemList[i])) {
                newStartingItems.push(itemList[i]);
            }
        }
        removeStartingItems(newStartingItems);
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
                if ((!child_trade || !adult_trade) && !!gridEntry.position) {
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
                    return adult_trade ? null : createBlankTrackerItem(entryNum);
                } else {
                    let currentStartingIndex = 0;
                    if (!!(graphSettings.starting_items)) {
                        for (let i = gridEntry.group_variants.length - 1; i >= 0; i--) {
                            if (Object.keys(graphSettings.starting_items).includes(gridEntry.group_variants[i])) {
                                collected = 1;
                                currentStartingIndex = i;
                                break;
                            }
                        }
                    }
                    let currentInventoryIndex = 0;
                    for (let i = gridEntry.group_variants.length - 1; i >= 0; i--) {
                        if (Object.keys(graphPlayerInventory).includes(gridEntry.group_variants[i])) {
                            collected = 1;
                            currentInventoryIndex = i;
                            break;
                        }
                    }
                    let latestTradeIndex = currentInventoryIndex > currentStartingIndex ? currentInventoryIndex : currentStartingIndex;
                    
                    let tradeList = gridEntry.group_variants;
                    itemName = tradeList[latestTradeIndex];
                    let nextTradeIndex = collected ? latestTradeIndex + 1 : latestTradeIndex;
                    let prevTradeIndex = latestTradeIndex;
                    if (nextTradeIndex >= tradeList.length) nextTradeIndex = tradeList.length - 1;
                    if (prevTradeIndex < 0) prevTradeIndex = 0;
                    addItem = () => addStartingItem(tradeList[nextTradeIndex]);
                    contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeStartingItem(tradeList[prevTradeIndex]), {});
                }
            } else if (gridEntry.item_name === 'Pocket Egg') {
                // adult trade shuffle can be also treated as increasing starting items
                // if unshuffled, otherwise each item must be considered separately.
                if (adult_trade) {
                    // whole row used potentially for ocarina buttons if both trade quests are on
                    return child_trade ? null : createBlankTrackerItem(entryNum);
                } else {
                    let currentStartingIndex = 0;
                    if (!!(graphSettings.starting_items)) {
                        for (let i = gridEntry.group_variants.length - 1; i >= 0; i--) {
                            if (Object.keys(graphSettings.starting_items).includes(gridEntry.group_variants[i])) {
                                collected = 1;
                                currentStartingIndex = i;
                                break;
                            }
                        }
                    }
                    if (currentStartingIndex === 0 && Object.keys(graphPlayerInventory).includes('Pocket Cucco')
                    && (graphSettings.starting_items === undefined || graphSettings.starting_items === null || !(Object.keys(graphSettings.starting_items).includes('Pocket Egg')))) {
                        currentStartingIndex = 1;
                        collected = 1;
                    }
                    let tradeList = gridEntry.group_variants;
                    itemName = tradeList[currentStartingIndex];
                    let nextTradeIndex = collected ? currentStartingIndex + 1 : currentStartingIndex;
                    let prevTradeIndex = currentStartingIndex;
                    if (nextTradeIndex >= tradeList.length) nextTradeIndex = tradeList.length - 1;
                    if (prevTradeIndex < 0) prevTradeIndex = 0;
                    addItem = () => addCumulativeStartingItems(tradeList, nextTradeIndex);
                    contextMenuHandler = new ContextMenuHandlerWithArgs(() => removeCumulativeStartingItems(tradeList, prevTradeIndex), {});
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
        return (<OotItemIcon
            itemName={itemName}
            className={className}
            onClick={addItem}
            handleContextMenu={contextMenuHandler}
            subscript={subscript}
            fade={fade}
            hideLabels={false}
            key={`${itemName}itemPanelEntry${entryNum}`}
        />);
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

    let main_panel_last_row = [];
    let collapsed_ocarina_buttons = [];
    let main_panel_trade_items = [];
    for (let gridEntry of itemPanelLayout.last_items_row) {
        if (Object.keys(gridEntry).includes('item_name') && !!(gridEntry.item_name)) {
            let trackerItem = createTrackerItem(gridEntry, entryNum);
            if (!!trackerItem) {
                if (gridEntry.item_name.includes('Ocarina C') && gridEntry.item_name.includes('Button') && (!child_trade || !adult_trade)) {
                    collapsed_ocarina_buttons.push(trackerItem);
                } else if (gridEntry.item_name === 'Weird Egg' || gridEntry.item_name === 'Pocket Egg') {
                    main_panel_trade_items.push(trackerItem);
                } else {
                    main_panel_last_row.push(trackerItem);
                }
                entryNum++;
            }
        }
    }
    if (collapsed_ocarina_buttons.length > 0) {
        main_panel_last_row.push(<div className='ootCompressedCButtons' key={`ootCompressedCButtonsContainer`}>{collapsed_ocarina_buttons}</div>);
    }
    if (main_panel_trade_items.length > 0) {
        main_panel_last_row.push(...main_panel_trade_items);
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
            subscript = graphRewardHints[itemName];
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
        let show_available_tokens = Object.keys(graphSettings).includes('tokensanity') && graphSettings['tokensanity'] === 'off' && itemName === 'Gold Skulltula Token';
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
                {main_panel_last_row}
            </div>
            <div className='ootChildTradeItemsContainer'>
                {child_trade_children}
            </div>
            <div className='ootAdultTradeItemsContainer'>
                {adult_trade_children}
            </div>
            <div className='ootDungeonItemsContainer'>
                {itemPanelLayout.dungeon_items.map((gridEntry) => {
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
                            validSilverRupees={validSilverRupees}
                            includeBlankSilverRupeeSquare={true}
                            key={`${gridEntry.label}DungeonPanelEntryContainer`}
                        />
                })}
            </div>
            <div className={hideTCGKeys ? 'ootDungeonItemsLastRow' : 'ootDungeonTCGItemsLastRow'}>
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
                            validSilverRupees={validSilverRupees}
                            includeBlankSilverRupeeSquare={false}
                            key={`${gridEntry.label}DungeonPanelEntryContainer`}
                        />
                })}
            </div>
            <span className="areaRefreshCounter">
                {refreshCounter}
            </span>
        </div>
    )
}