import React, { MouseEventHandler } from "react";
import { Menu } from "@mui/material";

import '@/styles/ListMenu.css';

interface ListMenuProps {
    anchorLocation?: Element | null,
    sourceLocation: string | null,
    handleClose: () => void,
    handleFind: MouseEventHandler,
    regions: string[],
    id: string,
}

const ListMenu = ({
    anchorLocation,
    sourceLocation,
    handleClose,
    handleFind,
    regions,
    id,

}: ListMenuProps) => {

    return (
        <React.Fragment>
            <Menu
                id={id}
                anchorEl={anchorLocation}
                open={Boolean(anchorLocation)}
                onClose={handleClose}
                className="hintListMenu"
                TransitionProps={{ timeout: 0 }}
                disableScrollLock={true}
            >
                <div className="listMenuContainer">
                    {
                        regions.map((r, i) => {
                            return (
                                <div
                                    className="listMenuText"
                                    onClick={handleFind}
                                    data-found-in={sourceLocation}
                                    data-found-item={r}
                                    key={`listMenuItem${r}${i}`}
                                >
                                    {r}
                                </div>
                            )
                        })
                    }
                </div>
            </Menu>
        </React.Fragment>
    );
}

export default ListMenu;