import React from 'react';

import OotIcon from './OotIcon';

import tokenIcon from '/public/images/OoT_Token_Icon.png';
import mapIcon from '/public/images/OoT_Dungeon_Map_Icon.png';
import compassIcon from '/public/images/OoT_Compass_Icon.png';
import smallKeyIcon from '/public/images/OoT_Small_Key_Icon.png';
import bossKeyIcon from '/public/images/OoT_Boss_Key_Icon.png';
import noteIcon from '/public/images/Grey_Note.png';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DoneIcon from '@mui/icons-material/Done';

const LocationCheck = (props) => {
    let locationIcons = {
        "skulltula": tokenIcon,
        "map": mapIcon,
        "compass": compassIcon,
        "smallKey": smallKeyIcon,
        "bossKey": bossKeyIcon,
        "song": noteIcon
    };
    let walletTiers = [
        "Green Rupee",
        "Blue Rupee",
        "Red Rupee",
        "Purple Rupee"
    ];
    return (
        <div
            className="locationContainer"
            key={props.lkey}
            onClick={ props.allAreas.locations[props.location].check === "" ?
                        () => props.handleCheck(props.location) :
                        () => props.handleUnCheck(props.location)
                    }
            onContextMenu={props.handleContextMenu.onContextMenu}
            onTouchStart={props.handleContextMenu.onTouchStart}
            onTouchCancel={props.handleContextMenu.onTouchCancel}
            onTouchEnd={props.handleContextMenu.onTouchEnd}
            onTouchMove={props.handleContextMenu.onTouchMove}
            data-source={props.location}
        >
            {
                locationIcons.hasOwnProperty(props.allAreas.locations[props.location].type) ?
                <img src={locationIcons[props.allAreas.locations[props.location].type].src} alt="Gold Skulltula" className="locationIcon" /> :
                <div className="locationIconBlank" />
            }
            <p className="locationText"><em>{props.allAreas.locations[props.location].alias}</em></p>
            {
                (props.allAreas.locations[props.location].merchant === true && props.allAreas.locations[props.location].foundItem !== "") ?
                    <React.Fragment>
                        { props.showShopInput ?
                            <input
                                name={props.location + "shopprice"}
                                onClick={(e) => {e.stopPropagation()}}
                                className="priceBox"
                                defaultValue={props.allAreas.locations[props.location].price === 0 ? "" : props.allAreas.locations[props.location].price}
                                onBlur={(e) => {
                                    props.updateShopPrice(props.location,e.currentTarget.value);
                                }}
                            /> : null
                        }
                        { props.showShopRupee ?
                            <div 
                                className="locationWalletTier"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.toggleWalletTiers(props.location);
                                }}>
                                <OotIcon
                                    itemName={walletTiers[props.allAreas.locations[props.location].walletTier]}
                                    classes={props.classes}
                                />
                            </div> : null
                        }
                    </React.Fragment>
                    : null
            }
            {
                props.allAreas.locations[props.location].foundItem === "" ?
                    null :
                    <OotIcon
                        itemName={props.allAreas.locations[props.location].foundItem}
                        className="locationKnownItem"
                        classes={props.classes}
                    />
            }
            {
                props.allAreas.locations[props.location].check === "" ?
                    <CheckBoxOutlineBlankIcon className="locationMark" /> :
                    <DoneIcon className="locationMark" />
            }
        </div>
    );
}

export default LocationCheck