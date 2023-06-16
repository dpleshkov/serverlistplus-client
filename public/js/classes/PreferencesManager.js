class PreferencesManager {
    constructor() {
        const self = this;

        self.preferences = self.loadPreferences();
        self.renderPreferences(self.preferences);

        self.onchange = function() {};
        self.changeEventListeners = new Set();

        /* Mode Select Bindings */
        for (let mode of ["team", "survival", "deathmatch", "modding", "custom", "invasion"]) {
            document.getElementById(`${mode}Mode`).addEventListener("change", () => {
                if (document.getElementById(`${mode}Mode`).checked) {
                    if (!self.preferences.modes.includes(mode)) self.preferences.modes.push(mode);
                } else {
                    if (self.preferences.modes.includes(mode)) self.preferences.modes.splice(self.preferences.modes.indexOf(mode), 1);
                }
                self.savePreferences(self.preferences);
            });
        }

        /* Region Select Bindings */
        for (let region of ["America", "Europe", "Asia"]) {
            document.getElementById(region).addEventListener("change", () => {
                self.preferences.region = document.querySelector(`input[name="region"]:checked`).id;
                self.savePreferences(self.preferences);
            });
        }

        /* Copy Full Link Binding */
        document.getElementById("preferenceCopyFullLink").addEventListener("change", () => {
            self.preferences.copyFullLinks = document.getElementById("preferenceCopyFullLink").checked;
            self.savePreferences(self.preferences);
        });

        /* Center Asteroid Map Binding */
        document.getElementById("preferenceCenterMapAsteroids").addEventListener("change", () => {
            self.preferences.centerMapOnAsteroids = document.getElementById("preferenceCenterMapAsteroids").checked;
            self.savePreferences(self.preferences);
        });

        /* Theme Select Binding */
        document.getElementById("preferenceTheme").addEventListener("change", () => {
            self.preferences.theme = document.getElementById("preferenceTheme").value;
            document.getElementById("themeStylesheet").setAttribute("href", self.preferences.theme);
            self.savePreferences(self.preferences);
        });
    }

    on(eventName, handler) {
        const self = this;

        if (eventName === "change") {
            self.changeEventListeners.add(handler);
        }
    }

    loadPreferences() {
        let storedPreferences = JSON.parse(window.localStorage.getItem("preferences"));
        if (!storedPreferences) {
            let theme = "/css/themes/default_dark.css";
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = "/css/themes/default_dark.css";
            }
            let preferences = {
                region: "America",
                modes: ["team", "survival", "deathmatch", "modding", "custom"],
                theme: theme,
                copyFullLinks: false,
                centerMapOnAsteroids: false
            }
            window.localStorage.setItem("preferences", JSON.stringify(preferences));
            return preferences;
        }
        return storedPreferences;
    }

    savePreferences(preferences) {
        const self = this;

        self.onchange(preferences);

        for (let handler of self.changeEventListeners) {
            handler(preferences);
        }

        window.localStorage.setItem("preferences", JSON.stringify(preferences));

        if (preferences.modes.includes("custom")) {
            document.getElementById("shareCustomGameCard").style.display = "";
        } else {
            document.getElementById("shareCustomGameCard").style.display = "none";
        }
    }

    renderPreferences(preferences) {
        /* Mode */
        let modeInputs = {
            "team": document.getElementById("teamMode"),
            "survival": document.getElementById("survivalMode"),
            "modding": document.getElementById("moddingMode"),
            "deathmatch": document.getElementById("deathmatchMode"),
            "invasion": document.getElementById("invasionMode"),
            "custom": document.getElementById("customMode")
        }

        for (let mode of ["team", "survival", "modding", "deathmatch", "invasion", "custom"]) {
            modeInputs[mode].checked = preferences.modes.includes(mode);
        }

        if (preferences.modes.includes("custom")) {
            document.getElementById("shareCustomGameCard").style.display = "";
        } else {
            document.getElementById("shareCustomGameCard").style.display = "none";
        }

        /* Region */
        document.getElementById(preferences.region).checked = true;

        /* Copy Full Links */
        document.getElementById("preferenceCopyFullLink").checked = preferences.copyFullLinks;

        /* Center Map On Asteroids */
        document.getElementById("preferenceCenterMapAsteroids").checked = preferences.centerMapOnAsteroids;

        /* Theme */
        document.getElementById("preferenceTheme").value = preferences.theme;
        document.getElementById("themeStylesheet").setAttribute("href", preferences.theme);

    }
}