import React from 'react';
import OotItemIcon, { haveOotItemIcon } from './OotItemIcon';
import AddIcon from '@mui/icons-material/Add';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import type ContextMenuHandler from './ContextMenuHandler';
import { GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/FixedShopCheck.css';

interface FixedShopCheckProps {
    lkey: string,
    location: GraphLocation,
    handleCheck: (locationName: string) => void,
    handleUnCheck: (locationName: string) => void,
    handleContextMenu: ContextMenuHandler,
    simMode: boolean,
    peekedLocations: Set<string>,
}

const FixedShopCheck = ({
    lkey,
    location,
    handleCheck,
    handleUnCheck,
    handleContextMenu,
    simMode,
    peekedLocations,
}: FixedShopCheckProps) => {
    return (
        <div
            key={lkey}
            onClick={ location.item === null ?
                        handleContextMenu.onContextMenu
                        : location.checked ?
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
                location.item === null || !haveOotItemIcon(location.item.name) ?
                    <AddIcon className="fixedShopIcon" />
                    /*<p className="fixedShopIcon">+</p>*/ :
                    (!simMode || location.checked || !location.shuffled || peekedLocations.has(location.name)) ?
                        <OotItemIcon
                            itemName={location.item.name}
                            className="fixedShopIcon"
                        />
                        : <QuestionMarkIcon className='fixedShopIcon' />
            }
        </div>
    );
}

export default FixedShopCheck