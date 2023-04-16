
let preferencesManager = new PreferencesManager();

let systemListProvider = new SimStatusListProvider();

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
    // bad fix
    setTimeout(() => {
        requestAnimationFrame(refreshList);
    }, 250);
});
