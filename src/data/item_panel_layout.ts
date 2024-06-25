interface panelLayout {
    main_items: itemEntry[],
    song_items: itemEntry[],
    equipment: itemEntry[],
    last_song_row: itemEntry[],
    child_trade_items: itemEntry[],
    adult_trade_items: itemEntry[],
    win_cons: winconEntry,
    med_dungeon_items: labelEntry[],
    stone_dungeon_items: labelEntry[],
    side_dungeon_items: labelEntry[],
    enemy_souls: itemEntry[],
    boss_souls: itemEntry[],
    regional_souls: itemEntry[],
}

export interface itemEntry {
    item_name: string,
    position?: string,
    item_variants?: string[],
    group_variants?: string[],
    sub_variants?: (null | number | string)[],
    uncollected_variant?: null | number | string,
}

export interface labelEntry {
    label: string,
    modify_setting?: string,
    setting_value?: string,
    item_list: itemEntry[],
    silver_rupees?: itemEntry[],
}

interface winconEntry {
    rewards: {
        top: itemEntry,
        rightTop: itemEntry,
        rightBottom: itemEntry,
        bottom: itemEntry,
        leftBottom: itemEntry,
        leftTop: itemEntry,
        triforce: itemEntry,
        left: itemEntry,
        middle: itemEntry,
        right: itemEntry,
    },
    counters: itemEntry[],
}

