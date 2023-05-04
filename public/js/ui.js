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
    aboutModal.show();
});

document.getElementById("shareCustomGameCard").addEventListener("click", () => {
    shareGameModal.show();
    document.getElementById("customGameLinkInput").value = "";
    document.getElementById("customGameLinkInput").focus();
})

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

