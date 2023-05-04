const Translation = {
    modes: {
        "team": "Team Mode",
        "survival": "Survival Mode",
        "deathmatch": "Deathmatch",
        "modding": "Modding Space",
        "invasion": "Invasion Mode",
        "custom": "Custom Game"
    },
    modeIcons: {
        "team": `<i class="bi bi-people-fill"></i>`,
        "survival": `<i class="bi bi-bullseye"></i>`,
        "deathmatch": `<i class="bi bi-trophy-fill"></i>`,
        "modding": `<i class="bi bi-code-slash"></i>`,
        "invasion": `<i class="bi bi-border"></i>`,
        "custom": `<i class="bi bi-wrench"></i>`
    },
    mods: {
        "racing": "Racing",
        "useries": "U-Series",
        "battleroyale": "Battle Royale",
        "alienintrusion": "Alien Intrusion",
        "nauticseries": "Nautic Series",
        "prototypes": "Prototypes",
        "src": "SRC 1",
        "src2": "SRC",
        "rumble": "Rumble",
        "ctf": "Capture the Flag",
        "dtm": "Destroy the Mothership",
        "mcst": "MCST",
        "sdc": "SDC",
        "megarumble": "Mega Rumble",
        "aow_lost_sector": "AOW Lost Sector",
        "escalation": "Escalation",
        "unknown": "Unknown Mod"
    }
}

const getModeString = function(system) {
    if (system.unlisted) {
        if (system.mode === "modding") {
            return "Custom Game"
        } else {
            return `Custom Game - ${Translation.modes[system.mode]}`;
        }
    } else {
        return system.mode === "modding" ? `${Translation.modes[system.mode]} - ${Translation.mods[system.mod_id]}` : Translation.modes[system.mode];
    }
}