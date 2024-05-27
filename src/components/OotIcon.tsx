import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { MouseEventHandler } from "react";
import { GraphSettingType } from "@mracsys/randomizer-graph-tool";
import ContextMenuHandlerWithArgs from "./ContextMenuHandlerWithArgs";

import '@/styles/OotIcon.css';

export interface OotIconProps {
    itemName: string,
    sourceLocation?: string | null,
    className?: string,
    onClick?: MouseEventHandler,
    handleContextMenu?: ContextMenuHandlerWithArgs,
    onLSubClick?: MouseEventHandler,
    onRSubClick?: MouseEventHandler,
    onCSubClick?: MouseEventHandler,
    onLSuperClick?: MouseEventHandler,
    onRSuperClick?: MouseEventHandler,
    handleLSubContextMenu?: ContextMenuHandlerWithArgs,
    handleRSubContextMenu?: ContextMenuHandlerWithArgs,
    handleCSubContextMenu?: ContextMenuHandlerWithArgs,
    handleLSuperContextMenu?: ContextMenuHandlerWithArgs,
    handleRSuperContextMenu?: ContextMenuHandlerWithArgs,
    imageData?: IconData,
}

export type IconDict = {
    [key: string]: IconData;
}

export type IconData = {
    img: string | SvgIconComponent | React.ComponentType;
    imgClass?: string;
    lSub?: string | GraphSettingType;
    rSub?: string | GraphSettingType;
    cSub?: string | GraphSettingType;
    lSuper?: string | GraphSettingType;
    rSuper?: string | GraphSettingType;
    lSubSource?: string;
    rSubSource?: string;
    cSubSource?: string;
    lSuperSource?: string;
    rSuperSource?: string;
    rImg?: string | SvgIconComponent;
    lImg?: string | SvgIconComponent;
    cImg?: string | SvgIconComponent;
    rSuperImg?: string | SvgIconComponent;
    lSuperImg?: string | SvgIconComponent;
    fade?: boolean;
    fadeLabels?: boolean;
    hideLabels?: boolean;
    lStyleOverride?: object;
    rStyleOverride?: object;
    cStyleOverride?: object;
    lSuperStyleOverride?: object;
    rSuperStyleOverride?: object;
    tooltip?: string,
    tooltip2?: string,
    tooltip3?: string,
    text?: string | null,
}

