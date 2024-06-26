import { MouseEventHandler } from "react";
import OotIcon, { IconData, IconDict } from "./OotIcon";
import ContextMenuHandlerWithArgs from "./ContextMenuHandlerWithArgs";
import MusicNote from "./MusicNote";
import InvertedMusicNote from "./InvertedMusicNote";

export interface OotItemIconProps {
    itemName: string,
    price?: number | null,
    sourceLocation?: string | null,
    className?: string,
    onClick?: MouseEventHandler,
    handleContextMenu?: ContextMenuHandlerWithArgs,
    subscript?: string | null,
    subscriptStyle?: object,
    leftSubStyle?: object,
    topRightStyle?: object,
    topLeftStyle?: object,
    centerLabel?: string | null,
    leftLabel?: string | null,
    topLeftLabel?: string | null,
    topRightLabel?: string | null,
    fade?: boolean,
    fadeLabels?: boolean,
    hideLabels?: boolean,
}

type KeyTextDict = {
    [key: string]: string;
}

const keyMap: KeyTextDict = {
    // Shared between keys, silver rupees, and souls
    'Deku Tree': 'DT',
    'Dodongos Cavern': 'DC',
    'Jabu Jabus Belly': 'JJ',
    'Forest Temple': 'Fo',
    'Fire Temple': 'Fi',
    'Water Temple': 'Wa',
    'Spirit Temple': 'Sp',
    'Shadow Temple': 'Sh',
    'Ganons Castle': 'GC',
    'Bottom of the Well': 'We',
    'Ice Cavern': 'Ice',
    'Gerudo Training Ground': 'GTG',
    'Thieves Hideout': 'Hi',
    'Treasure Chest Game': 'TCG',
    '???': '?',
    // Regional souls only
    'Forest Area': 'KF',
    'Hyrule Field': 'HF',
    'Lake Hylia': 'La',
    'Gerudo Area': 'Ge',
    'Market': 'Ma',
    'Kakariko': 'Kak',
    'Goron Area': 'Go',
    'Zora Area': 'Zo',
    'Lon Lon Ranch': 'LLR',
    'Grottos': 'Gr',
};

