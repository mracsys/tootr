import React from 'react';

/*import Blue_Note from '/public/images/Blue_Note.png';
import Green_Note from '/public/images/Green_Note.png';
import Grey_Note from '/public/images/Grey_Note.png';
import OoT_Adults_Wallet_Icon from '/public/images/OoT_Adults_Wallet_Icon.png';
import OoT_Arrows_Icon from '/public/images/OoT_Arrows_Icon.png';
import OoT_Big_Poe_Soul_Icon from '/public/images/OoT_Big_Poe_Soul_Icon.png';
import OoT_Blue_Fire_Icon from '/public/images/OoT_Blue_Fire_Icon.png';
import OoT_Blue_Potion_Icon from '/public/images/OoT_Blue_Potion_Icon.png';
import OoT_Bombchu_Icon from '/public/images/OoT_Bombchu_Icon.png';
import OoT_Bomb_Bag_Icon from '/public/images/OoT_Bomb_Bag_Icon.png';
import OoT_Bomb_Icon from '/public/images/OoT_Bomb_Icon.png';
import OoT_Boomerang_Icon from '/public/images/OoT_Boomerang_Icon.png';
import OoT_Boss_Key_Icon from '/public/images/OoT_Boss_Key_Icon.png';
import OoT_Bottle_Icon from '/public/images/OoT_Bottle_Icon.png';
import OoT_Broken_Gorons_Sword_Icon from '/public/images/OoT_Broken_Gorons_Sword_Icon.png';
import OoT_Bug_Icon from '/public/images/OoT_Bug_Icon.png';
import OoT_Bunny_Hood_Icon from '/public/images/OoT_Bunny_Hood_Icon.png';
import OoT_Claim_Check_Icon from '/public/images/OoT_Claim_Check_Icon.png';
import OoT_Cojiro_Icon from '/public/images/OoT_Cojiro_Icon.png';
import OoT_Compass_Icon from '/public/images/OoT_Compass_Icon.png';
import OoT_Cucco_Icon from '/public/images/OoT_Cucco_Icon.png';
import OoT_Deku_Nut_Icon from '/public/images/OoT_Deku_Nut_Icon.png';
import OoT_Deku_Seeds_Icon from '/public/images/OoT_Deku_Seeds_Icon.png';
import OoT_Deku_Shield_Icon from '/public/images/OoT_Deku_Shield_Icon.png';
import OoT_Deku_Stick_Icon from '/public/images/OoT_Deku_Stick_Icon.png';
import OoT_Dins_Fire_Icon from '/public/images/OoT_Dins_Fire_Icon.png';
import OoT_Dungeon_Map_Icon from '/public/images/OoT_Dungeon_Map_Icon.png';
import OoT_Eyeball_Frog_Icon from '/public/images/OoT_Eyeball_Frog_Icon.png';
import OoT_Fairy_Bow_Icon from '/public/images/OoT_Fairy_Bow_Icon.png';
import OoT_Fairy_Icon from '/public/images/OoT_Fairy_Icon.png';
import OoT_Fairy_Ocarina_Icon from '/public/images/OoT_Fairy_Ocarina_Icon.png';
import OoT_Fairy_Slingshot_Icon from '/public/images/OoT_Fairy_Slingshot_Icon.png';
import OoT_Farores_Wind_Icon from '/public/images/OoT_Farores_Wind_Icon.png';
import OoT_Fire_Arrow_Icon from '/public/images/OoT_Fire_Arrow_Icon.png';
import OoT_Fire_Medallion_Icon from '/public/images/OoT_Fire_Medallion_Icon.png';
import OoT_Fish_Icon from '/public/images/OoT_Fish_Icon.png';
import OoT_Forest_Medallion_Icon from '/public/images/OoT_Forest_Medallion_Icon.png';
import OoT_Gerudo_Token_Icon from '/public/images/OoT_Gerudo_Token_Icon.png';
import OoT_Giants_Knife_Icon from '/public/images/OoT_Giants_Knife_Icon.png';
import OoT_Golden_Gauntlets_Icon from '/public/images/OoT_Golden_Gauntlets_Icon.png';
import OoT_Golden_Scale_Icon from '/public/images/OoT_Golden_Scale_Icon.png';
import OoT_Gorons_Bracelet_Icon from '/public/images/OoT_Gorons_Bracelet_Icon.png';
import OoT_Goron_Tunic_Icon from '/public/images/OoT_Goron_Tunic_Icon.png';
import OoT_Green_Potion_Icon from '/public/images/OoT_Green_Potion_Icon.png';
import OoT_Heart_Container_Icon from '/public/images/OoT_Heart_Container_Icon.png';
import OoT_Heart_Icon from '/public/images/OoT_Heart_Icon.png';
import OoT_Hookshot_Icon from '/public/images/OoT_Hookshot_Icon.png';
import OoT_Hover_Boots_Icon from '/public/images/OoT_Hover_Boots_Icon.png';
import OoT_Hylian_Shield_Icon from '/public/images/OoT_Hylian_Shield_Icon.png';
import OoT_Ice_Arrow_Icon from '/public/images/OoT_Ice_Arrow_Icon.png';
import OoT_Iron_Boots_Icon from '/public/images/OoT_Iron_Boots_Icon.png';
import OoT_Keaton_Mask_Icon from '/public/images/OoT_Keaton_Mask_Icon.png';
import OoT_Kokiri_Boots_Icon from '/public/images/OoT_Kokiri_Boots_Icon.png';
import OoT_Kokiri_Sword_Icon from '/public/images/OoT_Kokiri_Sword_Icon.png';
import OoT_Kokiri_Tunic_Icon from '/public/images/OoT_Kokiri_Tunic_Icon.png';
import OoT_Large_Magic_Jar_Icon from '/public/images/OoT_Large_Magic_Jar_Icon.png';
import OoT_Lens_of_Truth_Icon from '/public/images/OoT_Lens_of_Truth_Icon.png';
import OoT_Letter_Icon from '/public/images/OoT_Letter_Icon.png';
import OoT_Light_Arrow_Icon from '/public/images/OoT_Light_Arrow_Icon.png';
import OoT_Light_Medallion_Icon from '/public/images/OoT_Light_Medallion_Icon.png';
import OoT_Longshot_Icon from '/public/images/OoT_Longshot_Icon.png';
import OoT_Magic_Bean_Icon from '/public/images/OoT_Magic_Bean_Icon.png';
import OoT_Mask_of_Truth_Icon from '/public/images/OoT_Mask_of_Truth_Icon.png';
import OoT_Master_Sword_Icon from '/public/images/OoT_Master_Sword_Icon.png';
import OoT_Megaton_Hammer_Icon from '/public/images/OoT_Megaton_Hammer_Icon.png';
import OoT_Milk_Icon from '/public/images/OoT_Milk_Icon.png';
import OoT_Mirror_Shield_Icon from '/public/images/OoT_Mirror_Shield_Icon.png';
import OoT_Nayrus_Love_Icon from '/public/images/OoT_Nayrus_Love_Icon.png';
import OoT_Ocarina_of_Time_Icon from '/public/images/OoT_Ocarina_of_Time_Icon.png';
import OoT_Odd_Mushroom_Icon from '/public/images/OoT_Odd_Mushroom_Icon.png';
import OoT_Odd_Potion_Icon from '/public/images/OoT_Odd_Potion_Icon.png';
import OoT_Piece_of_Heart_Icon from '/public/images/OoT_Piece_of_Heart_Icon.png';
import OoT_Poachers_Saw_Icon from '/public/images/OoT_Poachers_Saw_Icon.png';
import OoT_Poe_Soul_Icon from '/public/images/OoT_Poe_Soul_Icon.png';
import OoT_Prescription_Icon from '/public/images/OoT_Prescription_Icon.png';
import OoT_Red_Potion_Icon from '/public/images/OoT_Red_Potion_Icon.png';
import OoT_Shadow_Medallion_Icon from '/public/images/OoT_Shadow_Medallion_Icon.png';
import OoT_Silver_Gauntlets_Icon from '/public/images/OoT_Silver_Gauntlets_Icon.png';
import OoT_Silver_Scale_Icon from '/public/images/OoT_Silver_Scale_Icon.png';
import OoT_Skull_Mask_Icon from '/public/images/OoT_Skull_Mask_Icon.png';
import OoT_Small_Key_Icon from '/public/images/OoT_Small_Key_Icon.png';
import OoT_Small_Magic_Jar_Icon from '/public/images/OoT_Small_Magic_Jar_Icon.png';
import OoT_Spiritual_Stone_of_Fire_Icon from '/public/images/OoT_Spiritual_Stone_of_Fire_Icon.png';
import OoT_Spiritual_Stone_of_the_Forest_Icon from '/public/images/OoT_Spiritual_Stone_of_the_Forest_Icon.png';
import OoT_Spiritual_Stone_of_Water_Icon from '/public/images/OoT_Spiritual_Stone_of_Water_Icon.png';
import OoT_Spirit_Medallion_Icon from '/public/images/OoT_Spirit_Medallion_Icon.png';
import OoT_Spooky_Mask_Icon from '/public/images/OoT_Spooky_Mask_Icon.png';
import OoT_Stone_of_Agony_Icon from '/public/images/OoT_Stone_of_Agony_Icon.png';
import OoT_Token_Icon from '/public/images/OoT_Token_Icon.png';
import OoT_Water_Medallion_Icon from '/public/images/OoT_Water_Medallion_Icon.png';
import OoT_Weird_Egg_Icon from '/public/images/OoT_Weird_Egg_Icon.png';
import OoT_Worlds_Finest_Eye_Drops_Icon from '/public/images/OoT_Worlds_Finest_Eye_Drops_Icon.png';
import OoT_Zeldas_Letter_Icon from '/public/images/OoT_Zeldas_Letter_Icon.png';
import OoT_Zora_Tunic_Icon from '/public/images/OoT_Zora_Tunic_Icon.png';
import Orange_Note from '/public/images/Orange_Note.png';
import Purple_Note from '/public/images/Purple_Note.png';
import Red_Note from '/public/images/Red_Note.png';
import Yellow_Note from '/public/images/Yellow_Note.png';*/

