
import { IconDict } from "./OotIcon";
import { SvgIconComponent } from "@mui/icons-material";
/*import PublicIcon from '@mui/icons-material/Public';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import VisibilityIcon from '@mui/icons-material/Visibility';*/
import LoopIcon from '@mui/icons-material/Loop';
import ClearIcon from '@mui/icons-material/Clear';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import HomeIcon from '@mui/icons-material/Home';
import BlenderIcon from '@mui/icons-material/Blender';
import MobiledataOffIcon from '@mui/icons-material/MobiledataOff';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { merge } from "lodash";

import { GraphSettingsOptions, GraphSettingsConfiguration, GraphSetting, GameVersion } from '@mracsys/randomizer-graph-tool';
import MusicNote from "./MusicNote";

const settingValueDisplay = (graphSettings: GraphSettingsConfiguration, setting: GraphSetting): string => {
    if (!!setting.choices && !!graphSettings[setting.name]) {
        return setting.choices[graphSettings[setting.name] as string];
    }
    if (typeof graphSettings[setting.name] === 'boolean') {
        return graphSettings[setting.name] ? 'On' : 'Off';
    }
    return  '';
};

export const OotSettingAssetMapFactory = (graphSettings: GraphSettingsConfiguration, graphSettingsOptions: GraphSettingsOptions, graphVersion: GameVersion): IconDict => {
    let smallFontSize = { left: '-12px' }; // shrink font size for numbers > 99 in setting subscripts
    // Fenhl changed the types of some settings
    let isFenhlBranch = graphVersion.branch === 'Fenhl';
    let isRealRobBranch = graphVersion.branch === 'Rob';
    let baseSettingMap: IconDict = {
        /*'count': {
            img: PublicIcon,
            rSub: graphSettings['count'],
            tooltip: graphSettingsOptions['count'].display_name,
        },*/
        /*'player_num': {
            img: SportsEsportsIcon,
            rSub: graphSettings['player_num'],
            tooltip: graphSettingsOptions['player_num'].display_name,
        },*/
        'logic_rules': {
            img: {
                'glitchless': '/images/OoT_Hylian_Shield_Icon.png',
                'glitched': '/images/distorted_shield.png',
                'advanced': '/images/distorted_shield.png',
                'none': '/images/shield_x.png',
            }[graphSettings['logic_rules'] as string] as string,
            tooltip: graphSettingsOptions['logic_rules'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['logic_rules']),
        },
        'triforce_hunt': {
            img: '/images/OoT_Triforce.png',
            rSub: graphSettings['triforce_goal_per_world'],
            rSubSource: 'triforce_goal_per_world',
            fade: !graphSettings['triforce_hunt'],
            tooltip: graphSettingsOptions['triforce_hunt'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['triforce_hunt']),
        },
        'lacs_condition': {
            img: '/images/OoT_Light_Arrow_Icon.png',
            rImg: {
                'medallions': '/images/OoT_Fire_Medallion_Icon.png',
                'stones': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
                'dungeons': '/images/OoT_Medallion_Stone_Split_Icon.png',
                'tokens': '/images/OoT_Token_Icon.png',
                'hearts': '/images/OoT_Heart_Container_Icon.png',
            }[graphSettings['lacs_condition'] as string] as string,
            lSub: {
                'medallions': graphSettings['lacs_medallions'],
                'stones': graphSettings['lacs_stones'],
                'dungeons': graphSettings['lacs_rewards'],
                'tokens': graphSettings['lacs_tokens'],
                'hearts': graphSettings['lacs_hearts'],
            }[graphSettings['lacs_condition'] as string] as string,
            lSubSource: {
                'medallions': 'lacs_medallions',
                'stones': 'lacs_stones',
                'dungeons': 'lacs_rewards',
                'tokens': 'lacs_tokens',
                'hearts': 'lacs_hearts',
            }[graphSettings['lacs_condition'] as string] as string,
            fade: graphSettings['lacs_condition'] === 'vanilla',
            lStyleOverride: {
                'tokens': typeof graphSettings['lacs_tokens'] === 'number' && graphSettings['lacs_tokens'] > 99 ? smallFontSize : undefined,
            }[graphSettings['lacs_condition'] as string],
            tooltip: graphSettingsOptions['lacs_condition'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['lacs_condition']),
        },
        'bridge': {
            img: '/images/bridge.png',
            rImg: {
                'medallions': '/images/OoT_Fire_Medallion_Icon.png',
                'stones': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
                'dungeons': '/images/OoT_Medallion_Stone_Split_Icon.png',
                'tokens': '/images/OoT_Token_Icon.png',
                'hearts': '/images/OoT_Heart_Container_Icon.png',
                'random': '/images/question_mark_text.png',
            }[graphSettings['bridge'] as string] as string,
            lSub: {
                'medallions': graphSettings['bridge_medallions'],
                'stones': graphSettings['bridge_stones'],
                'dungeons': graphSettings['bridge_rewards'],
                'tokens': graphSettings['bridge_tokens'],
                'hearts': graphSettings['bridge_hearts'],
                'random': '',
            }[graphSettings['bridge'] as string] as string,
            lSubSource: {
                'medallions': 'bridge_medallions',
                'stones': 'bridge_stones',
                'dungeons': 'bridge_rewards',
                'tokens': 'bridge_tokens',
                'hearts': 'bridge_hearts',
            }[graphSettings['bridge'] as string] as string,
            fade: graphSettings['bridge'] === 'vanilla',
            lStyleOverride: {
                'tokens': typeof graphSettings['bridge_tokens'] === 'number' && graphSettings['bridge_tokens'] > 99 ? smallFontSize : undefined,
            }[graphSettings['bridge'] as string],
            tooltip: graphSettingsOptions['bridge'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['bridge']),
        },
        'shuffle_ganon_bosskey': {
            img: '/images/ganon.png',
            rImg: {
                'medallions': '/images/OoT_Fire_Medallion_Icon.png',
                'stones': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
                'dungeons': '/images/OoT_Medallion_Stone_Split_Icon.png',
                'tokens': '/images/OoT_Token_Icon.png',
                'hearts': '/images/OoT_Heart_Container_Icon.png',
                'remove': ClearIcon,
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'keysanity': '/images/globe_dungeon_split.png',
                'on_lacs': '/images/OoT_Light_Arrow_Icon.png',
            }[graphSettings['shuffle_ganon_bosskey'] as string] as string,
            lSub: {
                'medallions': graphSettings['ganon_bosskey_medallions'],
                'stones': graphSettings['ganon_bosskey_stones'],
                'dungeons': graphSettings['ganon_bosskey_rewards'],
                'tokens': graphSettings['ganon_bosskey_tokens'],
                'hearts': graphSettings['ganon_bosskey_hearts'],
            }[graphSettings['shuffle_ganon_bosskey'] as string] as string,
            lSubSource: {
                'medallions': 'ganon_bosskey_medallions',
                'stones': 'ganon_bosskey_stones',
                'dungeons': 'ganon_bosskey_rewards',
                'tokens': 'ganon_bosskey_tokens',
                'hearts': 'ganon_bosskey_hearts',
            }[graphSettings['shuffle_ganon_bosskey'] as string] as string,
            fade: graphSettings['shuffle_ganon_bosskey'] === 'vanilla',
            lStyleOverride: {
                'tokens': typeof graphSettings['ganon_bosskey_tokens'] === 'number' && graphSettings['ganon_bosskey_tokens'] > 99 ? smallFontSize : undefined,
            }[graphSettings['shuffle_ganon_bosskey'] as string],
            tooltip: graphSettingsOptions['shuffle_ganon_bosskey'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_ganon_bosskey']),
        },
        'graphplugin_trials_specific': {
            img: '/images/trial_seed.png',
            rSub: Array.isArray(graphSettings['graphplugin_trials_specific']) ? graphSettings['graphplugin_trials_specific'].length.toString() : '0',
            rSubSource: 'graphplugin_trials_specific',
            tooltip: graphSettingsOptions['graphplugin_trials_specific'].display_name,
            tooltip2: Array.isArray(graphSettings['graphplugin_trials_specific']) ? graphSettings['graphplugin_trials_specific'].length > 0 ? graphSettings['graphplugin_trials_specific'].join('\n') : 'None' : '',
        },
        'shuffle_hideoutkeys': {
            img: '/images/jail_door.png',
            rImg: {
                'fortress': '/images/OoT_Gerudo_Token_Icon.png',
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'keysanity': '/images/globe_dungeon_split.png',
            }[graphSettings['shuffle_hideoutkeys'] as string] as string,
            fade: graphSettings['shuffle_hideoutkeys'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_hideoutkeys'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_hideoutkeys']),
        },
        'shuffle_tcgkeys': {
            img: '/images/treasure_chest.png',
            rImg: {
                'remove': ClearIcon,
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'keysanity': '/images/globe_dungeon_split.png',
            }[graphSettings['shuffle_tcgkeys'] as string] as string,
            fade: graphSettings['shuffle_tcgkeys'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_tcgkeys'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_tcgkeys']),
        },
        'key_rings_choice': {
            img: '/images/keyring.png',
            rSub: {
                'choice': Array.isArray(graphSettings['key_rings']) ? graphSettings['key_rings'].length.toString() : '0',
            }[graphSettings['key_rings_choice'] as string] as string,
            lImg: graphSettings['key_rings_choice'] === 'off' ? undefined : graphSettings['keyring_give_bk'] ? '/images/OoT_Boss_Key_Icon.png' : '/images/OoT_Small_Key_Icon.png',
            lSubSource: graphSettings['key_rings_choice'] === 'off' ? undefined : 'keyring_give_bk',
            rSubSource: graphSettings['key_rings_choice'] === 'choice' ? 'key_rings' : undefined,
            fade: graphSettings['key_rings_choice'] === 'off',
            tooltip: graphSettingsOptions['key_rings_choice'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['key_rings_choice']),
        },
        'shuffle_silver_rupees': {
            img: '/images/silver_rupee_vertical.png',
            rImg: {
                'remove': ClearIcon,
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'anywhere': '/images/globe_dungeon_split.png',
            }[graphSettings['shuffle_silver_rupees'] as string] as string,
            fade: graphSettings['shuffle_silver_rupees'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_silver_rupees'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_silver_rupees']),
        },
        'silver_rupee_pouches_choice': {
            img: '/images/OoT_Adults_Wallet_Icon.png',
            rSub: {
                'choice': Array.isArray(graphSettings['silver_rupee_pouches']) ? graphSettings['silver_rupee_pouches'].length.toString() : '0',
            }[graphSettings['silver_rupee_pouches_choice'] as string] as string,
            rSubSource: graphSettings['silver_rupee_pouches_choice'] === 'choice' ? 'silver_rupee_pouches' : undefined,
            fade: graphSettings['silver_rupee_pouches_choice'] === 'off',
            tooltip: graphSettingsOptions['silver_rupee_pouches_choice'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['silver_rupee_pouches_choice']),
        },
        'shuffle_mapcompass': {
            img: '/images/map_compass.png',
            rImg: {
                'remove': ClearIcon,
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'keysanity': '/images/globe_dungeon_split.png',
            }[graphSettings['shuffle_mapcompass'] as string] as string,
            rSub: {
                'startwith': '🎁',
            }[graphSettings['shuffle_mapcompass'] as string] as string,
            fade: graphSettings['shuffle_mapcompass'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_mapcompass'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_mapcompass']),
        },
        'shuffle_smallkeys': {
            img: '/images/OoT_Small_Key_Icon.png',
            rImg: {
                'remove': ClearIcon,
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'keysanity': '/images/globe_dungeon_split.png',
            }[graphSettings['shuffle_smallkeys'] as string] as string,
            fade: graphSettings['shuffle_smallkeys'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_smallkeys'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_smallkeys']),
        },
        'shuffle_bosskeys': {
            img: '/images/OoT_Boss_Key_Icon.png',
            rImg: {
                'remove': ClearIcon,
                'regional': '/images/medallion_wheel.png',
                'overworld': '/images/outline_public_white_36dp.png',
                'any_dungeon': '/images/dungeon_entrance.png',
                'keysanity': '/images/globe_dungeon_split.png',
            }[graphSettings['shuffle_bosskeys'] as string] as string,
            fade: graphSettings['shuffle_bosskeys'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_bosskeys'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_bosskeys']),
        },
        'open_kakariko': {
            img: {
                'open': '/images/open_kak_gate.png',
                'zelda': '/images/closed_kak_gate.png',
                'closed': '/images/closed_kak_gate.png',
            }[graphSettings['open_kakariko'] as string] as string,
            rImg: {
                'zelda': '/images/zelda.png',
                'closed': '/images/hyrule_guard.png',
            }[graphSettings['open_kakariko'] as string] as string,
            tooltip: graphSettingsOptions['open_kakariko'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['open_kakariko']),
        },
        'zora_fountain': {
            img: {
                'open': '/images/king_zora_moved.png',
                'adult': '/images/king_zora.png',
                'closed': '/images/king_zora.png',
            }[graphSettings['zora_fountain'] as string] as string,
            rSub: {
                'adult': 'A',
            }[graphSettings['zora_fountain'] as string] as string,
            tooltip: graphSettingsOptions['zora_fountain'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['zora_fountain']),
        },
        'gerudo_fortress': {
            img: '/images/gerudo_guard.png',
            rSub: {
                'normal': '4',
                'fast': '1',
                'open': '0',
            }[graphSettings['gerudo_fortress'] as string] as string,
            tooltip: graphSettingsOptions['gerudo_fortress'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['gerudo_fortress']),
        },
        'dungeon_shortcuts_choice': {
            img: ShortcutIcon,
            rSub: {
                'choice': Array.isArray(graphSettings['dungeon_shortcuts']) ? graphSettings['dungeon_shortcuts'].length.toString() : '0',
            }[graphSettings['dungeon_shortcuts_choice'] as string] as string,
            rSubSource: 'dungeon_shortcuts',
            fade: graphSettings['dungeon_shortcuts_choice'] === 'off',
            tooltip: graphSettingsOptions['dungeon_shortcuts_choice'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['dungeon_shortcuts_choice']),
        },
        'starting_age': {
            img: {
                'child': '/images/master_sword_in_pedestal.png',
                'adult': '/images/pedestal.png',
                'random': '/images/pedestal_random.png',
            }[graphSettings['starting_age'] as string] as string,
            tooltip: graphSettingsOptions['starting_age'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['starting_age']),
        },
        'shuffle_interior_entrances': {
            img: '/images/door.png',
            rImg: {
                'all': '/images/sot_block.png',
            }[graphSettings['shuffle_interior_entrances'] as string] as string,
            fade: graphSettings['shuffle_interior_entrances'] === 'off',
            tooltip: graphSettingsOptions['shuffle_interior_entrances'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_interior_entrances']),
        },
        'shuffle_grotto_entrances': {
            img: '/images/grotto.png',
            fade: !graphSettings['shuffle_grotto_entrances'],
            tooltip: graphSettingsOptions['shuffle_grotto_entrances'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_grotto_entrances']),
        },
        'shuffle_dungeon_entrances': {
            img: '/images/dungeon_entrance.png',
            rImg: {
                'all': '/images/ganon.png',
            }[graphSettings['shuffle_dungeon_entrances'] as string] as string,
            fade: graphSettings['shuffle_dungeon_entrances'] === 'off',
            tooltip: graphSettingsOptions['shuffle_dungeon_entrances'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_dungeon_entrances']),
        },
        'shuffle_bosses': {
            img: '/images/gohma_eye.png',
            fade: graphSettings['shuffle_bosses'] === 'off',
            tooltip: graphSettingsOptions['shuffle_bosses'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_bosses']),
        },
        'shuffle_overworld_entrances': {
            img: '/images/arrow_sign.png',
            fade: !graphSettings['shuffle_overworld_entrances'],
            tooltip: graphSettingsOptions['shuffle_overworld_entrances'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_overworld_entrances']),
        },
        'mix_entrance_pools': {
            img: BlenderIcon,
            rSub: !(Object.keys(graphSettings).includes('mix_entrance_pools')) ? undefined : Array.isArray(graphSettings['mix_entrance_pools']) ? graphSettings['mix_entrance_pools'].length.toString() : '0',
            rSubSource: 'mix_entrance_pools',
            tooltip: !(Object.keys(graphSettings).includes('mix_entrance_pools')) ? undefined : graphSettingsOptions['mix_entrance_pools'].display_name,
            tooltip2: !(Object.keys(graphSettings).includes('mix_entrance_pools')) ? undefined : Array.isArray(graphSettings['mix_entrance_pools']) ? graphSettings['mix_entrance_pools'].length > 0 ? graphSettings['mix_entrance_pools'].join('\n') : 'None' : '',
        },
        'decouple_entrances': {
            img: MobiledataOffIcon,
            fade: !(Object.keys(graphSettings).includes('decouple_entrances')) ? undefined : !graphSettings['decouple_entrances'],
            tooltip: !(Object.keys(graphSettings).includes('decouple_entrances')) ? undefined : graphSettingsOptions['decouple_entrances'].display_name,
            tooltip2: !(Object.keys(graphSettings).includes('decouple_entrances')) ? undefined : settingValueDisplay(graphSettings, graphSettingsOptions['decouple_entrances']),
        },
        'free_bombchu_drops': {
            img: '/images/bombchu_bag.png',
            fade: !graphSettings['free_bombchu_drops'],
            tooltip: graphSettingsOptions['free_bombchu_drops'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['free_bombchu_drops']),
        },
        'shuffle_song_items': {
            img: MusicNote,
            imgClass: 'greenNote',
            rImg: {
                'song': '/images/Red_Note.png',
                'dungeon': '/images/dungeon_entrance.png',
            }[graphSettings['shuffle_song_items'] as string] as string,
            fade: graphSettings['shuffle_song_items'] === 'vanilla',
            tooltip: graphSettingsOptions['shuffle_song_items'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_song_items']),
        },
        'tokensanity': {
            img: '/images/OoT_Token_Icon.png',
            rImg: {
                'dungeons': '/images/dungeon_entrance.png',
                'overworld': '/images/outline_public_white_36dp.png',
            }[graphSettings['tokensanity'] as string] as string,
            fade: graphSettings['tokensanity'] === 'off',
            tooltip: graphSettingsOptions['tokensanity'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['tokensanity']),
        },
        'shuffle_scrubs': {
            img: '/images/business_scrub.png',
            rImg: {
                'low': '/images/Yellow_Rupee.png',
                'regular': '/images/Red_Rupee.png',
                'random': '/images/Blue_Rupee.png',
            }[graphSettings['shuffle_scrubs'] as string] as string,
            fade: graphSettings['shuffle_scrubs'] === 'off',
            tooltip: graphSettingsOptions['shuffle_scrubs'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_scrubs']),
        },
        'shuffle_child_trade': {
            img: '/images/OoT_Keaton_Mask_Icon.png',
            rSub: Array.isArray(graphSettings['shuffle_child_trade']) ? graphSettings['shuffle_child_trade'].length.toString() : '0',
            rSubSource: 'shuffle_child_trade',
            tooltip: graphSettingsOptions['shuffle_child_trade'].display_name,
            tooltip2: Array.isArray(graphSettings['shuffle_child_trade']) ? graphSettings['shuffle_child_trade'].length > 0 ? graphSettings['shuffle_child_trade'].join('\n') : 'None' : '',
        },
        'shuffle_freestanding_items': {
            img: '/images/green_rupee_vertical.png',
            rImg: {
                'dungeons': '/images/dungeon_entrance.png',
                'overworld': '/images/outline_public_white_36dp.png',
            }[graphSettings['shuffle_freestanding_items'] as string] as string,
            fade: graphSettings['shuffle_freestanding_items'] === 'off',
            tooltip: graphSettingsOptions['shuffle_freestanding_items'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_freestanding_items']),
        },
        'shuffle_cows': {
            img: '/images/cow.png',
            fade: !graphSettings['shuffle_cows'],
            tooltip: graphSettingsOptions['shuffle_cows'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_cows']),
        },
        'shuffle_beehives': {
            img: '/images/beehive.png',
            fade: !graphSettings['shuffle_beehives'],
            tooltip: graphSettingsOptions['shuffle_beehives'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_beehives']),
        },
        'shuffle_kokiri_sword': {
            img: '/images/OoT_Kokiri_Sword_Icon.png',
            fade: !graphSettings['shuffle_kokiri_sword'],
            tooltip: graphSettingsOptions['shuffle_kokiri_sword'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_kokiri_sword']),
        },
        'shuffle_ocarinas': {
            img: '/images/OoT_Fairy_Ocarina_Icon.png',
            fade: !graphSettings['shuffle_ocarinas'],
            tooltip: graphSettingsOptions['shuffle_ocarinas'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_ocarinas']),
        },
        'shuffle_gerudo_card': {
            img: '/images/OoT_Gerudo_Token_Icon.png',
            fade: !graphSettings['shuffle_gerudo_card'],
            tooltip: graphSettingsOptions['shuffle_gerudo_card'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_gerudo_card']),
        },
        'shuffle_beans': {
            img: '/images/OoT_Magic_Bean_Icon.png',
            fade: !graphSettings['shuffle_beans'],
            tooltip: graphSettingsOptions['shuffle_beans'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_beans']),
        },
        'shuffle_expensive_merchants': {
            img: '/images/OoT_Giants_Knife_Icon.png',
            fade: !graphSettings['shuffle_expensive_merchants'],
            tooltip: graphSettingsOptions['shuffle_expensive_merchants'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_expensive_merchants']),
        },
        'shuffle_frog_song_rupees': {
            img: '/images/OoT_Eyeball_Frog_Icon.png',
            fade: !graphSettings['shuffle_frog_song_rupees'],
            tooltip: graphSettingsOptions['shuffle_frog_song_rupees'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_frog_song_rupees']),
        },
        'shuffle_individual_ocarina_notes': {
            img: '/images/ocarina_c_up.yellow.png',
            fade: !graphSettings['shuffle_individual_ocarina_notes'],
            tooltip: graphSettingsOptions['shuffle_individual_ocarina_notes'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_individual_ocarina_notes']),
        },
        'shuffle_loach_reward': {
            img: '/images/fish.png',
            fade: graphSettings['shuffle_loach_reward'] === 'off',
            tooltip: graphSettingsOptions['shuffle_loach_reward'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_loach_reward']),
        },
        'logic_no_night_tokens_without_suns_song': {
            img: '/images/sun_song_tokens.png',
            fade: !graphSettings['logic_no_night_tokens_without_suns_song'],
            tooltip: graphSettingsOptions['logic_no_night_tokens_without_suns_song'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['logic_no_night_tokens_without_suns_song']),
        },
        'no_epona_race': {
            img: '/images/epona.png',
            fade: !graphSettings['no_epona_race'],
            tooltip: graphSettingsOptions['no_epona_race'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['no_epona_race']),
        },
        'complete_mask_quest': {
            img: '/images/OoT_Mask_of_Truth_Icon.png',
            fade: !graphSettings['complete_mask_quest'],
            tooltip: graphSettingsOptions['complete_mask_quest'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['complete_mask_quest']),
        },
        'plant_beans': {
            img: '/images/soil.png',
            fade: !graphSettings['plant_beans'],
            tooltip: graphSettingsOptions['plant_beans'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['plant_beans']),
        },
        'chicken_count': {
            img: '/images/OoT_Cucco_Icon.png',
            rSub: graphSettings['chicken_count']?.toString(),
            tooltip: graphSettingsOptions['chicken_count'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['chicken_count']),
        },
        'big_poe_count': {
            img: '/images/OoT_Big_Poe_Soul_Icon.png',
            rSub: graphSettings['big_poe_count']?.toString(),
            tooltip: graphSettingsOptions['big_poe_count'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['big_poe_count']),
        },
        'damage_multiplier': {
            img: '/images/double_defense.png',
            rSub: {
                'half': '1/2',
                'double': '2x',
                'quadruple': '4x',
                'ohko': 'KO',
            }[graphSettings['damage_multiplier'] as string] as string,
            fade: graphSettings['damage_multiplier'] === 'normal',
            tooltip: graphSettingsOptions['damage_multiplier'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['damage_multiplier']),
        },
        'deadly_bonks': {
            img: '/images/bonko.png',
            rSub: {
                'half': '1/2',
                'normal': '1x',
                'double': '2x',
                'quadruple': '4x',
                'ohko': 'KO',
            }[graphSettings['deadly_bonks'] as string] as string,
            fade: graphSettings['deadly_bonks'] === 'none',
            tooltip: graphSettingsOptions['deadly_bonks'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['deadly_bonks']),
        },
        'starting_tod': {
            img: {
                'default': Brightness7Icon,
                'random': HistoryToggleOffIcon,
                'sunrise': Brightness7Icon,
                'morning': Brightness7Icon,
                'noon': Brightness7Icon,
                'afternoon': Brightness7Icon,
                'sunset': Brightness7Icon,
                'evening': Brightness3Icon,
                'midnight': Brightness3Icon,
                'witching-hour': Brightness3Icon,
            }[graphSettings['starting_tod'] as string] as SvgIconComponent,
            rSub: graphSettings['starting_tod'] === 'random' ? '?' : undefined,
            tooltip: graphSettingsOptions['starting_tod'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['starting_tod']),
        },
        'blue_fire_arrows': {
            img: '/images/OoT_Ice_Arrow_Icon.png',
            fade: !graphSettings['blue_fire_arrows'],
            tooltip: graphSettingsOptions['blue_fire_arrows'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['blue_fire_arrows']),
        },
        'adult_trade_shuffle': {
            img: {
                'On': '/images/OoT_Cojiro_Icon.png',
                'Off': '/images/OoT_Claim_Check_Icon.png',
            }[graphSettings['adult_trade_shuffle'] ? 'On' : 'Off'] as string,
            rSub: Array.isArray(graphSettings['adult_trade_start']) ? graphSettings['adult_trade_start'].length.toString() : '0',
            rSubSource: 'adult_trade_start',
            tooltip: graphSettingsOptions['adult_trade_shuffle'].display_name,
            tooltip2: graphSettings['adult_trade_shuffle'] ? 'On' : 'Off',
        },
        'mq_dungeons_specific': {
            img: '/images/z_blue.png',
            rSub: Array.isArray(graphSettings['mq_dungeons_specific']) ? graphSettings['mq_dungeons_specific'].length.toString() : '0',
            rSubSource: 'mq_dungeons_specific',
            tooltip: graphSettingsOptions['mq_dungeons_specific'].display_name,
            tooltip2: Array.isArray(graphSettings['mq_dungeons_specific']) ? graphSettings['mq_dungeons_specific'].length > 0 ? graphSettings['mq_dungeons_specific'].join('\n') : 'None' : '',
        },
        'allowed_tricks': {
            img: '/images/jackolantern.png',
            rSub: Array.isArray(graphSettings['allowed_tricks']) ? graphSettings['allowed_tricks'].length.toString() : '0',
            tooltip: graphSettingsOptions['allowed_tricks'].display_name,
            tooltip2: Array.isArray(graphSettings['allowed_tricks']) ? graphSettings['allowed_tricks'].length.toString() + ' tricks' : '0 tricks',
        },
        'disabled_locations': {
            img: '/images/disabled_locations_mask.png',
            rSub: Array.isArray(graphSettings['disabled_locations']) ? graphSettings['disabled_locations'].length.toString() : '0',
            tooltip: graphSettingsOptions['disabled_locations'].display_name,
            tooltip2: Array.isArray(graphSettings['disabled_locations']) ? graphSettings['disabled_locations'].length.toString() + ' locations' : '0 locations',
        },
        'shuffle_wonderitems': {
            img: '/images/navi.png',
            fade: !graphSettings['shuffle_wonderitems'],
            tooltip: graphSettingsOptions['shuffle_wonderitems'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_wonderitems']),
        },
    }

    let mainSettingMap = {};
    let stableSettingMap = {};
    let fenhlSettingMap = {};
    let realRobSettingMap = {};
    let potSanity2 = {};
    let potSanity3 = {};
    let rewardShuffle = {};
    let towerShuffle = {};
    let fortressHP = {};
    let tcgLens = {};
    let skulls100 = {};
    let goldBoulders = {};
    let doorOfTime = {};
    let ocarinaSongs = {};
    let scarecrowSong = {};

    if (graphVersion.gt('8.3.0')) {
    scarecrowSong = {
        'scarecrow_behavior': {
            img: '/images/scarecrow.png',
            fade: graphSettings['scarecrow_behavior'] !== 'free',
            tooltip: graphSettingsOptions['scarecrow_behavior'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['scarecrow_behavior']),
        },
    };
    } else {
    scarecrowSong = {
        'free_scarecrow': {
            img: '/images/scarecrow.png',
            fade: !graphSettings['free_scarecrow'],
            tooltip: graphSettingsOptions['free_scarecrow'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['free_scarecrow']),
        },
    };
    }

    if (!isFenhlBranch) {
    mainSettingMap = {
        'open_forest': {
            img: {
                'open': '/images/lw_exit.png',
                'closed_deku': '/images/mido.png',
                'closed': '/images/kokiri_kid.png',
            }[graphSettings['open_forest'] as string] as string,
            tooltip: graphSettingsOptions['open_forest'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['open_forest']),
        },
        'shopsanity': {
            img: '/images/shopkeeper.png',
            rSub: {
                '0': '0',
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                'random': '?',
            }[graphSettings['shopsanity'] as string] as string,
            fade: graphSettings['shopsanity'] === 'off',
            tooltip: graphSettingsOptions['shopsanity'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shopsanity']),
        },
        'shuffle_hideout_entrances': {
            img: '/images/gerudo_symbol.png',
            fade: !graphSettings['shuffle_hideout_entrances'],
            tooltip: graphSettingsOptions['shuffle_hideout_entrances'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_hideout_entrances']),
        },
        'spawn_positions': {
            img: HomeIcon,
            rSub: {
                '': 'Off',
                'child': 'C',
                'adult': 'A',
                'child,adult': 'All',
                'adult,child': 'All',
            }[(Array.isArray(graphSettings['spawn_positions']) ? graphSettings['spawn_positions'].toString() : '') as string] as string,
            rSubSource: 'spawn_positions',
            tooltip: graphSettingsOptions['spawn_positions'].display_name,
            tooltip2: Array.isArray(graphSettings['spawn_positions']) ? graphSettings['spawn_positions'].length > 0 ? graphSettings['spawn_positions'].join('\n') : 'None' : '',
        },
        'shuffle_gerudo_valley_river_exit': {
            img: '/images/gerudo_valley_waterfall.png',
            fade: !graphSettings['shuffle_gerudo_valley_river_exit'],
            tooltip: graphSettingsOptions['shuffle_gerudo_valley_river_exit'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_gerudo_valley_river_exit']),
        },
        'owl_drops': {
            img: '/images/kaepora.png',
            fade: !graphSettings['owl_drops'],
            tooltip: graphSettingsOptions['owl_drops'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['owl_drops']),
        },
        'warp_songs': {
            img: '/images/warp_pad.png',
            fade: !graphSettings['warp_songs'],
            tooltip: graphSettingsOptions['warp_songs'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['warp_songs']),
        },
    };
    }

    if (!isFenhlBranch && graphVersion.lte('8.3.0')) {
    ocarinaSongs = {
        'ocarina_songs': {
            img: '/images/treble.png',
            rImg: {
                'frog': '/images/OoT_Eyeball_Frog_Icon.png',
                'warp': '/images/Grey_Note.png',
            }[graphSettings['ocarina_songs'] as string] as string,
            fade: graphSettings['ocarina_songs'] === 'off',
            tooltip: graphSettingsOptions['ocarina_songs'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['ocarina_songs']),
        }
    };
    } else {
    ocarinaSongs = {
        'ocarina_songs': {
            img: '/images/treble.png',
            rSub: Array.isArray(graphSettings['ocarina_songs']) ? graphSettings['ocarina_songs'].length.toString() : '0',
            rSubSource: 'ocarina_songs',
            fade: Array.isArray(graphSettings['ocarina_songs']) ? graphSettings['ocarina_songs'].length === 0 : true,
            tooltip: graphSettingsOptions['ocarina_songs'].display_name,
            tooltip2: Array.isArray(graphSettings['ocarina_songs']) ? graphSettings['ocarina_songs'].length > 0 ? graphSettings['ocarina_songs'].join('\n') : 'None' : '',
        },
    };
    }

    if (!isRealRobBranch) {
    stableSettingMap = {
        'fix_broken_drops': {
            img: '/images/OoT_Deku_Shield_Icon.png',
            fade: !graphSettings['fix_broken_drops'],
            tooltip: graphSettingsOptions['fix_broken_drops'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['fix_broken_drops']),
        },
    };
    }

    if (!isRealRobBranch && graphVersion.lt('8.1.48')) {
        potSanity2 = {
            'shuffle_pots': {
                img: '/images/pot.png',
                rImg: {
                    'dungeons': '/images/dungeon_entrance.png',
                    'overworld': '/images/outline_public_white_36dp.png',
                }[graphSettings['shuffle_pots'] as string] as string,
                fade: graphSettings['shuffle_pots'] === 'off',
                tooltip: graphSettingsOptions['shuffle_pots'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_pots']),
            },
            'shuffle_crates': {
                img: '/images/crate.png',
                rImg: {
                    'dungeons': '/images/dungeon_entrance.png',
                    'overworld': '/images/outline_public_white_36dp.png',
                }[graphSettings['shuffle_crates'] as string] as string,
                fade: graphSettings['shuffle_crates'] === 'off',
                tooltip: graphSettingsOptions['shuffle_crates'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_crates']),
            },
        };
    } else {
        potSanity3 = {
            'shuffle_pots': {
                img: '/images/pot.png',
                lImg: {
                    'dungeons': '/images/dungeon_entrance.png',
                    'overworld': '/images/outline_public_white_36dp.png',
                }[graphSettings['shuffle_pots'] as string] as string,
                rSub: {
                    'true': 'All',
                    'false': 'Drop',
                }[graphSettings['shuffle_empty_pots']?.toString() as string],
                rSubSource: 'shuffle_empty_pots',
                fade: graphSettings['shuffle_pots'] === 'off',
                tooltip: graphSettingsOptions['shuffle_pots'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_pots']),
            },
            'shuffle_crates': {
                img: '/images/crate.png',
                lImg: {
                    'dungeons': '/images/dungeon_entrance.png',
                    'overworld': '/images/outline_public_white_36dp.png',
                }[graphSettings['shuffle_crates'] as string] as string,
                rSub: {
                    'true': 'All',
                    'false': 'Drop',
                }[graphSettings['shuffle_empty_crates']?.toString() as string],
                rSubSource: 'shuffle_empty_crates',
                fade: graphSettings['shuffle_crates'] === 'off',
                tooltip: graphSettingsOptions['shuffle_crates'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_crates']),
            },
        };
    }

    if (isFenhlBranch || graphVersion.gte('8.1.38')) {
        rewardShuffle = {
            'skip_reward_from_rauru': {
                img: '/images/rauru.png',
                fade: !graphSettings['skip_reward_from_rauru'],
                tooltip: graphSettingsOptions['skip_reward_from_rauru'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['skip_reward_from_rauru']),
            },
            'shuffle_dungeon_rewards': {
                img: '/images/rewards/forest_medallion.png',
                rImg: {
                    'reward': '/images/gohma_eye.png',
                    'regional': '/images/medallion_wheel.png',
                    'overworld': '/images/outline_public_white_36dp.png',
                    'any_dungeon': '/images/dungeon_entrance.png',
                    'anywhere': '/images/globe_dungeon_split.png',
                }[graphSettings['shuffle_dungeon_rewards'] as string] as string,
                fade: graphSettings['shuffle_dungeon_rewards'] === 'vanilla',
                tooltip: graphSettingsOptions['shuffle_dungeon_rewards'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_dungeon_rewards']),
            }
        };
    }

    if (graphVersion.gte('8.2.14')) {
        tcgLens = {
            'tcg_requires_lens': {
                img: '/images/OoT_Lens_of_Truth_Icon.png',
                fade: !graphSettings['tcg_requires_lens'],
                tooltip: graphSettingsOptions['tcg_requires_lens'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['tcg_requires_lens']),
            },
        };
    }

    if (isFenhlBranch || graphVersion.gte('8.2.37')) {
        towerShuffle = {
            'shuffle_ganon_tower': {
                img: '/images/ganon.png',
                fade: !graphSettings['shuffle_ganon_tower'],
                tooltip: graphSettingsOptions['shuffle_ganon_tower'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_ganon_tower']),
            },
        };
    }

    if (isFenhlBranch || graphVersion.gte('8.2.39')) {
        fortressHP = {
            'shuffle_gerudo_fortress_heart_piece': {
                img: '/images/OoT_Piece_of_Heart_Icon.png',
                fade: graphSettings['shuffle_gerudo_fortress_heart_piece'] !== 'shuffle',
                tooltip: graphSettingsOptions['shuffle_gerudo_fortress_heart_piece'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_gerudo_fortress_heart_piece']),
            },
        };
    }

    if (isFenhlBranch) {
        fenhlSettingMap = {
            'require_gohma': {
                img: '/images/gohma_eye.png',
                fade: !graphSettings['require_gohma'],
                tooltip: graphSettingsOptions['require_gohma'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['require_gohma']),
            },
            'open_forest': {
                img: '/images/kokiri_kid.png',
                fade: !graphSettings['open_forest'],
                tooltip: graphSettingsOptions['open_forest'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['open_forest']),
            },
            'open_deku': {
                img: '/images/mido.png',
                fade: !graphSettings['open_deku'],
                tooltip: graphSettingsOptions['open_deku'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['open_deku']),
            },
            'shopsanity': {
                img: '/images/shopkeeper.png',
                rSub: {
                    '0': '0',
                    '1': '1',
                    '2': '2',
                    '3': '3',
                    '4': '4',
                    'random': '?',
                }[graphSettings['shopsanity'] as string] as string,
                fade: graphSettings['shopsanity'] === 'off',
                tooltip: graphSettingsOptions['shopsanity'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shopsanity']),
            },
            'shuffle_hideout_entrances': {
                img: '/images/gerudo_symbol.png',
                fade: graphSettings['shuffle_hideout_entrances'] === 'off',
                tooltip: graphSettingsOptions['shuffle_hideout_entrances'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_hideout_entrances']),
            },
            'shuffle_child_spawn': {
                img: HomeIcon,
                rSub: 'C',
                fade: !graphSettings['shuffle_child_spawn'],
                tooltip: graphSettingsOptions['shuffle_child_spawn'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_child_spawn']),
            },
            'shuffle_adult_spawn': {
                img: HomeIcon,
                rSub: 'A',
                fade: !graphSettings['shuffle_adult_spawn'],
                tooltip: graphSettingsOptions['shuffle_adult_spawn'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_adult_spawn']),
            },
            'owl_drops': {
                img: '/images/kaepora.png',
                fade: graphSettings['owl_drops'] === 'off',
                tooltip: graphSettingsOptions['owl_drops'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['owl_drops']),
            },
            'warp_songs': {
                img: '/images/warp_pad.png',
                fade: graphSettings['warp_songs'] === 'off',
                tooltip: graphSettingsOptions['warp_songs'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['warp_songs']),
            },
            'shuffle_gerudo_valley_river_exit': {
                img: '/images/gerudo_valley_waterfall.png',
                fade: graphSettings['shuffle_gerudo_valley_river_exit'] === 'off',
                tooltip: graphSettingsOptions['shuffle_gerudo_valley_river_exit'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_gerudo_valley_river_exit']),
            },
            'blue_warps': {
                img: Brightness5Icon,
                imgClass: 'blueWarpIcon',
                fade: graphSettings['blue_warps'] === 'dungeon',
                tooltip: graphSettingsOptions['blue_warps'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['blue_warps']),
            },
            'dungeon_back_access': {
                img: '/images/ganon.png',
                fade: !graphSettings['dungeon_back_access'],
                tooltip: graphSettingsOptions['dungeon_back_access'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['dungeon_back_access']),
            },
            'logic_water_gold_scale_no_entry': {
                img: '/images/iron_gold.png',
                fade: !graphSettings['logic_water_gold_scale_no_entry'],
                tooltip: graphSettingsOptions['logic_water_gold_scale_no_entry'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['logic_water_gold_scale_no_entry']),
            },
            'shuffle_items': {
                img: LoopIcon,
                fade: !graphSettings['shuffle_items'],
                tooltip: graphSettingsOptions['shuffle_items'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_items']),
            },
            'shuffle_base_item_pool': {
                img: '/images/OoT_Heart_Container_Icon.png',
                fade: !graphSettings['shuffle_base_item_pool'],
                tooltip: graphSettingsOptions['shuffle_base_item_pool'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_base_item_pool']),
            },
        };
    }

    if ((graphVersion.gte('8.2.0') && isFenhlBranch) || graphVersion.gt('8.3.0')) {
        skulls100 = {
            'shuffle_100_skulltula_rupee': {
                img: '/images/OoT_Token_Icon.png',
                rSub: '100',
                fade: !graphSettings['shuffle_100_skulltula_rupee'],
                hideLabels: false,
                tooltip: graphSettingsOptions['shuffle_100_skulltula_rupee'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_100_skulltula_rupee']),
            },
        }
    }

    if (isRealRobBranch) {
    realRobSettingMap = {
        'fix_broken_actors': {
            img: '/images/OoT_Deku_Shield_Icon.png',
            fade: !graphSettings['fix_broken_actors'],
            tooltip: graphSettingsOptions['fix_broken_actors'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['fix_broken_actors']),
        },
        'shuffle_fishies': {
            img: '/images/OoT_Fish_Icon.png',
            fade: !graphSettings['shuffle_fishies'],
            tooltip: graphSettingsOptions['shuffle_fishies'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_fishies']),
        },
        'shuffle_grass': {
            img: '/images/grass.png',
            fade: !graphSettings['shuffle_grass'],
            tooltip: graphSettingsOptions['shuffle_grass'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_grass']),
        },
        'shuffle_gossipstones': {
            img: '/images/gossip-stone_32x32.png',
            fade: !graphSettings['shuffle_gossipstones'],
            tooltip: graphSettingsOptions['shuffle_gossipstones'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_gossipstones']),
        },
        'shuffle_enemy_drops': {
            img: '/images/souls/skull-kid_32x32.png',
            fade: !graphSettings['shuffle_enemy_drops'],
            tooltip: graphSettingsOptions['shuffle_enemy_drops'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_enemy_drops']),
        },
        'shuffle_enemy_spawns': {
            img: '/images/Soul_Icon.png',
            rImg: {
                'regional': '/images/medallion_wheel.png',
                'bosses': '/images/gohma_eye.png',
            }[graphSettings['shuffle_enemy_spawns'] as string] as string,
            fade: graphSettings['shuffle_enemy_spawns'] === 'off',
            tooltip: graphSettingsOptions['shuffle_enemy_spawns'].display_name,
            tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['shuffle_enemy_spawns']),
        },
    };
    if (graphVersion.gte('8.2.50')) {
        // add assets when boulder shuffle is supported
        goldBoulders = {};
    }
    }

    if (graphVersion.gt('8.3.0')) {
        doorOfTime = {
            'open_door_of_time': {
                img: '/images/sot_block.png',
                lImg: {
                    'stones': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
                    'stones_sot': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
                    'stones_oot_sot': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
                }[graphSettings['open_door_of_time'] as string] as string,
                rImg: {
                    'sot': '/images/Blue_Note.png',
                    'stones_sot': '/images/Blue_Note.png',
                    'oot_sot': '/images/Blue_Note.png',
                    'stones_oot_sot': '/images/Blue_Note.png',
                }[graphSettings['open_door_of_time'] as string] as string,
                fade: graphSettings['open_door_of_time'] === 'open',
                tooltip: graphSettingsOptions['open_door_of_time'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['open_door_of_time']),
            },
        };
    } else {
        doorOfTime = {
            'open_door_of_time': {
                img: '/images/sot_block.png',
                fade: !graphSettings['open_door_of_time'],
                tooltip: graphSettingsOptions['open_door_of_time'].display_name,
                tooltip2: settingValueDisplay(graphSettings, graphSettingsOptions['open_door_of_time']),
            },
        };
    }

    let mergedSettingMap = {};
    if (isFenhlBranch) {
        mergedSettingMap = merge(baseSettingMap, fenhlSettingMap);
        mergedSettingMap = merge(mergedSettingMap, stableSettingMap);
        mergedSettingMap = merge(mergedSettingMap, rewardShuffle);
        mergedSettingMap = merge(mergedSettingMap, towerShuffle);
        mergedSettingMap = merge(mergedSettingMap, fortressHP);
        mergedSettingMap = merge(mergedSettingMap, tcgLens);
        mergedSettingMap = merge(mergedSettingMap, skulls100);
        mergedSettingMap = merge(mergedSettingMap, doorOfTime);
        mergedSettingMap = merge(mergedSettingMap, ocarinaSongs);
        mergedSettingMap = merge(mergedSettingMap, scarecrowSong);
        if (graphVersion.lt('8.1.48')) {
            mergedSettingMap = merge(mergedSettingMap, potSanity2);
        } else {
            mergedSettingMap = merge(mergedSettingMap, potSanity3);
        }
    } else if (isRealRobBranch) {
        mergedSettingMap = merge(baseSettingMap, mainSettingMap);
        mergedSettingMap = merge(mergedSettingMap, realRobSettingMap);
        mergedSettingMap = merge(mergedSettingMap, potSanity3);
        mergedSettingMap = merge(mergedSettingMap, towerShuffle);
        mergedSettingMap = merge(mergedSettingMap, fortressHP);
        mergedSettingMap = merge(mergedSettingMap, tcgLens);
        mergedSettingMap = merge(mergedSettingMap, doorOfTime);
        mergedSettingMap = merge(mergedSettingMap, ocarinaSongs);
        mergedSettingMap = merge(mergedSettingMap, scarecrowSong);
        if (graphVersion.gte('8.1.38')) {
            mergedSettingMap = merge(mergedSettingMap, rewardShuffle);
        }
        if (graphVersion.gte('8.2.50')) {
            mergedSettingMap = merge(mergedSettingMap, goldBoulders);
        }
        if (graphVersion.gt('8.3.0')) {
            mergedSettingMap = merge(mergedSettingMap, skulls100);
        }
    } else {
        mergedSettingMap = merge(baseSettingMap, mainSettingMap);
        mergedSettingMap = merge(mergedSettingMap, stableSettingMap);
        mergedSettingMap = merge(mergedSettingMap, towerShuffle);
        mergedSettingMap = merge(mergedSettingMap, fortressHP);
        mergedSettingMap = merge(mergedSettingMap, tcgLens);
        mergedSettingMap = merge(mergedSettingMap, doorOfTime);
        mergedSettingMap = merge(mergedSettingMap, ocarinaSongs);
        mergedSettingMap = merge(mergedSettingMap, scarecrowSong);
        if (graphVersion.gte('8.1.38')) {
            mergedSettingMap = merge(mergedSettingMap, rewardShuffle);
        }
        if (graphVersion.lt('8.1.48')) {
            mergedSettingMap = merge(mergedSettingMap, potSanity2);
        } else {
            mergedSettingMap = merge(mergedSettingMap, potSanity3);
        }
        if (graphVersion.gt('8.3.0')) {
            mergedSettingMap = merge(mergedSettingMap, skulls100);
        }
    }
    return mergedSettingMap;
}