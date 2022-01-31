// Variables
var Initialized = false;

// Switch between Light and Dark themes
function SwitchTheme() {
    var myElement = document.documentElement;

    if (getComputedStyle(myElement).getPropertyValue("--dark-color") == "rgb(32, 32, 32)") // Is dark theme?
    {
        SetLightTheme();
    }
    else {
        SetDarkTheme();
    }
}

// Set Dark theme
function SetDarkTheme() {
    var doc = document.documentElement;

    // Global colors
    doc.style.setProperty("--black-white-color", "white");
    doc.style.setProperty("--dark-color", "rgb(32, 32, 32)");
    doc.style.setProperty("--dark-border-color", "rgb(25, 25, 25)");
    doc.style.setProperty("--darker-color", "rgb(39, 39, 39)");
    doc.style.setProperty("--light-color", "rgb(43, 43, 43)");
    doc.style.setProperty("--light-trans-color", "rgba(40, 40, 40, 0.7)");
    doc.style.setProperty("--light-hover-color", "rgb(45, 45, 45)");
    doc.style.setProperty("--lighter-hover-color", "rgb(55, 55, 55)");
    doc.style.setProperty("--lighter-press-color", "rgb(51, 51, 51)");
    doc.style.setProperty("--light-border-color", "rgb(47, 47, 47)");
    doc.style.setProperty("--focus-color", "rgba(45, 45, 45, 0.5)");
    doc.style.setProperty("--text-color-inverted", "black");
    doc.style.setProperty("--text-focus-color-inverted", "rgba(0, 0, 0, 0.75)");
    doc.style.setProperty("--text-color", "white");
    doc.style.setProperty("--text-focus-color", "rgba(255, 255, 255, 0.75)");
    doc.style.setProperty("--text-nobg-color", "rgb(185, 185, 185)");
    doc.style.setProperty("--textbox-border-bottom-color", "rgb(180, 180, 180)");
    doc.style.setProperty("--light-dark-color", "rgb(33, 33, 33)");
    doc.style.setProperty("--accent-focus-color", "#42a1d2");
    doc.style.setProperty("--accent-hover-color", "#47b1e8");
    doc.style.setProperty("--accent-color", "#4cc2ff");
    doc.style.setProperty("--icon-color", "0");

    // Button
    doc.style.setProperty("--button-color", "hsla(0, 0%, 100%, .061");
    doc.style.setProperty("--button-hover-color", "rgba(255, 255, 255, 0.089)");
    doc.style.setProperty("--button-focus-color", "rgba(255, 255, 255, 0.040)");
    doc.style.setProperty("--button-border-color", "rgba(63, 63, 63, 0.5)");

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
    var doc = document.documentElement;

    // Global colors
    doc.style.setProperty("--black-white-color", "black");
    doc.style.setProperty("--dark-color", "rgb(238, 238, 238)");
    doc.style.setProperty("--dark-border-color", "rgb(225, 225, 225)");
    doc.style.setProperty("--darker-color", "rgb(238, 238, 238)");
    doc.style.setProperty("--light-color", "rgb(251, 251, 251)");
    doc.style.setProperty("--light-trans-color", "rgba(251, 251, 251, 0.7)");
    doc.style.setProperty("--light-hover-color", "rgb(247, 247, 247)");
    doc.style.setProperty("--lighter-hover-color", "rgb(242, 242, 242)");
    doc.style.setProperty("--lighter-press-color", "rgb(245, 245, 245)");
    doc.style.setProperty("--light-border-color", "rgb(203, 203, 203)");
    doc.style.setProperty("--focus-color", "rgba(255, 255, 255, 0.5)");
    doc.style.setProperty("--text-color-inverted", "white");
    doc.style.setProperty("--text-focus-color-inverted", "rgba(255, 255, 255, 0.75)");
    doc.style.setProperty("--text-color", "black");
    doc.style.setProperty("--text-focus-color", "rgba(0, 0, 0, 0.75)");
    doc.style.setProperty("--text-nobg-color", "rgb(50, 50, 50)");
    doc.style.setProperty("--textbox-border-bottom-color", "rgb(110, 110, 110)");
    doc.style.setProperty("--light-dark-color", "rgb(248, 248, 248)");
    doc.style.setProperty("--accent-focus-color", "#3183ca");
    doc.style.setProperty("--accent-hover-color", "#1975c5");
    doc.style.setProperty("--accent-color", "#0067c0");
    doc.style.setProperty("--icon-color", "0.7");

    // Button
    doc.style.setProperty("--button-color", "hsla(0, 0%, 100%, .75");
    doc.style.setProperty("--button-hover-color", "rgba(255, 255, 255, 0.5)");
    doc.style.setProperty("--button-focus-color", "rgba(255, 255, 255, 0.040)");
    doc.style.setProperty("--button-border-color", "rgba(150, 150, 150, 0.3)");

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

        // Initialize Code Elements
        MakeFluentElements();

        // Initialize Selectable Buttons
        InitSelectableButtons();

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
            const expander_body = expander.parentElement.lastElementChild;
            const expander_arrow = expander.lastElementChild.firstElementChild;
            
            expander.addEventListener("mousedown", (e) => {
                e.preventDefault();

                expander.classList.add("press");
            });
            
            // Set children opacity
            for (const content of expander_body.children)
            {
                if (expander_body.classList.contains("expanded")) content.style.opacity = "1";
                else content.style.opacity = "0";
            }

            // Bind expander open/close
            expander.addEventListener("click", (e) => {
                e.preventDefault();

                if (expander_body.classList.contains("expanded")) {
                    for (const content of expander_body.children) {
                        content.animate(
                            [
                                // keyframes
                                { opacity: "1" },
                                { opacity: "0" }
                            ],
                            {
                                // timing options
                                duration: 150
                            });
                        content.style.opacity = "0";
                    }

                    setTimeout(function () {
                        expander_body.animate(
                            [
                                // keyframes
                                { height: (expander_body.scrollHeight) + "px" },
                                { height: "0" }
                            ],
                            {
                                // timing options
                                duration: 150
                            });
                    }, 150);

                    setTimeout(() => {
                        expander_arrow.style.transform = "rotate(0deg)"
                    }, 300);

                    setTimeout(function () {
                        expander_body.classList.remove("expanded");

                        expander.style.cssText =    "border-radius: 4px 4px 4px 4px;" +
                                                    "-webkit-border-radius: 4px 4px 4px 4px;" +
                                                    "-moz-border-radius: 4px 4px 4px 4px;" +
                                                    "-ms-border-radius: 4px 4px 4px 4px;" +
                                                    "-o-border-radius: 4px 4px 4px 4px;";
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
                            { height: (expander_body.scrollHeight) + "px" }
                        ],
                        {
                            // timing options
                            duration: 150
                        });

                        setTimeout( () => {
                            expander_arrow.style.transform = "rotate(180deg)"
                        }, 100);

                    for (const content of expander_body.children) {
                        setTimeout(function () {
                            content.animate(
                                [
                                    // keyframes
                                    { opacity: "0" },
                                    { opacity: "1" }
                                ],
                                {
                                    // timing options
                                    duration: 150
                                });
                            content.style.opacity = "1";
                        }, 100);
                    }
                }
            });
        }
    }
}

