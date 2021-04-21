import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

import ItemMenu from './ItemMenu';

import tokenIcon from './images/OoT_Token_Icon.png';
import mapIcon from './images/OoT_Dungeon_Map_Icon.png';
import compassIcon from './images/OoT_Compass_Icon.png';
import smallKeyIcon from './images/OoT_Small_Key_Icon.png';
import bossKeyIcon from './images/OoT_Boss_Key_Icon.png';
import noteIcon from './images/Grey_Note.png';

class LocationCheck extends React.Component {
    constructor(props) {
        super(props);

        this.handleItemMenuOpen = this.handleItemMenuOpen.bind(this);
        this.handleItemMenuClose = this.handleItemMenuClose.bind(this);

        this.state = {
            itemMenuOpen: null,
        };
    }

    handleItemMenuOpen(location) {
        this.setState({
            itemMenuOpen: location.currentTarget,
        });
    }

    handleItemMenuClose() {
        this.setState({
            itemMenuOpen: null,
        });
    }

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
                onClick={ () => { return true }
                    /*this.props.allAreas.locations[this.props.location].check === "" ?
                        () => this.props.handleCheck(this.props.location) :
                        () => this.props.handleUnCheck(this.props.location)*/
                }
            >
                {
                    locationIcons.hasOwnProperty(this.props.allAreas.locations[this.props.location].type) ?
                    <img src={locationIcons[this.props.allAreas.locations[this.props.location].type]} alt="Gold Skulltula" className={this.props.classes.locationIcon} /> :
                    <Box className={this.props.classes.locationIconBlank} />
                }
                <Typography variant="body2" className={this.props.classes.locationText}><em>{this.props.allAreas.locations[this.props.location].alias}</em></Typography>
                <VisibilityIcon className={this.props.classes.locationMark} />
                <Box className={this.props.classes.locationUnknownItem} onClick={this.handleItemMenuOpen} />
                <ItemMenu classes={this.props.classes} handleClose={this.handleItemMenuClose} anchorLocation={this.state.itemMenuOpen} />
                {/*
                    this.props.allAreas.locations[this.props.location].check === "" ?
                        <CheckBoxOutlineBlankIcon className={this.props.classes.locationMark} /> :
                        <DoneIcon className={this.props.classes.locationMark} />
                */}
            </ListItem>
        );
    }
}

export default LocationCheck