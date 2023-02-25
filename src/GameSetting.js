import React from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox'
import { FormHelperText, ListItemText, MenuItem } from '@material-ui/core';

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
                            if (setting !== 'open' && setting !== 'Mixed Pools' && setting !== 'Shuffle Interiors') {
                                return (
                                <React.Fragment key={'settingFrag' + i}>
                                    <div className={this.props.classes.wrapperWrapper}>
                                        <div className={this.props.classes.nestedWrapper}>
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
                                        </div>
                                    </div>
                                </React.Fragment>
                                );
                            } else if (setting === 'Mixed Pools' || setting === 'Shuffle Interiors') {
                                return (
                                    <React.Fragment key={'settingFrag' + i}>
                                        <div className={this.props.classes.wrapperWrapper}>
                                            <div className={this.props.classes.nestedWrapper}>
                                                <div className={this.props.classes.nested} key={'setting' + i}>
                                                    <Select
                                                        id={"multiselect" + i}
                                                        multiple
                                                        displayEmpty
                                                        name={setting}
                                                        value={Object.keys(this.props.settings[setting]).filter((t) => {
                                                            return this.props.userSettings[setting].includes(t);
                                                        })}
                                                        onChange={this.props.onChange}
                                                        input={<Input />}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return 'Off';
                                                            } else if (selected.length === Object.keys(this.props.settings[setting]).length) {
                                                                return 'All';
                                                            } else {
                                                                return 'Some';
                                                            }
                                                        }}
                                                        MenuProps={{
                                                            getContentAnchorEl: () => null,
                                                        }}
                                                    >
                                                        {Object.keys(this.props.settings[setting]).map((t) => { return (
                                                            <MenuItem key={'multiselectoption' + i + t} value={t}>
                                                                <Checkbox checked={this.props.userSettings[setting].includes(t)} />
                                                                <ListItemText primary={t} />
                                                            </MenuItem>
                                                        )})}
                                                    </Select>
                                                    <FormHelperText>{setting}</FormHelperText>
                                                </div>
                                            </div>
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