import OotSettingIcon from "./OotSettingIcon";
import { OotSettingAssetMapFactory } from "./OotSettingAssetMap";
import { IconDict } from "./OotIcon";

import { GraphSettingsOptions, GraphSettingsConfiguration } from '@mracsys/randomizer-graph-tool';

interface SettingGridProps {
    cycleSetting: ({graphSetting, reverseDirection}: {graphSetting?: string, reverseDirection?: boolean}) => void,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
    graphSettings: GraphSettingsConfiguration,
    graphSettingsOptions: GraphSettingsOptions,
}

export const SettingGrid = ({
    cycleSetting,
    handleMultiselectMenuOpen,
    graphSettings,
    graphSettingsOptions,
}: SettingGridProps) => {
    let nullSetting = () => {return};
    let settingAssetMap: IconDict
    if (!!graphSettings && !!graphSettingsOptions) {
        settingAssetMap = OotSettingAssetMapFactory(graphSettings, graphSettingsOptions);
    } else {
        return null;
    }

    return (
        <div className="locationItemMenu">
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="count" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="player_num" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="logic_rules" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="triforce_hunt" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="lacs_condition" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="bridge" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_ganon_bosskey" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="trials" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_hideoutkeys" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_tcgkeys" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="key_rings_choice" />
            </div>
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_silver_rupees" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="silver_rupee_pouches_choice" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_mapcompass" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="open_forest" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="open_kakariko" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_smallkeys" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_bosskeys" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="open_door_of_time" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="zora_fountain" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="gerudo_fortress" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="dungeon_shortcuts_choice" />
            </div>
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="starting_age" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_interior_entrances" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_hideout_entrances" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_grotto_entrances" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_dungeon_entrances" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_bosses" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_overworld_entrances" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_gerudo_valley_river_exit" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="owl_drops" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="warp_songs" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={nullSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="spawn_positions" />
            </div>
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={nullSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="mix_entrance_pools" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="decouple_entrances" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="free_bombchu_drops" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_song_items" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shopsanity" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="tokensanity" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_scrubs" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={nullSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_child_trade" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_freestanding_items" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_pots" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_crates" />
            </div>
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_cows" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_beehives" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_kokiri_sword" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_ocarinas" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_gerudo_card" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_beans" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_expensive_merchants" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_frog_song_rupees" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_individual_ocarina_notes" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="shuffle_loach_reward" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="logic_no_night_tokens_without_suns_song" />
            </div>
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="no_epona_race" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="complete_mask_quest" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="free_scarecrow" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="plant_beans" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="chicken_count" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="big_poe_count" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="ocarina_songs" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="damage_multiplier" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="deadly_bonks" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="starting_tod" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="blue_fire_arrows" />
            </div>
            <div className="itemMenuRow">
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="fix_broken_drops" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="adult_trade_shuffle" />
                <OotSettingIcon className="locationMenuIcon" graphSettingsOptions={graphSettingsOptions} settingAssetMap={settingAssetMap} onClick={cycleSetting} handleMultiselectMenuOpen={handleMultiselectMenuOpen} itemName="mq_dungeons_specific" />
            </div>
        </div>
    );
}