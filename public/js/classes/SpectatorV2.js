// Works only with site mode set to Live

class Spectator {
    constructor(systemId) {
        const self = this;

        self.destroyed = false;
        self.socket = new WebSocket(window.siteConfig["live-api-provider"]);
        self.modeInfo = undefined;
        // Partially filled array of player objects located at the index of their ID
        self.players = [];
        // Filled array of team objects
        self.teams = [];

        // Position data of players on the map, most recent data first.
        self.positionLogs = [];
        // Current position as we're rendering it on the radar
        self.activePosition = null;
        // timestamp of the last time we ticked player positions
        self.lastTickTimeStamp = null;

        self.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--spectate-background-color");
        self.asteroidsColor = getComputedStyle(document.documentElement).getPropertyValue("--spectate-asteroids-color");
        self.spectateOutlineColor = getComputedStyle(document.documentElement).getPropertyValue("--spectate-player-highlighting-color");

        // Set placeholder text on the UI and add event listeners to cleanly
        // disconnect the socket if the panel is closed
        self.prepareUI();
        // Add event listeners for websocket events
        self.bindWebSocket(systemId);
    }

    #spectatingID = null;

    get spectatingID() {
        return this.#spectatingID;
    }

    set spectatingID(val) {
        if (this.#spectatingID === val) return;
        let Old = document.querySelector("#live-ship-viewer-" + this.#spectatingID);
        let New = document.querySelector("#live-ship-viewer-" + val);

        if (Old) Old.setAttribute("class", "player-view-box");

        if (New) New.setAttribute("class", "player-view-box highlighted");

        this.#spectatingID = val;
    }

    prepareUI() {
        const self = this;
        // Temporary placeholder text while system info loads
        document.getElementById("spectatorModalTitle").innerText = "Spectating: ???";

        // Set binding to destroy the Spectator object
        // if the pop-up window closes
        let destroyOnModalHide = () => {
            self.destroy();
            document.getElementById("spectatorModal").removeEventListener("hide.bs.modal", destroyOnModalHide);
        }

        document.getElementById("spectatorModal").addEventListener("hide.bs.modal", destroyOnModalHide);

        // Make sure there can only be one active spectator object active
        if (window.activeSpectator && window.activeSpectator !== self) {
            window.activeSpectator.destroy();
        }
        window.activeSpectator = self;

        // prepare canvas event

        let canvas = document.querySelector("#spectatorCanvas");

        canvas.onmousemove = function (e) {
            if (self.players == null) return;
            let cdata = canvas.getBoundingClientRect();
            let cursorX = (e.clientX - cdata.left) * window.devicePixelRatio;
            let cursorY = (e.clientY - cdata.top) * window.devicePixelRatio;

            let lastDist = Infinity;

            let hasTarget = false, oldID = self.spectatingID;

            for (let player of self.players) {
                if (!player || !player.renderInfo) continue;

                let shipX = player.renderInfo.x;
                let shipY = player.renderInfo.y;

                let dist = Math.sqrt((shipX - cursorX) ** 2 + (shipY - cursorY) ** 2);

                // simply just ignore every players which are too far from the current cursor
                if (dist > player.renderInfo.radius) continue;
                hasTarget = true;
                if (dist < lastDist) {
                    lastDist = dist;
                    self.spectatingID = player.id;
                }
            }
            if (!hasTarget) self.spectatingID = null;
        };

        canvas.onmouseout = function () {
            self.spectatingID = null;
        };

    }

    bindWebSocket(systemId) {
        const self = this;

        self.socket.addEventListener("open", () => {
            self.socket.send(JSON.stringify({
                name: "subscribe",
                data: {
                    id: systemId
                }
            }));
        });

        self.socket.addEventListener("message", (evt) => {
            let message = evt.data;
            if (typeof message === "string" && message.startsWith("{")) {
                let json = JSON.parse(message);
                if (json.name === "mode_info") {
                    self.handleModeInfo(json.data);
                } else if (json.name === "player_name") {
                    if (self.players[json.data.id]) self.players[json.data.id].profile = json.data;
                }
            } else if (typeof message === "object") {
                self.handleBinaryMessage(message).then();
            }
        });

        self.socket.addEventListener("close", () => {
            self.destroyed = true;
        });
    }

    handleModeInfo(modeInfo) {
        const self = this;

        self.modeInfo = modeInfo;
        self.modeInfo.mode.map_size = self.modeInfo.mode.map_size || 30;

        self.compileAsteroidsMapImage();

        document.getElementById("spectatorModalTitle").innerText = `Spectating: ${self.modeInfo.name}`;

        self.render();

        self.renderScores();
    }

    tickActivePosition() {
        const self = this;

        if (!self.activePosition) return;

        let now = Date.now();
        // The time we're allowed to tick
        let deltaT = now - self.lastTickTimeStamp;

        while (deltaT > 0) {

            while (self.positionLogs.length > 1 && self.activePosition.timestamp > self.positionLogs[0].timestamp) self.positionLogs.shift();

            let currentPositions = self.activePosition.positions;
            if (!self.positionLogs[0]) break;
            let targetPositions = self.positionLogs[0].positions;

            let timeRequired = self.positionLogs[0].timestamp - self.activePosition.timestamp;
            let timeToTick = deltaT;
            let refreshActivePositionPlayers = false;
            if (timeRequired <= deltaT) {
                timeToTick = timeRequired;
                refreshActivePositionPlayers = true;
            }
            deltaT -= timeToTick;

            for (let player of currentPositions) {
                if (!player) continue;
                let id = player.id;
                if (!targetPositions[id]) continue;
                let target = targetPositions[id];

                let delta = shortestPath(player.x, player.y, target.x, target.y, self.modeInfo.mode.map_size);
                let dx = delta[0] * (timeToTick / timeRequired);
                let dy = delta[1] * (timeToTick / timeRequired);
                currentPositions[id].x += isNaN(dx) ? 0 : dx;
                currentPositions[id].y += isNaN(dy) ? 0 : dy;
            }

            self.activePosition.timestamp += timeToTick;
            if (refreshActivePositionPlayers) {
                self.activePosition = {...self.positionLogs[0]};
                self.positionLogs.shift();
            }
        }

        self.lastTickTimeStamp = now;
    }

    async handleBinaryMessage(message) {
        const self = this;

        let buffer = await message.arrayBuffer();
        let view = new DataView(buffer);

        if (view.getUint8(0) === 0x01) {
            let receivedIDs = new Set();
            // if message is ship info
            let positionData = {
                timestamp: Date.now(),
                positions: []
            };
            for (let offset = 1; offset <= view.byteLength - 15; offset += 15) {
                let id = view.getUint8(offset);
                let decodedStatus = {
                    id: view.getUint8(offset),
                    x: view.getFloat32(offset + 1, true),
                    y: view.getFloat32(offset + 5, true),
                    score: view.getUint32(offset + 9, true),
                    alive: (view.getUint16(offset + 13, true) & (1 << 15)) !== 0,
                    ship: view.getUint16(offset + 13, true) & ~(1 << 15)
                };
                positionData.positions[id] = {...decodedStatus};
                // if we've received position on a player whose name we don't know yet
                if (!self.players[id]) {
                    self.players[id] = decodedStatus;
                    // send request to get player's name
                    self.socket.send(JSON.stringify({
                        name: "get_name",
                        data: {
                            id: id
                        }
                    }));
                    // give the player a generic name for now
                    self.players[id].profile = {
                        custom: null,
                        friendly: 0,
                        hue: 0,
                        id: id,
                        player_name: "???"
                    }
                } else {
                    // Otherwise, update the player's status
                    Object.assign(self.players[id], decodedStatus);
                }
                // add the ID to the set of IDs we've received in this packet
                receivedIDs.add(view.getUint8(offset));
            }
            // Check if any of our currently stored player objects is not present in the radar
            // packet received. If it isn't present, delete it.
            for (let player of self.players) if (player && !receivedIDs.has(player.id)) delete self.players[player.id];
            // Push our position data to the end of the logs
            self.positionLogs.push(positionData);
            // if we don't have a current position yet, set the most recent info as the current position
            if (!self.activePosition) {
                self.activePosition = positionData;
                self.lastTickTimeStamp = Date.now();
            }
        } else if (view.getUint8(0) === 0x02) {
            let teams = [];
            let i = 0;

            for (let offset = 1; offset <= view.byteLength - 5; offset += 5) {
                teams[i] = {
                    level: view.getUint8(offset) & 0x0F,
                    open: (view.getUint8(offset) & 0xF0) !== 0,
                    crystals: view.getUint32(offset + 1, true)
                }
                i++;
            }
            self.teams = teams;
        }
    }

    renderScores() {
        const self = this;

        if (self.destroyed) return;

        self.renderLeaderBoard().then(() => {
            setTimeout(() => {
                self.renderScores();
            }, 1000);
        })
    }

    render() {
        const self = this;

        if (self.destroyed) return;

        self.tickActivePosition();
        self.renderMap();

        requestAnimationFrame(() => {
            self.render();
        });
    }

    async renderLeaderBoard() {
        const self = this;

        // Clear spectate row

        let spectateRow = document.getElementById("spectateRow");
        let scrollAmounts = [];

        while(spectateRow.childElementCount > 1) {
            scrollAmounts[scrollAmounts.length] = spectateRow.lastChild.scrollTop;
            spectateRow.removeChild(spectateRow.lastChild);
        }

        let colClass = "col analysis-col px-1";
        /*if (self.modeInfo.mode.friendly_colors === 2) {
            colClass = "col-sm-3 analysis-col px-1";
        }*/

        // row.style.height = canvas.height + "px";

        let i = scrollAmounts.length - 1;

        let teamIndex = -1;
        for (let team of self.modeInfo.mode.teams) {
            teamIndex++;
            if (!self.teams[teamIndex]) continue;

            let column = document.createElement("div");
            column.className = colClass;
            column.style.overflowY = "scroll";
            column.style.overflowX = "hidden";
            column.style.height = document.getElementById("spectatorCanvas").style.height;

            let title = document.createElement("h5");
            if (self.teams[teamIndex].open) {
                title.innerHTML = `${translateColor(team.hue)} <i class="bi bi-unlock-fill"></i>`;
            } else {
                title.innerHTML = `${translateColor(team.hue)} <i class="bi bi-lock-fill"></i>`;
            }
            title.className = "text-center m-0";
            column.appendChild(title);

            let hr = document.createElement("hr");
            hr.className = "m-1";
            column.appendChild(hr);

            spectateRow.appendChild(column);

            let players = [];
            for (let ship of self.players) {
                if (!ship) continue;
                if (ship.profile.hue === team.hue) {
                    players.push(ship);
                }
            }

            let totalScore = 0;
            let ecpCount = 0;
            for (let player of players) totalScore += player.score;
            for (let player of players) if (player.profile.custom) ecpCount++;

            column.insertAdjacentHTML("beforeend", `
                <span><b class="float-start">ECP Count</b> <p class="float-end m-0">${ecpCount}</p><br></span>
                <span><b class="float-start">Level</b> <p class="float-end m-0">${self.teams[teamIndex].level}</p><br></span>
                <span><b class="float-start">Gems</b> <p class="float-end m-0">${self.teams[teamIndex].crystals}</p><br></span>
                <span><b class="float-start">Score</b> <p class="float-end m-0">${totalScore}</p><br></span>
                <hr class="m-1">
            `);

            // Determine mod
            let shipFolder = "vanilla";
            let displayShips = false;
            let firstShip;

            if (self.modeInfo.mode.unlisted) {
                displayShips = false;
            } else {
                if (self.modeInfo.mode.id === "modding") firstShip = JSON.parse(self.modeInfo.mode.ships[0]);

                if (self.modeInfo.mode.id === "team") {
                    displayShips = true;
                } else if (firstShip.name === "U-Sniper Mk 2") {
                    shipFolder = "useries";
                    displayShips = true;
                } else if (firstShip.name === "Snail") {
                    shipFolder = "nautic";
                    displayShips = true;
                } else if (firstShip.name === "Fly_V2") {
                    shipFolder = "intrusion";
                    displayShips = true;
                }
            }

            players.sort((a, b) => {return b.score - a.score});
            for (let player of players) {
                let col = document.createElement("div");

                let playerID = player.id;

                col.id = "live-ship-viewer-" + playerID;

                if (playerID === self.spectatingID) {
                    col.setAttribute("class", "player-view-box highlighted");
                } else {
                    col.setAttribute("class", "player-view-box");
                }
                let doImageFilter = false;

                let firstSpan = document.createElement("span");

                if (player.profile.custom) {
                    doImageFilter = true;

                    if (player.profile.custom.badge !== "blank") {
                        (() => {
                            return new Promise(async(resolve) => {
                                let badgeURI = await getECPIcon(player.profile.custom);
                                firstSpan.innerHTML = `<img src=${badgeURI} style="height: 0.65rem; width:1.3rem; margin-bottom: 0.1rem;"> ` + firstSpan.innerHTML;
                            })
                        })().then();
                    }

                }

                let image = "";

                const getShipStr = (ship, shipFolder) => {
                    const vanillaTranslation = {
                        101:"\uf100",
                        201:"\uf101",
                        202:"\uf102",
                        301:"\uf103",
                        302:"\uf104",
                        303:"\uf105",
                        304:"\uf106",
                        401:"\uf107",
                        402:"\uf108",
                        403:"\uf109",
                        404:"\uf10a",
                        405:"\uf10b",
                        406:"\uf10c",
                        501:"\uf10d",
                        502:"\uf10e",
                        503:"\uf10f",
                        504:"\uf110",
                        505:"\uf111",
                        506:"\uf112",
                        507:"\uf113",
                        508:"\uf114",
                        601:"\uf115",
                        602:"\uf116",
                        603:"\uf117",
                        604:"\uf118",
                        605:"\uf119",
                        606:"\uf11a",
                        607:"\uf11b",
                        608:"\uf11c",
                        609:"\uf11d",
                        701:"\uf11e",
                        702:"\uf11f",
                        703:"\uf120",
                        704:"\uf121",
                    }
                    if (shipFolder === "vanilla") {
                        return vanillaTranslation[ship];
                    } else {
                        return String.fromCharCode(ship);
                    }
                }

                if (displayShips && doImageFilter) {
                    image = `<span class="ship-icon ship-icon-${shipFolder}" style="color: hsl(${player.profile.hue}, 100%, 40%)">${getShipStr(player.ship, shipFolder)}</span>`;
                } else if (displayShips) {
                    image = `<span class="ship-icon ship-icon-${shipFolder}">${getShipStr(player.ship, shipFolder)}</span>`;
                } else if (!displayShips && doImageFilter) {
                }

                firstSpan.setAttribute("style", "font-size: 0.65rem; overflow: hidden; white-space: nowrap; color: inherit; cursor: inherit;");
                firstSpan.setAttribute("class", "ship-name");
                //firstSpan.innerHTML += image;
                firstSpan.innerHTML += `&nbsp`;
                firstSpan.innerHTML += player.profile.player_name.replace("<", "&lt").replace(">", "&gt");
                col.appendChild(firstSpan);

                col.insertAdjacentHTML("beforeend", `
                    <span class="ship-score" style="font-size: 0.65rem; color: inherit; cursor: inherit;">
                        ${player.score}
                        ${image}
                    </span>
                `);

                col.addEventListener("mouseover", function (e) {
                    self.spectatingID = playerID;
                });

                col.addEventListener("mouseout", function (e) {
                    if (self.spectatingID === playerID) self.spectatingID = null;
                });

                column.appendChild(col);
            }

            column.scrollTop = scrollAmounts[i];

            i--;
        }
    }

    compileAsteroidsMapImage() {
        const self = this;

        if (!self.modeInfo) return;

        let canvas = document.getElementById("spectatorCanvas");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = self.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let size = self.modeInfo.mode.map_size;

        if (!self.generatedMap) {
            self.generatedMap = self.modeInfo.mode.custom_map ||
                getMap(
                    self.modeInfo.seed, size,
                    self.modeInfo.mode.id === "modding" ? self.modeInfo.mode.root_mode : self.modeInfo.mode.id
                );
        }

        let map = self.generatedMap;

        let cellWidth = canvas.width / size;
        let maxRadius = cellWidth / 2;

        // Render asteroids

        let y = 0;
        for (let line of map.split("\n")) {
            let x = 0;
            for (let asteroid of line) {
                let cx = x * cellWidth + maxRadius;
                let cy = y * cellWidth + maxRadius;

                if (preferencesManager.preferences.centerMapOnAsteroids) {
                    cx = (cx + (canvas.width / 2)) % canvas.width;
                    cy = (cy + (canvas.width / 2)) % canvas.width;
                }
                let cr = (Number(asteroid) / 10) * maxRadius;

                ctx.beginPath();
                ctx.fillStyle = self.asteroidsColor;
                ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                ctx.fill();

                x++;
            }
            y++;
        }

        // Ok, we're done. Let's get the image data

        let image = canvas.toDataURL();

        canvas.style.backgroundImage = `url(${image})`;
        canvas.style.backgroundSize = canvas.style.width;
    }

    renderMap() {
        const self = this;

        let canvas = document.getElementById("spectatorCanvas");
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = self.backgroundColor;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let size = self.modeInfo.mode.map_size;
        let cellWidth = canvas.width / size;
        let maxRadius = cellWidth / 2;

        // Render team mode bases

        let S = 0.8;
        let V = 0.8;
        for (let team of self.modeInfo.mode.teams) {
            let phase = team.station.phase;
            let radius = (Math.sqrt(2)/2) * canvas.width / 2;
            let steps = (self.modeInfo.servertime + (Date.now() - self.modeInfo.obtainedAt)) / 1000 * 60;
            // let theta = ((360/216000 * steps) / 180 * Math.PI) + phase;
            let theta = steps / 60 / 3600 % 1 * Math.PI * 2;
            let x = radius * Math.cos(theta + phase);
            let y = -(radius * Math.sin(theta + phase));

            let rgb = hsv2rgb(team.hue, S, V);
            ctx.strokeStyle = `rgb(${rgb[0]*255}, ${rgb[1]*255}, ${rgb[2]*255})`;
            ctx.strokeWidth = 1;
            ctx.fillStyle = `rgb(${rgb[0]*255}, ${rgb[1]*255}, ${rgb[2]*255})`;
            ctx.beginPath();
            // ctx.rect(canvas.width / 2 + x - 4 * maxRadius, canvas.width / 2 + y - 4 * maxRadius, 8 * maxRadius, 8 * maxRadius);
            // ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, 2 * maxRadius, 0, 2*Math.PI);

            let cx = canvas.width / 2 + x - 4 * maxRadius;
            let cy = canvas.width / 2 + y - 4 * maxRadius;

            if (preferencesManager.preferences.centerMapOnAsteroids) {
                cx = (cx + (canvas.width / 2)) % canvas.width;
                cy = (cy + (canvas.width / 2)) % canvas.width;
            }

            roundRect(ctx, cx, cy, 8 * maxRadius, 8 * maxRadius, maxRadius, true, false);
            ctx.fill();

            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(cx+5.75*maxRadius, cy+2.25*maxRadius, 1.1*maxRadius, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(cx+5.75*maxRadius, cy+5.75*maxRadius, 1.1*maxRadius, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(cx+2.25*maxRadius, cy+4*maxRadius, 1.1*maxRadius, 0, 2*Math.PI);
            ctx.fill();
            ctx.closePath();
            ctx.lineWidth = maxRadius/2;
            ctx.beginPath();
            ctx.moveTo(cx+5.75*maxRadius, cy+2.25*maxRadius);
            ctx.lineTo(cx+2.25*maxRadius, cy+4*maxRadius);
            ctx.lineTo(cx+5.75*maxRadius, cy+5.75*maxRadius);
            ctx.stroke();
            ctx.closePath();
            ctx.globalCompositeOperation = "source-over";
        }

        // Render players

        let adjust = function(x, size) {
            return ((x + size / 2) % size) - (size / 2);
        }

        if (!self.activePosition) return;

        for (let player of self.activePosition.positions) {
            if (!player || !player.alive || !self.players[player.id]) continue;

            let profile = self.players[player.id].profile;

            let x = (player.x / (self.modeInfo.mode.map_size * 5)) * (canvas.width / 2);
            let y = -(player.y / (self.modeInfo.mode.map_size * 5)) * (canvas.height / 2);

            let c = hsv2rgb(profile.hue, S, V);
            let color = hsv2hex(profile.hue, S, V);

            // window.drawTransparentCircle(canvas, ctx, x, y, `rgba(${c[0]*255}, ${c[1]*255}, ${c[2]*255}, 0.5)`, 10, maxRadius);

            // draw a little while circle around the "X" if it's highlighting
            self.players[player.id].renderInfo = window.drawCross(canvas, ctx, x, y, color, maxRadius, player.id === self.spectatingID, self.spectateOutlineColor);
        }
    }

    static resizeCanvas() {
        // Resize canvas element itself
        let canvas = document.getElementById("spectatorCanvas");

        canvas.style.width = (canvas.parentElement.clientWidth) + "px";
        canvas.style.height = (canvas.parentElement.clientWidth) + "px";
        canvas.setAttribute("width", String(canvas.parentElement.clientWidth*window.devicePixelRatio));
        canvas.setAttribute("height", String(canvas.parentElement.clientWidth*window.devicePixelRatio));

        if (window.activeSpectator) window.activeSpectator.compileAsteroidsMapImage();
    }

    static show() {
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("spectatorModal"));
        modal.show();
        Spectator.resizeCanvas();
    }

    static hide() {
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("spectatorModal"));
        modal.hide();
    }

    destroy() {
        const self = this;

        self.socket.close();
        self.destroyed = true;
    }
}

window.addEventListener("resize", () => {
    Spectator.resizeCanvas();

    if (window.activeSpectator) {
        window.activeSpectator.renderMap();
    }
});
