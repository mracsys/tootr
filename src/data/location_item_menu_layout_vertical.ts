import type { item_menu_layout } from "./location_item_menu_layout";

// Horizontal layout
// 5x10 items, plus extra row for clear button.
// Rows organized to mitigate radial submenu spillover
// beyond menu width. Submenus generally kept to
// columns 3, 4, 5.
export const location_item_menu_layout_vertical: item_menu_layout = [
    [
        'Slingshot',
        'Bomb Bag',
        'Bow',
        'Fire Arrows',
        'Dins Fire',
    ],
    [
        'Boomerang',
        'Bombchus (5)',
        'Progressive Hookshot',
        {
            button_item: 'Blue Arrows',
            item_list: [
                'Ice Arrows',
                'Blue Fire Arrows',
            ]
        },
        'Farores Wind',
    ],
    [
        'Lens of Truth',
        {
            button_item: 'Buy Magic Bean',
            item_list: [
                'Magic Bean',
                'Magic Bean Pack',
            ]
        },
        'Megaton Hammer',
        'Light Arrows',
        'Nayrus Love',
    ],
    [
        'Kokiri Sword',
        'Biggoron Sword',
        'Stone of Agony',
        'Goron Tunic',
        'Zora Tunic',
    ],
    [
        'Deku Shield',
        'Hylian Shield',
        'Mirror Shield',
        'Iron Boots',
        'Hover Boots',
    ],
    [
        'Progressive Wallet',
        'Progressive Scale',
        'Progressive Strength Upgrade',
        'Magic Meter',
        'Gerudo Membership Card',
    ],
    [
        'Ocarina',
        {
            button_item: 'Ocarina C up Button',
            item_list: [
                'Ocarina C left Button',
                'Ocarina C up Button',
                'Ocarina C right Button',
                'Ocarina C down Button',
                'Ocarina A Button',
            ]
        },
        {
            button_item: 'Song',
            item_list: [
                'Zeldas Lullaby',
                'Eponas Song',
                'Sarias Song',
                'Suns Song',
                'Song of Time',
                'Song of Storms',
                'Minuet of Forest',
                'Bolero of Fire',
                'Serenade of Water',
                'Requiem of Spirit',
                'Nocturne of Shadow',
                'Prelude of Light',
            ]
        },
        {
            button_item: 'Bottle',
            item_list: [
                'Bottle',
                'Rutos Letter',
                'Bottle with Red Potion',
                'Bottle with Green Potion',
                'Bottle with Blue Potion',
                'Bottle with Fairy',
                'Bottle with Fish',
                'Bottle with Blue Fire',
                'Bottle with Bugs',
                'Bottle with Big Poe',
                'Bottle with Poe',
                'Bottle with Milk',
            ]
        },
        {
            button_item: 'Deku Stick',
            item_list: [
                'Deku Stick (1)',
                'Deku Nuts (5)',
                'Deku Seeds (30)',
                'Bombs (5)',
                'Arrows (5)',
                'Recovery Heart',
                'Rupee (1)',
                'Rupees (5)',
                'Rupees (20)',
                'Rupees (50)',
                'Rupees (200)',
                'Double Defense',
            ]
        },
    ],
    [
        {
            button_item: 'Heart Container',
            item_list: [
                'Piece of Heart',
                'Heart Container',
            ]
        },
        {
            button_item: 'Fishing Rod',
            item_list: [
                'Fishing Rod',
                'Fish (Child 6 lb)',
                'Fish (Child 8 lb)',
                'Fish (Child 10 lb)',
                'Fish (Adult 10 lb)',
                'Fish (Adult 12 lb)',
                'Fish (Adult 16 lb)',
                'Hylian Loach',
            ]
        },
        {
            button_item: 'Weird Egg',
            item_list: [
                'Weird Egg',
                'Chicken',
                'Zeldas Letter',
                'Keaton Mask',
                'Skull Mask',
                'Spooky Mask',
                'Bunny Hood',
                'Mask of Truth',
                'Goron Mask',
                'Zora Mask',
                'Gerudo Mask',
            ]
        },
        {
            button_item: 'Pocket Egg',
            item_list: [
                'Pocket Egg',
                'Pocket Cucco',
                'Cojiro',
                'Odd Mushroom',
                'Odd Potion',
                'Poachers Saw',
                'Broken Sword',
                'Prescription',
                'Eyeball Frog',
                'Eyedrops',
                'Claim Check',
            ]
        },
        {
            button_item: 'Map',
            item_list: [
                'Map (Deku Tree)',
                'Map (Dodongos Cavern)',
                'Map (Jabu Jabus Belly)',
                'Map (Forest Temple)',
                'Map (Fire Temple)',
                'Map (Water Temple)',
                'Map (Spirit Temple)',
                'Map (Shadow Temple)',
                'Map (Ice Cavern)',
                'Map (Bottom of the Well)',
                'Map (Ganons Castle)',
                'Map (???)',
            ]
        },
    ],
    [
        'Triforce Piece',
        {
            button_item: 'Boss Key',
            item_list: [
                'Boss Key (Forest Temple)',
                'Boss Key (Fire Temple)',
                'Boss Key (Water Temple)',
                'Boss Key (Spirit Temple)',
                'Boss Key (Shadow Temple)',
                'Boss Key (Ganons Castle)',
                'Boss Key (???)',
            ]
        },
        {
            button_item: 'Small Key',
            item_list: [
                'Small Key (Forest Temple)',
                'Small Key (Fire Temple)',
                'Small Key (Water Temple)',
                'Small Key (Spirit Temple)',
                'Small Key (Shadow Temple)',
                'Small Key (Treasure Chest Game)',
                'Small Key (Bottom of the Well)',
                'Small Key (Gerudo Training Ground)',
                'Small Key (Thieves Hideout)',
                'Small Key (Ganons Castle)',
                'Small Key (???)',
            ]
        },
        {
            button_item: 'Small Key Ring',
            item_list: [
                'Small Key Ring (Forest Temple)',
                'Small Key Ring (Fire Temple)',
                'Small Key Ring (Water Temple)',
                'Small Key Ring (Spirit Temple)',
                'Small Key Ring (Shadow Temple)',
                'Small Key Ring (Treasure Chest Game)',
                'Small Key Ring (Bottom of the Well)',
                'Small Key Ring (Gerudo Training Ground)',
                'Small Key Ring (Thieves Hideout)',
                'Small Key Ring (Ganons Castle)',
                'Small Key Ring (???)',
            ]
        },
        {
            button_item: 'Compass',
            item_list: [
                'Compass (Deku Tree)',
                'Compass (Dodongos Cavern)',
                'Compass (Jabu Jabus Belly)',
                'Compass (Forest Temple)',
                'Compass (Fire Temple)',
                'Compass (Water Temple)',
                'Compass (Spirit Temple)',
                'Compass (Shadow Temple)',
                'Compass (Ice Cavern)',
                'Compass (Bottom of the Well)',
                'Compass (Ganons Castle)',
                'Compass (???)',
            ]
        },
    ],
    [
        'Gold Skulltula Token',
        {
            button_item: 'Soul',
            menu_list: [
                [
                    'Stalfos Soul',
                    'Octorok Soul',
                    'Wallmaster Soul',
                    'Dodongo Soul',
                    'Keese Soul',
                    'Tektite Soul',
                    'Peahat Soul',
                ],
                [
                    'Lizalfos and Dinalfos Soul',
                    'Gohma Larvae Soul',
                    'Shabom Soul',
                    'Baby Dodongo Soul',
                    'Biri and Bari Soul',
                    'Tailpasaran Soul',
                    'Skulltula Soul',
                ],
                [
                    'Torch Slug Soul',
                    'Moblin Soul',
                    'Armos Soul',
                    'Deku Baba Soul',
                    'Deku Scrub Soul',
                    'Bubble Soul',
                    'Beamos Soul',
                ],
                [
                    'Floormaster Soul',
                    'Redead and Gibdo Soul',
                    'Skullwalltula Soul',
                    'Flare Dancer Soul',
                    'Dead hand Soul',
                    'Shell Blade Soul',
                    'Like-like Soul',
                ],
                [
                    'Spike Enemy Soul',
                    'Anubis Soul',
                    'Iron Knuckle Soul',
                    'Skull Kid Soul',
                    'Flying Pot Soul',
                    'Freezard Soul',
                    'Stinger Soul',
                ],
                [
                    'Wolfos Soul',
                    'Guay Soul',
                    'Jabu Jabu Tentacle Soul',
                    'Dark Link Soul',
                    'Queen Gohma Soul',
                    'King Dodongo Soul',
                    'Barinade Soul',
                ],
                [
                    'Phantom Ganon Soul',
                    'Volvagia Soul',
                    'Morpha Soul',
                    'Bongo Bongo Soul',
                    'Twinrova Soul',
                ],
                [
                    'Deku Tree Souls',
                    'Dodongos Cavern Souls',
                    'Jabu Jabus Belly Souls',
                    'Forest Temple Souls',
                    'Fire Temple Souls',
                    'Water Temple Souls',
                    'Shadow Temple Souls',
                ],
                [
                    'Spirit Temple Souls',
                    'Bottom of the Well Souls',
                    'Ice Cavern Souls',
                    'Gerudo Training Ground Souls',
                    'Ganons Castle Souls',
                    'Forest Area Souls',
                    'Hyrule Field Souls',
                ],
                [
                    'Lake Hylia Souls',
                    'Gerudo Area Souls',
                    'Market Area Souls',
                    'Kakariko Area Souls',
                    'Goron Area Souls',
                    'Zora Area Souls',
                    'Lon Lon Ranch Souls',
                ],
                [
                    'Grottos Souls',
                    'Soul (???)',
                ]
            ]
        },
        {
            button_item: 'Silver Rupee',
            item_list: {
                'Silver Rupee (Bottom of the Well)': ['Silver Rupee (Bottom of the Well Basement)'],
                'Silver Rupee (Ice Cavern)': [
                    'Silver Rupee (Ice Cavern Spinning Scythe)',
                    'Silver Rupee (Ice Cavern Push Block)',
                ],
                'Silver Rupee (Gerudo Training Ground)': [
                    'Silver Rupee (Gerudo Training Ground Slopes)',
                    'Silver Rupee (Gerudo Training Ground Lava)',
                    'Silver Rupee (Gerudo Training Ground Water)',
                ],
                'Silver Rupee (Shadow Temple)': [
                    'Silver Rupee (Shadow Temple Invisible Blades)',
                    'Silver Rupee (Shadow Temple Invisible Spikes)',
                    'Silver Rupee (Shadow Temple Scythe Shortcut)',
                    'Silver Rupee (Shadow Temple Huge Pit)',
                ],
                'Silver Rupee (Spirit Temple)': [
                    'Silver Rupee (Spirit Temple Child Early Torches)',
                    'Silver Rupee (Spirit Temple Adult Boulders)',
                    'Silver Rupee (Spirit Temple Lobby and Lower Adult)',
                    'Silver Rupee (Spirit Temple Sun Block)',
                    'Silver Rupee (Spirit Temple Adult Climb)',
                ],
                'Silver Rupee (Ganons Castle)': [
                    'Silver Rupee (Ganons Castle Forest Trial)',
                    'Silver Rupee (Ganons Castle Fire Trial)',
                    'Silver Rupee (Ganons Castle Water Trial)',
                    'Silver Rupee (Ganons Castle Spirit Trial)',
                    'Silver Rupee (Ganons Castle Shadow Trial)',
                    'Silver Rupee (Ganons Castle Light Trial)',
                ],
                'Silver Rupee (Dodongos Cavern)': ['Silver Rupee (Dodongos Cavern Staircase)'],
                'Silver Rupee (???)': ['Silver Rupee (???)'],
            }
        },
        {
            button_item: 'Silver Rupee Pouch',
            item_list: {
                'Silver Rupee Pouch (Bottom of the Well)': ['Silver Rupee Pouch (Bottom of the Well Basement)'],
                'Silver Rupee Pouch (Ice Cavern)': [
                    'Silver Rupee Pouch (Ice Cavern Spinning Scythe)',
                    'Silver Rupee Pouch (Ice Cavern Push Block)',
                ],
                'Silver Rupee Pouch (Gerudo Training Ground)': [
                    'Silver Rupee Pouch (Gerudo Training Ground Slopes)',
                    'Silver Rupee Pouch (Gerudo Training Ground Lava)',
                    'Silver Rupee Pouch (Gerudo Training Ground Water)',
                ],
                'Silver Rupee Pouch (Shadow Temple)': [
                    'Silver Rupee Pouch (Shadow Temple Invisible Blades)',
                    'Silver Rupee Pouch (Shadow Temple Invisible Spikes)',
                    'Silver Rupee Pouch (Shadow Temple Scythe Shortcut)',
                    'Silver Rupee Pouch (Shadow Temple Huge Pit)',
                ],
                'Silver Rupee Pouch (Spirit Temple)': [
                    'Silver Rupee Pouch (Spirit Temple Child Early Torches)',
                    'Silver Rupee Pouch (Spirit Temple Adult Boulders)',
                    'Silver Rupee Pouch (Spirit Temple Lobby and Lower Adult)',
                    'Silver Rupee Pouch (Spirit Temple Sun Block)',
                    'Silver Rupee Pouch (Spirit Temple Adult Climb)',
                ],
                'Silver Rupee Pouch (Ganons Castle)': [
                    'Silver Rupee Pouch (Ganons Castle Forest Trial)',
                    'Silver Rupee Pouch (Ganons Castle Fire Trial)',
                    'Silver Rupee Pouch (Ganons Castle Water Trial)',
                    'Silver Rupee Pouch (Ganons Castle Spirit Trial)',
                    'Silver Rupee Pouch (Ganons Castle Shadow Trial)',
                    'Silver Rupee Pouch (Ganons Castle Light Trial)',
                ],
                'Silver Rupee Pouch (Dodongos Cavern)': ['Silver Rupee Pouch (Dodongos Cavern Staircase)'],
                'Silver Rupee Pouch (???)': ['Silver Rupee Pouch (???)'],
            }
        },
        {
            button_item: 'Zora Sapphire',
            item_list: [
                'Water Medallion',
                'Fire Medallion',
                'Forest Medallion',
                'Kokiri Emerald',
                'Goron Ruby',
                'Zora Sapphire',
                'Light Medallion',
                'Shadow Medallion',
                'Spirit Medallion',
            ]
        },
    ]
];

export const shop_item_menu_layout = [
    [
        'Buy Goron Tunic',
        'Buy Zora Tunic',
        'Buy Bombs (20)',
        'Buy Bombchu (5)',
        'Buy Deku Shield',
    ],
    [
        'Buy Blue Fire',
        'Buy Deku Stick (1)',
        'Buy Arrows (30)',
        'Buy Deku Seeds (30)',
        'Buy Hylian Shield',
    ]
];