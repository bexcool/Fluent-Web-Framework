// Variables
var Initialized = false;
var docEle = document.documentElement;

    // Splash screen
    var splashBackground;
    var splashImage;

// Imports

// Initialize Fluent
window.addEventListener('load', () => InitializeFluent());

// Switch between Light and Dark themes
function SwitchTheme() {
    if (getComputedStyle(docEle).getPropertyValue("--darker-color-noa") == "rgb(32, 32, 32)") // Is dark theme?
    {
        SetLightTheme();
    }
    else {
        SetDarkTheme();
    }
}

// Set Dark theme
function SetDarkTheme() {

    // Global colors
    docEle.style.setProperty("--black-white-color", "white");
    docEle.style.setProperty("--darker-color", "hsla(0, 0%, 100%, 3.26%)");
    docEle.style.setProperty("--darker-color-noa", "rgb(32, 32, 32)");
    docEle.style.setProperty("--dark-color", "rgb(43, 43, 43)");
    docEle.style.setProperty("--dark-border-color", "rgb(25, 25, 25, 0.6)");
    docEle.style.setProperty("--light-color", "hsla(0, 0%, 100%, 5.12%)");
    docEle.style.setProperty("--light-darker-color", "rgba(40, 40, 40, 0.7)");
    docEle.style.setProperty("--light-hover-color", "hsla(0, 0%, 100%, .084)");
    docEle.style.setProperty("--lighter-hover-color", "rgba(100, 100, 100, 0.25)");
    docEle.style.setProperty("--lighter-press-color", "rgba(100, 100, 100, 0.125)");
    docEle.style.setProperty("--light-border-color", "rgba(25, 25, 25, 0.25)");
    docEle.style.setProperty("--lighter-border-color", "rgba(105, 105, 105, 0.25)");
    docEle.style.setProperty("--focus-color", "rgba(255, 255, 255, 0.043)");
    docEle.style.setProperty("--text-color-inverted", "black");
    docEle.style.setProperty("--text-focus-color-inverted", "rgba(0, 0, 0, 0.45)");
    docEle.style.setProperty("--text-color", "white");
    docEle.style.setProperty("--text-focus-color", "rgba(255, 255, 255, 0.75)");
    docEle.style.setProperty("--text-nobg-color", "rgb(185, 185, 185)");
    docEle.style.setProperty("--textbox-border-bottom-color", "rgb(180, 180, 180)");
    docEle.style.setProperty("--light-dark-color", "rgb(33, 33, 33)");
    docEle.style.setProperty("--accent-focus-color", "#42a1d2");
    docEle.style.setProperty("--accent-hover-color", "#47b1e8");
    if (getComputedStyle(docEle).getPropertyValue("--accent-color-custom") == "none") docEle.style.setProperty("--accent-color", getComputedStyle(docEle).getPropertyValue("--accent-color-default-dark"));
    docEle.style.setProperty("--accent-color-1", pSBC(-0.11, getComputedStyle(docEle).getPropertyValue("--accent-color"), false, true));
    docEle.style.setProperty("--accent-color-2", pSBC(-0.21, getComputedStyle(docEle).getPropertyValue("--accent-color"), false, true));
    docEle.style.setProperty("--accent-color-3", pSBC(-0.31, getComputedStyle(docEle).getPropertyValue("--accent-color"), false, true));
    docEle.style.setProperty("--icon-color", "0%");
    docEle.style.setProperty("--icon-color-inverted", "100%");

    // Syntax Highlighting
    docEle.style.setProperty("--HTML-tagcolor", "darkgray");
    docEle.style.setProperty("--HTML-tagnamecolor", "#569cd6");
    docEle.style.setProperty("--HTML-attributecolor", "#9cdcfe");
    docEle.style.setProperty("--HTML-attributevaluecolor", "#ce9178");
    docEle.style.setProperty("--HTML-commentcolor", "#6a9955");
    docEle.style.setProperty("--CSS-selectorcolor", "#d7ba7d");
    docEle.style.setProperty("--CSS-propertycolor", "#569cd6");
    docEle.style.setProperty("--CSS-propertyvaluecolor", "#ce9178");
    docEle.style.setProperty("--CSS-delimitercolor", "white");
    docEle.style.setProperty("--CSS-importantcolor", "#569cd6");
    docEle.style.setProperty("--JS-color", "#dcdcaa");
    docEle.style.setProperty("--JS-keywordcolor", "#569cd6");
    docEle.style.setProperty("--JS-stringcolor", "#ce9178");
    docEle.style.setProperty("--JS-numbercolor", "#b5cea8");
    docEle.style.setProperty("--JS-propertycolor", "#4fc1ff");

    // Button
    docEle.style.setProperty("--button-color", "hsla(0, 0%, 100%, .061");
    docEle.style.setProperty("--button-hover-color", "rgba(255, 255, 255, 0.089)");
    docEle.style.setProperty("--button-focus-color", "rgba(255, 255, 255, 0.040)");
    docEle.style.setProperty("--button-border-color", "rgba(63, 63, 63, 0.5)");

    // Slider
    docEle.style.setProperty("--slider-thumb-border-color", "rgb(69, 69, 69)");

    // Background
    docEle.style.setProperty("--background-image", "url(https://resources.bexcool.eu/fluentwebframework/src/img/background_dark.png)")

    localStorage.setItem("CurrentTheme", "Dark");
    
    // Refresh code elements
    for (const code of document.querySelectorAll("code")) {
        code.dispatchEvent(new Event('code_RefreshSH'));
    }
}

