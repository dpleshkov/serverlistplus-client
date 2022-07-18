class LiteAPIProvider {
    constructor() {
        const self = this;

        self.simStatus = [];
        self.lastUpdated = Date.now();

        self.pollingRate = 2500;

        self.filters = {
            "modes": ["team", "survival", "deathmatch", "modding"],
            "region": "America"
        }

        self.systems = new Set();

        self.listeners = {
            "+system": [],
            "-system": [],
            "tick": []
        }

    }

    setFilters(filters) {
        const self = this;

        self.filters = filters;
        self.systems = new Set();
        self.runFilters();
    }

    start() {
        const self = this;

        self.simStatusLoop().then();
    }

    addEventListener(event, handler) {
        const self = this;

        self.listeners[event] = self.listeners[event] || [];
        self.listeners[event].push(handler);
    }

    runFilters() {
        const self = this;

        let systems = LiteAPIProvider._filter(self.simStatus, self.filters);
        let deltas = LiteAPIProvider._deltas(self.systems, systems);

        for (let minus of deltas.minus) {
            for (let listener of self.listeners["-system"]) {
                listener(minus);
            }
        }

        for (let plus of deltas.plus) {
            for (let listener of self.listeners["+system"]) {
                listener(plus);
            }
        }

        self.systems = systems;
    }

    async updateSimStatus() {
        const self = this;

        let data = await fetch("https://starblast.io/simstatus.json");
        self.simStatus = await data.json();

        self.runFilters();

    }

    async simStatusLoop() {
        const self = this;

        await self.updateSimStatus();
        let now = Date.now();

        setTimeout(() => {
            self.lastUpdated = now;
            self.simStatusLoop();
        }, self.pollingRate - (now - self.lastUpdated));
    }

    static _deltas(a, b) {
        let minus = new Set([...a].filter(x => !b.has(x)));
        let plus = new Set([...b].filter(x => !a.has(x)));
        return {
            minus: minus,
            plus: plus
        }
    }

    static _filter(simStatus, filters) {
        console.log(simStatus);
        let systems = new Set();
        for (let location of simStatus) {
            if (location.location === filters.region) {
                location.systems = location.systems || [];
                for (let system of location.systems) {
                    if (filters.modes.includes(system.mode)) systems.add(system);
                }
            }
        }
        return systems;
    }
}