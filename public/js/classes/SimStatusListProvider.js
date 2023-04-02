class SimStatusListProvider {
    constructor(options = {}) {
        const self = this;

        self.simStatus = [];
        self.pollingRate = options.pollingRate || 10000;

        self.lastTick = Date.now();

        self.refreshEventListeners = new Set();

        self._tick().then();
    }

    getSystems(filters = {modes:[]}) {
        const self = this;

        let systems = [];

        for (let server of self.simStatus) {
            if (server.location === filters.region) {
                for (let system of server.systems) {
                    if (filters.modes.includes(system.mode)) {
                        system.address = server.address;
                        system.region = server.location;
                        systems.push(system);
                    }
                }
            }
        }

        return systems;
    }

    getPopulation() {
        const self = this;

        let counts = {
            "America": 0,
            "Asia": 0,
            "Brazil": 0, // In case Brazil servers ever get added back
            "Europe": 0,
            "World": 0
        }

        for (let server of self.simStatus) {
            counts[server.location] += server.current_players;
            counts["World"] += server.current_players;
        }

        return counts;
    }

    async _tick() {
        const self = this;

        let data = await fetch(`https://starblast.io/simstatus.json?cachebypass=${Math.random()}`);
        self.simStatus = await data.json();

        for (let handler of self.refreshEventListeners) {
            handler();
        }

        let now = Date.now();

        setTimeout(() => {
            self._tick().then();
        }, self.pollingRate - (now - self.lastTick));

        self.lastTick = now;
    }

    on(eventName, handler) {
        const self = this;

        if (eventName === "refresh") {
            self.refreshEventListeners.add(handler);
        }
    }
}