import React from 'react';
import Menu from '@material-ui/core/Menu';

const ITEM_HEIGHT = 31;

class EntranceMenu extends React.Component {
    shouldComponentUpdate(nextProps) {
        return true;
    }
    render() {
        let entranceList = this.props.allAreas.entrances;
        if (typeof this.props.entrancePool === "undefined") {
            return null;
        } else {
            return (
                <Menu
                    id={this.props.id + "Element"}
                    anchorEl={this.props.anchorLocation}
                    open={Boolean(this.props.anchorLocation)}
                    onClose={this.props.handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 19,
                            border: '1px black solid',
                        },
                    }}
                    TransitionProps={{
                        timeout: 0,
                    }}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    disableScrollLock={true}
                >
                    {Object.keys(this.props.entrancePool).sort().map((areaCategory, l) => {
                        if (((areaCategory === this.props.title && !(this.props.oneWay)) || areaCategory === "Warp Songs" || this.props.entrancePool[areaCategory].length === 0) && this.props.connector === false) {
                            return null;
                        } else {
                            let eOptions = this.props.entrancePool[areaCategory].sort(function(a,b) {
                                let aName = entranceList[a].tag === "" ?
                                            entranceList[a].alias :
                                            entranceList[a].tag;
                                let bName = entranceList[b].tag === "" ?
                                            entranceList[b].alias :
                                            entranceList[b].tag;
                                return aName.localeCompare(bName);
                            }).map((subArea, j) => {
                                if ((this.props.allAreas.entrances[subArea].tagRep || this.props.allAreas.entrances[subArea].tag === "") &&
                                (!(this.props.oneWay) || (this.props.oneWay && this.props.allAreas.entrances[subArea].oneWayELink === ""))) {
                                    return (<div
                                                key={this.props.pool + "option" + j}
                                                className={this.props.classes.entranceText}
                                                data-link-to={subArea}
                                                data-link-from={this.props.sourceEntrance}
                                                onClick={this.props.handleLink}>
                                                {(this.props.allAreas.entrances[subArea].tag === "") ?
                                                    this.props.allAreas.entrances[subArea].alias :
                                                    this.props.allAreas.entrances[subArea].tag}
                                            </div>);
                                } else { return null }
                            });
                            return [
                                <div className={this.props.classes.entranceAreaText} key={this.props.entrance + "header" + l}><em>{areaCategory}</em></div>,
                                eOptions
                            ];
                    }})}
                </Menu>
            );
        }
    }
}

export default EntranceMenu