import { SvgIconComponent } from "@mui/icons-material";
import { MouseEventHandler } from "react";
import { GraphSettingType } from "@mracsys/randomizer-graph-tool";
import ContextMenuHandlerWithArgs from "./ContextMenuHandlerWithArgs";

export interface OotIconProps {
    itemName: string,
    sourceLocation?: string | null,
    className?: string,
    onClick?: MouseEventHandler,
    handleContextMenu?: ContextMenuHandlerWithArgs,
    onLSubClick?: MouseEventHandler,
    onRSubClick?: MouseEventHandler,
    handleLSubContextMenu?: ContextMenuHandlerWithArgs,
    handleRSubContextMenu?: ContextMenuHandlerWithArgs,
    imageData?: IconData,
}

export type IconDict = {
    [key: string]: IconData;
}

export type IconData = {
    img: string | SvgIconComponent;
    lSub?: string | GraphSettingType;
    rSub?: string | GraphSettingType;
    lSubSource?: string;
    rSubSource?: string;
    rImg?: string | SvgIconComponent;
    lImg?: string | SvgIconComponent;
    fade?: boolean;
    lStyleOverride?: object;
    rStyleOverride?: object;
    tooltip?: string,
    tooltip2?: string,
    tooltip3?: string,
}

const OotIcon = ({
    itemName,
    sourceLocation,
    className,
    onClick,
    handleContextMenu,
    onLSubClick,
    onRSubClick,
    handleLSubContextMenu,
    handleRSubContextMenu,
    imageData,
}: OotIconProps) => {
    if (!!imageData) {
        return (
            <div className="iconTooltipContainer">
            <div
                onClick={onClick}
                onContextMenu={handleContextMenu?.onContextMenu}
                onTouchStart={handleContextMenu?.onTouchStart}
                onTouchCancel={handleContextMenu?.onTouchCancel}
                onTouchEnd={handleContextMenu?.onTouchEnd}
                onTouchMove={handleContextMenu?.onTouchMove}
                className="iconDiv"
                data-found-in={sourceLocation}
                data-found-item={itemName}
            >
                <div className={className}>
                    {
                        typeof imageData.img === 'string' ?
                            <img
                                src={imageData.img}
                                alt={itemName}
                                className={"iconContainer" + (imageData.fade ? ' disabledSettingIcon' : '')}
                            />
                        : <imageData.img
                            className={"svgIcon" + (imageData.fade ? ' disabledSettingIcon' : '')}
                        />
                    }
                    {
                        !!imageData.lSub && typeof imageData.lSub !== 'object' ?
                            <span
                                className={"iconLeftText" + (imageData.fade ? ' disabledSettingIcon' : '')}
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
                                className={"iconLeftSub" + (imageData.fade ? ' disabledSettingIcon' : '')}
                                onClick={onLSubClick}
                                onContextMenu={handleLSubContextMenu?.onContextMenu}
                                onTouchStart={handleLSubContextMenu?.onTouchStart}
                                onTouchCancel={handleLSubContextMenu?.onTouchCancel}
                                onTouchEnd={handleLSubContextMenu?.onTouchEnd}
                                onTouchMove={handleLSubContextMenu?.onTouchMove}
                            />
                            : <imageData.lImg
                                className={"iconLeftSub" + (imageData.fade ? ' disabledSettingIcon' : '')}
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
                        !!imageData.rSub && typeof imageData.rSub !== 'object' ?
                            <span
                                className={"iconRightText" + (imageData.fade ? ' disabledSettingIcon' : '')}
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
                                    className={"iconRightSub" + (imageData.fade ? ' disabledSettingIcon' : '')}
                                    onClick={onRSubClick}
                                    onContextMenu={handleRSubContextMenu?.onContextMenu}
                                    onTouchStart={handleRSubContextMenu?.onTouchStart}
                                    onTouchCancel={handleRSubContextMenu?.onTouchCancel}
                                    onTouchEnd={handleRSubContextMenu?.onTouchEnd}
                                    onTouchMove={handleRSubContextMenu?.onTouchMove}
                                />
                                : <imageData.rImg
                                    className={"iconRightSub" + (imageData.fade ? ' disabledSettingIcon' : '')}
                                    onClick={onRSubClick}
                                    onContextMenu={handleRSubContextMenu?.onContextMenu}
                                    onTouchStart={handleRSubContextMenu?.onTouchStart}
                                    onTouchCancel={handleRSubContextMenu?.onTouchCancel}
                                    onTouchEnd={handleRSubContextMenu?.onTouchEnd}
                                    onTouchMove={handleRSubContextMenu?.onTouchMove}
                                />
                        : null
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
            </div>
        )
    } else {
        return null;
    }
}

export default OotIcon