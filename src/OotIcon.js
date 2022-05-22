import React from 'react';

/*import Blue_Note from './images/Blue_Note.png';
import Green_Note from './images/Green_Note.png';
import Grey_Note from './images/Grey_Note.png';
import OoT_Adults_Wallet_Icon from './images/OoT_Adults_Wallet_Icon.png';
import OoT_Arrows_Icon from './images/OoT_Arrows_Icon.png';
import OoT_Big_Poe_Soul_Icon from './images/OoT_Big_Poe_Soul_Icon.png';
import OoT_Blue_Fire_Icon from './images/OoT_Blue_Fire_Icon.png';
import OoT_Blue_Potion_Icon from './images/OoT_Blue_Potion_Icon.png';
import OoT_Bombchu_Icon from './images/OoT_Bombchu_Icon.png';
import OoT_Bomb_Bag_Icon from './images/OoT_Bomb_Bag_Icon.png';
import OoT_Bomb_Icon from './images/OoT_Bomb_Icon.png';
import OoT_Boomerang_Icon from './images/OoT_Boomerang_Icon.png';
import OoT_Boss_Key_Icon from './images/OoT_Boss_Key_Icon.png';
import OoT_Bottle_Icon from './images/OoT_Bottle_Icon.png';
import OoT_Broken_Gorons_Sword_Icon from './images/OoT_Broken_Gorons_Sword_Icon.png';
import OoT_Bug_Icon from './images/OoT_Bug_Icon.png';
import OoT_Bunny_Hood_Icon from './images/OoT_Bunny_Hood_Icon.png';
import OoT_Claim_Check_Icon from './images/OoT_Claim_Check_Icon.png';
import OoT_Cojiro_Icon from './images/OoT_Cojiro_Icon.png';
import OoT_Compass_Icon from './images/OoT_Compass_Icon.png';
import OoT_Cucco_Icon from './images/OoT_Cucco_Icon.png';
import OoT_Deku_Nut_Icon from './images/OoT_Deku_Nut_Icon.png';
import OoT_Deku_Seeds_Icon from './images/OoT_Deku_Seeds_Icon.png';
import OoT_Deku_Shield_Icon from './images/OoT_Deku_Shield_Icon.png';
import OoT_Deku_Stick_Icon from './images/OoT_Deku_Stick_Icon.png';
import OoT_Dins_Fire_Icon from './images/OoT_Dins_Fire_Icon.png';
import OoT_Dungeon_Map_Icon from './images/OoT_Dungeon_Map_Icon.png';
import OoT_Eyeball_Frog_Icon from './images/OoT_Eyeball_Frog_Icon.png';
import OoT_Fairy_Bow_Icon from './images/OoT_Fairy_Bow_Icon.png';
import OoT_Fairy_Icon from './images/OoT_Fairy_Icon.png';
import OoT_Fairy_Ocarina_Icon from './images/OoT_Fairy_Ocarina_Icon.png';
import OoT_Fairy_Slingshot_Icon from './images/OoT_Fairy_Slingshot_Icon.png';
import OoT_Farores_Wind_Icon from './images/OoT_Farores_Wind_Icon.png';
import OoT_Fire_Arrow_Icon from './images/OoT_Fire_Arrow_Icon.png';
import OoT_Fire_Medallion_Icon from './images/OoT_Fire_Medallion_Icon.png';
import OoT_Fish_Icon from './images/OoT_Fish_Icon.png';
import OoT_Forest_Medallion_Icon from './images/OoT_Forest_Medallion_Icon.png';
import OoT_Gerudo_Token_Icon from './images/OoT_Gerudo_Token_Icon.png';
import OoT_Giants_Knife_Icon from './images/OoT_Giants_Knife_Icon.png';
import OoT_Golden_Gauntlets_Icon from './images/OoT_Golden_Gauntlets_Icon.png';
import OoT_Golden_Scale_Icon from './images/OoT_Golden_Scale_Icon.png';
import OoT_Gorons_Bracelet_Icon from './images/OoT_Gorons_Bracelet_Icon.png';
import OoT_Goron_Tunic_Icon from './images/OoT_Goron_Tunic_Icon.png';
import OoT_Green_Potion_Icon from './images/OoT_Green_Potion_Icon.png';
import OoT_Heart_Container_Icon from './images/OoT_Heart_Container_Icon.png';
import OoT_Heart_Icon from './images/OoT_Heart_Icon.png';
import OoT_Hookshot_Icon from './images/OoT_Hookshot_Icon.png';
import OoT_Hover_Boots_Icon from './images/OoT_Hover_Boots_Icon.png';
import OoT_Hylian_Shield_Icon from './images/OoT_Hylian_Shield_Icon.png';
import OoT_Ice_Arrow_Icon from './images/OoT_Ice_Arrow_Icon.png';
import OoT_Iron_Boots_Icon from './images/OoT_Iron_Boots_Icon.png';
import OoT_Keaton_Mask_Icon from './images/OoT_Keaton_Mask_Icon.png';
import OoT_Kokiri_Boots_Icon from './images/OoT_Kokiri_Boots_Icon.png';
import OoT_Kokiri_Sword_Icon from './images/OoT_Kokiri_Sword_Icon.png';
import OoT_Kokiri_Tunic_Icon from './images/OoT_Kokiri_Tunic_Icon.png';
import OoT_Large_Magic_Jar_Icon from './images/OoT_Large_Magic_Jar_Icon.png';
import OoT_Lens_of_Truth_Icon from './images/OoT_Lens_of_Truth_Icon.png';
import OoT_Letter_Icon from './images/OoT_Letter_Icon.png';
import OoT_Light_Arrow_Icon from './images/OoT_Light_Arrow_Icon.png';
import OoT_Light_Medallion_Icon from './images/OoT_Light_Medallion_Icon.png';
import OoT_Longshot_Icon from './images/OoT_Longshot_Icon.png';
import OoT_Magic_Bean_Icon from './images/OoT_Magic_Bean_Icon.png';
import OoT_Mask_of_Truth_Icon from './images/OoT_Mask_of_Truth_Icon.png';
import OoT_Master_Sword_Icon from './images/OoT_Master_Sword_Icon.png';
import OoT_Megaton_Hammer_Icon from './images/OoT_Megaton_Hammer_Icon.png';
import OoT_Milk_Icon from './images/OoT_Milk_Icon.png';
import OoT_Mirror_Shield_Icon from './images/OoT_Mirror_Shield_Icon.png';
import OoT_Nayrus_Love_Icon from './images/OoT_Nayrus_Love_Icon.png';
import OoT_Ocarina_of_Time_Icon from './images/OoT_Ocarina_of_Time_Icon.png';
import OoT_Odd_Mushroom_Icon from './images/OoT_Odd_Mushroom_Icon.png';
import OoT_Odd_Potion_Icon from './images/OoT_Odd_Potion_Icon.png';
import OoT_Piece_of_Heart_Icon from './images/OoT_Piece_of_Heart_Icon.png';
import OoT_Poachers_Saw_Icon from './images/OoT_Poachers_Saw_Icon.png';
import OoT_Poe_Soul_Icon from './images/OoT_Poe_Soul_Icon.png';
import OoT_Prescription_Icon from './images/OoT_Prescription_Icon.png';
import OoT_Red_Potion_Icon from './images/OoT_Red_Potion_Icon.png';
import OoT_Shadow_Medallion_Icon from './images/OoT_Shadow_Medallion_Icon.png';
import OoT_Silver_Gauntlets_Icon from './images/OoT_Silver_Gauntlets_Icon.png';
import OoT_Silver_Scale_Icon from './images/OoT_Silver_Scale_Icon.png';
import OoT_Skull_Mask_Icon from './images/OoT_Skull_Mask_Icon.png';
import OoT_Small_Key_Icon from './images/OoT_Small_Key_Icon.png';
import OoT_Small_Magic_Jar_Icon from './images/OoT_Small_Magic_Jar_Icon.png';
import OoT_Spiritual_Stone_of_Fire_Icon from './images/OoT_Spiritual_Stone_of_Fire_Icon.png';
import OoT_Spiritual_Stone_of_the_Forest_Icon from './images/OoT_Spiritual_Stone_of_the_Forest_Icon.png';
import OoT_Spiritual_Stone_of_Water_Icon from './images/OoT_Spiritual_Stone_of_Water_Icon.png';
import OoT_Spirit_Medallion_Icon from './images/OoT_Spirit_Medallion_Icon.png';
import OoT_Spooky_Mask_Icon from './images/OoT_Spooky_Mask_Icon.png';
import OoT_Stone_of_Agony_Icon from './images/OoT_Stone_of_Agony_Icon.png';
import OoT_Token_Icon from './images/OoT_Token_Icon.png';
import OoT_Water_Medallion_Icon from './images/OoT_Water_Medallion_Icon.png';
import OoT_Weird_Egg_Icon from './images/OoT_Weird_Egg_Icon.png';
import OoT_Worlds_Finest_Eye_Drops_Icon from './images/OoT_Worlds_Finest_Eye_Drops_Icon.png';
import OoT_Zeldas_Letter_Icon from './images/OoT_Zeldas_Letter_Icon.png';
import OoT_Zora_Tunic_Icon from './images/OoT_Zora_Tunic_Icon.png';
import Orange_Note from './images/Orange_Note.png';
import Purple_Note from './images/Purple_Note.png';
import Red_Note from './images/Red_Note.png';
import Yellow_Note from './images/Yellow_Note.png';*/

