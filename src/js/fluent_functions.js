// Variables
var Initialized = false;

// Switch between Light and Dark themes
function SwitchTheme() {
    var myElement = document.documentElement;

    if (getComputedStyle(myElement).getPropertyValue("--dark-color") == "rgb(30, 30, 30)") // Is dark theme?
    {
        SetLightTheme();
    }
    else {
        SetDarkTheme();
    }
}

// Set Dark theme
function SetDarkTheme() {
    var myElement = document.documentElement;

    myElement.style.setProperty("--dark-color", "rgb(30, 30, 30)");
    myElement.style.setProperty("--dark-border-color", "rgb(25, 25, 25)");
    myElement.style.setProperty("--light-color", "rgb(43, 43, 43)");
    myElement.style.setProperty("--light-trans-color", "rgba(40, 40, 40, 0.7)");
    myElement.style.setProperty("--light-hover-color", "rgb(45, 45, 45)");
    myElement.style.setProperty("--lighter-hover-color", "rgb(55, 55, 55)");
    myElement.style.setProperty("--lighter-press-color", "rgb(51, 51, 51)");
    myElement.style.setProperty("--light-border-color", "rgb(47, 47, 47)");
    myElement.style.setProperty("--focus-color", "rgba(45, 45, 45, 0.5)");
    myElement.style.setProperty("--text-color-inverted", "black");
    myElement.style.setProperty("--text-focus-color-inverted", "rgba(0, 0, 0, 0.75)");
    myElement.style.setProperty("--text-color", "white");
    myElement.style.setProperty("--text-focus-color", "rgba(255, 255, 255, 0.75)");
    myElement.style.setProperty("--text-nobg-color", "rgb(185, 185, 185)");
    myElement.style.setProperty("--textbox-border-bottom-color", "rgb(180, 180, 180)");
    myElement.style.setProperty("--light-dark-color", "rgb(33, 33, 33)");
    myElement.style.setProperty("--accent-focus-color", "#42a1d2");
    myElement.style.setProperty("--accent-hover-color", "#47b1e8");
    myElement.style.setProperty("--accent-color", "#4cc2ff");
    myElement.style.setProperty("--icon-color", "0");

    localStorage.setItem("CurrentTheme", "Dark");

    // Refresh selected items
    const selected_items = document.querySelectorAll(".selected");

    for (const selected_item of selected_items) {
        const cssString = "width: 4px; height: 1.45em; background-color:" + getComputedStyle(document.documentElement).getPropertyValue("--accent-color") + "; display: inline-block; border-radius: 10px; position: absolute; margin-left: -15px;";
        selected_item.firstChild.style.cssText = cssString;
    }
}

// Set Light theme
function SetLightTheme() {
    var myElement = document.documentElement;

    myElement.style.setProperty("--dark-color", "rgb(238, 238, 238)");
    myElement.style.setProperty("--dark-border-color", "rgb(225, 225, 225)");
    myElement.style.setProperty("--light-color", "rgb(251, 251, 251)");
    myElement.style.setProperty("--light-trans-color", "rgba(251, 251, 251, 0.7)");
    myElement.style.setProperty("--light-hover-color", "rgb(247, 247, 247)");
    myElement.style.setProperty("--lighter-hover-color", "rgb(242, 242, 242)");
    myElement.style.setProperty("--lighter-press-color", "rgb(245, 245, 245)");
    myElement.style.setProperty("--light-border-color", "rgb(203, 203, 203)");
    myElement.style.setProperty("--focus-color", "rgba(255, 255, 255, 0.5)");
    myElement.style.setProperty("--text-color-inverted", "white");
    myElement.style.setProperty("--text-focus-color-inverted", "rgba(255, 255, 255, 0.75)");
    myElement.style.setProperty("--text-color", "black");
    myElement.style.setProperty("--text-focus-color", "rgba(0, 0, 0, 0.75)");
    myElement.style.setProperty("--text-nobg-color", "rgb(50, 50, 50)");
    myElement.style.setProperty("--textbox-border-bottom-color", "rgb(110, 110, 110)");
    myElement.style.setProperty("--light-dark-color", "rgb(248, 248, 248)");
    myElement.style.setProperty("--accent-focus-color", "#3183ca");
    myElement.style.setProperty("--accent-hover-color", "#1975c5");
    myElement.style.setProperty("--accent-color", "#0067c0");
    myElement.style.setProperty("--icon-color", "0.7");

    localStorage.setItem("CurrentTheme", "Light");

    // Refresh selected items
    const selected_items = document.querySelectorAll(".selected");

    for (const selected_item of selected_items) {
        const cssString = "width: 4px; height: 1.45em; background-color:" + getComputedStyle(document.documentElement).getPropertyValue("--accent-color") + "; display: inline-block; border-radius: 10px; position: absolute; margin-left: -15px;";
        selected_item.firstChild.style.cssText = cssString;
    }
}

