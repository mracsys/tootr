import OotItemIcon, { haveOotItemIcon } from './OotItemIcon';
import AddIcon from '@mui/icons-material/Add';
import type ContextMenuHandler from './ContextMenuHandler';
import { GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/FixedShopCheck.css';

interface FixedShopCheckProps {
    lkey: string,
    location: GraphLocation,
    handleContextMenu: ContextMenuHandler,
}

const FixedShopCheck = ({
    lkey,
    location,
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
            data-source={location.name}
        >
            {
                location.item === null || !haveOotItemIcon(location.item.name) ?
                    <AddIcon className="fixedShopIcon" />
                    /*<p className="fixedShopIcon">+</p>*/ :
                    <OotItemIcon
                        itemName={location.item.name}
                        className="fixedShopIcon"
                    />
            }
        </div>
    );
}

export default FixedShopCheck