// Set Light theme
function SetLightTheme() {

    // Global colors
    docEle.style.setProperty("--black-white-color", "black");
    docEle.style.setProperty("--darker-color", "hsla(0, 0%, 100%, 46.74%)");
    docEle.style.setProperty("--darker-color-noa", "rgb(238, 238, 238)");
    docEle.style.setProperty("--dark-color", "rgb(245, 245, 245)")
    docEle.style.setProperty("--dark-border-color", "rgb(225, 225, 225)");
    docEle.style.setProperty("--light-color", "hsla(0, 0%, 100%, 65.12%)");
    docEle.style.setProperty("--light-darker-color", "rgba(251, 251, 251, 0.7)");
    docEle.style.setProperty("--light-hover-color", "rgb(0, 0, 0, 0.03)");
    docEle.style.setProperty("--lighter-hover-color", "rgb(242, 242, 242)");
    docEle.style.setProperty("--lighter-press-color", "rgb(245, 245, 245)");
    docEle.style.setProperty("--light-border-color", "rgba(220, 220, 220, 0.4)");
    docEle.style.setProperty("--lighter-border-color", "rgba(255, 255, 255, 1)");
    docEle.style.setProperty("--focus-color", "rgb(0, 0, 0, 0.02)");
    docEle.style.setProperty("--text-color-inverted", "white");
    docEle.style.setProperty("--text-focus-color-inverted", "rgba(255, 255, 255, 0.5)");
    docEle.style.setProperty("--text-color", "black");
    docEle.style.setProperty("--text-focus-color", "rgba(0, 0, 0, 0.55)");
    docEle.style.setProperty("--text-nobg-color", "rgb(50, 50, 50)");
    docEle.style.setProperty("--textbox-border-bottom-color", "rgb(110, 110, 110)");
    docEle.style.setProperty("--light-dark-color", "rgb(248, 248, 248)");
    docEle.style.setProperty("--accent-focus-color", "#3183ca");
    docEle.style.setProperty("--accent-hover-color", "#1975c5");
    if (getComputedStyle(docEle).getPropertyValue("--accent-color-custom") == "none") docEle.style.setProperty("--accent-color", getComputedStyle(docEle).getPropertyValue("--accent-color-default-light"));
    docEle.style.setProperty("--accent-color-1", pSBC(0.1, getComputedStyle(docEle).getPropertyValue("--accent-color"), false, true));
    docEle.style.setProperty("--accent-color-2", pSBC(0.2, getComputedStyle(docEle).getPropertyValue("--accent-color"), false, true));
    docEle.style.setProperty("--accent-color-3", pSBC(0.3, getComputedStyle(docEle).getPropertyValue("--accent-color"), false, true));
    docEle.style.setProperty("--icon-color", "70%");
    docEle.style.setProperty("--icon-color-inverted", "30%");

    // Syntax Highlighting
    docEle.style.setProperty("--HTML-tagcolor", "#0000ff");
    docEle.style.setProperty("--HTML-tagnamecolor", "#a31616");
    docEle.style.setProperty("--HTML-attributecolor", "#ff0000");
    docEle.style.setProperty("--HTML-attributevaluecolor", "#0000ff");
    docEle.style.setProperty("--HTML-commentcolor", "#6a9955");
    docEle.style.setProperty("--CSS-selectorcolor", "#800000");
    docEle.style.setProperty("--CSS-propertycolor", "#ff0000");
    docEle.style.setProperty("--CSS-propertyvaluecolor", "#0451a5");
    docEle.style.setProperty("--CSS-delimitercolor", "#000");
    docEle.style.setProperty("--CSS-importantcolor", "#000");
    docEle.style.setProperty("--JS-color", "#795e26");
    docEle.style.setProperty("--JS-keywordcolor", "#0000ff");
    docEle.style.setProperty("--JS-stringcolor", "#a31616");
    docEle.style.setProperty("--JS-numbercolor", "#098658");
    docEle.style.setProperty("--JS-propertycolor", "#001080");

    // Button
    docEle.style.setProperty("--button-color", "hsla(0, 0%, 100%, .939");
    docEle.style.setProperty("--button-hover-color", "rgba(255, 255, 255, 0.611)");
    docEle.style.setProperty("--button-focus-color", "rgba(255, 255, 255, 0.040)");
    docEle.style.setProperty("--button-border-color", "rgba(150, 150, 150, 0.3)");

    // Slider
    docEle.style.setProperty("--slider-thumb-border-color", "white");

    // Background
    docEle.style.setProperty("--background-image", "url(https://resources.bexcool.eu/fluentwebframework/src/img/background_light.png)")

    localStorage.setItem("CurrentTheme", "Light");

    // Refresh code elements
    for (const code of document.querySelectorAll("code")) {
        code.dispatchEvent(new Event('code_RefreshSH'));
    }
}

// Enable Mica Effect
function EnableMica() {
    document.documentElement.getElementsByClassName("fluent-mica-effect")[0].classList.add("mica-enabled");
    localStorage.setItem("Mica", "true");
}

// Disable Mica Effect
function DisableMica() {
    document.documentElement.getElementsByClassName("fluent-mica-effect")[0].classList.remove("mica-enabled");
    localStorage.setItem("Mica", "false");
}

// Loads last theme
function LoadLastTheme() {
    if (localStorage.getItem("CurrentTheme") == "Light") {
        SetLightTheme();
    } else {
        SetDarkTheme();
    }

    if (localStorage.getItem("Mica") == "false") {
        DisableMica();
    } else {
        EnableMica();
    }
}

function InitializeFluent() {
    InitSplashScreen();

    setTimeout( () => {
        var webDocument = document.documentElement;

        document.body.style.zoom = screen.logicalXDPI / screen.deviceXDPI;

        // Initialize Expanders
        InitExpanders();
        InitMenuExpanders();

        // Initialize Code Elements
        InitFluentElements();

        // Initialize Selectable Buttons
        InitSelectableMenuItems();

        // Initialize Pages and Page Switchers
        InitializePages();

        // Load last theme
        LoadLastTheme();

        // Initialize responsivity
        InitResponsivity();

        //#region Remove focus from elements when clicked
        const buttons = document.querySelectorAll("button, a.fluent-menu-item");
        const links = document.querySelectorAll("a");
        const expanders = document.querySelectorAll(".fluent-expander-header");
        const menu_item_expanders = document.querySelectorAll(".fluent-menu-item-expander-header");
        const menu_items_select = document.querySelectorAll(".fluent-menu-item-select");

        for (const button of buttons) {
            button.addEventListener("click", function (e) {
                for (const btn of buttons) btn.blur();
            });
        }

        for (const link of links) {
            link.addEventListener("click", function (e) {
                for (const link of links) link.blur();
            });
        }

        document.addEventListener("click", function (e) {
            for (const exp of expanders) if (exp.classList.contains("press")) {
                exp.classList.remove("press");
            }

            for (const item of menu_item_expanders) if (item.classList.contains("press")) {
                item.classList.remove("press");
            }

            for (const item of menu_items_select) if (item.classList.contains("press")) {
                item.classList.remove("press");
            }
        });
        //#endregion
        //#region později se kouknu
        /*
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
        */
        //#endregion

        Initialized = true;
    }, 100);

}

function InitResponsivity() {
    

    /*
    // Create responsive title container
    const responsiveTitleContainer = document.createElement("div");
    responsiveTitleContainer.classList.add("fluent-responsive-title-container");
    document.body.prepend(responsiveTitleContainer);

    // Create title bar
    const responsiveTitleBar = document.createElement("div");
    responsiveTitleBar.classList.add("fluent-responsive-title-bar");
    responsiveTitleContainer.prepend(responsiveTitleBar);

    // Create title
    const responsiveTitle = document.createElement("div");
    responsiveTitle.prepend(document.querySelector("fluent-title-responsive"));
    responsiveTitle.classList.add("fluent-responsive-title");
    responsiveTitleBar.prepend(responsiveTitle);

    const mainMenuParent = document.getElementById("fluent-main-menu").parentElement;
    const mainMenu = document.getElementById("fluent-main-menu");

    // Reposition menu
    let media = window.matchMedia("(max-width: 1000px)");

    if (media.matches) {
        responsiveTitleContainer.append(mainMenu);
    } else {
        mainMenuParent.prepend(mainMenu);
        document.body.style.overflow = "auto";
    }

    media.onchange = function () {
        if (media.matches) {
            responsiveTitleContainer.append(mainMenu);
        } else {
            mainMenuParent.prepend(mainMenu);
            document.body.style.overflow = "auto";
            if (responsiveTitleContainer.classList.contains("open")) {
                responsiveTitleContainer.classList.remove("open");
                document.body.style.overflow = "auto";
            }   
        }
    };

    // Add open menu button
    const responsiveButton = document.createElement("button");
    responsiveButton.innerHTML = "MENU";
    responsiveButton.addEventListener("click", () => {
        if (!responsiveTitleContainer.classList.contains("open")) {
            document.body.style.overflow = "hidden";
            responsiveTitleContainer.classList.add("open");
        } else {
            responsiveTitleContainer.classList.remove("open");
            document.body.style.overflow = "auto";
        }        
    });
    responsiveTitle.append(responsiveButton);
    */
}

