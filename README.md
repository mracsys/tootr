# TOoTR

Entrance and location tracker for Ocarina of Time Randomizer. Supports Dev-R fork-exclusive ER settings including decoupled entrances and mixed entrance pools.

## Dev Environment

The project is based on create-react-app. Run the following to start the dev environment. The site will be available at localhost:3000.

`npm start`

Deploy to production with (author only)

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