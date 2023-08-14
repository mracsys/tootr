import React from 'react';

import OotIcon from './OotIcon';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DoneIcon from '@mui/icons-material/Done';
import { AllAreas } from './Tracker';
import ContextMenuHandler from './ContextMenuHandler';

interface LocationCheckProps {
    lkey: string,
    location: string,
    allAreas: AllAreas,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    handleContextMenu: ContextMenuHandler,
    toggleWalletTiers: (locationName: string) => void,
    updateShopPrice: (locationName: string, price: string) => void,
    showShopInput: boolean,
    showShopRupee: boolean,
}

const LocationCheck = ({
    lkey,
    location,
    allAreas,
    handleCheck,
    handleUnCheck,
    handleContextMenu,
    toggleWalletTiers,
    updateShopPrice,
    showShopInput,
    showShopRupee,
}: LocationCheckProps) => {
    let locationIcons: {[locationType: string]: string} = {
        "skulltula": '/images/OoT_Token_Icon.png',
        "map": '/images/OoT_Dungeon_Map_Icon.png',
        "compass": '/images/OoT_Compass_Icon.png',
        "smallKey": '/images/OoT_Compass_Icon.png',
        "bossKey": '/images/OoT_Boss_Key_Icon.png',
        "song": '/images/Grey_Note.png'
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
            key={lkey}
            onClick={ allAreas.locations[location].check === "" ?
                        () => handleCheck(location) :
                        () => handleUnCheck(location)
                    }
            onContextMenu={handleContextMenu.onContextMenu}
            onTouchStart={handleContextMenu.onTouchStart}
            onTouchCancel={handleContextMenu.onTouchCancel}
            onTouchEnd={handleContextMenu.onTouchEnd}
            onTouchMove={handleContextMenu.onTouchMove}
            data-source={location}
        >
            {
                locationIcons.hasOwnProperty(allAreas.locations[location].type) ?
                <img src={locationIcons[allAreas.locations[location].type]} alt="Gold Skulltula" className="locationIcon" /> :
                <div className="locationIconBlank" />
            }
            <p className="locationText"><em>{allAreas.locations[location].alias}</em></p>
            {
                (allAreas.locations[location].merchant === true && allAreas.locations[location].foundItem !== "") ?
                    <React.Fragment>
                        { showShopInput ?
                            <input
                                name={location + "shopprice"}
                                onClick={(e) => {e.stopPropagation()}}
                                className="priceBox"
                                defaultValue={allAreas.locations[location].price === 0 ? "" : allAreas.locations[location].price}
                                onBlur={(e) => {
                                    updateShopPrice(location,e.currentTarget.value);
                                }}
                            /> : null
                        }
                        { showShopRupee ?
                            <div 
                                className="locationWalletTier"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWalletTiers(location);
                                }}>
                                <OotIcon
                                    itemName={walletTiers[allAreas.locations[location].walletTier]}
                                />
                            </div> : null
                        }
                    </React.Fragment>
                    : null
            }
            {
                allAreas.locations[location].foundItem === "" ?
                    null :
                    <OotIcon
                        itemName={allAreas.locations[location].foundItem}
                        className="locationKnownItem"
                    />
            }
            {
                allAreas.locations[location].check === "" ?
                    <CheckBoxOutlineBlankIcon className="locationMark" /> :
                    <DoneIcon className="locationMark" />
            }
        </div>
    );
}

export default LocationCheck