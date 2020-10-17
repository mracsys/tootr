import React from 'react';
import ReactDOM from 'react-dom';
import './custom.scss';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import kf from './data/locations/kokiri_forest.json'
import interiors from './data/locations/interiors.json'
import special_interiors from './data/locations/special_interiors.json'
import dungeons from './data/locations/dungeons.json'
import grottos from './data/locations/grottos.json'
//import warpSongs from './data/locations/warp_songs.json'
//import ow from './data/entrances/overworld.json'
import devr from './data/versions/dev5.2.47r-1.json'
//import weekly from './data/settings_presets/standard_weekly.json'
import rsl from './data/settings_presets/random-settings-league.json'
import { ListGroup, Card, CardColumns, Form, Accordion, Button, DropdownButton, Dropdown } from 'react-bootstrap';

class GameSetting extends React.Component {
    render() {
        return (
            <Card style={{ border: 0 }}>
                <Form.Group>
                    <Form.Label>{this.props.title}</Form.Label>
                    <Form.Control
                        as="select"
                        custom
                        name={this.props.title}
                        defaultValue={this.props.selected}
                        onChange={this.props.onChange}>
                            {this.props.options.map((s, i) => { return (
                                <option key={i}>{s}</option>
                            )})}
                    </Form.Control>
                </Form.Group>
            </Card>
        );
    }
}

class GameArea extends React.Component {
    buildEntranceName(entrance) {
        let eLink = this.props.entrances[entrance].link;
        if (this.props.allEntrances[eLink].category === "") { 
            if (this.props.allEntrances[eLink].type === "overworld") {
                return this.props.allAreas.entrances[eLink].alias;
            } else {
                return eLink;
            }
        } else { 
            return this.props.allEntrances[eLink].category;
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>{this.props.title}</Card.Header>
                <ListGroup variant="flush">
                    { Object.keys(this.props.locations).map((location, i) => { return (
                            <ListGroup.Item key={i} action>{this.props.locations[location].alias}</ListGroup.Item>
                        )})
                    }
                    { Object.keys(this.props.entrances).map((entrance, i) => {
                        if (this.props.entrances[entrance].link === "") {
                            let areaType = this.props.entrances[entrance].type
                            if (areaType === "specialInterior") {
                                areaType = "interior";
                            }
                            if (this.props.mixedPools === "On") {
                                areaType = "mixed";
                            }
                            if (areaType in this.props.entrance_pools) {
                                let subAreas;
                                if (areaType in this.props.oneWayEntrancePools) {
                                    subAreas = this.props.oneWayEntrancePools[areaType];
                                } else {
                                    subAreas = this.props.entrance_pools[areaType];
                                }
                                return (
                                    <ListGroup.Item key={i}>
                                        <span>{this.props.entrances[entrance].alias}</span>
                                        <DropdownButton
                                            title="Not Checked">
                                                {Object.keys(subAreas).map((areaCategory, l) => {
                                                    if (areaCategory === this.props.title && areaCategory !== "Spawn Points") {
                                                        return null;
                                                    } else {
                                                        return (
                                                            <React.Fragment key={l}>
                                                                <Dropdown.Header>{areaCategory}</Dropdown.Header>
                                                                {subAreas[areaCategory].map((subArea, j) => {
                                                                    return (<Dropdown.Item 
                                                                                as="button"
                                                                                key={j}
                                                                                name={entrance}
                                                                                value={subArea}
                                                                                onClick={this.props.handleLink}>
                                                                                {(this.props.allEntrances[subArea].type === "overworld" ||
                                                                                  this.props.allEntrances[subArea].type === "spawn" ||
                                                                                  this.props.allEntrances[subArea].type === "warpsong" ||
                                                                                  this.props.allEntrances[subArea].type === "owldrop" ||
                                                                                  this.props.allEntrances[subArea].type === "extra") ?
                                                                                    this.props.allAreas.entrances[subArea].alias :
                                                                                    subArea}
                                                                            </Dropdown.Item>);
                                                                })}
                                                            </React.Fragment>
                                                        );
                                                }})}
                                        </DropdownButton>
                                    </ListGroup.Item>
                                );
                            } else { return null }
                        } else {
                            return (
                                <React.Fragment key={i}>
                                    <ListGroup.Item key={entrance + "label"} variant="light">
                                        <span>
                                            {this.props.entrances[entrance].alias}
                                            -&gt;
                                            {this.buildEntranceName(entrance)}
                                        </span>
                                        <Button name={entrance} onClick={this.props.handleUnLink}>X</Button>
                                    </ListGroup.Item>
                                    {
                                        Object.keys(this.props.allEntrances[this.props.entrances[entrance].link].locations).map((location, k) => { return (
                                            <ListGroup.Item key={entrance + k} action>{this.props.allEntrances[this.props.entrances[entrance].link].locations[location].alias}</ListGroup.Item>
                                        )})
                                    }
                                </React.Fragment>
                            );
                        }
                    })}
                </ListGroup>
            </Card>
        );
    }
}

