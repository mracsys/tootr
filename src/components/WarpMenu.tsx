import { useState } from "react";

import ContextMenuHandler from './ContextMenuHandler';
import OotItemIcon from "./OotItemIcon";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import PublicIcon from '@mui/icons-material/Public';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import { GraphRegion, GraphEntrance } from '@mracsys/randomizer-graph-tool';

import '@/styles/WarpMenu.css';

interface WarpMenuProps {
    isWarpAreaLinked: (entrance: GraphEntrance) => boolean;
    handleDungeonTravel: (targetRegion: GraphRegion | null, regionEntrance?: GraphEntrance | null) => void;
    areaMenuHandler: ContextMenuHandler;
    pages: {[page: string]: GraphRegion[]};
    warps: GraphEntrance[];
    raceMode: boolean;
}

const WarpMenu = ({
    isWarpAreaLinked,
    handleDungeonTravel,
    areaMenuHandler,
    pages,
    warps,
    raceMode,
}: WarpMenuProps) => {
    let [expandWarpMenu, setExpandWarpMenu] = useState<boolean>(false);
    let [expandDungeonMenu, setExpandDungeonMenu] = useState<boolean>(false);
    let [expandSongMenu, setExpandSongMenu] = useState<boolean>(false);

    const handleWarpMenu = (area: GraphRegion) => {
        handleDungeonTravel(area);
        setExpandWarpMenu(false);
        setExpandDungeonMenu(false);
    };

    const getWarpIcon = (warp: GraphEntrance) => {
        switch (warp.name) {
            case 'Child Spawn -> KF Links House':
                return 'Kokiri Sword';
            case 'Adult Spawn -> Temple of Time':
                return 'Master Sword';
            case 'Minuet of Forest Warp -> Sacred Forest Meadow':
                return 'Minuet of Forest';
            case 'Bolero of Fire Warp -> DMC Central Local':
                return 'Bolero of Fire';
            case 'Serenade of Water Warp -> Lake Hylia':
                return 'Serenade of Water';
            case 'Requiem of Spirit Warp -> Desert Colossus':
                return 'Requiem of Spirit';
            case 'Nocturne of Shadow Warp -> Graveyard Warp Pad Region':
                return 'Nocturne of Shadow';
            case 'Prelude of Light Warp -> Temple of Time':
                return 'Prelude of Light';
            default:
                return 'Song';
        }
    };

    let warpRegion = pages['Overworld'].filter(r => r.alias === 'Warps')[0];

    return (
        <div
            id="warpMenu"
            className={`warpMenu ${raceMode ? 'raceModeBar' : ''}`}
        >
            <div
                id="warpMenuVisible"
                className="warpMenuVisible"
            >
                <div className="warpSongsBig">
                    {
                        warps.map(w => {
                            return (
                                <OotItemIcon
                                    key={`${w.name}WarpMenuIcon`}
                                    itemName={getWarpIcon(w)}
                                    className={isWarpAreaLinked(w) ?
                                        "" :
                                        "grayscaleMenuIcon"}
                                    onClick={isWarpAreaLinked(w) ?
                                        () => handleDungeonTravel(!!w.replaces ? w.replaces.target_group : w.target_group, w)
                                        : () => handleDungeonTravel(warpRegion)}
                                />
                            );
                        })
                    }
                </div>
                <div className="warpSongsSmall">
                    <ClickAwayListener onClickAway={() => expandSongMenu ? setExpandSongMenu(false) : null}>
                        <div
                            className="warpIcon"
                            onClick={() => setExpandSongMenu(!expandSongMenu)}
                        >
                            {<SwitchAccessShortcutIcon className={warps.length > 0 ?
                                "expandWarpMenu" :
                                "warpSongsBlank"}
                            />}
                        </div>
                    </ClickAwayListener>
                </div>
                <ClickAwayListener onClickAway={() => expandWarpMenu ? setExpandWarpMenu(false) : null}>
                    <div
                        className="warpIcon"
                        onClick={() => setExpandWarpMenu(!expandWarpMenu)}
                        onContextMenu={areaMenuHandler.onContextMenu}
                        onTouchStart={areaMenuHandler.onTouchStart}
                        onTouchCancel={areaMenuHandler.onTouchCancel}
                        onTouchEnd={areaMenuHandler.onTouchEnd}
                        onTouchMove={areaMenuHandler.onTouchMove}
                    >
                        {<PublicIcon className="expandWarpMenu" />}
                    </div>
                </ClickAwayListener>
                <ClickAwayListener onClickAway={() => expandDungeonMenu ? setExpandDungeonMenu(false) : null}>
                    <div
                        className="warpIcon"
                        onClick={() => setExpandDungeonMenu(!expandDungeonMenu)}
                        onContextMenu={areaMenuHandler.onContextMenu}
                        onTouchStart={areaMenuHandler.onTouchStart}
                        onTouchCancel={areaMenuHandler.onTouchCancel}
                        onTouchEnd={areaMenuHandler.onTouchEnd}
                        onTouchMove={areaMenuHandler.onTouchMove}
                    >
                        {<MeetingRoomIcon className="expandWarpMenu" />}
                    </div>
                </ClickAwayListener>
            </div>
            <Collapse
                in={expandSongMenu}
                timeout='auto'
                unmountOnExit
                className="warpAreaList"
            >
                { warps.map((song, ia) => {
                    return (
                        <span
                            key={'quickSongMenu'+ia}
                            className="warpMenuArea"
                            onClick={() => handleDungeonTravel(!!song.replaces ? song.replaces.target_group : song.target_group, song)}
                        >
                            {song.alias}
                        </span>
                    );
                })}
            </Collapse>
            <Collapse
                in={expandWarpMenu}
                timeout='auto'
                unmountOnExit
                className="warpAreaList"
            >
                { pages['Overworld'].sort((a, b) => a.alias.localeCompare(b.alias)).filter(r => r.page === 'Overworld').map((area, ia) => {
                    return (
                        <span
                            key={'quickAreaMenu'+ia}
                            className={area.viewable ?
                                "warpMenuArea" :
                                "warpMenuAreaHidden"}
                            onClick={area.viewable ?
                                () => handleWarpMenu(area)
                                : undefined}
                        >
                            {area.alias}
                        </span>
                    );
                })}
            </Collapse>
            <Collapse
                in={expandDungeonMenu}
                timeout='auto'
                unmountOnExit
                className="warpAreaList"
            >
                { pages['Dungeons'].sort((a, b) => a.alias.localeCompare(b.alias)).filter(r => r.page === 'Dungeons').map((area, ia) => {
                    return (
                        <span
                            key={'quickDungeonMenu'+ia}
                            className={area.viewable ?
                                "warpMenuArea" :
                                "warpMenuAreaHidden"}
                            onClick={area.viewable ?
                                () => handleWarpMenu(area)
                                : undefined}
                        >
                            {area.alias}
                        </span>
                    );
                })}
            </Collapse>
        </div>
    );
}

export default WarpMenu;