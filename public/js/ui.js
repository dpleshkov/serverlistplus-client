/* Settings Modal Binding */

let settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
    keyboard: false
});

let aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'), {
    keyboard: false
});

let shareGameModal = new bootstrap.Modal(document.getElementById("shareGameModal"), {
    keyboard: true,
    backdrop: true
});

document.getElementById("navbarSettingsButton").addEventListener("click", () => {
    settingsModal.show();
});

document.getElementById("navbarAboutButton").addEventListener("click", () => {
    document.getElementById("timeSinceLastUpdate").innerText = `${Math.floor((Date.now() - (window.siteConfig.revisionTime * 1000)) / 86400000)} days`;
    aboutModal.show();
});

document.getElementById("shareCustomGameCard").addEventListener("click", () => {
    shareGameModal.show();
    document.getElementById("customGameLinkInput").value = "";
    document.getElementById("customGameLinkInput").focus();
});

/* Responsive Scroll Height Setting */
let _scrollify = function() {
    let navbarHeight = document.getElementById("navbar").offsetHeight;
    let remainingSpace = window.innerHeight - navbarHeight;
    document.getElementById("systemsListContainer").style.maxHeight = `${remainingSpace}px`;
    document.getElementById("systemReport").style.maxHeight = `${remainingSpace}px`;
    document.getElementById("viewOptions").style.maxHeight = `${remainingSpace}px`;
}

_scrollify();
window.addEventListener("resize", _scrollify);

/* Hide System Report */
document.getElementById("systemReport").style.display = "none";

/* New Server Alert */
document.getElementById("newServerAlert").addEventListener("change", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then();
    }
});

// fix to chrome scroll bug where on some themes scrollbar still shows, likely due to themes changing size of webpage by a minimal amount
setTimeout(_scrollify, 20);
