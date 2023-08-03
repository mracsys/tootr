const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ``;
let basePath = ``;

if (isGithubActions) {
    const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')
    assetPrefix = `/${repo}/`;
    basePath = `/${repo}`;
}


/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: assetPrefix,
    basePath: basePath,
    webpack: (config, options) => {
        config.resolve.fallback = {};
        config.module.exprContextCritical = false;
        return config;
    },
}

module.exports = nextConfig
