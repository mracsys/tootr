import { MouseEventHandler } from "react";
import OotItemIcon from "./OotItemIcon";

import '@/styles/RadialMenu.css';

interface RadialMenuProps {
    sourceLocation?: string | null;
    handleFind?: MouseEventHandler,
    itemList: string[] | {[item: string]: string[]},
    buttonItem: string,
}

interface RadialMenuCSS extends React.CSSProperties {
    '--item-count': number;
    '--angle': string;
    '--index': number;
    '--sub-item-count': number;
    '--sub-angle': string;
    '--sub-index': number;
    '--sub-item-angle': string;
}

export const RadialMenu = ({
    sourceLocation,
    handleFind,
    itemList,
    buttonItem,
}: RadialMenuProps) => {

    const getRootIconElement = (n: HTMLElement, name: string): HTMLElement => {
        if (n.classList.contains(name)) {
            return n;
        } else if (!!n.parentNode) {
            return getRootIconElement(n.parentNode as HTMLElement, name);
        } else {
            throw `Something went wrong finding the clicked icon root container`;
        }
    }

    const toggleOpen = (caller: HTMLElement, forceClose: boolean = false) => {
        let toggleBox = caller.parentNode?.childNodes[0] as HTMLInputElement;
        toggleBox.checked = !toggleBox.checked && !forceClose;
    };

    const togglePrimary: MouseEventHandler = (e) => {
        let caller = getRootIconElement(e.target as HTMLElement, 'buttonWrapper');
        closeSecondaries(caller);
        toggleOpen(caller.children[1] as HTMLElement);
    };

    const toggleSecondary: MouseEventHandler = (e) => {
        let caller = getRootIconElement(e.target as HTMLElement, 'inner');
        let menu_index: number = parseInt(window.getComputedStyle(caller, null).getPropertyValue('--index'));
        let parent = getRootIconElement(e.target as HTMLElement, 'buttonWrapper');
        let submenu = parent.querySelector(`.radialSubMenu${menu_index}`);
        closeSecondaries(parent, menu_index);
        if (!!submenu) toggleOpen(submenu.children[1] as HTMLElement);
    };

    const closeSecondaries = (wrapper: HTMLElement, excludeIndex: number | null = null) => {
        let toggleBoxes = wrapper.querySelectorAll('.subMenuToggler');
        for (let elem of toggleBoxes) {
            let toggleBox = elem as HTMLInputElement;
            if (excludeIndex !== null) {
                if (!toggleBox.parentElement?.classList.contains(`radialSubMenu${excludeIndex}`)) {
                    toggleBox.checked = false;
                }
            } else {
                toggleBox.checked = false;
            }
        }
    };

    let itemClick: MouseEventHandler = () => {};

    let primaryItems: string[] = [];
    let secondaryTier = false;
    if (Array.isArray(itemList)) {
        primaryItems = itemList;
        if (!!handleFind) itemClick = handleFind;
    } else {
        primaryItems = Object.keys(itemList);
        secondaryTier = true;
        itemClick = toggleSecondary;
    }

    return (
        <div className="buttonWrapper">
            <input defaultChecked={false} className="radialMenuToggler" type="checkbox" />
            <OotItemIcon className="locationMenuIcon" onClick={togglePrimary} itemName={buttonItem} />
            <div
                className={primaryItems.length === 2 ? "dualMenuWrapper" : "radialMenuWrapper"}
                style={{"--item-count": primaryItems.length, "--angle": "calc(360deg / var(--item-count))"} as RadialMenuCSS}
            >
                <div className="radialMenu">
                {
                    primaryItems.map((itemName, i) => {
                        return (
                            <div className="radialMenuItem" style={{"--index": i} as RadialMenuCSS} key={`radialMenuItem${itemName}`}>
                                <div className="segment">
                                    {/*
                                        Click callback applied to circle segment because it can be significantly
                                        larger than the item icon, in contrast to the rectangular menus.
                                    */}
                                    <div
                                        className="inner"
                                        onClick={itemClick}
                                        data-found-in={sourceLocation}
                                        data-found-item={itemName}
                                    >
                                        <OotItemIcon
                                            className="locationMenuIcon"
                                            itemName={itemName}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            { secondaryTier ? 
                Object.values(itemList).map((subTierList: string[], i) => {
                    return(
                        <div
                            className={`subRadialMenuWrapper radialSubMenu${i}`}
                            style={{
                                "--index": i,
                                "--item-count": primaryItems.length,
                                "--angle": "calc(360deg / var(--item-count))",
                                "--sub-item-count": subTierList.length,
                                "--sub-angle": "calc(2 * asin(153 / (2 * var(--radial-width))))"} as RadialMenuCSS}
                            key={`${primaryItems[i]}SecondaryMenu`}
                        >
                            <input defaultChecked={false} className="subMenuToggler" type="checkbox" />
                            <div className="radialMenu subRadialMenu">
                                <div className="subMenuBackground"><div className="subMenuBackgroundColor"></div></div>
                                {
                                    subTierList.map((itemName, j) => {
                                        return (
                                            <div
                                                className="radialMenuItem"
                                                style={{"--sub-index": j} as RadialMenuCSS}
                                                key={`subRadialMenuItem${itemName}`}
                                            >
                                                <div className="segment">
                                                    <div
                                                        className="inner"
                                                        onClick={handleFind}
                                                        data-found-in={sourceLocation}
                                                        data-found-item={itemName}
                                                    >
                                                        <OotItemIcon
                                                            className="locationMenuIcon"
                                                            itemName={itemName}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            : null }
        </div>
    );
}