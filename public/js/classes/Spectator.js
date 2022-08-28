// Works only with site mode set to Live

class Spectator {
    constructor(systemId) {
        const self = this;

        Spectator.resizeCanvas();

        if (window.activeSpectator && window.activeSpectator !== self) {
            window.activeSpectator.destroy();
            window.activeSpectator = self;
        }

        self.destroyed = false;
        self.socket = new WebSocket(window._LIVEAPIURL);

        self.socket.addEventListener("open", () => {
            self.socket.send(JSON.stringify({
                name: "subscribe",
                data: {
                    id: systemId
                }
            }));
        });

        self.socket.addEventListener("message", (evt) => {
            let message = evt.data;
            if (typeof message === "string" && message.startsWith("{")) {
                let json = JSON.parse(message);
                if (json.name === "mode_info") {
                    alert(message);
                }
            }
        });

        self.socket.addEventListener("close", () => {
            self.destroyed = true;
        });

    }

    static resizeCanvas() {
        let canvas = document.getElementById("spectatorCanvas");
        canvas.style.width = "100%";
        canvas.style.height = `${canvas.offsetWidth}px`;
    }

    destroy() {
        const self = this;

        self.socket.close();
        self.destroyed = true;
    }
}

window.addEventListener("resize", () => {
    Spectator.resizeCanvas();
});