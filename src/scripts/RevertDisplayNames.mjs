import merge from 'lodash/merge.js';

import death_mountain_crater from '../data/locations/death_mountain_crater.json' assert { type: 'json' };
import death_mountain_trail from '../data/locations/death_mountain_trail.json' assert { type: 'json' };
import desert_colossus from '../data/locations/desert_colossus.json' assert { type: 'json' };
import gerudo_fortress from '../data/locations/gerudo_fortress.json' assert { type: 'json' };
import gerudo_valley from '../data/locations/gerudo_valley.json' assert { type: 'json' };
import goron_city from '../data/locations/goron_city.json' assert { type: 'json' };
import graveyard from '../data/locations/graveyard.json' assert { type: 'json' };
import haunted_wasteland from '../data/locations/haunted_wasteland.json' assert { type: 'json' };
import hyrule_field from '../data/locations/hyrule_field.json' assert { type: 'json' };
import kakariko_village from '../data/locations/kakariko_village.json' assert { type: 'json' };
import kokiri_forest from '../data/locations/kokiri_forest.json' assert { type: 'json' };
import lake_hylia from '../data/locations/lake_hylia.json' assert { type: 'json' };
import lon_lon_ranch from '../data/locations/lon_lon_ranch.json' assert { type: 'json' };
import lost_woods from '../data/locations/lost_woods.json' assert { type: 'json' };
import market from '../data/locations/market.json' assert { type: 'json' };
import sacred_forest_meadow from '../data/locations/sacred_forest_meadow.json' assert { type: 'json' };
import spawn_points from '../data/locations/spawn_points.json' assert { type: 'json' };
import warp_songs from '../data/locations/warp_songs.json' assert { type: 'json' };
import zora_fountain from '../data/locations/zora_fountain.json' assert { type: 'json' };
import zora_river from '../data/locations/zora_river.json' assert { type: 'json' };
import zoras_domain from '../data/locations/zoras_domain.json' assert { type: 'json' };
import deku_tree from '../data/locations/deku_tree.json' assert { type: 'json' };
import dodongos_cavern from '../data/locations/dodongos_cavern.json' assert { type: 'json' };
import jabu_jabus_belly from '../data/locations/jabu_jabus_belly.json' assert { type: 'json' };
import forest_temple from '../data/locations/forest_temple.json' assert { type: 'json' };
import fire_temple from '../data/locations/fire_temple.json' assert { type: 'json' };
import water_temple from '../data/locations/water_temple.json' assert { type: 'json' };
import shadow_temple from '../data/locations/shadow_temple.json' assert { type: 'json' };
import spirit_temple from '../data/locations/spirit_temple.json' assert { type: 'json' };
import bottom_of_the_well from '../data/locations/bottom_of_the_well.json' assert { type: 'json' };
import ice_cavern from '../data/locations/ice_cavern.json' assert { type: 'json' };
import gerudo_training_ground from '../data/locations/gerudo_training_ground.json' assert { type: 'json' };
import ganons_castle from '../data/locations/ganons_castle.json' assert { type: 'json' };

import display_names from '../data/DisplayNamesUpdated.json' assert { type: 'json' };

import { writeFileSync } from 'fs';

// let areaJSON = merge(death_mountain_crater, death_mountain_trail, desert_colossus,
//     gerudo_fortress, gerudo_valley, goron_city, graveyard, haunted_wasteland,
//     hyrule_field, kakariko_village, kokiri_forest, lake_hylia, lon_lon_ranch,
//     lost_woods, market, sacred_forest_meadow, spawn_points, warp_songs,
//     zora_fountain, zora_river, zoras_domain, deku_tree, dodongos_cavern, jabu_jabus_belly,
//     forest_temple, fire_temple, water_temple, shadow_temple, spirit_temple,
//     bottom_of_the_well, ice_cavern, gerudo_training_ground, ganons_castle);
let areaJSON = gerudo_training_ground;
// for (let [entrance, meta] of Object.entries(areaJSON.entrances)) {
//     if (!(Object.keys(display_names.entrance_aliases).includes(entrance))) {
//         display_names.unparsed_entrances.push(entrance);
//         continue;
//     }
//     if (meta.type !== 'overworld') {
//         display_names.entrance_aliases[entrance] = meta.alias;
//     }
//     let tag = meta.tag;
//     if (tag !== '') {
//         if (!(Object.keys(display_names.entrance_groups).includes(tag))) {
//             display_names.entrance_groups[tag] = [];
//         }
//         display_names.entrance_groups[tag].push(entrance);
//     }
// }

for (let [location, meta] of Object.entries(areaJSON.locations)) {
    if (!(Object.keys(display_names.location_aliases).includes(location))) {
        display_names.unparsed_locations.push(location);
        continue;
    }
    display_names.location_aliases[location] = meta.alias;
}
//console.log(JSON.stringify(display_names));
writeFileSync('../data/DisplayNamesUpdated2.json', JSON.stringify(display_names, null, 4), 'utf-8');