function InitSplashScreen() {
    // Prepare splash screen
    splashBackground = document.createElement("div");
    splashBackground.id = "fluent-splash-screen";
    splashBackground.classList.add("fluent-splash-background");

    document.body.prepend(splashBackground);

    splashImage = document.createElement("object");
    splashImage.classList.add("fluent-splash-icon");

    splashBackground.prepend(splashImage);
    splashBackground.style.display = "none";
}

function InitExpanders() {
    // Initialize expander header
    const expanders = document.querySelectorAll(".fluent-expander-header");
    
    if (expanders.length != 0) {
        for (const expander of expanders) {

            const expander_body = expander.parentElement.lastElementChild.lastElementChild;
            const expander_arrow = expander.lastElementChild.firstElementChild;
            
            expander.addEventListener("mousedown", (e) => {
                e.preventDefault();

                expander.classList.add("press");
            });

            // Bind expander open/close
            expander.addEventListener("click", (e) => {
                e.preventDefault();

                expander.parentElement.lastElementChild.style.overflow = "hidden";
                expander.style.overflow = "hidden";
                expander.parentElement.lastElementChild.style.position = "relative";

                if (expander_body.classList.contains("expanded")) {

                    document.documentElement.style.setProperty("--expander-expand-height", (expander_body.scrollHeight) + "px");
                    expander_body.style.animation = "fluent-expander-expand-reverse 0.3s ease-out";

                    setTimeout(() => {
                        expander_arrow.style.transform = "rotate(0deg)"
                    }, 200);

                    setTimeout(function () {
                        expander_body.classList.remove("expanded");

                        expander.style.cssText =    "border-radius: 4px 4px 4px 4px;" +
                                                    "-webkit-border-radius: 4px 4px 4px 4px;" +
                                                    "-moz-border-radius: 4px 4px 4px 4px;" +
                                                    "-ms-border-radius: 4px 4px 4px 4px;" +
                                                    "-o-border-radius: 4px 4px 4px 4px;";
                    }, 280);
                }
                else {
                    expander_body.classList.add("expanded");

                    document.documentElement.style.setProperty("--expander-expand-height", (expander_body.scrollHeight) + "px");
                    expander_body.style.animation = "fluent-expander-expand 0.15s ease-in";

                    expander.style.cssText =    "border-radius: 4px 4px 0px 0px;" +
                                                "-webkit-border-radius: 4px 4px 0px 0px;" +
                                                "-moz-border-radius: 4px 4px 0px 0px;" +
                                                "-ms-border-radius: 4px 4px 0px 0px;" +
                                                "-o-border-radius: 4px 4px 0px 0px;";

                    setTimeout(() => expander_arrow.style.transform = "rotate(180deg)", 150);
                }

                setTimeout(() => { 
                    expander.parentElement.lastElementChild.style.overflow = "visible";
                    expander.style.overflow = "visible";
                    expander.parentElement.lastElementChild.style.position = "static";
                }, 300);
            });
        }
    }
}

function InitMenuExpanders() {
    // Initialize expander header
    const expanders = document.querySelectorAll(".fluent-menu-item-expander-header");

    if (expanders.length != 0) {
        for (const expander of expanders) {

            const expander_body = expander.parentElement.lastElementChild.lastElementChild;
            const expander_arrow = expander.lastElementChild.firstElementChild;
            
            expander.addEventListener("mousedown", (e) => {
                e.preventDefault();

                expander.classList.add("press");
            });

            // Bind expander open/close
            expander.addEventListener("click", (e) => {
                e.preventDefault();
                expander.parentElement.lastElementChild.style.overflow = "hidden";
                expander.style.overflow = "hidden";
                expander.parentElement.lastElementChild.style.position = "relative";

                if (expander_body.classList.contains("expanded")) {

                    document.documentElement.style.setProperty("--expander-expand-height", (expander_body.scrollHeight) + "px");
                    expander_body.style.animation = "fluent-expander-expand-reverse 0.3s ease-out";

                    setTimeout(function () {
                        expander_body.classList.remove("expanded");
                    }, 290);

                    // Rotate arrow
                    setTimeout(() => expander_arrow.style.transform = "rotate(0deg)", 200);
                } else {
                    expander_body.classList.add("expanded");

                    document.documentElement.style.setProperty("--expander-expand-height", (expander_body.scrollHeight) + "px");
                    expander_body.style.animation = "fluent-expander-expand 0.15s ease-in";

                    // Rotate arrow
                    setTimeout(() => expander_arrow.style.transform = "rotate(180deg)", 150);
                }

                setTimeout(() => { 
                    expander.parentElement.lastElementChild.style.position = "static";
                    expander.parentElement.lastElementChild.style.overflow = "visible";
                    expander.style.overflow = "visible";
                }, 300);
            });
        }
    }
}

