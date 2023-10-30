import { MouseEventHandler } from 'react';
import { Menu } from '@mui/material';
import { ItemGrid } from './ItemGrid';

export interface ItemMenuProps {
    anchorLocation?: Element | null,
    sourceLocation: string | null,
    handleClose: () => void,
    handleFind: MouseEventHandler,
}

const ItemMenu = ({
    anchorLocation,
    sourceLocation,
    handleClose,
    handleFind,
}: ItemMenuProps) => {
    return (
        <Menu
            id="noKeysanityItems"
            anchorEl={anchorLocation}
            open={Boolean(anchorLocation)}
            onClose={handleClose}
            className="locationItemMenu"
            TransitionProps={{ timeout: 0 }}
            disableScrollLock={true}
            classes={{paper: "itemMenuPaper"}}
        >
            <ItemGrid
                sourceLocation={sourceLocation}
                handleFind={handleFind}
            />
            <div className="itemMenuRow">
                <div className="itemMenuClear" onClick={handleFind} data-found-in={sourceLocation} data-found-item="">
                    <p className="locationMenuClear">Clear Item</p>
                </div>
            </div>
        </Menu>
    );
}

export default ItemMenu