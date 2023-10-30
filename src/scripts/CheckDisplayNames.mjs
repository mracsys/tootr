/*
    Checks new entrance/location alias file for blank location aliases
*/

import display_names from '../data/DisplayNamesUpdated2.json' assert { type: 'json' };

for (let [location, alias] of Object.entries(display_names.location_aliases)) {
    if (alias === '') console.log(location);
}