function InitSelectableMenuItems() {
    // Set selectable buttons active when clicked
    const menus = document.querySelectorAll(".fluent-menu-list");
    var doc = document.documentElement;

    if (menus.length != 0) {
        for (const menu of menus) {
            const menu_items = menu.querySelectorAll(".fluent-menu-item-select");
            if (menu_items.length != 0) {
                for (const menu_item_select of menu_items) {
                    menu_item_select.addEventListener("mousedown", (e) => {
                        e.preventDefault();
            
                        menu_item_select.classList.add("press");
                    });

                    menu_item_select.addEventListener("click", function (e) {
                        if (!menu_item_select.hasAttribute("selected")) {
                            e.preventDefault();
                            let i = 0, newItemIndex, oldItemIndex, oldExists = false;
        
                            // Get new selected menu item
                            for (const menu_item of menu_items) {
                                if (menu_item == menu_item_select) newItemIndex = i;
        
                                i++;
                            }
        
                            i = 0;
        
                            for (const menu_item_select_old of menu_items) {
                                if (menu_item_select_old.hasAttribute("selected")) {
                                    oldExists = true;

                                    menu_item_select_old.classList.remove("selected");
                                    menu_item_select_old.removeAttribute("selected");
        
                                    oldItemIndex = i;
        
                                    // Animate accent colored div movement
                                    if (newItemIndex > oldItemIndex) {
                                        menu_item_select_old.firstChild.style.animation = "fluent-menu-item-select-down 0.3s ease-in";
                                    }
                                    else { 
                                        menu_item_select_old.firstChild.style.animation = "fluent-menu-item-select-up 0.3s ease-in";
                                    }
        
                                    setTimeout(function () {
                                        menu_item_select_old.firstChild.remove();
                                    }, 280);
                                }
        
                                i++;
                            }
        
                            i = 0;
        
                            menu_item_select.classList.add("selected");
                            menu_item_select.setAttribute("selected", "");
        
                            if (oldExists) {
                                var active_element = document.createElement("div");

                                active_element.classList.add("fluent-menu-item-select-selected");
                                //if (!menu_item_select.hasAttribute("icon")) active_element.style.marginLeft = "-20px";
                                menu_item_select.prepend(active_element);
                                active_element.style.overflow = "hidden";
            
                                setTimeout(function () {
                                    active_element.style.opacity = "1";
            
                                    // Animate accent colored div movement
                                    if (newItemIndex > oldItemIndex) {
                                        active_element.style.animation = "fluent-menu-item-select-up-reverse 0.3s ease-out";
                                    }
                                    else { 
                                        active_element.style.animation = "fluent-menu-item-select-down-reverse 0.3s ease-out";
                                    }
                                }, 280);
                            } else {
                                var active_element = document.createElement("div");
        
                                active_element.classList.add("fluent-menu-item-select-selected");
                                //if (!menu_item_select.hasAttribute("icon")) active_element.style.marginLeft = "-20px";
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
                                    active_element.style.opacity = "1";
                                    
                            }
                        }
                    });
    
                    if (menu_item_select.hasAttribute("selected")) {
                        menu_item_select.classList.add("selected");
    
                        var active_element = document.createElement("div");
                        //if (!menu_item_select.hasAttribute("icon")) active_element.style.marginLeft = "-20px";
                        active_element.classList.add("fluent-menu-item-select-selected");
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

                        active_element.style.opacity = "1";
                    }
                }
            }
        }
    }
}

function InitializePages() {
    for (const pageSwitcher of document.querySelectorAll("fluent-page-switcher")) {
        // Show current page
        if (pageSwitcher.hasAttribute("active-page")) pageSwitcher.children[pageSwitcher.getAttribute("active-page")].style.display = "block";
        else if (pageSwitcher.children.length > 0)
        {       
            pageSwitcher.setAttribute("active-page", "0");

            // Show current page
            const activePage = pageSwitcher.children[0];
            activePage.style.display = "block";

            if (pageSwitcher.hasAttribute("fade")) {
                activePage.style.animation = `fluent-page-fade-${pageSwitcher.getAttribute("fade")} 0.3s ease-in-out`;
            } else {
                activePage.style.animation= "fluent-page-fade-up 0.3s ease-in-out";
            } 
        }
    }
}

function SetActivePageIndex(page_switcher_id, index) {
    const pageSwitcher = document.getElementById(page_switcher_id);

    if (pageSwitcher.hasAttribute("active-page")) {
        // Hide previous page
        pageSwitcher.children[pageSwitcher.getAttribute("active-page")].style.display = "none";

        // Show current page
        pageSwitcher.setAttribute("active-page", index);
        const activePage = pageSwitcher.children[pageSwitcher.getAttribute("active-page")];
        activePage.style.display = "block";

        if (pageSwitcher.hasAttribute("fade")) {
            activePage.lastElementChild.style.animation = `fluent-page-fade-${pageSwitcher.getAttribute("fade")} 0.3s ease-in-out`;
        } else {
            activePage.lastElementChild.style.animation= "fluent-page-fade-up 0.3s ease-in-out";
        }
    }
}

