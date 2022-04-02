/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

Fluent_onReady(() => Fluent_showSplashScreen(450));
Fluent_onInitialized(() => { console.log("Fluent initialize callback 1"); });
Fluent_onReady(() => { console.log("Fluent initialize callback 2"); });
Fluent_onReady(() => { console.log("Fluent initialize callback 3"); });

// If the user calls onInitialized after Fluent Web Framework is ready, gets called instantly
const navigateToRouting = () => Fluent_onInitialized(() => Fluent_routerNavigate("routing"));
const navigateToIcons = () => Fluent_onInitialized(() => Fluent_routerNavigate("icons"));
const navigateToPageSwitcher = () => Fluent_onInitialized(() => Fluent_routerNavigate("controls/page-switcher"));

const getIconNamePretty = (icon) => {
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
	document.querySelector("#icons_list_all button").addEventListener("click", async e => {
		e.preventDefault();
		const listAllRef = document.querySelector("#icons_list_all");
		const loader = document.createElement("h3");
		const loaderProgress = document.createElement("h3");
		const totalIcons = Object.keys(Fluent_icons).length;
		loader.innerText = `Loading ${totalIcons} icons`;
		loaderProgress.innerHTML = "0.00%";
		loader.append(loaderProgress);

		const table = `
				<style>
					html.fluent-theme-dark #all_icons_body svg { fill: #fff; }
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
		listAllRef.prepend(loader);
		const bodyRef = document.getElementById("all_icons_body");

		// Fetch with custom reader to handle percentage
		const response = await fetch(`${Fluent_CDN_URL}/icons.tar`);
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

			loaderProgress.innerText = `${(receivedLength / contentLength * 100).toFixed(2)}%`;
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
		const iconsDone = [], iconsWanted = Object.keys(Fluent_icons);

		// Do the untarring
		const iconsTar = chunksAll.buffer;
		let iconList = {}, irow = 0;

		const insertRow = (extractedFile) => {
			const iconName = extractedFile.name.substring(extractedFile.name.indexOf("/") + 1).replace(".svg", "");
			if (!Fluent_iconExists(iconName)) return;

			loader.innerText = `Updating table ${irow}/${totalIcons} ${irow / totalIcons * 100}%`;

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
				insertRow(extractedFile);
			})
			.then(extractedFiles => {
				loader.style.display = "none";
				loader.innerText = "Updating table";
				console.log("done", iconsDone.length, "wanted", totalIcons, "missing", iconsWanted.length);
			});

		document.getElementById("all_icons_filter").addEventListener("change", (e) => {
			loader.style.display = "block";
			bodyRef.innerHTML = "";
			const filterVal = e.target.value.toLowerCase();
			Object.keys(iconList)
				.filter(icon => (icon.toLowerCase().includes(filterVal)))
				.forEach(k => insertRow(iconList[k]));
			loader.style.display = "none";
			loader.innerText = "Updating table";
		});
	});
});
