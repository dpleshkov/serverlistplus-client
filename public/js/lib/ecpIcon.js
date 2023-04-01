// Ripped by Bhpsngum from sb game code

window.initECPSetup = function(initializer){
    let Badge = function() {
        function t(size, query_info, finish, laser, rid, callback) {
            this.callback = callback, this.rid = rid, this.size = null != size ? size : 128, this.info = query_info || {}, this.laser = laser || "simple", this.finish = finish || "gold", this.hue = 0, this.IOl1I()
        }
        return t.prototype.toImage = function() {
            return this.image = new Image, this.image.src = this.canvas.toDataURL(), this.image
        }, t.prototype.updateImage = function() {
            if (null != this.image) return this.image.src = this.canvas.toDataURL()
        }, t.prototype.IOl1I = function() {
            var t, e, i, s, n;
            if (null == this.canvas && (this.canvas = document.createElement("canvas")), n = this.canvas.width = 2 * this.size, s = this.canvas.height = this.size, e = this.canvas.getContext("2d"), e.clearRect(0, 0, this.canvas.width, this.canvas.height), "blank" !== this.info.id) return e.fillStyle = "#000", e.beginPath(), e.arc(n / 2, s / 2, s / 2, 0, 2 * Math.PI, !0), e.fill(), e.beginPath(), e.moveTo(.05 * n, .25 * s), e.lineTo(.05 * n, .75 * s), e.lineTo(n / 2, .9 * s), e.lineTo(.95 * n, .75 * s), e.lineTo(.95 * n, .25 * s), e.lineTo(n / 2, .1 * s), e.closePath(), e.fill(), e.lineWidth = .07 * s, e.globalCompositeOperation = "destination-out", e.strokeStyle = "#000", e.beginPath(), e.arc(n / 2, s / 2, .6 * s, 0, 2 * Math.PI, !0), e.stroke(), this.drawMaterial(e, n, s), this.drawIcon(e, n, s), this.drawLaser(e, n, s), e.globalCompositeOperation = "source-atop", e.save(), e.translate(n / 2, s / 2), e.scale(n / 2, s / 2), i = e.createRadialGradient(0, 0, 0, 0, 0, 1), i.addColorStop(0, "rgba(255,255,255,.2)"), i.addColorStop(1, "rgba(0,0,0,.2)"), e.fillStyle = i, e.fillRect(-1, -1, 2, 2), e.restore(), e.globalCompositeOperation = "source-over", i = e.createRadialGradient(n / 2 - .25 * s, s / 2 - .25 * s, 0, n / 2, s / 2, .45 * s), i.addColorStop(0, "rgba(0,0,0,0)"), i.addColorStop(.5, "rgba(0,0,0,0)"), i.addColorStop(1, "rgba(0,0,0,.5)"), e.fillStyle = i, e.beginPath(), e.arc(n / 2, s / 2, .45 * s, 0, 2 * Math.PI, !0), e.fill(), e.globalCompositeOperation = "destination-over", e.translate(n / 2, s / 2), e.scale(n / 2, s / 2), i = e.createRadialGradient(0, 0, 0, 0, 0, 1), i.addColorStop(.7, "rgba(0,0,0,1)"), i.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = i, e.fillRect(-1, -1, 2, 2), this.resize ? (t = document.createElement("canvas"), t.width = this.size, t.height = this.size / 2, t.getContext("2d").drawImage(this.canvas, 0, 0, this.size, this.size / 2), this.canvas = t) : void 0, this.callbackCalled === false && this.callback(this.canvas, this.info, this.rid);
            else this.callback(this.canvas, this.info, this.rid)
        }, t.prototype.drawMaterial = function(t, e, i) {
            var s, l, n, a, o, r, h, O, u, d, c;
            switch (this.finish) {
                case "x27":
                    l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(0, "hsla(220,100%,30%)"), l.addColorStop(.5, "hsla(200,100%,70%)"), l.addColorStop(.5, "hsla(220,100%,40%)"), l.addColorStop(1, "hsla(200,100%,70%)");
                    break;
                case "alloy":
                    l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(0, "#68A"), l.addColorStop(.5, "#FFF"), l.addColorStop(.5, "#765"), l.addColorStop(1, "#CCC");
                    break;
                case "fullcolor":
                    l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(0, "hsl(" + this.hue + ",90%,50%)"), l.addColorStop(.5, "hsl(" + this.hue + ",90%,70%)"), l.addColorStop(.5, "hsl(" + this.hue + ",90%,30%)"), l.addColorStop(1, "hsl(" + this.hue + ",90%,60%)");
                    break;
                case "titanium":
                    l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(0, "#444"), l.addColorStop(.5, "#AAA"), l.addColorStop(.5, "#444"), l.addColorStop(1, "#111");
                    break;
                case "gold":
                    l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(0, "hsl(40,100%,50%)"), l.addColorStop(.5, "hsl(40,100%,80%)"), l.addColorStop(.5, "hsl(20,100%,30%)"), l.addColorStop(1, "hsl(40,100%,50%)");
                    break;
                case "carbon":
                    for (l = t.createLinearGradient(0, 0, 0, i), O = Math.min(10, this.size / 10), a = o = 0, u = O - 1; o <= u; a = o += 1) l.addColorStop(a / O, "#000"), l.addColorStop((a + 1) / O, "#888");
                    for (n = t.createLinearGradient(0, 0, 0, i), n.addColorStop(0, "#333"), n.addColorStop(.1, "#888"), a = r = 0, d = O - 1; r <= d; a = r += 1) n.addColorStop((a + .5) / O, "#000"), n.addColorStop(Math.min(1, (a + 1.5) / O), "#888");
                    break;
                default:
                    l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(0, "#EEE"), l.addColorStop(1, "#666")
            }
            if (t.globalCompositeOperation = "source-atop", t.fillStyle = l, "carbon" === this.finish) {
                for (a = h = 0, c = 4 * O - 1; h <= c; a = h += 1) t.fillStyle = a % 2 == 0 ? l : n, t.fillRect(a * e / (4 * O), 0, e / (4 * O), i);
                l = t.createLinearGradient(0, 0, 0, i), l.addColorStop(.3, "rgba(0,0,0,.5)"), l.addColorStop(.5, "rgba(0,0,0,0)"), l.addColorStop(.7, "rgba(0,0,0,.5)"), t.fillStyle = l, t.fillRect(0, 0, e, i)
            } else t.fillStyle = l, t.fillRect(0, 0, e, i);
            return t.globalCompositeOperation = "source-over"
        }, t.prototype.drawLaser = function(t, e, i) {
            var s, n, l, a, o, r, h, u, d, c, p, I;
            for (t.save(), t.translate(.12 * e, i / 2), I = l0OlO.getShape(parseInt(this.laser)), n = 0, a = I.length; n < a; n++) {
                for (p = I[n], t.beginPath(), s = t.createRadialGradient(0, 0, 0, 0, 0, i / 6), s.addColorStop(0, "hsl(50,100%,100%)"), s.addColorStop(1, "hsl(50,80%,40%)"), t.fillStyle = s, t.strokeStyle = "rgba(0,0,0,.8)", t.lineWidth = i / 24, l = 0, o = p.length; l < o; l++) c = p[l], t.lineTo(c[1] * i / 10, c[0] * i / 9);
                t.closePath(), t.stroke(), t.fill()
            }
            for (t.restore(), t.save(), t.translate(.88 * e, i / 2), I = l0OlO.getShape(parseInt(this.laser)), u = 0, r = I.length; u < r; u++) {
                for (p = I[u], t.beginPath(), s = t.createRadialGradient(0, 0, 0, 0, 0, i / 6), s.addColorStop(0, "hsl(50,100%,100%)"), s.addColorStop(1, "hsl(50,80%,40%)"), t.fillStyle = s, t.strokeStyle = "rgba(0,0,0,.8)", t.lineWidth = i / 24, d = 0, h = p.length; d < h; d++) c = p[d], t.lineTo(c[1] * i / 10, c[0] * i / 9);
                t.closePath(), t.stroke(), t.fill()
            }
            return t.restore()
        }, t.prototype.drawIcon = function(t, e, i) {
            var s, n, l, a, o, r, h, u, d, c, p;
            if (d = Math.round(i / 2.2), this.info.url) {
                if (null == this.icon_src && (this.icon_src = new Image, this.icon_src.crossOrigin = "Anonymous", this.icon_src.src = this.info.url, this.icon_src.onload = function(t) {
                    return function() {
                        return t.IOl1I(), t.updateImage(), t.callbackCalled = true, t.callback(t.canvas, t.info, t.rid)
                    }
                }(this)), this.icon_src.complete) try {
                    s = document.createElement("canvas"), s.width = i, s.height = i, n = s.getContext("2d"), n.fillStyle = "#FFF", n.beginPath(), n.arc(i / 2, i / 2, .45 * i, 0, 2 * Math.PI, !0), n.fill(), n.globalCompositeOperation = "source-in", n.drawImage(this.icon_src, .05 * i, .05 * i, .9 * i, .9 * i), t.drawImage(s, e / 2 - .5 * i, i / 2 - .5 * i, i, i);
                } catch (t) {
                    t
                }
            } else {
                let deco = this.info.decoration || {};
                t.font = d + "pt SBGlyphs", t.textBaseline = "middle", t.textAlign = "center", t.fillStyle = deco.fill;
                t.beginPath(), t.arc(e / 2, i / 2, .45 * i, 0, 2 * Math.PI, !0), t.fill();
                t.fillStyle = deco.stroke;
                if (deco.custom) {
                    for (u = deco.custom, l = .7 * i / 11, a = r = 0; r <= 10; a = r += 1)
                        for (o = h = 0; h <= 7; o = h += 1) c = e / 2 + l * (a - 5), p = i / 2 + l * (o - 4), 1 === u[o][a] && t.fillRect(c - .4 * l, p - .4 * l, .8 * l, .8 * l);
                }
                else {
                    t.fillText(eval('"\\u{'+deco.unicode.toString(16)+'}"'), e / 2, i / 2)
                }
                this.callbackCalled = false
            }
        }, t.prototype.drawStar = function(t, e, i, s, n) {
            var l, a, o, r;
            for (t.beginPath(), l = -Math.PI / 2, o = 0; o <= 4; o += 1) a = Math.cos(l), r = Math.sin(l), t.lineTo(e + a * n, i + r * n), l += Math.PI / 5, a = Math.cos(l), r = Math.sin(l), t.lineTo(e + a * s, i + r * s), l += Math.PI / 5;
            return t.closePath(), t.fill()
        }, t.prototype.drawWing = function(t, e, i, s, n, l) {
            var a, o, r, h, u, d, c, p, I;
            for (null == l && (l = "#FFF"), t.save(), t.translate(e / 2, i / 2), t.strokeStyle = "#000", t.fillStyle = l, t.lineWidth = .03 * i, t.lineCap = "round", t.beginPath(), a = o = 0, d = s.length - 1; o <= d; a = o += 1) t.lineTo(s[a], n[a]);
            for (t.closePath(), t.fill(), a = r = 0, c = s.length - 1; r <= c; a = r += 1) t.beginPath(), t.moveTo(s[a], n[a]), t.lineTo(s[(a + 1) % s.length], n[(a + 1) % s.length]), t.stroke();
            for (t.beginPath(), a = h = 0, p = s.length - 1; h <= p; a = h += 1) t.lineTo(-s[a], n[a]);
            for (t.closePath(), t.fill(), a = u = 0, I = s.length - 1; u <= I; a = u += 1) t.beginPath(), t.moveTo(-s[a], n[a]), t.lineTo(-s[(a + 1) % s.length], n[(a + 1) % s.length]), t.stroke();
            return t.restore()
        }, t.table = [], t.lO0O0 = function(e, i, s, n, l) {
            var a, o;
            return null == l && (l = 0), o = e + i + s + n + l, t.table[o] || (a = new t(n, {
                badge: e,
                laser: i,
                finish: s,
                hue: l
            }).toImage(), t.table[o] = a), t.table[o]
        }, t.getRandomImage = function(e) {
            var i, s, n;
            return i = ["star", "paw", "pirate", "reddit", "invader", "youtube"][Math.floor(6 * Math.random())], s = ["zinc", "gold", "alloy", "carbon", "titanium"][Math.floor(5 * Math.random())], n = ["0", "1", "2", "3"][Math.floor(4 * Math.random())], t.lO0O0(i, n, s, e)
        }, t.test = function() {
            var e, i, s, n, l, a, o, r, h, u, d, c;
            for (u = ["zinc", "gold", "alloy", "carbon", "titanium"], s = 0, a = u.length; s < a; s++)
                for (e = u[s], d = ["star", "paw", "pirate", "reddit", "invader", "youtube"], n = 0, o = d.length; n < o; n++)
                    for (i = d[n], c = ["simple"], h = 0, r = c.length; h < r; h++) l = c[h], document.body.appendChild(new t(128, {
                        badge: i,
                        laser: l,
                        finish: e
                    }).canvas)
        }, t
    }(), l0OlO = function() {
        function t() {}
        return t.createTexture = function() {
            var e, i, s, n, l, a, o, r;
            for (e = document.createElement("canvas"), e.width = 2048, e.height = 1024, this.shapes = [], this.shapes.push(t.shape1()), this.shapes.push(t.shape2()), this.shapes.push(t.shape3()), this.shapes.push(t.shape4()), this.shapes.push(t.shape5()), this.shapes.push(t.shape6()), this.shapes.push(t.shape7()), i = e.getContext("2d"), i.translate(0, e.height), i.scale(e.width / 8, -e.width / 8), i.translate(.5, .5), i.scale(.5, .5), n = [.5, .1, .04, .1, .5], o = this.shapes, s = l = 0, a = o.length; l < a; s = ++l) r = o[s], i.save(), i.translate(s % 5 * 3, 3 * Math.floor(s / 5)), this.drawGradient(i, n[s], s), this.drawLaser(i, r), i.restore();
            return e
        }, t.drawGradient = function(t, e, i) {
            var s;
            if (null == e && (e = .5), null == i && (i = 0), s = t.createRadialGradient(0, 0, 0, 0, 0, 1), s.addColorStop(0, "hsla(10,100%,100%," + e + ")"), s.addColorStop(1, "hsla(10,100%,100%,0)"), t.fillStyle = s, t.fillRect(-1, -1, 2, 2), 1 === i) return t.fillStyle = "#000", t.fillRect(-1, -.025, 2, .05)
        }, t.getShape = function(t) {
            return (this['shape' + ++t] || this.shape1).call(this)
        }, t.shape1 = function() {
            var t, e, i, s, n, l;
            for (s = [], e = i = 0; i <= 20; e = i += 1) t = e / 20 * Math.PI * 2, n = Math.cos(t), l = Math.sin(t), n = n < 0 ? -Math.sqrt(-n) : Math.sqrt(n), l = l < 0 ? -Math.sqrt(-l) : Math.sqrt(l), s.push([n, l / 3]);
            return [s]
        }, t.shape2 = function() {
            var t, e, i, s, n, l, a, o;
            for ([], n = [], e = i = 0; i <= 20; e = i += 1) t = e / 20 * Math.PI * 2, a = Math.cos(t), o = Math.sin(t), a = a < 0 ? -Math.sqrt(-a) : Math.sqrt(a), o = o < 0 ? -1 : Math.sqrt(o), n.push([1.4 * a, .2 + o / 10]);
            for (l = [], e = s = 0; s <= 20; e = s += 1) t = e / 20 * Math.PI * 2, a = Math.cos(t), o = Math.sin(t), a = a < 0 ? -Math.sqrt(-a) : Math.sqrt(a), o = o < 0 ? -Math.sqrt(-o) : 1, l.push([1.4 * a, o / 10 - .2]);
            return [n, l]
        }, t.shape3 = function() {
            return [
                [
                    [2, 0],
                    [1, .1],
                    [.55, .8],
                    [.35, -.1],
                    [.05, .8],
                    [-.25, -.1],
                    [-.55, .8],
                    [-1, .1],
                    [-2, 0],
                    [-1, -.1],
                    [-.85, -.8],
                    [-.55, .1],
                    [-.25, -.8],
                    [.05, .1],
                    [.35, -.8],
                    [.55, .1],
                    [.75, -.8],
                    [1, -.1],
                    [2, 0]
                ]
            ]
        }, t.shape4 = function() {
            return [
                [
                    [1.4, -.6],
                    [1.1, -.6],
                    [1.1, .6],
                    [1.4, .6]
                ],
                [
                    [.55, -.6],
                    [.25, -.6],
                    [.25, .6],
                    [.55, .6]
                ],
                [
                    [-.55, -.6],
                    [-.25, -.6],
                    [-.25, .6],
                    [-.55, .6]
                ],
                [
                    [-1.4, -.6],
                    [-1.1, -.6],
                    [-1.1, .6],
                    [-1.4, .6]
                ]
            ]
        }, t.shape5 = function() {
            var t, e, i, s, n, l, a, o;
            for (l = [], t = [0, 70, 90, 110, 180, 250, 270, 290, 360], s = [1, 1, .7, 1, 1, 1, .7, 1, 1], e = i = 0, n = s.length - 1; i <= n; e = i += 1) a = Math.cos(t[e] * Math.PI / 180) * s[e], o = Math.sin(t[e] * Math.PI / 180) * s[e], l.push([a, o / 2]);
            return [l]
        }, t.shape6 = function() {
            return [
                [
                    [2, .4],
                    [2, -.4],
                    [-2, -.4],
                    [-2, .4]
                ],
                [
                    [.4, 2],
                    [.4, -2],
                    [-.4, -2],
                    [-.4, 2]
                ]
            ]
        }, t.shape7 = function() {
            var t, e, i, s, n, l;
            for (s = [], e = i = 0; i <= 20; e = i += 1) t = e / 20 * Math.PI * 2, n = Math.cos(t), l = Math.sin(t), s.push([n, l]);
            return [s]
        }, t.drawLaser = function(t, e) {
            var i, s, n, l, a, o, r, h;
            for (i = t.createRadialGradient(0, 0, 0, 0, 0, .3), i.addColorStop(0, "rgba(255,255,255,1)"), i.addColorStop(1, "rgba(255,255,255,.5)"), t.fillStyle = i, r = [], s = 0, l = e.length; s < l; s++) {
                for (h = e[s], t.beginPath(), n = 0, a = h.length; n < a; n++) o = h[n], t.lineTo(.3 * o[0], .3 * o[1]);
                t.closePath(), r.push(t.fill())
            }
            return r
        }, t
    }();
    initializer.loadBadge = function(size, query_info, finish, laser, rid, callback) {
        new Badge(size, query_info, finish, laser, rid, callback)
    }
    initializer.loadIcon = function(size, query_info, rid, callback) {
        callback = "function" == typeof callback ? callback : function(){}
        let ecp_canvas = document.createElement("canvas");
        let c2d = ecp_canvas.getContext("2d");
        if (query_info.url) {
            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = query_info.url;
            img.onload = function() {
                if (rid == this.id - 1) {
                    osize = img.width;
                    ecp_canvas.width = size;
                    ecp_canvas.height = size;
                    c2d.drawImage(img, 0, 0, ecp_canvas.width, ecp_canvas.height);
                    callback(ecp_canvas, query_info, rid);
                }
            }.bind(this)
        }
        else {
            ecp_canvas.width = size;
            ecp_canvas.height = size;
            let deco = query_info.decoration;
            if (deco) {
                c2d.fillStyle = deco.fill;
                c2d.fillRect(0,0, ecp_canvas.width, ecp_canvas.height);
                c2d.textAlign = "center";
                c2d.textBaseline = "middle";
                c2d.fillStyle = deco.stroke;
                if (deco.custom) {
                    for (u = deco.custom, l = .7 * ecp_canvas.height / 11, a = r = 0; r <= 10; a = r += 1)
                        for (o = h = 0; h <= 7; o = h += 1) c = ecp_canvas.width / 2 + l * (a - 5), p = ecp_canvas.height / 2 + l * (o - 4), 1 === u[o][a] && c2d.fillRect(c - .4 * l, p - .4 * l, .8 * l, .8 * l);
                }
                else {
                    c2d.font = (ecp_canvas.width/2) + "pt 'SBGlyphs'";
                    c2d.fillText(eval('"\\u{'+deco.unicode.toString(16)+'}"'), ecp_canvas.height/2, ecp_canvas.width/2);
                }
                c2d.stroke();
            }
            callback(ecp_canvas, query_info, rid);
        }
    }
    return initializer
}