function InitFluentElements() {
    let doc = document.documentElement;

    // Body
    document.body.classList.add("anim");

    // Initialize tabels
    for (const table of document.querySelectorAll("table")) {
        table.outerHTML = `<div class="fluent-table-container">${table.outerHTML}</div>`;
    }

    // Code
    for (const code of document.querySelectorAll("code")) {
        code.outerHTML =    '<div class="fluent-code-container">' +
                            '<div style="display: inline-block; margin: 0.225em 0; max-width: -moz-available; max-width: -webkit-fill-available;"><code ' + 
                            AttributesToString(code) +
                            ' style="' + code.style.cssText + '">' +
                            code.innerHTML + 
                            '</code></div>' +
                            '<button class="fluent-code-copy-button" >' + 
                            '<svg class="fluent-svg" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
                            '<path class="fluent-svg-path" d="M8 2C6.89543 2 6 2.89543 6 4V14C6 15.1046 6.89543 16 8 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2H8ZM7 4C7 3.44772 7.44772 3 8 3H14C14.5523 3 15 3.44772 15 4V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z" fill="#212121"/>' +
                            '</svg>' +
                            '</button>' +
                            '</div>';
    }

    for (const code of document.querySelectorAll("code")) {
        code.parentElement.parentElement.children[1].addEventListener("click", () => {
            CopyToClipboard(DecodeHtml(code.innerHTML).replace(/<\/?span[^>]*>/g,"").replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' '));
            

            ShowFlyout(code.parentElement.parentElement.children[1], "Code copied!", 1000);
        });

        const codeContent = code.innerHTML;

        code.addEventListener('code_RefreshSH', () => {
            code.innerHTML = codeContent;

            if (code.hasAttribute("sh")) {
                CodeSyntaxHigh(code, code.getAttribute("sh").toLowerCase());
            }
        });
    }

    // Button attributes
    const buttons = document.querySelectorAll("button");

    for (const button of buttons) {
        // Set styles
        if (button.hasAttribute("accent")){
            button.outerHTML =  '<button class="fluent-button-accent"' + AttributesToString(button) + '>' + 
                                    button.innerHTML +
                                '</button>';
        }
        else if (button.hasAttribute("hyperlink")) {
            button.outerHTML =  '<button class="fluent-button-hyperlink"' + AttributesToString(button) + '>' + 
                                    button.innerHTML +
                                '</button>';
        }

        // Get URL attribute
        if (button.hasAttribute("url")) {
            button.addEventListener("click", () => {
                window.open(button.getAttribute("url"), "_self"); 
            });
        }
        else if (button.hasAttribute("urlnew")) {
            button.addEventListener("click", () => {
                window.open(button.getAttribute("urlnew")); 
            });
        }
    }

    // a attributes
    const links = document.querySelectorAll("a");

    for (const link of links) {
        if (link.hasAttribute("accent")) {
            link.outerHTML =    '<a ' + AttributesToString(link) + ' class="fluent-button-accent">' +
                                link.innerHTML + 
                                '</a>';
        }
        else if (link.hasAttribute("hyperlink")) {
            link.outerHTML =    '<a ' + AttributesToString(link) + ' class="fluent-button-hyperlink">' +
                                link.innerHTML + 
                                '</a>';
        }
    }

    // Input text
    const inputs_text = document.querySelectorAll("input[type=\"text\"]");

    for (const input_text of inputs_text) {
        input_text.outerHTML =  '<div class="fluent-textbox-container">' +
                                '<input ' + AttributesToString(input_text) + ' >' + 
                                '<button class="fluent-clear-text-input-button">x</button>' +
                                '</div>';
    }

    const inputs_text_new = document.querySelectorAll("input[type=\"text\"]");

    for (const input_text of inputs_text_new) {
        if (input_text.hasAttribute("clear_btn")) {
            input_text.parentElement.lastElementChild.style.opacity = "1";
            input_text.parentElement.lastElementChild.style.display = "inline";
        }

        input_text.parentElement.lastElementChild.addEventListener("click", () => {
            input_text.value = "";
            setTimeout(() => input_text.focus());
        });
    }

    // Input password
    const inputs_password = document.querySelectorAll("input[type=\"password\"]");

    for (const input_password of inputs_password) {
        input_password.outerHTML =  '<div class="fluent-textbox-container">' +
                                '<input ' + AttributesToString(input_password) + ' >' + 
                                '<a class="fluent-show-password-input" style="opacity: 0; display: none;"><svg style="margin-top: 0.425em;" width="20" height="20" viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"><path class="fluent-svg-path" d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z" fill="#212121"/></svg></a>' +
                                '</div>';
    }

    const inputs_password_new = document.querySelectorAll("input[type=\"password\"]");

    for (const input_password of inputs_password_new) {
        const button = input_password.parentElement.lastElementChild;

        if (input_password.hasAttribute("showpass_btn")) {
            button.style.opacity = "1";
            button.style.display = "inline";
        }

        if (input_password.hasAttribute("showpass")) {
            input_password.setAttribute("type", "text");
            button.innerHTML = '<svg style="margin-top: 0.425em;" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="fluent-svg-path" d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM9.98953 8C11.9225 8 13.4895 9.567 13.4895 11.5C13.4895 13.433 11.9225 15 9.98953 15C8.05653 15 6.48953 13.433 6.48953 11.5C6.48953 9.567 8.05653 8 9.98953 8Z" fill="#212121"/></svg>';
        }
        else {
            input_password.setAttribute("type", "password");
            button.innerHTML = '<svg style="margin-top: 0.425em;" width="20" height="20" viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"><path class="fluent-svg-path" d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z" fill="#212121"/></svg>';
        }

        button.addEventListener("click", () => {
            if (input_password.getAttribute("type") == "password" && !input_password.hasAttribute("showpass")) {
                input_password.setAttribute("type", "text");
                input_password.setAttribute("showpass", "");
                button.innerHTML = '<svg style="margin-top: 0.425em;" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path class="fluent-svg-path" d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM9.98953 8C11.9225 8 13.4895 9.567 13.4895 11.5C13.4895 13.433 11.9225 15 9.98953 15C8.05653 15 6.48953 13.433 6.48953 11.5C6.48953 9.567 8.05653 8 9.98953 8Z" fill="#212121"/></svg>';
            }
            else {
                input_password.setAttribute("type", "password");
                input_password.removeAttribute("showpass", "");
                button.innerHTML = '<svg style="margin-top: 0.425em;" width="20" height="20" viewBox="0 0 20 20"xmlns="http://www.w3.org/2000/svg"><path class="fluent-svg-path" d="M3.25909 11.6021C3.94254 8.32689 6.79437 6 10 6C13.2057 6 16.0574 8.32688 16.7409 11.6021C16.7974 11.8725 17.0622 12.0459 17.3325 11.9895C17.6029 11.933 17.7763 11.6682 17.7199 11.3979C16.9425 7.67312 13.6934 5 10 5C6.3066 5 3.05742 7.67311 2.28017 11.3979C2.22377 11.6682 2.39718 11.933 2.6675 11.9895C2.93782 12.0459 3.20268 11.8725 3.25909 11.6021ZM10 8C8.067 8 6.5 9.567 6.5 11.5C6.5 13.433 8.067 15 10 15C11.933 15 13.5 13.433 13.5 11.5C13.5 9.567 11.933 8 10 8ZM7.5 11.5C7.5 10.1193 8.61929 9 10 9C11.3807 9 12.5 10.1193 12.5 11.5C12.5 12.8807 11.3807 14 10 14C8.61929 14 7.5 12.8807 7.5 11.5Z" fill="#212121"/></svg>';
            }
        });
    }

    // Set menu item's icon
    const menu_items = document.querySelectorAll(".fluent-menu-item, .fluent-menu-item-select, .fluent-menu-item-expander-header");

    for (const menu_item of menu_items) {
        if (menu_item.hasAttribute("icon")) {
            var icon = document.createElement("img");
            icon.setAttribute("src", `https://cdn.spej.eu/fwf/icons/${menu_item.getAttribute("icon")}.svg`);
            menu_item.prepend(icon);
        } else {
            //menu_item.style.paddingLeft = "20px";
        }
    }

    // Prevent click on context menu
    const context_menus = document.querySelectorAll(".fluent-context-menu-container");

    for (const context_menu of context_menus) {
        context_menu.addEventListener("click", (e) => {
            e.preventDefault();
        });
    }

    // Initialize context menus
    for (const context_menu of context_menus) {
            const menu_child = context_menu.querySelector(".fluent-context-menu ul");
            
            context_menu.addEventListener("mouseenter", function (e) {
                    menu_child.parentElement.style.width = menu_child.scrollWidth +  "px";
                    menu_child.parentElement.style.height = menu_child.scrollHeight + "px";
            
                    menu_child.animate(
                        [
                            // keyframes
                            { transform: 'translateY(-100px)', opacity: '1', easing: 'ease-out' },
                            { transform: 'translateY(0px)', opacity: '1', easing: 'ease-in' }
                        ],
                        {
                            // timing options
                            duration: 200
                        });
                    
                    setTimeout(() => {
                            menu_child.animate(
                                    [
                                        // keyframes
                                        { boxShadow: '0 0 0 0 rgba(0,0,0,0)' },
                                        { boxShadow: '0px 5px 13px 5px rgba(0, 0, 0, 0.1)' }
                                    ],
                                    {
                                        // timing options
                                        duration: 150
                                    });
                                    menu_child.style.boxShadow = '0px 5px 13px 5px rgba(0, 0, 0, 0.1)';
                    }, 200);
            });

            context_menu.addEventListener("mouseleave", function (e) {
                    const menu_child = e.target.querySelector(".fluent-context-menu ul");
            
                    menu_child.style.boxShadow = '';
            });
    }

    // Initialize Mica effect
    const mica = document.createElement("div");
    mica.classList.add("fluent-mica-effect");
    document.body.appendChild(mica);

    // Initialize labels
    const labels = document.querySelectorAll(".fluent-label");

    for (const label of labels) {
        if (label.hasAttribute("consolas")) {
            label.style.fontFamily = "Consolas, monaco, monospace";
        }

        if (label.hasAttribute("color")) {
            let color = label.getAttribute("color").includes("#") ? label.getAttribute("color") : colorNameToHex(label.getAttribute("color"));
            label.style.backgroundColor =  addAlpha(pSBC(0.05, color), 0.2);
            label.style.borderColor = pSBC(-0.9, addAlpha(color, 0.9));
            label.style.color = label.style.backgroundColor.includes("#") ? getVisibleTextColor(hexToRgbA(label.style.backgroundColor)) : getVisibleTextColor(label.style.backgroundColor);
        }
    }

    // Initialize icons
    for (const icon of document.querySelectorAll("div.fluent-icon")) {
        var iconSVG = document.createElement("img");
        iconSVG.classList.add("fluent-icon");
        iconSVG.setAttribute("src", `https://cdn.spej.eu/fwf/icons/${icon.getAttribute("icon")}.svg`);

        icon.outerHTML = iconSVG.outerHTML;
    }

    // Initialize sliders
    for (const slider of document.querySelectorAll('input[type="range"]')) {
        slider.style.setProperty('--value', slider.value);
        slider.style.setProperty('--min', slider.min == '' ? '0' : slider.min);
        slider.style.setProperty('--max', slider.max == '' ? '100' : slider.max);
        slider.addEventListener('input', () => slider.style.setProperty('--value', slider.value));
    }

    // Initialize menus
    for (const menu of document.querySelectorAll(".fluent-menu")) {
        if (menu.hasAttribute("main")) {
            menu.classList.add("main");

            const button = menu.children[1];
    
            let media = window.matchMedia("(max-width: 1200px)");
    
            if (media.matches) {
                button.style.display = "block";
            } else {
                button.style.display = "none";
            }

            button.addEventListener("click", () => {
                if (menu.classList.contains("open")) {
                    menu.lastElementChild.style.display = "none";
                    menu.classList.remove("open");
                } else {
                    menu.lastElementChild.style.display = "block";
                    menu.classList.add("open");
                }
            });
    
            media.onchange = () => {
                if (media.matches) {
                    button.style.display = "block";
                    menu.lastElementChild.style.display = "none";
                    menu.parentElement.lastElementChild.style.left = `10em`;
                } else {
                    button.style.display = "none";
                    menu.lastElementChild.style.display = "block";
                    menu.parentElement.lastElementChild.style.left = `30em`;
                    menu.classList.remove("open");
                }
            };
        }
    }

    // Initialize page switchers
    for (const pageSwitcher of document.querySelectorAll("fluent-page-switcher")) {
        if (pageSwitcher.hasAttribute("main")) {
            pageSwitcher.classList.add("main");
        }
    }

    // Initialize pages
    for (const page of document.querySelectorAll(".fluent-page-body")) {
        if (page.parentElement.parentElement.hasAttribute("main")) {
            page.classList.add("main");
        }
        
        if (page.parentElement.firstElementChild.classList.length != 0 && page.parentElement.children.length == 2) {
            const resize_ob = new ResizeObserver(function(entries) {
                // since we are observing only a single element, so we access the first element in entries array
                let rect = entries[0].contentRect;
            
                // current width & height
                let width = rect.width;
                let height = rect.height;
            
                console.log('Current Width : ' + width);
                console.log('Current Height : ' + height);
    
                page.style.top = `calc(${height}px)`;
            });
        
            // start observing for resize
            resize_ob.observe(page.parentElement.firstElementChild);
        }
        else if (page.parentElement.children.length != 2) {
            page.style.top = "0px";
        }
    }
}