import Blue_Note from './images/Blue_Note.png';
import Green_Note from './images/Green_Note.png';
import OoT_Adults_Wallet_Icon from './images/OoT_Adults_Wallet_Icon.png';
import OoT_Arrows_Icon from './images/OoT_Arrows_Icon.png';
import OoT_Blue_Fire_Icon from './images/OoT_Blue_Fire_Icon.png';
import OoT_Bombchu_Icon from './images/OoT_Bombchu_Icon.png';
import OoT_Bomb_Icon from './images/OoT_Bomb_Icon.png';
import OoT_Boomerang_Icon from './images/OoT_Boomerang_Icon.png';
import OoT_Bottle_Icon from './images/OoT_Bottle_Icon.png';
import OoT_Deku_Nut_Icon from './images/OoT_Deku_Nut_Icon.png';
import OoT_Deku_Seeds_Icon from './images/OoT_Deku_Seeds_Icon.png';
import OoT_Deku_Shield_Icon from './images/OoT_Deku_Shield_Icon.png';
import OoT_Deku_Stick_Icon from './images/OoT_Deku_Stick_Icon.png';
import OoT_Dins_Fire_Icon from './images/OoT_Dins_Fire_Icon.png';
import OoT_Fairy_Bow_Icon from './images/OoT_Fairy_Bow_Icon.png';
import OoT_Fairy_Ocarina_Icon from './images/OoT_Fairy_Ocarina_Icon.png';
import OoT_Fairy_Slingshot_Icon from './images/OoT_Fairy_Slingshot_Icon.png';
import OoT_Farores_Wind_Icon from './images/OoT_Farores_Wind_Icon.png';
import OoT_Fire_Arrow_Icon from './images/OoT_Fire_Arrow_Icon.png';
import OoT_Gerudo_Token_Icon from './images/OoT_Gerudo_Token_Icon.png';
import OoT_Giants_Knife_Icon from './images/OoT_Giants_Knife_Icon.png';
import OoT_Gorons_Bracelet_Icon from './images/OoT_Gorons_Bracelet_Icon.png';
import OoT_Goron_Tunic_Icon from './images/OoT_Goron_Tunic_Icon.png';
import OoT_Hookshot_Icon from './images/OoT_Hookshot_Icon.png';
import OoT_Hover_Boots_Icon from './images/OoT_Hover_Boots_Icon.png';
import OoT_Hylian_Shield_Icon from './images/OoT_Hylian_Shield_Icon.png';
import OoT_Ice_Arrow_Icon from './images/OoT_Ice_Arrow_Icon.png';
import OoT_Iron_Boots_Icon from './images/OoT_Iron_Boots_Icon.png';
import OoT_Kokiri_Sword_Icon from './images/OoT_Kokiri_Sword_Icon.png';
import OoT_Lens_of_Truth_Icon from './images/OoT_Lens_of_Truth_Icon.png';
import OoT_Light_Arrow_Icon from './images/OoT_Light_Arrow_Icon.png';
import OoT_Magic_Bean_Icon from './images/OoT_Magic_Bean_Icon.png';
import OoT_Master_Sword_Icon from './images/OoT_Master_Sword_Icon.png';
import OoT_Megaton_Hammer_Icon from './images/OoT_Megaton_Hammer_Icon.png';
import OoT_Mirror_Shield_Icon from './images/OoT_Mirror_Shield_Icon.png';
import OoT_Nayrus_Love_Icon from './images/OoT_Nayrus_Love_Icon.png';
import OoT_Silver_Scale_Icon from './images/OoT_Silver_Scale_Icon.png';
import OoT_Small_Magic_Jar_Icon from './images/OoT_Small_Magic_Jar_Icon.png';
import OoT_Stone_of_Agony_Icon from './images/OoT_Stone_of_Agony_Icon.png';
import OoT_Token_Icon from './images/OoT_Token_Icon.png';
import OoT_Zora_Tunic_Icon from './images/OoT_Zora_Tunic_Icon.png';
import Orange_Note from './images/Orange_Note.png';
import Purple_Note from './images/Purple_Note.png';
import Red_Note from './images/Red_Note.png';
import Yellow_Note from './images/Yellow_Note.png';
import OoT_Cojiro_Icon from './images/OoT_Cojiro_Icon.png';
import OoT_Cucco_Icon from './images/OoT_Cucco_Icon.png';
import OoT_Letter_Icon from './images/OoT_Letter_Icon.png';
import OoT_Big_Poe_Soul_Icon from './images/OoT_Big_Poe_Soul_Icon.png';
import OoT_Small_Key_Icon from './images/OoT_Small_Key_Icon.png';
import OoT_Boss_Key_Icon from './images/OoT_Boss_Key_Icon.png';
import OoT_Triforce_Icon from './images/OoT_Triforce.png'
import Green_Rupee from './images/Green_Rupee.png'
import Blue_Rupee from './images/Blue_Rupee.png'
import Red_Rupee from './images/Red_Rupee.png'
import Purple_Rupee from './images/Purple_Rupee.png'

