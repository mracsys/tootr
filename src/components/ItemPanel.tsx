import { OotItemPanel } from "./OotItemPanel";
import { GraphEntrance, GraphLocation, GraphSettingsConfiguration } from '@mracsys/randomizer-graph-tool';

import '@/styles/ItemPanel.css';

interface ItemPanelProps {
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
    graphRewardHints: {[item_name: string]: {
        hint: string,
        hinted: boolean,
    }},
    graphLocations: GraphLocation[],
    graphEntrances: GraphEntrance[],
    visitedSimRegions: Set<string>,
    isNotMobile: boolean,
}

export const ItemPanel = ({
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
    visitedSimRegions,
    isNotMobile,
}: ItemPanelProps) => {
    return (
        <div className="itemsHeldContainer">
            <OotItemPanel
                addStartingItem={addStartingItem}
                addStartingItems={addStartingItems}
                removeStartingItem={removeStartingItem}
                removeStartingItems={removeStartingItems}
                replaceStartingItem={replaceStartingItem}
                cycleGraphMultiselectOption={cycleGraphMultiselectOption}
                cycleGraphRewardHint={cycleGraphRewardHint}
                handleCheck={handleCheck}
                handleUnCheck={handleUnCheck}
                graphSettings={graphSettings}
                graphCollectedItems={graphCollectedItems}
                graphPlayerInventory={graphPlayerInventory}
                graphRewardHints={graphRewardHints}
                graphLocations={graphLocations}
                graphEntrances={graphEntrances}
                visitedSimRegions={visitedSimRegions}
                isNotMobile={isNotMobile}
            />
        </div>
    )
}