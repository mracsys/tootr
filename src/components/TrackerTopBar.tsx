import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import { SeedMenu } from "./SeedMenu";
import { TrackerSettingsCurrent } from "@/data/tracker_settings";
import type { SavedTrackerState } from './Tracker';

import { GraphLocation } from '@mracsys/randomizer-graph-tool';

import '@/styles/TrackerTopBar.css';

interface TrackerTopBarProps {
    importGraphState: (inputEvent: ChangeEvent<HTMLInputElement>) => void,
    exportGraphState: () => void,
    simGraphState: (inputEvent: ChangeEvent<HTMLInputElement>) => void,
    loadGraphPreset: (preset_name: string) => void,
    graphPresets: string[],
    currentPreset: string,
    graphLocationCount: GraphLocation[],
    searchTracker: React.ChangeEventHandler<HTMLInputElement>,
    trackerSettings: TrackerSettingsCurrent,
    setExpandSidebar: Dispatch<SetStateAction<boolean>>,
    setAlertReset: Dispatch<SetStateAction<boolean>>,
    saveFunction: (saveName: string) => void,
    loadFunction: (saveName: string) => void,
    deleteFunction: (saveName: string) => void,
    stateListFunction: () => {[savedName: string]: SavedTrackerState},
    lastEntranceName: string,
}


const TrackerTopBar = ({
    importGraphState,
    exportGraphState,
    simGraphState,
    loadGraphPreset,
    graphPresets,
    currentPreset,
    graphLocationCount,
    searchTracker,
    trackerSettings,
    setExpandSidebar,
    setAlertReset,
    saveFunction,
    loadFunction,
    deleteFunction,
    stateListFunction,
    lastEntranceName,
}: TrackerTopBarProps) => {

    const handleOpenSidebar = () => {
        setExpandSidebar(!trackerSettings.expand_sidebar);
    }

    return (
        <div className={`topBar ${trackerSettings.race_mode ? 'raceModeBar' : ''}`}>
            <IconButton
                onClick={() => handleOpenSidebar()}
            >
                {
                    trackerSettings.expand_sidebar ?
                        <ArrowBackIosNewIcon /> :
                        <ArrowForwardIosIcon />
                }
            </IconButton>

            <div className="title">
                <div>
                    <div className="titleText">
                        {`${trackerSettings.region_page}`}
                        <span>{` ${trackerSettings.one_region_per_page ? lastEntranceName : ''}`}</span>
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
            {
                trackerSettings.race_mode ?
                <div className="raceModeText">
                    Race Mode
                    <div className="raceModeTooltip">
                        <p>Items marked on locations are treated as starting items when collected.</p>
                        <p>Disable in tracker settings for more accurate logic indicators.</p>
                        <p>Race Mode is <em>required</em> for any race on racetime.gg!</p>
                    </div>
                </div>
                : null
            }
            <SeedMenu
                importFunction={importGraphState}
                exportFunction={exportGraphState}
                presetFunction={loadGraphPreset}
                simFunction={simGraphState}
                presets={graphPresets}
                currentPreset={currentPreset}
                setAlertReset={setAlertReset}
                saveFunction={saveFunction}
                loadFunction={loadFunction}
                deleteFunction={deleteFunction}
                stateListFunction={stateListFunction}
            />
        </div>
    );
}

export default TrackerTopBar;