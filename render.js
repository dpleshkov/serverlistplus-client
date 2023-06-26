const ejs = require("ejs");
const config = require("./config.json");
const fs = require("fs");
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');

async function main() {
    config.revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();
    config.revisionTime = require('child_process').execSync('git log -1 --format=%at').toString().trim();

    let index = await ejs.renderFile("./views/index.ejs", config);
    let app = await ejs.renderFile("./views/index.ejs", config);

    fs.writeFileSync("./views/index.html", await ejs.renderFile("./views/index.ejs", config));
    fs.writeFileSync("./views/app.html", await ejs.renderFile("./views/index.ejs", config));

    minify({
        compressor: htmlMinifier,
        input: "./views/index.html",
        output: "./views/index.min.html"
    }).then();

    minify({
        compressor: htmlMinifier,
        input: "./views/app.html",
        output: "./views/app.min.html"
    }).then();
}

main().then();