/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

import untar from "js-untar";

Fluent_onReady(() => Fluent_showSplashScreen(450, false, `${Fluent_CDN_URL}/img/web.png`));
Fluent_onInitialized(() => { console.log("Fluent initialize callback 1"); });
Fluent_onReady(() => { console.log("Fluent initialize callback 2"); });
Fluent_onReady(() => { console.log("Fluent initialize callback 3"); });

// If the user calls onInitialized after Fluent Web Framework is ready, gets called instantly
const navigate = window.navigate = {
	_securenav(route) { Fluent_onInitialized(() => Fluent_routerNavigate(route)); },
	introduction() { this._securenav("introduction"); },
	routing() { this._securenav("routing"); },
	icons() { this._securenav("icons"); },
	about() { this._securenav("about"); },
	config() { this._securenav("config"); },
	ctrlPageSwitcher() { this._securenav("controls/page-switcher"); },
	ctrlCode() { this._securenav("controls/code"); },
};

const _PS_ID = window._PS_ID = "page-switcher";

const getIconNamePretty = window.getIconNamePretty = (icon) => {
	// Icon name could be: access_time_20_filled
	// Get string before numbers: access_time_
	let name = icon.split(/[0-9]/)[0];
	// Remove _: access_time
	name = name.slice(0, -1);
	// Split at _: [access, time]
	name = name.split("_");
	// Capitalize every segment: [Access, Time]
	name = name.map(s => Fluent_capitalize(s));
	// Join: Access Time
	name = name.join(" ");
	return name;
};

document.querySelectorAll("[set-date-year]").forEach(el => el.innerText = new Date().getFullYear());

Fluent_onReady(() => {
	// The object also has functions
	document.getElementById("code_available_languages").innerText = Object.keys(Prism.languages).filter(l => typeof l !== "function").join(", ");
});

// Update count of icons from icon list
Fluent_onReady(() => {
	document.getElementById("config_enableIcons_iconsCount").innerText = Object.keys(Fluent_icons).length;
});

// List of themes
Fluent_onReady(() => {
	document.getElementById("themes_FluentThemes_example").innerText = Object.keys(Fluent_themes).join(", ");
});

// Loading icon lists
Fluent_onReady(() => {
	document.getElementById("icons_icons_list").innerText = JSON.stringify({ [Object.keys(Fluent_icons)[0]]: Object.values(Fluent_icons)[0] })
		.replace("{\"", "{ ")
		.replace("\":", ": ")
		.replace("}", ", ...}");
	document.getElementById("icons_icons_count").innerText = Object.keys(Fluent_icons).length;

	document.querySelector("#icons_list_all button").addEventListener("click", async e => {
		e.preventDefault();
		const listAllRef = document.querySelector("#icons_list_all");
		const loader = document.createElement("h4");
		const loaderProgress = document.createElement("h5");
		const totalIcons = Object.keys(Fluent_icons).length;
		loader.innerText = `Loading ${totalIcons} icons`;
		loaderProgress.innerHTML = "0.00%";

		const table = `
				<style>
					html.fluent-theme-dark #all_icons_body svg { fill: #fff; }
					#all_icons_body td:nth-child(1) { text-align: right; }
				</style>
				<table>
					<thead>
						<tr> <th>Name</th> <th>Icon</th> 
							 <th>Value <input type="text" placeholder="Filter" id="all_icons_filter" clear_btn></th> 
						</tr>
					</thead>
					<tbody id="all_icons_body">
					</tbody>
				</table>`;

		listAllRef.innerHTML = table;
		listAllRef.prepend(loaderProgress);
		listAllRef.prepend(loader);
		const bodyRef = document.getElementById("all_icons_body");

		// Fetch with custom reader to handle percentage
		const response = await fetch(`${Fluent_CDN_URL_ICONS}.tar`);
		const reader = response.body.getReader();
		const contentLength = +response.headers.get("Content-Length");
		const chunks = [];
		let receivedLength = 0;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			chunks.push(value);
			receivedLength += value.length;

			loaderProgress.innerText = `${(receivedLength / contentLength * 100).toFixed(2)}% - ${receivedLength}/${contentLength}`;
		}
		loader.innerText = "Processing response";
		loaderProgress.innerText = "0.00%";
		const chunksAll = new Uint8Array(receivedLength);
		let position = 0, ic = 0;
		for (let chunk of chunks) {
			chunksAll.set(chunk, position);
			position += chunk.length;
			loaderProgress.innerText = `${(ic++ / chunks.length * 100).toFixed(2)}%`;
		}

		loader.innerText = "Updating table";
		loaderProgress.innerText = "0.00%";
		const iconsDone = [], iconsWanted = Object.keys(Fluent_icons);

		// Do the untarring
		const iconsTar = chunksAll.buffer;
		let iconList = {}, irow = 0;

		const insertRow = (extractedFile) => {
			const iconName = extractedFile.name.substring(extractedFile.name.indexOf("/") + 1).replace(".svg", "");
			if (!Fluent_iconExists(iconName)) return;

			const row = bodyRef.insertRow();
			const name = row.insertCell();
			const iconRow = row.insertCell();
			const value = row.insertCell();
			name.appendChild(document.createTextNode(getIconNamePretty(iconName)));
			value.appendChild(document.createTextNode(iconName));

			// Icon
			const iconEl = document.createElement("div");
			iconEl.innerHTML = extractedFile.readAsString();
			iconRow.appendChild(iconEl);
			iconsDone.push(iconName);
			iconsWanted.splice(iconsWanted.indexOf(iconName), 1);
			iconList[iconName] = extractedFile;
		};

		untar(iconsTar)
			.progress(extractedFile => {
				loaderProgress.innerText = `${(irow / totalIcons * 100).toFixed()}% - ${irow}/${totalIcons}`;
				insertRow(extractedFile);
			})
			.then(extractedFiles => {
				loader.style.visibility = "hidden";
				loaderProgress.style.visibility = "hidden";
				console.log("done", iconsDone.length, "wanted", totalIcons, "missing", iconsWanted.length);
			});

		document.getElementById("all_icons_filter").addEventListener("change", (e) => {
			loader.innerText = "Updating table";
			loaderProgress.innerText = "0.00%";
			loader.style.visibility = "visible";
			loaderProgress.style.visibility = "visible";

			bodyRef.innerHTML = "";
			const filterVal = e.target.value.toLowerCase().split(/[\s,]+/);
			Object.keys(iconList)
				.filter(icon => filterVal.every(filval => icon.toLowerCase().includes(filval)))
				.forEach(k => {
					loaderProgress.innerText = `${(irow / totalIcons * 100).toFixed()}% - ${irow}/${totalIcons}`;
					insertRow(iconList[k]);
				});

			loader.style.visibility = "hidden";
			loaderProgress.style.visibility = "hidden";
		});
	});
});