export const itemPanelLayout: panelLayout = {
    main_items: [
        {
            item_name: "Slingshot",
            sub_variants: [
                null,
                40,
                50
            ]
        },
        {
            item_name: "Bomb Bag",
            sub_variants: [
                null,
                30,
                40
            ]
        },
        {
            item_name: "Bow",
            sub_variants: [
                null,
                40,
                50
            ]
        },
        { item_name: "Fire Arrows" },
        { item_name: "Dins Fire" },
        { item_name: "Boomerang" },
        { item_name: "Bombchus" },
        {
            item_name: "Progressive Hookshot",
            sub_variants: [
                "H",
                "L"
            ],
            item_variants: [
                "Hookshot",
                "Longshot"
            ]
        },
        {
            item_name: "Blue Arrows",
            group_variants: [
                "Ice Arrows",
                "Blue Fire Arrows"
            ]
        },
        { item_name: "Farores Wind" },
        { item_name: "Lens of Truth" },
        { item_name: "Magic Bean" },
        { item_name: "Megaton Hammer" },
        { item_name: "Light Arrows" },
        { item_name: "Nayrus Love" },
        {
            item_name: "Bottle0",
            group_variants: [
                "Bottle",
                "Rutos Letter",
                "Bottle with Red Potion",
                "Bottle with Green Potion",
                "Bottle with Blue Potion",
                "Bottle with Milk",
                "Bottle with Fairy",
                "Bottle with Fish",
                "Bottle with Blue Fire",
                "Bottle with Bugs",
                "Bottle with Poe",
                "Bottle with Big Poe"
            ]
        },
        {
            item_name: "Bottle1",
            group_variants: [
                "Bottle",
                "Rutos Letter",
                "Bottle with Red Potion",
                "Bottle with Green Potion",
                "Bottle with Blue Potion",
                "Bottle with Milk",
                "Bottle with Fairy",
                "Bottle with Fish",
                "Bottle with Blue Fire",
                "Bottle with Bugs",
                "Bottle with Poe",
                "Bottle with Big Poe"
            ]
        },
        {
            item_name: "Bottle2",
            group_variants: [
                "Bottle",
                "Rutos Letter",
                "Bottle with Red Potion",
                "Bottle with Green Potion",
                "Bottle with Blue Potion",
                "Bottle with Milk",
                "Bottle with Fairy",
                "Bottle with Fish",
                "Bottle with Blue Fire",
                "Bottle with Bugs",
                "Bottle with Poe",
                "Bottle with Big Poe"
            ]
        },
        {
            item_name: "Bottle3",
            group_variants: [
                "Bottle",
                "Rutos Letter",
                "Bottle with Red Potion",
                "Bottle with Green Potion",
                "Bottle with Blue Potion",
                "Bottle with Milk",
                "Bottle with Fairy",
                "Bottle with Fish",
                "Bottle with Blue Fire",
                "Bottle with Bugs",
                "Bottle with Poe",
                "Bottle with Big Poe"
            ]
        },
        { item_name: "Stone of Agony" },
    ],
    song_items: [
        { item_name: "Zeldas Lullaby" },
        { item_name: "Minuet of Forest" },
        { item_name: "Eponas Song" },
        { item_name: "Bolero of Fire" },
        { item_name: "Sarias Song" },
        { item_name: "Serenade of Water" },
        { item_name: "Suns Song" },
        { item_name: "Requiem of Spirit" },
        { item_name: "Song of Time" },
        { item_name: "Nocturne of Shadow" },
        { item_name: "Song of Storms" },
        { item_name: "Prelude of Light" },
        {
            item_name: "Ocarina",
            item_variants: [
                "Ocarina",
                "Ocarina of Time",
            ]
        },
        { item_name: "Scarecrow Song" },
    ],
    equipment: [
        {
            item_name: "Progressive Strength Upgrade",
            item_variants: [
                "Goron Bracelet",
                "Silver Gauntlets",
                "Gold Gauntlets",
            ]
        },
        { item_name: "Magic Meter" },
        { item_name: "Kokiri Sword" },
        { item_name: "Goron Tunic" },
        { item_name: "Iron Boots" },
        {
            item_name: "Progressive Wallet",
            sub_variants: [
                200,
                500,
                999,
            ],
            uncollected_variant: 99
        },
        {
            item_name: "Progressive Scale",
            item_variants: [
                "Silver Scale",
                "Gold Scale",
            ]
        },
        { item_name: "Biggoron Sword" },
        { item_name: "Zora Tunic" },
        { item_name: "Hover Boots" },
        {
            item_name: "Weird Egg",
            group_variants: [
                "Weird Egg",
                "Chicken",
                "Zeldas Letter",
                "Keaton Mask",
                "Skull Mask",
                "Spooky Mask",
                "Bunny Hood",
                "Mask of Truth",
            ]
        },
        {
            item_name: "Pocket Egg",
            group_variants: [
                "Pocket Egg",
                "Pocket Cucco",
                "Cojiro",
                "Odd Mushroom",
                "Odd Potion",
                "Poachers Saw",
                "Broken Sword",
                "Prescription",
                "Eyeball Frog",
                "Eyedrops",
                "Claim Check",
            ]
        },
        { item_name: "Deku Shield" },
        { item_name: "Hylian Shield" },
        { item_name: "Mirror Shield" },
    ],
    last_song_row: [
        { item_name: "Ocarina A Button" },
        {
            item_name: "Ocarina C down Button",
            position: "downButton",
        },
        {
            item_name: "Ocarina C right Button",
            position: "rightButton",
        },
        {
            item_name: "Ocarina C left Button",
            position: "leftButton",
        },
        {
            item_name: "Ocarina C up Button",
            position: "upButton",
        },
    ],
    child_trade_items: [
        { item_name: "Weird Egg" },
        { item_name: "Zeldas Letter" },
        { item_name: "Keaton Mask" },
        { item_name: "Skull Mask" },
        { item_name: "Spooky Mask" },
        { item_name: "Bunny Hood" },
        { item_name: "Mask of Truth" },
        { item_name: "Gerudo Mask" },
        { item_name: "Goron Mask" },
        { item_name: "Zora Mask" },
    ],
    adult_trade_items: [
        { item_name: "Pocket Egg" },
        { item_name: "Cojiro" },
        { item_name: "Odd Mushroom" },
        { item_name: "Odd Potion" },
        { item_name: "Poachers Saw" },
        { item_name: "Broken Sword" },
        { item_name: "Prescription" },
        { item_name: "Eyeball Frog" },
        { item_name: "Eyedrops" },
        { item_name: "Claim Check" },
    ],
    win_cons: {
        rewards: {
            top: { item_name: "Light Medallion" },
            rightTop: { item_name: "Forest Medallion" },
            rightBottom: { item_name: "Fire Medallion" },
            bottom: { item_name: "Water Medallion" },
            leftBottom: { item_name: "Spirit Medallion" },
            leftTop: { item_name: "Shadow Medallion" },
            triforce: { item_name: "Triforce Piece" },
            left: { item_name: "Kokiri Emerald" },
            middle: { item_name: "Goron Ruby" },
            right: { item_name: "Zora Sapphire" },
        },
        counters: [
            { item_name: "Triforce Piece" },
            { item_name: "Heart Container" },
            { item_name: "Gold Skulltula Token" },
        ]
    },
    med_dungeon_items: [
        {
            label: "Forest",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Forest Temple",
            item_list: [
                { item_name: "DungeonReward" },
                { item_name: "Small Key (Forest Temple)" },
                { item_name: "Boss Key (Forest Temple)" },
            ]
        },
        {
            label: "Fire",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Fire Temple",
            item_list: [
                { item_name: "DungeonReward" },
                { item_name: "Small Key (Fire Temple)" },
                { item_name: "Boss Key (Fire Temple)" },
            ]
        },
        {
            label: "Water",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Water Temple",
            item_list: [
                { item_name: "DungeonReward" },
                { item_name: "Small Key (Water Temple)" },
                { item_name: "Boss Key (Water Temple)" },
            ]
        },
        {
            label: "Spirit",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Spirit Temple",
            item_list: [
                { item_name: "DungeonReward" },
                { item_name: "Small Key (Spirit Temple)" },
                { item_name: "Boss Key (Spirit Temple)" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Spirit Temple Child Early Torches)" },
                { item_name: "Silver Rupee (Spirit Temple Adult Boulders)" },
                { item_name: "Silver Rupee (Spirit Temple Lobby and Lower Adult)" },
                { item_name: "Silver Rupee (Spirit Temple Sun Block)" },
                { item_name: "Silver Rupee (Spirit Temple Adult Climb)" },
            ]
        },
        {
            label: "Shadow",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Shadow Temple",
            item_list: [
                { item_name: "DungeonReward" },
                { item_name: "Small Key (Shadow Temple)" },
                { item_name: "Boss Key (Shadow Temple)" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Shadow Temple Scythe Shortcut)" },
                { item_name: "Silver Rupee (Shadow Temple Invisible Blades)" },
                { item_name: "Silver Rupee (Shadow Temple Huge Pit)" },
                { item_name: "Silver Rupee (Shadow Temple Invisible Spikes)" },
            ]
        },
    ],
    side_dungeon_items: [
        {
            label: "Well",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Bottom of the Well",
            item_list: [
                { item_name: "Small Key (Bottom of the Well)" },
                { item_name: "BlankSpace" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Bottom of the Well Basement)" },
            ]
        },
        {
            label: "Ice",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Ice Cavern",
            item_list: [
                { item_name: "BlankSpace" },
                { item_name: "BlankSpace" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Ice Cavern Spinning Scythe)" },
                { item_name: "Silver Rupee (Ice Cavern Push Block)" },
            ]
        },
        {
            label: "GTG",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Gerudo Training Ground",
            item_list: [
                { item_name: "Small Key (Gerudo Training Ground)" },
                { item_name: "BlankSpace" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Gerudo Training Ground Slopes)" },
                { item_name: "Silver Rupee (Gerudo Training Ground Lava)" },
                { item_name: "Silver Rupee (Gerudo Training Ground Water)" },
            ]
        },
        {
            label: "Hideout",
            item_list: [
                { item_name: "Small Key (Thieves Hideout)" },
                { item_name: "Gerudo Membership Card" },
            ]
        },
        {
            label: "Ganon",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Ganons Castle",
            item_list: [
                { item_name: "Small Key (Ganons Castle)" },
                { item_name: "Boss Key (Ganons Castle)" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Ganons Castle Spirit Trial)" },
                { item_name: "Silver Rupee (Ganons Castle Light Trial)" },
                { item_name: "Silver Rupee (Ganons Castle Fire Trial)" },
                { item_name: "Silver Rupee (Ganons Castle Shadow Trial)" },
                { item_name: "Silver Rupee (Ganons Castle Water Trial)" },
                { item_name: "Silver Rupee (Ganons Castle Forest Trial)" },
            ]
        },
    ],
    stone_dungeon_items: [
        {
            label: "Deku",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Deku Tree",
            item_list: [
                { item_name: "DungeonReward" },
            ]
        },
        {
            label: "DC",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Dodongos Cavern",
            item_list: [
                { item_name: "DungeonReward" },
            ],
            // Filter these in the UI via location vanilla items.
            // There are always no more than 4 silver rupee rooms
            // per dungeon in vanilla and MQ.
            silver_rupees: [
                { item_name: "Silver Rupee (Dodongos Cavern Staircase)" },
            ]
        },
        {
            label: "Jabu",
            modify_setting: "mq_dungeons_specific",
            setting_value: "Jabu Jabus Belly",
            item_list: [
                { item_name: "DungeonReward" },
            ]
        },
        {
            label: "TCG",
            item_list: [
                { item_name: "Small Key (Treasure Chest Game)" }
            ]
        },
    ],
    enemy_souls: [
        { item_name: "Stalfos Soul" },
        { item_name: "Octorok Soul" },
        { item_name: "Wallmaster Soul" },
        { item_name: "Dodongo Soul" },
        { item_name: "Keese Soul" },
        { item_name: "Tektite Soul" },
        { item_name: "Peahat Soul" },
        { item_name: "Lizalfos and Dinalfos Soul" },
        { item_name: "Gohma Larvae Soul" },
        { item_name: "Shabom Soul" },
        { item_name: "Baby Dodongo Soul" },
        { item_name: "Biri and Bari Soul" },
        { item_name: "Tailpasaran Soul" },
        { item_name: "Skulltula Soul" },
        { item_name: "Torch Slug Soul" },
        { item_name: "Moblin Soul" },
        { item_name: "Armos Soul" },
        { item_name: "Deku Baba Soul" },
        { item_name: "Deku Scrub Soul" },
        { item_name: "Bubble Soul" },
        { item_name: "Beamos Soul" },
        { item_name: "Floormaster Soul" },
        { item_name: "Redead and Gibdo Soul" },
        { item_name: "Skullwalltula Soul" },
        { item_name: "Flare Dancer Soul" },
        { item_name: "Dead hand Soul" },
        { item_name: "Shell Blade Soul" },
        { item_name: "Like-like Soul" },
        { item_name: "Spike Enemy Soul" },
        { item_name: "Anubis Soul" },
        { item_name: "Iron Knuckle Soul" },
        { item_name: "Skull Kid Soul" },
        { item_name: "Flying Pot Soul" },
        { item_name: "Freezard Soul" },
        { item_name: "Stinger Soul" },
        { item_name: "Wolfos Soul" },
        { item_name: "Guay Soul" },
        { item_name: "Jabu Jabu Tentacle Soul" },
        { item_name: "Dark Link Soul" },
    ],
    boss_souls: [
        { item_name: "Queen Gohma Soul" },
        { item_name: "King Dodongo Soul" },
        { item_name: "Barinade Soul" },
        { item_name: "Phantom Ganon Soul" },
        { item_name: "Volvagia Soul" },
        { item_name: "Morpha Soul" },
        { item_name: "Bongo Bongo Soul" },
        { item_name: "Twinrova Soul" },
    ],
    regional_souls: [
        { item_name: 'Deku Tree Souls' },
        { item_name: 'Dodongos Cavern Souls' },
        { item_name: 'Jabu Jabus Belly Souls' },
        { item_name: 'Forest Temple Souls' },
        { item_name: 'Fire Temple Souls' },
        { item_name: 'Water Temple Souls' },
        { item_name: 'Shadow Temple Souls' },
        { item_name: 'Spirit Temple Souls' },
        { item_name: 'Bottom of the Well Souls' },
        { item_name: 'Ice Cavern Souls' },
        { item_name: 'Gerudo Training Ground Souls' },
        { item_name: 'Ganons Castle Souls' },
        { item_name: 'Forest Area Souls' },
        { item_name: 'Hyrule Field Souls' },
        { item_name: 'Lake Hylia Souls' },
        { item_name: 'Gerudo Area Souls' },
        { item_name: 'Market Area Souls' },
        { item_name: 'Kakariko Area Souls' },
        { item_name: 'Goron Area Souls' },
        { item_name: 'Zora Area Souls' },
        { item_name: 'Lon Lon Ranch Souls' },
        { item_name: 'Grottos Souls' },
    ],
}