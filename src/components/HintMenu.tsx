import React, { useState, MouseEventHandler, MouseEvent, useEffect } from "react";
import TabPanel from "./TabPanel";
import { Menu, Tabs, Tab } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EntranceMenu from './EntranceMenu';
import ItemMenu from './ItemMenu';
import ListMenu from "./ListMenu";
import { location_item_menu_layout } from '@/data/location_item_menu_layout';

import { GraphRegion, GraphEntrancePool, GraphLocation } from '@mracsys/randomizer-graph-tool';

interface HintMenuProps {
    anchorLocation?: Element | null,
    sourceLocation: string | null,
    sourceLocationType: string,
    handleClose: () => void,
    handleFind: (data: HintMenuData) => void,
    clearHint: () => void,
    regions: GraphRegion[],
    fullEntrancePool: GraphEntrancePool,
    fullExitPool: GraphEntrancePool,
    locations: GraphLocation[],
}

export interface HintMenuData {
    hintType: string,
    hintRegion?: string,
    hintPath?: string,
    hintLocation?: string,
    hintEntrance?: string,
    hintEntranceTarget?: string,
    hintItem?: string,
}

// No path list support in the library because
// it would be painful to support these in a random
// settings context. Just hard code them all.
export const pathIcons: string[] = [
    'Gold',
    'Time',
    'Evil\'s Bane',
    'Skulls',
    'Hearts',
    'Key',
    'Queen Gohma',
    'King Dodongo',
    'Barinade',
    'Phantom Ganon',
    'Volvagia',
    'Morpha',
    'Twinrova',
    'Bongo Bongo',
    'Tower',
    'Hero',
    'Kokiri Emerald',
    'Goron Ruby',
    'Zora Sapphire',
    'Forest Medallion',
    'Fire Medallion',
    'Water Medallion',
    'Spirit Medallion',
    'Shadow Medallion',
    'Light Medallion',
]

export const pathLocations: {[pathName: string]: string} = {
    'Queen Gohma': 'Queen Gohma',
    'King Dodongo': 'King Dodongo',
    'Barinade': 'Barinade',
    'Phantom Ganon': 'Phantom Ganon',
    'Volvagia': 'Volvagia',
    'Morpha': 'Morpha',
    'Twinrova': 'Twinrova',
    'Tower': 'Ganons Tower Boss Key Chest',
    'Hero': 'Ganon',
}

export const pathItems: {[pathName: string]: string} = {
    'Gold': 'Triforce Piece',
    'Time': 'Song of Time',
    'Evil\'s Bane': 'Light Arrows',
    'Skulls': 'Gold Skulltula Token',
    'Hearts': 'Heart Container',
    'Key': 'Boss Key (Ganons Castle)',
    'Kokiri Emerald': 'Kokiri Emerald',
    'Goron Ruby': 'Goron Ruby',
    'Zora Sapphire': 'Zora Sapphire',
    'Forest Medallion': 'Forest Medallion',
    'Fire Medallion': 'Fire Medallion',
    'Water Medallion': 'Water Medallion',
    'Spirit Medallion': 'Spirit Medallion',
    'Shadow Medallion': 'Shadow Medallion',
    'Light Medallion': 'Light Medallion',
}

