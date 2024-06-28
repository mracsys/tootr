import React from 'react';
import { MouseEventHandler } from "react";
import ContextMenuHandlerWithArgs from "./ContextMenuHandlerWithArgs";
import type { ContextCallback } from "./ContextMenuHandlerWithArgs";
import OotIcon, { IconDict, IconData } from "./OotIcon";

import { GraphSettingsOptions } from '@mracsys/randomizer-graph-tool';

export interface OotSettingIconProps {
    itemName: string,
    onClick: ContextCallback,
    handleMultiselectMenuOpen: (s: Element, n: string) => void,
    graphSettingsOptions: GraphSettingsOptions,
    settingAssetMap: IconDict,
    className?: string,
}

const OotSettingIcon = ({
    itemName,
    onClick,
    handleMultiselectMenuOpen,
    graphSettingsOptions,
    settingAssetMap,
    className,
}: OotSettingIconProps) => {
    let imageData: IconData;
    let globalClick: MouseEventHandler;
    let globalContextMenu: ContextMenuHandlerWithArgs;
    let lSubClick: MouseEventHandler | undefined;
    let rSubClick: MouseEventHandler | undefined;
    let lSubContextMenu: ContextMenuHandlerWithArgs | undefined;
    let rSubContextMenu: ContextMenuHandlerWithArgs | undefined;
    if (Object.keys(settingAssetMap).includes(itemName)) {
        imageData = settingAssetMap[itemName];
        if (Object.keys(graphSettingsOptions).includes(itemName) && graphSettingsOptions[itemName].type === 'list') {
            globalClick = (e) => {
                e.stopPropagation();
                handleMultiselectMenuOpen(e.currentTarget, itemName);
            }
        } else {
            globalClick = (e) => {
                e.stopPropagation();
                onClick({graphSettingName: itemName, reverseDirection: false})
            };
        }
        globalContextMenu = new ContextMenuHandlerWithArgs(onClick, {graphSettingName: itemName, reverseDirection: true});
        if (!!imageData.lSubSource) {
            let lSubSetting: string = imageData.lSubSource;
            if (graphSettingsOptions[lSubSetting].type === 'list') {
                lSubClick = (e) => {
                    e.stopPropagation();
                    handleMultiselectMenuOpen(e.currentTarget, lSubSetting);
                }
            } else {
                lSubClick = (e) => {
                    e.stopPropagation();
                    onClick({graphSettingName: lSubSetting, reverseDirection: false})
                };
                lSubContextMenu = new ContextMenuHandlerWithArgs(onClick, {graphSettingName: lSubSetting, reverseDirection: true});
            }
        }
        if (!!imageData.rSubSource) {
            let rSubSetting: string = imageData.rSubSource;
            if (graphSettingsOptions[rSubSetting].type === 'list') {
                rSubClick = (e) => {
                    e.stopPropagation();
                    handleMultiselectMenuOpen(e.currentTarget, rSubSetting);
                }
            } else {
                rSubClick = (e) => {
                    e.stopPropagation();
                    onClick({graphSettingName: rSubSetting, reverseDirection: false})
                };
                rSubContextMenu = new ContextMenuHandlerWithArgs(onClick, {graphSettingName: rSubSetting, reverseDirection: true});
            }
        }
    } else {
        return null;
    }
    if (!!imageData) {
        return (
            <OotIcon
                itemName={itemName}
                className={className}
                onClick={globalClick}
                handleContextMenu={globalContextMenu}
                onLSubClick={lSubClick}
                onRSubClick={rSubClick}
                handleLSubContextMenu={lSubContextMenu}
                handleRSubContextMenu={rSubContextMenu}
                imageData={imageData}
            />
        )
    } else {
        return null;
    }
}

export default OotSettingIcon;