interface tracker_settings_definitions_v1 {
    version: number,
    show_unshuffled_entrances: tracker_setting_definition,
    show_locations: tracker_setting_definition,
    show_unshuffled_locations: tracker_setting_definition,
    shop_price_tracking: tracker_setting_definition,
    show_hints: tracker_setting_definition,
    race_mode: tracker_setting_definition,
    show_timer: tracker_setting_definition,
    show_check_counter: tracker_setting_definition,
}

interface tracker_setting_definition {
    display_name: string,
    type: string,
    default: string | number | boolean | string[],
    options?: string[],
}

export const tracker_settings_defs: tracker_settings_definitions_v1 = {
    version: 1,
    race_mode: {
        display_name: 'Race Mode',
        type: 'bool',
        default: true,
    },
    show_unshuffled_entrances: {
        display_name: 'Show Unshuffled Entrances',
        type: 'bool',
        default: true,
    },
    show_unshuffled_locations: {
        display_name: 'Show Unshuffled Locations',
        type: 'list',
        default: [],
        options: [
            'Gold Skulltula Tokens',
            'Shop Items',
            'Adult Trade Items',
            'Child Trade Items',
            'Dungeon Small Keys',
            'Dungeon Boss Key',
            'Dungeon Maps',
            'Dungeon Compasses',
            'Save Epona',
            'Buy Magic Beans',
            'Plant Magic Beans',
            "Malon's Obstacle Course",
            'Set Scarecrow Song',
        ]
    },
    show_hints: {
        display_name: 'Show Hint Locations',
        type: 'bool',
        default: true,
    },
    show_locations: {
        display_name: 'Show All Locations',
        type: 'str',
        default: 'Yes',
        options: [
            'Yes',
            'Interiors Only',
            'No',
        ]
    },
    shop_price_tracking: {
        display_name: 'Shop Price Tracking',
        type: 'str',
        default: 'Both',
        options: [
            'Both',
            'Price Only',
            'Wallet Tier',
        ]
    },
    show_timer: {
        display_name: 'Show Timer',
        type: 'bool',
        default: false,
    },
    show_check_counter: {
        display_name: 'Show Check Counter',
        type: 'bool',
        default: true,
    },
};