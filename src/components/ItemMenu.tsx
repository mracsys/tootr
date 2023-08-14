import React, { MouseEventHandler } from 'react';
import { Menu } from '@mui/material';

import OotIcon from './OotIcon';

export interface ItemMenuProps {
    anchorLocation?: Element | null,
    sourceLocation: string | null,
    handleClose: () => void,
    handleFind: MouseEventHandler,
}

const ItemMenu = ({
    anchorLocation,
    sourceLocation,
    handleClose,
    handleFind,
}: ItemMenuProps) => {
    return (
        <Menu
            id="noKeysanityItems"
            anchorEl={anchorLocation}
            open={Boolean(anchorLocation)}
            onClose={handleClose}
            className="locationItemMenu"
            TransitionProps={{ timeout: 0 }}
            disableScrollLock={true}
            classes={{paper: "itemMenuPaper"}}
        >
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bottle">
                    <OotIcon itemName="Bottle" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bottle with Letter">
                    <OotIcon itemName="Bottle with Letter" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bomb Bag">
                    <OotIcon itemName="Bomb Bag" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bow">
                    <OotIcon itemName="Bow" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Fire Arrows">
                    <OotIcon itemName="Fire Arrows" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Dins Fire">
                    <OotIcon itemName="Dins Fire" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Deku Shield">
                    <OotIcon itemName="Deku Shield" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Kokiri Sword">
                    <OotIcon itemName="Kokiri Sword" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Biggoron Sword">
                    <OotIcon itemName="Biggoron Sword" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Chicken">
                    <OotIcon itemName="Chicken" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Zeldas Letter">
                    <OotIcon itemName="Zeldas Letter" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Slingshot">
                    <OotIcon itemName="Slingshot" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ocarina">
                    <OotIcon itemName="Ocarina" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bombchu">
                    <OotIcon itemName="Bombchu" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Progressive Hookshot">
                    <OotIcon itemName="Progressive Hookshot" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ice Arrows">
                    <OotIcon itemName="Ice Arrows" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Farores Wind">
                    <OotIcon itemName="Farores Wind" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Hylian Shield">
                    <OotIcon itemName="Hylian Shield" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Goron Tunic">
                    <OotIcon itemName="Goron Tunic" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Zora Tunic">
                    <OotIcon itemName="Zora Tunic" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Keaton Mask">
                    <OotIcon itemName="Keaton Mask" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Skull Mask">
                    <OotIcon itemName="Skull Mask" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boomerang">
                    <OotIcon itemName="Boomerang" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Lens of Truth">
                    <OotIcon itemName="Lens of Truth" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Magic Beans">
                    <OotIcon itemName="Magic Beans" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Megaton Hammer">
                    <OotIcon itemName="Megaton Hammer" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Light Arrows">
                    <OotIcon itemName="Light Arrows" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Nayrus Love">
                    <OotIcon itemName="Nayrus Love" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Mirror Shield">
                    <OotIcon itemName="Mirror Shield" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Iron Boots">
                    <OotIcon itemName="Iron Boots" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Hover Boots">
                    <OotIcon itemName="Hover Boots" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Spooky Mask">
                    <OotIcon itemName="Spooky Mask" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bunny Hood">
                    <OotIcon itemName="Bunny Hood" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Zeldas Lullaby">
                    <OotIcon itemName="Zeldas Lullaby" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Eponas Song">
                    <OotIcon itemName="Eponas Song" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Sarias Song">
                    <OotIcon itemName="Sarias Song" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Sun Song">
                    <OotIcon itemName="Sun Song" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Song of Time">
                    <OotIcon itemName="Song of Time" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Song of Storms">
                    <OotIcon itemName="Song of Storms" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Progressive Strength Upgrade">
                    <OotIcon itemName="Progressive Strength Upgrade" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Progressive Wallet">
                    <OotIcon itemName="Progressive Wallet" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Magic Meter">
                    <OotIcon itemName="Magic Meter" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Mask of Truth">
                    <OotIcon itemName="Mask of Truth" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Pocket Cucco">
                    <OotIcon itemName="Pocket Cucco" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Minuet of Forest">
                    <OotIcon itemName="Minuet of Forest" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Bolero of Fire">
                    <OotIcon itemName="Bolero of Fire" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Serenade of Water">
                    <OotIcon itemName="Serenade of Water" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Requiem of Spirit">
                    <OotIcon itemName="Requiem of Spirit" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Nocturne of Shadow">
                    <OotIcon itemName="Nocturne of Shadow" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Prelude of Light">
                    <OotIcon itemName="Prelude of Light" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Progressive Scale">
                    <OotIcon itemName="Progressive Scale" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Gerudo Membership Card">
                    <OotIcon itemName="Gerudo Membership Card" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Stone of Agony">
                    <OotIcon itemName="Stone of Agony" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Cojiro">
                    <OotIcon itemName="Cojiro" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Odd Mushroom">
                    <OotIcon itemName="Odd Mushroom" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Forest Temple)">
                    <OotIcon itemName="Small Key (Forest Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Fire Temple)">
                    <OotIcon itemName="Small Key (Fire Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Water Temple)">
                    <OotIcon itemName="Small Key (Water Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Spirit Temple)">
                    <OotIcon itemName="Small Key (Spirit Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Shadow Temple)">
                    <OotIcon itemName="Small Key (Shadow Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Ganons Castle)">
                    <OotIcon itemName="Small Key (Ganons Castle)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Bottom of the Well)">
                    <OotIcon itemName="Small Key (Bottom of the Well)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Gerudo Training Ground)">
                    <OotIcon itemName="Small Key (Gerudo Training Ground)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (Gerudo Fortress)">
                    <OotIcon itemName="Small Key (Gerudo Fortress)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Small Key (???)">
                    <OotIcon itemName="Small Key (???)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Odd Potion">
                    <OotIcon itemName="Odd Potion" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (Forest Temple)">
                    <OotIcon itemName="Boss Key (Forest Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (Fire Temple)">
                    <OotIcon itemName="Boss Key (Fire Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (Water Temple)">
                    <OotIcon itemName="Boss Key (Water Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (Spirit Temple)">
                    <OotIcon itemName="Boss Key (Spirit Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (Shadow Temple)">
                    <OotIcon itemName="Boss Key (Shadow Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (Ganons Castle)">
                    <OotIcon itemName="Boss Key (Ganons Castle)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ganons Castle Forest Trial)">
                    <OotIcon itemName="Silver Rupee (Ganons Castle Forest Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ganons Castle Fire Trial)">
                    <OotIcon itemName="Silver Rupee (Ganons Castle Fire Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ganons Castle Water Trial)">
                    <OotIcon itemName="Silver Rupee (Ganons Castle Water Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Boss Key (???)">
                    <OotIcon itemName="Boss Key (???)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Poachers Saw">
                    <OotIcon itemName="Poachers Saw" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Dodongos Cavern Staircase)">
                    <OotIcon itemName="Silver Rupee (Dodongos Cavern Staircase)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Gerudo Training Ground Slopes)">
                    <OotIcon itemName="Silver Rupee (Gerudo Training Ground Slopes)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ice Cavern Spinning Scythe)">
                    <OotIcon itemName="Silver Rupee (Ice Cavern Spinning Scythe)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Spirit Temple Child Early Torches)">
                    <OotIcon itemName="Silver Rupee (Spirit Temple Child Early Torches)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Shadow Temple Scythe Shortcut)">
                    <OotIcon itemName="Silver Rupee (Shadow Temple Scythe Shortcut)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Bottom of the Well Basement)">
                    <OotIcon itemName="Silver Rupee (Bottom of the Well Basement)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ganons Castle Spirit Trial)">
                    <OotIcon itemName="Silver Rupee (Ganons Castle Spirit Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ganons Castle Shadow Trial)">
                    <OotIcon itemName="Silver Rupee (Ganons Castle Shadow Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (Ganons Castle Light Trial)">
                    <OotIcon itemName="Silver Rupee (Ganons Castle Light Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Silver Rupee (???)">
                    <OotIcon itemName="Silver Rupee (???)" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Broken Sword">
                    <OotIcon itemName="Broken Sword" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Kokiri Emerald">
                    <OotIcon itemName="Kokiri Emerald" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Goron Ruby">
                    <OotIcon itemName="Goron Ruby" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Zora Sapphire">
                    <OotIcon itemName="Zora Sapphire" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Forest Medallion">
                    <OotIcon itemName="Forest Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Fire Medallion">
                    <OotIcon itemName="Fire Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Water Medallion">
                    <OotIcon itemName="Water Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Spirit Medallion">
                    <OotIcon itemName="Spirit Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Shadow Medallion">
                    <OotIcon itemName="Shadow Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Light Medallion">
                    <OotIcon itemName="Light Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Prescription">
                    <OotIcon itemName="Prescription" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Eyeball Frog">
                    <OotIcon itemName="Eyeball Frog" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ocarina Note A">
                    <OotIcon itemName="Ocarina Note A" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ocarina Note C Down">
                    <OotIcon itemName="Ocarina Note C Down" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ocarina Note C Left">
                    <OotIcon itemName="Ocarina Note C Left" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ocarina Note C Right">
                    <OotIcon itemName="Ocarina Note C Right" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Ocarina Note C Up">
                    <OotIcon itemName="Ocarina Note C Up" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Gold Skulltula Token">
                    <OotIcon itemName="Gold Skulltula Token" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Piece of the Triforce">
                    <OotIcon itemName="Piece of the Triforce" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Heart Piece">
                    <OotIcon itemName="Heart Piece" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Heart Container">
                    <OotIcon itemName="Heart Container" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Eyedrops">
                    <OotIcon itemName="Eyedrops" className="locationMenuIcon" />
                </div>
                <div onClick={handleFind} data-found-in={sourceLocation} data-found-item="Claim Check">
                    <OotIcon itemName="Claim Check" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div className="itemMenuClear" onClick={handleFind} data-found-in={sourceLocation} data-found-item="">
                    <p className="locationMenuClear">Clear Item</p>
                </div>
            </div>
        </Menu>
    );
}

export default ItemMenu