class Tracker extends React.Component {
    constructor(props) {
        super(props);
        let settings = rsl.Settings;
        let allAreas = merge({}, kf);
        let rawEntrances = merge(interiors, special_interiors, dungeons, grottos);
        let allEntrances = merge(rawEntrances, this.categorizeEntrances(rawEntrances, allAreas));
        let areas = this.loadAreas(settings, allAreas, allEntrances, true);
        let entrances = this.loadEntrancePools(settings, allEntrances);
        let oneWayEntrances = this.loadOneWayEntrancePools(allEntrances, allAreas);

        this.linkEntrance = this.linkEntrance.bind(this);
        this.unLinkEntrance = this.unLinkEntrance.bind(this);

        this.state = {
            enabled_settings: devr.Settings,
            settings: settings,
            areas: areas,
            entrances: entrances,
            oneWayEntrances: oneWayEntrances,
            allEntrances: allEntrances,
            allAreas: allAreas,
        };
    }

    loadAreas(settings, allAreas, allEntrances, init = false) {
        let areas = {};
        let erSettings = [];
        if (settings["Shuffle Interiors"] === "Simple" || settings["Shuffle Interiors"] === "All") {
            erSettings.push("interior");
        }
        if (settings["Shuffle Interiors"] === "All") {
            erSettings.push("specialInterior");
        }
        if (settings["Shuffle Grottos"] === "On") {
            erSettings.push("grotto");
            erSettings.push("grave");
        }
        if (settings["Shuffle Dungeons"] === "On") {
            erSettings.push("dungeon");
        }
        if (settings["Shuffle Overworld"] === "On") {
            erSettings.push("overworld");
        }
        if (settings["Shuffle Warp Songs"] === "On") {
            erSettings.push("warpsong");
        }
        if (settings["Shuffle Spawn Points"] === "On") {
            erSettings.push("spawn");
        }
        if (settings["Shuffle Owls"] === "On") {
            erSettings.push("owldrop");
        }
        let subArea;
        let eArea;
        let eLocation;
        let eEntrance;
        Object.keys(allAreas.entrances).forEach((entrance) => {
            subArea = allAreas.entrances[entrance];
            eArea = subArea.area;
            if (!(allAreas.hasOwnProperty(eArea)) && init) {
                let shown;
                eArea === "Spawn Points" ? shown = true : shown = false;
                allAreas[eArea] = { show: shown, entrances: {}, locations: {} };
            }
            if (!(areas.hasOwnProperty(eArea))) { 
                if (erSettings.includes("overworld") || erSettings.includes("spawn")
                || erSettings.includes("owldrop") || erSettings.includes("warpsong")) {
                    areas[eArea] = { show: allAreas[eArea].show, entrances: {}, locations: {} };
                } else {
                    areas[eArea] = { show: true, entrances: {}, locations: {} };
                }
            }
            if (!(erSettings.includes(subArea.type))) {
                if (!(subArea.type === "overworld") && !(subArea.type === "dungeon")
                && !(subArea.type === "extra") && !(subArea.type === "owldrop")) {
                    Object.keys(allEntrances[subArea.default].locations).forEach(loc => {
                        eLocation = {};
                        eLocation[loc] = allEntrances[subArea.default].locations[loc];
                        areas[eArea].locations = merge(areas[eArea].locations, eLocation);
                    });
                }
            } else {
                eEntrance = {};
                eEntrance[entrance] = allAreas.entrances[entrance];
                areas[eArea].entrances = merge(areas[eArea].entrances, eEntrance);
            }
        });
        Object.keys(allAreas.locations).forEach((location) => {
            eArea = allAreas.locations[location].area;
            if (!(allAreas.hasOwnProperty(eArea)) && init) { 
                allAreas[eArea] = { show: false, entrances: {}, locations: {} };
            }
            if (!(areas.hasOwnProperty(eArea))) {
                if (erSettings.includes("overworld")) {
                    areas[eArea] = { show: allAreas[eArea].show, entrances: {}, locations: {} };
                } else {
                    areas[eArea] = { show: true, entrances: {}, locations: {} };
                }
            }
            eLocation = {};
            eLocation[location] = allAreas.locations[location];
            areas[eArea].locations = merge(areas[eArea].locations, eLocation);
        });
        return areas;
    }