//#region Fluent functions

// Show splash screen
function ShowSplashScreen(duration = 0, fadeIn = false, image = "") {
    document.body.style.overflow = "hidden";

    if (image == "") {
        splashImage.type="image/svg+xml";
        splashImage.data="https://resources.bexcool.eu/fluentwebframework/src/img/icons/web.png";
    } else {
        splashImage.src = image;
    }
    
    splashBackground.style.display = "flex";
    if (fadeIn) {
        setTimeout(() => {
            splashBackground.style.opacity = "1";
        }, 10);
    }

    setTimeout(() => {
        splashBackground.style.opacity = "0";
        setTimeout(() => {
            splashBackground.style.display = "none";
            document.body.style.overflow = "auto";
        }, 200);
    }, duration);
}

// Show flyout
function ShowFlyout(element, string, delay) {

    let flyout = document.createElement("div");
    let viewportOffset = element.getBoundingClientRect();
    let closedFlyout = false;

    document.body.appendChild(flyout);
    flyout.classList.add("fluent-flyout");

    console.log(flyout.offsetWidth);

    let text = document.createElement("p");
    text.style.margin = "0";
    text.innerHTML = string;

    flyout.appendChild(text);
    flyout.style.top = element.getBoundingClientRect().top - flyout.offsetHeight - 10 + 'px';
    console.log("Flyout TOP: " + flyout.style.top);
    flyout.style.left = (element.getBoundingClientRect().width / 2 - flyout.offsetWidth / 2) + viewportOffset.x + 'px';
    flyout.animate(
        [
            // keyframes
            { top: flyout.offsetTop + 5 + 'px', opacity: '0' },
            { top: flyout.offsetTop, opacity: '1' }
        ],
        {
            // timing options
            duration: 80
        });

    // Close flyout
    setTimeout(() => {
        document.addEventListener("mousedown", (e) => {
            if (e.target.offsetParent != flyout) {
                closedFlyout = true;
                
                flyout.animate(
                    [
                        // keyframes
                        { opacity: '1' },
                        { opacity: '0' }
                    ],
                    {
                        // timing options
                        duration: 50
                    });
                flyout.style.opacity = "0";
            
                setTimeout(() => {
                    flyout.remove();
                }, 50);
            }
        });
    }, 80);

    setTimeout(() => {
        if (!closedFlyout) {
            closedFlyout = true;
            
            flyout.animate(
                [
                    // keyframes
                    { opacity: '1' },
                    { opacity: '0' }
                ],
                {
                    // timing options
                    duration: 50
                });
                flyout.style.opacity = "0";
        
                setTimeout(() => {
                    flyout.remove();
                }, 50);
        }
    }, delay);
    
    document.addEventListener('wheel', () => {
        if (!closedFlyout) {
            closedFlyout = true;

            flyout.animate(
                [
                    // keyframes
                    { opacity: '1' },
                    { opacity: '0' }
                ],
                {
                    // timing options
                    duration: 50
                });
                flyout.style.opacity = "0";
            
                setTimeout(() => {
                    flyout.remove();
                }, 50);
        }
    });
}