function InitSelectableButtons() {
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
}

function MakeFluentElements() {
    // Code
    var doc = document.documentElement;

    for (const code of document.querySelectorAll("code")) {
        code.outerHTML =    '<div class="fluent-code-container">' +
                            '<div style="display: inline-block"><code style="' + code.style.cssText + '">' +
                            code.innerHTML + 
                            '</code></div>' +
                            '<button class="fluent-code-copy-button" onclick="CopyToClipboard(\'' + code.innerHTML + '\');">' + 
                            '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">' +
                            '<path class="fluent-svg-path" d="M8 2C6.89543 2 6 2.89543 6 4V14C6 15.1046 6.89543 16 8 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2H8ZM7 4C7 3.44772 7.44772 3 8 3H14C14.5523 3 15 3.44772 15 4V14C15 14.5523 14.5523 15 14 15H8C7.44772 15 7 14.5523 7 14V4ZM4 6.00001C4 5.25973 4.4022 4.61339 5 4.26758V14.5C5 15.8807 6.11929 17 7.5 17H13.7324C13.3866 17.5978 12.7403 18 12 18H7.5C5.567 18 4 16.433 4 14.5V6.00001Z" fill="#212121"/>' +
                            '</svg>' +
                            '</button>' +
                            '</div>'
    }

    for (const code of document.querySelectorAll("code")) {
        CodeSyntaxHigh(code);
    }

    // Accent button
    const buttons = document.querySelectorAll("button");

    for (const button of buttons) {
        if (button.hasAttribute("accent")){
            button.outerHTML =  '<button style="' + button.style.cssText + '" class="fluent-button-accent">' + 
                                    button.innerHTML +
                                '</button>';
        }
    }
}

