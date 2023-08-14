import { Menu, Grid } from '@mui/material';

import OotIcon from './OotIcon';
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
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Goron Tunic">
                        <OotIcon itemName="Goron Tunic" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Zora Tunic">
                        <OotIcon itemName="Zora Tunic" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bombs">
                        <OotIcon itemName="Bombs" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Bombchu">
                        <OotIcon itemName="Bombchu" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Shield">
                        <OotIcon itemName="Deku Shield" className="locationMenuIcon" />
                    </Grid>
                </Grid>
                <Grid container spacing={0} className="itemMenuRow">
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Blue Fire">
                        <OotIcon itemName="Blue Fire" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Stick">
                        <OotIcon itemName="Deku Stick" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Arrows">
                        <OotIcon itemName="Arrows" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Deku Seeds">
                        <OotIcon itemName="Deku Seeds" className="locationMenuIcon" />
                    </Grid>
                    <Grid item xs onClick={props.handleFind} data-found-in={props.sourceLocation} data-found-item="Hylian Shield">
                        <OotIcon itemName="Hylian Shield" className="locationMenuIcon" />
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