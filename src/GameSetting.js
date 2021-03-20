import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


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
                <ListItem button onClick={() => this.setState({ open: !this.state.open })}>
                    <ListItemText primary={this.props.title} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout='auto' unmountOnExit>
                    <List component="div" disablePadding>
                        { Object.keys(this.props.settings).map((setting, i) => {
                            if (setting !== 'open') {
                                return (
                                <ListItem className={this.props.classes.nested} key={'setting' + i}>
                                    <FormControl>
                                        <Select
                                            labelId={setting + "-label"}
                                            id={setting}
                                            name={setting}
                                            value={this.props.userSettings[setting]}
                                            onChange={this.props.onChange}>
                                                {this.props.settings[setting].map((s, i) => { return (
                                                    <MenuItem key={i} value={s}>{s}</MenuItem>
                                                )})}
                                        </Select>
                                        <FormHelperText>{setting}</FormHelperText>
                                    </FormControl>
                                </ListItem>
                                );
                            } else { return null }
                        })}
                    </List>
                </Collapse>
                <Divider />
            </React.Fragment>
        );
    }
}

export default GameSetting