import { WorldGraphFactory } from '@mracsys/randomizer-graph-tool';
import { execSync } from 'node:child_process';
import { mkdirSync, readdirSync } from "fs";
import { resolve, dirname } from 'path';

const ExtractRandomizerFiles = () => {
    let ootr = WorldGraphFactory('ootr');
    let ootrSupportedVersions = ootr.get_game_versions();
    const outputFolder = process.env.TOOTRDEBUG !== undefined ? 'public' : 'dist';
    const randoRoot = './assets/randomizers/';
    const buildRoot = `./${outputFolder}/`;
    const relativeBuildRoot = `../../../${outputFolder}/`;
    mkdirSync(resolve(randoRoot), { recursive: true });
    let currentFolders = readdirSync(randoRoot, {withFileTypes: true}).filter(d => d.isDirectory()).map(d => d.name);
    for (let ootrVersion of ootrSupportedVersions.versions) {
        console.log(`Starting version ${ootrVersion.version}`);
        let github = ootrVersion.github_repo();
        let asset_folder = `${ootrVersion.branch === '' ? 'main' : ootrVersion.branch}`;
        // skip branches that were already downloaded
        if (currentFolders.includes(asset_folder)) {
            console.log(`Skipping checkout for already downloaded branch ${asset_folder}`);
        } else {
            mkdirSync(resolve(`${randoRoot}${asset_folder}`), { recursive: true });
            console.log(`Cloning repo for branch ${asset_folder}`);
            try {
                let ret = execSync(`git clone ${github} ${randoRoot}${asset_folder}/`);
            } catch {
                throw(`Failed to clone github repository for branch ${asset_folder}`);
            }
            console.log('Clone complete');
            currentFolders.push(asset_folder);
        }
        let commit = ootrVersion.commit_hash();
        let local_folder = `${ootrVersion.local_folder()}/`;
        mkdirSync(resolve(`${buildRoot}${local_folder}`), { recursive: true });
        for (let f of ootrVersion.get_file_list()) {
            if (f.split('/').length > 1) {
                mkdirSync(resolve(`${buildRoot}${local_folder}`, dirname(f)), { recursive: true });
            }
            console.log(`Extracting file from repo to ${local_folder}${f}`);
            try {
                let ret = execSync(`git show ${commit}:"${f}" > "${relativeBuildRoot}${local_folder}${f}"`, {cwd: `${randoRoot}${asset_folder}/`});
            } catch {
                throw(`Failed to extract file ${f} from branch ${asset_folder} for version ${ootrVersion.version}`);
            }
        }
        console.log(`Done version ${ootrVersion.version}`);
    }
}

ExtractRandomizerFiles();