// Show content dialog
function ShowContentDialog(id) {
    const contentDialog = document.getElementById(id);

    if (contentDialog != null) {
        contentDialog.parentElement.style.animation = "fluent-content-dialog-fade 0.1s ease-in";
        contentDialog.parentElement.style.display = "flex";
        document.body.style.overflow = "hidden";
        setTimeout(() => { contentDialog.parentElement.style.animation = "none"; }, 105);
    }
}

// Hide content dialog
function HideContentDialog(id) {
    const contentDialog = document.getElementById(id);

    if (contentDialog != null) {
        contentDialog.parentElement.style.animation = "fluent-content-dialog-fade-rev 0.1s ease-out";
        setTimeout(() => { contentDialog.parentElement.style.display = "none"; document.body.style.overflow = "auto"; }, 85);
    }
}

function SetAccentColor(hex_dark, hex_light) {
    docEle.style.setProperty("--accent-color-custom", "");
    docEle.style.setProperty("--accent-color-default-dark", hex_dark);
    docEle.style.setProperty("--accent-color-default-light", hex_light);
}

//#endregion

//#region Helping functions and variables

function CopyToClipboard(string) {
    navigator.clipboard.writeText(string);
}

function Clamp(num, min, max) { Math.min(Math.max(num, min), max); }

function DecodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function CodeSyntaxHigh(elmnt, mode) {var lang = (mode || "html");
var lang = (mode || "html");
var elmntObj = (document.getElementById(elmnt) || elmnt);
var elmntTxt = elmntObj.innerHTML;
/* HTML */
var tagcolor = getComputedStyle(docEle).getPropertyValue("--HTML-tagcolor");
var tagnamecolor = getComputedStyle(docEle).getPropertyValue("--HTML-tagnamecolor");
var attributecolor = getComputedStyle(docEle).getPropertyValue("--HTML-attributecolor");
var attributevaluecolor = getComputedStyle(docEle).getPropertyValue("--HTML-attributevaluecolor");
var commentcolor = getComputedStyle(docEle).getPropertyValue("--HTML-commentcolor");
/* CSS */
var cssselectorcolor = getComputedStyle(docEle).getPropertyValue("--CSS-selectorcolor");
var csspropertycolor = getComputedStyle(docEle).getPropertyValue("--CSS-propertycolor");
var csspropertyvaluecolor = getComputedStyle(docEle).getPropertyValue("--CSS-propertyvaluecolor");
var cssdelimitercolor = getComputedStyle(docEle).getPropertyValue("--CSS-delimitercolor");
var cssimportantcolor = getComputedStyle(docEle).getPropertyValue("--CSS-importantcolor");
/* JS */
var jscolor = getComputedStyle(docEle).getPropertyValue("--JS-color");
var jskeywordcolor = getComputedStyle(docEle).getPropertyValue("--JS-keywordcolor");
var jsstringcolor = getComputedStyle(docEle).getPropertyValue("--JS-stringcolor");
var jsnumbercolor = getComputedStyle(docEle).getPropertyValue("--JS-numbercolor");
var jspropertycolor = getComputedStyle(docEle).getPropertyValue("--JS-propertycolor");

elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
if (!lang) {
	lang = "html";
}
if (lang == "html") {
	elmntTxt = htmlMode(elmntTxt);
}
if (lang == "css") {
	elmntTxt = cssMode(elmntTxt);
}
if (lang == "js") {
	elmntTxt = jsMode(elmntTxt);
}
elmntObj.innerHTML = elmntTxt;

function extract(str, start, end, func, repl) {
	var s, e, d = "",
		a = [];
	while (str.search(start) > -1) {
		s = str.search(start);
		e = str.indexOf(end, s);
		if (e == -1) {
			e = str.length;
		}
		if (repl) {
			a.push(func(str.substring(s, e + (end.length))));
			str = str.substring(0, s) + repl + str.substr(e + (end.length));
		} else {
			d += str.substring(0, s);
			d += func(str.substring(s, e + (end.length)));
			str = str.substr(e + (end.length));
		}
	}
	this.rest = d + str;
	this.arr = a;
}

function htmlMode(txt) {
	var rest = txt,
		done = "",
		php, comment, angular, startpos, endpos, note, i;
	comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
	rest = comment.rest;
	while (rest.indexOf("&lt;") > -1) {
		note = "";
		startpos = rest.indexOf("&lt;");
		if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {
			note = "css";
		}
		if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {
			note = "javascript";
		}
		endpos = rest.indexOf("&gt;", startpos);
		if (endpos == -1) {
			endpos = rest.length;
		}
		done += rest.substring(0, startpos);
		done += tagMode(rest.substring(startpos, endpos + 4));
		rest = rest.substr(endpos + 4);
		if (note == "css") {
			endpos = rest.indexOf("&lt;/style&gt;");
			if (endpos > -1) {
				done += cssMode(rest.substring(0, endpos));
				rest = rest.substr(endpos);
			}
		}
		if (note == "javascript") {
			endpos = rest.indexOf("&lt;/script&gt;");
			if (endpos > -1) {
				done += jsMode(rest.substring(0, endpos));
				rest = rest.substr(endpos);
			}
		}
	}
	rest = done + rest;
	for (i = 0; i < comment.arr.length; i++) {
		rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
	}
	return rest;
}

function tagMode(txt) {
	var rest = txt,
		done = "",
		startpos, endpos, result;
	while (rest.search(/(\s|<br>)/) > -1) {
		startpos = rest.search(/(\s|<br>)/);
		endpos = rest.indexOf("&gt;");
		if (endpos == -1) {
			endpos = rest.length;
		}
		done += rest.substring(0, startpos);
		done += attributeMode(rest.substring(startpos, endpos));
		rest = rest.substr(endpos);
	}
	result = done + rest;
	result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
	if (result.substr(result.length - 4, 4) == "&gt;") {
		result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
	}
	return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
}

function attributeMode(txt) {
	var rest = txt,
		done = "",
		startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
	while (rest.indexOf("=") > -1) {
		endpos = -1;
		startpos = rest.indexOf("=");
		singlefnuttpos = rest.indexOf("'", startpos);
		doublefnuttpos = rest.indexOf('"', startpos);
		spacepos = rest.indexOf(" ", startpos + 2);
		if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
			endpos = rest.indexOf(" ", startpos);
		} else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
			endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
		} else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
			endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
		}
		if (!endpos || endpos == -1 || endpos < startpos) {
			endpos = rest.length;
		}
		done += rest.substring(0, startpos);
		done += attributeValueMode(rest.substring(startpos, endpos + 1));
		rest = rest.substr(endpos + 1);
	}
	return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
}

function attributeValueMode(txt) {
	return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
}

function commentMode(txt) {
	return "<span style=color:" + commentcolor + ">" + txt + "</span>";
}

