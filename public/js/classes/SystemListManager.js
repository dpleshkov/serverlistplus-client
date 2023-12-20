class SystemListManager {
    constructor(preferencesManager, systemListProvider, systemReportManager) {
        const self = this;

        self.preferencesManager = preferencesManager;
        self.systemListProvider = systemListProvider;
        self.systemReportManager = systemReportManager;

        self.systemCards = {};
        self.systemsById = {};
        self.systemListElement = document.getElementById("systemsList");
    }

    getCardHTML(system) {
        let modeText;
        let modeIcon;
        if (system.unlisted) {
            modeIcon = Translation.modeIcons["custom"];
            if (system.mode === "modding") {
                modeText = "Custom Game"
            } else {
                modeText = `Custom Game - ${Translation.modes[system.mode]}`;
            }
        } else {
            modeIcon = Translation.modeIcons[system.mode];
            modeText = system.mode === "modding" ? `${Translation.modes[system.mode]} - ${Translation.mods[system.mod_id]}` : Translation.modes[system.mode];
        }

        return `
            <div class="card-body">
                <h3 class="mb-0">${system.name} <span class="float-end">${Math.floor(system.time/60)} min</span></h3>
                <span>${modeIcon} ${modeText} <span class="float-end">${system.players} players</span></span>
            </div>
        `;
    }

    _tick() {
        const self = this;

        let systems = self.systemListProvider.getSystems(self.preferencesManager.preferences);

        let currentIds = new Set();

        for (let system of systems) {
            currentIds.add(system.id.toString());
            self.systemsById[system.id.toString()] = system;

            if (self.systemCards.hasOwnProperty(system.id.toString())) {
                // If system is already on the list, update its info

                if (self.systemCards[system.id.toString()]) self.systemCards[system.id.toString()].innerHTML = self.getCardHTML(system);
            } else if (!self.systemCards.hasOwnProperty(system.id.toString())) {
                // If system isn't on the list, create a new card for it

                let card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("system-list-item");
                card.classList.add("mb-3");

                card.innerHTML = self.getCardHTML(system);
                card.dataset.system = system.id;

                card.onmousedown = () => {
                    // Q: Why not pass along the system object itself?
                    // A: On every new simstatus fetch it'll become outdated,
                    // passing along the getter function will ensure the system object
                    // will remain up-to-date. This is a design oversight -
                    // feel free to PR a neater solution to this

                    self.systemReportManager.showInfo(() => {
                        return self.systemsById[system.id.toString()];
                    });
                }

                card.onmouseover = () => {
                    // Pre-render and pre-fetch player list to make it "appear" quicker

                    self.systemReportManager.prefetch(() => {
                        return self.systemsById[system.id.toString()];
                    });
                }

                self.systemListElement.prepend(card);

                self.systemCards[system.id.toString()] = card;

                /* Notify of new system if user has it enabled */
                if (document.getElementById("newServerAlert").checked) {
                    (async() => {
                        let permission = Notification.permission;
                        if (["denied", "default"].includes(permission)) {
                            return;
                        }
                        let notification = new Notification('New Server Alert!');
                        document.addEventListener('visibilitychange', function() {
                            if (document.visibilityState === 'visible') {
                                notification.close();
                            }
                        });
                    })().then();
                    let permission = Notification.permission;
                    if (permission === "denied" || permission === "default") {
                        Notification.requestPermission().then();
                    }
                }
            }
        }

        for (let card of self.systemListElement.children) {
            if (!currentIds.has(card.dataset.system)) {
                card.remove();
                delete self.systemCards[card.dataset.system];
            }
        }

        // For some reason, self.systemListElement.children sometimes doesn't include all the cards
        for (let [id, card] of Object.entries(self.systemCards)) {
            if (!currentIds.has(id)) {
                card.remove();
                delete self.systemCards[card.dataset.system];
            }
        }

        self._sort();

    }

    _sort() {
        const self = this;

        [...self.systemListElement.children].sort((a, b) => {
            return self.systemsById[a.dataset.system].time > self.systemsById[b.dataset.system].time ? 1 : -1;
        }).forEach(node=>self.systemListElement.appendChild(node));
    }
}