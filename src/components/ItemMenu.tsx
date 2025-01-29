import React, { MouseEventHandler, useState } from 'react';
import { Menu } from '@mui/material';
import OotItemIcon from "./OotItemIcon";
import { RadialMenu } from "./RadialMenu";
import { item_menu_layout } from '@/data/location_item_menu_layout';

import '@/styles/ItemMenu.css';

export interface ItemMenuProps {
    anchorLocation?: Element | null,
    sourceLocation: string | null,
    menuLayout: item_menu_layout,
    handleClose: () => void,
    handleFind: MouseEventHandler,
    showClearButton: boolean,
}

const ItemMenu = ({
    anchorLocation,
    sourceLocation,
    menuLayout,
    handleClose,
    handleFind,
    showClearButton,
}: ItemMenuProps) => {
    let [anchor, setAnchor] = useState<Element | null>(null);
    let openSubMenu: MouseEventHandler = (e) => {
        setAnchor(e.target as Element);
    }
    let handleSubClose = () => {
        setAnchor(null);
    }
    let handleSubFind: MouseEventHandler = (e) => {
        handleFind(e);
        handleSubClose();
    }
    return (
        <Menu
            id="noKeysanityItems"
            anchorEl={anchorLocation}
            open={Boolean(anchorLocation)}
            onClose={() => {
                handleSubClose();
                handleClose();
            }}
            className="locationItemMenu"
            TransitionProps={{ timeout: 0 }}
            disableScrollLock={true}
        >
            {
                menuLayout.map((menu_row, i) => {
                    return (
                        <div className="itemMenuRow" key={`itemMenuRow${i}`}>
                            {
                            menu_row.map((row_item, j) => {
                                return (
                                    typeof row_item === 'object' ?
                                        !!row_item.menu_list ?
                                            <React.Fragment key={`itemMenuRow${i}item${j}`}>
                                                <OotItemIcon onClick={openSubMenu} itemName={row_item.button_item} />
                                                <ItemMenu
                                                    anchorLocation={anchor}
                                                    sourceLocation={sourceLocation}
                                                    menuLayout={row_item.menu_list}
                                                    handleClose={handleSubClose}
                                                    handleFind={handleSubFind}
                                                    showClearButton={false}
                                                />
                                            </React.Fragment>
                                        : !!row_item.item_list ?
                                            <RadialMenu
                                                sourceLocation={sourceLocation}
                                                handleFind={handleFind}
                                                buttonItem={row_item.button_item}
                                                itemList={row_item.item_list}
                                                key={`itemMenuRow${i}item${j}`}
                                            />
                                        : null
                                    : <OotItemIcon
                                        onClick={handleFind}
                                        sourceLocation={sourceLocation}
                                        itemName={row_item}
                                        key={`itemMenuRow${i}item${j}`}
                                    />
                                )
                            })
                            }
                        </div>
                    )
                })
            }
            {
            showClearButton ?
            <div className="itemMenuRow">
                <div className="itemMenuClear" onClick={handleFind} data-found-in={sourceLocation} data-found-item="">
                    <p className="locationMenuClear">Clear Item</p>
                </div>
            </div>
            : null
            }
        </Menu>
    );
}

export default ItemMenu