import React from 'react';

import OotIcon from './OotIcon';

import tokenIcon from './images/OoT_Token_Icon.png';
import mapIcon from './images/OoT_Dungeon_Map_Icon.png';
import compassIcon from './images/OoT_Compass_Icon.png';
import smallKeyIcon from './images/OoT_Small_Key_Icon.png';
import bossKeyIcon from './images/OoT_Boss_Key_Icon.png';
import noteIcon from './images/Grey_Note.png';
import crateIcon from './images/OoT_Crate_Icon.png';
import grassIcon from './images/OoT_Grass_Icon.png';
import jarIcon from './images/OoT_Jar_Icon.png';
import soulIcon from './images/OoT_Soul_Icon.png';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';

class LocationCheck extends React.Component {
    render() {
        let locationIcons = {
            "skulltula": tokenIcon,
            "map": mapIcon,
            "compass": compassIcon,
            "smallKey": smallKeyIcon,
            "bossKey": bossKeyIcon,
            "song": noteIcon,
			"crate": crateIcon,
			"grass": grassIcon,
			"jar": jarIcon,
			"enemyDrop": soulIcon
        };
        let walletTiers = [
            "Green Rupee",
            "Blue Rupee",
            "Red Rupee",
            "Purple Rupee"
        ];
        return (
            <div
                className={this.props.classes.locationContainer}
                key={this.props.lkey}
                onClick={ this.props.allAreas.locations[this.props.location].check === "" ?
                            () => this.props.handleCheck(this.props.location) :
                            () => this.props.handleUnCheck(this.props.location)
                        }
                onContextMenu={this.props.handleContextMenu.onContextMenu}
                onTouchStart={this.props.handleContextMenu.onTouchStart}
                onTouchCancel={this.props.handleContextMenu.onTouchCancel}
                onTouchEnd={this.props.handleContextMenu.onTouchEnd}
                onTouchMove={this.props.handleContextMenu.onTouchMove}
                data-source={this.props.location}
            >
                {
                    locationIcons.hasOwnProperty(this.props.allAreas.locations[this.props.location].type) ?
                    <img src={locationIcons[this.props.allAreas.locations[this.props.location].type]} alt="Gold Skulltula" className={this.props.classes.locationIcon} /> :
                    <div className={this.props.classes.locationIconBlank} />
                }
                <p className={this.props.classes.locationText}><em>{this.props.allAreas.locations[this.props.location].alias}</em></p>
                {
                    (this.props.allAreas.locations[this.props.location].merchant === true && this.props.allAreas.locations[this.props.location].foundItem !== "") ?
                        <React.Fragment>
                            { this.props.showShopInput ?
                                <input
                                    name={this.props.location + "shopprice"}
                                    onClick={(e) => {e.stopPropagation()}}
                                    className={this.props.classes.priceBox}
                                    defaultValue={this.props.allAreas.locations[this.props.location].price === 0 ? "" : this.props.allAreas.locations[this.props.location].price}
                                    onBlur={(e) => {
                                        this.props.updateShopPrice(this.props.location,e.currentTarget.value);
                                    }}
                                /> : null
                            }
                            { this.props.showShopRupee ?
                                <div 
                                    className={this.props.classes.locationWalletTier}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.props.toggleWalletTiers(this.props.location);
                                    }}>
                                    <OotIcon
                                        itemName={walletTiers[this.props.allAreas.locations[this.props.location].walletTier]}
                                        classes={this.props.classes}
                                    />
                                </div> : null
                            }
                        </React.Fragment>
                        : null
                }
                {
                    this.props.allAreas.locations[this.props.location].foundItem === "" ?
                        null :
                        <OotIcon
                            itemName={this.props.allAreas.locations[this.props.location].foundItem}
                            className={this.props.classes.locationKnownItem}
                            classes={this.props.classes}
                        />
                }
                {
                    this.props.allAreas.locations[this.props.location].check === "" ?
                        <CheckBoxOutlineBlankIcon className={this.props.classes.locationMark} /> :
                        <DoneIcon className={this.props.classes.locationMark} />
                }
            </div>
        );
    }
}

export default LocationCheck