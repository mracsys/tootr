import React, { useState, MouseEventHandler, MouseEvent, useEffect } from "react";
import TabPanel, { allyProps } from "./TabPanel";
import { Menu, Tabs, Tab } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EntranceMenu from './EntranceMenu';
import ItemMenu from './ItemMenu';
import ListMenu from "./ListMenu";
import { location_item_menu_layout } from '@/data/location_item_menu_layout';

import { GraphEntrancePool, GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/HintMenu.css';
import { location_item_menu_layout_vertical } from "@/data/location_item_menu_layout_vertical";

interface HintMenuProps {
    anchorLocation?: Element | null,
    sourceLocation: string | null,
    sourceLocationType: string,
    sourceLocationHintText: string,
    handleClose: () => void,
    handleFind: (data: HintMenuData) => void,
    clearHint: () => void,
    hintRegions: string[],
    fullEntrancePool: GraphEntrancePool,
    fullExitPool: GraphEntrancePool,
    locations: GraphLocation[],
    isWide: boolean,
}

export interface HintMenuData {
    hintType: string,
    hintRegion?: string,
    hintPath?: string,
    hintLocation?: string,
    hintEntrance?: string,
    hintEntranceTarget?: string,
    hintItem?: string,
    hintLocation2?: string,
    hintItem2?: string,
    hintMajorItems?: number,
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
    'Bongo Bongo': 'Bongo Bongo',
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
    sourceLocationHintText,
    handleClose,
    handleFind,
    clearHint,
    hintRegions,
    fullEntrancePool,
    fullExitPool,
    locations,
    isWide,

}: HintMenuProps) => {
    const [tabValue, setTabValue] = useState<number>(0);

    const [hintRegion, setHintRegion] = useState<string>('');
    const [hintPath, setHintPath] = useState<string>('');
    const [hintLocation, setHintLocation] = useState<string>('');
    const [hintItem, setHintItem] = useState<string>('');
    const [hintEntrance, setHintEntrance] = useState<string>('');
    const [hintEntranceTarget, setHintEntranceTarget] = useState<string>('');
    const [hintLocation2, setHintLocation2] = useState<string>('');
    const [hintItem2, setHintItem2] = useState<string>('');
    const [hintMajorItems, setHintMajorItems] = useState<number | null>(null);

    const [itemMenuOpen, setItemMenuOpen] = useState<Element | null>(null);
    const [entranceMenuOpen, setEntranceMenuOpen] = useState<Element | null>(null);
    const [exitMenuOpen, setExitMenuOpen] = useState<Element | null>(null);
    const [regionMenuOpen, setRegionMenuOpen] = useState<Element | null>(null);
    const [pathMenuOpen, setPathMenuOpen] = useState<Element | null>(null);
    const [locationMenuOpen, setLocationMenuOpen] = useState<Element | null>(null);
    const [location2MenuOpen, setLocation2MenuOpen] = useState<Element | null>(null);
    const [item2MenuOpen, setItem2MenuOpen] = useState<Element | null>(null);
    const [numMenuOpen, setNumMenuOpen] = useState<Element | null>(null);

    useEffect(() => {
        if (anchorLocation === null) {
            setHintRegion('');
            setHintPath('');
            setHintLocation('');
            setHintItem('');
            setHintEntrance('');
            setHintEntranceTarget('');
            setHintLocation2('');
            setHintItem2('');
            setHintMajorItems(null);
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
                    if (hintLocation && hintItem && hintLocation2 && hintItem2) {
                        let data: HintMenuData = {
                            hintType: 'dual',
                            hintLocation: hintLocation,
                            hintItem: hintItem,
                            hintLocation2: hintLocation2,
                            hintItem2: hintItem2,
                        }
                        handleFind(data);
                    }
                    break;
                case 5:
                    if (hintEntrance && hintEntranceTarget) {
                        let data: HintMenuData = {
                            hintType: 'entrance',
                            hintEntrance: hintEntrance,
                            hintEntranceTarget: hintEntranceTarget,
                        }
                        handleFind(data);
                    }
                    break;
                case 6:
                    if (hintRegion && hintItem) {
                        let data: HintMenuData = {
                            hintType: 'misc',
                            hintRegion: hintRegion,
                            hintItem: hintItem,
                        }
                        handleFind(data);
                    }
                    break;
                case 7:
                    if (hintRegion && hintMajorItems !== null) {
                        let data: HintMenuData = {
                            hintType: 'important_check',
                            hintRegion: hintRegion,
                            hintMajorItems: hintMajorItems,
                        }
                        handleFind(data);
                    }
                    break;
                default:
                    break;
            }
        }
    }, [
        hintRegion,
        hintPath,
        hintLocation,
        hintItem,
        hintEntrance,
        hintEntranceTarget,
        hintLocation2,
        hintItem2,
        hintMajorItems
    ]);

    const handleTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        event.preventDefault();
        setTabValue(newTabValue);
        setHintRegion('');
        setHintPath('');
        setHintLocation('');
        setHintItem('');
        setHintEntrance('');
        setHintEntranceTarget('');
        setHintLocation2('');
        setHintItem2('');
        setHintMajorItems(null);
    }

    const handleRegionMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setRegionMenuOpen(e.currentTarget);
    }

    const handleRegionMenuClose = () => {
        setRegionMenuOpen(null);
    }

    const handleFindRegion: (option: string) => void = (option) => {
        if (!!option) {
            setHintRegion(option);
        }
        handleRegionMenuClose();
    }

    const handlePathMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setPathMenuOpen(e.currentTarget);
    }

    const handlePathMenuClose = () => {
        setPathMenuOpen(null);
    }

    const handleFindPath: (option: string) => void = (option) => {
        if (!!option) {
            setHintPath(option);
        }
        handlePathMenuClose();
    }

    const handleLocationMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setLocationMenuOpen(e.currentTarget);
    }

    const handleLocationMenuClose = () => {
        setLocationMenuOpen(null);
    }

    const handleFindLocation: (option: string) => void = (option) => {
        if (!!option) {
            setHintLocation(option);
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

    const handleLocation2MenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setLocation2MenuOpen(e.currentTarget);
    }

    const handleLocation2MenuClose = () => {
        setLocation2MenuOpen(null);
    }

    const handleFindLocation2: (option: string) => void = (option) => {
        if (!!option) {
            setHintLocation2(option);
        }
        handleLocation2MenuClose();
    }

    const handleItem2MenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setItem2MenuOpen(e.currentTarget);
    }

    const handleItem2MenuClose = () => {
        setItem2MenuOpen(null);
    }

    const handleFindItem2: MouseEventHandler<HTMLDivElement> = (e): void => {
        const item = e.currentTarget.getAttribute('data-found-item');
        if (!!item) {
            setHintItem2(item);
        }
        handleItem2MenuClose();
    }

    const handleNumMenuOpen = (e: MouseEvent<HTMLDivElement>) => {
        setNumMenuOpen(e.currentTarget);
    }

    const handleNumMenuClose = () => {
        setNumMenuOpen(null);
    }

    const handleFindNum: (option: string) => void = (option) => {
        if (!!option || option === '0') {
            setHintMajorItems(parseInt(option));
        }
        handleNumMenuClose();
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
                <div className="hintMenuImportedHintText">{sourceLocationHintText}</div>
                {
                    // All non-misc hints conveniently have the same location type HintStone
                    sourceLocationType === 'HintStone' ?
                    <div className="hintMenuTabContainer">
                        <Tabs className="hintMenuTabs" value={tabValue} onChange={handleTabChange} orientation="vertical">
                            <Tab {...allyProps(0, 'hintMenuDrawerTab')} label='WOTH' />
                            <Tab {...allyProps(1, 'hintMenuDrawerTab')} label='Path' />
                            <Tab {...allyProps(2, 'hintMenuDrawerTab')} label='Foolish' />
                            <Tab {...allyProps(3, 'hintMenuDrawerTab')} label='Location' />
                            <Tab {...allyProps(4, 'hintMenuDrawerTab')} label='Dual' />
                            <Tab {...allyProps(5, 'hintMenuDrawerTab')} label='Entrance' />
                            <Tab {...allyProps(6, 'hintMenuDrawerTab')} label='Item' />
                            <Tab {...allyProps(7, 'hintMenuDrawerTab')} label='# Items' />
                        </Tabs>
                        <TabPanel value={tabValue} index={0} className='hintMenuDrawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1} className='hintMenuDrawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintPathMenu" onClick={(e) => handlePathMenuOpen(e)}>
                                <span>{hintPath ? hintPath : 'Hinted Path'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={2} className='hintMenuDrawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={3} className='hintMenuDrawerTab'>
                            <div className="hintLocationMenu" onClick={(e) => handleLocationMenuOpen(e)}>
                                <span>{hintLocation ? hintLocation : 'Hinted Location'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintItemMenu" onClick={(e) => handleItemMenuOpen(e)}>
                                <span>{hintItem ? hintItem : 'Hinted Item'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={4} className='hintMenuDrawerTab'>
                            <div className="hintLocationMenu" onClick={(e) => handleLocationMenuOpen(e)}>
                                <span>{hintLocation ? hintLocation : 'Hinted Location 1'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintItemMenu" onClick={(e) => handleItemMenuOpen(e)}>
                                <span>{hintItem ? hintItem : 'Hinted Item 1'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintLocationMenu" onClick={(e) => handleLocation2MenuOpen(e)}>
                                <span>{hintLocation2 ? hintLocation2 : 'Hinted Location 2'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintItemMenu" onClick={(e) => handleItem2MenuOpen(e)}>
                                <span>{hintItem2 ? hintItem2 : 'Hinted Item 2'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={5} className="hintMenuDrawerTab">
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
                        <TabPanel value={tabValue} index={6} className='hintMenuDrawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintItemMenu" onClick={(e) => handleItemMenuOpen(e)}>
                                <span>{hintItem ? hintItem : 'Hinted Item'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={7} className='hintMenuDrawerTab'>
                            <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                                <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                            </div>
                            <div className="hintNumMenu" onClick={(e) => handleNumMenuOpen(e)}>
                                <span>{hintMajorItems !== null ? hintMajorItems : '# Major Items'}</span><ArrowDropDownIcon />
                            </div>
                        </TabPanel>
                    </div>
                    : 
                    <div className="hintMenuDrawerTab">
                        <div className="hintRegionMenu" onClick={(e) => handleRegionMenuOpen(e)}>
                            <span>{hintRegion ? hintRegion : 'Hinted Region'}</span><ArrowDropDownIcon />
                        </div>
                        <div className="hintItemMenu" onClick={(e) => handleItemMenuOpen(e)}>
                            <span>{hintItem ? hintItem : 'Hinted Item'}</span><ArrowDropDownIcon />
                        </div>
                    </div>
                }
                <div className="clearHintText" onClick={() => clearHint()}>Clear Hint</div>
            </Menu>
            <EntranceMenu
                anchorLocation={entranceMenuOpen}
                handleClose={handleEntranceMenuClose}
                handleLink={handleFindEntrance}
                entrancePool={fullEntrancePool}
                id="regionMenuEntranceMenu"
            />
            <EntranceMenu
                anchorLocation={exitMenuOpen}
                handleClose={handleExitMenuClose}
                handleLink={handleFindExit}
                entrancePool={fullExitPool}
                id="regionMenuExitMenu"
                asExits={true}
            />
            <ItemMenu
                menuLayout={isWide ? location_item_menu_layout : location_item_menu_layout_vertical}
                handleClose={handleItemMenuClose}
                handleFind={handleFindItem}
                anchorLocation={itemMenuOpen}
                sourceLocation={sourceLocation}
                showClearButton={false}
            />
            <ItemMenu
                menuLayout={isWide ? location_item_menu_layout : location_item_menu_layout_vertical}
                handleClose={handleItem2MenuClose}
                handleFind={handleFindItem2}
                anchorLocation={item2MenuOpen}
                sourceLocation={sourceLocation}
                showClearButton={false}
            />
            <ListMenu
                handleClose={handleRegionMenuClose}
                handleFind={handleFindRegion}
                anchorLocation={regionMenuOpen}
                regions={hintRegions}
                id="hintMenuRegionList"
            />
            <ListMenu
                handleClose={handlePathMenuClose}
                handleFind={handleFindPath}
                anchorLocation={pathMenuOpen}
                regions={paths}
                id="hintMenuPathList"
            />
            <ListMenu
                handleClose={handleLocationMenuClose}
                handleFind={handleFindLocation}
                anchorLocation={locationMenuOpen}
                regions={locations.map(l => l.name)}
                id="hintMenuLocationList"
            />
            <ListMenu
                handleClose={handleLocation2MenuClose}
                handleFind={handleFindLocation2}
                anchorLocation={location2MenuOpen}
                regions={locations.map(l => l.name)}
                id="hintMenuLocation2List"
            />
            <ListMenu
                handleClose={handleNumMenuClose}
                handleFind={handleFindNum}
                anchorLocation={numMenuOpen}
                regions={Array(100).fill(0).map((_, i) => `${i}`)}
                id="hintMenuNumList"
            />

        </React.Fragment>
    );
}

export default HintMenu;