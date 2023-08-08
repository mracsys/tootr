import React from 'react';

import OotIcon from './OotIcon';
import AddIcon from '@mui/icons-material/Add';

const FixedShopCheck = (props) => {
    return (
        <div
            key={props.lkey}
            onClick={props.handleContextMenu.onContextMenu}
            onContextMenu={props.handleContextMenu.onContextMenu}
            onTouchStart={props.handleContextMenu.onTouchStart}
            onTouchCancel={props.handleContextMenu.onTouchCancel}
            onTouchEnd={props.handleContextMenu.onTouchEnd}
            onTouchMove={props.handleContextMenu.onTouchMove}
            data-source={props.location}
        >
            {
                props.allAreas.locations[props.location].foundItem === "" ?
                    <AddIcon className="fixedShopIcon" />
                    /*<p className="fixedShopIcon">+</p>*/ :
                    <OotIcon
                        itemName={props.allAreas.locations[props.location].foundItem}
                        className="locationKnownItem"
                        classes={props.classes}
                    />
            }
        </div>
    );
}

export default FixedShopCheck