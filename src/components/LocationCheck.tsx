import React from 'react';

import OotItemIcon from './OotItemIcon';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContextMenuHandler from './ContextMenuHandler';
import LogicIndicator from './LogicIndicator';
import { buildExitName, buildExitEntranceName } from './UnknownEntrance';

import { GraphLocation } from '@mracsys/randomizer-graph-tool';

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
    showAgeLogic: boolean,
    simMode: boolean,
    lastLocationName: string[],
    collapseRegion: string,
    peekedLocations: Set<string>,
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
    showAgeLogic,
    simMode,
    lastLocationName,
    collapseRegion,
    peekedLocations,
}: LocationCheckProps) => {
    let locationIcons: {[locationType: string]: string} = {
        "HintStone": "/images/gossip-stone_32x32.png",
        "Gold Skulltula Token": '/images/OoT_Token_Icon.png',
        "Map": '/images/OoT_Dungeon_Map_Icon.png',
        "Compass": '/images/OoT_Compass_Icon.png',
        "Small Key": '/images/OoT_Small_Key_Icon.png',
        "Boss Key": '/images/OoT_Boss_Key_Icon.png',
    };
    return (
        <LogicIndicator spot={location} showAgeLogic={showAgeLogic}>
            <div
                className={`locationContainer ${collapseRegion !== 'none' && lastLocationName.includes(location.name) ? 'checkedLocationContainer': ''}`}
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
                    location.is_hint ? <img src="/images/gossip-stone_32x32.png" alt="Gossip Stone" className="locationIcon" /> :
                    <div className="locationIconBlank" />
                }
                <p className="locationText"><em>{location.alias}</em></p>
                {
                    location.is_hint && !!location.hint && (!simMode || location.checked) ?
                        <React.Fragment>
                            {
                                location.hint.type === 'woth' ?
                                    <React.Fragment>
                                    <span className='locationHintRegion'>{location.hint.area?.name}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <span className='locationHintType'>WOTH</span>
                                    </React.Fragment>
                                : location.hint.type === 'goal' && !!location.hint.goal ?
                                    <React.Fragment>
                                    <span className='locationHintRegion'>{location.hint.area?.name}</span>
                                    <ArrowForwardIcon className='locationHintArrow' />
                                    {
                                        !!location.hint.goal.item ?
                                            <OotItemIcon
                                                itemName={location.hint.goal.item.name}
                                                className="locationKnownItem"
                                            />
                                        : !!location.hint.goal.location ?
                                            <OotItemIcon
                                                itemName={location.hint.goal.location.name}
                                                className="locationKnownItem"
                                            />
                                        : null
                                    }
                                    </React.Fragment>
                                : location.hint.type === 'foolish' ?
                                    <React.Fragment>
                                    <span className='locationHintRegion'>{location.hint.area?.name}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <span className='locationHintType'>Foolish</span>
                                    </React.Fragment>
                                : location.hint.type === 'location' && !!location.hint.item ?
                                    <React.Fragment>
                                    <span className='locationHintLocation'>{location.hint.location?.alias}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <OotItemIcon
                                        itemName={location.hint.item.name}
                                        className="locationKnownItem"
                                    />
                                    </React.Fragment>
                                : location.hint.type === 'dual' && !!location.hint.item && !!location.hint.item2 ?
                                    <React.Fragment>
                                    <span className='locationHintLocation'>{location.hint.location?.alias}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <OotItemIcon
                                        itemName={location.hint.item.name}
                                        className="locationKnownItem"
                                    />
                                    <span className='locationHintComma'>,</span>
                                    <span className='locationHintLocation'>{location.hint.location2?.alias}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <OotItemIcon
                                        itemName={location.hint.item2.name}
                                        className="locationKnownItem"
                                    />
                                    </React.Fragment>
                                : location.hint.type === 'entrance' && !!location.hint.entrance && !!location.hint.entrance.replaces ?
                                    <React.Fragment>
                                    <span className='locationHintEntrance'>
                                        <div className="entranceLink">
                                            <div className="entranceLink1">
                                                {buildExitName(location.hint.entrance, true)}
                                            </div>
                                            <div className="entranceLink2">
                                                {buildExitEntranceName(location.hint.entrance, true)}
                                            </div>
                                        </div>
                                    </span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <span className='locationHintEntrance'>
                                        <div className="entranceLink">
                                            <div className="entranceLink1">
                                                {buildExitName(location.hint.entrance.replaces)}
                                            </div>
                                            <div className="entranceLink2">
                                                {buildExitEntranceName(location.hint.entrance.replaces)}
                                            </div>
                                        </div>
                                    </span>
                                    </React.Fragment>
                                : location.hint.type === 'misc' && !!location.hint.item ?
                                    <React.Fragment>
                                    <span className='locationHintRegion'>{location.hint.area?.name}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <OotItemIcon
                                        itemName={location.hint.item.name}
                                        className="locationKnownItem"
                                    />
                                    </React.Fragment>
                                : location.hint.type === 'important_check' ?
                                    <React.Fragment>
                                    <span className='locationHintRegion'>{location.hint.area?.name}</span>
                                    <span className='locationHintEqualSign'>=</span>
                                    <span className='locationHintRegion'>{location.hint.area?.num_major_items} Major Items</span>
                                    </React.Fragment>
                                : null
                            }

                        </React.Fragment>
                        : null
                }
                {
                    (location.type === 'Shop' && location.item !== null && (!simMode || location.checked || location.hinted)) ?
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
                    location.item === null || (simMode && !peekedLocations.has(location.name) && !location.checked && !location.hinted && !location.skipped) ?
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