    categorizeEntrances(allEntrances, allAreas) {
        let entrances = {};
        let eType;
        Object.keys(allEntrances).forEach(entrance => {
            eType = allEntrances[entrance].type;
            //if (eType === "specialInterior") { eType = "interior"; }
            if (!(entrances.hasOwnProperty(eType))) {
                entrances[eType] = {};
            }
            if (allEntrances[entrance].category !== "") {
                if (entrances[eType].hasOwnProperty(allEntrances[entrance].category)) {
                    entrances[eType][allEntrances[entrance].category].count++;
                    entrances[eType][allEntrances[entrance].category].subAreas.push(entrance);
                } else {
                    entrances[allEntrances[entrance].category] = {type: eType};
                    entrances[eType][allEntrances[entrance].category] = { "count": 1, "subAreas": [ entrance ] }; 
                }
            } else {
                entrances[eType][entrance] = { "count": 1, "subAreas": [ entrance ] };
            }
        });
        //eType = "overworld";
        //entrances[eType] = {};
        let area;
        Object.keys(allAreas.entrances).forEach(entrance => {
            eType = allAreas.entrances[entrance].type;
            entrances[entrance] = { type: eType, category: "", locations: {} };
            entrances[allAreas.entrances[entrance].reverse] = { type: eType, category: "", locations: {} };
            if (eType !== "interior" && eType !== "specialInterior" && eType !== "grave" && eType !== "grotto" && eType !== "dungeon") {
                if (!(entrances.hasOwnProperty(eType))) {
                    entrances[eType] = {};
                }
                area = allAreas.entrances[entrance].area;
                if (!(entrances[eType].hasOwnProperty(area))) {
                    entrances[eType][area] = {};
                }
                entrances[eType][area][entrance] = { "count": 1, "subAreas": [ entrance ] };
            }
        });
        entrances["linked"] = [];
        entrances["oneWayAreas"] = [];
        entrances["oneWayAreas"].push("Spawn Points");
        entrances["oneWayAreas"].push("Warp Songs");
        return entrances;
    }

