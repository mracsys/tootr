import { ChangeEvent, Dispatch, SetStateAction } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import Brightness7Icon from '@mui/icons-material/Brightness7';
//import Brightness3Icon from '@mui/icons-material/Brightness3';
import { SeedMenu } from "./SeedMenu";
import { TrackerSettingsCurrent, copyTrackerSettings } from "@/data/tracker_settings";

import { GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerTopBar.css';

interface TrackerTopBarProps {
    importGraphState: (inputEvent: ChangeEvent<HTMLInputElement>) => void,
    exportGraphState: () => void,
    loadGraphPreset: (preset_name: string) => void,
    graphPresets: string[],
    graphLocationCount: GraphLocation[],
    searchTracker: React.ChangeEventHandler<HTMLInputElement>,
    trackerSettings: TrackerSettingsCurrent,
    setTrackerSettings: Dispatch<SetStateAction<TrackerSettingsCurrent>>,
}


export const TrackerTopBar = ({
    importGraphState,
    exportGraphState,
    loadGraphPreset,
    graphPresets,
    graphLocationCount,
    searchTracker,
    trackerSettings,
    setTrackerSettings
}: TrackerTopBarProps) => {

    const handleOpenSidebar = () => {
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings.expand_sidebar = !trackerSettings.expand_sidebar;
        setTrackerSettings(newTrackerSettings);
    }

    return (
        <AppBar
            position="fixed"
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    aria-label="open drawer"
                    onClick={() => handleOpenSidebar()}
                >
                    <MenuIcon />
                </IconButton>

                <SeedMenu
                    importFunction={importGraphState}
                    exportFunction={exportGraphState}
                    presetFunction={loadGraphPreset}
                    presets={graphPresets}
                />

                <div className="title">
                    <div>
                        <div className="titleText">{trackerSettings.region_page}</div>
                    </div>
                </div>
                <div className='searchContainer'>
                    <input id='trackerGlobalSearchBox' type='search' placeholder='Search' onChange={searchTracker} />
                </div>
                <div className="checkCount">
                    {
                        graphLocationCount.filter(l => l.checked).length
                    }
                    /
                    {
                        graphLocationCount.length
                    }
                </div>
                {/*<button
                    onClick={() => setAlertReset(true)}
                    className="menuButton"
                >
                    <span className="menuButtonLabel">Reset</span>
                </button>*/}
                {/*<button
                    onClick={() => setThemeDark(!themeDark)}
                    className="menuButton"
                >
                    {
                        themeDark ?
                            <span className="menuButtonLabel"><Brightness7Icon />Light Mode</span> :
                            <span className="menuButtonLabel"><Brightness3Icon />Dark Mode</span>
                    }
                </button>*/}
            </Toolbar>
        </AppBar>
    );
}