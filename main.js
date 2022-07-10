const express = require("express");
const config = require("./config.json");
const compression = require("compression");
const cors = require("cors");

const app = express();
const port = config.server.port || 3000;

app.use(express.json());
app.use(cors());
app.use(compression());

if (config.server.logging) {
    const morgan = require("morgan");
    app.use(morgan("combined"));

    // Log forwarded IP if coming from a reverse proxy like NGINX
    morgan.token('remote-addr', function (req) {
        let ffHeaderValue = req.headers['x-forwarded-for'];
        return ffHeaderValue || req.connection.remoteAddress;
    });
}

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", {
        config: config
    });
});

app.listen(port, () => {
    console.log(`Site listening on http://localhost:${port}`);
});