const HintMenu = ({
    anchorLocation,
    sourceLocation,
    sourceLocationType,
    handleClose,
    handleFind,
    clearHint,
    regions,
    fullEntrancePool,
    fullExitPool,
    locations,

}: HintMenuProps) => {
    const [tabValue, setTabValue] = useState<number>(0);

    const [hintRegion, setHintRegion] = useState<string>('');
    const [hintPath, setHintPath] = useState<string>('');
    const [hintLocation, setHintLocation] = useState<string>('');
    const [hintItem, setHintItem] = useState<string>('');
    const [hintEntrance, setHintEntrance] = useState<string>('');
    const [hintEntranceTarget, setHintEntranceTarget] = useState<string>('');

    const [itemMenuOpen, setItemMenuOpen] = useState<Element | null>(null);
    const [entranceMenuOpen, setEntranceMenuOpen] = useState<Element | null>(null);
    const [exitMenuOpen, setExitMenuOpen] = useState<Element | null>(null);
    const [regionMenuOpen, setRegionMenuOpen] = useState<Element | null>(null);
    const [pathMenuOpen, setPathMenuOpen] = useState<Element | null>(null);
    const [locationMenuOpen, setLocationMenuOpen] = useState<Element | null>(null);

    useEffect(() => {
        if (anchorLocation === null) {
            setHintRegion('');
            setHintPath('');
            setHintLocation('');
            setHintItem('');
            setHintEntrance('');
            setHintEntranceTarget('');
        }
    }, [anchorLocation]);

    useEffect(() => {
        if (sourceLocationType !== 'HintStone') {
            if (hintRegion && hintItem) {
                let data: HintMenuData = {
                    hintType: 'misc',
                    hintRegion: hintRegion,
                    hintItem: hintItem,
                }
                handleFind(data);
            }
        } else {
            switch(tabValue) {
                case 0:
                    if (hintRegion) {
                        let data: HintMenuData = {
                            hintType: 'woth',
                            hintRegion: hintRegion,
                        }
                        handleFind(data);
                    }
                    break;
                case 1:
                    if (hintRegion && hintPath) {
                        let data: HintMenuData = {
                            hintType: 'path',
                            hintRegion: hintRegion,
                            hintPath: hintPath,
                        }
                        handleFind(data);
                    }
                    break;
                case 2:
                    if (hintRegion) {
                        let data: HintMenuData = {
                            hintType: 'foolish',
                            hintRegion: hintRegion,
                        }
                        handleFind(data);
                    }
                    break;
                case 3:
                    if (hintLocation && hintItem) {
                        let data: HintMenuData = {
                            hintType: 'location',
                            hintLocation: hintLocation,
                            hintItem: hintItem,
                        }
                        handleFind(data);
                    }
                    break;
                case 4:
                    if (hintEntrance && hintEntranceTarget) {
                        let data: HintMenuData = {
                            hintType: 'entrance',
                            hintEntrance: hintEntrance,
                            hintEntranceTarget: hintEntranceTarget,
                        }
                        handleFind(data);
                    }
                    break;
                default:
                    break;
            }
        }
    }, [hintRegion, hintPath, hintLocation, hintItem, hintEntrance, hintEntranceTarget]);

    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
        setHintRegion('');
        setHintPath('');
        setHintLocation('');
        setHintItem('');
        setHintEntrance('');
        setHintEntranceTarget('');
    }

    const handleRegionMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setRegionMenuOpen(e.currentTarget);
    }

    const handleRegionMenuClose = () => {
        setRegionMenuOpen(null);
    }

    const handleFindRegion: MouseEventHandler<HTMLDivElement> = (e): void => {
        const region = e.currentTarget.getAttribute('data-found-item');
        if (!!region) {
            setHintRegion(region);
        }
        handleRegionMenuClose();
    }

    const handlePathMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setPathMenuOpen(e.currentTarget);
    }

    const handlePathMenuClose = () => {
        setPathMenuOpen(null);
    }

    const handleFindPath: MouseEventHandler<HTMLDivElement> = (e): void => {
        const path = e.currentTarget.getAttribute('data-found-item');
        if (!!path) {
            setHintPath(path);
        }
        handlePathMenuClose();
    }

    const handleLocationMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setLocationMenuOpen(e.currentTarget);
    }

    const handleLocationMenuClose = () => {
        setLocationMenuOpen(null);
    }

    const handleFindLocation: MouseEventHandler<HTMLDivElement> = (e): void => {
        const location = e.currentTarget.getAttribute('data-found-item');
        if (!!location) {
            setHintLocation(location);
        }
        handleLocationMenuClose();
    }

    const handleItemMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setItemMenuOpen(e.currentTarget);
    }

    const handleItemMenuClose = () => {
        setItemMenuOpen(null);
    }

    const handleFindItem: MouseEventHandler<HTMLDivElement> = (e): void => {
        const item = e.currentTarget.getAttribute('data-found-item');
        if (!!item) {
            setHintItem(item);
        }
        handleItemMenuClose();
    }

    const handleEntranceMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setEntranceMenuOpen(e.currentTarget);
    }

    const handleEntranceMenuClose = () => {
        setEntranceMenuOpen(null);
    }

    const handleFindEntrance = (_: string, entrance: string): void => {
        if (!!entrance) {
            setHintEntranceTarget(entrance);
        }
        handleEntranceMenuClose();
    }

    const handleExitMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setExitMenuOpen(e.currentTarget);
    }

    const handleExitMenuClose = () => {
        setExitMenuOpen(null);
    }

    const handleFindExit = (_: string, entrance: string): void => {
        if (!!entrance) {
            setHintEntrance(entrance);
        }
        handleExitMenuClose();
    }

    let paths = [...pathIcons];

    return (
        <React.Fragment>
            <Menu
                id="locationHintMenu"
                anchorEl={anchorLocation}
                open={Boolean(anchorLocation)}
                onClose={handleClose}
                className="locationHintMenu"
                TransitionProps={{ timeout: 0 }}
                disableScrollLock={true}
            >
                {
                    // All non-misc hints conveniently have the same location type HintStone
                    sourceLocationType === 'HintStone' ?
                    <div>
                        <div className="tabList">
                            <Tabs className="hintMenuTabs" value={tabValue} onChange={handleTabChange}>
                                <Tab label='WOTH' />
                                <Tab label='Path' />
                                <Tab label='Foolish' />
                                <Tab label='Location' />
                                <Tab label='Entrance' />
                            </Tabs>
                        </div>
                        <TabPanel value={tabValue} index={0} className='drawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1} className='drawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintPathMenu" onClick={(e) => handlePathMenuOpen(e)}>
                                <span>{hintPath ? hintPath : 'Hinted Path'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2} className='drawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={3} className='drawerTab'>
                            <div className="hintLocationMenu" onClick={(e) => handleLocationMenuOpen(e)}>
                                <span>{hintLocation ? hintLocation : 'Hinted Location'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintItemMenu" onClick={(e) => handleItemMenuOpen(e)}>
                                <span>{hintItem ? hintItem : 'Hinted Item'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={4} className="drawerTab">
                            <div className="hintEntranceMenu"
                                onClick={(e) => handleExitMenuOpen(e)}
                            >
                                <span>{hintEntrance ? hintEntrance : 'Exit From'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintEntranceMenu"
                                onClick={(e) => handleEntranceMenuOpen(e)}
                            >
                                <span>{hintEntranceTarget ? hintEntranceTarget : 'Exit To'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <div className="clearHintText" onClick={() => clearHint()}>Clear Hint</div>
                    </div>
                    : 
                    <div>
                        <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                            <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                        </div>
                        <div className="hintItemMenu" onClick={(e) => handleItemMenuOpen(e)}>
                            <span>{hintItem ? hintItem : 'Hinted Item'}</span><ArrowDropDownIcon />
                        </div>
                        <div className="clearHintText" onClick={() => clearHint()}>Clear Hint</div>
                    </div>
                }
            </Menu>
            <EntranceMenu
                anchorLocation={entranceMenuOpen}
                handleClose={handleEntranceMenuClose}
                handleLink={handleFindEntrance}
                entrancePool={fullEntrancePool}
                regions={regions}
                id="regionMenuEntranceMenu"
            />
            <EntranceMenu
                anchorLocation={exitMenuOpen}
                handleClose={handleExitMenuClose}
                handleLink={handleFindExit}
                entrancePool={fullExitPool}
                regions={regions}
                id="regionMenuExitMenu"
                asExits={true}
            />
            <ItemMenu
                menuLayout={location_item_menu_layout}
                handleClose={handleItemMenuClose}
                handleFind={handleFindItem}
                anchorLocation={itemMenuOpen}
                sourceLocation={sourceLocation}
            />
            <ListMenu
                handleClose={handleRegionMenuClose}
                handleFind={handleFindRegion}
                anchorLocation={regionMenuOpen}
                sourceLocation={sourceLocation}
                regions={regions.map(r => r.name)}
                id="hintMenuRegionList"
            />
            <ListMenu
                handleClose={handlePathMenuClose}
                handleFind={handleFindPath}
                anchorLocation={pathMenuOpen}
                sourceLocation={sourceLocation}
                regions={paths}
                id="hintMenuPathList"
            />
            <ListMenu
                handleClose={handleLocationMenuClose}
                handleFind={handleFindLocation}
                anchorLocation={locationMenuOpen}
                sourceLocation={sourceLocation}
                regions={locations.map(l => l.name)}
                id="hintMenuLocationList"
            />

        </React.Fragment>
    );
}

export default HintMenu;