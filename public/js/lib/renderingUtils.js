window.hsv2rgb = function (h, s, v) {
    let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)];
}

window.hsv2hex = function(h, s, v) {
    let rgb = window.hsv2rgb(h, s, v);
    let r = Math.floor(rgb[0] * 255);
    let g = Math.floor(rgb[1] * 255);
    let b = Math.floor(rgb[2] * 255);
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

window.roundRect = function(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (let side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }
}

window.drawCross = function(canvas, ctx, x, y, color, maxRadius, isTarget, outlineColor) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = maxRadius * 1.5;
    let c = [
        canvas.width / 2 + x - maxRadius * 1.5,
        canvas.width / 2 + y - maxRadius * 1.5,
        canvas.width / 2 + x + maxRadius * 1.5,
        canvas.width / 2 + y + maxRadius * 1.5
    ]
    if (preferencesManager.preferences.centerMapOnAsteroids) {
        for (let x in c) {
            c[x] = c[x] + canvas.width / 2;
        }
        if (c[0] >= canvas.width && c[2] >= canvas.width) {
            c[0] = c[0] % canvas.width;
            c[2] = c[2] % canvas.width;
        }
        if (c[1] >= canvas.width && c[3] >= canvas.width) {
            c[1] = c[1] % canvas.width;
            c[3] = c[3] % canvas.width;
        }
    }
    ctx.beginPath();
    ctx.moveTo(c[0], c[1]);
    ctx.lineTo(c[2], c[3]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(c[0], c[3]);
    ctx.lineTo(c[2], c[1]);
    ctx.stroke();
    ctx.fill();
    let pos = {
        x: (c[0] + c[2]) / 2,
        y: (c[1] + c[3]) / 2,
        radius: maxRadius * 3
    };

    if (isTarget) {
        ctx.beginPath();
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 2;
        ctx.arc(pos.x, pos.y, pos.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    return pos;
}

window.drawTransparentCircle = function(canvas, ctx, x, y, color, radius, maxRadius) {

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + x, canvas.width / 2 + y, radius * maxRadius, 0, 2*Math.PI);
    ctx.fill();
}

const shortestPath = function(x1, y1, x2, y2, mapSize) {
    let dx = x2 - x1;
    if (dx < mapSize * -5) {
        dx += (mapSize * 10);
    } else if (dx > mapSize * 5) {
        dx -= mapSize * 10;
    }

    let dy = y2 - y1;
    if (dy < mapSize * -5) {
        dy += mapSize * 10;
    } else if (dy > mapSize * 5) {
        dy -= mapSize * 10;
    }

    return [dx, dy]
}

let translateColor = function(hue) {
    if (hue >= 0 && hue < 20) {
        return "Red";
    } else if (hue >= 20 && hue < 40) {
        return "Orange";
    } else if (hue >= 40 && hue < 70) {
        return "Yellow";
    } else if (hue >= 70 && hue < 140) {
        return "Green";
    } else if (hue >= 140 && hue < 170) {
        return "Teal";
    } else if (hue >= 170 && hue < 270) {
        return "Blue";
    } else if (hue >= 270 && hue < 300) {
        return "Purple";
    } else if (hue >= 300 && hue < 330) {
        return "Pink";
    }
    return "Red";
}