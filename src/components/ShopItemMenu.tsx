import { Menu, Grid } from '@mui/material';

import OotItemIcon from './OotItemIcon';
import type { ItemMenuProps } from './ItemMenu';


const ShopItemMenu = (props: ItemMenuProps) => {
    return (
        <Menu
            id="shopItems"
            anchorEl={props.anchorLocation}
            open={Boolean(props.anchorLocation)}
            onClose={props.handleClose}
            className="locationItemMenu"
            TransitionProps={{ timeout: 0 }}
            disableScrollLock={true}
        >
            <div>
                <Grid container spacing={0} className="itemMenuRow">
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Goron Tunic">
                        <OotItemIcon itemName="Buy Goron Tunic" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Zora Tunic">
                        <OotItemIcon itemName="Buy Zora Tunic" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Bombs (20)">
                        <OotItemIcon itemName="Buy Bombs (20)" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Bombchu (5)">
                        <OotItemIcon itemName="Buy Bombchu (5)" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Deku Shield">
                        <OotItemIcon itemName="Buy Deku Shield" className="locationMenuIcon" />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="itemMenuRow">
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Blue Fire">
                        <OotItemIcon itemName="Buy Blue Fire" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Deku Stick (1)">
                        <OotItemIcon itemName="Buy Deku Stick (1)" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Arrows (30)">
                        <OotItemIcon itemName="Buy Arrows (30)" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Deku Seeds (30)">
                        <OotItemIcon itemName="Buy Deku Seeds (30)" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Buy Hylian Shield">
                        <OotItemIcon itemName="Buy Hylian Shield" className="locationMenuIcon" />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="itemMenuRow">
                    <Grid item xs={12} onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="">
                        <p className="locationMenuClear">Clear Item</p>
                    </Grid>
                </Grid>
            </div>
        </Menu>
    );
}

export default ShopItemMenu