//#region Helping functions

function CopyToClipboard(string) {
    navigator.clipboard.writeText(string);
}

function CodeSyntaxHigh(elmnt, mode) {
    var lang = (mode || "html");
    var elmntObj = (document.getElementById(elmnt) || elmnt);
    var elmntTxt = elmntObj.innerHTML;
    var tagcolor = "mediumblue";
    var tagnamecolor = "brown";
    var attributecolor = "red";
    var attributevaluecolor = "mediumblue";
    var commentcolor = "green";
    var cssselectorcolor = "brown";
    var csspropertycolor = "red";
    var csspropertyvaluecolor = "mediumblue";
    var cssdelimitercolor = "black";
    var cssimportantcolor = "red";  
    var jscolor = "black";
    var jskeywordcolor = "mediumblue";
    var jsstringcolor = "brown";
    var jsnumbercolor = "red";
    var jspropertycolor = "black";
    elmntObj.style.fontFamily = "Consolas,'Courier New', monospace";
    if (!lang) {lang = "html"; }
    if (lang == "html") {elmntTxt = htmlMode(elmntTxt);}
    if (lang == "css") {elmntTxt = cssMode(elmntTxt);}
    if (lang == "js") {elmntTxt = jsMode(elmntTxt);}
    elmntObj.innerHTML = elmntTxt;
  
    function extract(str, start, end, func, repl) {
      var s, e, d = "", a = [];
      while (str.search(start) > -1) {
        s = str.search(start);
        e = str.indexOf(end, s);
        if (e == -1) {e = str.length;}
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
      var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;
      comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
      rest = comment.rest;
      while (rest.indexOf("&lt;") > -1) {
        note = "";
        startpos = rest.indexOf("&lt;");
        if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {note = "css";}
        if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {note = "javascript";}        
        endpos = rest.indexOf("&gt;", startpos);
        if (endpos == -1) {endpos = rest.length;}
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
      var rest = txt, done = "", startpos, endpos, result;
      while (rest.search(/(\s|<br>)/) > -1) {    
        startpos = rest.search(/(\s|<br>)/);
        endpos = rest.indexOf("&gt;");
        if (endpos == -1) {endpos = rest.length;}
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
      var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
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
        if (!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;}
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
      var rest = txt, done = "", s, e, comment, i, midz, c, cc;
      comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
      rest = comment.rest;
      while (rest.search("{") > -1) {
        s = rest.search("{");
        midz = rest.substr(s + 1);
        cc = 1;
        c = 0;
        for (i = 0; i < midz.length; i++) {
          if (midz.substr(i, 1) == "{") {cc++; c++}
          if (midz.substr(i, 1) == "}") {cc--;}
          if (cc == 0) {break;}
        }
        if (cc != 0) {c = 0;}
        e = s;
        for (i = 0; i <= c; i++) {
          e = rest.indexOf("}", e + 1);
        }
        if (e == -1) {e = rest.length;}
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
      var rest = txt, done = "", s, e, n, loop;
      if (rest.indexOf("{") > -1 ) { return cssMode(rest); }
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
        if (e == -1) {e = rest.length;}
        done += rest.substring(0, s);
        done += cssPropertyValueMode(rest.substring(s, e + 1));
        rest = rest.substr(e + 1);
      }
      return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
    }
    function cssPropertyValueMode(txt) {
      var rest = txt, done = "", s;
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
      var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
      for (i = 0; i < rest.length; i++)  {
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
        if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}
        mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
        if (mypos[0] == -1) {break;}
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
      var x, i, j, s, e, arr = [".","<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];
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
          if (arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];}
        }
      }
      if (arr.length == 0) {arr = arguments[i];}
      return arr;
    }
    function getKeywordPos(typ, txt, func) {
      var words, i, pos, rpos = -1, rpos2 = -1, patt;
      if (typ == "js") {
        words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
        "do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
        "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
        "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];
      }
      for (i = 0; i < words.length; i++) {
        pos = txt.indexOf(words[i]);
        if (pos > -1) {
          patt = /\W/g;
          if (txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {
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
      if (e == -1) {e = txt.length;}
      return [s, e + (end.length), func];
    }
    function getNumPos(txt, func) {
      var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;
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
              if (!isNaN(word)) {return [startpos, endpos, func];}
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

//#endregion