import { MouseEventHandler } from "react";
import OotItemIcon from "./OotItemIcon";

interface ItemGridProps {
    sourceLocation?: string | null;
    handleFind?: MouseEventHandler,
}

export const ItemGrid = ({
    sourceLocation,
    handleFind,
}: ItemGridProps) => {
    return (
        <div className="locationItemMenu">
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bottle" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Rutos Letter" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bomb Bag" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bow" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Fire Arrows" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Dins Fire" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Deku Shield" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Kokiri Sword" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Biggoron Sword" />
                {/*<OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Chicken" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Zeldas Letter" />*/}
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Slingshot" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bombchus (5)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Hookshot" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ice Arrows" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Farores Wind" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Hylian Shield" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Goron Tunic" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Zora Tunic" />
                {/*<OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Keaton Mask" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Skull Mask" />*/}
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boomerang" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Lens of Truth" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Magic Bean Pack" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Megaton Hammer" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Light Arrows" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Nayrus Love" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Mirror Shield" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Iron Boots" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Hover Boots" />
                {/*<OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Spooky Mask" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bunny Hood" />*/}
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Zeldas Lullaby" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Eponas Song" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Sarias Song" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Suns Song" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Song of Time" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Song of Storms" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Strength Upgrade" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Wallet" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Magic Meter" />
                {/*<OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Mask of Truth" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Pocket Cucco" />*/}
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Minuet of Forest" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bolero of Fire" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Serenade of Water" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Requiem of Spirit" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Nocturne of Shadow" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Prelude of Light" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Scale" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Gerudo Membership Card" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Stone of Agony" />
                {/*<OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Cojiro" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Odd Mushroom" />*/}
            </div>
            {/*<div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Forest Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Fire Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Water Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Spirit Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Shadow Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Ganons Castle)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Bottom of the Well)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Gerudo Training Ground)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (Thieves Hideout)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Small Key (???)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Odd Potion" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (Forest Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (Fire Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (Water Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (Spirit Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (Shadow Temple)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (Ganons Castle)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ganons Castle Forest Trial)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ganons Castle Fire Trial)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ganons Castle Water Trial)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boss Key (???)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Poachers Saw" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Dodongos Cavern Staircase)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Gerudo Training Ground Slopes)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ice Cavern Spinning Scythe)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Spirit Temple Child Early Torches)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Shadow Temple Scythe Shortcut)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Bottom of the Well Basement)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ganons Castle Spirit Trial)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ganons Castle Shadow Trial)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (Ganons Castle Light Trial)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Silver Rupee (???)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Broken Sword" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Kokiri Emerald" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Goron Ruby" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Zora Sapphire" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Forest Medallion" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Fire Medallion" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Water Medallion" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Spirit Medallion" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Shadow Medallion" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Light Medallion" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Prescription" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Eyeball Frog" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina A Button" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina C down Button" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina C left Button" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina C right Button" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina C up Button" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Gold Skulltula Token" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Triforce Piece" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Piece of Heart" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Heart Container" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Eyedrops" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Claim Check" />
            </div>*/}
        </div>
    );
}