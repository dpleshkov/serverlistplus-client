class SystemReportManager {
    constructor(preferencesManager) {
        const self = this;

        self.preferencesManager = preferencesManager;

        self.prefetchedInfo = {};
    }

    prefetch(systemFetcher) {
        const self = this;

        let system = systemFetcher();

        let maybePrefetchedInfo = self.prefetchedInfo[`${system.id}@${system.address}`];
        if (!maybePrefetchedInfo || (!maybePrefetchedInfo.inProgress && Date.now()-maybePrefetchedInfo.timestamp > 10000)) {
            self.prefetchedInfo[`${system.id}@${system.address}`] = {
                inProgress: true,
                timestamp: 0,
                data: new Promise(async(resolve) => {
                    fetch(`${window.siteConfig["static-api-provider"]}status/${system.id}@${system.address}`).then(async(response) => {
                        let info = await response.json();
                        self.prefetchedInfo[`${system.id}@${system.address}`].inProgress = false;
                        self.prefetchedInfo[`${system.id}@${system.address}`].timestamp = Date.now();
                        resolve(info);
                    })
                })
            }
        }
    }

    showInfo(systemFetcher) {
        const self = this;

        let system = systemFetcher();


        document.getElementById("SR_Name").innerText = system.name;
        document.getElementById("SR_Mode").innerText = getModeString(system);
        document.getElementById("SR_Region").innerText = system.region;
        document.getElementById("SR_Time").innerText = `${Math.floor(system.time / 60)} min`;
        document.getElementById("SR_ID").innerText = `#${system.id}`;
        document.getElementById("SR_Criminality").innerText = system.criminal_activity;
        document.getElementById("SR_PlayerCount").innerText = system.players;

        let systemURL = self.preferencesManager.preferences.copyFullLinks ? `https://starblast.io/#${system.id}@${system.address}` : `https://starblast.io/#${system.id}`;
        if (system.unlisted) systemURL = `https://starblast.io/#${system.id}@${system.address}`;

        document.getElementById("systemCopyLink").onclick = () => {
            self._copyText(systemURL);
            document.getElementById("clipboard").className = "bi bi-clipboard-check";
            setTimeout(() => {
                document.getElementById("clipboard").className = "bi bi-clipboard";
            }, 500)
        }

        document.getElementById("systemReportLink").setAttribute("href", systemURL);

        document.getElementById("systemReport").style.display = "";

        system.mod_id = system.mod_id ?? "";

        // Check if system mode supports live view

        document.getElementById("systemSpectateButton").style.display = "none";
        if (window.siteConfig.mode === "live" && (system.mode !== "invasion")) {
            if (window.activeSpectator !== undefined) window.activeSpectator.destroy();
            window.activeSpectator = new Spectator(`${system.id}@${system.address}`);

            document.getElementById("systemReportLink").classList.remove("rounded-end");

            document.getElementById("systemSpectateButton").onclick = () => {
                if (!window.activeSpectator || window.activeSpectator.destroyed) window.activeSpectator = new Spectator(`${system.id}@${system.address}`);
                Spectator.show();
            }

            // show supported static api div
            document.getElementById("SR_StaticAPIRequired").style.display = "";
            document.getElementById("SR_TeamModeRequired").style.display = "none";
            // Reset values
            document.getElementById("SR_ECPCount").innerText = "";
            document.getElementById("SR_TotalTeamScores").innerText = "";
            document.getElementById("SR_PlayerList").innerText = "";

            // async fetch game info from static api
            if (!self.prefetchedInfo[`${system.id}@${system.address}`]) self.prefetch(systemFetcher);

            self.prefetchedInfo[`${system.id}@${system.address}`].data.then((info) => {
                //let info = await response.json();
                if (info && info.players) {

                    let playerList = [];
                    let ecpCount = 0;
                    for (let player of Object.values(info.players)) {
                        playerList.push(player.player_name);
                        if (player.custom) ecpCount++;
                    }

                    if (info.api && info.api.type === "rich" && (info.mode.id === "team" || (info.mode.id === "modding" && info.mode.root_mode === "team"))) {
                        let teamScoreCount = [];
                        let teamECPCount = [];
                        for (let team of info.mode.teams) {
                            teamECPCount.push(`${team.ecpCount} ${team.color}`);
                            teamScoreCount.push(`${Math.floor(team.totalScore/1000)}k ${team.color}`);
                        }

                        document.getElementById("SR_TeamModeRequired").style.display = "";
                        document.getElementById("SR_TotalTeamScores").innerText = teamScoreCount.join(", ");
                        document.getElementById("SR_ECPCount").innerText = teamECPCount.join(", ");

                        document.getElementById("systemSpectateButton").style.display = "";
                    } else {
                        document.getElementById("SR_ECPCount").innerText = String(ecpCount);
                    }
                    document.getElementById("SR_PlayerList").innerText = playerList.join(", ").replaceAll("\u202E", "");
                }
            })
        } else {
            document.getElementById("SR_StaticAPIRequired").style.display = "none";
            document.getElementById("systemSpectateButton").style.display = "none";
            document.getElementById("systemReportLink").classList.add("rounded-end");
        }
    }

    _copyText(text) {
        if (!navigator.clipboard) {
            let textArea = document.createElement("textarea");
            textArea.value = text;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            document.execCommand('copy');

            document.body.removeChild(textArea);
            return;
        }
        navigator.clipboard.writeText(text).then();
    }
}

