window.hsv2rgb = function (h, s, v) {
    let f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5), f(3), f(1)];
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