import React from 'react';
import { Menu, Grid } from '@material-ui/core';

import OotIcon from './OotIcon';

class ShopItemMenu extends React.Component {
    render() {
        return (
            <Menu
                id="shopItems"
                anchorEl={this.props.anchorLocation}
                open={Boolean(this.props.anchorLocation)}
                onClose={this.props.handleClose}
                className={this.props.classes.locationItemMenu}
                TransitionProps={{ timeout: 0 }}
                wrap="nowrap"
                disableScrollLock={true}
            >
                <div>
                    <Grid container spacing={0} className={this.props.itemMenuRow}>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Goron Tunic">
                            <OotIcon classes={this.props.classes} itemName="Goron Tunic" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Zora Tunic">
                            <OotIcon classes={this.props.classes} itemName="Zora Tunic" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Bombs">
                            <OotIcon classes={this.props.classes} itemName="Bombs" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Bombchu">
                            <OotIcon classes={this.props.classes} itemName="Bombchu" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} className={this.props.itemMenuRow}>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Blue Fire">
                            <OotIcon classes={this.props.classes} itemName="Blue Fire" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Deku Stick">
                            <OotIcon classes={this.props.classes} itemName="Deku Stick" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Arrows">
                            <OotIcon classes={this.props.classes} itemName="Arrows" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                        <Grid item xs onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="Deku Seeds">
                            <OotIcon classes={this.props.classes} itemName="Deku Seeds" className={this.props.classes.locationMenuIcon} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} className={this.props.itemMenuRow}>
                        <Grid item xs={12} onClick={this.props.handleFind} data-found-in={this.props.sourceLocation} data-found-item="">
                            <p className={this.props.classes.locationMenuClear}>Clear Item</p>
                        </Grid>
                    </Grid>
                </div>
            </Menu>
        );
    }
}

export default ShopItemMenu