    loadEntrancePools(settings, allEntrances) {
        let entrances = {};
        let mixedpool = {};
        Object.filterEntrances = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].count) );
        let eOverworld = {};
        if (settings["Shuffle Overworld"] === "On") {
            Object.keys(allEntrances.overworld).forEach(area => {
                eOverworld[area] = (Object.filterEntrances(allEntrances.overworld[area], eCount => eCount > 0 ));
            });
            mixedpool = merge(mixedpool, {"mixed": eOverworld});
            entrances = merge(entrances, {"overworld": eOverworld});
        }
        let oInteriors = {};
        if (settings["Shuffle Interiors"] === "Simple" || settings["Shuffle Interiors"] === "All") {
            let eInteriors = [];
            eInteriors.push(...(Object.filterEntrances(allEntrances.interior, eCount => eCount > 0 )));
            if (settings["Shuffle Interiors"] === "All") {
                eInteriors.push(...(Object.filterEntrances(allEntrances.specialInterior, eCount => eCount > 0 )));
            }
            oInteriors = { "Interiors": eInteriors };
            mixedpool = merge(mixedpool, {"mixed": oInteriors});
            entrances = merge(entrances, {"interior": oInteriors});
        }
        let oDungeons = {};
        if (settings["Shuffle Dungeons"] === "On") {
            let eDungeons = [];
            eDungeons.push(...(Object.filterEntrances(allEntrances.dungeon, eCount => eCount > 0 )));
            oDungeons = { "Dungeons": eDungeons };
            mixedpool = merge(mixedpool, {"mixed": oDungeons});
            entrances = merge(entrances, {"dungeon": oDungeons});
        }
        let oGrottos = {};
        if (settings["Shuffle Grottos"] === "On") {
            let eGrottos = [];
            eGrottos.push(...(Object.filterEntrances(allEntrances.grotto, eCount => eCount > 0 )));
            eGrottos.push(...(Object.filterEntrances(allEntrances.grave, eCount => eCount > 0 )));
            oGrottos = { "Grottos": eGrottos };
            mixedpool = merge(mixedpool, {"mixed": oGrottos});
            entrances = merge(entrances, {"grotto": oGrottos});
            entrances = merge(entrances, {"grave": oGrottos});
        }
        if (settings["Shuffle Warp Songs"] === "On") {
            entrances = merge(entrances, {"warpsong": []});
        }
        if (settings["Shuffle Owls"] === "On") {
            entrances = merge(entrances, {"owldrop": []});
        }
        if (settings["Shuffle Spawn Points"] === "On") {
            entrances = merge(entrances, {"spawn": []});
        }
        entrances = merge(entrances, mixedpool);
        return entrances;
    }

    loadOneWayEntrancePools(allEntrances, allAreas) {
        let entrances = {};

        let eOverworld = {};
        Object.keys(allEntrances.overworld).forEach(area => {
            eOverworld[area] = (Object.keys(allEntrances.overworld[area]));
        });
        Object.keys(allEntrances.extra).forEach(area => {
            if (!(Object.keys(eOverworld).includes(area))) {
                eOverworld[area] = [];
            }
            eOverworld[area].push(...(Object.keys(allEntrances.extra[area])));
        });

        let eInteriors = [];
        eInteriors.push(...(Object.keys(allEntrances.interior)));
        eInteriors.push(...(Object.keys(allEntrances.specialInterior)));
        let oInteriors = { "Interiors": eInteriors };

        let eOwlDrops = [];
        Object.keys(allEntrances.owldrop).forEach(area => {
            eOwlDrops.push(...(Object.keys(allEntrances.owldrop[area])));
        });
        let oOwlDrops = { "Owl Drops": eOwlDrops };

        let eSpawnPoints = [];
        eSpawnPoints.push(...(Object.keys(allEntrances.spawn["Spawn Points"])));
        let oSpawnPoints = { "Spawn Points": eSpawnPoints };
        
        let eWarpSongs = [];
        Object.keys(allEntrances.warpsong).forEach(area => {
            eWarpSongs.push(...(Object.keys(allEntrances.warpsong[area])));
        });
        let oWarpSongs = { "Warp Song Pads": eWarpSongs };
        
        let eGraves = [];
        eGraves.push(...(Object.keys(allEntrances.grave)));
        let oGraves = { "Graves": eGraves };
        
        let eGrottos = [];
        eGrottos.push(...(Object.keys(allEntrances.grotto)));
        let oGrottos = { "Grottos": eGrottos };
        
        let eDungeons = [];
        eDungeons.push(...(Object.keys(allEntrances.dungeon)));
        let oDungeons = { "Dungeons": eDungeons };
        
        let reverseType;
        let reverseInterior = [];
        let reverseOverworld = [];
        let reverseGrave = [];
        let reverseGrotto = [];
        let reverseDungeon = [];
        Object.keys(allAreas.entrances).forEach(entrance => {
            reverseType = allAreas.entrances[entrance].type;

        });

        let oExtOwlDrops = merge(oWarpSongs, eOverworld, oOwlDrops);
        let oExtWarpSongs = merge(oSpawnPoints, oWarpSongs, eOverworld, oInteriors, oOwlDrops);
        let oExtSpawnPoints = merge(oSpawnPoints, oWarpSongs, eOverworld, oInteriors, oOwlDrops, oGraves);
        let mixed = merge(oSpawnPoints, oWarpSongs, eOverworld, oInteriors, oOwlDrops, oGraves, oGrottos, oDungeons);
        entrances = {
                        "spawn": oExtSpawnPoints,
                        "owldrop": oExtOwlDrops,
                        "warpsong": oExtWarpSongs,
                        "mixed": mixed
                    };
        return entrances;
    }

    changeSetting(setting) {
        console.log(setting.target.name, setting.target.value);
        let settings = cloneDeep(this.state.settings);
        settings[setting.target.name] = setting.target.value;
        let areas = this.loadAreas(settings, this.state.allAreas, this.state.allEntrances);
        let entrances = this.loadEntrancePools(settings, this.state.allEntrances);
        this.setState({
            settings: settings,
            entrances: entrances,
            areas: areas,
        });
    }

    linkEntrance(entrance) {
        console.log(entrance.target.name, "<>", entrance.target.value);
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        let areas = cloneDeep(this.state.allAreas);
        let shownAreas = cloneDeep(this.state.areas);
        let entrances = cloneDeep(this.state.allEntrances);
        let eCategory = entrance.target.value;
        let eType = entrances[eCategory].type;
        //if (eType === "specialInterior") { eType = "interior"; }
        let subArea;
        let area = areas.entrances[entrance.target.name].area;
        let targetArea = "";
        if (eType === "overworld" || eType === "spawn" || eType === "warpsong" || eType === "owldrop" || eType === "extra") {
            targetArea = areas.entrances[entrance.target.value].area;
            subArea = entrances[eType][targetArea][eCategory].subAreas.filter((a) => (!(entrances["linked"].includes(a))))[0];
            if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
                entrances[eType][targetArea][eCategory].count--;
            }
            shownAreas[targetArea].show = true;
            areas[targetArea].show = true;
            if (this.state.settings["Decoupled Entrances"] === "Off" && !(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
                let eHomeType = entrances[entrance.target.name].type;
                if (eHomeType === "overworld") {
                    entrances[eHomeType][area][entrance.target.name].count--;
                }
                areas.entrances[eCategory].link = entrance.target.name;
                shownAreas[targetArea].entrances[eCategory].link = entrance.target.name;
            }
        } else {
            subArea = entrances[eType][eCategory].subAreas.filter((a) => (!(entrances["linked"].includes(a))))[0];
            if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
                entrances[eType][eCategory].count--;
            }
        }
        areas.entrances[entrance.target.name].link = subArea;
        shownAreas[area].entrances[entrance.target.name].link = subArea;
        if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
            entrances["linked"].push(subArea);
        } else if (targetArea !== "") {
            entrances["oneWayAreas"].push(targetArea);
        }
        let entrancePools = this.loadEntrancePools(this.state.settings, entrances);
        this.setState({
            allAreas: areas,
            allEntrances: entrances,
            areas: shownAreas,
            entrances: entrancePools,
        });
    }

    unLinkEntrance(entrance) {
        console.log(entrance.target.name);
        let areas = cloneDeep(this.state.allAreas);
        let shownAreas = cloneDeep(this.state.areas);
        let entrances = cloneDeep(this.state.allEntrances);
        let subArea = areas.entrances[entrance.target.name].link;
        let eType = entrances[subArea].type;
        let eHomeType = entrances[entrance.target.name].type;
        let eCategory = entrances[subArea].category === "" ? subArea : entrances[subArea].category;
        let area = areas.entrances[entrance.target.name].area;
        let alwaysOneWay = ["spawn","warpsong","owldrop","extra"];
        Object.filterAreas = (entrances, predicate) =>
            Object.keys(entrances)
                .filter( key => predicate(entrances[key].link) );
        areas.entrances[entrance.target.name].link = "";
        shownAreas[area].entrances[entrance.target.name].link = "";
        if (eType === "overworld" || eType === "spawn" || eType === "warpsong" || eType === "owldrop" || eType === "extra") {
            let targetArea = areas.entrances[subArea].area;
            if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
                entrances[eType][targetArea][eCategory].count++;
            }
            let j = entrances["linked"].indexOf(entrance.target.name);
            if (j > -1) {
                entrances["linked"].splice(j,1);
            }
            if (this.state.settings["Decoupled Entrances"] === "Off") {
                if (eHomeType === "overworld") {
                    entrances[eHomeType][area][entrance.target.name].count++;
                }
                if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
                    areas.entrances[eCategory].link = "";
                    shownAreas[targetArea].entrances[eCategory].link = "";
                }
                let linkedTargetEntrances = (Object.filterAreas(shownAreas[targetArea].entrances, eLink => eLink !== "" ));
                if (alwaysOneWay.includes(eHomeType)) {
                    let oneWayAccess = false;
                    alwaysOneWay.forEach(oneType => {
                        Object.keys(entrances[oneType]).forEach(aOneWay => {
                            Object.keys(entrances[oneType][aOneWay]).forEach(eOneWay => {
                                if (areas.entrances[eOneWay].link !== "") {
                                    if (areas.entrances[areas.entrances[eOneWay].link].area === targetArea) {
                                        oneWayAccess = true;
                                    }
                                }
                            });
                        });
                    });
                    if (!oneWayAccess) {
                        let k = entrances["oneWayAreas"].indexOf(targetArea);
                        if (k > -1) {
                            entrances["oneWayAreas"].splice(k,1);
                        }
                    }
                }
                if (linkedTargetEntrances.length === 0 && !(entrances["oneWayAreas"].includes(targetArea))) { 
                    shownAreas[targetArea].show = false;
                    areas[targetArea].show = false;
                }
            }
        } else {
            if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
                entrances[eType][eCategory].count++;
            }
        }
        let linkedEntrances = (Object.filterAreas(shownAreas[area].entrances, eLink => eLink !== "" ));
        if (linkedEntrances.length === 0 && !(entrances["oneWayAreas"].includes(area))) {
            shownAreas[area].show = false;
        }
        if (!(alwaysOneWay.includes(entrances[entrance.target.name].type))) {
            let i = entrances["linked"].indexOf(subArea);
            if (i > -1) {
                entrances["linked"].splice(i,1);
            }
        }
        let entrancePools = this.loadEntrancePools(this.state.settings, entrances);
        this.setState({
            allAreas: areas,
            allEntrances: entrances,
            areas: shownAreas,
            entrances: entrancePools,
        });
    }

    render() {
        return (
            <div className="tracker">
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Settings Panel
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form>
                                    <CardColumns>
                                    {
                                        Object.keys(this.state.enabled_settings).map((setting,si) => {
                                            return (
                                                <GameSetting 
                                                    title={setting}
                                                    options={this.state.enabled_settings[setting]}
                                                    selected={this.state.settings[setting]}
                                                    onChange={(s) => this.changeSetting(s)}
                                                    key={si}
                                                />
                                            )
                                        })
                                    }
                                    </CardColumns>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <CardColumns>
                        {
                            Object.keys(this.state.areas).filter((a) => (this.state.areas[a].show)).map((area, ia) => { 
                                return (
                                    <GameArea
                                        title={area}
                                        entrances={this.state.areas[area].entrances}
                                        entrance_pools={this.state.entrances}
                                        oneWayEntrancePools={this.state.oneWayEntrances}
                                        mixedPools={this.state.settings["Mixed Pools"]}
                                        allEntrances={this.state.allEntrances}
                                        allAreas={this.state.allAreas}
                                        locations={this.state.areas[area].locations}
                                        handleLink={this.linkEntrance}
                                        handleUnLink={this.unLinkEntrance}
                                        key={ia}
                                    />
                                )
                            })
                        }
                </CardColumns>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Tracker />,
    document.getElementById('root')
);
  