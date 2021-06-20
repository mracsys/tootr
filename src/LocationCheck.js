import React from 'react';

import OotIcon from './OotIcon';

import tokenIcon from './images/OoT_Token_Icon.png';
import mapIcon from './images/OoT_Dungeon_Map_Icon.png';
import compassIcon from './images/OoT_Compass_Icon.png';
import smallKeyIcon from './images/OoT_Small_Key_Icon.png';
import bossKeyIcon from './images/OoT_Boss_Key_Icon.png';
import noteIcon from './images/Grey_Note.png';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';

class LocationCheck extends React.Component {
    render() {
        let locationIcons = {
            "skulltula": tokenIcon,
            "map": mapIcon,
            "compass": compassIcon,
            "smallKey": smallKeyIcon,
            "bossKey": bossKeyIcon,
            "song": noteIcon
        };
        return (
            <div
                className={this.props.classes.locationContainer}
                key={this.props.lkey}
                onClick={ this.props.allAreas.locations[this.props.location].check === "" ?
                            () => this.props.handleCheck(this.props.location) :
                            () => this.props.handleUnCheck(this.props.location)
                        }
                onContextMenu={this.props.handleItemMenuOpen}
                data-source={this.props.location}
            >
                {
                    locationIcons.hasOwnProperty(this.props.allAreas.locations[this.props.location].type) ?
                    <img src={locationIcons[this.props.allAreas.locations[this.props.location].type]} alt="Gold Skulltula" className={this.props.classes.locationIcon} /> :
                    <div className={this.props.classes.locationIconBlank} />
                }
                <p className={this.props.classes.locationText}><em>{this.props.allAreas.locations[this.props.location].alias}</em></p>
                {
                    this.props.allAreas.locations[this.props.location].foundItem === "" ?
                        null :
                        <OotIcon
                            itemName={this.props.allAreas.locations[this.props.location].foundItem}
                            className={this.props.classes.locationKnownItem}
                            classes={this.props.classes}
                        />
                }
                {
                    this.props.allAreas.locations[this.props.location].check === "" ?
                        <CheckBoxOutlineBlankIcon className={this.props.classes.locationMark} /> :
                        <DoneIcon className={this.props.classes.locationMark} />
                }
            </div>
        );
    }
}

export default LocationCheck