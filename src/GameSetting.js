import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';


class GameSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.settings.open,
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.classes.settingCategory} onClick={() => this.setState({ open: !this.state.open })}>
                    <span>{this.props.title}</span>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </div>
                <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                        { Object.keys(this.props.settings).map((setting, i) => {
                            if (setting !== 'open') {
                                return (
                                <React.Fragment key={'settingFrag' + i}>
                                    <div className={this.props.classes.nested} key={'setting' + i}>
                                        <select
                                            id={setting}
                                            className={this.props.classes.settingSelect}
                                            name={setting}
                                            value={this.props.userSettings[setting]}
                                            onChange={this.props.onChange}>
                                                {this.props.settings[setting].map((s, i) => { return (
                                                    <option key={i} value={s}>{s}</option>
                                                )})}
                                        </select>
                                        <p className={this.props.classes.settingText}>{setting}</p>
                                    </div>
                                </React.Fragment>
                                );
                            } else { return null }
                        })}
                </Collapse>
                <hr />
            </React.Fragment>
        );
    }
}

export default GameSetting