// Loads last theme
function LoadLastTheme() {
    if (localStorage.getItem("CurrentTheme") == "Light") {
        SetLightTheme();
    }
    else {
        SetDarkTheme();
    }
}

function InitializeFluent() {
    setTimeout( () => {
        var webDocument = document.documentElement;

        // Load last theme
        LoadLastTheme();

        // Initialize Expanders
        InitExpanders();

        //#region Remove focus from elements when clicked
        const buttons = document.querySelectorAll("button, a.fluent-menu-item");
        const expanders = document.querySelectorAll(".fluent-expander-header");

        for (const button of buttons) {
            button.addEventListener("click", function (e) {
                for (const btn of buttons) btn.blur();
            });
        }

        document.addEventListener("click", function (e) {
            for (const exp of expanders) if (exp.classList.contains("press")) {
                exp.classList.remove("press");
            }
        });
        //#endregion

        // Set selectable buttons active when clicked
        const menu_items_select = document.querySelectorAll(".fluent-menu-item-select");

        if (menu_items_select.length != 0) {
            for (const menu_item_select of menu_items_select) {
                menu_item_select.addEventListener("click", function (e) {
                    for (const menu_item_select_old of menu_items_select) {
                        if (menu_item_select_old.classList.contains("selected")) {
                            menu_item_select_old.classList.remove("selected");

                            menu_item_select_old.firstChild.animate(
                                [
                                    // keyframes
                                    { height: 'scaleY(1)', opacity: '1' },
                                    { transform: 'scaleY(0)', opacity: '0', }
                                ],
                                {
                                    // timing options
                                    duration: 90
                                });

                            setTimeout(function () {
                                menu_item_select_old.firstChild.remove();
                            }, 90);
                        }
                    }

                    menu_item_select.classList.add("selected");

                    var active_element = document.createElement("div");

                    const cssString = "width: 4px; height: 1.45em; background-color:" + getComputedStyle(webDocument).getPropertyValue("--accent-color") + "; display: inline-block; border-radius: 10px; position: absolute; margin-left: -15px;";
                    active_element.style.cssText = cssString;
                    menu_item_select.prepend(active_element);

                    active_element.animate(
                        [
                            // keyframes
                            { transform: 'scaleY(0)', opacity: '0' },
                            { transform: 'scaleY(1)', opacity: '1' }
                        ],
                        {
                            // timing options
                            duration: 90
                        });

                    e.preventDefault();
                });
            }
        }

        // ********************
        // Show custom context menu
        // ********************
        if (document.getElementById("fluent-context-menu-standalone") != null) {
            const contextMenuStandalone = document.getElementById("fluent-context-menu-standalone");

            document.querySelector("body").addEventListener("contextmenu", (e) => {
                e.preventDefault();

                const {
                    left: scopeOffsetX,
                    top: scopeOffsetY,
                } = document.querySelector("body").getBoundingClientRect();

                const scopeX = e.pageX - scopeOffsetX;
                const scopeY = e.pageY - scopeOffsetY;

                // ? check if the element will go out of bounds
                const outOfBoundsOnX = scopeX + contextMenuStandalone.clientWidth > document.querySelector("body").clientWidth;

                const outOfBoundsOnY = scopeY + contextMenuStandalone.clientHeight > document.querySelector("body").clientHeight;

                let normalizedX = e.pageX;
                let normalizedY = e.pageY;

                // ? normalzie on X
                if (outOfBoundsOnX) {
                    normalizedX = scopeOffsetX + document.querySelector("body").clientWidth - contextMenuStandalone.clientWidth;
                }

                // ? normalize on Y
                if (outOfBoundsOnY) {
                    normalizedY = scopeOffsetY + document.querySelector("body").clientHeight - contextMenuStandalone.clientHeight;
                }

                contextMenuStandalone.style.top = normalizedY + 'px';
                contextMenuStandalone.style.left = normalizedX + 'px';

                contextMenuStandalone.classList.add("visible");

                contextMenuStandalone.animate(
                    [
                        // keyframes
                        { transform: 'translateY(-20px)', opacity: '0' },
                        { transform: 'translateY(0px)', opacity: '1' }
                    ],
                    {
                        // timing options
                        duration: 90
                    });
            });

            // Close custom context menu
            document.addEventListener("click", (e) => {
                if (e.target.offsetParent != contextMenuStandalone) {
                    contextMenuStandalone.classList.remove("visible");
                }
            });
        }

        //#region Custom menu for input text
        // ********************
        // Custom menu for input text
        // ********************
        if (document.getElementById("fluent-context-menu-standalone-text") != null) {
            const contextMenuStandaloneText = document.getElementById("fluent-context-menu-standalone-text");
            const input_text = document.querySelectorAll("input[type=\"text\"]");

            for (const context_menu of input_text) {
                context_menu.addEventListener("contextmenu", (e) => {
                    e.preventDefault();

                    const {
                        left: scopeOffsetX,
                        top: scopeOffsetY,
                    } = document.querySelector("body").getBoundingClientRect();

                    const scopeX = e.pageX - scopeOffsetX;
                    const scopeY = e.pageY - scopeOffsetY;

                    // ? check if the element will go out of bounds
                    const outOfBoundsOnX = scopeX + contextMenuStandaloneText.clientWidth > document.querySelector("body").clientWidth;

                    const outOfBoundsOnY = scopeY + contextMenuStandaloneText.clientHeight > document.querySelector("body").clientHeight;

                    let normalizedX = e.pageX;
                    let normalizedY = e.pageY;

                    // ? normalzie on X
                    if (outOfBoundsOnX) {
                        normalizedX = scopeOffsetX + document.querySelector("body").clientWidth - contextMenuStandaloneText.clientWidth;
                    }

                    // ? normalize on Y
                    if (outOfBoundsOnY) {
                        normalizedY = scopeOffsetY + document.querySelector("body").clientHeight - contextMenuStandaloneText.clientHeight;
                    }

                    contextMenuStandaloneText.style.top = normalizedY + 'px';
                    contextMenuStandaloneText.style.left = normalizedX + 'px';

                    contextMenuStandaloneText.classList.add("visible");

                    contextMenuStandaloneText.animate(
                        [
                            // keyframes
                            { transform: 'translateY(-20px)', opacity: '0' },
                            { transform: 'translateY(0px)', opacity: '1' }
                        ],
                        {
                            // timing options
                            duration: 90
                        });
                });
            }

            // Close custom context menu
            document.addEventListener("click", (e) => {
                if (e.target.offsetParent != contextMenuStandaloneText) {
                    contextMenuStandaloneText.classList.remove("visible");
                }
            });
        }
        //#endregion

        Initialized = true;
    }, 30)
}

