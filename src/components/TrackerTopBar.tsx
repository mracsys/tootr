import { ChangeEvent, Dispatch, SetStateAction } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { SeedMenu } from "./SeedMenu";
import { TrackerSettingsCurrent, copyTrackerSettings, tracker_settings_defs } from "@/data/tracker_settings";

import { GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerTopBar.css';

interface TrackerTopBarProps {
    importGraphState: (inputEvent: ChangeEvent<HTMLInputElement>) => void,
    exportGraphState: () => void,
    simGraphState: (inputEvent: ChangeEvent<HTMLInputElement>) => void,
    loadGraphPreset: (preset_name: string) => void,
    graphPresets: string[],
    graphLocationCount: GraphLocation[],
    searchTracker: React.ChangeEventHandler<HTMLInputElement>,
    trackerSettings: TrackerSettingsCurrent,
    setTrackerSettings: Dispatch<SetStateAction<TrackerSettingsCurrent>>,
    setAlertReset: Dispatch<SetStateAction<boolean>>,
}


const TrackerTopBar = ({
    importGraphState,
    exportGraphState,
    simGraphState,
    loadGraphPreset,
    graphPresets,
    graphLocationCount,
    searchTracker,
    trackerSettings,
    setTrackerSettings,
    setAlertReset,
}: TrackerTopBarProps) => {

    const handleOpenSidebar = () => {
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings.expand_sidebar = !trackerSettings.expand_sidebar;
        setTrackerSettings(newTrackerSettings);
    }

    const changeDarkMode = () => {
        const name = 'dark_mode';
        const checked = !trackerSettings.dark_mode;
        console.log('[Setting]', name, 'changed to', checked);
        let newTrackerSettings = copyTrackerSettings(trackerSettings);
        newTrackerSettings[name] = checked;
        setTrackerSettings(newTrackerSettings);
    }

    return (
        <div className="topBar">
                <IconButton
                    onClick={() => handleOpenSidebar()}
                >
                    <MenuIcon />
                </IconButton>

                <SeedMenu
                    importFunction={importGraphState}
                    exportFunction={exportGraphState}
                    presetFunction={loadGraphPreset}
                    simFunction={simGraphState}
                    presets={graphPresets}
                    setAlertReset={setAlertReset}
                />

                <div className="title">
                    <div>
                        <div className="titleText">
                            {
                                tracker_settings_defs.region_page.options?.includes(trackerSettings.region_page) ?
                                    trackerSettings.region_page
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div className='searchContainer'>
                    <input id='trackerGlobalSearchBox' type='search' placeholder='Search' onChange={searchTracker} />
                </div>
                {
                    trackerSettings.show_check_counter ?
                    <div className="checkCount">
                        {
                            graphLocationCount.filter(l => l.checked).length
                        }
                        /
                        {
                            graphLocationCount.length
                        }
                    </div> : null
                }
                <button
                    onClick={() => setAlertReset(true)}
                    className="menuButton"
                >
                    <span className="menuButtonLabel">Reset</span>
                </button>
                <button
                    onClick={() => changeDarkMode()}
                    className="menuButton"
                >
                    {
                        trackerSettings.dark_mode ?
                            <span className="menuButtonLabel"><Brightness3Icon /></span> :
                            <span className="menuButtonLabel"><Brightness7Icon /></span>
                    }
                </button>
        </div>
    );
}

export default TrackerTopBar;