import React from 'react';

import OotItemIcon from './OotItemIcon';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DoneIcon from '@mui/icons-material/Done';
import ContextMenuHandler from './ContextMenuHandler';

import { GraphLocation } from '@mracsys/randomizer-graph-tool';

interface LocationCheckProps {
    lkey: string,
    location: GraphLocation,
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
    handleCheck,
    handleUnCheck,
    handleContextMenu,
    toggleWalletTiers,
    updateShopPrice,
    showShopInput,
    showShopRupee,
}: LocationCheckProps) => {
    let locationIcons: {[locationType: string]: string} = {
        "Gold Skulltula Token": '/images/OoT_Token_Icon.png',
        "Map": '/images/OoT_Dungeon_Map_Icon.png',
        "Compass": '/images/OoT_Compass_Icon.png',
        "Small Key": '/images/OoT_Small_Key_Icon.png',
        "Boss Key": '/images/OoT_Boss_Key_Icon.png',
    };
    let logicColor: string;
    if (location.visited) {
        logicColor = 'logicalGreen';
    } else if (location.visited_with_other_tricks) {
        logicColor = 'logicalYellow';
    } else {
        logicColor = 'logicalBlank';
    }
    return (
        <div className='logicContainer'>
            <div className={logicColor} />
            <div
                className="locationContainer"
                key={lkey}
                onClick={ location.checked ?
                            () => handleUnCheck(location.name) :
                            () => handleCheck(location.name)
                        }
                onContextMenu={handleContextMenu.onContextMenu}
                onTouchStart={handleContextMenu.onTouchStart}
                onTouchCancel={handleContextMenu.onTouchCancel}
                onTouchEnd={handleContextMenu.onTouchEnd}
                onTouchMove={handleContextMenu.onTouchMove}
                data-source={location.name}
            >
                {
                    location.vanilla_item !== null && locationIcons.hasOwnProperty(location.vanilla_item.name.split(' (')[0]) ?
                    <img src={locationIcons[location.vanilla_item.name.split(' (')[0]]} alt={location.vanilla_item.name} className="locationIcon" /> :
                    <div className="locationIconBlank" />
                }
                <p className="locationText"><em>{location.alias}</em></p>
                {
                    (location.type === 'Shop' && location.item !== null) ?
                        <React.Fragment>
                            { showShopInput ?
                                <input
                                    name={location + "shopprice"}
                                    onClick={(e) => {e.stopPropagation()}}
                                    className="priceBox"
                                    defaultValue={!!(location.price) ? location.price : ""}
                                    onBlur={(e) => {
                                        updateShopPrice(location.name, e.currentTarget.value);
                                    }}
                                /> : null
                            }
                            { showShopRupee ?
                                <div 
                                    className="locationWalletTier"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWalletTiers(location.name);
                                    }}>
                                    <OotItemIcon
                                        itemName=''
                                        price={!!location.price ? location.price : 0}
                                    />
                                </div> : null
                            }
                        </React.Fragment>
                        : null
                }
                {
                    location.item === null ?
                        null :
                        <OotItemIcon
                            itemName={location.item.name}
                            className="locationKnownItem"
                        />
                }
                {
                    location.checked ?
                        <DoneIcon className="locationMark" /> :
                        <CheckBoxOutlineBlankIcon className="locationMark" />
                }
            </div>
        </div>
    );
}

export default LocationCheck