const OotIcon = ({
    itemName,
    sourceLocation,
    className,
    onClick,
    handleContextMenu,
    onLSubClick,
    onRSubClick,
    onCSubClick,
    onLSuperClick,
    onRSuperClick,
    handleLSubContextMenu,
    handleRSubContextMenu,
    handleCSubContextMenu,
    handleLSuperContextMenu,
    handleRSuperContextMenu,
    imageData,
}: OotIconProps) => {
    if (!!imageData) {

        let fadeLabels = imageData.fadeLabels === undefined ? imageData.fade : imageData.fadeLabels;
        let hideLabels = imageData.hideLabels === undefined ? imageData.fade : imageData.hideLabels;

        return (
            <div className="iconTooltipContainer">
            <div
                onClick={onClick}
                onContextMenu={handleContextMenu?.onContextMenu}
                onTouchStart={handleContextMenu?.onTouchStart}
                onTouchCancel={handleContextMenu?.onTouchCancel}
                onTouchEnd={handleContextMenu?.onTouchEnd}
                onTouchMove={handleContextMenu?.onTouchMove}
                // TODO: add mousewheel support for dungeon rewards? Issues with preventing scrolling, see:
                // https://github.com/facebook/react/issues/14856
                className={`iconDiv ${className}`}
                data-found-in={sourceLocation}
                data-found-item={itemName}
            >
                <div className="iconLabelContainer">
                    {
                        typeof imageData.img === 'string' ?
                            <img
                                src={imageData.img}
                                alt={itemName}
                                className={"iconContainer" + (fadeLabels ? ' disabledSettingIcon' : '')}
                            />
                        : <imageData.img
                            className={`svgIcon ${fadeLabels ? 'disabledSettingIcon' : ''} ${!!imageData.imgClass ? imageData.imgClass : ''}`}
                        />
                    }
                    { hideLabels ?
                        null :
                        <React.Fragment>
                            {
                            // Top Left corner text/icon
                                !!imageData.lSuper && typeof imageData.lSuper !== 'object' ?
                                    <span
                                        className={"iconLeftTopText" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        style={imageData.lSuperStyleOverride}
                                        onClick={onLSuperClick}
                                        onContextMenu={handleLSuperContextMenu?.onContextMenu}
                                        onTouchStart={handleLSuperContextMenu?.onTouchStart}
                                        onTouchCancel={handleLSuperContextMenu?.onTouchCancel}
                                        onTouchEnd={handleLSuperContextMenu?.onTouchEnd}
                                        onTouchMove={handleLSuperContextMenu?.onTouchMove}
                                    >
                                        {imageData.lSuper}
                                    </span>
                                : null
                            }
                            {
                                !!imageData.lSuperImg ?
                                    typeof imageData.lSuperImg === 'string' ?
                                    <img
                                        src={imageData.lSuperImg}
                                        className={"iconLeftTopSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        onClick={onLSuperClick}
                                        onContextMenu={handleLSuperContextMenu?.onContextMenu}
                                        onTouchStart={handleLSuperContextMenu?.onTouchStart}
                                        onTouchCancel={handleLSuperContextMenu?.onTouchCancel}
                                        onTouchEnd={handleLSuperContextMenu?.onTouchEnd}
                                        onTouchMove={handleLSuperContextMenu?.onTouchMove}
                                    />
                                    : <imageData.lSuperImg
                                        className={"iconLeftTopSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        onClick={onLSuperClick}
                                        onContextMenu={handleLSuperContextMenu?.onContextMenu}
                                        onTouchStart={handleLSuperContextMenu?.onTouchStart}
                                        onTouchCancel={handleLSuperContextMenu?.onTouchCancel}
                                        onTouchEnd={handleLSuperContextMenu?.onTouchEnd}
                                        onTouchMove={handleLSuperContextMenu?.onTouchMove}
                                    />
                                : null
                            }
                            {
                            // Bottom Left corner text/icon
                                !!imageData.lSub && typeof imageData.lSub !== 'object' ?
                                    <span
                                        className={"iconLeftText" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        style={imageData.lStyleOverride}
                                        onClick={onLSubClick}
                                        onContextMenu={handleLSubContextMenu?.onContextMenu}
                                        onTouchStart={handleLSubContextMenu?.onTouchStart}
                                        onTouchCancel={handleLSubContextMenu?.onTouchCancel}
                                        onTouchEnd={handleLSubContextMenu?.onTouchEnd}
                                        onTouchMove={handleLSubContextMenu?.onTouchMove}
                                    >
                                        {imageData.lSub}
                                    </span>
                                : null
                            }
                            {
                                !!imageData.lImg ?
                                    typeof imageData.lImg === 'string' ?
                                    <img
                                        src={imageData.lImg}
                                        className={"iconLeftSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        onClick={onLSubClick}
                                        onContextMenu={handleLSubContextMenu?.onContextMenu}
                                        onTouchStart={handleLSubContextMenu?.onTouchStart}
                                        onTouchCancel={handleLSubContextMenu?.onTouchCancel}
                                        onTouchEnd={handleLSubContextMenu?.onTouchEnd}
                                        onTouchMove={handleLSubContextMenu?.onTouchMove}
                                    />
                                    : <imageData.lImg
                                        className={"iconLeftSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        onClick={onLSubClick}
                                        onContextMenu={handleLSubContextMenu?.onContextMenu}
                                        onTouchStart={handleLSubContextMenu?.onTouchStart}
                                        onTouchCancel={handleLSubContextMenu?.onTouchCancel}
                                        onTouchEnd={handleLSubContextMenu?.onTouchEnd}
                                        onTouchMove={handleLSubContextMenu?.onTouchMove}
                                    />
                                : null
                            }
                            {
                            // Bottom Center Edge text/icon
                                !!imageData.cSub && typeof imageData.cSub !== 'object' ?
                                    <span
                                        className={"iconCenterText" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        style={imageData.cStyleOverride}
                                        onClick={onCSubClick}
                                        onContextMenu={handleCSubContextMenu?.onContextMenu}
                                        onTouchStart={handleCSubContextMenu?.onTouchStart}
                                        onTouchCancel={handleCSubContextMenu?.onTouchCancel}
                                        onTouchEnd={handleCSubContextMenu?.onTouchEnd}
                                        onTouchMove={handleCSubContextMenu?.onTouchMove}
                                    >
                                        {imageData.cSub}
                                    </span>
                                : null
                            }
                            {
                                !!imageData.cImg ?
                                    typeof imageData.cImg === 'string' ?
                                        <img
                                            src={imageData.cImg}
                                            className={"iconCenterSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                            onClick={onCSubClick}
                                            onContextMenu={handleCSubContextMenu?.onContextMenu}
                                            onTouchStart={handleCSubContextMenu?.onTouchStart}
                                            onTouchCancel={handleCSubContextMenu?.onTouchCancel}
                                            onTouchEnd={handleCSubContextMenu?.onTouchEnd}
                                            onTouchMove={handleCSubContextMenu?.onTouchMove}
                                        />
                                        : <imageData.cImg
                                            className={"iconCenterSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                            onClick={onCSubClick}
                                            onContextMenu={handleCSubContextMenu?.onContextMenu}
                                            onTouchStart={handleCSubContextMenu?.onTouchStart}
                                            onTouchCancel={handleCSubContextMenu?.onTouchCancel}
                                            onTouchEnd={handleCSubContextMenu?.onTouchEnd}
                                            onTouchMove={handleCSubContextMenu?.onTouchMove}
                                        />
                                : null
                            }
                            {
                            // Top Right corner text/icon
                                !!imageData.rSuper && typeof imageData.rSuper !== 'object' ?
                                    <span
                                        className={"iconRightTopText" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        style={imageData.rSuperStyleOverride}
                                        onClick={onRSuperClick}
                                        onContextMenu={handleRSuperContextMenu?.onContextMenu}
                                        onTouchStart={handleRSuperContextMenu?.onTouchStart}
                                        onTouchCancel={handleRSuperContextMenu?.onTouchCancel}
                                        onTouchEnd={handleRSuperContextMenu?.onTouchEnd}
                                        onTouchMove={handleRSuperContextMenu?.onTouchMove}
                                    >
                                        {imageData.rSuper}
                                    </span>
                                : null
                            }
                            {
                                !!imageData.rSuperImg ?
                                    typeof imageData.rSuperImg === 'string' ?
                                        <img
                                            src={imageData.rSuperImg}
                                            className={"iconRightTopSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                            onClick={onRSuperClick}
                                            onContextMenu={handleRSuperContextMenu?.onContextMenu}
                                            onTouchStart={handleRSuperContextMenu?.onTouchStart}
                                            onTouchCancel={handleRSuperContextMenu?.onTouchCancel}
                                            onTouchEnd={handleRSuperContextMenu?.onTouchEnd}
                                            onTouchMove={handleRSuperContextMenu?.onTouchMove}
                                        />
                                        : <imageData.rSuperImg
                                            className={"iconRightTopSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                            onClick={onRSuperClick}
                                            onContextMenu={handleRSuperContextMenu?.onContextMenu}
                                            onTouchStart={handleRSuperContextMenu?.onTouchStart}
                                            onTouchCancel={handleRSuperContextMenu?.onTouchCancel}
                                            onTouchEnd={handleRSuperContextMenu?.onTouchEnd}
                                            onTouchMove={handleRSuperContextMenu?.onTouchMove}
                                        />
                                : null
                            }
                            {
                            // Bottom Right corner text/icon
                                !!imageData.rSub && typeof imageData.rSub !== 'object' ?
                                    <span
                                        className={"iconRightText" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                        style={imageData.rStyleOverride}
                                        onClick={onRSubClick}
                                        onContextMenu={handleRSubContextMenu?.onContextMenu}
                                        onTouchStart={handleRSubContextMenu?.onTouchStart}
                                        onTouchCancel={handleRSubContextMenu?.onTouchCancel}
                                        onTouchEnd={handleRSubContextMenu?.onTouchEnd}
                                        onTouchMove={handleRSubContextMenu?.onTouchMove}
                                    >
                                        {imageData.rSub}
                                    </span>
                                : null
                            }
                            {
                                !!imageData.rImg ?
                                    typeof imageData.rImg === 'string' ?
                                        <img
                                            src={imageData.rImg}
                                            className={"iconRightSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                            onClick={onRSubClick}
                                            onContextMenu={handleRSubContextMenu?.onContextMenu}
                                            onTouchStart={handleRSubContextMenu?.onTouchStart}
                                            onTouchCancel={handleRSubContextMenu?.onTouchCancel}
                                            onTouchEnd={handleRSubContextMenu?.onTouchEnd}
                                            onTouchMove={handleRSubContextMenu?.onTouchMove}
                                        />
                                        : <imageData.rImg
                                            className={"iconRightSub" + (fadeLabels ? ' disabledSettingIcon' : '')}
                                            onClick={onRSubClick}
                                            onContextMenu={handleRSubContextMenu?.onContextMenu}
                                            onTouchStart={handleRSubContextMenu?.onTouchStart}
                                            onTouchCancel={handleRSubContextMenu?.onTouchCancel}
                                            onTouchEnd={handleRSubContextMenu?.onTouchEnd}
                                            onTouchMove={handleRSubContextMenu?.onTouchMove}
                                        />
                                : null
                            }
                        </React.Fragment>
                    }
                </div>
            </div>
                {
                    !!imageData.tooltip ?
                        <div className="iconTooltip">
                            <div>{imageData.tooltip}</div>
                            {
                                !!imageData.tooltip2 ?
                                <div>{imageData.tooltip2}</div> : null
                            }
                            {
                                !!imageData.tooltip3 ?
                                <div>{imageData.tooltip3}</div> : null
                            }
                        </div>
                    : null
                }
                {
                    !!imageData.text ?
                        <div className="iconSideText">
                            {imageData.text}
                        </div>
                    : null
                }
            </div>
        )
    } else {
        return null;
    }
}

export default OotIcon