function cssMode(txt) {
	var rest = txt,
		done = "",
		s, e, comment, i, midz, c, cc;
	comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
	rest = comment.rest;
	while (rest.search("{") > -1) {
		s = rest.search("{");
		midz = rest.substr(s + 1);
		cc = 1;
		c = 0;
		for (i = 0; i < midz.length; i++) {
			if (midz.substr(i, 1) == "{") {
				cc++;
				c++
			}
			if (midz.substr(i, 1) == "}") {
				cc--;
			}
			if (cc == 0) {
				break;
			}
		}
		if (cc != 0) {
			c = 0;
		}
		e = s;
		for (i = 0; i <= c; i++) {
			e = rest.indexOf("}", e + 1);
		}
		if (e == -1) {
			e = rest.length;
		}
		done += rest.substring(0, s + 1);
		done += cssPropertyMode(rest.substring(s + 1, e));
		rest = rest.substr(e);
	}
	rest = done + rest;
	rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
	rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");
	for (i = 0; i < comment.arr.length; i++) {
		rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
	}
	return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
}

function cssPropertyMode(txt) {
	var rest = txt,
		done = "",
		s, e, n, loop;
	if (rest.indexOf("{") > -1) {
		return cssMode(rest);
	}
	while (rest.search(":") > -1) {
		s = rest.search(":");
		loop = true;
		n = s;
		while (loop == true) {
			loop = false;
			e = rest.indexOf(";", n);
			if (rest.substring(e - 5, e + 1) == "&nbsp;") {
				loop = true;
				n = e + 1;
			}
		}
		if (e == -1) {
			e = rest.length;
		}
		done += rest.substring(0, s);
		done += cssPropertyValueMode(rest.substring(s, e + 1));
		rest = rest.substr(e + 1);
	}
	return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
}

function cssPropertyValueMode(txt) {
	var rest = txt,
		done = "",
		s;
	rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);
	while (rest.search(/!important/i) > -1) {
		s = rest.search(/!important/i);
		done += rest.substring(0, s);
		done += cssImportantMode(rest.substring(s, s + 10));
		rest = rest.substr(s + 10);
	}
	result = done + rest;
	if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
		result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
	}
	return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
}

function cssImportantMode(txt) {
	return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
}

function jsMode(txt) {
	var rest = txt,
		done = "",
		esc = [],
		i, cc, tt = "",
		sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
	for (i = 0; i < rest.length; i++) {
		cc = rest.substr(i, 1);
		if (cc == "\\") {
			esc.push(rest.substr(i, 2));
			cc = "W3JSESCAPE";
			i++;
		}
		tt += cc;
	}
	rest = tt;
	y = 1;
	while (y == 1) {
		sfnuttpos = getPos(rest, "'", "'", jsStringMode);
		dfnuttpos = getPos(rest, '"', '"', jsStringMode);
		compos = getPos(rest, /\/\*/, "*/", commentMode);
		comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
		numpos = getNumPos(rest, jsNumberMode);
		keywordpos = getKeywordPos("js", rest, jsKeywordMode);
		dotpos = getDotPos(rest, jsPropertyMode);
		if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {
			break;
		}
		mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
		if (mypos[0] == -1) {
			break;
		}
		if (mypos[0] > -1) {
			done += rest.substring(0, mypos[0]);
			done += mypos[2](rest.substring(mypos[0], mypos[1]));
			rest = rest.substr(mypos[1]);
		}
	}
	rest = done + rest;
	for (i = 0; i < esc.length; i++) {
		rest = rest.replace("W3JSESCAPE", esc[i]);
	}
	return "<span style=color:" + jscolor + ">" + rest + "</span>";
}

function jsStringMode(txt) {
	return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
}

function jsKeywordMode(txt) {
	return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
}

function jsNumberMode(txt) {
	return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
}

function jsPropertyMode(txt) {
	return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
}

function getDotPos(txt, func) {
	var x, i, j, s, e, arr = [".", "<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%"];
	s = txt.indexOf(".");
	if (s > -1) {
		x = txt.substr(s + 1);
		for (j = 0; j < x.length; j++) {
			cc = x[j];
			for (i = 0; i < arr.length; i++) {
				if (cc.indexOf(arr[i]) > -1) {
					e = j;
					return [s + 1, e + s + 1, func];
				}
			}
		}
	}
	return [-1, -1, func];
}

function getMinPos() {
	var i, arr = [];
	for (i = 0; i < arguments.length; i++) {
		if (arguments[i][0] > -1) {
			if (arr.length == 0 || arguments[i][0] < arr[0]) {
				arr = arguments[i];
			}
		}
	}
	if (arr.length == 0) {
		arr = arguments[i];
	}
	return arr;
}

function getKeywordPos(typ, txt, func) {
	var words, i, pos, rpos = -1,
		rpos2 = -1,
		patt;
	if (typ == "js") {
		words = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete",
			"do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import",
			"in", "instanceof", "int", "interface", "let", "long", "NaN", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static",
			"super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"
		];
	}
	for (i = 0; i < words.length; i++) {
		pos = txt.indexOf(words[i]);
		if (pos > -1) {
			patt = /\W/g;
			if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
				if (pos > -1 && (rpos == -1 || pos < rpos)) {
					rpos = pos;
					rpos2 = rpos + words[i].length;
				}
			}
		}
	}
	return [rpos, rpos2, func];
}

function getPos(txt, start, end, func) {
	var s, e;
	s = txt.search(start);
	e = txt.indexOf(end, s + (end.length));
	if (e == -1) {
		e = txt.length;
	}
	return [s, e + (end.length), func];
}

function getNumPos(txt, func) {
	var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%", "="],
		i, j, c, startpos = 0,
		endpos, word;
	for (i = 0; i < txt.length; i++) {
		for (j = 0; j < arr.length; j++) {
			c = txt.substr(i, arr[j].length);
			if (c == arr[j]) {
				if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
					continue;
				}
				endpos = i;
				if (startpos < endpos) {
					word = txt.substring(startpos, endpos);
					if (!isNaN(word)) {
						return [startpos, endpos, func];
					}
				}
				i += arr[j].length;
				startpos = i;
				i -= 1;
				break;
			}
		}
	}
	return [-1, -1, func];
}
}

function AttributesToString(element) {
    let elementAtt = Array.from(element.attributes, ({name, value}) => (!value ? `${name}` : `${name}="${value}"`));
    elementAtt = elementAtt.join(" ");
    elementAtt.trim();
    return elementAtt;
}

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

function colorNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}

function getVisibleTextColor(rgba){
    rgba = rgba.match(/\d+/g);

    if((rgba[0]*0.299)+(rgba[1]*0.587)+(rgba[2]*0.114)>186) {
        return 'black';
    } else {
        return 'var(--text-color)';
    }
}

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}

function getAbsoluteHeight(el) {
    // Get the DOM Node if you pass in a string
    el = (typeof el === 'string') ? document.querySelector(el) : el; 
  
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) +
                 parseFloat(styles['marginBottom']);
  
    return Math.ceil(el.offsetHeight + margin);
  }

//#endregion