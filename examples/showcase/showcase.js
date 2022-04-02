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
	document.querySelector("#icons_list_all button").addEventListener("click", e => {
		e.preventDefault();

		const table = `
				<table>
					<thead>
						<tr> <th>Name</th> <th>Icon</th> <th>Value</th> </tr>
					</thead>
					<tbody id="all_icons_body">
					</tbody>
				</table>`;

		document.querySelector("#icons_list_all").innerHTML = table;
		const bodyRef = document.getElementById("all_icons_body");

		Object.keys(Fluent_icons).forEach(async icon => {
			const row = bodyRef.insertRow();
			const name = row.insertCell();
			const iconRow = row.insertCell();
			const value = row.insertCell();
			name.appendChild(document.createTextNode(getIconNamePretty(icon)));
			value.appendChild(document.createTextNode(icon));
			// Icon
			const iconEl = document.createElement("div");
			//iconEl.innerHTML = await Fluent_getIcon(icon);
			iconRow.appendChild(iconEl);
		});
	});
});
