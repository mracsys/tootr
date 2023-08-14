import React from 'react';

export interface OotIconProps {
    itemName: string,
    className?: string,
    onClick?: () => void,
}

type KeyTextDict = {
    [key: string]: string;
}

type IconDict = {
    [key: string]: string;
}

const OotIcon = ({
    itemName,
    className,
    onClick,
}: OotIconProps) => {
    let iconMap: IconDict = {
        'Deku Stick Capacity': '/images/OoT_Deku_Stick_Icon.png',
        'Deku Nut Capacity': '/images/OoT_Deku_Nut_Icon.png',
        'Bomb Bag': '/images/OoT_Bomb_Icon.png',
        'Bow': '/images/OoT_Fairy_Bow_Icon.png',
        'Fire Arrows': '/images/OoT_Fire_Arrow_Icon.png',
        'Dins Fire': '/images/OoT_Dins_Fire_Icon.png',
        'Kokiri Sword': '/images/OoT_Kokiri_Sword_Icon.png',
        'Master Sword': '/images/OoT_Master_Sword_Icon.png',
        'Biggoron Sword': '/images/OoT_Giants_Knife_Icon.png',
        'Slingshot': '/images/OoT_Fairy_Slingshot_Icon.png',
        'Ocarina': '/images/OoT_Fairy_Ocarina_Icon.png',
        'Bombchu': '/images/OoT_Bombchu_Icon.png',
        'Progressive Hookshot': '/images/OoT_Hookshot_Icon.png',
        'Ice Arrows': '/images/OoT_Ice_Arrow_Icon.png',
        'Farores Wind': '/images/OoT_Farores_Wind_Icon.png',
        'Deku Shield': '/images/OoT_Deku_Shield_Icon.png',
        'Hylian Shield': '/images/OoT_Hylian_Shield_Icon.png',
        'Mirror Shield': '/images/OoT_Mirror_Shield_Icon.png',
        'Boomerang': '/images/OoT_Boomerang_Icon.png',
        'Lens of Truth': '/images/OoT_Lens_of_Truth_Icon.png',
        'Magic Beans': '/images/OoT_Magic_Bean_Icon.png',
        'Megaton Hammer': '/images/OoT_Megaton_Hammer_Icon.png',
        'Light Arrows': '/images/OoT_Light_Arrow_Icon.png',
        'Nayrus Love': '/images/OoT_Nayrus_Love_Icon.png',
        'Progressive Strength Upgrade': '/images/OoT_Gorons_Bracelet_Icon.png',
        'Goron Tunic': '/images/OoT_Goron_Tunic_Icon.png',
        'Zora Tunic': '/images/OoT_Zora_Tunic_Icon.png',
        'Bottle': '/images/OoT_Bottle_Icon.png',
        'Adult Trade Item': '/images/OoT_Cojiro_Icon.png',
        'Child Trade Item': '/images/OoT_Cucco_Icon.png',
        'Progressive Scale': '/images/OoT_Silver_Scale_Icon.png',
        'Iron Boots': '/images/OoT_Iron_Boots_Icon.png',
        'Hover Boots': '/images/OoT_Hover_Boots_Icon.png',
        'Zeldas Lullaby': '/images/Red_Note.png',
        'Eponas Song': '/images/Orange_Note.png',
        'Sarias Song': '/images/Green_Note.png',
        'Sun Song': '/images/Yellow_Note.png',
        'Song of Time': '/images/Blue_Note.png',
        'Song of Storms': '/images/Purple_Note.png',
        'Progressive Wallet': '/images/OoT_Adults_Wallet_Icon.png',
        'Magic Meter': '/images/OoT_Small_Magic_Jar_Icon.png',
        'Gold Skulltula Token': '/images/OoT_Token_Icon.png',
        'Minuet of Forest': '/images/Green_Note.png',
        'Bolero of Fire': '/images/Red_Note.png',
        'Serenade of Water': '/images/Blue_Note.png',
        'Requiem of Spirit': '/images/Orange_Note.png',
        'Nocturne of Shadow': '/images/Purple_Note.png',
        'Prelude of Light': '/images/Yellow_Note.png',
        'Gerudo Membership Card': '/images/OoT_Gerudo_Token_Icon.png',
        'Stone of Agony': '/images/OoT_Stone_of_Agony_Icon.png',
        'Piece of the Triforce': '/images/OoT_Triforce.png',
        'Bottle with Letter': '/images/OoT_Letter_Icon.png',
        'Bottle with Big Poe': '/images/OoT_Big_Poe_Soul_Icon.png',
        'Small Key (Forest Temple)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Fire Temple)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Water Temple)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Spirit Temple)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Shadow Temple)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Ganons Castle)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Bottom of the Well)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Gerudo Training Ground)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (Gerudo Fortress)': '/images/OoT_Small_Key_Icon.png',
        'Small Key (???)': '/images/OoT_Small_Key_Icon.png',
        'Boss Key (Forest Temple)': '/images/OoT_Boss_Key_Icon.png',
        'Boss Key (Fire Temple)': '/images/OoT_Boss_Key_Icon.png',
        'Boss Key (Water Temple)': '/images/OoT_Boss_Key_Icon.png',
        'Boss Key (Spirit Temple)': '/images/OoT_Boss_Key_Icon.png',
        'Boss Key (Shadow Temple)': '/images/OoT_Boss_Key_Icon.png',
        'Boss Key (Ganons Castle)': '/images/OoT_Boss_Key_Icon.png',
        'Boss Key (???)': '/images/OoT_Boss_Key_Icon.png',
        'Green Rupee': '/images/Green_Rupee.png',
        'Blue Rupee': '/images/Blue_Rupee.png',
        'Red Rupee': '/images/Red_Rupee.png',
        'Purple Rupee': '/images/Purple_Rupee.png',
        'Arrows': '/images/OoT_Arrows_Icon.png',
        'Deku Seeds': '/images/OoT_Deku_Seeds_Icon.png',
        'Bombs': '/images/OoT_Bomb_Icon.png',
        'Deku Stick': '/images/OoT_Deku_Stick_Icon.png',
        'Blue Fire': '/images/OoT_Blue_Fire_Icon.png',
        'Heart Piece': '/images/OoT_Piece_of_Heart_Icon.png',
        'Heart Container': '/images/OoT_Heart_Container_Icon.png',
        'Chicken': '/images/OoT_Cucco_Icon.png',
        'Zeldas Letter': '/images/OoT_Zeldas_Letter_Icon.png',
        'Keaton Mask': '/images/OoT_Keaton_Mask_Icon.png',
        'Skull Mask': '/images/OoT_Skull_Mask_Icon.png',
        'Spooky Mask': '/images/OoT_Spooky_Mask_Icon.png',
        'Bunny Hood': '/images/OoT_Bunny_Hood_Icon.png',
        'Mask of Truth': '/images/OoT_Mask_of_Truth_Icon.png',
        'Pocket Cucco': '/images/OoT_Cucco_Icon.png',
        'Cojiro': '/images/OoT_Cojiro_Icon.png',
        'Odd Mushroom': '/images/OoT_Odd_Mushroom_Icon.png',
        'Odd Potion': '/images/OoT_Odd_Potion_Icon.png',
        'Poachers Saw': '/images/OoT_Poachers_Saw_Icon.png',
        'Broken Sword': '/images/OoT_Broken_Gorons_Sword_Icon.png',
        'Prescription': '/images/OoT_Prescription_Icon.png',
        'Eyeball Frog': '/images/OoT_Eyeball_Frog_Icon.png',
        'Eyedrops': '/images/OoT_Worlds_Finest_Eye_Drops_Icon.png',
        'Claim Check': '/images/OoT_Claim_Check_Icon.png',
        'Kokiri Emerald': '/images/OoT_Spiritual_Stone_of_the_Forest_Icon.png',
        'Goron Ruby': '/images/OoT_Spiritual_Stone_of_Fire_Icon.png',
        'Zora Sapphire': '/images/OoT_Spiritual_Stone_of_Water_Icon.png',
        'Forest Medallion': '/images/OoT_Forest_Medallion_Icon.png',
        'Fire Medallion': '/images/OoT_Fire_Medallion_Icon.png',
        'Water Medallion': '/images/OoT_Water_Medallion_Icon.png',
        'Spirit Medallion': '/images/OoT_Spirit_Medallion_Icon.png',
        'Shadow Medallion': '/images/OoT_Shadow_Medallion_Icon.png',
        'Light Medallion': '/images/OoT_Light_Medallion_Icon.png',
        'Silver Rupee (Dodongos Cavern Staircase)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ice Cavern Spinning Scythe)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ice Cavern Push Block)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Bottom of the Well Basement)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Shadow Temple Scythe Shortcut)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Shadow Temple Invisible Blades)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Shadow Temple Huge Pit)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Shadow Temple Invisible Spikes)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Gerudo Training Ground Slopes)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Gerudo Training Ground Lava)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Gerudo Training Ground Water)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Spirit Temple Child Early Torches)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Spirit Temple Adult Boulders)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Spirit Temple Lobby and Lower Adult)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Spirit Temple Sun Block)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Spirit Temple Adult Climb)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ganons Castle Spirit Trial)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ganons Castle Light Trial)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ganons Castle Fire Trial)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ganons Castle Shadow Trial)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ganons Castle Water Trial)': '/images/rupee_counter_icon.png',
        'Silver Rupee (Ganons Castle Forest Trial)': '/images/rupee_counter_icon.png',
        'Silver Rupee (???)': '/images/rupee_counter_icon.png',
        'Ocarina Note A': '/images/ocarina_a.blue.png',
        'Ocarina Note C Up': '/images/ocarina_c_up.yellow.png',
        'Ocarina Note C Down': '/images/ocarina_c_down.yellow.png',
        'Ocarina Note C Right': '/images/ocarina_c_right.yellow.png',
        'Ocarina Note C Left': '/images/ocarina_c_left.yellow.png',
    };
    let keyMap: KeyTextDict = {
        'Forest Temple': 'Fo',
        'Fire Temple': 'Fi',
        'Water Temple': 'Wa',
        'Spirit Temple': 'Sp',
        'Shadow Temple': 'Sh',
        'Ganons Castle': 'GC',
        'Bottom of the Well': 'We',
        'Gerudo Training Ground': 'GTG',
        'Gerudo Fortress': 'Hi',
        '???': '?'
    };
    let songMap: KeyTextDict = {
        'Zeldas Lullaby': "Z",
        'Eponas Song': "E",
        'Sarias Song': "S",
        'Sun Song': "S",
        'Song of Time': "T",
        'Song of Storms': "S",
        'Minuet of Forest': "M",
        'Bolero of Fire': "B",
        'Serenade of Water': "W",
        'Requiem of Spirit': "R",
        'Nocturne of Shadow': "N",
        'Prelude of Light': "P",
    };
    let rupeeMap: KeyTextDict = {
        'Dodongos Cavern Staircase': 'DC',
        'Ice Cavern Spinning Scythe': 'Ice',
        'Ice Cavern Push Block': 'Ice',
        'Bottom of the Well Basement': 'We',
        'Shadow Temple Scythe Shortcut': 'Sh',
        'Shadow Temple Invisible Blades': 'Sh',
        'Shadow Temple Huge Pit': 'Sh',
        'Shadow Temple Invisible Spikes': 'Sh',
        'Gerudo Training Ground Slopes': 'GTG',
        'Gerudo Training Ground Lava': 'GTG',
        'Gerudo Training Ground Water': 'GTG',
        'Spirit Temple Child Early Torches': 'Sp',
        'Spirit Temple Adult Boulders': 'Sp',
        'Spirit Temple Lobby and Lower Adult': 'Sp',
        'Spirit Temple Sun Block': 'Sp',
        'Spirit Temple Adult Climb': 'Sp',
        'Ganons Castle Spirit Trial': 'SpT',
        'Ganons Castle Light Trial': 'LiT',
        'Ganons Castle Fire Trial': 'FiT',
        'Ganons Castle Shadow Trial': 'ShT',
        'Ganons Castle Water Trial': 'WaT',
        'Ganons Castle Forest Trial': 'FoT',
        '???': '?',
    };
    return (
        <div onClick={onClick} className="iconDiv">
            <div className={className}>
            <img
                src={iconMap[itemName]}
                alt={itemName}
                className="iconContainer"
            />
            { 
                itemName.includes('Small Key') ?
                    <span className="iconKeyText">{keyMap[itemName.substring(11, itemName.length - 1)]}</span>
                    : null
            }
            { 
                itemName.includes('Boss Key') ?
                    <span className="iconKeyText">{keyMap[itemName.substring(10, itemName.length - 1)]}</span>
                    : null
            }
            { 
                itemName.includes('Silver Rupee') ?
                    <span className="iconKeyText">{rupeeMap[itemName.substring(14, itemName.length - 1)]}</span>
                    : null
            }
            { 
                (itemName in songMap) ?
                    <span className="iconKeyText">{songMap[itemName]}</span>
                    : null
            }
            { 
                itemName === 'Chicken' ?
                    <span className="iconTradeText">C</span>
                    : null
            }
            { 
                itemName === 'Pocket Cucco' ?
                    <span className="iconTradeText">A</span>
                    : null
            }
            </div>
        </div>
    )
}

export default OotIcon