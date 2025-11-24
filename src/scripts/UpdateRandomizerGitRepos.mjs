import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync } from "fs";
import { resolve } from 'path';

const UpdateRandomizerGitRepos = () => {
    const randoRoot = './assets/randomizers/';
    mkdirSync(resolve(randoRoot), { recursive: true });
    let currentFolders = readdirSync(randoRoot, {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name);
    for (let currentFolder of currentFolders) {
        try {
            let ret = execSync(`git fetch`, {cwd: `${randoRoot}${currentFolder}/`});
        } catch {
            throw(`Failed to update branch ${currentFolder} for version ${ootrVersion.version}`);
        }
    }
}

UpdateRandomizerGitRepos();