class OotIcon extends React.Component {
    render() {
        let iconMap = {
            'Deku Stick Capacity': OoT_Deku_Stick_Icon,
            'Deku Nut Capacity': OoT_Deku_Nut_Icon,
            'Bomb Bag': OoT_Bomb_Icon,
            'Bow': OoT_Fairy_Bow_Icon,
            'Fire Arrows': OoT_Fire_Arrow_Icon,
            'Dins Fire': OoT_Dins_Fire_Icon,
            'Kokiri Sword': OoT_Kokiri_Sword_Icon,
            'Master Sword': OoT_Master_Sword_Icon,
            'Biggoron Sword': OoT_Giants_Knife_Icon,
            'Slingshot': OoT_Fairy_Slingshot_Icon,
            'Ocarina': OoT_Fairy_Ocarina_Icon,
            'Bombchu': OoT_Bombchu_Icon,
            'Progressive Hookshot': OoT_Hookshot_Icon,
            'Ice Arrows': OoT_Ice_Arrow_Icon,
            'Farores Wind': OoT_Farores_Wind_Icon,
            'Deku Shield': OoT_Deku_Shield_Icon,
            'Hylian Shield': OoT_Hylian_Shield_Icon,
            'Mirror Shield': OoT_Mirror_Shield_Icon,
            'Boomerang': OoT_Boomerang_Icon,
            'Lens of Truth': OoT_Lens_of_Truth_Icon,
            'Magic Beans': OoT_Magic_Bean_Icon,
            'Megaton Hammer': OoT_Megaton_Hammer_Icon,
            'Light Arrows': OoT_Light_Arrow_Icon,
            'Nayrus Love': OoT_Nayrus_Love_Icon,
            'Progressive Strength Upgrade': OoT_Gorons_Bracelet_Icon,
            'Goron Tunic': OoT_Goron_Tunic_Icon,
            'Zora Tunic': OoT_Zora_Tunic_Icon,
            'Bottle': OoT_Bottle_Icon,
            'Adult Trade Item': OoT_Cojiro_Icon,
            'Child Trade Item': OoT_Cucco_Icon,
            'Progressive Scale': OoT_Silver_Scale_Icon,
            'Iron Boots': OoT_Iron_Boots_Icon,
            'Hover Boots': OoT_Hover_Boots_Icon,
            'Zeldas Lullaby': Red_Note,
            'Eponas Song': Orange_Note,
            'Sarias Song': Green_Note,
            'Sun Song': Yellow_Note,
            'Song of Time': Blue_Note,
            'Song of Storms': Purple_Note,
            'Progressive Wallet': OoT_Adults_Wallet_Icon,
            'Magic Meter': OoT_Small_Magic_Jar_Icon,
            'Gold Skulltula Token': OoT_Token_Icon,
            'Minuet of Forest': Green_Note,
            'Bolero of Fire': Red_Note,
            'Serenade of Water': Blue_Note,
            'Requiem of Spirit': Orange_Note,
            'Nocturne of Shadow': Purple_Note,
            'Prelude of Light': Yellow_Note,
            'Gerudo Membership Card': OoT_Gerudo_Token_Icon,
            'Stone of Agony': OoT_Stone_of_Agony_Icon,
            'Piece of the Triforce': OoT_Triforce_Icon,
            'Bottle with Letter': OoT_Letter_Icon,
            'Bottle with Big Poe': OoT_Big_Poe_Soul_Icon,
            'Small Key (Forest Temple)': OoT_Small_Key_Icon,
            'Small Key (Fire Temple)': OoT_Small_Key_Icon,
            'Small Key (Water Temple)': OoT_Small_Key_Icon,
            'Small Key (Spirit Temple)': OoT_Small_Key_Icon,
            'Small Key (Shadow Temple)': OoT_Small_Key_Icon,
            'Small Key (Ganons Castle)': OoT_Small_Key_Icon,
            'Small Key (Bottom of the Well)': OoT_Small_Key_Icon,
            'Small Key (Gerudo Training Ground)': OoT_Small_Key_Icon,
            'Small Key (Gerudo Fortress)': OoT_Small_Key_Icon,
            'Small Key (???)': OoT_Small_Key_Icon,
            'Boss Key (Forest Temple)': OoT_Boss_Key_Icon,
            'Boss Key (Fire Temple)': OoT_Boss_Key_Icon,
            'Boss Key (Water Temple)': OoT_Boss_Key_Icon,
            'Boss Key (Spirit Temple)': OoT_Boss_Key_Icon,
            'Boss Key (Shadow Temple)': OoT_Boss_Key_Icon,
            'Boss Key (Ganons Castle)': OoT_Boss_Key_Icon,
            'Boss Key (???)': OoT_Boss_Key_Icon,
            'Green Rupee': Green_Rupee,
            'Blue Rupee': Blue_Rupee,
            'Red Rupee': Red_Rupee,
            'Purple Rupee': Purple_Rupee,
            'Arrows': OoT_Arrows_Icon,
            'Deku Seeds': OoT_Deku_Seeds_Icon,
            'Bombs': OoT_Bomb_Icon,
            'Deku Stick': OoT_Deku_Stick_Icon,
            'Blue Fire': OoT_Blue_Fire_Icon,
        };
        let keyMap = {
            'Forest Temple': 'Fo',
            'Fire Temple': 'Fi',
            'Water Temple': 'Wa',
            'Spirit Temple': 'Sp',
            'Shadow Temple': 'Sh',
            'Ganons Castle': 'GC',
            'Bottom of the Well': 'We',
            'Gerudo Training Ground': 'GTG',
            'Gerudo Fortress': 'GF',
            '???': '?'
        };
        let songMap = {
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
        return (
            <div onClick={this.props.onClick ? this.props.onClick : null} data-source={this.props.dataSource} className={this.props.classes.iconDiv}>
                <div className={this.props.className}>
                <img
                    src={iconMap[this.props.itemName]}
                    alt={this.props.itemName}
                    className={this.props.classes.iconContainer}
                />
                { 
                    this.props.itemName.includes('Small Key') ?
                        <span className={this.props.classes.iconKeyText}>{keyMap[this.props.itemName.substring(11, this.props.itemName.length - 1)]}</span>
                        : null
                }
                { 
                    this.props.itemName.includes('Boss Key') ?
                        <span className={this.props.classes.iconKeyText}>{keyMap[this.props.itemName.substring(10, this.props.itemName.length - 1)]}</span>
                        : null
                }
                { 
                    (this.props.itemName in songMap) ?
                        <span className={this.props.classes.iconKeyText}>{songMap[this.props.itemName]}</span>
                        : null
                }
                </div>
            </div>
        )
    }
}

export default OotIcon