function InitExpanders() {
    // Initialize expander header
    const expanders = document.querySelectorAll(".fluent-expander-header");
    
    if (expanders.length != 0) {
        for (const expander of expanders) {
            expander.addEventListener("mousedown", (e) => {
                e.preventDefault();

                expander.classList.add("press");
            });

            expander.addEventListener("click", (e) => {
                e.preventDefault();
                const expander_body = expander.parentElement.lastElementChild;
                const expander_arrow = expander.lastElementChild.firstElementChild;

                if (expander_body.classList.contains("expanded")) {

                    expander.style.cssText =    "border-radius: 4px 4px 4px 4px;" +
                                                "-webkit-border-radius: 4px 4px 4px 4px;" +
                                                "-moz-border-radius: 4px 4px 4px 4px;" +
                                                "-ms-border-radius: 4px 4px 4px 4px;" +
                                                "-o-border-radius: 4px 4px 4px 4px;";

                    for (const content of expander_body.children) {
                        content.style.cssText = "opacity: 0;";
                    }

                    setTimeout(function () {
                        expander_body.animate(
                            [
                                // keyframes
                                { height: (expander_body.offsetHeight - 10) + "px" },
                                { height: "0" }
                            ],
                            {
                                // timing options
                                duration: 150
                            });
                    }, 150);

                    setTimeout(() => {
                        expander_arrow.style.cssText = "transform: rotate(0deg);"
                    }, 300);

                    setTimeout(function () {
                        expander_body.classList.remove("expanded");
                    }, 300);
                }
                else {
                    expander_body.classList.add("expanded");

                    expander.style.cssText =    "border-radius: 4px 4px 0px 0px;" +
                                                "-webkit-border-radius: 4px 4px 0px 0px;" +
                                                "-moz-border-radius: 4px 4px 0px 0px;" +
                                                "-ms-border-radius: 4px 4px 0px 0px;" +
                                                "-o-border-radius: 4px 4px 0px 0px;";

                    expander_body.animate(
                        [
                            // keyframes
                            { height: "0" },
                            { height: (expander_body.scrollHeight - 10) + "px" }
                        ],
                        {
                            // timing options
                            duration: 150
                        });

                        setTimeout( () => {
                            expander_arrow.style.cssText = "transform: rotate(180deg);"
                        }, 100);

                    for (const content of expander_body.children) {
                        setTimeout(function () {
                            content.style.cssText = "opacity: 1;";
                        }, 100);
                    }
                }
            });
        }
    }
}