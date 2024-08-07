export const current_settings_version = 1;

export interface tracker_settings_definitions_v1 {
    version: number,
    game_version: tracker_setting_definition,
    player_number: tracker_setting_definition,
    setting_icons: tracker_setting_definition,
    region_page: tracker_setting_definition,
    one_region_per_page: tracker_setting_definition,
    dark_mode: tracker_setting_definition,
    show_unshuffled_entrances: tracker_setting_definition,
    show_locations: tracker_setting_definition,
    show_unshuffled_locations: tracker_setting_definition,
    shop_price_tracking: tracker_setting_definition,
    show_hints: tracker_setting_definition,
    show_age_logic: tracker_setting_definition,
    race_mode: tracker_setting_definition,
    region_visibility: tracker_setting_definition,
    show_timer: tracker_setting_definition,
    show_check_counter: tracker_setting_definition,
}

export interface tracker_settings_v1 {
    [key: string]: number | boolean | string | string[],
    version: number,
    game_version: string,
    player_number: number,
    setting_icons: boolean,
    expand_sidebar: boolean,
    region_page: string,
    one_region_per_page: boolean,
    dark_mode: boolean,
    show_unshuffled_entrances: boolean,
    show_locations: string,
    show_unshuffled_locations: string[],
    shop_price_tracking: string,
    show_hints: boolean,
    show_age_logic: boolean,
    race_mode: boolean,
    region_visibility: string,
    show_timer: boolean,
    show_check_counter: boolean,
}

export type all_tracker_settings_versions = tracker_settings_v1;
export type TrackerSettingsCurrent = tracker_settings_v1;

export interface tracker_setting_definition {
    display_name: string,
    type: string,
    options?: string[],
}

export type tracker_setting_type = number | boolean | string | string[];

// Shallow copy isn't enough since there are array values for some of the keys
export const copyTrackerSettings = (oldTrackerSettings: TrackerSettingsCurrent): TrackerSettingsCurrent => {
    let newTrackerSettings = Object.assign({}, oldTrackerSettings);
    newTrackerSettings.show_unshuffled_locations = [...oldTrackerSettings.show_unshuffled_locations];
    return newTrackerSettings;
}

export const tracker_settings_default: TrackerSettingsCurrent = {
    version: 1,
    game_version: '',
    player_number: 0,
    setting_icons: true,
    region_page: 'Overworld',
    one_region_per_page: false,
    expand_sidebar: true,
    dark_mode: false,
    show_age_logic: false,
    race_mode: true,
    region_visibility: 'Reachable with All Tricks',
    show_unshuffled_entrances: true,
    show_unshuffled_locations: [],
    show_hints: true,
    show_locations: 'Yes',
    shop_price_tracking: 'Both',
    show_timer: false,
    show_check_counter: true,
}

export const region_visibility_values: {[trackerValue: string]: string} = {
    'Logically Reachable': 'matching',
    'Reachable with All Tricks': 'tricks',
    'Connected': 'connected',
    'Always Visible': 'always',
}

export const tracker_settings_defs: tracker_settings_definitions_v1 = {
    version: 1,
    game_version: {
        display_name: 'Randomizer Version',
        type: 'str',
        options: [], // dynamically populated from graph library
    },
    player_number: {
        display_name: 'Player Number',
        type: 'int',
    },
    dark_mode: {
        display_name: 'Dark Mode',
        type: 'bool',
    },
    race_mode: {
        display_name: 'Race Mode',
        type: 'bool',
    },
    show_age_logic: {
        display_name: 'Show Age Logic Indicators',
        type: 'bool',
    },
    region_visibility: {
        display_name: 'Region Visibility',
        type: 'str',
        options: [
            'Logically Reachable',
            'Reachable with All Tricks',
            'Connected',
            'Always Visible'
        ]
    },
    region_page: {
        display_name: 'Region View',
        type: 'str',
        options: [
            'Overworld',
            'Dungeons',
        ]
    },
    one_region_per_page: {
        display_name: 'Show Individual Region Pages',
        type: 'bool',
    },
    setting_icons: {
        display_name: 'Show Game Settings as Icons',
        type: 'bool',
    },
    show_check_counter: {
        display_name: 'Show Check Counter',
        type: 'bool',
    },
    show_timer: {
        display_name: 'Show Timer',
        type: 'bool',
    },
    show_unshuffled_entrances: {
        display_name: 'Show Unshuffled Entrances',
        type: 'bool',
    },
    show_locations: {
        display_name: 'Show All Locations',
        type: 'str',
        options: [
            'Yes',
            'Interiors Only',
            'No',
        ]
    },
    // This option is controlled by the graph library.
    // Reproduced here for reference, but the only thing
    // used in the settings panel is the display name.
    show_unshuffled_locations: {
        display_name: 'Show Unshuffled Locations',
        type: 'list',
        options: [
            'Gold Skulltula Tokens',
            'Shop Items',
            'Adult Trade Items',
            'Child Trade Items',
            'Dungeon Small Keys',
            'Dungeon Boss Key',
            'Dungeon Maps',
            'Dungeon Compasses',
            'Ocarinas',
            'Save Epona',
            'Buy Magic Beans',
            'Plant Magic Beans',
            "Malon's Obstacle Course",
            'Set Scarecrow Song',
            'Buy Bombchus',
        ]
    },
    show_hints: {
        display_name: 'Show Hint Locations',
        type: 'bool',
    },
    shop_price_tracking: {
        display_name: 'Shop Price Tracking',
        type: 'str',
        options: [
            'Both',
            'Price Only',
            'Wallet Tier',
        ]
    },
};