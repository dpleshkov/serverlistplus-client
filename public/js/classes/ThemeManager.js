class ThemeManager {
	constructor (preferencesManager) {
		const self = this;

		self.editorModal = new bootstrap.Modal(document.getElementById("customThemeEditorModal"), {
			keyboard: true,
			backdrop: true
		});
		self.themeEditor = CodeMirror.fromTextArea(document.querySelector("#customThemeText"), {
			mode: "css",
			lineNumbers: true,
			theme: "monokai"
		});
		self.preferencesManager = preferencesManager;
	}

	themes = [
		{ name: "Light", link: "./css/themes/default_light.css" },
		{ name: "Dark", link: "./css/themes/default_dark.css" },
		{ name: "1337", author: "dankdmitron", link: "./css/themes/dankdmitron/1337.css" },
		{ name: "Starblast", author: "Bhpsngum", link: "./css/themes/bhpsngum/starblast.css" },
		{ name: "Blue", author: "Caramel", link: "./css/themes/caramel/blue.css" },
		{ name: "Caramel", author: "Caramel", link: "./css/themes/caramel/caramel.css" },
		{ name: "Pink-Purple", author: "Caramel", link: "./css/themes/caramel/pink-purple.css" },
		{ name: "Purple", author: "Caramel", link: "./css/themes/caramel/purple.css" },
		{ name: "Elegant", author: "Halcyon", link: "./css/themes/halcyon/elegant.css" }
	];

	determineThemeTone () {
		const self = this;
		let theme = self.themes[0].name;
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = self.themes[1].name;
		}
		return theme;
	}

	validateOptions (save = false, init = false, apply = false) {
		// validate options, save if needed

		const self = this;
		let changed = false;
		if (self.options == null || "object" != typeof self.options) {
			changed = true;
			let oldTheme = self.options;
			self.options = {};
			if ("string" == typeof oldTheme) {
				// convert fixed link to relative link
				if (oldTheme.startsWith("/")) oldTheme = "." + oldTheme;

				// preserve selection from old theme preference
				self.options.value = (self.themes.find(t => t.link == oldTheme) || {}).name || '';
			}
		}

		const { options } = self;
		// validate selected theme
		let theme = options.value ? self.themes.find(t => t.name == options.value) : null;
		if (theme != null) {
			if (options.custom) {
				changed = true;
				options.custom = false;
			}
		}
		else if (!options.custom) {
			changed = true;
			if (init) options.value = self.determineThemeTone();
			else options.custom = true;
		}

		// validate custom theme list
		let customList = options.customList;
		if (!Array.isArray(customList)) {
			changed = true;
			try { customList = Array.from(customList) || [] }
			catch (e) { customList = [] }
		}
		options.customList = [];

		// validate each custom theme
		for (let customTheme of customList) {
			if (customTheme == null || "object" != typeof customTheme) {
				changed = true;
				let newTheme = {};
				// convert from string of theme code to theme object
				if ("string" == typeof customTheme) newTheme.code = customTheme;
				options.customList.push(newTheme);
			}
			else options.customList.push(customTheme);
		}

		// validate custom theme selection
		if (options.custom) {
			let theme = options.customList[options.customValue];
			if (theme == null || isNaN(options.customValue)) {
				changed = true;
				if (init) options.customValue = 0;
				if (!init || options.customList.length < 1) {
					// if there are no themes or it's not the first set, create a new one
					options.customList.push({});
					options.customValue = options.customList.length - 1;
				}
			}
		}

		// save if needed
		if (changed || save) {
			self.saveOptions();
			if (apply) self.apply();
		}
	}

	get options () {
		return this.preferencesManager.preferences.theme;
	}

	set options (val) {
		this.preferencesManager.preferences.theme = val;
	}

	saveOptions () {
		this.preferencesManager.savePreferences(this.preferencesManager.preferences);
	}

	apply () {
		const self = this;

		// renew custom theme options
		let customThemeSelector = document.querySelector("#useCustomTheme");
		let themeSelector = document.querySelector("#preferenceTheme");
		let customThemeSection = document.querySelector("#customThemeSelection");
		if (self.onCustom()) {
			customThemeSelector.innerHTML = "";
			let i = 0;
			for (let theme of self.options.customList) {
				let opt = document.createElement("option");
				opt.setAttribute("value", i++);
				opt.innerText = theme.name || "Unnamed theme";
				customThemeSelector.appendChild(opt);
			}
			customThemeSelector.innerHTML += `<option value="${i}">Add theme...</option>`;

			customThemeSelector.value = self.options.customValue;
			customThemeSection.removeAttribute("hidden");
			themeSelector.value = "";
		}
		else {
			customThemeSection.setAttribute("hidden", "");
			themeSelector.value = self.options.value;
		}

		// apply theme
		let themeStyleSheet = document.querySelector("#themeStylesheet");
		let customThemeStyleSheet = document.querySelector("#customThemeStylesheet");
		if (self.onCustom()) {
			themeStyleSheet.setAttribute("rel", "none");
			let theme = self.options.customList[self.options.customValue];
			customThemeStyleSheet.innerHTML = (theme || {}).code || "";
		}
		else {
			customThemeStyleSheet.innerHTML = "";
			themeStyleSheet.setAttribute("rel", "stylesheet");
			let theme = self.themes.find(t => t.name == self.options.value);
			themeStyleSheet.setAttribute("href", (theme || self.themes[0]).link || "");
		}
	}

	onCustom () {
		return this.options.custom && !isNaN(this.options.customValue);
	}

	initialize () {
		const self = this;

		// add options to theme selection
		let themeSelection = document.querySelector("#preferenceTheme");
		for (let theme of self.themes) {
			let opt = document.createElement("option");
			opt.setAttribute("value", theme.name);
			opt.innerText = `${theme.name}${theme.author ? (" by " + theme.author) : ""}`;
			themeSelection.appendChild(opt);
		}
		themeSelection.innerHTML += `<option value>Custom</option>`

		// add event listeners to theme selectors
		themeSelection.addEventListener("change", function () {
			self.options.value = this.value;
			self.validateOptions(true, false, true);
		});

		document.querySelector("#useCustomTheme").addEventListener("change", function () {
			if (self.onCustom()) {
				self.options.customValue = +this.value;
				self.validateOptions(true, false, true);
			}
		});

		// edit and delete buttons
		document.querySelector("#customThemeEditButton").addEventListener("click", function () {
			if (!self.onCustom()) return;
			let theme = self.options.customList[self.options.customValue];
			if (theme == null) return;
			self.editorModal.show();
			self.themeEditor.setValue(theme.code || "");
			self.themeEditor.refresh();
			self.themeEditor.focus();
			self.themeEditor.setCursor(self.themeEditor.lineCount(), 0);
			document.querySelector("#customThemeName").value = theme.name || "";
		});

		document.querySelector("#customThemeDeleteButton").addEventListener("click", function () {
			if (!self.onCustom()) return;
			let theme = self.options.customList[self.options.customValue];
			if (theme != null && confirm("Are you sure to delete this custom theme?")) {
				self.options.customList.splice(+self.options.customValue, 1);
				if (+self.options.customValue >= self.options.customList.length) self.options.customValue = self.options.customList.length - 1;
				self.validateOptions(true, false, true);
			}
		});

		// editor modal inputs and textareas
		document.querySelector("#customThemeName").addEventListener("change", function () {
			if (!self.onCustom()) return;
			let theme = self.options.customList[self.options.customValue];
			if (theme) {
				theme.name = this.value;
				self.validateOptions(true, false, true);
			}
		});

		self.themeEditor.on("change", function () {
			if (!self.onCustom()) return;
			let theme = self.options.customList[self.options.customValue];
			if (theme) {
				theme.code = self.themeEditor.getValue();
				self.validateOptions(true, false, true);
			}
		});

		self.apply();
	}
}
