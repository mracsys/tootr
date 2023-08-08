import React from 'react';
import { Menu, Grid } from '@mui/material';

import OotIcon from './OotIcon';

const ShopItemMenu = (props) => {
    return (
        <Menu
            id="shopItems"
            anchorEl={props.anchorLocation}
            open={Boolean(props.anchorLocation)}
            onClose={props.handleClose}
            className="locationItemMenu"
            TransitionProps={{ timeout: 0 }}
            wrap="nowrap"
            disableScrollLock={true}
        >
            <div>
                <Grid container spacing={0} className={props.itemMenuRow}>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Goron Tunic">
                        <OotIcon classes={props.classes} itemName="Goron Tunic" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Zora Tunic">
                        <OotIcon classes={props.classes} itemName="Zora Tunic" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bombs">
                        <OotIcon classes={props.classes} itemName="Bombs" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bombchu">
                        <OotIcon classes={props.classes} itemName="Bombchu" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Shield">
                        <OotIcon classes={props.classes} itemName="Deku Shield" className="locationMenuIcon" />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={props.itemMenuRow}>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Blue Fire">
                        <OotIcon classes={props.classes} itemName="Blue Fire" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Stick">
                        <OotIcon classes={props.classes} itemName="Deku Stick" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Arrows">
                        <OotIcon classes={props.classes} itemName="Arrows" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Seeds">
                        <OotIcon classes={props.classes} itemName="Deku Seeds" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Hylian Shield">
                        <OotIcon classes={props.classes} itemName="Hylian Shield" className="locationMenuIcon" />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className={props.itemMenuRow}>
                    <Grid item xs={12} onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="">
                        <p className="locationMenuClear">Clear Item</p>
                    </Grid>
                </Grid>
            </div>
        </Menu>
    );
}

export default ShopItemMenu