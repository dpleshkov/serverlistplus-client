// Works only with site mode set to Live

class Spectator {
    constructor(systemId) {
        const self = this;

        // Temporary placeholder text while system info loads
        document.getElementById("spectatorModalTitle").innerText = "Spectating: ???";

        let destroyOnModalHide = () => {
            self.destroy();
            document.getElementById("spectatorModal").removeEventListener("hide.bs.modal", destroyOnModalHide);
        }

        document.getElementById("spectatorModal").addEventListener("hide.bs.modal", destroyOnModalHide);

        if (window.activeSpectator && window.activeSpectator !== self) {
            window.activeSpectator.destroy();
            window.activeSpectator = self;
        }

        self.destroyed = false;
        self.socket = new WebSocket(window.siteConfig["live-api-provider"]);

        self.socket.addEventListener("open", () => {
            self.socket.send(JSON.stringify({
                name: "subscribe",
                data: {
                    id: systemId
                }
            }));
        });

        self.modeInfo = undefined;

        self.players = [];

        self.teams = [];

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

        document.getElementById("spectatorModalTitle").innerText = `Spectating: ${self.modeInfo.name}`;

        self.render();

        self.renderScores();
    }

    async handleBinaryMessage(message) {
        const self = this;

        let buffer = await message.arrayBuffer();
        let view = new DataView(buffer);

        if (view.getUint8(0) === 0x01) {
            let receivedIDs = new Set();
            // if message is ship info
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

        self.renderMap();
        //self.renderLeaderBoard().then();
        self.lastRenderTimeStamp = Date.now();

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

        let colClass = "col-sm-2 analysis-col px-1";
        if (self.modeInfo.mode.friendly_colors === 2) {
            colClass = "col-sm-3 analysis-col px-1";
        }

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
            title.innerText = translateColor(team.hue);
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

            players.sort((a, b) => {return b.score - a.score});
            for (let player of players) {
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
                if (displayShips && doImageFilter) {
                    image = `<span class="ship-icon ship-icon-${shipFolder}" style="color: hsl(${player.profile.hue}, 100%, 40%)">${String.fromCharCode(player.ship)}</span>`;
                } else if (displayShips) {
                    image = `<span class="ship-icon ship-icon-${shipFolder}">${String.fromCharCode(player.ship)}</span>`;
                } else if (!displayShips && doImageFilter) {
                }

                firstSpan.setAttribute("style", "font-size: 0.65rem; overflow: hidden; white-space: nowrap;");
                firstSpan.setAttribute("class", "float-start");
                //firstSpan.innerHTML += image;
                firstSpan.innerHTML += `&nbsp`;
                firstSpan.innerHTML += player.profile.player_name.replace("<", "&lt").replace(">", "&gt");
                column.appendChild(firstSpan);

                column.insertAdjacentHTML("beforeend", `
                <span class="float-end" style="font-size: 0.65rem">
                    ${player.score}
                    ${image}
                </span>
                <br>
            `);
            }

            column.scrollTop = scrollAmounts[i];

            i--;
        }
    }

    renderMap() {
        const self = this;

        let canvas = document.getElementById("spectatorCanvas");
        let ctx = canvas.getContext("2d");

        let deltaT = Date.now() - self.lastRenderTimeStamp;

        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--spectate-background-color");
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
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--spectate-asteroids-color");
                ctx.arc(cx, cy, cr, 0, Math.PI * 2);
                ctx.fill();

                x++;
            }
            y++;
        }

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

            roundRect(ctx, cx, cy, 8 * maxRadius, 8 * maxRadius, maxRadius, true);
            ctx.fill();
        }

        // Render players

        let adjust = function(x, size) {
            return ((x + size / 2) % size) - (size / 2);
        }

        for (let player of self.players) {
            if (!player || !player.alive) continue;

            let profile = player.profile;

            let x = (player.x / (self.modeInfo.mode.map_size * 5)) * (canvas.width / 2);
            let y = -(player.y / (self.modeInfo.mode.map_size * 5)) * (canvas.height / 2);

            let rgb = hsv2rgb(profile.hue, S, V);

            ctx.fillStyle = `rgb(${rgb[0]*255}, ${rgb[1]*255}, ${rgb[2]*255})`;
            ctx.strokeStyle = `rgb(${rgb[0]*255}, ${rgb[1]*255}, ${rgb[2]*255})`;
            ctx.lineWidth = maxRadius * 1.5;
            let c = [
                canvas.width / 2 + x - maxRadius * 1.5,
                canvas.width / 2 + y - maxRadius * 1.5,
                canvas.width / 2 + x + maxRadius * 1.5,
                canvas.width / 2 + y + maxRadius * 1.5
            ]

            if (preferencesManager.preferences.centerMapOnAsteroids) {
                for (let x in c) {
                    c[x] = c[x] + canvas.width / 2;
                }
                if (c[0] >= canvas.width && c[2] >= canvas.width) {
                    c[0] = c[0] % canvas.width;
                    c[2] = c[2] % canvas.width;
                }
                if (c[1] >= canvas.width && c[3] >= canvas.width) {
                    c[1] = c[1] % canvas.width;
                    c[3] = c[3] % canvas.width;
                }
            }

            ctx.beginPath();
            ctx.moveTo(c[0], c[1]);
            ctx.lineTo(c[2], c[3]);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(c[0], c[3]);
            ctx.lineTo(c[2], c[1]);
            ctx.stroke();
            // ctx.arc(canvas.width / 2 + x, canvas.height / 2 + y, maxRadius, 0, 2*Math.PI);
            ctx.fill();
        }
    }

    static resizeCanvas() {
        // Resize canvas element itself
        let canvas = document.getElementById("spectatorCanvas");

        canvas.style.width = (canvas.parentElement.clientWidth) + "px";
        canvas.style.height = (canvas.parentElement.clientWidth) + "px";
        canvas.setAttribute("width", String(canvas.parentElement.clientWidth*window.devicePixelRatio));
        canvas.setAttribute("height", String(canvas.parentElement.clientWidth*window.devicePixelRatio));
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