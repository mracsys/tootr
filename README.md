# TOoTR - Track Ocarina of Time Randomizer

https://tootr.mracsys.com/

Entrance and location tracker for Ocarina of Time Randomizer. Supports extended ER settings in dev branches, including decoupled entrances and mixed entrance pools.

## Usage

Learn how to use TOoTR in this video:

[![Watch the video](https://img.youtube.com/vi/mNgKcKv2cT0/maxresdefault.jpg)](https://youtu.be/mNgKcKv2cT0)

## Dev Environment

The project is built with vite. Tested on Node 20.x. For initial setup, install node.js and pnpm, then run the following in the project folder.

`pnpm install`

Run the following to start the dev environment. The site will be available at localhost:5173.

`pnpm run dev`

Build a local copy with

`pnpm run build`

Local deployment for testing is performed with

`pnpm run localdeploy`

Production builds are automatically deployed to Cloudflare Pages when new commits are pushed to Github.

Recommended debugging profile via VSCode + Chrome with the React Developer Tools Chrome extension:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Vite: debug Chrome",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:5173",
            "webRoot": "${workspaceFolder}/",
            "resolveSourceMapLocations": [
                "${workspaceFolder}/**",
                "!**/node_modules/@jridgewell/trace-mapping/**",
                "!**/node_modules/@babel/**"
            ],
            "skipFiles": [
                "**/node_modules/**"
            ],
        }
    ]
}
```
