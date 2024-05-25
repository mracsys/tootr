import React from 'react';

import OotItemIcon from './OotItemIcon';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DoneIcon from '@mui/icons-material/Done';
import ContextMenuHandler from './ContextMenuHandler';

import { GraphLocation } from '@mracsys/randomizer-graph-tool';
import LogicIndicator from './LogicIndicator';

import '@/styles/LocationCheck.css';

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
    return (
        <LogicIndicator spot={location}>
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
                                    name={location.name + "shopprice"}
                                    onClick={(e) => {e.stopPropagation()}}
                                    className="priceBox"
                                    value={!!(location.price) ? location.price : ""}
                                    onChange={(e) => {
                                        updateShopPrice(location.name, e.currentTarget.value);
                                    }}
                                    key={location.name + "shopprice"}
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
                    location.skipped ?
                        <div className='locationMark'></div> :
                        location.checked ?
                            <DoneIcon className="locationMark" /> :
                            <CheckBoxOutlineBlankIcon className="locationMark" />
                }
            </div>
        </LogicIndicator>
    );
}

export default LocationCheck