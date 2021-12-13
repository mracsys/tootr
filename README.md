# TOoTR - Track Ocarina of Time Randomizer

https://mracsys.github.io/tootr/

Entrance and location tracker for Ocarina of Time Randomizer. Supports Dev-R fork-exclusive ER settings including decoupled entrances and mixed entrance pools.

## Usage

The tracker starts out with all entrance pools randomized. The world reveals itself as entrances are discovered. Entrances and locations are divided by overworld area. Progress is saved automatically, even if you close the site. Seed settings changes can be applied or reversed at any point in the run.

### Settings

Randomzier and tracker settings can be accessed from the hamburger menu in the upper left. Randomizer settings default to full entrance shuffle plus all *sanity settings enabled without mixed pools or decoupled entrances. This maximizes entrances and locations to discover in the tracker. Settings are divided into 4 menus:

#### Tracker Settings

  * **Show Unshuffled Entrances**: Control visibility of unshuffled entrances. If disabled, unshuffled entrances and any interior locations will be hidden, even if its area collapse is disabled.
  * **Show Locations**: Hide or show locations. If using this as a pure entrance tracker or map, disabling this setting drastically cuts down on scrolling through each area. The `Interiors Only` setting hides only locations in outdoors overworld locations such as the vanilla Kokiri Sword chest.
  * **Show Unshuffled Skulls**: Similar to the entrances setting, controls visibility of unshuffled Gold Skulltula locations. This does nothing by default as Tokensanity is set to All initially.
  * **Shop Price Tracking**: With Shopsanity enabled, shop prices can be tracked as exact rupee counts, wallet tier using different color rupee icons, or both.

#### ER Settings

  * All available entrance randomizer settings in the Dev-R fork of the randomizer (https://ootrandomizer.com/generatorDev?version=devR_).
  * By default, all settings are on except Mixed Pools and Decoupled Entrances.

#### Shuffled Items

  * All available item shuffle settings.
  * Location visibility is automatically adjusted to match enabled shuffled locations.

#### World Settings

  * Additional logically-relevant settings.
  * Currently unused except for the Gerudo Fortress setting, which controls carpenter key location visibility.

### Linking Entrances

Once an entrance destination is known, select it in the corresponding dropdown. Available options are filtered for what is possible with available settings and what has already been found. Overworld entrances are sorted by overworld area. If leaving Kakariko Village via the vanilla Hyrule Field exit leads to Gerudo Valley from Hyrule Field, find the Kakariko Village area, then the Hyrule Field entrance, open the dropdown, scroll to the Gerudo Valley section, and select the Hyrule Field entrance.

Entrances can be unlinked at either end by clicking the X button next to the exit name.

To reduce scrolling in the dropdown, functionally similar interiors are grouped together as a single option. For example, houses in Kokiri Forest are grouped under the House option except for Link's House and Mido's House. Grouping applies to:

  * Houses with no checks
  * Shops, except the Kakariko Potion Shop
  * Great Fairy Fountains
  * Generic Grottos
  * 2 and 3 business scrub grottos, except for the special reversed 2 scrub grotto normally found near the Sacred Forest Meadow entrance
  * Fairy Fountain grottos
  * Skulltula grottos (only 2, the one with bombable walls normally outside Hyrule Castle and the one with a skulltula in a web normally in Hyrule Field near Kakariko Village)

Some interiors function as connectors between two overworld exits, such as the Kakariko Village Potion Shop. If any connectors are shuffled, a secondary entrance to link is automatically added under the original entrance to tell the tracker where the other exit leads. When both ends are linked, the connected overworld areas contain both sides of the connector for easier navigation.

Warp song pads are not grouped in with other overworld areas in the dropdown. They are near the bottom of the dropdown in the `Warp Song Pads` section. Likewise, vanilla Child and Adult spawn points are in the Spawn Points section, and owl drops are in the Owl Drops section.

With full mixed pools, overworld entrances and one-way warps can lead to interior exits. For example, Hyrule Field entrance from Kakariko Village can exit the Gerudo Valley tent. Without decoupled entrances, this only applies to overworld entrances and warps. With decoupled and mixed pools, everything can go everywhere.

Decoupled entrances with large mixed pools frequently creates new overworld connectors via chains of interiors. These chains are shown starting at the originating overworld area and terminating at any overworld exit. 

### Area Collapse

Each visible overworld area can individually hide checked locations and empty interiors, as well as all entrances if desired. By default, areas collapse checked locations and interiors except for connectors like Kakariko Potion Shop. If you misclick and a location or entrance accidentally disappears, click or right-click the area name to cycle between collapse modes. Modes are:

  * **Show All (down arrow next to area name)**: All locations and entrances in this area are shown at all times.
  * **Show Some (side arrow next to area name)**: Default behavior. Cleared entrances and interiors in this area are automatically hidden. Overworld exits and connectors are always shown.
  * **Show None (up arrow next to area name)**: All locations and entrances in this area are hidden.

### Locations and Item Tracking

If locations are shown, available locations in an overworld area and any connected interiors are displayed as a checklist. Locations can be cleared by clicking, and found items can be assigned to locations via right-click/long-touch. Found items are shown as icons next to the checkbox. Icons to the left of the location name indicate the vanilla item, such as a Gold Skulltula Token or dungeon small key. Found items can be cleared by right-clicking to re-open the item menu and selecting Clear Item at the bottom.

Shops have extra locations shown as plus symbols depending on the shopsanity setting. These plus icons are used to track normal, renewable shop items such as Deku Sticks. The remaining shop locations are shown as a location checklist for shuffled one-time purchase items. These locations, once an item is assigned to them, can track the item price and/or wallet tier depending on tracker settings.

### Navigation

To reduce scrolling, links are provided on each known entrance between overworld areas. Click the destination area to jump to that area.

Additionally, a quick menu for known spawn points and warp songs is always available in the bottom right. Clicking a known spawn or warp song jumps to the destination area. Clicking an unknown spawn point jumps to the Spawn Points area. Clicking an unknown warp song jump to the Warp Songs area. The globe icon opens a menu of links to each discovered overworld area. The door icon opens a menu of dungeon links.

Dungeons are broken out as separate areas in their own view due to the large number of contained locations. To swap between overworld and dungeon view, either click a link to a specific dungeon or dungeon exit, or right click/long touch the quick menu globe or door icons.

### Tracker Reset

The Reset button in the upper right will clear all entrance and location data and reset randomizer settings to default values. Tracker settings are never reset. Be careful, as there is no recovery option once the reset is complete!

## Dev Environment

The project is based on create-react-app. Tested on Node 14.x. For initial setup, install node.js and run the following in the project folder.

`npm install`

Run the following to start the dev environment. The site will be available at localhost:3000/tootr.

`npm start`

Build a local copy with

`npm run build`

Production builds expect the site to be in a /tootr/ folder in order to support Github Pages.

Deploy to production with (repo contributor only)

`npm run deploy`

Recommend debugging via VSCode + Chrome with the React Developer Tools Chrome extension. Sample launch.json:

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}",
            "userDataDir": false
        }
    ]
}
```
