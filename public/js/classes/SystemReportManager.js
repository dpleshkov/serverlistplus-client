class SystemReportManager {
    constructor(preferencesManager) {
        const self = this;

        self.preferencesManager = preferencesManager;
    }

    showInfo(systemFetcher) {
        const self = this;

        let system = systemFetcher();


        document.getElementById("SR_Name").innerText = system.name;
        document.getElementById("SR_Mode").innerText = system.mode === "modding" ? `${Translation.modes[system.mode]} - ${Translation.mods[system.mod_id]}` : Translation.modes[system.mode];
        document.getElementById("SR_Region").innerText = system.region;
        document.getElementById("SR_Time").innerText = `${Math.floor(system.time / 60)} min`;
        document.getElementById("SR_ID").innerText = `#${system.id}`;
        document.getElementById("SR_Criminality").innerText = system.criminal_activity;
        document.getElementById("SR_PlayerCount").innerText = system.players;

        let systemURL = self.preferencesManager.preferences.copyFullLinks ? `https://starblast.io/#${system.id}@${system.address}` : `https://starblast.io/#${system.id}`;

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

        if (window.siteConfig.mode === "live" && (system.mode === "team" || (system.mode === "modding" && ["useries", "nauticseries", "alienintrusion"].includes(system.mod_id)))) {
            document.getElementById("systemSpectateButton").style.display = "";
            document.getElementById("systemReportLink").classList.remove("rounded-end");

            document.getElementById("systemSpectateButton").onclick = () => {
                if (window.activeSpectator !== undefined) window.activeSpectator.destroy();
                window.activeSpectator = new Spectator(system.id);
                Spectator.show();
            }

            // show supported static api div
            document.getElementById("SR_StaticAPIRequired").style.display = "";
            // Reset values
            document.getElementById("SR_ECPCount").innerText = "";
            document.getElementById("SR_TotalTeamScores").innerText = "";
            document.getElementById("SR_PlayerList").innerText = "";

            // async fetch game info from static api
            fetch(`${window.siteConfig["static-api-provider"]}status/${system.id}`).then(async(response) => {
                let info = await response.json();
                if (info && info.players) {
                    let playerList = [];
                    let teamECPCount = [];
                    let teamScoreCount = [];
                    for (let team of info.mode.teams) {
                        teamECPCount.push(`${team.ecpCount} ${team.color}`);
                        teamScoreCount.push(`${Math.floor(team.totalScore/1000)}k ${team.color}`);
                    }
                    for (let player of Object.values(info.players)) {
                        playerList.push(player.player_name);
                    }
                    document.getElementById("SR_PlayerList").innerText = playerList.join(", ").replaceAll("\u202E", "");
                    document.getElementById("SR_ECPCount").innerText = teamECPCount.join(", ");
                    document.getElementById("SR_TotalTeamScores").innerText = teamScoreCount.join(", ");
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