let ECPIconManager = window.initECPSetup({});

let ECPIcons = {
    "star": {
        "name": "Star",
        "id": "star",
        "active": true,
        "decoration": {"unicode": 83, "fill": "hsl(200,50%,20%)", "stroke": "hsl(50,100%,70%)"}
    },
    "reddit": {
        "name": "Reddit",
        "id": "reddit",
        "active": true,
        "decoration": {"unicode": 126, "fill": "#246", "stroke": "#FFF"}
    },
    "pirate": {
        "name": "Pirate",
        "id": "pirate",
        "active": true,
        "decoration": {"unicode": 127, "fill": "#111", "stroke": "#FFF"}
    },
    "csf": {"name": "Centauri Space Force", "id": "csf", "active": true, "url": "csf.png"},
    "pmf": {"name": "Proxima Mining Front", "id": "pmf", "active": true, "url": "pmf.png"},
    "nwac": {"name": "New World Army Citizens", "id": "nwac", "active": true, "url": "nwac.png"},
    "unge": {"name": "United Nations Green Eagles", "id": "unge", "active": true, "url": "unge.png"},
    "halo": {"name": "Halo Corsairs", "id": "halo", "active": true, "url": "halo.png"},
    "youtube": {
        "name": "Youtube",
        "id": "youtube",
        "active": true,
        "decoration": {"unicode": 90, "fill": "#B11", "stroke": "#FFF"}
    },
    "twitch": {"name": "Twitch", "id": "twitch", "active": true, "url": "twitch.png"},
    "invader": {
        "name": "Invader",
        "id": "invader",
        "active": true,
        "decoration": {
            "custom": [[0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0]],
            "fill": "#111",
            "stroke": "hsl(120,100%,50%)"
        }
    },
    "empire": {
        "name": "Galactic Empire",
        "id": "empire",
        "active": true,
        "decoration": {"unicode": 82, "fill": "#111", "stroke": "#FFF"}
    },
    "alliance": {
        "name": "Rebel Alliance",
        "id": "alliance",
        "active": true,
        "decoration": {"unicode": 88, "fill": "#111", "stroke": "#F00"}
    },
    "sdf": {
        "name": "Soloist Defence Force",
        "id": "sdf",
        "active": true,
        "decoration": {"unicode": 89, "fill": "#111", "stroke": "#FFF"}
    },
    "paw": {
        "name": "Paw",
        "id": "paw",
        "active": true,
        "decoration": {"unicode": 86, "fill": "#DA5", "stroke": "#000"}
    },
    "gamepedia": {"name": "Gamepedia", "id": "gamepedia", "active": true, "url": "gamepedia.png"},
    "discord": {"name": "Discord", "id": "discord", "active": true, "url": "discord.png"},
    "medic": {"name": "Medic", "id": "medic", "active": true, "url": "medic.jpg"},
    "blank": {"name": "Blank", "id": "blank", "active": true},
    "seasonal": {"name": "Seasonal", "id": "seasonal", "active": true, "url": "seasonal.png"},
    "halloween_2021": {
        "name": "Seasonal - Halloween 2021",
        "id": "halloween_2021",
        "active": true,
        "url": "halloween.png"
    },
    "christmas_2021": {
        "name": "Seasonal - Christmas 2021",
        "id": "christmas_2021",
        "active": false,
        "url": "christmas_2021.png"
    },
    "summer_2022": {"name": "Seasonal - Summer 2022", "id": "summer_2022", "active": false, "url": "summer_2022.png"},
    "http://starblast.io/ecp/dev.png": {"name": "Developer", "id": "dev", "active": true, "url": "dev.png"},
    "http://starblast.io/ecp/translator.png": {"name": "Translator", "id": "translator", "active": true, "url": "translator.png"},
    "http://starblast.io/ecp/shipdesigner.jpg": {"name": "Shipwright", "id": "shipdesigner", "active": true, "url": "shipdesigner.jpg"},
    "http://starblast.io/ecp/srcchamp.png": {"name": "SRC Champion", "id": "srcchamp", "active": true, "url": "srcchamp.png"},
    "http://starblast.io/ecp/sdcchamp.png": {"name": "SDC Champion", "id": "sdcchamp", "active": true, "url": "sdcchamp.png"},
    "http://starblast.io/ecp/x27.png": {"name": "X-27", "id": "x27", "active": true, "url": "x27.png"},
    "http://starblast.io/ecp/loveship.png": {"name": "Loveship", "id": "loveship", "active": true, "url": "loveship.png"},
    "http://starblast.io/ecp/paralx.jpg": {"name": "Paralx", "id": "paralx", "active": true, "url": "paralx.jpg"},
    "http://starblast.io/ecp/iridium_ore.jpg": {"name": "Iridium Ore", "id": "iridium", "active": true, "url": "iridium_ore.jpg"},
    "http://starblast.io/ecp/carme.jpg": {"name": "Carme", "id": "carme", "active": true, "url": "carme.jpg"},
    "http://starblast.io/ecp/pudding.jpg": {"name": "Pudding Ship", "id": "pudding", "active": true, "url": "pudding.jpg"},
    "http://starblast.io/ecp/acarii.jpg": {"name": "Acarii", "id": "acarii", "active": true, "url": "acarii.jpg"},
    "http://starblast.io/ecp/scarn.jpg": {"name": "Scarn", "id": "scarn", "active": true, "url": "scarn.jpg"},
    "http://starblast.io/ecp/tournebulle.png": {"name": "Tournebulle", "id": "tournebulle", "active": true, "url": "tournebulle.png"},
    "http://starblast.io/ecp/blackstar.jpg": {"name": "Blackstar", "id": "blackstar", "active": true, "url": "blackstar.jpg"},
    "http://starblast.io/ecp/oh.jpg": {"name": "Oh_", "id": "oh", "active": true, "url": "oh.jpg"},
    "http://starblast.io/ecp/ancientsky.jpg": {"name": "Ancient Sky", "id": "ancientsky", "active": true, "url": "ancientsky.jpg"},
    "http://starblast.io/ecp/kleinem.jpg": {"name": "Kleinem", "id": "kleinem", "active": true, "url": "kleinem.jpg"},
    "http://starblast.io/ecp/2k.jpg": {"name": "Double K", "id": "2k", "active": true, "url": "2k.jpg"},
    "http://starblast.io/ecp/xcommander.jpg": {"name": "X-Commander", "id": "xcommander", "active": true, "url": "xcommander.jpg"},
    "http://starblast.io/ecp/fady.jpg": {"name": "Fady", "id": "fady", "active": true, "url": "fady.jpg"},
    "http://starblast.io/ecp/andromeda.jpg": {"name": "Andromeda", "id": "andromeda", "active": true, "url": "andromeda.jpg"},
    "http://starblast.io/ecp/mortyrules.jpg": {"name": "MortyRules", "id": "mortyrules", "active": true, "url": "mortyrules.jpg"},
    "http://starblast.io/ecp/pell.jpg": {"name": "Pell", "id": "pell", "active": true, "url": "pell.jpg"},
    "http://starblast.io/ecp/dimed.jpg": {"name": "Dimed", "id": "dimed", "active": true, "url": "dimed.jpg"},
    "http://starblast.io/ecp/finalizer.jpg": {"name": "Finalizer", "id": "finalizer", "active": true, "url": "finalizer.jpg"},
    "http://starblast.io/ecp/mikr.jpg": {"name": "Mikr Pollock", "id": "mikr", "active": true, "url": "mikr.jpg"},
    "http://starblast.io/ecp/goldman.jpg": {"name": "Goldman", "id": "goldman", "active": true, "url": "goldman.jpg"},
    "http://starblast.io/ecp/uranus.jpg": {"name": "Uranus", "id": "uranus", "active": true, "url": "uranus.jpg"},
    "http://starblast.io/ecp/nova.jpg": {"name": "Nova", "id": "nova", "active": true, "url": "nova.jpg"},
    "http://starblast.io/ecp/45rfew.jpg": {"name": "45rfew", "id": "45rfew", "active": true, "url": "45rfew.jpg"},
    "http://starblast.io/ecp/bhpsngum.png": {"name": "Bhpsngum", "id": "bhpsngum", "active": true, "url": "bhpsngum.png"},
    "http://starblast.io/ecp/valiant.jpg": {"name": "Valiant", "id": "valiant", "active": true, "url": "valiant.jpg"},
    "http://starblast.io/ecp/notus.png": {"name": "Notus", "id": "notus", "active": true, "url": "notus.png"},
    "http://starblast.io/ecp/destroy.png": {"name": "Destroy", "id": "destroy", "active": true, "url": "destroy.png"},
    "http://starblast.io/ecp/schickenman.png": {"name": "SChickenMan", "id": "schickenman", "active": true, "url": "schickenman.png"}
}

for (let key of Object.keys(ECPIcons)) {
    if (ECPIcons[key].url) {
        ECPIcons[key].url = `https://starblast.io/ecp/${ECPIcons[key].url}`;
    }
}

window.cachedBadges = {};

window.getECPIcon = function (custom) {
    return new Promise((resolve) => {
        if (window.cachedBadges[JSON.stringify(custom)]) {
            resolve(window.cachedBadges[JSON.stringify(custom)]);
            return;
        }
        let query = ECPIcons[custom.badge];
        if (!query) query = ECPIcons["star"];
        ECPIconManager.loadBadge(64, query, custom.finish, custom.laser, Math.random(), (canvas) => {
            setTimeout(() => {
                let url = canvas.toDataURL();
                window.cachedBadges[JSON.stringify(custom)] = url;
                canvas.remove();
                resolve(url);
                }, 100);
        });
    });
}