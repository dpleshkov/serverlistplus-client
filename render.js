const ejs = require("ejs");
const config = require("./config.json");
const fs = require("fs");
const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');

async function main() {
    config.revision = require('child_process').execSync('git rev-parse HEAD').toString().trim();
    config.site.revisionTime = require('child_process').execSync('git log -1 --format=%at').toString().trim();

    fs.writeFileSync("./public/index.html", await ejs.renderFile("./views/index.ejs", config));
    fs.writeFileSync("./public/app.html", await ejs.renderFile("./views/app.ejs", config));

    minify({
        compressor: htmlMinifier,
        input: "./public/index.html",
        output: "./public/index.min.html"
    }).then();

    minify({
        compressor: htmlMinifier,
        input: "./public/app.html",
        output: "./public/app.min.html"
    }).then();
}

main().then();