import Blue_Note from '/public/images/Blue_Note.png';
import Green_Note from '/public/images/Green_Note.png';
import OoT_Adults_Wallet_Icon from '/public/images/OoT_Adults_Wallet_Icon.png';
import OoT_Arrows_Icon from '/public/images/OoT_Arrows_Icon.png';
import OoT_Blue_Fire_Icon from '/public/images/OoT_Blue_Fire_Icon.png';
import OoT_Bombchu_Icon from '/public/images/OoT_Bombchu_Icon.png';
import OoT_Bomb_Icon from '/public/images/OoT_Bomb_Icon.png';
import OoT_Boomerang_Icon from '/public/images/OoT_Boomerang_Icon.png';
import OoT_Bottle_Icon from '/public/images/OoT_Bottle_Icon.png';
import OoT_Deku_Nut_Icon from '/public/images/OoT_Deku_Nut_Icon.png';
import OoT_Deku_Seeds_Icon from '/public/images/OoT_Deku_Seeds_Icon.png';
import OoT_Deku_Shield_Icon from '/public/images/OoT_Deku_Shield_Icon.png';
import OoT_Deku_Stick_Icon from '/public/images/OoT_Deku_Stick_Icon.png';
import OoT_Dins_Fire_Icon from '/public/images/OoT_Dins_Fire_Icon.png';
import OoT_Fairy_Bow_Icon from '/public/images/OoT_Fairy_Bow_Icon.png';
import OoT_Fairy_Ocarina_Icon from '/public/images/OoT_Fairy_Ocarina_Icon.png';
import OoT_Fairy_Slingshot_Icon from '/public/images/OoT_Fairy_Slingshot_Icon.png';
import OoT_Farores_Wind_Icon from '/public/images/OoT_Farores_Wind_Icon.png';
import OoT_Fire_Arrow_Icon from '/public/images/OoT_Fire_Arrow_Icon.png';
import OoT_Gerudo_Token_Icon from '/public/images/OoT_Gerudo_Token_Icon.png';
import OoT_Giants_Knife_Icon from '/public/images/OoT_Giants_Knife_Icon.png';
import OoT_Gorons_Bracelet_Icon from '/public/images/OoT_Gorons_Bracelet_Icon.png';
import OoT_Goron_Tunic_Icon from '/public/images/OoT_Goron_Tunic_Icon.png';
import OoT_Hookshot_Icon from '/public/images/OoT_Hookshot_Icon.png';
import OoT_Hover_Boots_Icon from '/public/images/OoT_Hover_Boots_Icon.png';
import OoT_Hylian_Shield_Icon from '/public/images/OoT_Hylian_Shield_Icon.png';
import OoT_Ice_Arrow_Icon from '/public/images/OoT_Ice_Arrow_Icon.png';
import OoT_Iron_Boots_Icon from '/public/images/OoT_Iron_Boots_Icon.png';
import OoT_Kokiri_Sword_Icon from '/public/images/OoT_Kokiri_Sword_Icon.png';
import OoT_Lens_of_Truth_Icon from '/public/images/OoT_Lens_of_Truth_Icon.png';
import OoT_Light_Arrow_Icon from '/public/images/OoT_Light_Arrow_Icon.png';
import OoT_Magic_Bean_Icon from '/public/images/OoT_Magic_Bean_Icon.png';
import OoT_Master_Sword_Icon from '/public/images/OoT_Master_Sword_Icon.png';
import OoT_Megaton_Hammer_Icon from '/public/images/OoT_Megaton_Hammer_Icon.png';
import OoT_Mirror_Shield_Icon from '/public/images/OoT_Mirror_Shield_Icon.png';
import OoT_Nayrus_Love_Icon from '/public/images/OoT_Nayrus_Love_Icon.png';
import OoT_Silver_Scale_Icon from '/public/images/OoT_Silver_Scale_Icon.png';
import OoT_Small_Magic_Jar_Icon from '/public/images/OoT_Small_Magic_Jar_Icon.png';
import OoT_Stone_of_Agony_Icon from '/public/images/OoT_Stone_of_Agony_Icon.png';
import OoT_Token_Icon from '/public/images/OoT_Token_Icon.png';
import OoT_Zora_Tunic_Icon from '/public/images/OoT_Zora_Tunic_Icon.png';
import Orange_Note from '/public/images/Orange_Note.png';
import Purple_Note from '/public/images/Purple_Note.png';
import Red_Note from '/public/images/Red_Note.png';
import Yellow_Note from '/public/images/Yellow_Note.png';
import OoT_Cojiro_Icon from '/public/images/OoT_Cojiro_Icon.png';
import OoT_Cucco_Icon from '/public/images/OoT_Cucco_Icon.png';
import OoT_Letter_Icon from '/public/images/OoT_Letter_Icon.png';
import OoT_Big_Poe_Soul_Icon from '/public/images/OoT_Big_Poe_Soul_Icon.png';
import OoT_Small_Key_Icon from '/public/images/OoT_Small_Key_Icon.png';
import OoT_Boss_Key_Icon from '/public/images/OoT_Boss_Key_Icon.png';
import OoT_Triforce_Icon from '/public/images/OoT_Triforce.png';
import Green_Rupee from '/public/images/Green_Rupee.png';
import Blue_Rupee from '/public/images/Blue_Rupee.png';
import Red_Rupee from '/public/images/Red_Rupee.png';
import Purple_Rupee from '/public/images/Purple_Rupee.png';
import Silver_Rupee from '/public/images/rupee_counter_icon.png';
import OoT_Piece_of_Heart_Icon from '/public/images/OoT_Piece_of_Heart_Icon.png';
import OoT_Heart_Container_Icon from '/public/images/OoT_Heart_Container_Icon.png';
import OoT_Worlds_Finest_Eye_Drops_Icon from '/public/images/OoT_Worlds_Finest_Eye_Drops_Icon.png';
import OoT_Zeldas_Letter_Icon from '/public/images/OoT_Zeldas_Letter_Icon.png';
import OoT_Spiritual_Stone_of_Fire_Icon from '/public/images/OoT_Spiritual_Stone_of_Fire_Icon.png';
import OoT_Spiritual_Stone_of_the_Forest_Icon from '/public/images/OoT_Spiritual_Stone_of_the_Forest_Icon.png';
import OoT_Spiritual_Stone_of_Water_Icon from '/public/images/OoT_Spiritual_Stone_of_Water_Icon.png';
import OoT_Spirit_Medallion_Icon from '/public/images/OoT_Spirit_Medallion_Icon.png';
import OoT_Spooky_Mask_Icon from '/public/images/OoT_Spooky_Mask_Icon.png';
import OoT_Skull_Mask_Icon from '/public/images/OoT_Skull_Mask_Icon.png';
import OoT_Shadow_Medallion_Icon from '/public/images/OoT_Shadow_Medallion_Icon.png';
import OoT_Prescription_Icon from '/public/images/OoT_Prescription_Icon.png';
import OoT_Odd_Mushroom_Icon from '/public/images/OoT_Odd_Mushroom_Icon.png';
import OoT_Odd_Potion_Icon from '/public/images/OoT_Odd_Potion_Icon.png';
import OoT_Poachers_Saw_Icon from '/public/images/OoT_Poachers_Saw_Icon.png';
import OoT_Mask_of_Truth_Icon from '/public/images/OoT_Mask_of_Truth_Icon.png';
import OoT_Light_Medallion_Icon from '/public/images/OoT_Light_Medallion_Icon.png';
import OoT_Keaton_Mask_Icon from '/public/images/OoT_Keaton_Mask_Icon.png';
import OoT_Forest_Medallion_Icon from '/public/images/OoT_Forest_Medallion_Icon.png';
import OoT_Fire_Medallion_Icon from '/public/images/OoT_Fire_Medallion_Icon.png';
import OoT_Eyeball_Frog_Icon from '/public/images/OoT_Eyeball_Frog_Icon.png';
import OoT_Bunny_Hood_Icon from '/public/images/OoT_Bunny_Hood_Icon.png';
import OoT_Claim_Check_Icon from '/public/images/OoT_Claim_Check_Icon.png';
import OoT_Broken_Gorons_Sword_Icon from '/public/images/OoT_Broken_Gorons_Sword_Icon.png';
import OoT_Water_Medallion_Icon from '/public/images/OoT_Water_Medallion_Icon.png';
import OoT_A_Icon from '/public/images/ocarina_a.blue.png';
import OoT_C_Up_Icon from '/public/images/ocarina_c_up.yellow.png';
import OoT_C_Down_Icon from '/public/images/ocarina_c_down.yellow.png';
import OoT_C_Left_Icon from '/public/images/ocarina_c_left.yellow.png';
import OoT_C_Right_Icon from '/public/images/ocarina_c_right.yellow.png';


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
            'Heart Piece': OoT_Piece_of_Heart_Icon,
            'Heart Container': OoT_Heart_Container_Icon,
            'Chicken': OoT_Cucco_Icon,
            'Zeldas Letter': OoT_Zeldas_Letter_Icon,
            'Keaton Mask': OoT_Keaton_Mask_Icon,
            'Skull Mask': OoT_Skull_Mask_Icon,
            'Spooky Mask': OoT_Spooky_Mask_Icon,
            'Bunny Hood': OoT_Bunny_Hood_Icon,
            'Mask of Truth': OoT_Mask_of_Truth_Icon,
            'Pocket Cucco': OoT_Cucco_Icon,
            'Cojiro': OoT_Cojiro_Icon,
            'Odd Mushroom': OoT_Odd_Mushroom_Icon,
            'Odd Potion': OoT_Odd_Potion_Icon,
            'Poachers Saw': OoT_Poachers_Saw_Icon,
            'Broken Sword': OoT_Broken_Gorons_Sword_Icon,
            'Prescription': OoT_Prescription_Icon,
            'Eyeball Frog': OoT_Eyeball_Frog_Icon,
            'Eyedrops': OoT_Worlds_Finest_Eye_Drops_Icon,
            'Claim Check': OoT_Claim_Check_Icon,
            'Kokiri Emerald': OoT_Spiritual_Stone_of_the_Forest_Icon,
            'Goron Ruby': OoT_Spiritual_Stone_of_Fire_Icon,
            'Zora Sapphire': OoT_Spiritual_Stone_of_Water_Icon,
            'Forest Medallion': OoT_Forest_Medallion_Icon,
            'Fire Medallion': OoT_Fire_Medallion_Icon,
            'Water Medallion': OoT_Water_Medallion_Icon,
            'Spirit Medallion': OoT_Spirit_Medallion_Icon,
            'Shadow Medallion': OoT_Shadow_Medallion_Icon,
            'Light Medallion': OoT_Light_Medallion_Icon,
            'Silver Rupee (Dodongos Cavern Staircase)': Silver_Rupee,
            'Silver Rupee (Ice Cavern Spinning Scythe)': Silver_Rupee,
            'Silver Rupee (Ice Cavern Push Block)': Silver_Rupee,
            'Silver Rupee (Bottom of the Well Basement)': Silver_Rupee,
            'Silver Rupee (Shadow Temple Scythe Shortcut)': Silver_Rupee,
            'Silver Rupee (Shadow Temple Invisible Blades)': Silver_Rupee,
            'Silver Rupee (Shadow Temple Huge Pit)': Silver_Rupee,
            'Silver Rupee (Shadow Temple Invisible Spikes)': Silver_Rupee,
            'Silver Rupee (Gerudo Training Ground Slopes)': Silver_Rupee,
            'Silver Rupee (Gerudo Training Ground Lava)': Silver_Rupee,
            'Silver Rupee (Gerudo Training Ground Water)': Silver_Rupee,
            'Silver Rupee (Spirit Temple Child Early Torches)': Silver_Rupee,
            'Silver Rupee (Spirit Temple Adult Boulders)': Silver_Rupee,
            'Silver Rupee (Spirit Temple Lobby and Lower Adult)': Silver_Rupee,
            'Silver Rupee (Spirit Temple Sun Block)': Silver_Rupee,
            'Silver Rupee (Spirit Temple Adult Climb)': Silver_Rupee,
            'Silver Rupee (Ganons Castle Spirit Trial)': Silver_Rupee,
            'Silver Rupee (Ganons Castle Light Trial)': Silver_Rupee,
            'Silver Rupee (Ganons Castle Fire Trial)': Silver_Rupee,
            'Silver Rupee (Ganons Castle Shadow Trial)': Silver_Rupee,
            'Silver Rupee (Ganons Castle Water Trial)': Silver_Rupee,
            'Silver Rupee (Ganons Castle Forest Trial)': Silver_Rupee,
            'Silver Rupee (???)': Silver_Rupee,
            'Ocarina Note A': OoT_A_Icon,
            'Ocarina Note C Up': OoT_C_Up_Icon,
            'Ocarina Note C Down': OoT_C_Down_Icon,
            'Ocarina Note C Right': OoT_C_Right_Icon,
            'Ocarina Note C Left': OoT_C_Left_Icon,
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
            'Gerudo Fortress': 'Hi',
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
        let rupeeMap = {
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
                    this.props.itemName.includes('Silver Rupee') ?
                        <span className={this.props.classes.iconKeyText}>{rupeeMap[this.props.itemName.substring(14, this.props.itemName.length - 1)]}</span>
                        : null
                }
                { 
                    (this.props.itemName in songMap) ?
                        <span className={this.props.classes.iconKeyText}>{songMap[this.props.itemName]}</span>
                        : null
                }
                { 
                    this.props.itemName === 'Chicken' ?
                        <span className={this.props.classes.iconTradeText}>C</span>
                        : null
                }
                { 
                    this.props.itemName === 'Pocket Cucco' ?
                        <span className={this.props.classes.iconTradeText}>A</span>
                        : null
                }
                </div>
            </div>
        )
    }
}

export default OotIcon