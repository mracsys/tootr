import React from 'react';

import OotIcon from './OotIcon';
import AddIcon from '@mui/icons-material/Add';
import type { AllAreas } from './Tracker';
import type ContextMenuHandler from './ContextMenuHandler';

interface FixedShopCheckProps {
    lkey: string,
    location: string,
    allAreas: AllAreas,
    handleContextMenu: ContextMenuHandler,
}

const FixedShopCheck = ({
    lkey,
    location,
    allAreas,
    handleContextMenu,
}: FixedShopCheckProps) => {
    return (
        <div
            key={lkey}
            onClick={handleContextMenu.onContextMenu}
            onContextMenu={handleContextMenu.onContextMenu}
            onTouchStart={handleContextMenu.onTouchStart}
            onTouchCancel={handleContextMenu.onTouchCancel}
            onTouchEnd={handleContextMenu.onTouchEnd}
            onTouchMove={handleContextMenu.onTouchMove}
            data-source={location}
        >
            {
                allAreas.locations[location].foundItem === "" ?
                    <AddIcon className="fixedShopIcon" />
                    /*<p className="fixedShopIcon">+</p>*/ :
                    <OotIcon
                        itemName={allAreas.locations[location].foundItem}
                        className="locationKnownItem"
                    />
            }
        </div>
    );
}

export default FixedShopCheck