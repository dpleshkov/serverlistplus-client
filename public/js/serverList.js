
let preferencesManager = new PreferencesManager();

let systemListProvider = new SimStatusListProvider({
    endpoint: `${window.siteConfig["static-api-provider"]}simstatus.json`
});

let systemReportManager = new SystemReportManager(preferencesManager);

let systemListManager = new SystemListManager(preferencesManager, systemListProvider, systemReportManager);

let refreshList = function() {
    systemListManager._tick();
    let population = systemListProvider.getPopulation();
    document.getElementById("countAmerica").innerText = population.America;
    document.getElementById("countEurope").innerText = population.Europe;
    document.getElementById("countAsia").innerText = population.Asia;
    document.getElementById("countTotal").innerText = population.World;
}

systemListProvider.on("refresh", () => {
    requestAnimationFrame(refreshList);
});

preferencesManager.on("change", () => {
    requestAnimationFrame(refreshList);
});

/* Logic for Custom Game Sharing */

document.getElementById("shareCustomGame").addEventListener("click", async() => {
    let url = document.getElementById("customGameLinkInput").value;
    let response = await fetch(
        `${window.siteConfig["static-api-provider"]}post`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: url
            })
        }
    );
    let json = await response.json();
    console.log(json);
    if (json.status === "success") {
        shareGameModal.hide();
        await systemListProvider._tick();
        systemListManager._tick();
    } else if (json.error) {
        alert("Error in sharing game link.");
        shareGameModal.hide();
    }
});