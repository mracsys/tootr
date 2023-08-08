import React from 'react';
import { Menu } from '@mui/material';

import OotIcon from './OotIcon';

const ItemMenu = (props) => {
    return (
        <Menu
            id="noKeysanityItems"
            anchorEl={props.anchorLocation}
            open={Boolean(props.anchorLocation)}
            onClose={props.handleClose}
            className="locationItemMenu"
            TransitionProps={{ timeout: 0 }}
            disableScrollLock={true}
            classes={{paper: "itemMenuPaper"}}
        >
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bottle">
                    <OotIcon classes={props.classes} itemName="Bottle" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bottle with Letter">
                    <OotIcon classes={props.classes} itemName="Bottle with Letter" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bomb Bag">
                    <OotIcon classes={props.classes} itemName="Bomb Bag" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bow">
                    <OotIcon classes={props.classes} itemName="Bow" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Fire Arrows">
                    <OotIcon classes={props.classes} itemName="Fire Arrows" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Dins Fire">
                    <OotIcon classes={props.classes} itemName="Dins Fire" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Shield">
                    <OotIcon classes={props.classes} itemName="Deku Shield" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Kokiri Sword">
                    <OotIcon classes={props.classes} itemName="Kokiri Sword" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Biggoron Sword">
                    <OotIcon classes={props.classes} itemName="Biggoron Sword" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Chicken">
                    <OotIcon classes={props.classes} itemName="Chicken" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Zeldas Letter">
                    <OotIcon classes={props.classes} itemName="Zeldas Letter" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Slingshot">
                    <OotIcon classes={props.classes} itemName="Slingshot" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ocarina">
                    <OotIcon classes={props.classes} itemName="Ocarina" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bombchu">
                    <OotIcon classes={props.classes} itemName="Bombchu" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Progressive Hookshot">
                    <OotIcon classes={props.classes} itemName="Progressive Hookshot" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ice Arrows">
                    <OotIcon classes={props.classes} itemName="Ice Arrows" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Farores Wind">
                    <OotIcon classes={props.classes} itemName="Farores Wind" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Hylian Shield">
                    <OotIcon classes={props.classes} itemName="Hylian Shield" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Goron Tunic">
                    <OotIcon classes={props.classes} itemName="Goron Tunic" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Zora Tunic">
                    <OotIcon classes={props.classes} itemName="Zora Tunic" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Keaton Mask">
                    <OotIcon classes={props.classes} itemName="Keaton Mask" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Skull Mask">
                    <OotIcon classes={props.classes} itemName="Skull Mask" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boomerang">
                    <OotIcon classes={props.classes} itemName="Boomerang" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Lens of Truth">
                    <OotIcon classes={props.classes} itemName="Lens of Truth" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Magic Beans">
                    <OotIcon classes={props.classes} itemName="Magic Beans" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Megaton Hammer">
                    <OotIcon classes={props.classes} itemName="Megaton Hammer" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Light Arrows">
                    <OotIcon classes={props.classes} itemName="Light Arrows" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Nayrus Love">
                    <OotIcon classes={props.classes} itemName="Nayrus Love" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Mirror Shield">
                    <OotIcon classes={props.classes} itemName="Mirror Shield" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Iron Boots">
                    <OotIcon classes={props.classes} itemName="Iron Boots" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Hover Boots">
                    <OotIcon classes={props.classes} itemName="Hover Boots" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Spooky Mask">
                    <OotIcon classes={props.classes} itemName="Spooky Mask" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bunny Hood">
                    <OotIcon classes={props.classes} itemName="Bunny Hood" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Zeldas Lullaby">
                    <OotIcon classes={props.classes} itemName="Zeldas Lullaby" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Eponas Song">
                    <OotIcon classes={props.classes} itemName="Eponas Song" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Sarias Song">
                    <OotIcon classes={props.classes} itemName="Sarias Song" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Sun Song">
                    <OotIcon classes={props.classes} itemName="Sun Song" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Song of Time">
                    <OotIcon classes={props.classes} itemName="Song of Time" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Song of Storms">
                    <OotIcon classes={props.classes} itemName="Song of Storms" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Progressive Strength Upgrade">
                    <OotIcon classes={props.classes} itemName="Progressive Strength Upgrade" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Progressive Wallet">
                    <OotIcon classes={props.classes} itemName="Progressive Wallet" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Magic Meter">
                    <OotIcon classes={props.classes} itemName="Magic Meter" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Mask of Truth">
                    <OotIcon classes={props.classes} itemName="Mask of Truth" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Pocket Cucco">
                    <OotIcon classes={props.classes} itemName="Pocket Cucco" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Minuet of Forest">
                    <OotIcon classes={props.classes} itemName="Minuet of Forest" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bolero of Fire">
                    <OotIcon classes={props.classes} itemName="Bolero of Fire" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Serenade of Water">
                    <OotIcon classes={props.classes} itemName="Serenade of Water" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Requiem of Spirit">
                    <OotIcon classes={props.classes} itemName="Requiem of Spirit" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Nocturne of Shadow">
                    <OotIcon classes={props.classes} itemName="Nocturne of Shadow" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Prelude of Light">
                    <OotIcon classes={props.classes} itemName="Prelude of Light" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Progressive Scale">
                    <OotIcon classes={props.classes} itemName="Progressive Scale" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Gerudo Membership Card">
                    <OotIcon classes={props.classes} itemName="Gerudo Membership Card" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Stone of Agony">
                    <OotIcon classes={props.classes} itemName="Stone of Agony" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Cojiro">
                    <OotIcon classes={props.classes} itemName="Cojiro" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Odd Mushroom">
                    <OotIcon classes={props.classes} itemName="Odd Mushroom" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Forest Temple)">
                    <OotIcon classes={props.classes} itemName="Small Key (Forest Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Fire Temple)">
                    <OotIcon classes={props.classes} itemName="Small Key (Fire Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Water Temple)">
                    <OotIcon classes={props.classes} itemName="Small Key (Water Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Spirit Temple)">
                    <OotIcon classes={props.classes} itemName="Small Key (Spirit Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Shadow Temple)">
                    <OotIcon classes={props.classes} itemName="Small Key (Shadow Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Ganons Castle)">
                    <OotIcon classes={props.classes} itemName="Small Key (Ganons Castle)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Bottom of the Well)">
                    <OotIcon classes={props.classes} itemName="Small Key (Bottom of the Well)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Gerudo Training Ground)">
                    <OotIcon classes={props.classes} itemName="Small Key (Gerudo Training Ground)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (Gerudo Fortress)">
                    <OotIcon classes={props.classes} itemName="Small Key (Gerudo Fortress)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Small Key (???)">
                    <OotIcon classes={props.classes} itemName="Small Key (???)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Odd Potion">
                    <OotIcon classes={props.classes} itemName="Odd Potion" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (Forest Temple)">
                    <OotIcon classes={props.classes} itemName="Boss Key (Forest Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (Fire Temple)">
                    <OotIcon classes={props.classes} itemName="Boss Key (Fire Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (Water Temple)">
                    <OotIcon classes={props.classes} itemName="Boss Key (Water Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (Spirit Temple)">
                    <OotIcon classes={props.classes} itemName="Boss Key (Spirit Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (Shadow Temple)">
                    <OotIcon classes={props.classes} itemName="Boss Key (Shadow Temple)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (Ganons Castle)">
                    <OotIcon classes={props.classes} itemName="Boss Key (Ganons Castle)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ganons Castle Forest Trial)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ganons Castle Forest Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ganons Castle Fire Trial)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ganons Castle Fire Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ganons Castle Water Trial)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ganons Castle Water Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Boss Key (???)">
                    <OotIcon classes={props.classes} itemName="Boss Key (???)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Poachers Saw">
                    <OotIcon classes={props.classes} itemName="Poachers Saw" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Dodongos Cavern Staircase)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Dodongos Cavern Staircase)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Gerudo Training Ground Slopes)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Gerudo Training Ground Slopes)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ice Cavern Spinning Scythe)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ice Cavern Spinning Scythe)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Spirit Temple Child Early Torches)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Spirit Temple Child Early Torches)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Shadow Temple Scythe Shortcut)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Shadow Temple Scythe Shortcut)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Bottom of the Well Basement)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Bottom of the Well Basement)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ganons Castle Spirit Trial)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ganons Castle Spirit Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ganons Castle Shadow Trial)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ganons Castle Shadow Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (Ganons Castle Light Trial)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (Ganons Castle Light Trial)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Silver Rupee (???)">
                    <OotIcon classes={props.classes} itemName="Silver Rupee (???)" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Broken Sword">
                    <OotIcon classes={props.classes} itemName="Broken Sword" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Kokiri Emerald">
                    <OotIcon classes={props.classes} itemName="Kokiri Emerald" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Goron Ruby">
                    <OotIcon classes={props.classes} itemName="Goron Ruby" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Zora Sapphire">
                    <OotIcon classes={props.classes} itemName="Zora Sapphire" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Forest Medallion">
                    <OotIcon classes={props.classes} itemName="Forest Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Fire Medallion">
                    <OotIcon classes={props.classes} itemName="Fire Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Water Medallion">
                    <OotIcon classes={props.classes} itemName="Water Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Spirit Medallion">
                    <OotIcon classes={props.classes} itemName="Spirit Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Shadow Medallion">
                    <OotIcon classes={props.classes} itemName="Shadow Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Light Medallion">
                    <OotIcon classes={props.classes} itemName="Light Medallion" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Prescription">
                    <OotIcon classes={props.classes} itemName="Prescription" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Eyeball Frog">
                    <OotIcon classes={props.classes} itemName="Eyeball Frog" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ocarina Note A">
                    <OotIcon classes={props.classes} itemName="Ocarina Note A" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ocarina Note C Down">
                    <OotIcon classes={props.classes} itemName="Ocarina Note C Down" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ocarina Note C Left">
                    <OotIcon classes={props.classes} itemName="Ocarina Note C Left" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ocarina Note C Right">
                    <OotIcon classes={props.classes} itemName="Ocarina Note C Right" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Ocarina Note C Up">
                    <OotIcon classes={props.classes} itemName="Ocarina Note C Up" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Gold Skulltula Token">
                    <OotIcon classes={props.classes} itemName="Gold Skulltula Token" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Piece of the Triforce">
                    <OotIcon classes={props.classes} itemName="Piece of the Triforce" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Heart Piece">
                    <OotIcon classes={props.classes} itemName="Heart Piece" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Heart Container">
                    <OotIcon classes={props.classes} itemName="Heart Container" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Eyedrops">
                    <OotIcon classes={props.classes} itemName="Eyedrops" className="locationMenuIcon" />
                </div>
                <div onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Claim Check">
                    <OotIcon classes={props.classes} itemName="Claim Check" className="locationMenuIcon" />
                </div>
            </div>
            <div className="itemMenuRow">
                <div className="itemMenuClear" onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="">
                    <p className={props.classes.locationMenuClear}>Clear Item</p>
                </div>
            </div>
        </Menu>
    );
}

export default ItemMenu