const itemMap: IconDict = {
    'Deku Stick Capacity': { img: '/images/OoT_Deku_Stick_Icon.png' },
    'Deku Nut Capacity': { img: '/images/OoT_Deku_Nut_Icon.png' },
    'Bomb Bag': { img: '/images/OoT_Bomb_Bag_Icon.png' },
    'Bow': { img: '/images/OoT_Fairy_Bow_Icon.png' },
    'Fire Arrows': { img: '/images/OoT_Fire_Arrow_Icon.png' },
    'Dins Fire': { img: '/images/OoT_Dins_Fire_Icon.png' },
    'Kokiri Sword': { img: '/images/OoT_Kokiri_Sword_Icon.png' },
    'Master Sword': { img: '/images/OoT_Master_Sword_Icon.png' },
    'Giants Knife': { img: '/images/OoT_Giants_Knife_Icon.png' },
    'Biggoron Sword': { img: '/images/OoT_Giants_Knife_Icon.png' },
    'Slingshot': { img: '/images/OoT_Fairy_Slingshot_Icon.png' },
    'Ocarina': { img: '/images/OoT_Fairy_Ocarina_Icon.png' },
    'Ocarina of Time': { img: '/images/OoT_Ocarina_of_Time_Icon.png' },
    'Bombchus': { img: '/images/OoT_Bombchu_Icon.png' },
    'Bombchus (5)': { img: '/images/OoT_Bombchu_Icon.png' },
    'Bombchus (10)': { img: '/images/OoT_Bombchu_Icon.png' },
    'Bombchus (20)': { img: '/images/OoT_Bombchu_Icon.png' },
    'Progressive Hookshot': { img: '/images/OoT_Hookshot_Icon.png' },
    'Hookshot': { img: '/images/OoT_Hookshot_Icon.png' },
    'Longshot': { img: '/images/OoT_Longshot_Icon.png' },
    'Ice Arrows': { img: '/images/OoT_Ice_Arrow_Icon.png', rSub: 'Ice' },
    'Blue Fire Arrows': { img: '/images/OoT_Ice_Arrow_Icon.png', rSub: 'BF' },
    'Blue Arrows': { img: '/images/OoT_Ice_Arrow_Icon.png' },
    'Farores Wind': { img: '/images/OoT_Farores_Wind_Icon.png' },
    'Deku Shield': { img: '/images/OoT_Deku_Shield_Icon.png' },
    'Hylian Shield': { img: '/images/OoT_Hylian_Shield_Icon.png' },
    'Mirror Shield': { img: '/images/OoT_Mirror_Shield_Icon.png' },
    'Boomerang': { img: '/images/OoT_Boomerang_Icon.png' },
    'Lens of Truth': { img: '/images/OoT_Lens_of_Truth_Icon.png' },
    'Magic Bean Pack': { img: '/images/OoT_Magic_Bean_Icon.png', rSub: "10" },
    'Magic Bean': { img: '/images/OoT_Magic_Bean_Icon.png', rSub: "1" },
    'Buy Magic Bean': { img: '/images/OoT_Magic_Bean_Icon.png' },
    'Megaton Hammer': { img: '/images/OoT_Megaton_Hammer_Icon.png' },
    'Light Arrows': { img: '/images/OoT_Light_Arrow_Icon.png' },
    'Nayrus Love': { img: '/images/OoT_Nayrus_Love_Icon.png' },
    'Progressive Strength Upgrade': { img: '/images/OoT_Gorons_Bracelet_Icon.png' },
    'Goron Bracelet': { img: '/images/OoT_Gorons_Bracelet_Icon.png' },
    'Silver Gauntlets': { img: '/images/OoT_Silver_Gauntlets_Icon.png' },
    'Gold Gauntlets': { img: '/images/OoT_Golden_Gauntlets_Icon.png' },
    'Goron Tunic': { img: '/images/OoT_Goron_Tunic_Icon.png', rSub: 'G' },
    'Zora Tunic': { img: '/images/OoT_Zora_Tunic_Icon.png', rSub: 'Z' },
    'Bottle': { img: '/images/OoT_Bottle_Icon.png' },
    'Adult Trade Item': { img: '/images/OoT_Cojiro_Icon.png' },
    'Child Trade Item': { img: '/images/OoT_Cucco_Icon.png' },
    'Progressive Scale': { img: '/images/OoT_Silver_Scale_Icon.png' },
    'Silver Scale': { img: '/images/OoT_Silver_Scale_Icon.png' },
    'Gold Scale': { img: '/images/OoT_Golden_Scale_Icon.png' },
    'Iron Boots': { img: '/images/OoT_Iron_Boots_Icon.png' },
    'Hover Boots': { img: '/images/OoT_Hover_Boots_Icon.png' },
    'Zeldas Lullaby': { img: MusicNote, rSub: 'Z', imgClass: 'redNote' },
    'Eponas Song': { img: MusicNote, rSub: 'E', imgClass: 'orangeNote' },
    'Sarias Song': { img: MusicNote, rSub: 'S', imgClass: 'greenNote' },
    'Suns Song': { img: MusicNote, rSub: 'S', imgClass: 'yellowNote' },
    'Song of Time': { img: MusicNote, rSub: 'T', imgClass: 'blueNote' },
    'Song of Storms': { img: MusicNote, rSub: 'S', imgClass: 'purpleNote' },
    'Song': { img: MusicNote, imgClass: 'greyNote' },
    'Progressive Wallet': { img: '/images/OoT_Adults_Wallet_Icon.png' },
    'Magic Meter': { img: '/images/OoT_Small_Magic_Jar_Icon.png' },
    'Gold Skulltula Token': { img: '/images/Gold_Skulltula_Token_Icon.png' },
    'Minuet of Forest': { img: InvertedMusicNote, rSub: 'M', imgClass: 'greenNote' },
    'Bolero of Fire': { img: InvertedMusicNote, rSub: 'B', imgClass: 'redNote' },
    'Serenade of Water': { img: InvertedMusicNote, rSub: 'W', imgClass: 'blueNote' },
    'Requiem of Spirit': { img: InvertedMusicNote, rSub: 'R', imgClass: 'orangeNote' },
    'Nocturne of Shadow': { img: InvertedMusicNote, rSub: 'N', imgClass: 'purpleNote' },
    'Prelude of Light': { img: InvertedMusicNote, rSub: 'P', imgClass: 'yellowNote' },
    'Warp Song': { img: InvertedMusicNote, imgClass: 'purpleNote' },
    'Gerudo Membership Card': { img: '/images/OoT_Gerudo_Token_Icon.png' },
    'Stone of Agony': { img: '/images/OoT_Stone_of_Agony_Icon.png' },
    'Triforce Piece': { img: '/images/OoT_Triforce.png' },
    'Rutos Letter': { img: '/images/OoT_Letter_Icon.png' },
    'Bottle with Big Poe': { img: '/images/OoT_Big_Poe_Soul_Icon.png' },
    'Map (Deku Tree)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Deku Tree'] },
    'Map (Dodongos Cavern)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Dodongos Cavern'] },
    'Map (Jabu Jabus Belly)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Jabu Jabus Belly'] },
    'Map (Forest Temple)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Forest Temple'] },
    'Map (Fire Temple)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Fire Temple'] },
    'Map (Water Temple)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Water Temple'] },
    'Map (Spirit Temple)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Spirit Temple'] },
    'Map (Shadow Temple)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Shadow Temple'] },
    'Map (Ganons Castle)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Ganons Castle'] },
    'Map (Bottom of the Well)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Bottom of the Well'] },
    'Map (Ice Cavern)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['Ice Cavern'] },
    'Map (???)': { img: '/images/OoT_Dungeon_Map_Icon.png', rSub: keyMap['???'] },
    'Map': { img: '/images/OoT_Dungeon_Map_Icon.png' },
    'Compass (Deku Tree)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Deku Tree'] },
    'Compass (Dodongos Cavern)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Dodongos Cavern'] },
    'Compass (Jabu Jabus Belly)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Jabu Jabus Belly'] },
    'Compass (Forest Temple)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Forest Temple'] },
    'Compass (Fire Temple)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Fire Temple'] },
    'Compass (Water Temple)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Water Temple'] },
    'Compass (Spirit Temple)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Spirit Temple'] },
    'Compass (Shadow Temple)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Shadow Temple'] },
    'Compass (Ganons Castle)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Ganons Castle'] },
    'Compass (Bottom of the Well)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Bottom of the Well'] },
    'Compass (Ice Cavern)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['Ice Cavern'] },
    'Compass (???)': { img: '/images/OoT_Compass_Icon.png', rSub: keyMap['???'] },
    'Compass': { img: '/images/OoT_Compass_Icon.png' },
    'Small Key (Forest Temple)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Forest Temple'] },
    'Small Key (Fire Temple)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Fire Temple'] },
    'Small Key (Water Temple)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Water Temple'] },
    'Small Key (Spirit Temple)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Spirit Temple'] },
    'Small Key (Shadow Temple)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Shadow Temple'] },
    'Small Key (Ganons Castle)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Ganons Castle'] },
    'Small Key (Bottom of the Well)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Bottom of the Well'] },
    'Small Key (Gerudo Training Ground)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Gerudo Training Ground'] },
    'Small Key (Thieves Hideout)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Thieves Hideout'] },
    'Small Key (Treasure Chest Game)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['Treasure Chest Game'] },
    'Small Key (???)': { img: '/images/OoT_Small_Key_Icon.png', rSub: keyMap['???'] },
    'Small Key': { img: '/images/OoT_Small_Key_Icon.png' },
    'Small Key Ring (Forest Temple)': { img: '/images/keyring.png', rSub: keyMap['Forest Temple'] },
    'Small Key Ring (Fire Temple)': { img: '/images/keyring.png', rSub: keyMap['Fire Temple'] },
    'Small Key Ring (Water Temple)': { img: '/images/keyring.png', rSub: keyMap['Water Temple'] },
    'Small Key Ring (Spirit Temple)': { img: '/images/keyring.png', rSub: keyMap['Spirit Temple'] },
    'Small Key Ring (Shadow Temple)': { img: '/images/keyring.png', rSub: keyMap['Shadow Temple'] },
    'Small Key Ring (Ganons Castle)': { img: '/images/keyring.png', rSub: keyMap['Ganons Castle'] },
    'Small Key Ring (Bottom of the Well)': { img: '/images/keyring.png', rSub: keyMap['Bottom of the Well'] },
    'Small Key Ring (Gerudo Training Ground)': { img: '/images/keyring.png', rSub: keyMap['Gerudo Training Ground'] },
    'Small Key Ring (Thieves Hideout)': { img: '/images/keyring.png', rSub: keyMap['Thieves Hideout'] },
    'Small Key Ring (Treasure Chest Game)': { img: '/images/keyring.png', rSub: keyMap['Treasure Chest Game'] },
    'Small Key Ring (???)': { img: '/images/keyring.png', rSub: keyMap['???'] },
    'Small Key Ring': { img: '/images/keyring.png' },
    'Boss Key (Forest Temple)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['Forest Temple'] },
    'Boss Key (Fire Temple)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['Fire Temple'] },
    'Boss Key (Water Temple)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['Water Temple'] },
    'Boss Key (Spirit Temple)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['Spirit Temple'] },
    'Boss Key (Shadow Temple)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['Shadow Temple'] },
    'Boss Key (Ganons Castle)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['Ganons Castle'] },
    'Boss Key (???)': { img: '/images/OoT_Boss_Key_Icon.png', rSub: keyMap['???'] },
    'Boss Key': { img: '/images/OoT_Boss_Key_Icon.png' },
    'Green Rupee': { img: '/images/Green_Rupee.png' },
    'Blue Rupee': { img: '/images/Blue_Rupee.png' },
    'Red Rupee': { img: '/images/Red_Rupee.png' },
    'Purple Rupee': { img: '/images/Purple_Rupee.png' },
    'Arrows': { img: '/images/OoT_Arrows_Icon.png' },
    'Deku Seeds': { img: '/images/OoT_Deku_Seeds_Icon.png' },
    'Bombs': { img: '/images/OoT_Bomb_Icon.png' },
    'Deku Stick': { img: '/images/OoT_Deku_Stick_Icon.png' },
    'Blue Fire': { img: '/images/OoT_Blue_Fire_Icon.png' },
    'Piece of Heart': { img: '/images/OoT_Piece_of_Heart_Icon.png' },
    'Piece of Heart (Treasure Chest Game)': { img: '/images/OoT_Piece_of_Heart_Icon.png' },
    'Heart Container': { img: '/images/OoT_Heart_Container_Icon.png' },
    'Weird Egg': { img: '/images/OoT_Weird_Egg_Icon.png', rSub: 'C' },
    'Chicken': { img: '/images/OoT_Cucco_Icon.png', rSub: 'C' },
    'Zeldas Letter': { img: '/images/OoT_Zeldas_Letter_Icon.png' },
    'Keaton Mask': { img: '/images/OoT_Keaton_Mask_Icon.png' },
    'Skull Mask': { img: '/images/OoT_Skull_Mask_Icon.png' },
    'Spooky Mask': { img: '/images/OoT_Spooky_Mask_Icon.png' },
    'Bunny Hood': { img: '/images/OoT_Bunny_Hood_Icon.png' },
    'Mask of Truth': { img: '/images/OoT_Mask_of_Truth_Icon.png' },
    'Gerudo Mask': { img: '/images/OoT_Gerudo_Mask_Icon.png' },
    'Goron Mask': { img: '/images/OoT_Goron_Mask_Icon.png' },
    'Zora Mask': { img: '/images/OoT_Zora_Mask_Icon.png' },
    'Pocket Egg': { img: '/images/OoT_Weird_Egg_Icon.png', rSub: 'A' },
    'Pocket Cucco': { img: '/images/OoT_Cucco_Icon.png', rSub: 'A' },
    'Cojiro': { img: '/images/OoT_Cojiro_Icon.png' },
    'Odd Mushroom': { img: '/images/OoT_Odd_Mushroom_Icon.png' },
    'Odd Potion': { img: '/images/OoT_Odd_Potion_Icon.png' },
    'Poachers Saw': { img: '/images/OoT_Poachers_Saw_Icon.png' },
    'Broken Sword': { img: '/images/OoT_Broken_Gorons_Sword_Icon.png' },
    'Prescription': { img: '/images/OoT_Prescription_Icon.png' },
    'Eyeball Frog': { img: '/images/OoT_Eyeball_Frog_Icon.png' },
    'Eyedrops': { img: '/images/OoT_Worlds_Finest_Eye_Drops_Icon.png' },
    'Claim Check': { img: '/images/OoT_Claim_Check_Icon.png' },
    'Kokiri Emerald': { img: '/images/rewards/kokiri_emerald.png' },
    'Goron Ruby': { img: '/images/rewards/goron_ruby.png' },
    'Zora Sapphire': { img: '/images/rewards/zora_sapphire.png' },
    'Forest Medallion': { img: '/images/rewards/forest_medallion.png' },
    'Fire Medallion': { img: '/images/rewards/fire_medallion.png' },
    'Water Medallion': { img: '/images/rewards/water_medallion.png' },
    'Spirit Medallion': { img: '/images/rewards/spirit_medallion.png' },
    'Shadow Medallion': { img: '/images/rewards/shadow_medallion.png' },
    'Light Medallion': { img: '/images/rewards/light_medallion.png' },
    'Silver Rupee (Dodongos Cavern Staircase)': { img: '/images/silver_rupee_vertical.png', rSub: 'DC', text: 'Staircase' },
    'Silver Rupee (Dodongos Cavern)': { img: '/images/silver_rupee_vertical.png', rSub: 'DC' },
    'Silver Rupee (Ice Cavern Spinning Scythe)': { img: '/images/silver_rupee_vertical.png', rSub: 'Ice', text: 'Spinning Scythe' },
    'Silver Rupee (Ice Cavern Push Block)': { img: '/images/silver_rupee_vertical.png', rSub: 'Ice', text: 'Push Block' },
    'Silver Rupee (Ice Cavern)': { img: '/images/silver_rupee_vertical.png', rSub: 'Ice' },
    'Silver Rupee (Bottom of the Well Basement)': { img: '/images/silver_rupee_vertical.png', rSub: 'We', text: 'Basement' },
    'Silver Rupee (Bottom of the Well)': { img: '/images/silver_rupee_vertical.png', rSub: 'We' },
    'Silver Rupee (Shadow Temple Scythe Shortcut)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sh', text: 'Scythe Shortcut' },
    'Silver Rupee (Shadow Temple Invisible Blades)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sh', text: 'Invisible Blades' },
    'Silver Rupee (Shadow Temple Huge Pit)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sh', text: 'Huge Pit' },
    'Silver Rupee (Shadow Temple Invisible Spikes)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sh', text: 'Invisible Spikes' },
    'Silver Rupee (Shadow Temple)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sh' },
    'Silver Rupee (Gerudo Training Ground Slopes)': { img: '/images/silver_rupee_vertical.png', rSub: 'GTG', text: 'Slopes' },
    'Silver Rupee (Gerudo Training Ground Lava)': { img: '/images/silver_rupee_vertical.png', rSub: 'GTG', text: 'Lava' },
    'Silver Rupee (Gerudo Training Ground Water)': { img: '/images/silver_rupee_vertical.png', rSub: 'GTG', text: 'Water' },
    'Silver Rupee (Gerudo Training Ground)': { img: '/images/silver_rupee_vertical.png', rSub: 'GTG' },
    'Silver Rupee (Spirit Temple Child Early Torches)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sp', text: 'Early Torches' },
    'Silver Rupee (Spirit Temple Adult Boulders)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sp', text: 'Adult Boulders' },
    'Silver Rupee (Spirit Temple Lobby and Lower Adult)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sp', text: 'Lobby' },
    'Silver Rupee (Spirit Temple Sun Block)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sp', text: 'Sun Block' },
    'Silver Rupee (Spirit Temple Adult Climb)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sp', text: 'Adult Climb' },
    'Silver Rupee (Spirit Temple)': { img: '/images/silver_rupee_vertical.png', rSub: 'Sp' },
    'Silver Rupee (Ganons Castle Spirit Trial)': { img: '/images/silver_rupee_vertical.png', rSub: 'SpT', text: 'Spirit Trial' },
    'Silver Rupee (Ganons Castle Light Trial)': { img: '/images/silver_rupee_vertical.png', rSub: 'LiT', text: 'Light Trial' },
    'Silver Rupee (Ganons Castle Fire Trial)': { img: '/images/silver_rupee_vertical.png', rSub: 'FiT', text: 'Fire Trial' },
    'Silver Rupee (Ganons Castle Shadow Trial)': { img: '/images/silver_rupee_vertical.png', rSub: 'ShT', text: 'Shadow Trial' },
    'Silver Rupee (Ganons Castle Water Trial)': { img: '/images/silver_rupee_vertical.png', rSub: 'WaT', text: 'Water Trial' },
    'Silver Rupee (Ganons Castle Forest Trial)': { img: '/images/silver_rupee_vertical.png', rSub: 'FoT', text: 'Forest Trial' },
    'Silver Rupee (Ganons Castle)': { img: '/images/silver_rupee_vertical.png', rSub: 'GC' },
    'Silver Rupee (???)': { img: '/images/silver_rupee_vertical.png', rSub: '?', text: '???' },
    'Silver Rupee': { img: '/images/silver_rupee_vertical.png' },
    'Silver Rupee Pouch (Dodongos Cavern Staircase)': { img: '/images/silver_rupee_pouch.png', rSub: 'DC', text: 'Staircase' },
    'Silver Rupee Pouch (Dodongos Cavern)': { img: '/images/silver_rupee_pouch.png', rSub: 'DC' },
    'Silver Rupee Pouch (Ice Cavern Spinning Scythe)': { img: '/images/silver_rupee_pouch.png', rSub: 'Ice', text: 'Spinning Scythe' },
    'Silver Rupee Pouch (Ice Cavern Push Block)': { img: '/images/silver_rupee_pouch.png', rSub: 'Ice', text: 'Push Block' },
    'Silver Rupee Pouch (Ice Cavern)': { img: '/images/silver_rupee_pouch.png', rSub: 'Ice' },
    'Silver Rupee Pouch (Bottom of the Well Basement)': { img: '/images/silver_rupee_pouch.png', rSub: 'We', text: 'Basement' },
    'Silver Rupee Pouch (Bottom of the Well)': { img: '/images/silver_rupee_pouch.png', rSub: 'We' },
    'Silver Rupee Pouch (Shadow Temple Scythe Shortcut)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sh', text: 'Scythe Shortcut' },
    'Silver Rupee Pouch (Shadow Temple Invisible Blades)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sh', text: 'Invisible Blades' },
    'Silver Rupee Pouch (Shadow Temple Huge Pit)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sh', text: 'Huge Pit' },
    'Silver Rupee Pouch (Shadow Temple Invisible Spikes)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sh', text: 'Invisible Spikes' },
    'Silver Rupee Pouch (Shadow Temple)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sh' },
    'Silver Rupee Pouch (Gerudo Training Ground Slopes)': { img: '/images/silver_rupee_pouch.png', rSub: 'GTG', text: 'Slopes' },
    'Silver Rupee Pouch (Gerudo Training Ground Lava)': { img: '/images/silver_rupee_pouch.png', rSub: 'GTG', text: 'Lava' },
    'Silver Rupee Pouch (Gerudo Training Ground Water)': { img: '/images/silver_rupee_pouch.png', rSub: 'GTG', text: 'Water' },
    'Silver Rupee Pouch (Gerudo Training Ground)': { img: '/images/silver_rupee_pouch.png', rSub: 'GTG' },
    'Silver Rupee Pouch (Spirit Temple Child Early Torches)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sp', text: 'Early Torches' },
    'Silver Rupee Pouch (Spirit Temple Adult Boulders)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sp', text: 'Adult Boulders' },
    'Silver Rupee Pouch (Spirit Temple Lobby and Lower Adult)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sp', text: 'Lobby' },
    'Silver Rupee Pouch (Spirit Temple Sun Block)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sp', text: 'Sun Block' },
    'Silver Rupee Pouch (Spirit Temple Adult Climb)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sp', text: 'Adult Climb' },
    'Silver Rupee Pouch (Spirit Temple)': { img: '/images/silver_rupee_pouch.png', rSub: 'Sp' },
    'Silver Rupee Pouch (Ganons Castle Spirit Trial)': { img: '/images/silver_rupee_pouch.png', rSub: 'SpT', text: 'Spirit Trial' },
    'Silver Rupee Pouch (Ganons Castle Light Trial)': { img: '/images/silver_rupee_pouch.png', rSub: 'LiT', text: 'Light Trial' },
    'Silver Rupee Pouch (Ganons Castle Fire Trial)': { img: '/images/silver_rupee_pouch.png', rSub: 'FiT', text: 'Fire Trial' },
    'Silver Rupee Pouch (Ganons Castle Shadow Trial)': { img: '/images/silver_rupee_pouch.png', rSub: 'ShT', text: 'Shadow Trial' },
    'Silver Rupee Pouch (Ganons Castle Water Trial)': { img: '/images/silver_rupee_pouch.png', rSub: 'WaT', text: 'Water Trial' },
    'Silver Rupee Pouch (Ganons Castle Forest Trial)': { img: '/images/silver_rupee_pouch.png', rSub: 'FoT', text: 'Forest Trial' },
    'Silver Rupee Pouch (Ganons Castle)': { img: '/images/silver_rupee_pouch.png', rSub: 'GC' },
    'Silver Rupee Pouch (???)': { img: '/images/silver_rupee_pouch.png', rSub: '?', text: '???' },
    'Silver Rupee Pouch': { img: '/images/silver_rupee_pouch.png' },
    'Ocarina A Button': { img: '/images/ocarina_a.blue.png' },
    'Ocarina C up Button': { img: '/images/ocarina_c_up.yellow.png' },
    'Ocarina C down Button': { img: '/images/ocarina_c_down.yellow.png' },
    'Ocarina C right Button': { img: '/images/ocarina_c_right.yellow.png' },
    'Ocarina C left Button': { img: '/images/ocarina_c_left.yellow.png' },

    // Individual souls
    'Stalfos Soul': { img: '/images/souls/stalfos_32x32.png' },
    'Octorok Soul': { img: '/images/souls/octorok_32x32.png' },
    'Wallmaster Soul': { img: '/images/souls/wallmaster_32x32.png' },
    'Dodongo Soul': { img: '/images/souls/dodongo_32x32.png' },
    'Keese Soul': { img: '/images/souls/keese_32x32.png' },
    'Tektite Soul': { img: '/images/souls/tektite_32x32.png' },
    'Peahat Soul': { img: '/images/souls/peahat_32x32.png' },
    'Lizalfos and Dinalfos Soul': { img: '/images/souls/lizalfos_32x32.png' },
    'Gohma Larvae Soul': { img: '/images/souls/gohma-larva_32x32.png' },
    'Shabom Soul': { img: '/images/souls/shabom_32x32.png' },
    'Baby Dodongo Soul': { img: '/images/souls/baby-dodongo_32x32.png' },
    'Biri and Bari Soul': { img: '/images/souls/biri_32x32.png' },
    'Tailpasaran Soul': { img: '/images/souls/tailpasaran_32x32.png' },
    'Skulltula Soul': { img: '/images/souls/skulltula_32x32.png' },
    'Torch Slug Soul': { img: '/images/souls/torch-slug_32x32.png' },
    'Moblin Soul': { img: '/images/souls/moblin_32x32.png' },
    'Armos Soul': { img: '/images/souls/armos_32x32.png' },
    'Deku Baba Soul': { img: '/images/souls/deku-baba_32x32.png' },
    'Deku Scrub Soul': { img: '/images/souls/deku-scrub_32x32.png' },
    'Bubble Soul': { img: '/images/souls/bubble_32x32.png' },
    'Beamos Soul': { img: '/images/souls/beamos_32x32.png' },
    'Floormaster Soul': { img: '/images/souls/floormaster_32x32.png' },
    'Redead and Gibdo Soul': { img: '/images/souls/redead_32x32.png' },
    'Skullwalltula Soul': { img: '/images/souls/skullwalltula_32x32.png' },
    'Flare Dancer Soul': { img: '/images/souls/flare-dancer_32x32.png' },
    'Dead hand Soul': { img: '/images/souls/dead-hand_32x32.png' },
    'Shell blade Soul': { img: '/images/souls/shell-blade_32x32.png' },
    'Like-like Soul': { img: '/images/souls/like-like_32x32.png' },
    'Spike Enemy Soul': { img: '/images/souls/spike_32x32.png' },
    'Anubis Soul': { img: '/images/souls/anubis_32x32.png' },
    'Iron Knuckle Soul': { img: '/images/souls/iron-knuckle_32x32.png' },
    'Skull Kid Soul': { img: '/images/souls/skull-kid_32x32.png' },
    'Flying Pot Soul': { img: '/images/souls/flying-pot_32x32.png' },
    'Freezard Soul': { img: '/images/souls/freezard_32x32.png' },
    'Stinger Soul': { img: '/images/souls/stinger_32x32.png' },
    'Wolfos Soul': { img: '/images/souls/wolfos_32x32.png' },
    'Guay Soul': { img: '/images/souls/guay_32x32.png' },
    'Jabu Jabu Tentacle Soul': { img: '/images/souls/parasitic-tentacle_32x32.png' },
    'Dark Link Soul': { img: '/images/souls/dark-link_32x32.png' },
    'Queen Gohma Soul': { img: '/images/souls/queen-gohma_32x32.png' },
    'King Dodongo Soul': { img: '/images/souls/king-dodongo_32x32.png' },
    'Barinade Soul': { img: '/images/souls/barinade_32x32.png' },
    'Phantom Ganon Soul': { img: '/images/souls/phantom_ganon_32x32.png' },
    'Volvagia Soul': { img: '/images/souls/volvagia_32x32.png' },
    'Morpha Soul': { img: '/images/souls/morpha_32x32.png' },
    'Bongo Bongo Soul': { img: '/images/souls/bongo-bongo_32x32.png' },
    'Twinrova Soul': { img: '/images/souls/twinrova_32x32.png' },
    'Soul': { img: '/images/Soul_Icon.png' },
    'Soul (???)': { img: '/images/Soul_Icon.png', rSub: '?' },

    // Regional souls
    'Deku Tree Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Deku Tree'] },
    'Dodongos Cavern Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Dodongos Cavern'] },
    'Jabu Jabus Belly Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Jabu Jabus Belly'] },
    'Forest Temple Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Forest Temple'] },
    'Fire Temple Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Fire Temple'] },
    'Water Temple Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Water Temple'] },
    'Shadow Temple Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Shadow Temple'] },
    'Spirit Temple Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Spirit Temple'] },
    'Bottom of the Well Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Bottom of the Well'] },
    'Ice Cavern Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Ice Cavern'] },
    'Gerudo Training Ground Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Gerudo Training Ground'] },
    'Ganons Castle Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Ganons Castle'] },
    'Forest Area Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Forest Area'] },
    'Hyrule Field Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Hyrule Field'] },
    'Lake Hylia Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Lake Hylia'] },
    'Gerudo Area Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Gerudo Area'] },
    'Market Area Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Market'] },
    'Kakariko Area Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Kakariko'] },
    'Goron Area Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Goron Area'] },
    'Zora Area Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Zora Area'] },
    'Lon Lon Ranch Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Lon Lon Ranch'] },
    'Grottos Souls': { img: '/images/Soul_Icon.png', rSub: keyMap['Grottos'] },

    'Fishing Rod': { img: '/images/OoT_Fishing_Pole_Icon.png' },
    'Fish (Child 6 lb)': { img: '/images/fish.png', rSub: '6', lSub: 'C' },
    'Fish (Child 8 lb)': { img: '/images/fish.png', rSub: '8', lSub: 'C' },
    'Fish (Child 10 lb)': { img: '/images/fish.png', rSub: '10', lSub: 'C' },
    'Fish (Adult 10 lb)': { img: '/images/fish.png', rSub: '10', lSub: 'A' },
    'Fish (Adult 12 lb)': { img: '/images/fish.png', rSub: '12', lSub: 'A' },
    'Fish (Adult 16 lb)': { img: '/images/fish.png', rSub: '16', lSub: 'A' },
    'Hylian Loach': { img: '/images/fish.png', rSub: 'L' },

    // Additional icons for path hints linked to locations
    'Queen Gohma': { img: '/images/souls/queen-gohma_32x32.png' },
    'King Dodongo': { img: '/images/souls/king-dodongo_32x32.png' },
    'Barinade': { img: '/images/souls/barinade_32x32.png' },
    'Phantom Ganon': { img: '/images/souls/phantom_ganon_32x32.png' },
    'Volvagia': { img: '/images/souls/volvagia_32x32.png' },
    'Morpha': { img: '/images/souls/morpha_32x32.png' },
    'Bongo Bongo': { img: '/images/souls/bongo-bongo_32x32.png' },
    'Twinrova': { img: '/images/souls/twinrova_32x32.png' },
    'Ganons Tower Boss Key Chest': { img: '/images/trial_seed.png' },
    'Ganon': { img: '/images/ganon.png' },

    'Buy Deku Nut (5)': { img: '/images/OoT_Deku_Nut_Icon.png' },
    'Buy Arrows (30)': { img: '/images/OoT_Arrows_Icon.png' },
    'Buy Arrows (50)': { img: '/images/OoT_Arrows_Icon.png' },
    'Buy Bombs (5) for 25 Rupees': { img: '/images/OoT_Bomb_Icon.png' },
    'Buy Deku Nut (10)': { img: '/images/OoT_Deku_Nut_Icon.png' },
    'Buy Deku Stick (1)': { img: '/images/OoT_Deku_Stick_Icon.png' },
    'Buy Bombs (10)': { img: '/images/OoT_Bomb_Icon.png' },
    'Buy Fish': { img: '/images/OoT_Fish_Icon.png' },
    'Buy Red Potion for 30 Rupees': { img: '/images/OoT_Red_Potion_Icon.png' },
    'Buy Green Potion': { img: '/images/OoT_Green_Potion_Icon.png' },
    'Buy Blue Potion': { img: '/images/OoT_Blue_Potion_Icon.png' },
    'Buy Hylian Shield': { img: '/images/OoT_Hylian_Shield_Icon.png' },
    'Buy Deku Shield': { img: '/images/OoT_Deku_Shield_Icon.png' },
    'Buy Goron Tunic': { img: '/images/OoT_Goron_Tunic_Icon.png' },
    'Buy Zora Tunic': { img: '/images/OoT_Zora_Tunic_Icon.png' },
    'Buy Bombchu (10)': { img: '/images/OoT_Bombchu_Icon.png' },
    'Buy Bombchu (20)': { img: '/images/OoT_Bombchu_Icon.png' },
    'Buy Bombchu (5)': { img: '/images/OoT_Bombchu_Icon.png' },
    'Buy Deku Seeds (30)': { img: '/images/OoT_Deku_Seeds_Icon.png' },
    'Buy Blue Fire': { img: '/images/OoT_Blue_Fire_Icon.png' },
    'Buy Bottle Bug': { img: '/images/OoT_Bug_Icon.png' },
    'Buy Poe': { img: '/images/OoT_Poe_Soul_Icon.png' },
    'Buy Fairy\'s Spirit': { img: '/images/OoT_Fairy_Icon.png' },
    'Buy Arrows (10)': { img: '/images/OoT_Arrows_Icon.png' },
    'Buy Bombs (20)': { img: '/images/OoT_Bomb_Icon.png' },
    'Buy Bombs (30)': { img: '/images/OoT_Bomb_Icon.png' },
    'Buy Bombs (5) for 35 Rupees': { img: '/images/OoT_Bomb_Icon.png' },
    'Buy Red Potion for 40 Rupees': { img: '/images/OoT_Red_Potion_Icon.png' },
    'Buy Red Potion for 50 Rupees': { img: '/images/OoT_Red_Potion_Icon.png' },
    'Buy Heart': { img: '/images/OoT_Heart_Icon.png' },
    'Rupees (200)': { img: '/images/Yellow_Rupee.png' },
    'Rupee (1)': { img: '/images/Green_Rupee.png' },
    'Rupees (5)': { img: '/images/Blue_Rupee.png' },
    'Rupees (20)': { img: '/images/Red_Rupee.png' },
    'Rupees (50)': { img: '/images/Purple_Rupee.png' },
    'Rupee (Treasure Chest Game) (1)': { img: '/images/Green_Rupee.png' },
    'Rupees (Treasure Chest Game) (5)': { img: '/images/Blue_Rupee.png' },
    'Rupees (Treasure Chest Game) (20)': { img: '/images/Red_Rupee.png' },
    'Rupees (Treasure Chest Game) (50)': { img: '/images/Purple_Rupee.png' },
    'Arrows (5)': { img: '/images/OoT_Arrows_Icon.png' },
    'Arrows (10)': { img: '/images/OoT_Arrows_Icon.png' },
    'Arrows (30)': { img: '/images/OoT_Arrows_Icon.png' },
    'Deku Seeds (30)': { img: '/images/OoT_Deku_Seeds_Icon.png' },
    'Bombs (1)': { img: '/images/OoT_Bomb_Icon.png' },
    'Bombs (5)': { img: '/images/OoT_Bomb_Icon.png' },
    'Bombs (10)': { img: '/images/OoT_Bomb_Icon.png' },
    'Bombs (20)': { img: '/images/OoT_Bomb_Icon.png' },
    'Deku Stick (1)': { img: '/images/OoT_Deku_Stick_Icon.png' },
    'Deku Nuts (5)': { img: '/images/OoT_Deku_Nut_Icon.png' },
    'Deku Nuts (10)': { img: '/images/OoT_Deku_Nut_Icon.png' },
    'Red Potion': { img: '/images/OoT_Red_Potion_Icon.png' },
    'Green Potion': { img: '/images/OoT_Green_Potion_Icon.png' },
    'Blue Potion': { img: '/images/OoT_Blue_Potion_Icon.png' },
    'Milk': { img: '/images/OoT_Milk_Icon.png' },
    'Bottle with Milk': { img: '/images/OoT_Milk_Icon.png' },
    'Bottle with Red Potion': { img: '/images/OoT_Red_Potion_Icon.png' },
    'Bottle with Green Potion': { img: '/images/OoT_Green_Potion_Icon.png' },
    'Bottle with Blue Potion': { img: '/images/OoT_Blue_Potion_Icon.png' },
    'Bottle with Fairy': { img: '/images/OoT_Fairy_Icon.png' },
    'Bottle with Fish': { img: '/images/OoT_Fish_Icon.png' },
    'Bottle with Blue Fire': { img: '/images/OoT_Blue_Fire_Icon.png' },
    'Bottle with Bugs': { img: '/images/OoT_Bug_Icon.png' },
    'Bottle with Poe': { img: '/images/OoT_Poe_Soul_Icon.png' },
    'Recovery Heart': { img: '/images/OoT_Heart_Icon.png' },
    'Fairy Drop': { img: '/images/navi.png' },
    'Ice Trap': { img: '/images/icetrap.png' },
    'Double Defense': { img: '/images/double_defense.png' },
    'Scarecrow Song': { img: '/images/scarecrow.png' },
    'BlankSpace': { img: '/images/blank.png' },
    '?': { img: '/images/question_mark.png' },
};

