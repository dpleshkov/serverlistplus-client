/* Settings Modal Binding */

let settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'), {
    keyboard: false
});

document.getElementById("navbarSettingsButton").addEventListener("click", () => {
    settingsModal.show();
});

/* Preferences */

let preferencesManager = new PreferencesManager();


