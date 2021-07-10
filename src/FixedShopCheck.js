import React from 'react';

import OotIcon from './OotIcon';
import AddIcon from '@material-ui/icons/Add';

class FixedShopCheck extends React.Component {
    render() {
        return (
            <div
                key={this.props.lkey}
                onClick={this.props.handleContextMenu.onContextMenu}
                onContextMenu={this.props.handleContextMenu.onContextMenu}
                onTouchStart={this.props.handleContextMenu.onTouchStart}
                onTouchCancel={this.props.handleContextMenu.onTouchCancel}
                onTouchEnd={this.props.handleContextMenu.onTouchEnd}
                onTouchMove={this.props.handleContextMenu.onTouchMove}
                data-source={this.props.location}
            >
                {
                    this.props.allAreas.locations[this.props.location].foundItem === "" ?
                        <AddIcon className={this.props.classes.fixedShopIcon} />
                        /*<p className={this.props.classes.fixedShopIcon}>+</p>*/ :
                        <OotIcon
                            itemName={this.props.allAreas.locations[this.props.location].foundItem}
                            className={this.props.classes.locationKnownItem}
                            classes={this.props.classes}
                        />
                }
            </div>
        );
    }
}

export default FixedShopCheck