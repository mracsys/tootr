import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import tokenIcon from './OoT_Token_Icon.png';
import mapIcon from './OoT_Dungeon_Map_Icon.png';
import compassIcon from './OoT_Compass_Icon.png';
import smallKeyIcon from './OoT_Small_Key_Icon.png';
import bossKeyIcon from './OoT_Boss_Key_Icon.png';
import noteIcon from './Grey_Note.png';
import ListItem from '@material-ui/core/ListItem';


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
            <ListItem
                button
                className={this.props.classes.locationContainer}
                key={this.props.lkey}
                onClick={
                    this.props.allAreas.locations[this.props.location].check === "" ?
                        () => this.props.handleCheck(this.props.location) :
                        () => this.props.handleUnCheck(this.props.location)
                }
            >
                {
                    locationIcons.hasOwnProperty(this.props.allAreas.locations[this.props.location].type) ?
                    <img src={locationIcons[this.props.allAreas.locations[this.props.location].type]} alt="Gold Skulltula" className={this.props.classes.locationIcon} /> :
                    <Box className={this.props.classes.locationIconBlank} />
                }
                <Typography variant="body2" className={this.props.classes.locationText}><em>{this.props.allAreas.locations[this.props.location].alias}</em></Typography>
                {
                    this.props.allAreas.locations[this.props.location].check === "" ?
                        <CheckBoxOutlineBlankIcon className={this.props.classes.locationMark} /> :
                        <DoneIcon className={this.props.classes.locationMark} />
                }
            </ListItem>
        );
    }
}

export default LocationCheck