export const haveOotItemIcon = (itemName: string) => {
    return Object.keys(itemMap).includes(itemName);
}

const OotItemIcon = ({
    itemName,
    price,
    sourceLocation,
    className,
    onClick,
    handleContextMenu,
    subscript,
    subscriptStyle,
    leftSubStyle,
    topRightStyle,
    topLeftStyle,
    centerLabel,
    leftLabel,
    topLeftLabel,
    topRightLabel,
    fade,
    fadeLabels,
    hideLabels,
}: OotItemIconProps) => {
    let imageData: IconData;
    if (price !== undefined && price !== null) {
        if (price < 100) {
            imageData = itemMap['Green Rupee'];
        } else if (price <= 200) {
            imageData = itemMap['Blue Rupee'];
        } else if (price <= 500) {
            imageData = itemMap['Red Rupee'];
        } else {
            imageData = itemMap['Purple Rupee'];
        }
    } else {
        imageData = itemMap[itemName];
    }
    if (!!imageData) {
        if (!!subscript) {
            imageData = Object.assign({}, imageData);
            imageData.rSub = subscript;
        }
        if (!!centerLabel) {
            imageData = Object.assign({}, imageData);
            imageData.cSub = centerLabel;
        }
        if (!!leftLabel) {
            imageData = Object.assign({}, imageData);
            imageData.lSub = leftLabel;
        }
        if (!!topLeftLabel) {
            imageData = Object.assign({}, imageData);
            imageData.lSuper = topLeftLabel;
        }
        if (!!topRightLabel) {
            imageData = Object.assign({}, imageData);
            imageData.rSuper = topRightLabel;
        }
        if (!!subscriptStyle) {
            imageData = Object.assign({}, imageData);
            imageData.rStyleOverride = Object.assign({}, subscriptStyle);
        }
        if (!!leftSubStyle) {
            imageData = Object.assign({}, imageData);
            imageData.lStyleOverride = Object.assign({}, leftSubStyle);
        }
        if (!!topRightStyle) {
            imageData = Object.assign({}, imageData);
            imageData.rSuperStyleOverride = Object.assign({}, topRightStyle);
        }
        if (!!topLeftStyle) {
            imageData = Object.assign({}, imageData);
            imageData.lSuperStyleOverride = Object.assign({}, topLeftStyle);
        }
        if (fade !== undefined) {
            imageData = Object.assign({}, imageData);
            imageData.fade = fade;
        }
        if (fadeLabels !== undefined) {
            imageData = Object.assign({}, imageData);
            imageData.fadeLabels = fadeLabels;
        }
        if (hideLabels !== undefined) {
            imageData = Object.assign({}, imageData);
            imageData.hideLabels = hideLabels;
        }
        return (
            <OotIcon
                itemName={itemName}
                sourceLocation={sourceLocation}
                className={className}
                onClick={onClick}
                handleContextMenu={handleContextMenu}
                imageData={imageData}
            />
        );
    } else {
        return null;
    }
}

export default OotItemIcon;