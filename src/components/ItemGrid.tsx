import { MouseEventHandler, useState } from "react";
import OotItemIcon from "./OotItemIcon";
import { RadialMenu } from "./RadialMenu";
import { Menu } from '@mui/material';

interface ItemGridProps {
    sourceLocation?: string | null;
    handleFind?: MouseEventHandler,
}

export const ItemGrid = ({
    sourceLocation,
    handleFind,
}: ItemGridProps) => {
    let [anchor, setAnchor] = useState<Element | null>(null);
    let openSubMenu: MouseEventHandler = (e) => {
        setAnchor(e.target as Element);
    }
    let handleClose = () => {
        setAnchor(null);
    }
    return (
        <div className="locationItemMenu">
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Slingshot" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bomb Bag" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bow" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Fire Arrows" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Dins Fire" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Kokiri Sword" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Biggoron Sword" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Stone of Agony" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Goron Tunic" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Zora Tunic" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Boomerang" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bombchus (5)" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Hookshot" />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Blue Arrows"
                    itemList={[
                        "Ice Arrows",
                        "Blue Fire Arrows",
                    ]}
                />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Farores Wind" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Deku Shield" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Hylian Shield" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Mirror Shield" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Iron Boots" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Hover Boots" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Lens of Truth" />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Buy Magic Bean"
                    itemList={[
                        "Magic Bean",
                        "Magic Bean Pack",
                    ]}
                />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Megaton Hammer" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Light Arrows" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Nayrus Love" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Wallet" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Scale" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Progressive Strength Upgrade" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Magic Meter" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Gerudo Membership Card" />
            </div>
            <div className="itemMenuRow">
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Ocarina" />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Song"
                    itemList={[
                        "Zeldas Lullaby",
                        "Eponas Song",
                        "Sarias Song",
                        "Suns Song",
                        "Song of Time",
                        "Song of Storms",
                        "Minuet of Forest",
                        "Bolero of Fire",
                        "Serenade of Water",
                        "Requiem of Spirit",
                        "Nocturne of Shadow",
                        "Prelude of Light",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Ocarina C up Button"
                    itemList={[
                        "Ocarina C left Button",
                        "Ocarina C up Button",
                        "Ocarina C right Button",
                        "Ocarina C down Button",
                        "Ocarina A Button",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Bottle"
                    itemList={[
                        "Bottle",
                        "Rutos Letter",
                        "Bottle with Red Potion",
                        "Bottle with Green Potion",
                        "Bottle with Blue Potion",
                        "Bottle with Fairy",
                        "Bottle with Fish",
                        "Bottle with Blue Fire",
                        "Bottle with Bugs",
                        "Bottle with Big Poe",
                        "Bottle with Poe",
                        "Bottle with Milk",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Weird Egg"
                    itemList={[
                        "Weird Egg",
                        "Chicken",
                        "Zeldas Letter",
                        "Keaton Mask",
                        "Skull Mask",
                        "Spooky Mask",
                        "Bunny Hood",
                        "Mask of Truth",
                        "Goron Mask",
                        "Zora Mask",
                        "Gerudo Mask",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Pocket Egg"
                    itemList={[
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
                    ]}
                />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Gold Skulltula Token" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Piece of Heart" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Heart Container" />
                <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Triforce Piece" />
            </div>
            <div className="itemMenuRow">
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Small Key Ring"
                    itemList={[
                        "Small Key Ring (Forest Temple)",
                        "Small Key Ring (Fire Temple)",
                        "Small Key Ring (Water Temple)",
                        "Small Key Ring (Spirit Temple)",
                        "Small Key Ring (Shadow Temple)",
                        "Small Key Ring (Treasure Chest Game)",
                        "Small Key Ring (Bottom of the Well)",
                        "Small Key Ring (Gerudo Training Ground)",
                        "Small Key Ring (Thieves Hideout)",
                        "Small Key Ring (Ganons Castle)",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Small Key"
                    itemList={[
                        "Small Key (Forest Temple)",
                        "Small Key (Fire Temple)",
                        "Small Key (Water Temple)",
                        "Small Key (Spirit Temple)",
                        "Small Key (Shadow Temple)",
                        "Small Key (Treasure Chest Game)",
                        "Small Key (Bottom of the Well)",
                        "Small Key (Gerudo Training Ground)",
                        "Small Key (Thieves Hideout)",
                        "Small Key (Ganons Castle)",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Boss Key"
                    itemList={[
                        "Boss Key (Forest Temple)",
                        "Boss Key (Fire Temple)",
                        "Boss Key (Water Temple)",
                        "Boss Key (Spirit Temple)",
                        "Boss Key (Shadow Temple)",
                        "Boss Key (Ganons Castle)",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Map"
                    itemList={[
                        "Map (Deku Tree)",
                        "Map (Dodongos Cavern)",
                        "Map (Jabu Jabus Belly)",
                        "Map (Forest Temple)",
                        "Map (Fire Temple)",
                        "Map (Water Temple)",
                        "Map (Spirit Temple)",
                        "Map (Shadow Temple)",
                        "Map (Ice Cavern)",
                        "Map (Bottom of the Well)",
                        "Map (Ganons Castle)",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Compass"
                    itemList={[
                        "Compass (Deku Tree)",
                        "Compass (Dodongos Cavern)",
                        "Compass (Jabu Jabus Belly)",
                        "Compass (Forest Temple)",
                        "Compass (Fire Temple)",
                        "Compass (Water Temple)",
                        "Compass (Spirit Temple)",
                        "Compass (Shadow Temple)",
                        "Compass (Ice Cavern)",
                        "Compass (Bottom of the Well)",
                        "Compass (Ganons Castle)",
                    ]}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Silver Rupee Pouch"
                    /*
                        Two-tier menu to select dungeon, then puzzle.
                        Single puzzle dungeons also have two tiers for simplicity.
                    */
                    itemList={{
                        "Silver Rupee Pouch (Bottom of the Well)": ['Silver Rupee Pouch (Bottom of the Well Basement)'],
                        "Silver Rupee Pouch (Ice Cavern)": [
                            'Silver Rupee Pouch (Ice Cavern Spinning Scythe)',
                            'Silver Rupee Pouch (Ice Cavern Push Block)',
                        ],
                        "Silver Rupee Pouch (Gerudo Training Ground)": [
                            'Silver Rupee Pouch (Gerudo Training Ground Slopes)',
                            'Silver Rupee Pouch (Gerudo Training Ground Lava)',
                            'Silver Rupee Pouch (Gerudo Training Ground Water)',
                        ],
                        "Silver Rupee Pouch (Shadow Temple)": [
                            'Silver Rupee Pouch (Shadow Temple Invisible Blades)',
                            'Silver Rupee Pouch (Shadow Temple Invisible Spikes)',
                            'Silver Rupee Pouch (Shadow Temple Scythe Shortcut)',
                            'Silver Rupee Pouch (Shadow Temple Huge Pit)',
                        ],
                        "Silver Rupee Pouch (Spirit Temple)": [
                            'Silver Rupee Pouch (Spirit Temple Child Early Torches)',
                            'Silver Rupee Pouch (Spirit Temple Adult Boulders)',
                            'Silver Rupee Pouch (Spirit Temple Lobby and Lower Adult)',
                            'Silver Rupee Pouch (Spirit Temple Sun Block)',
                            'Silver Rupee Pouch (Spirit Temple Adult Climb)',
                        ],
                        "Silver Rupee Pouch (Ganons Castle)": [
                            'Silver Rupee Pouch (Ganons Castle Forest Trial)',
                            'Silver Rupee Pouch (Ganons Castle Fire Trial)',
                            'Silver Rupee Pouch (Ganons Castle Water Trial)',
                            'Silver Rupee Pouch (Ganons Castle Spirit Trial)',
                            'Silver Rupee Pouch (Ganons Castle Shadow Trial)',
                            'Silver Rupee Pouch (Ganons Castle Light Trial)',
                        ],
                        "Silver Rupee Pouch (Dodongos Cavern)": ['Silver Rupee Pouch (Dodongos Cavern Staircase)'],
                    }}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Silver Rupee"
                    /*
                        Two-tier menu to select dungeon, then puzzle.
                        Single puzzle dungeons also have two tiers for simplicity.
                    */
                    itemList={{
                        "Silver Rupee (Bottom of the Well)": ['Silver Rupee (Bottom of the Well Basement)'],
                        "Silver Rupee (Ice Cavern)": [
                            'Silver Rupee (Ice Cavern Spinning Scythe)',
                            'Silver Rupee (Ice Cavern Push Block)',
                        ],
                        "Silver Rupee (Gerudo Training Ground)": [
                            'Silver Rupee (Gerudo Training Ground Slopes)',
                            'Silver Rupee (Gerudo Training Ground Lava)',
                            'Silver Rupee (Gerudo Training Ground Water)',
                        ],
                        "Silver Rupee (Shadow Temple)": [
                            'Silver Rupee (Shadow Temple Invisible Blades)',
                            'Silver Rupee (Shadow Temple Invisible Spikes)',
                            'Silver Rupee (Shadow Temple Scythe Shortcut)',
                            'Silver Rupee (Shadow Temple Huge Pit)',
                        ],
                        "Silver Rupee (Spirit Temple)": [
                            'Silver Rupee (Spirit Temple Child Early Torches)',
                            'Silver Rupee (Spirit Temple Adult Boulders)',
                            'Silver Rupee (Spirit Temple Lobby and Lower Adult)',
                            'Silver Rupee (Spirit Temple Sun Block)',
                            'Silver Rupee (Spirit Temple Adult Climb)',
                        ],
                        "Silver Rupee (Ganons Castle)": [
                            'Silver Rupee (Ganons Castle Forest Trial)',
                            'Silver Rupee (Ganons Castle Fire Trial)',
                            'Silver Rupee (Ganons Castle Water Trial)',
                            'Silver Rupee (Ganons Castle Spirit Trial)',
                            'Silver Rupee (Ganons Castle Shadow Trial)',
                            'Silver Rupee (Ganons Castle Light Trial)',
                        ],
                        "Silver Rupee (Dodongos Cavern)": ['Silver Rupee (Dodongos Cavern Staircase)'],
                    }}
                />
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Zora Sapphire"
                    /* these are ordered to try to align stones and medallions evenly right and left */
                    itemList={[
                        "Water Medallion",
                        "Fire Medallion",
                        "Forest Medallion",
                        "Kokiri Emerald",
                        "Goron Ruby",
                        "Zora Sapphire",
                        "Light Medallion",
                        "Shadow Medallion",
                        "Spirit Medallion",
                    ]}
                />
                <OotItemIcon className="locationMenuIcon" onClick={openSubMenu} itemName="Soul" />
                <Menu
                    id="soulsMenu"
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    className="locationItemMenu"
                    TransitionProps={{ timeout: 0 }}
                    disableScrollLock={true}
                    onClose={handleClose}
                    classes={{paper: "itemMenuPaper"}}
                >
                    <div className="locationItemMenu">
                        <div className="itemMenuRow">
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Stalfos Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Octorok Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Wallmaster Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Dodongo Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Keese Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Tektite Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Peahat Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Lizalfos and Dinalfos Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Gohma Larvae Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Shabom Soul" />
                        </div>
                        <div className="itemMenuRow">
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Baby Dodongo Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Biri and Bari Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Tailpasaran Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Skulltula Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Torch Slug Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Moblin Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Armos Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Deku Baba Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Deku Scrub Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bubble Soul" />
                        </div>
                        <div className="itemMenuRow">
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Beamos Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Floormaster Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Redead and Gibdo Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Skullwalltula Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Flare Dancer Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Dead hand Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Shell blade Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Like-like Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Spike Enemy Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Anubis Soul" />
                        </div>
                        <div className="itemMenuRow">
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Iron Knuckle Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Skull Kid Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Flying Pot Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Freezard Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Stinger Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Wolfos Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Guay Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Jabu Jabu Tentacle Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Dark Link Soul" />
                        </div>
                        <div className="itemMenuRow">
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Queen Gohma Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="King Dodongo Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Barinade Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Phantom Ganon Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Volvagia Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Morpha Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Bongo Bongo Soul" />
                            <OotItemIcon className="locationMenuIcon" onClick={handleFind} sourceLocation={sourceLocation} itemName="Twinrova Soul" />
                        </div>
                    </div>
                </Menu>
                <RadialMenu
                    sourceLocation={sourceLocation}
                    handleFind={handleFind}
                    buttonItem="Deku Stick"
                    itemList={[
                        "Deku Stick (1)",
                        "Deku Nuts (5)",
                        "Deku Seeds (30)",
                        "Bombs (5)",
                        "Recovery Heart",
                        "Arrows (5)",
                        "Rupee (1)",
                        "Rupees (5)",
                        "Rupees (20)",
                        "Rupees (50)",
                        "Rupees (200)",
                        "Double Defense",
                    ]}
                />
            </div>
        </div>
    );
}